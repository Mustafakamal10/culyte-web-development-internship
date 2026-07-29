
// GET Request

async function getUsers() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        console.log(response.status);

        const users = await response.json();

        console.log(users);

    } catch (error) {

        console.log(error);

    }

}

getUsers();


// POST Request

async function createPost() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: "JavaScript",
                body: "Learning Fetch API",
                userId: 1
            })

        });

        console.log(response.status);

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

createPost();


// Status Codes

const statusCode = 200;

if (statusCode === 200) {
    console.log("Request Successful");
} else if (statusCode === 404) {
    console.log("Data Not Found");
} else if (statusCode === 500) {
    console.log("Server Error");
}


// Request Body

const requestBody = {
    name: "Murtaza",
    course: "Web Development"
};

console.log(requestBody);


// Response Body

const responseBody = {
    id: 1,
    message: "Data Received Successfully"
};

console.log(responseBody);


// Error Handling

async function getPosts() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        const posts = await response.json();

        console.log(posts);

    } catch (error) {

        console.log("Error:", error);

    }

}

getPosts();


// Practice Example 1

async function getTodos() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/todos");

        const todos = await response.json();

        console.log(todos);

    } catch (error) {

        console.log(error);

    }

}

getTodos();


// Practice Example 2

async function createUser() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: "Ali",
                city: "Peshawar"
            })

        });

        const user = await response.json();

        console.log(user);

    } catch (error) {

        console.log(error);

    }

}

createUser();


