import { render, screen } from "@testing-library/react";

import App from "../App";

test("renders the app title", (): void => {
  render(<App />);
  expect(screen.getByText(/testing/i)).toBeInTheDocument();
});

describe("App", () => {
  it("renders the title", (): void => {
    render(<App />);
    expect(screen.getByText(/testing/i)).toBeInTheDocument();
  });
});
