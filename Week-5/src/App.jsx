import { useState } from "react";
import Search from "../src/Day-1/Search";
import useDebounce from "../src/Day-1/useDebounce";
import UserForm from "./Day-2_3/UserForm";
import Day4UserForm from "./Day-4/UserForm";

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

            {/* =========================
                Week 5 - Day 2-3
                React Hook Form + Zod
                ========================= */}

            <UserForm />

            {/* =========================
                Week 5 - Day 4
                API Form Submit
                Loading State
                cn() / cva
                ========================= */}

            <Day4UserForm />

        </div>
    );
}

export default App;