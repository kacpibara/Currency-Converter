const form = document.getElementById('converter-form');
const resultBox = document.getElementById('result-box');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    resultBox.style.display = 'block';
    resultBox.className = '';
    resultBox.innerHTML = '⏳ Przeliczanie...';

    try {
        const response = await fetch('http://localhost:3000/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: parseFloat(amount),
                from: from,
                to: to
            })
        });

        const data = await response.json();

        if (!response.ok) {
            resultBox.className = 'error';
            resultBox.innerHTML = `❌ Błąd: ${data.error}`;
        } else {
            resultBox.className = 'success';
            resultBox.innerHTML = `${data.originalAmount} ${data.from} = <br> <span style="font-size: 24px;">${data.result} ${data.to}</span>`;
        }

    } catch (error) {
        resultBox.className = 'error';
        resultBox.innerHTML = '❌ Brak połączenia z serwerem API!';
        console.error(error);
    }
});