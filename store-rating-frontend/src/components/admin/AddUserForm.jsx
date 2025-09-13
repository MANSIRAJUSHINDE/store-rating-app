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
    role: "normal",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/users", form, { headers: authHeaders() });
      setForm({ name: "", email: "", address: "", password: "", role: "normal" });
      setError("");
      onUserAdded();
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="normal">Normal User</option>
        <option value="admin">Admin</option>
        <option value="store_owner">Store Owner</option>
      </select>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition-transform duration-300"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
