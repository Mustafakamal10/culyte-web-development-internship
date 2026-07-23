
// Spread Operator

// Copy an array

const numbers = [1, 2, 3];

const copyNumbers = [...numbers];

console.log(copyNumbers);


// Merge Arrays

const frontend = ["HTML", "CSS"];
const backend = ["Node.js", "MongoDB"];

const skills = [...frontend, ...backend];

console.log(skills);


// Copy Object

const user = {
    name: "Mustafa",
    age: 21
};

const newUser = {
    ...user
};

console.log(newUser);


// Merge Objects

const personalInfo = {
    name: "Mustafa"
};

const education = {
    university: "Abasyn University"
};

const student = {
    ...personalInfo,
    ...education
};

console.log(student);


// Update Object

// React uses spread to create a new object.

const profile = {
    name: "Mustafa",
    city: "Peshawar"
};

const updatedProfile = {
    ...profile,
    city: "Islamabad"
};

console.log(updatedProfile);


// Rest Operator

// Rest collects multiple values into one array.

function total(...numbers) {

    console.log(numbers);

}

total(10, 20, 30, 40);


// Rest with Return

function add(...numbers) {

    let sum = 0;

    for (let number of numbers) {
        sum += number;
    }

    return sum;
}

console.log(add(5, 10, 15));


// Practice Example 1

const fruits = ["Apple", "Mango"];

const allFruits = [...fruits, "Orange"];

console.log(allFruits);


// Mutation changes the original object.

const user = {
    name: "Mustafa",
    city: "Peshawar"
};

const updatedUser = user;

updatedUser.city = "Islamabad";

console.log(user);
console.log(updatedUser);


// Practice Example 2

const laptop = {
    brand: "Dell",
    ram: "16GB"
};

const updatedLaptop = {
    ...laptop,
    storage: "512GB"
};

console.log(updatedLaptop);


// Practice Example 3

function showSubjects(...subjects) {

    console.log(subjects);

}

showSubjects("Math", "English", "Programming");

