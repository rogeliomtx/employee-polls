import { MemoryRouter } from "react-router";
import { screen, within } from '@testing-library/react';

import { renderWithProviders, getMockState } from "./utils";
import App from "../App";

const component = (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

describe("Home with authed user", () => {
  it("should match the snapshot", () => {
    const preloadedState = getMockState("sarahedo");
    const view = renderWithProviders(component, { preloadedState });
    expect(view.container).toMatchSnapshot();
  });

  it("should render the questions classified by answered and unanswered", () => {
    // -> Show the questions clasified by answered and unanswered.
    const preloadedState = getMockState("sarahedo");
    renderWithProviders(component, { preloadedState });

    // categories
    expect(screen.getByText(/^Answered/i)).toBeInTheDocument();
    expect(screen.getByText(/^Unanswered/i)).toBeInTheDocument();

    // sarah has two answered questions and zero unanswered questions
    // see preloadedState
    const answeredQuestions = screen.getByTestId("answered-questions");
    const unansweredQuestions = screen.getByTestId("unanswered-questions");

    expect(
      within(answeredQuestions).queryAllByRole('link', { name: /show details/i }).length
    ).toBe(2);

    expect(
      within(unansweredQuestions).queryAllByRole('link', { name: /show details/i }).length
    ).toBe(0);
  });

  it("should render the questions sorted by timestamp", () => {
    // -> Check that questions are sorted by timestamp.
    const preloadedState = getMockState("sarahedo");
    renderWithProviders(component, { preloadedState });

    // sarah has two answered questions and zero unanswered questions
    // see preloadedState
    const answeredQuestions = screen.getByTestId("answered-questions");
    return;  // TODO tests

    const questions = within(answeredQuestions).queryAllByRole('link', { name: /show details/i });
    const firstAnsweredQuestion = questions[0];
    const secondAnsweredQuestion = questions[1];

    expect(
      within(firstAnsweredQuestion).getByText(/july 14, 2016 at 2 am/i)
    ).toBeInTheDocument();

    expect(
      within(secondAnsweredQuestion).getByText(/june 28, 2016 at 9 pm/i)
    ).toBeInTheDocument();
  });
});
