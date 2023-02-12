import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

it("renders Navbar with data", () => {
  const mockData = [{ name: "test function 1" }, { name: "test function 2" }];
  const element = <Navbar data={mockData} />;
  const view = render(element);
  expect(view).toBeTruthy();

  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toEqual(2);
  expect(screen.getByTestId("test function 1")).toBeInTheDocument();
  expect(screen.getByTestId("test function 2")).toBeInTheDocument();
});
