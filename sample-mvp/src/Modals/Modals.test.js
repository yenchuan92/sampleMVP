import { fireEvent, render, screen } from "@testing-library/react";
import { CreateModal } from "./CreateModal";
import { EditModal } from "./EditModal";
import { DeleteModal } from "./DeleteModal";

it("renders CreateModal", () => {
  const element = (
    <CreateModal
      open={true}
      data={{
        id: "",
        login: "",
        name: "",
        salary: "",
      }}
      handleChange={jest.fn()}
      setOpenCreateModal={jest.fn()}
      handleCreate={jest.fn()}
      setSelectedEmployee={jest.fn()}
    />
  );
  const view = render(element);
  expect(view).toBeTruthy();

  const textBoxes = screen.getAllByRole("textbox");
  expect(textBoxes.length).toEqual(4);

  fireEvent.change(textBoxes[0], { target: { value: "test id" } });
  fireEvent.change(textBoxes[1], { target: { value: "test login" } });
  fireEvent.change(textBoxes[2], { target: { value: "test name" } });
  fireEvent.change(textBoxes[3], { target: { value: "test salary" } });

  expect(screen.getByDisplayValue("test id")).toBeInTheDocument();
  expect(screen.getByDisplayValue("test login")).toBeInTheDocument();
  expect(screen.getByDisplayValue("test name")).toBeInTheDocument();
  expect(screen.getByDisplayValue("test salary")).toBeInTheDocument();

  expect(screen.getByTestId("create-modal-confirm-btn")).toBeInTheDocument();
});

it("renders EditModal", () => {
  const element = (
    <EditModal
      open={true}
      data={{
        id: "test id",
        login: "test login",
        name: "test name",
        salary: "test salary",
      }}
      handleChange={jest.fn()}
      setOpenEditModal={jest.fn()}
      handleSave={jest.fn()}
      setSelectedEmployee={jest.fn()}
    />
  );
  const view = render(element);
  expect(view).toBeTruthy();

  const idField = screen.getByTestId("id-typography");
  const loginField = screen.getByDisplayValue("test login");
  const nameField = screen.getByDisplayValue("test name");
  const salaryField = screen.getByDisplayValue("test salary");

  expect(idField).toBeInTheDocument();
  expect(loginField).toBeInTheDocument();
  expect(nameField).toBeInTheDocument();
  expect(salaryField).toBeInTheDocument();

  fireEvent.change(loginField, { target: { value: "test login 2" } });
  fireEvent.change(nameField, { target: { value: "test name 2" } });
  fireEvent.change(salaryField, { target: { value: "test salary 2" } });

  expect(screen.getByDisplayValue("test login 2")).toBeInTheDocument();
  expect(screen.getByDisplayValue("test name 2")).toBeInTheDocument();
  expect(screen.getByDisplayValue("test salary 2")).toBeInTheDocument();

  expect(screen.getByTestId("edit-modal-save-btn")).toBeInTheDocument();
});

it("renders DeleteModal", () => {
  const element = (
    <DeleteModal
      open={true}
      data={{
        id: "test id",
        login: "",
        name: "",
        salary: "",
      }}
      setOpenDeleteModal={jest.fn()}
      handleDelete={jest.fn()}
      setSelectedEmployee={jest.fn()}
    />
  );
  const view = render(element);
  expect(view).toBeTruthy();

  expect(
    screen.getByTestId("delete-modal-confirm-typography")
  ).toBeInTheDocument();
  expect(screen.getByTestId("delete-modal-delete-btn")).toBeInTheDocument();
});
