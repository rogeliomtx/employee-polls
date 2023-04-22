import { MemoryRouter } from "react-router";
import { screen } from '@testing-library/react';

import { renderWithProviders, getMockState } from "./utils";
import App from "../App";

const authedUserState = {preloadedState: getMockState("sarahedo")};
const defaultState = {preloadedState: getMockState()};

const component = (
  <MemoryRouter initialEntries={["/it-shouldnt-exist"]}>
    <App />
  </MemoryRouter>
);

describe("Not found raised when the address doesn't exist (with authedUser)", () => {
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, authedUserState);
    expect(view.container).toMatchSnapshot();
  });

  it("should render the not found page", () => {
    renderWithProviders(component, authedUserState);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go back/i)).toBeInTheDocument();
  });
});

describe("Not found raised when the address doesn't exist (without authedUser)", () => {
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, defaultState);
    expect(view.container).toMatchSnapshot();
  });

  it("should render the not found page", () => {
    renderWithProviders(component, defaultState);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go back/i)).toBeInTheDocument();
  });
});