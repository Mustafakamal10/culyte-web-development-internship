
// Comments

// This is a single line comment.

/*
This is a
multi line comment.
*/


// Statements

// A statement is an instruction that JavaScript executes.

console.log("Hello JavaScript");

let course = "Web Development";

console.log(course);


// Data Types

// String stores text.
let name = "Mustafa";

// Number stores numeric values.
let age = 21;

// Boolean stores true or false.
let isStudent = true;

// Undefined means no value is assigned.
let city;

// Null means the value is intentionally empty.
let marks = null;

console.log(name);
console.log(age);
console.log(isStudent);
console.log(city);
console.log(marks);


// Variables

// let is used when the value can change.

let score = 80;

console.log(score);

score = 90;

console.log(score);


// const is used when the value should not change.

const country = "Pakistan";

console.log(country);

// country = "USA"; // Error


// Scope

// A variable can only be used where it is declared.

let university = "Abasyn University";

{
    let semester = "Final Year";

    console.log(university);
    console.log(semester);
}

console.log(university);

// console.log(semester); // Error


// Block Scope

// let and const work only inside the block {}.

{
    const cityName = "Peshawar";

    console.log(cityName);
}

// console.log(cityName); // Error


// let vs const

// let can be updated.

let price = 500;

console.log(price);

price = 700;

console.log(price);


// const cannot be reassigned.

const pi = 3.14;

console.log(pi);

// pi = 3.1416; // Error


// More Data Types

let language = "JavaScript"; // String
let version = 2026;          // Number
let isEasy = true;           // Boolean
let framework = null;        // Null
let library;                 // Undefined

console.log(language);
console.log(version);
console.log(isEasy);
console.log(framework);
console.log(library);


// More Statements

const message = "Learning JavaScript";

console.log(message);

console.log("Week 2 - Day 1 Completed");