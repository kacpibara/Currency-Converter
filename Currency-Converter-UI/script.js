const API_URL = 'https://currency-converter-api-xp88.onrender.com/convert';
//const API_URL = 'http://localhost:3000/convert';

const form = document.getElementById('converter-form');
const resultBox = document.getElementById('result-box');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');

//Pobieranie walut i wypełnianie selectów
async function loadCurrencies() {
    try {
        // Tymczasowy tekst podczas ładowania
        fromSelect.innerHTML = '<option value="">Ładowanie walut...</option>';
        toSelect.innerHTML = '<option value="">Ładowanie walut...</option>';

        // Odpytujemy nasz nowy endpoint Express.js
        const response = await fetch(`${API_URL}/symbols`);
        const symbols = await response.json();

        if (!response.ok) {
            throw new Error(symbols.error || 'Błąd serwera');
        }

        // Czyścimy opcje
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';

        // Iterujemy po obiekcie { "KOD": "Nazwa", ... }
        for (const [code, name] of Object.entries(symbols)) {
            // Tworzymy element <option>
            const optionFrom = document.createElement('option');
            optionFrom.value = code;
            optionFrom.textContent = `${name} (${code})`;
            
            // Klonujemy dla drugiego selecta
            const optionTo = optionFrom.cloneNode(true);

            // Ustawiamy domyślne waluty tak jak miałeś w HTML
            if (code === 'USD') optionFrom.selected = true;
            if (code === 'PLN') optionTo.selected = true;

            fromSelect.appendChild(optionFrom);
            toSelect.appendChild(optionTo);
        }

    } catch (error) {
        console.error("Błąd podczas ładowania walut:", error);
        fromSelect.innerHTML = '<option value="">Błąd ładowania</option>';
        toSelect.innerHTML = '<option value="">Błąd ładowania</option>';
    }
}

// Wywołujemy funkcję od razu po załadowaniu skryptu
loadCurrencies();

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const from = fromSelect.value;
    const to = toSelect.value;

    resultBox.style.display = 'block';
    resultBox.className = '';
    resultBox.innerHTML = '⏳ Przeliczanie...';

    try {
        const response = await fetch(API_URL, {
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
