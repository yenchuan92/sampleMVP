import request from "../lib/axios-request-wrapper";

// change mock to false if testing with backend
const mock = true;
// change baseURL if backend URL is different
const baseURL = "http://localhost:8080/";

export const getUsers = () => {
  console.log("GET Users");
  if (mock) {
    return Promise.resolve([
      { id: "e0001", login: "hpotter", name: "Harry Potter", salary: 1234.0 },
      { id: "e0002", login: "rweasley", name: "Ron Weasley", salary: 19234.5 },
      { id: "e0003", login: "ssnape", name: "Severus Snape", salary: 4000.0 },
      {
        id: "e0004",
        login: "rhagrid",
        name: "Rubeus Hagrid",
        salary: 3999.999,
      },
      {
        id: "e0005",
        login: "voldemort",
        name: "Lord Voldemort",
        salary: 523.4,
      },
      {
        id: "e0006",
        login: "gweasley",
        name: "Ginny Weasley",
        salary: 4000.004,
      },
      { id: "e0007", login: "hgranger", name: "Hermione Granger", salary: 0.0 },
      {
        id: "e0008",
        login: "adumbledore",
        name: "Albus Dumbledore",
        salary: 34.23,
      },
      { id: "e0009", login: "dmalfoy", name: "Draco Malfoy", salary: 34234.5 },
      { id: "e0010", login: "basilisk", name: "Basilisk", salary: -23.43 },
    ]);
  } else {
    return request(baseURL, {
      url: "/users",
      method: "GET",
    });
  }
};

export const getUser = (id) => {
  console.log("GET User");
  if (mock) {
    return Promise.resolve([
      { id: "e0007", login: "hgranger", name: "Hermione Granger", salary: 0.0 },
    ]);
  } else {
    return request(baseURL, {
      url: `/users/${id}`,
      method: "GET",
    });
  }
};

export const editUser = (id, data) => {
  console.log("PATCH User");
  if (mock) {
    return Promise.resolve([
      {
        id: "e0007",
        login: "hgranger",
        name: "Hermione Granger",
        salary: 1000.0,
      },
    ]);
  } else {
    return request(baseURL, {
      url: `/users/${id}`,
      method: "PATCH",
      data: data,
    });
  }
};

export const deleteUser = (id) => {
  console.log("DELETE User");
  if (mock) {
    return Promise.resolve(true);
  } else {
    return request(baseURL, {
      url: `/users/${id}`,
      method: "DELETE",
    });
  }
};

export const createUser = (data) => {
  console.log("POST User");
  if (mock) {
    return Promise.resolve([
      {
        id: "e0011",
        login: "testuser",
        name: "Test User",
        salary: 999.99,
      },
    ]);
  } else {
    return request(baseURL, {
      url: `/users/create`,
      method: "POST",
      data: data,
    });
  }
};
