import styled from "styled-components";
import CityComponent from "./modules/CityComponent";
import React,{useState} from "react";
import axios from "axios";
import WeatherComponent from "./modules/WeatherInfoComponent";
import { HashRouter, Switch , Route } from "react-router-dom";

const API_KEY = "612b4de95b7452bbfb97cfceb92cb67c";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 20px 10px;
  border-radius: 4px;
  width: 380px;
  background: white;
  font-family: Montserrat;
`;


const AppLabel = styled.span`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;


function App() {
  const [city,updateCity] = useState(); 
  const [weather,updateWeather] = useState(); 

  const fetchWeather = async (e) =>{
      e.preventDefault();
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        updateWeather(response.data);
  };
  return (
    <>
      <HashRouter>
        <Container>
          <AppLabel>React Weather App</AppLabel>
          <Switch>
            <Route exact path="/">
              {weather ? (
                <WeatherComponent weather={weather} />
              ) : (
                <CityComponent
                  updateCity={updateCity}
                  fetchWeather={fetchWeather}
                />
              )}
            </Route>
          </Switch>
        </Container>
      </HashRouter>
    </>
  );
}

export default App;
