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
      <h2 className="text-2xl font-bold mb-2">Users</h2>
      <input
        type="text"
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-2 rounded w-full"
      />

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {["name", "email", "address", "role", "averageRating", "actions"].map(
              (field) => (
                <th
                  key={field}
                  className="border px-4 py-2 cursor-pointer select-none"
                  onClick={() => field !== "actions" && handleSort(field)}
                >
                  {field === "averageRating"
                    ? "AVERAGE RATING"
                    : field === "actions"
                    ? "ACTIONS"
                    : field.toUpperCase()}
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
        <tbody>
          {sortedUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            sortedUsers.map((u) => (
              <tr key={u.id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.address}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2">{u.averageRating ?? 0}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => onViewDetails(u.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
  );
};

export default UserTable;
