import { MemoryRouter } from "react-router";
import { screen, waitFor, fireEvent, within, act } from '@testing-library/react';

import { renderWithProviders, getMockState } from "./utils";
import App from "../App";
import { handleAddQuestion } from '../actions/shared';

const authedUserState = {preloadedState: getMockState("sarahedo")};

const component = (
  <MemoryRouter initialEntries={["/add"]}>
    <App />
  </MemoryRouter>
);

describe("CreateQuestion", () => {
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, authedUserState);
    expect(view.container).toMatchSnapshot();
  });

  it ("should render the CreateQuestion form", () => {
    renderWithProviders(component, authedUserState);

    expect(screen.getByText(/would you rather/i)).toBeInTheDocument();
    expect(screen.getByText(/option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/option 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();

    expect(screen.getAllByRole('textbox').length).toBe(2);
  });

  // test question creation
  it ("should create a new question", async () => {
    renderWithProviders(component, authedUserState);

    const optionOne = screen.getAllByRole('textbox')[0];
    const optionTwo = screen.getAllByRole('textbox')[1];
    const submitBtn = screen.getByRole('button', {name: /submit/i});

    fireEvent.change(optionOne, {target: {value: "Option One"}});
    fireEvent.change(optionTwo, {target: {value: "Option Two"}});

    fireEvent.click(submitBtn);

    await waitFor(() => {
      const unansweredQuestions = screen.getByTestId("unanswered-questions");
      const questions = within(unansweredQuestions).queryAllByRole("article");
      expect(questions.length).toBe(3);
    });
  });
});

describe("CreateQuestion fns", () => {
  it("should create a new question", () => {
    const { store } = renderWithProviders(component, authedUserState);
    const optionOne = "Option One";
    const optionTwo = "Option Two"

    act(() => {
      store.dispatch(handleAddQuestion(optionOne, optionTwo)).then(() => {
        const { questions } = store.getState();
        
        // check questions
        const question = questions[Object.keys(questions)[0]];
        expect(question.optionOne.text).toBe(optionOne);
        expect(question.optionTwo.text).toBe(optionTwo);
      });
    });

    
  });
});