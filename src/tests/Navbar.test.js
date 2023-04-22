import { MemoryRouter } from "react-router";
import { screen, within } from '@testing-library/react';

import { renderWithProviders, getMockState } from "./utils";
import App from "../App";

const authedUserState = {preloadedState: getMockState("sarahedo")};
const defaultState = {preloadedState: getMockState()};

const component = (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

describe("Navbar with authed user", () => {
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, authedUserState);
    expect(view.container).toMatchSnapshot();
  });

  it("should render the menu when user is logged in", () => {
    // -> Test that the navbar renders correctly when the user is logged in.
    // -> Check that all links are present
    renderWithProviders(component, authedUserState);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("should render the user's name and avatar", () => {
    // -> Test that the navbar renders correctly when the user is logged in.
    // -> Check that the user's name and avatar is displayed.
    renderWithProviders(component, authedUserState);
    const navigation = screen.getByRole('navigation');
    
    // user.name
    expect(within(navigation).getByText(/sarah edo/i)).toBeInTheDocument();
    // user.avatar
    expect(within(navigation).getByRole('img', {name: /avatar/i})).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("should not render login", () => {
    renderWithProviders(component, authedUserState);
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });
});

describe("Navbar without authed user", () => {
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, defaultState);
    expect(view.container).toMatchSnapshot();
  });
  
  it("should render the menu when user is not logged in", () => {
    renderWithProviders(component, defaultState);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Question/i)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /login/i})).toBeInTheDocument();
  });

  it("shouldn't render the user's name and avatar", () => {
    renderWithProviders(component, defaultState);
    
    const navigation = screen.getByRole('navigation');

    // user.name
    expect(within(navigation).queryByText(/sarah edo/i)).not.toBeInTheDocument();
    // user.avatar
    expect(within(navigation).queryByRole('img', {name: /avatar/i})).not.toBeInTheDocument();
  });

  it("should not render logout", () => {
    renderWithProviders(component, defaultState);
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });
});