import axios from "axios"
import { SearchType } from "../types"

export default function useWeather() {

  const fetchWeather = async (search : SearchType) => {
    try {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`
    } catch (error) {
      console.log(error)
    }
  }


  return {
    fetchWeather
  }
}
