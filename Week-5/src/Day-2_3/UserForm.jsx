import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";


// Form validation rules

const userSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .string()
        .email("Please enter a valid email"),

    age: z
        .number()
        .min(18, "Age must be at least 18"),
});


function UserForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
    });


    // This function runs when the form is valid

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };


    return (

        <div className="mx-auto mt-10 w-full max-w-md rounded-xl bg-white p-6 shadow-md">

            <h1 className="mb-6 text-center text-2xl font-bold">
                User Registration
            </h1>


            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                {/* Name */}

                <div>

                    <label className="mb-2 block font-medium">
                        Name
                    </label>

                    <Input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name")}
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}

                </div>


                {/* Email */}

                <div>

                    <label className="mb-2 block font-medium">
                        Email
                    </label>

                    <Input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}

                </div>


                {/* Age */}

                <div>

                    <label className="mb-2 block font-medium">
                        Age
                    </label>

                    <Input
                        type="number"
                        placeholder="Enter your age"
                        {...register("age", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.age && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.age.message}
                        </p>
                    )}

                </div>


                <Button type="submit">
                    Submit
                </Button>

            </form>

        </div>
    );
}

export default UserForm;