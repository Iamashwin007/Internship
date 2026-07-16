import React from "react";

const UserList = ({ users, editUser, deleteUser }) => {
  return (
    <div className="cards">
      {users.map((user) => (
        <div className="card" key={user.id}>
          <h2>{user.name}</h2>

          <p>{user.email}</p>

          <div className="btns">
            <button onClick={() => editUser(user)}>Edit</button>

            <button
              className="delete"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;