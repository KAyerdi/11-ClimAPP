import axios from "axios"

export default function useWeather() {

  const fetchWeather = () => {
    console.log('Consultando...')
  }
  return {
    fetchWeather
  }
}
