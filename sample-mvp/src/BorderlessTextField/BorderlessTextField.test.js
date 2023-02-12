import { render, screen } from "@testing-library/react";
import { BorderlessTextField } from "./BorderlessTextField";

it("renders BorderlessTextField with children", () => {
  const element = <BorderlessTextField>test</BorderlessTextField>;
  const view = render(element);
  expect(view).toBeTruthy();
  expect(screen.getByDisplayValue("test")).toBeInTheDocument();
});
