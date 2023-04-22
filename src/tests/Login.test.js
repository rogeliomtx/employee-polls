import { MemoryRouter } from "react-router";
import { screen } from '@testing-library/react';

import { renderWithProviders, getMockState } from "./utils";
import App from "../App";

const preloadedState = getMockState();
const component = (
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

describe("Login", () => {
  // -> Test that the home page renders correctly when the user is not logged in.
  it("should match the snapshot", () => {
    const view = renderWithProviders(component, { preloadedState });
    expect(view.container).toMatchSnapshot();
  });

  it("should render the login form", () => {
    renderWithProviders(component, { preloadedState });
    
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
  });
});

