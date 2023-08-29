import Sequelize, {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import bcrypt from "bcrypt";

const setSaltAndPassword = (user: User): void => {
  if (user.changed("password")) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare salt: CreationOptional<string>;

  public static createSalt(): string {
    return bcrypt.genSaltSync(8);
  }

  public static encryptPassword(plainPassword: string, salt: string): string {
    return bcrypt.hashSync(plainPassword, salt);
  }

  public correctPassword(password: string) {
    return User.encryptPassword(password, this.salt) === this.password;
  }

  public static initWithDatabase(sequelize: Sequelize.Sequelize) {
    this.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          validate: {
            min: 6,
          },
          allowNull: false,
        },
        salt: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "user",
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        hooks: {
          beforeCreate: setSaltAndPassword,
          beforeUpdate: setSaltAndPassword,
          beforeBulkCreate: (users) => {
            users.forEach(setSaltAndPassword);
          },
        },
      }
    );
  }
}

export default User;
