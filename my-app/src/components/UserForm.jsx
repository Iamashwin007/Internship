import React from "react";

const UserForm = ({
  name,
  email,
  setName,
  setEmail,
  addUser,
  updateUser,
  editing,
}) => {
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {editing ? (
        <button onClick={updateUser}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}
    </div>
  );
};

export default UserForm;