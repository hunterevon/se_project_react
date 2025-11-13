import "./WeatherCard.css";
import WeatherImage from "../../assets/WeatherImage.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        src={WeatherImage}
        alt="Sunny image"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
