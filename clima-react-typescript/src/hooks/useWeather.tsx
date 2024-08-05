import axios from "axios"
import { SearchType } from "../types"

export default function useWeather() {

  const fetchWeather = async (search : SearchType) => {

    const appId = 'b21346c52c0d259868ab4a4b0f923355'
    try {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

        const {data} = await axios(geoUrl)
        console.log(data)

    } catch (error) {
      console.log(error)
    }
  }


  return {
    fetchWeather
  }
}
