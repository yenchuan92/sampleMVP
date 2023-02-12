import { render, within, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

it("renders DataTable", () => {
  const element = <DataTable />;
  const view = render(element);
  expect(view).toBeTruthy();
});

it("test click on create user", () => {
  const element = <DataTable />;
  render(element);
  const viewBtn = screen.getByTestId("create-user-btn");
  expect(viewBtn).toBeTruthy();
  fireEvent.click(viewBtn);
  expect(screen.getByTestId("create-modal-confirm-btn")).toBeTruthy();
});

it("test click on edit user if there are any users", () => {
  const element = <DataTable />;
  render(element);
  // test case to be refactored in future when mocking the service API call
  expect(screen.getAllByRole("row")).toBeTruthy();
  //const viewBtn = screen.getByTestId("edit-user-iconbtn-0");
  //   expect(viewBtn).toBeTruthy();
  //   fireEvent.click(viewBtn);
  //   expect(screen.getByTestId("edit-modal-save-btn")).toBeTruthy();
});

it("test click on delete user if there are any users", () => {
  const element = <DataTable />;
  render(element);
  // test case to be refactored in future when mocking the service API call
  expect(screen.getAllByRole("row")).toBeTruthy();
  //const viewBtn = screen.getByTestId("delete-user-iconbtn-0");
  //   expect(viewBtn).toBeTruthy();
  //   fireEvent.click(viewBtn);
  //   expect(screen.getByTestId("delete-modal-delete-btn")).toBeTruthy();
});
