
// Promise

const promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Promise Completed");
    } else {
        reject("Promise Failed");
    }

});

promise
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Promise Finished");
    });


// Async Function

async function sayHello() {
    return "Hello JavaScript";
}

sayHello().then((message) => {
    console.log(message);
});


// Await

function getData() {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve("Data Loaded");
        }, 2000);

    });

}

async function loadData() {

    const result = await getData();

    console.log(result);

}

loadData();


// API Example

async function getUsers() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        const users = await response.json();

        console.log(users);

    } catch (error) {

        console.log(error);

    }

}

getUsers();


// Practice Example 1

function checkResult(marks) {

    return new Promise((resolve, reject) => {

        if (marks >= 50) {
            resolve("Pass");
        } else {
            reject("Fail");
        }

    });

}

checkResult(80)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


// Practice Example 2

async function welcome() {

    return "Welcome to Culyte Internship";

}

welcome().then((message) => {
    console.log(message);
});


// Practice Example 3

function orderFood() {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve("Food Delivered");
        }, 3000);

    });

}

async function orderStatus() {

    const message = await orderFood();

    console.log(message);

}

orderStatus();


