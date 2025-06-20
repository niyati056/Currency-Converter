window.onload = function () {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const resultDiv = document.getElementById("result");
  const swapBtn = document.getElementById("swapBtn");

  // Fetch all available currencies
  fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(res => res.json())
    .then(data => {
      const currencies = Object.keys(data.rates);
      currencies.forEach(currency => {
        let option1 = document.createElement("option");
        option1.value = currency;
        option1.text = currency;
        fromCurrency.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = currency;
        option2.text = currency;
        toCurrency.appendChild(option2);
      });
    });

  // Swap selected currencies
  swapBtn.addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
  });

  // Currency conversion function
  window.convertCurrency = function () {
    const amount = document.getElementById("amount").value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
      resultDiv.innerText = "Please enter a valid amount.";
      return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
      })
      .catch(() => {
        resultDiv.innerText = "Something went wrong. Please try again.";
      });
  };
};
