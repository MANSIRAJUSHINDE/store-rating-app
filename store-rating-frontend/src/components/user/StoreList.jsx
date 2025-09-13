import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import StoreCard from "./StoreCard";

const StoreList = () => {
  const { API } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStores = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/stores/user");
      setStores(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleRatingUpdate = () => fetchStores();

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 mb-5 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />

      {loading && <p className="text-indigo-600">Loading stores...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onRatingUpdate={handleRatingUpdate}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-4">No stores found.</p>
        )}
      </div>
    </div>
  );
};

export default StoreList;
