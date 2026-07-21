
// Functions

// A function is used to perform a task.

function sayHello() {
    console.log("Hello JavaScript");
}

sayHello();


// Parameters and Arguments

// Parameter receives the value.

function greet(name) {
    console.log("Hello " + name);
}

// Argument is the value passed to the function.

greet("Mustafa");
greet("Ali");


// Return

// return sends a value back.

function add(num1, num2) {
    return num1 + num2;
}
let result = add(10, 20);
console.log(result);


// Regular Function

function multiply(a, b) {
    return a * b;
}
console.log(multiply(5, 4));


// Arrow Function

const divide = (a, b) => {
    return a / b;
};
console.log(divide(20, 5));


// React mostly uses arrow functions because they are shorter and easier to read.

const welcome = () => {
    console.log("Welcome to React");
};
welcome();


// if else

let age = 20;

if (age >= 18) {
    console.log("You can vote");
} else {
    console.log("You cannot vote");
}


// else if

let marks = 75;

if (marks >= 80) {
    console.log("Grade A");
} else if (marks >= 60) {
    console.log("Grade B");
} else {
    console.log("Grade C");
}


// Ternary Operator which are mostly use in React.

let isLoggedIn = true;

let message = isLoggedIn ? "Welcome" : "Please Login";

console.log(message);


// Switch

let day = 2;

switch (day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    case 3:
        console.log("Wednesday");
        break;

    default:
        console.log("Invalid Day");
}


// For Loop

// Repeat code for a fixed number of times.

for (let i = 1; i <= 5; i++) {
    console.log(i);
}


// While Loop

// Runs while the condition is true.

let count = 1;

while (count <= 5) {
    console.log(count);
    count++;
}


// Do While Loop

// Runs at least one time.

let number = 1;

do {
    console.log(number);
    number++;
} while (number <= 3);


//funcation 

function square(number) {
    return number * number;
}

console.log(square(6));

//Arrow funcation

const evenOrOdd = (num) => {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
};

console.log(evenOrOdd(7));


