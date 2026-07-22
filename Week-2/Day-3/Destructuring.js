
// Object Destructuring

// Get values from object

const user = {
    name: "Mustafa",
    age: 21,
    city: "Peshawar"
};

const { name, age, city } = user;
console.log(name);
console.log(age);
console.log(city);


// Rename Variable

const student = {
    firstName: "Ali",
    semester: "Final Year"
};

const { firstName: studentName, semester } = student;
console.log(studentName);
console.log(semester);


// Default Value

const employee = {
    employeeName: "Ahmed"
};

const { employeeName, department = "IT" } = employee;
console.log(employeeName);
console.log(department);


// Array Destructuring

// Get values from array

const skills = ["HTML", "CSS", "JavaScript"];

const [skill1, skill2, skill3] = skills;

console.log(skill1);
console.log(skill2);
console.log(skill3);


// Skip Values

const numbers = [10, 20, 30, 40];

const [first, , third] = numbers;

console.log(first);
console.log(third);


// Default Value in Array

const fruits = ["Apple"];
const [fruit1, fruit2 = "Mango"] = fruits;

console.log(fruit1);
console.log(fruit2);


// Nested object destructuring

const person = {
    name: "Mustafa",
    address: {
        city: "Peshawar",
        country: "Pakistan"
    }
};

const {
    address: { city: userCity, country }
} = person;

console.log(userCity);
console.log(country);


// Destructuring in function parameter

function showUser({ name, age }) {
    console.log(name);
    console.log(age);
}

showUser(user);


// React props example

const props = {
    title: "Portfolio",
    year: 2026
};

const { title, year } = props;

console.log(title);
console.log(year);


// React useState Example

// const [count, setCount] = useState(0);


// Practice Example 1

const project = {
    title: "Portfolio Website",
    technology: "React",
    status: "Completed"
};

const { title: projectTitle, technology, status } = project;

console.log(projectTitle);
console.log(technology);
console.log(status);


// Practice Example 2

const marks = [85, 90, 95];

const [math, physics, chemistry] = marks;

console.log(math);
console.log(physics);
console.log(chemistry);


// Practice Example 3

const mobile = {
    brand: "Samsung",
    model: "S23",
    color: "Black"
};

const { brand, model, color } = mobile;

console.log(brand);
console.log(model);
console.log(color);
