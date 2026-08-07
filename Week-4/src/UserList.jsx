import { useEffect, useState } from "react";

function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetching data inside useEffect works well for small projects.
    // As the app grows, handling loading, errors, caching, and refetching
    // becomes repetitive. Libraries like TanStack Query make this easier.

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                return response.json();

            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-blue-600">
                    Loading...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-red-600">
                    {error}
                </h1>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold text-center mb-2">
                User Directory
            </h1>

            <p className="text-center text-gray-600 mb-8">
                Total Users: {users.length}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl hover:bg-blue-50 duration-300"
                    >

                        <div className="flex justify-center">

                            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                                {user.name.charAt(0)}
                            </div>

                        </div>

                        <h2 className="text-xl font-bold text-center mt-4">
                            {user.name}
                        </h2>

                        <p className="text-center text-gray-500">
                            @{user.username}
                        </p>

                        <div className="mt-5 space-y-2">

                            <p>
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>

                            <p>
                                <span className="font-semibold">Phone:</span> {user.phone}
                            </p>

                            <p>
                                <span className="font-semibold">Website:</span> {user.website}
                            </p>

                            <p>
                                <span className="font-semibold">Company:</span> {user.company.name}
                            </p>

                        </div>

                        <input
                            type="text"
                            placeholder="Write a note..."
                            className="w-full border rounded-md p-2 mt-5 focus:outline-none focus:border-blue-500"
                        />

                        <button
                            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            View Profile
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default UserList;