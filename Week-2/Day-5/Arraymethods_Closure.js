
// Template Literals

const name = "Mustafa";
const city = "Peshawar";

console.log(`My name is ${name} and I live in ${city}.`);


// Array of Objects

const students = [
    { id: 1, name: "Ali", marks: 80 },
    { id: 2, name: "Ahmed", marks: 45 },
    { id: 3, name: "Sara", marks: 90 },
    { id: 4, name: "Zain", marks: 65 }
];


// map()

const studentNames = students.map((student) => {
    return student.name;
});

console.log(studentNames);


// filter()

const passedStudents = students.filter((student) => {
    return student.marks >= 50;
});

console.log(passedStudents);


// find()

const student = students.find((student) => {
    return student.id === 2;
});

console.log(student);


// reduce()

const totalMarks = students.reduce((total, student) => {
    return total + student.marks;
}, 0);

console.log(totalMarks);


// some()

const hasFailed = students.some((student) => {
    return student.marks < 50;
});

console.log(hasFailed);


// every()

const allPassed = students.every((student) => {
    return student.marks >= 50;
});

console.log(allPassed);


// Closures

function counter() {

    let count = 0;

    return function () {
        count++;
        return count;
    };

}

const increment = counter();

console.log(increment());
console.log(increment());
console.log(increment());


// Practice Example 1

const products = [
    { name: "Laptop", price: 80000 },
    { name: "Mouse", price: 2000 },
    { name: "Keyboard", price: 5000 }
];

const productNames = products.map((product) => {
    return product.name;
});

console.log(productNames);


// Practice Example 2

const expensiveProducts = products.filter((product) => {
    return product.price > 3000;
});

console.log(expensiveProducts);


// Practice Example 3

const laptop = products.find((product) => {
    return product.name === "Laptop";
});

console.log(laptop);


// Practice: Raw Array of Objects

const employees = [
    { id: 1, name: "Ali", department: "IT", salary: 50000 },
    { id: 2, name: "Ahmed", department: "HR", salary: 40000 },
    { id: 3, name: "Sara", department: "IT", salary: 60000 },
    { id: 4, name: "Ayesha", department: "Finance", salary: 55000 }
];


// Transform Data

function getEmployeeNames(data) {
    return data.map((employee) => employee.name);
}

console.log(getEmployeeNames(employees));


// Filter Data

function getITEmployees(data) {
    return data.filter((employee) => employee.department === "IT");
}

console.log(getITEmployees(employees));


// Search Data

function findEmployee(data, employeeName) {
    return data.find((employee) => employee.name === employeeName);
}

console.log(findEmployee(employees, "Sara"));


