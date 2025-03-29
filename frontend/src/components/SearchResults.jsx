import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SEARCH_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios({
        method: "get",
        url: `${SEARCH_API_END_POINT}`,
        headers: { "Content-Type": "application/json" },
        params: { query: searchQuery }, // Add query as a parameter
        withCredentials: true,
      });
      console.log("response111: ", response);
      if (response?.data?.results?.length > 0) {
        console.log("response.data.results====> ", response.data.results);
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{query}"
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && results.length === 0 && <p>No data found.</p>}

        {!loading && results.length > 0 && (
          <ul className="space-y-4">
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() =>
                  navigate(`/profile/${item._id}`, { state: { item } })
                }
                className="border p-4 rounded-md shadow-md flex items-center gap-4"
              >
                {/* Display Logo if available */}
                {item.logo || item.profile?.profilePhoto ? (
                  <img
                    src={item.logo || item?.profile?.profilePhoto}
                    alt={item.name || item.fullname}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold">
                    {item.name || item.fullname}
                  </h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
