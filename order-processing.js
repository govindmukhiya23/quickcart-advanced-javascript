"use strict";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const eventLoopDemo = () =>
  new Promise((resolve) => {
    console.log("Order Started");

    setTimeout(() => {
      console.log("Payment Processing");
      resolve();
    }, 0);

    Promise.resolve().then(() => console.log("Payment Successful"));

    console.log("Order Completed");
  });

const validateOrder = (callback) => {
  setTimeout(() => {
    console.log("Order Validated");
    callback();
  }, 1000);
};

const processPayment = (callback) => {
  setTimeout(() => {
    console.log("Payment Completed");
    callback();
  }, 1000);
};

const sendConfirmation = (callback) => {
  setTimeout(() => {
    console.log("Confirmation Sent");
    callback();
  }, 1000);
};

const runWithCallbacks = (done) => {
  validateOrder(() => {
    processPayment(() => {
      sendConfirmation(() => {
        console.log("Callbacks finished");
        done();
      });
    });
  });
};

const validateOrderPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order Validated");
      resolve();
    }, 1000);
  });

const processPaymentPromise = (shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Payment declined"));
        return;
      }
      console.log("Payment Completed");
      resolve();
    }, 1000);
  });

const sendConfirmationPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("Confirmation Sent");
      resolve();
    }, 1000);
  });

const runWithPromises = (shouldFail = false) =>
  validateOrderPromise()
    .then(() => processPaymentPromise(shouldFail))
    .then(() => sendConfirmationPromise())
    .then(() => console.log("Promise chain finished"))
    .catch((error) => console.log("Promise chain failed:", error.message));

const placeOrder = async (shouldFail = false) => {
  try {
    await validateOrderPromise();
    await processPaymentPromise(shouldFail);
    await sendConfirmationPromise();
    console.log("Order placed successfully!");
  } catch (error) {
    console.log("Order failed:", error.message);
  }
};

const productsAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Products Loaded"), 1000));

const paymentAPI = () =>
  new Promise((_, reject) => setTimeout(() => reject("Payment Service Failed"), 1500));

const deliveryAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Delivery Loaded"), 2000));

const runCombinators = async () => {
  try {
    const results = await Promise.all([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("all():", results);
  } catch (error) {
    console.log("all() failed:", error);
  }

  const settled = await Promise.allSettled([productsAPI(), paymentAPI(), deliveryAPI()]);
  console.log("allSettled():", settled);

  try {
    const first = await Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("race():", first);
  } catch (error) {
    console.log("race() failed:", error);
  }

  try {
    const firstSuccess = await Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("any():", firstSuccess);
  } catch (error) {
    console.log("any() failed:", error.message);
  }

  try {
    await Promise.any([paymentAPI(), paymentAPI()]);
  } catch (error) {
    console.log("any() with every promise rejected:", error.name, error.errors);
  }
};

const main = async () => {
  console.log("--- Event loop ---");
  await eventLoopDemo();

  console.log("--- Callbacks ---");
  await new Promise((resolve) => runWithCallbacks(resolve));

  console.log("--- Promises ---");
  await runWithPromises();
  await runWithPromises(true);

  console.log("--- async/await ---");
  await placeOrder();
  await placeOrder(true);

  console.log("--- Promise combinators ---");
  await runCombinators();
};

main();
