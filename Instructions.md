# Pokémon Abilities Challenge

Hello and thank you for showing interest in joining our company! We've crafted this challenge to reflect the type of tasks you might encounter with us. This test helps us understand your problem-solving approach, coding style, and, most importantly, your thought process.

This assessment is untimed; however, it's expected to take around 120 minutes (90 minutes for coding and 30 minutes for the written discussion).

## The Challenge

Your task is to build an API endpoint `/api/users/{userId}/pokemons` with specific requirements. The challenge is designed to evaluate how you integrate third-party APIs, manage user input, and handle potential edge cases.

In order to solve this problem, make sure of the [Pokémon API](https://pokeapi.co/).

### Requirements:

1. **User Authentication**: The API should check if the user is logged in and if the accessing user is the correct user based on the `{userId}`.
2. **Input Payload**: The endpoint should accept a payload with:

   - `abilities`: An array of abilities (either as IDs or names based on this [API](https://pokeapi.co/docs/v2#abilities)). This field is **mandatory**.
   - `sortBy`: An optional field that can be one of `id`, `name`, `height`, or `weight`.
   - `direction`: An optional field to determine the sorting direction, either `asc` or `desc`. The default should be `asc`.

3. **Output**: Fetch all Pokémon from the Pokémon API that have at least one of the abilities from the `abilities` array. Make sure the results are deduplicated. If `sortBy` is provided, the results should be sorted accordingly. If `direction` is provided, the sorting direction should be applied.

4. **Error Handling**: Handle different types of errors like bad requests, API errors, missing fields, etc.

### Written Discussion

Kindly answer the following questions in a `notes.md` file:

1. How would you optimize the API route to ensure its efficiency, especially when dealing with a third-party API?
2. Discuss rate limiting and if it is essential for this application.

## Rubric

Your submission will be evaluated on the following criteria:

- **Meeting User Requirements**: Does your solution meet the specified requirements? How well does it handle edge cases?
- **Efficiency**: How quickly does your solution retrieve and process data?
- **Code Organization**: Is your code clean, organized, and easy to follow?
- **Written**: How well did you explain your approaches and decisions in the written section?

## Running the app

For a more detailed outline of how to get the app running see [server/README.md](../sever/README.md).
