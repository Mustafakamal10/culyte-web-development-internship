// Import add and multiply functions using require()
const { add, multiply } = require('./utils/math');

console.log('--- Node.js Modules Practice ---');

// Call functions and log results
const sum = add(5, 10);
console.log(`Add result (5 + 10): ${sum}`);

const product = multiply(4, 7);
console.log(`Multiply result (4 * 7): ${product}`);
