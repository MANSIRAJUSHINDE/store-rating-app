import React, { useState } from "react";
import StoreDetailsModal from "./StoreDetailsModal";
import StoreRatingsModal from "./StoreRatingsModal";

const StoreTable = ({ stores = [] }) => {
  const [filter, setFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [selectedRatingsStoreId, setSelectedRatingsStoreId] = useState(null);

  if (!Array.isArray(stores)) stores = [];

  const filteredStores = stores.filter(
    (s) =>
      s.name?.toLowerCase().includes(filter.toLowerCase()) ||
      s.email?.toLowerCase().includes(filter.toLowerCase()) ||
      s.address?.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedStores = [...filteredStores].sort((a, b) => {
    if (!sortField) return 0;
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "averageRating") {
      valA = Number(valA) || 0;
      valB = Number(valB) || 0;
    } else {
      valA = valA?.toString().toLowerCase() || "";
      valB = valB?.toString().toLowerCase() || "";
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Stores</h2>
      <input
        type="text"
        placeholder="Filter stores..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-2 rounded w-full"
      />

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {["name", "email", "address", "averageRating"].map((field) => (
              <th
                key={field}
                className="border px-4 py-2 cursor-pointer select-none"
                onClick={() => handleSort(field)}
              >
                {field === "averageRating" ? "AVERAGE RATING" : field.toUpperCase()}
                {sortField === field ? (sortOrder === "asc" ? " ↑" : " ↓") : ""}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStores.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No stores found.
              </td>
            </tr>
          ) : (
            sortedStores.map((s) => (
              <tr key={s.id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.email}</td>
                <td className="border px-4 py-2">{s.address}</td>
                <td className="border px-4 py-2">{s.averageRating ?? 0}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => setSelectedStoreId(s.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    onClick={() => setSelectedRatingsStoreId(s.id)}
                  >
                    View Ratings
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedStoreId && (
        <StoreDetailsModal
          storeId={selectedStoreId}
          onClose={() => setSelectedStoreId(null)}
        />
      )}

      {selectedRatingsStoreId && (
        <StoreRatingsModal
          storeId={selectedRatingsStoreId}
          onClose={() => setSelectedRatingsStoreId(null)}
        />
      )}
    </div>
  );
};

export default StoreTable;
