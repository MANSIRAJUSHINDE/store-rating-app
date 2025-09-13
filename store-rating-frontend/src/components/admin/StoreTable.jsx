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

  // Filtering
  const filteredStores = stores.filter(
    (s) =>
      s.name?.toLowerCase().includes(filter.toLowerCase()) ||
      s.email?.toLowerCase().includes(filter.toLowerCase()) ||
      s.address?.toLowerCase().includes(filter.toLowerCase())
  );

  // Sorting
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
  <h2 className="text-2xl font-bold mb-3 text-blue-700">Stores</h2>

  <input
    type="text"
    placeholder="Filter stores..."
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="border border-gray-300 p-2 mb-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
  />

  <div className="overflow-x-auto rounded-lg shadow-lg">
    <table className="min-w-full bg-white divide-y divide-gray-200">
      <thead className="bg-blue-50">
        <tr>
          {["name", "email", "address", "averageRating", "actions"].map(
            (field) => (
              <th
                key={field}
                className="px-4 py-3 text-left text-xs sm:text-sm md:text-base font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none"
                onClick={() => field !== "actions" && handleSort(field)}
              >
                {field === "averageRating"
                  ? "Average Rating"
                  : field === "actions"
                  ? "Actions"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
                {sortField === field && field !== "actions"
                  ? sortOrder === "asc"
                    ? " ↑"
                    : " ↓"
                  : ""}
              </th>
            )
          )}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-100">
        {sortedStores.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-500">
              No stores found.
            </td>
          </tr>
        ) : (
          sortedStores.map((s) => (
            <tr
              key={s.id}
              className="hover:bg-blue-50 transition cursor-pointer text-gray-800"
            >
              <td className="px-4 py-2">{s.name}</td>
              <td className="px-4 py-2">{s.email}</td>
              <td className="px-4 py-2">{s.address}</td>
              <td className="px-4 py-2 text-center">{s.averageRating ?? 0}</td>
              <td className="px-4 py-2 text-center flex justify-center gap-2">
                <button
                  onClick={() => setSelectedStoreId(s.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition transform hover:scale-105"
                >
                  View Details
                </button>
                <button
                  onClick={() => setSelectedRatingsStoreId(s.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-900 transition transform hover:scale-105"
                >
                  View Ratings
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Modals */}
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
