import { useState } from "react";
import useDebounce from "../src/Common/useDebounce";

function Search() {

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    return (

        <div className="p-6 max-w-md mx-auto">

            <h1 className="text-2xl font-bold mb-4">
                Search
            </h1>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full border rounded-md p-3 focus:outline-none focus:border-blue-500"
            />

            <p className="mt-4">
                Search: {debouncedSearch}
            </p>

        </div>

    );
}

export default Search;