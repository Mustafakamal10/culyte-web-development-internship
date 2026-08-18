import { useQuery } from "@tanstack/react-query";

function UserList() {

    const {
        data: users,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["users"],

        queryFn: async () => {

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            return response.json();
        },
    });


    if (isLoading) {
        return <p className="p-6">Loading...</p>;
    }

    if (isError) {
        return <p className="p-6 text-red-500">Failed to load users</p>;
    }


    return (
        <div className="p-6">

            <h1 className="mb-6 text-2xl font-bold">
                Users
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="rounded-lg bg-white p-4 shadow"
                    >

                        <h2 className="font-bold">
                            {user.name}
                        </h2>

                        <p className="text-gray-600">
                            {user.email}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default UserList;