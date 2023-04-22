import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_Data.saveQuestion", () => {
  // An async unit test to verify that the saved question is returned and 
  // all expected fields are populated when correctly formatted data is passed to the function.
  it("should return a question with the correct fields", async () => {
    const question = {
      optionOneText: "test option one",
      optionTwoText: "test option two",
      author: "sarahedo",
    };
    const savedQuestion = await _saveQuestion(question);
    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion["id"]).not.toBeNull();

    expect(savedQuestion).toHaveProperty("author");
    expect(savedQuestion["author"]).toBe("sarahedo");
    
    expect(savedQuestion).toHaveProperty("optionOne");
    expect(savedQuestion["optionOne"]["text"]).toBe(question["optionOneText"]);
    expect(savedQuestion["optionOne"]["votes"]).toHaveLength(0);

    expect(savedQuestion).toHaveProperty("optionTwo");
    expect(savedQuestion["optionTwo"]["text"]).toBe(question["optionTwoText"]);
    expect(savedQuestion["optionTwo"]["votes"]).toHaveLength(0);

    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion["timestamp"]).not.toBeNull();
  });

  // An async unit test to verify that an error is returned if incorrect data is passed to the function.
  it("should return an error if incorrect data is passed", async () => {
    const question = {
      one: "test option one",
      author: "sarahedo",
    };

    // based on https://jestjs.io/docs/tutorial-async
    // and https://github.com/jest-community/eslint-plugin-jest/blob/v25.7.0/docs/rules/no-conditional-expect.md
    const getError = async (call) => {
      try {
        await call();
    
        throw new Error();
      } catch (error) {
        return error;
      }
    };

    const error = await getError(async () => _saveQuestion(question));
    expect(error).toBe("Please provide optionOneText, optionTwoText, and author");
  });
});

describe("_Data.saveQuestionAnswer", () => {
  it("Should return true when a question is answered", async () => {
    // An async unit test to verify that true is returned when correctly formatted data is passed to the function.
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne"
    };

    const saved = await _saveQuestionAnswer(answer);
    expect(saved).toBe(true);
  });

  it("Should return an error if incorrect data is passed", async () => {
    // An async unit test to verify that an error is returned if incorrect data is passed to the function.
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
    };
    
    // based on https://jestjs.io/docs/tutorial-async
    // and https://github.com/jest-community/eslint-plugin-jest/blob/v25.7.0/docs/rules/no-conditional-expect.md
    const getError = async (call) => {
      try {
        await call();
    
        throw new Error();
      } catch (error) {
        return error;
      }
    };

    const error = await getError(async () => _saveQuestionAnswer(answer));
    expect(error).toBe("Please provide authedUser, qid, and answer");
  });
});