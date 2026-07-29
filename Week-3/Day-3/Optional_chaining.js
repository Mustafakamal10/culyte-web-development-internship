
// Optional Chaining

const user = {
    name: "Mustafa",
    address: {
        city: "Peshawar"
    }
};

console.log(user.name);
console.log(user.address?.city);
console.log(user.address?.country);
console.log(user.contact?.phone);


// Nullish Coalescing

const student = {
    name: "Ali",
    department: null
};

console.log(student.department ?? "Not Available");

const employee = {
    name: "Ahmed"
};

console.log(employee.salary ?? "Salary Not Found");


// API Response Example

const apiUser = {
    id: 1,
    name: "Sara",
    address: {
        city: "Lahore"
    }
};

console.log(apiUser.name);
console.log(apiUser.address?.city);
console.log(apiUser.address?.country ?? "Country Not Found");


// Missing Data Example

const product = {
    title: "Laptop"
};

console.log(product.price ?? "Price Not Available");
console.log(product.brand ?? "Brand Not Available");


// Practice Example 1

const customer = {
    name: "Ayesha",
    email: "ayesha@gmail.com"
};

console.log(customer.email);
console.log(customer.phone ?? "Phone Not Available");


// Practice Example 2

const order = {
    id: 101,
    customer: {
        name: "Ali"
    }
};

console.log(order.customer?.name);
console.log(order.customer?.address ?? "Address Not Found");


// Practice Example 3

const company = {};

console.log(company.location ?? "Location Not Available");
console.log(company.owner?.name);


// API Data Practice

const users = [
    {
        id: 1,
        name: "Mustafa",
        profile: {
            city: "Peshawar"
        }
    },
    {
        id: 2,
        name: "Ali"
    }
];

users.forEach((user) => {
    console.log(user.name);
    console.log(user.profile?.city ?? "City Not Available");
});


