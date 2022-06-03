import React, { useState, useEffect ,useCallback } from "react";
import WeatherCard from "./WeatherCard";

const WeatherInfo = () => {
    const [searchValue, setSearchValue] = useState("Kolkata");
    const [tempInfo, setTempInfo] = useState({});
  
    const getWeatherInfo = useCallback(async () => {
      try {
        let url = ` https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ec59b9f968dd2c5a1cb99a9aaf933ea2`;
  
        let res = await fetch(url);
        let data = await res.json();
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;
  
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
        };
  
        setTempInfo(myNewWeatherInfo);
      } catch (error) {
        console.log(error);
      }
    },[searchValue]);
  
    
    useEffect(() => {
      getWeatherInfo();
    }, [getWeatherInfo]);
  
    return (
      <>
        <div className="wrap">
          <div className="search">
            <form>
            <input
              type="search"
              placeholder="search..."
              autoFocus
              id="search"
              className="searchTerm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            </form>
          </div>
        </div>
        {/* weather card  */}
        <WeatherCard {...tempInfo} />
      </>
    );
  };
export default WeatherInfo
