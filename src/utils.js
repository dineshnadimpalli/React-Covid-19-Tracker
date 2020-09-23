import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from 'numeral'
import './components/Map/Map.css'

export const casesTypeColors = {
  cases: {
    hex: "#4e89ae",
    rgb: "rgb(78,137,174)",
    half_op: "rgba(78,137,174, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#68b0ab",
    rgb: "rgb(104,176,171)",
    half_op: "rgba(104,176,171, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#ff414d",
    rgb: "rgb(255,65,77)",
    half_op: "rgba(255,65,77,0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => b.cases - a.cases);
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <img
            className="info-flag"
            src={country.countryInfo.flag}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
