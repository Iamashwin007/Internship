import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./services/api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [editing, setEditing] = useState(false);

  const [currentId, setCurrentId] = useState(null);

  const fetchUsers = async () => {
    const response = await fetch(API);

    const data = await response.json();

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email) return;

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    setUsers([data, ...users]);

    setName("");
    setEmail("");
  };

  const editUser = (user) => {
    setEditing(true);

    setCurrentId(user.id);

    setName(user.name);

    setEmail(user.email);
  };

  const updateUser = async () => {
    const response = await fetch(`${API}/${currentId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: currentId,
        name,
        email,
      }),
    });

    const updated = await response.json();

    setUsers(
      users.map((user) =>
        user.id === currentId ? updated : user
      )
    );

    setEditing(false);

    setCurrentId(null);

    setName("");

    setEmail("");
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <h1>User Management System</h1>

      <UserForm
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        addUser={addUser}
        updateUser={updateUser}
        editing={editing}
      />

      <UserList
        users={users}
        editUser={editUser}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default App;