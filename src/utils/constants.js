export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/Day/Clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/Day/Cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/Day/Foggy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/Day/Rainy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/Day/Snowy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/Day/ThunderStorm.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/Night/Night-Clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/Night/Night-Cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/Night/Night-Foggy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/Night/Night-Rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/Night/Night-Snowy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/Night/Night-ThunderStorm.png", import.meta.url)
      .href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/Day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/Night/default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 32.6200973,
  longitude: -83.606568,
};

export const apiKey = "850b57e35a89cdb53ce25e4ba66af747";
