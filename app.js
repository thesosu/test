const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;


const locations = {
  Polska: ['Warszawa', 'Kraków', 'Gdańsk'],
  USA: ['Nowy Jork', 'Los Angeles', 'Chicago'],
  Japonia: ['Tokio', 'Osaka', 'Kioto']
};
const authorName = 'Przemysław Kłos';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());






app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/pogoda', async (req, res) => {
  const { country, city } = req.body;
  if (!country || !city) {
    return res.send('Błąd: Brak kraju lub miasta.');
  }

  try {
    const apiKey = 'fabd71277a70c1e2307f6dbdd47215fa'; 
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'pl'
      }
    });

    const weather = response.data;
    res.send(`<h1>Pogoda w ${city}</h1>
      <p>Temperatura: ${weather.main.temp}°C</p>
      <p>Warunki: ${weather.weather[0].description}</p>
      <p>Wilgotność: ${weather.main.humidity}%</p>
      <p><a href="/">Powrót</a></p>`);
  } catch (error) {
    res.send('Błąd podczas pobierania danych pogodowych. Spróbuj ponownie później.');
  }
});


app.listen(port, () => {
  const startDate = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
  
  console.log(`Data uruchomienia: ${startDate}`);
  console.log(`Autor programu: ${authorName}`);
  console.log(`Aplikacja nasłuchuje na porcie: ${port}`);
});
