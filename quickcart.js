"use strict";

class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

const orderConfig = Object.freeze({
  storeName: "QuickCart",
  currency: "₹",
  customer: "Rahul",
});

const products = [
  new Product(1, "Laptop", 50000, 1),
  new Product(2, "Mouse", 1000, 2),
  new Product(3, "Monitor", 15000, 1),
  new Product(4, "Keyboard", 2000, 1),
];

const confirmOrder = (orderTotal) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderTotal > 0) {
        resolve("Confirmed Successfully!");
      } else {
        reject(new Error("Order total is invalid"));
      }
    }, 1000);
  });

const placeOrder = async () => {
  const { currency, customer } = orderConfig;

  const productTotals = products.map((product) => ({
    name: product.name,
    total: product.getTotal(),
  }));

  const expensiveProducts = products.filter((product) => product.price > 5000);

  const orderTotal = productTotals.reduce((sum, product) => sum + product.total, 0);

  const uniqueIds = new Set(products.map((product) => product.id));

  const inventory = new Map(products.map((product) => [product.id, product]));

  const order = { customer, items: productTotals, total: orderTotal };

  console.log("====== QUICKCART ORDER SUMMARY ======");
  console.log(`Customer: ${customer}`);
  console.log("Products:");
  productTotals.forEach(({ name, total }) => {
    console.log(`${name} - ${currency}${total}`);
  });
  console.log(`Total Order Amount: ${currency}${orderTotal}`);
  console.log(`Unique Products: ${uniqueIds.size}`);
  console.log("Order Status: Processing...");

  try {
    const status = await confirmOrder(orderTotal);
    console.log(`Order Status: ${status}`);
  } catch (error) {
    console.log(`Order Status: Failed - ${error.message}`);
  }

  console.log("=====================================");

  console.log("Products over ₹5000:", expensiveProducts.map((product) => product.name));
  console.log("Inventory size:", inventory.size, "| Laptop in inventory:", inventory.get(1).name);
  console.log("Order JSON:", JSON.stringify(order));
};

placeOrder();
