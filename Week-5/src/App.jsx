import { useState } from "react";
import Search from "../src/Day-1/Search";
import useDebounce from "../src/Day-1/useDebounce";

function App() {

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const handleSearch = (value) => {
        setSearch(value);
    };

    return (
        <div className="max-w-md mx-auto p-6">

            <h1 className="text-2xl font-bold mb-5">
                Search Users
            </h1>

            <Search
                search={search}
                onSearchChange={handleSearch}
            />

            <p className="mt-5 text-gray-600">
                Debounced Value: {debouncedSearch}
            </p>

        </div>
    );
}

export default App;