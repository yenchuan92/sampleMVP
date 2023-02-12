import { render } from "@testing-library/react";
import App from "./App";

test("renders overall App", () => {
  const element = <App />;
  const view = render(element);
  expect(view).toBeTruthy();
});
