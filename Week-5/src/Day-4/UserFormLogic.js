import axios from "axios";

export const submitUser = async (userData) => {

    const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userData
    );

    return response.data;
};