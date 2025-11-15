import "./WeatherCard.css";
import WeatherImage from "../../assets/WeatherImage.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={WeatherImage}
        alt="Sunny image"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
