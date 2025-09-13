// src/components/admin/AddStoreForm.jsx
import React, { useState, useEffect, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddStoreForm = ({ refresh }) => {
  const { authHeaders } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", address: "", ownerId: "" });
  const [error, setError] = useState("");
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await API.get("/admin/users", { headers: authHeaders() });
        const storeOwners = res.data.users.filter(u => u.role === "store_owner");
        setOwners(storeOwners);
      } catch (err) {
        console.error("Failed to fetch owners:", err.response || err);
      }
    };
    fetchOwners();
  }, [authHeaders]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.ownerId) return setError("Please select a store owner");

    try {
      await API.post("/admin/stores", form, { headers: authHeaders() });
      setForm({ name: "", email: "", address: "", ownerId: "" });
      setError("");
      refresh();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        name="name"
        placeholder="Store Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        name="email"
        placeholder="Store Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <input
        name="address"
        placeholder="Store Address"
        value={form.address}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      <select
        name="ownerId"
        value={form.ownerId}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="">Select Store Owner</option>
        {owners.map((o) => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transform transition-transform duration-300"
      >
        Add Store
      </button>
    </form>
  );
};

export default AddStoreForm;
