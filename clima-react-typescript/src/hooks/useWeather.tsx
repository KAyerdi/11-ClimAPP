import axios from "axios"
import { useMemo, useState } from "react"
import { z } from "zod"
import { SearchType } from "../types"


//TYPE GUARD o ASSERTIONS
//function isWeatherResponse(weather: unknown) : weather is Weather {
  //return(
   // Boolean(weather) &&
    //typeof weather === 'object' &&
   // typeof (weather as Weather).name === 'string' &&
   // typeof (weather as Weather).main.temp === 'number' &&
    //typeof (weather as Weather).main.temp_max === 'number' &&
   // typeof (weather as Weather).main.temp_min === 'number'
 // )
//}

// ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

export type Weather = z.infer<typeof Weather>


export default function useWeather() {

  const [weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    }
  })

  const [loading, setLoading] = useState(false)

  const fetchWeather = async (search : SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

      const { data } = await axios(geoUrl);
      const lat = data[0].lat;
      const lon = data[0].lon;

      //console.log(lat)
      //console.log(lon)

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      //const {data: weatherResult} = await axios<Weather>(weatherUrl)
      //console.log(weatherResult.main.temp)
      //console.log(weatherResult.main.temp_min)
      //console.log(weatherResult.main.temp_max)

      //Castear el type
      //const {data: weatherResult} = await axios(weatherUrl)
      //console.log(weatherResult.temp)
      //console.log(weatherResult.main.temp_min)
      //console.log(weatherResult.main.temp_max)

      //
      //Type Guards
      //const {data: weatherResult} = await axios(weatherUrl)
      //const result = isWeatherResponse(weatherResult)
      //if(result){
      //  console.log(weatherResult.name)
      //} else {
      //  console.log('Respuesta mal formada')
      //}

      //ZOD
      const { data: weatherResult } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const hasWeatherData = useMemo(() => weather.name ,[weather])


  return {
    weather,
    loading,
    fetchWeather,
    hasWeatherData
  }
}
