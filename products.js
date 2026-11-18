"use strict";

const prototypeProducts = () => {
  function Product(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
  }

  Product.prototype.displayProduct = function () {
    return `${this.productName} (${this.category}) - ₹${this.price}`;
  };

  const laptop = new Product("Laptop", 50000, "Electronics");
  const tShirt = new Product("T-Shirt", 799, "Clothing");
  const novel = new Product("Novel", 350, "Books");

  console.log("--- Prototype based products ---");
  [laptop, tShirt, novel].forEach((product) => console.log(product.displayProduct()));

  console.log("Same method shared:", laptop.displayProduct === tShirt.displayProduct);
  console.log("Own property:", laptop.hasOwnProperty("displayProduct"));
  console.log("Prototype link:", Object.getPrototypeOf(laptop) === Product.prototype);
  console.log("Missing property:", laptop.warranty);
};

const classProducts = () => {
  class Product {
    constructor(name, price, category) {
      this.name = name;
      this.price = price;
      this.category = category;
    }

    getProductDetails() {
      return `${this.name} | ${this.category} | ₹${this.price}`;
    }
  }

  class ElectronicProduct extends Product {
    constructor(name, price, warrantyYears) {
      super(name, price, "Electronics");
      this.warrantyYears = warrantyYears;
    }

    getWarrantyInfo() {
      return `${this.name} comes with ${this.warrantyYears} year warranty`;
    }
  }

  class ClothingProduct extends Product {
    constructor(name, price, size) {
      super(name, price, "Clothing");
      this.size = size;
    }

    getSizeInfo() {
      return `${this.name} is available in size ${this.size}`;
    }
  }

  const phone = new ElectronicProduct("Smartphone", 25000, 2);
  const jeans = new ClothingProduct("Jeans", 1999, "M");

  console.log("--- ES6 classes ---");
  console.log(phone.getProductDetails());
  console.log(phone.getWarrantyInfo());
  console.log(jeans.getProductDetails());
  console.log(jeans.getSizeInfo());
  console.log("typeof class:", typeof Product);
  console.log("phone instanceof Product:", phone instanceof Product);
};

const checkoutSyntax = () => {
  console.log("--- ES6 syntax in checkout ---");

  const getFinalPrice = (price, discountPercent) => price - (price * discountPercent) / 100;
  console.log("Final price:", getFinalPrice(50000, 10));

  const customer = { name: "Rahul", email: "rahul@gmail.com", city: "Mumbai" };
  const { name, email } = customer;
  console.log(`Hello ${name}, your order of Laptop is confirmed. Total: ₹${50000}`);
  console.log("Email:", email);

  const calculateTotal = (...prices) => prices.reduce((sum, price) => sum + price, 0);
  console.log("Total of 3 items:", calculateTotal(500, 1200, 300));

  const product = { name: "Laptop", price: 50000 };
  const updatedProduct = { ...product, price: 45000 };
  console.log("Original:", product);
  console.log("Copy:", updatedProduct);
};

prototypeProducts();
classProducts();
checkoutSyntax();
