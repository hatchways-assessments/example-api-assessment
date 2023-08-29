// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

describe("App server", () => {
  const originalEnv = process.env;
  describe.each([["3000"], ["4000"], ["5000"]])("when PORT is %s", (port) => {
    beforeEach(() => {
      jest.resetModules();
      process.env = {
        ...originalEnv,
        PORT: port,
      };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("should listen to PORT", async () => {
      jest.doMock("../src/app");
      const { default: app } = await import("../src/app");
      await import("../src/index");
      expect(app.listen).toHaveBeenCalledWith(port, expect.anything());
    });

    it("should log the port number", async () => {
      jest.doMock("../src/app");
      const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      const { default: app } = await import("../src/app");
      await import("../src/index");

      // Invoke the callback function of listen.
      //@ts-ignore
      app.listen.mock.lastCall[1]();

      expect(logSpy).toBeCalledWith(`Listening: http://localhost:${port}`);
    });
  });
});
