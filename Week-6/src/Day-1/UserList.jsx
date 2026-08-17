import { useQuery } from "@tanstack/react-query";


function UserList() {

    const {
        data: users,
        isLoading,
        isError,
        error,
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
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">
                    Loading users...
                </h1>
            </div>
        );
    }


    if (isError) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                    {error.message}
                </h1>
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="mb-8 text-center text-3xl font-bold">
                Users
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="rounded-xl bg-white p-5 shadow-md"
                    >

                        <h2 className="text-xl font-bold">
                            {user.name}
                        </h2>

                        <p className="mt-2 text-gray-600">
                            {user.email}
                        </p>

                        <p className="text-gray-600">
                            {user.phone}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default UserList;