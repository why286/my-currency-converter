// Fetch currencies from API and populate dropdowns
fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.text = currency;
      option1.value = currency;
      fromCurrencySelect.add(option1);

      const option2 = document.createElement('option');
      option2.text = currency;
      option2.value = currency;
      toCurrencySelect.add(option2);
    });
  })
  .catch(error => console.error('Error fetching currencies:', error));

function convert() {
  var amount = parseFloat(document.getElementById('amount').value);
  var fromCurrency = document.getElementById('fromCurrency').value;
  var toCurrency = document.getElementById('toCurrency').value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[toCurrency];
      if (!exchangeRate) {
        alert('Currency not supported');
        return;
      }
      const convertedAmount = amount * exchangeRate;
      document.getElementById('result').innerText = `${amount.toFixed(2)} ${fromCurrency} is equivalent to ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch(error => console.error('Error fetching exchange rate:', error));
}
