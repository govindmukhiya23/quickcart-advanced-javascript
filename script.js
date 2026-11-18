(function () {
  const debounce = (callback, delay) => {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => callback.apply(this, args), delay);
    };
  };

  const throttle = (callback, delay) => {
    let lastRun = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastRun >= delay) {
        lastRun = now;
        callback.apply(this, args);
      }
    };
  };

  const calculateDiscount = (price, percentage) => price - (price * percentage) / 100;

  const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
      const key = args.join("-");
      if (cache.has(key)) {
        return { value: cache.get(key), source: "cache" };
      }
      const value = fn(...args);
      cache.set(key, value);
      return { value, source: "fresh calculation" };
    };
  };

  const addLog = (box, message) => {
    const line = document.createElement("p");
    line.textContent = message;
    box.appendChild(line);
  };

  const setupSearch = () => {
    const searchInput = document.getElementById("searchInput");
    const searchResult = document.getElementById("searchResult");
    const searchStats = document.getElementById("searchStats");
    let keystrokes = 0;
    let searchesRun = 0;

    const showStats = () => {
      searchStats.textContent = `Keystrokes: ${keystrokes} | Searches run: ${searchesRun}`;
    };

    const runSearch = (text) => {
      searchesRun++;
      searchResult.textContent = text ? `Showing results for "${text}"` : "Start typing to search.";
      console.log("Search request for:", text);
      showStats();
    };

    const debouncedSearch = debounce(runSearch, 500);

    searchInput.addEventListener("input", (event) => {
      keystrokes++;
      showStats();
      debouncedSearch(event.target.value.trim());
    });
  };

  const setupScroll = () => {
    const scrollStats = document.getElementById("scrollStats");
    let scrollEvents = 0;
    let handlerRuns = 0;

    const showStats = () => {
      scrollStats.textContent = `Scroll events: ${scrollEvents} | Handler runs: ${handlerRuns}`;
    };

    const onScroll = throttle(() => {
      handlerRuns++;
      console.log("Throttled scroll handler at", window.scrollY);
      showStats();
    }, 1000);

    window.addEventListener("scroll", () => {
      scrollEvents++;
      showStats();
      onScroll();
    });
  };

  const setupDiscount = () => {
    const priceInput = document.getElementById("priceInput");
    const percentInput = document.getElementById("percentInput");
    const result = document.getElementById("discountResult");
    const memoizedDiscount = memoize(calculateDiscount);

    document.getElementById("discountBtn").addEventListener("click", () => {
      const price = Number(priceInput.value);
      const percentage = Number(percentInput.value);
      const { value, source } = memoizedDiscount(price, percentage);
      const message = `Final price: ₹${value} (from ${source})`;
      result.textContent = message;
      console.log(message);
    });
  };

  const setupBubbling = () => {
    const list = document.getElementById("bubbleList");
    const stopCheck = document.getElementById("stopCheck");
    const log = document.getElementById("bubbleLog");

    list.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (event) => {
        addLog(log, "Button handler ran");
        if (stopCheck.checked) {
          event.stopPropagation();
          addLog(log, "Propagation stopped, the list will not hear this click");
        }
      });
    });

    list.addEventListener("click", (event) => {
      addLog(log, `List handler ran (target: ${event.target.tagName}, currentTarget: ${event.currentTarget.tagName})`);
    });
  };

  const setupDelegation = () => {
    const list = document.getElementById("productList");
    const message = document.getElementById("delegationMessage");
    const addButton = document.getElementById("addProductBtn");
    let newProductCount = 1;

    list.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".remove-btn");
      if (!removeButton) {
        return;
      }
      const item = removeButton.closest("li");
      const productName = item.firstChild.textContent.trim();
      item.remove();
      message.textContent = `Removed: ${productName}`;
    });

    addButton.addEventListener("click", () => {
      const item = document.createElement("li");
      item.innerHTML = `Product ${newProductCount++} <button class="btn-small remove-btn">Remove</button>`;
      list.appendChild(item);
    });
  };

  setupSearch();
  setupScroll();
  setupDiscount();
  setupBubbling();
  setupDelegation();
})();
