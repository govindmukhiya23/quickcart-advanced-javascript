"use strict";

const order = {
  orderId: 501,
  customer: "Rahul",
  amount: 5000,
  deliveryDate: undefined,
  discount: null,
  calculateTax() {
    return 500;
  },
};

const orderText = JSON.stringify(order);
const parsedOrder = JSON.parse(orderText);

console.log("--- stringify and parse ---");
console.log("Original keys:", Object.keys(order));
console.log("JSON text:", orderText);
console.log("Parsed keys:", Object.keys(parsedOrder));
console.log("Parsed object:", parsedOrder);

const lostKeys = Object.keys(order).filter((key) => !(key in parsedOrder));
console.log("Lost properties:", lostKeys);

const runCase = (label, action) => {
  try {
    console.log(label, action());
  } catch (error) {
    console.log(label, `${error.name}: ${error.message}`);
  }
};

console.log("--- Predict the output ---");

runCase("Q1:", () => JSON.stringify({ name: "Rahul", age: undefined }));
runCase("Q2:", () => JSON.stringify([10, undefined, 30]));
runCase("Q3:", () => JSON.stringify({ price: NaN, discount: Infinity }));
runCase("Q4:", () => JSON.parse("{name: 'Rahul', age: 25}"));
runCase("Q5:", () => {
  const user = { name: "Rahul" };
  user.self = user;
  return JSON.stringify(user);
});
runCase("Q6:", () => JSON.stringify({ createdAt: new Date("2026-01-01") }));
