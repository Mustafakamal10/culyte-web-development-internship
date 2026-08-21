import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function CreateUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: async (userData) => {

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            return response.json();
        },

        onSuccess: () => {

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
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-md space-y-4 p-6"
        >

            <h1 className="text-2xl font-bold">
                Create User
            </h1>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded border p-3"
            />

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded border p-3"
            />

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full rounded bg-blue-500 p-3 text-white"
            >
                {mutation.isPending
                    ? "Creating..."
                    : "Create User"}
            </button>

            {mutation.isSuccess && (
                <p className="text-green-600">
                    User created successfully!
                </p>
            )}

            {mutation.isError && (
                <p className="text-red-600">
                    Failed to create user.
                </p>
            )}

        </form>
    );
}

export default CreateUser;