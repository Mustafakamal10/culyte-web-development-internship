import useUserStore from "./store/useUserStore";

function UserProfile() {

    const user = useUserStore((state) => state.user);

    const setUser = useUserStore((state) => state.setUser);

    const clearUser = useUserStore((state) => state.clearUser);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold">
                User Profile
            </h1>

            <p className="mt-4">
                {user ? user.name : "No user logged in"}
            </p>

            <button
                onClick={() =>
                    setUser({
                        name: "Mustafa",
                        email: "mustafa@example.com",
                    })
                }
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
                Set User
            </button>

            <button
                onClick={clearUser}
                className="ml-3 rounded bg-red-500 px-4 py-2 text-white"
            >
                Clear User
            </button>

        </div>
    );
}

export default UserProfile;