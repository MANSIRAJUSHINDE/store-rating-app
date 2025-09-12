// src/components/admin/AddStoreForm.jsx
import React, { useState, useEffect, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddStoreForm = ({ refresh }) => {
  const { authHeaders } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", address: "", ownerId: "" });
  const [error, setError] = useState("");
  const [owners, setOwners] = useState([]);

  // Fetch store owners
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
      refresh(); // refresh the store list
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-4">
      <h3 className="font-bold mb-2">Add Store</h3>
      {error && <p className="text-red-500">{error}</p>}

      <input
        name="name"
        placeholder="Store Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        name="email"
        placeholder="Store Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        name="address"
        placeholder="Store Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      />

      <select
        name="ownerId"
        value={form.ownerId}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        required
      >
        <option value="">Select Store Owner</option>
        {owners.map(o => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Store
      </button>
    </form>
  );
};

export default AddStoreForm;
