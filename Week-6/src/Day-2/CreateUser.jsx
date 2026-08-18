import { useState } from "react";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";


function CreateUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    // Access TanStack Query cache
    const queryClient = useQueryClient();


    const mutation = useMutation({

        mutationFn: async (newUser) => {

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(newUser),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            return response.json();
        },


        // Runs after successful mutation
        onSuccess: () => {

            // Tell TanStack Query that users data is outdated
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            setName("");
            setEmail("");
        },
    });


    const handleSubmit = (e) => {

        e.preventDefault();

        mutation.mutate({
            name,
            email,
        });
    };


    return (

        <div className="mx-auto max-w-md p-6">

            <h1 className="mb-5 text-2xl font-bold">
                Create User
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full rounded border p-3"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full rounded border p-3"
                />

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full rounded bg-blue-500 p-3 text-white disabled:opacity-50"
                >
                    {mutation.isPending
                        ? "Creating..."
                        : "Create User"}
                </button>

            </form>


            {mutation.isSuccess && (
                <p className="mt-4 text-green-600">
                    User created successfully!
                </p>
            )}


            {mutation.isError && (
                <p className="mt-4 text-red-600">
                    {mutation.error.message}
                </p>
            )}

        </div>
    );
}

export default CreateUser;