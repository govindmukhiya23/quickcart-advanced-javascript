"use strict";

const cart = [
  { id: 101, name: "Laptop", price: 50000, quantity: 1, category: "Electronics" },
  { id: 102, name: "Mouse", price: 800, quantity: 2, category: "Accessories" },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, category: "Accessories" },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, category: "Electronics" },
  { id: 105, name: "Headphones", price: 2500, quantity: 2, category: "Accessories" },
];

const arrayMethods = () => {
  console.log("--- Array methods ---");

  const itemTotals = cart.map((item) => ({ name: item.name, total: item.price * item.quantity }));
  console.log("Item totals:", itemTotals);

  const expensiveItems = cart.filter((item) => item.price > 2000);
  console.log("Above ₹2000:", expensiveItems.map((item) => item.name));

  const cartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("Cart value:", cartValue);

  cart.forEach(({ name, category, quantity }) => {
    console.log(`${name} | ${category} | Qty: ${quantity}`);
  });

  const electronicsTotal = cart
    .filter((item) => item.category === "Electronics")
    .map((item) => item.price * item.quantity)
    .reduce((sum, value) => sum + value, 0);
  console.log("Electronics total:", electronicsTotal);

  console.log("Cart length after filter:", cart.length);
};

const inventoryMap = () => {
  console.log("--- Map inventory ---");

  const inventory = new Map();
  cart.forEach((item) => inventory.set(item.id, { ...item }));

  console.log("Product 101:", inventory.get(101));

  inventory.get(101).quantity = 10;
  console.log("Updated quantity:", inventory.get(101).quantity);

  inventory.delete(102);
  console.log("Has 102:", inventory.has(102));

  for (const [id, product] of inventory) {
    console.log(id, "->", product.name, product.quantity);
  }

  const objectKey = { id: 1 };
  const keyDemo = new Map([[objectKey, "object as a key"]]);
  console.log(keyDemo.get(objectKey));
};

const removeDuplicates = () => {
  console.log("--- Set duplicates ---");

  const emails = [
    "rahul@gmail.com",
    "priya@gmail.com",
    "rahul@gmail.com",
    "arjun@gmail.com",
    "priya@gmail.com",
  ];

  console.log([...new Set(emails)]);
};

const freezeAndSeal = () => {
  console.log("--- freeze and seal ---");

  const productConfig = { name: "Laptop", price: 50000, stock: 20 };
  const frozenConfig = Object.freeze({ ...productConfig });
  const sealedConfig = Object.seal({ ...productConfig });

  const tryChanges = (label, config) => {
    const attempts = {
      "change price": () => { config.price = 45000; },
      "add property": () => { config.color = "Black"; },
      "delete property": () => { delete config.stock; },
    };

    Object.entries(attempts).forEach(([action, run]) => {
      try {
        run();
        console.log(`${label} - ${action}: worked`);
      } catch (error) {
        console.log(`${label} - ${action}: ${error.message}`);
      }
    });

    console.log(`${label} result:`, config);
  };

  tryChanges("frozen", frozenConfig);
  tryChanges("sealed", sealedConfig);

  const nested = Object.freeze({ title: "Order", details: { items: 2 } });
  nested.details.items = 5;
  console.log("Nested object after freeze:", nested.details.items);
};

arrayMethods();
inventoryMap();
removeDuplicates();
freezeAndSeal();
