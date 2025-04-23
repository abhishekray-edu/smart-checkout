const form = document.getElementById('checkout-form');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload

  const price = parseFloat(document.getElementById('price').value);
  const tax = parseFloat(document.getElementById('tax').value);
  const discount = parseFloat(document.getElementById('discount').value);
  const coupon = parseFloat(document.getElementById('coupon').value);

  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price, tax, discount, coupon })
  });

  const data = await response.json();

  if (response.ok) {
    resultEl.textContent = `Final Amount: $${data.total.toFixed(2)}`;

    // Show last 3 calculations
    historyEl.innerHTML = '';
    data.history.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `Price: $${entry.price}, Tax: ${entry.tax}%, Discount: ${entry.discount}%, Coupon: $${entry.coupon} → Total: $${entry.total.toFixed(2)}`;
      historyEl.appendChild(li);
    });
  } else {
    resultEl.textContent = 'Error: ' + data.message;
  }
});
