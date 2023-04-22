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

  it("should render the questions with visible unanswered category", () => {
    // -> Show the questions clasified by answered and unanswered.
    const preloadedState = getMockState("johndoe");
    renderWithProviders(component, { preloadedState });

    // categories
    expect(screen.getByText(/^Answered/i)).toBeInTheDocument();
    expect(screen.getByText(/^Unanswered/i)).toBeInTheDocument();

    // johndoe has two unanswered questions
    // see preloadedState
    const unansweredQuestions = screen.getByTestId("unanswered-questions");

    expect(
      within(unansweredQuestions).queryAllByRole('link', { name: /show details/i }).length
    ).toBe(2);

    // answered questions should not be displayed
    expect(screen.queryByTestId("answered-questions")).not.toBeInTheDocument();
  });
});
