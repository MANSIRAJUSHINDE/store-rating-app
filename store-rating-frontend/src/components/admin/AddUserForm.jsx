// src/components/admin/AddUserForm.jsx
import React, { useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddUserForm = ({ onUserAdded }) => {
  const { authHeaders } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "normal", // default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/users", form, { headers: authHeaders() }); // added auth headers
      setForm({ name: "", email: "", address: "", password: "", role: "normal" });
      setError("");
      onUserAdded(); // refresh the dashboard
    } catch (err) {
      console.error("Add user error:", err.response || err);
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-4">
      <h3 className="font-bold mb-2">Add User</h3>
      {error && <p className="text-red-500">{error}</p>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      >
        <option value="normal">Normal User</option>
        <option value="admin">Admin</option>
        <option value="store_owner">Store Owner</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
