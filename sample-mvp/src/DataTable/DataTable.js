import {
  Box,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Avatar,
  TableFooter,
  TableSortLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  editUser,
} from "../services/UsersService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { EditModal } from "../Modals/EditModal";
import { DeleteModal } from "../Modals/DeleteModal";
import { CreateModal } from "../Modals/CreateModal";
import { BorderlessTextField } from "../BorderlessTextField/BorderlessTextField";
import _ from "lodash";

const SalarySearchField = ({ type, borderRadius, val, setVal }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      border="1.5px solid #c7c7c7"
      borderRadius={borderRadius}
      height="50px"
    >
      {type === "Minimum" && (
        <Box
          display="flex"
          alignItems="center"
          paddingX="10px"
          backgroundColor="#c7c7c7"
          height="100%"
        >
          <SearchOutlinedIcon />
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="column"
        minWidth="40%"
        paddingY="20px"
        paddingLeft="10px"
      >
        <Typography fontSize="14px">{type} salary</Typography>
        <Typography fontSize="14px" fontWeight="bold">
          Enter amount
        </Typography>
      </Box>
      <Typography>$</Typography>
      <BorderlessTextField
        onChange={setVal}
        onKeyDown={(e) => {
          if (
            !isNaN(parseInt(e.key, 10)) ||
            e.key === "Backspace" ||
            e.key === "Delete" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
          ) {
            return true;
          } else {
            e.preventDefault();
          }
        }}
      >
        {val}
      </BorderlessTextField>
    </Box>
  );
};

const DataTable = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: null,
    name: null,
    login: null,
    salary: null,
  });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [minSalaryFilter, setMinSalaryFilter] = useState(null);
  const [maxSalaryFilter, setMaxSalaryFilter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const tableHeaders = ["Id", "Name", "Login", "Salary", "Action"];

  const handleChange = (val, type) => {
    const cloned = _.cloneDeep(selectedEmployee);
    cloned[type] = val;
    setSelectedEmployee(cloned);
  };

  const handleCreate = () => {
    createUser(selectedEmployee.id, selectedEmployee)
      .then((res) => {
        if (res) {
          const cloned = _.cloneDeep(employeesData);
          cloned.unshift(selectedEmployee);
          setEmployeesData(cloned);
          setOpenCreateModal(false);
          setSelectedEmployee({
            id: null,
            name: null,
            login: null,
            salary: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    editUser(selectedEmployee.id, selectedEmployee)
      .then((res) => {
        if (res) {
          const cloned = _.cloneDeep(employeesData);
          const indexToReplace = cloned.findIndex((employee) => {
            return employee.id === selectedEmployee.id;
          });
          if (indexToReplace >= 0) {
            cloned[indexToReplace] = selectedEmployee;
          }
          setEmployeesData(cloned);
          setOpenEditModal(false);
          setSelectedEmployee({
            id: null,
            name: null,
            login: null,
            salary: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    deleteUser(selectedEmployee.id).then((res) => {
      if (res) {
        const cloned = _.cloneDeep(employeesData);
        const newData = cloned.filter((emp) => {
          return emp.id !== selectedEmployee.id;
        });
        setEmployeesData(newData);
        setOpenDeleteModal(false);
        setSelectedEmployee({
          id: null,
          name: null,
          login: null,
          salary: null,
        });
      }
    });
  };

  const handleChangePage = (e, newPage) => {
    setActivePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setActivePage(0);
  };

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // // with exampleArray.slice().sort(exampleComparator)
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  useEffect(() => {
    // initial data fetch to get all users
    getUsers().then((res) => {
      setEmployeesData(res);
    });
  }, []);

  useEffect(() => {
    setFilteredData(employeesData);
  }, [employeesData]);

  useEffect(() => {
    if (
      minSalaryFilter !== null &&
      parseInt(minSalaryFilter) &&
      maxSalaryFilter !== null &&
      parseInt(maxSalaryFilter)
    ) {
      const newData = employeesData.filter((employee) => {
        return (
          parseInt(employee.salary) >= parseInt(minSalaryFilter) &&
          parseInt(employee.salary) <= parseInt(maxSalaryFilter)
        );
      });
      setFilteredData(newData);
    } else if (minSalaryFilter !== null && parseInt(minSalaryFilter)) {
      const newData = employeesData.filter((employee) => {
        return parseInt(employee.salary) >= parseInt(minSalaryFilter);
      });
      setFilteredData(newData);
    } else if (maxSalaryFilter !== null && parseInt(maxSalaryFilter)) {
      const newData = employeesData.filter((employee) => {
        return parseInt(employee.salary) <= parseInt(maxSalaryFilter);
      });
      setFilteredData(newData);
    } else {
      setFilteredData(employeesData);
    }
  }, [minSalaryFilter, maxSalaryFilter]);

  return (
    <Container sx={{ marginLeft: "25%" }}>
      <Box display="flex" paddingY="20px">
        <SalarySearchField
          type="Minimum"
          borderRadius="5px 0px 0px 5px"
          val={minSalaryFilter}
          setVal={(e) => {
            setMinSalaryFilter(e.target.value);
          }}
        />
        <Box display="flex" alignItems="center" paddingX="20px">
          <Typography fontSize="30px">-</Typography>
        </Box>
        <SalarySearchField
          type="Maximum"
          borderRadius="0px 5px 5px 0px"
          val={maxSalaryFilter}
          setVal={(e) => {
            setMaxSalaryFilter(e.target.value);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Employees</h2>
        <Button
          variant="contained"
          sx={{ height: "40px" }}
          onClick={() => {
            setOpenCreateModal(true);
          }}
          data-testid="create-user-btn"
        >
          Create User
        </Button>
      </Box>

      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 4px",
          "& .MuiTableCell-root": { paddingLeft: "8px" },
        }}
      >
        <TableHead>
          <TableRow sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}>
            <TableCell sx={{ padding: 0, width: "25px" }} />
            {tableHeaders.map((header) => {
              if (header !== "Action") {
                return (
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    sortDirection={
                      orderBy === header.toLowerCase() ? order : false
                    }
                  >
                    <TableSortLabel
                      active={orderBy === header.toLowerCase()}
                      direction={
                        orderBy === header.toLowerCase() ? order : "asc"
                      }
                      onClick={(e) =>
                        handleRequestSort(e, header.toLowerCase())
                      }
                    >
                      {header}
                      {orderBy === header ? (
                        <Box
                          component="span"
                          //   sx={visuallyHidden}
                        >
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell sx={{ fontWeight: "bold", paddingLeft: "20px" }}>
                    {header}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length > 0 ? (
            stableSort(filteredData, getComparator(order, orderBy))
              .slice(
                activePage * rowsPerPage,
                activePage * rowsPerPage + rowsPerPage
              )
              .map((employee, index) => {
                const editIndex = "edit-user-iconbtn-" + index;
                const deleteIndex = "delete-user-iconbtn" + index;
                return (
                  <TableRow
                    key={index}
                    sx={{
                      background: "#e8e8e8",
                      border: "1px solid #e8e8e8",
                      borderRadius: "10px",
                    }}
                  >
                    <TableCell
                      sx={{ width: "25px", padding: 0, paddingLeft: "inherit" }}
                    >
                      <Avatar
                        alt=""
                        src=""
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "5px",
                        }}
                      />
                    </TableCell>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.login}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-start">
                        <IconButton
                          onClick={(e) => {
                            setSelectedEmployee(employee);
                            setOpenEditModal(true);
                          }}
                          sx={{ color: "#000" }}
                          data-testid={editIndex}
                          title={editIndex}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setOpenDeleteModal(true);
                          }}
                          sx={{ color: "#000" }}
                          data-testid={deleteIndex}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
          ) : (
            <TableRow>
              <TableCell>No employee data available</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={activePage}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderBottom: "none",
              // "& .MuiToolbar-root": {
              //   display: "flex",
              //   justifyContent: "flex-end",
              // },
            }}
          />
        </TableFooter>
      </Table>

      <CreateModal
        open={openCreateModal}
        data={selectedEmployee}
        handleChange={handleChange}
        setOpenCreateModal={setOpenCreateModal}
        handleCreate={handleCreate}
        setSelectedEmployee={setSelectedEmployee}
      />

      <EditModal
        open={openEditModal}
        data={selectedEmployee}
        handleChange={handleChange}
        setOpenEditModal={setOpenEditModal}
        handleSave={handleSave}
        setSelectedEmployee={setSelectedEmployee}
      />

      <DeleteModal
        open={openDeleteModal}
        data={selectedEmployee}
        setOpenDeleteModal={setOpenDeleteModal}
        handleDelete={handleDelete}
        setSelectedEmployee={setSelectedEmployee}
      />
    </Container>
  );
};

export default DataTable;
