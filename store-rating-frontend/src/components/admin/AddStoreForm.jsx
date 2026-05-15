import React, { useState, useEffect, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddStoreForm = ({ refresh }) => {
  const { logout } = useContext(AuthContext); // logout in case of 401
  const [form, setForm] = useState({ name: "", email: "", address: "", ownerId: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // To handle button disabled state
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        // Headers are now handled automatically by the API interceptor
        const res = await API.get("/admin/users");
        const storeOwners = res.data.users.filter(u => u.role === "store_owner");
        setOwners(storeOwners);
      } catch (err) {
        if (err.response?.status === 401) logout();
        console.error("Failed to fetch owners:", err.response || err);
      }
    };
    fetchOwners();
  }, [logout]);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.ownerId) return setError("Please select a store owner");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/admin/stores", form);
      setSuccess("Store added successfully!");
      setForm({ name: "", email: "", address: "", ownerId: "" });
      
      // Call refresh to update the parent table
      if (refresh) refresh();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Register New Store</h3>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100">
          {success}
        </div>
      )}

      <div className="space-y-3">
        <input
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all disabled:bg-gray-50"
        />
        <input
          name="email"
          type="email"
          placeholder="Store Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all disabled:bg-gray-50"
        />
        <input
          name="address"
          placeholder="Store Address"
          value={form.address}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all disabled:bg-gray-50"
        />

        <select
          name="ownerId"
          value={form.ownerId}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all bg-white disabled:bg-gray-50"
        >
          <option value="">Select Store Owner</option>
          {owners.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-bold transition-all shadow-md 
          ${loading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:shadow-lg active:scale-95"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Add Store"
        )}
      </button>
    </form>
  );
};

export default AddStoreForm;