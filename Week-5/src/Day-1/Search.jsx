function Search({ search, onSearchChange }) {

    return (
        <div>

            <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full border rounded-md p-3"
            />

            <p className="mt-3">
                Search: {search}
            </p>

        </div>
    );
}

export default Search;