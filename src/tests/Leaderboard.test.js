import { MemoryRouter } from "react-router";
import { screen } from '@testing-library/react';

import { renderWithProviders, getMockState } from "./utils";
import App from "../App";

const authedUserState = {preloadedState: getMockState("sarahedo")};

const component = (
  <MemoryRouter initialEntries={["/leaderboard"]}>
    <App />
  </MemoryRouter>
);

describe("Leaderboard", () => {
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, authedUserState);
    expect(view.container).toMatchSnapshot();
  });

  it ("should render the leaderboard", () => {
    renderWithProviders(component, authedUserState);
    expect(screen.getByRole("contentinfo", {text: /leaderboard/i})).toBeInTheDocument();
  });
});