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
        return <p>Loading users...</p>;
    }


    if (isError) {
        return <p>Failed to load users.</p>;
    }


    return (
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">

            {users.map((user) => (

                <div
                    key={user.id}
                    className="rounded-lg bg-white p-5 shadow"
                >

                    <h2 className="text-xl font-bold">
                        {user.name}
                    </h2>

                    <p className="text-gray-600">
                        {user.email}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default UserList;