import { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import axios from "axios";
import "./styles.css";

import "./styles.css";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "198817eee2819c587f6344b6936b561a";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <div className="App">
        <h1>Consulta</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              value={city}
              placeholder="Escolha a cidade..."
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Field>
          <br />
          <Button type="submit">Consultar</Button>
        </Form>
      </div>
      {weatherData && (
        <div id="WeatherCard">
          <h2>Informações do Clima</h2>
          <p>Localização: {weatherData.name}</p>
          <p>
            Temperatura: {weatherData.main.temp}°C
            <br />
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt=""
            />
          </p>
          <p>Max: {weatherData.main.temp_max}°C</p>
          <p>Min: {weatherData.main.temp_min}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}
