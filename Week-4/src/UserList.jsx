import { useEffect, useState } from "react";

function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));

    }, []);

    return (

        <div className="p-5">

            <h1 className="text-2xl font-bold text-center mb-6">
                Users
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="border rounded-lg p-4 hover:bg-blue-100"
                    >

                        <h2 className="text-lg font-semibold">
                            {user.name}
                        </h2>

                        <p>{user.email}</p>

                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="border p-2 mt-3 w-full focus:outline-none focus:border-blue-500"
                        />

                    </div>

                ))}

            </div>

        </div>

    );

}

export default UserList;