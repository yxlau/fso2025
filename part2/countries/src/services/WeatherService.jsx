import axios from "axios";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${
  import.meta.env.VITE_OPEN_WEATHER_KEY
}`;

const get = (lat, lon) => {
  return axios
  .get(`${baseUrl}&lat=${lat}&lon=${lon}&units=metric`)
  .then(response => response.data)
}

export default {
  get
}