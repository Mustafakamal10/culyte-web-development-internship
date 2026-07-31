
// JSON.stringify()

const user = {
    name: "Mustafa",
    city: "Peshawar",
    course: "Web Development"
};

const jsonData = JSON.stringify(user);

console.log(jsonData);


// JSON.parse()

const student = '{"name":"Ali","age":22,"city":"Lahore"}';

const studentObject = JSON.parse(student);

console.log(studentObject);


// ES Modules

// Export

export const company = "Culyte";

export function greet() {
    console.log("Welcome");
}


// Import

// import { company, greet } from "./script.js";


// Immutability

const profile = {
    name: "Mustafa",
    city: "Peshawar"
};

const updatedProfile = {
    ...profile,
    city: "Islamabad"
};

console.log(profile);
console.log(updatedProfile);


// Mutation

const product = {
    name: "Laptop",
    price: 80000
};

const updatedProduct = product;

updatedProduct.price = 90000;

console.log(product);
console.log(updatedProduct);


// Callback Function

function greetUser(name, callback) {

    console.log("Hello " + name);

    callback();

}

function completed() {

    console.log("Task Completed");

}

greetUser("Mustafa", completed);


// Higher Order Function

function calculate(num1, num2, operation) {

    return operation(num1, num2);

}

function add(a, b) {

    return a + b;

}

console.log(calculate(10, 20, add));


// React Examples

function onClick() {

    console.log("Button Clicked");

}

function onChange() {

    console.log("Input Changed");

}

function onSuccess() {

    console.log("Data Loaded Successfully");

}

onClick();
onChange();
onSuccess();


// Practice

async function getUsers() {

    console.log("Loading...");

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const users = await response.json();

        users.forEach((user) => {

            console.log(user.name);
            console.log(user.address?.city ?? "City Not Available");
            console.log(user.company?.name ?? "Company Not Available");

        });

    } catch (error) {

        console.log("Error:", error.message);

    } finally {

        console.log("Request Finished");

    }

}

getUsers();


