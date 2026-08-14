import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../Day-2_3/components/ui/button";
import { Input } from "../Day-2_3/components/ui/input";

import api from "./api";


const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.string().email("Enter a valid email"),
});


function CreateUser() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
    });


    const onSubmit = async (data) => {

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const response = await api.post("/users", data);

            console.log("Created User:", response.data);

            setMessage("User created successfully!");

            reset();

        } catch (error) {

            console.log(error);

            setError("Failed to create user.");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-md">

            <h1 className="mb-6 text-center text-2xl font-bold">
                Create User
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >

                <div>

                    <label className="mb-2 block font-medium">
                        Name
                    </label>

                    <Input
                        placeholder="Enter name"
                        {...register("name")}
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}

                </div>


                <div>

                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <Input
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}

                </div>


                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Creating..." : "Create User"}
                </Button>


                {message && (
                    <p className="text-center text-sm text-green-600">
                        {message}
                    </p>
                )}


                {error && (
                    <p className="text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

            </form>

        </div>
    );
}

export default CreateUser;