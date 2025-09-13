import React, { useState } from "react";

const UserTable = ({ users = [], onViewDetails }) => {
  const [filter, setFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  if (!Array.isArray(users)) users = [];

  // Filtering
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(filter.toLowerCase()) ||
      u.email?.toLowerCase().includes(filter.toLowerCase()) ||
      u.address?.toLowerCase().includes(filter.toLowerCase()) ||
      u.role?.toLowerCase().includes(filter.toLowerCase())
  );

  // Sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
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
      <h2 className="text-2xl font-bold mb-3 text-blue-700">Users</h2>
      
      <input
        type="text"
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 p-2 mb-4 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              {["name", "email", "address", "role", "averageRating", "actions"].map(
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
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              sortedUsers.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-blue-50 transition cursor-pointer text-gray-800"
                >
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.address}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2 text-center">{u.averageRating ?? 0}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onViewDetails(u.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition transform hover:scale-105"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
