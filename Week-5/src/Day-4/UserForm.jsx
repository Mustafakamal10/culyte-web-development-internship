import { useState } from "react";
import { submitUser } from "./UserFormLogic";

function UserForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = await submitUser(formData);

            console.log("User Created:", data);

            alert("User created successfully!");

        } catch (error) {

            console.log("Error:", error);

            alert("Something went wrong!");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-md">

            <h1 className="mb-6 text-2xl font-bold">
                Create User
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full rounded-md border p-3"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full rounded-md border p-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

            </form>

        </div>
    );
}

export default UserForm;