import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import styled, { ThemeProvider, createGlobalStyle, withTheme } from "styled-components";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { prettyPrintStat, sortData } from "./utils";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import { theme } from "./theme";

const GlobalCSS = createGlobalStyle`
  body {
      background-color: ${props=>props.theme.appBackground};
  }
`;

function App(props) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [themeColor, setThemeColor] = useState("dark");
  const [selectedTheme, setTheme] = useState(theme[themeColor]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // E.g: India
            value: country.countryInfo.iso2, // E.g: IND
          }));

          let sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountries();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  // console.log(casesType, selectedTheme);
  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalCSS />
      <div
        className="app"
        style={{ backgroundColor: selectedTheme.appBackground }}
      >
        {/* Header */}
        <div className="app_left">
          <div className="app_header">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h1 style={{ color: selectedTheme.primaryText, marginRight: 10 }}>
                Covid 19 Tracker
              </h1>
              <FormControl className="app_dropdown" style={{backgroundColor: selectedTheme.cardBackground}}>
                <Select
                  variant="outlined"
                  value={themeColor}
                  classes={{
                    icon: {
                      // color: `${selectedTheme.primaryText} !important`
                    }
                  }}
                  style={{
                    color: selectedTheme.primaryText
                  }}
                  onChange={(e) => {
                    setThemeColor(e.target.value);
                    setTheme(theme[e.target.value]);
                  }}
                >
                  {["dark", "light"].map((theme) => (
                    <MenuItem value={theme}>{theme.toUpperCase()}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
            <FormControl className="app_dropdown" style={{backgroundColor: selectedTheme.cardBackground}}>
                <Select
                  variant="outlined"
                  value={country}
                  style={{
                    color: selectedTheme.primaryText
                  }}
                  onChange={onCountryChange}
                >
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Title and Select input dropdown field */}

          <div className="app_stats">
            <InfoBox
              isBlue
              theme={theme[themeColor]}
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
            <InfoBox
              isGreen
              theme={theme[themeColor]}
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              isRed
              theme={theme[themeColor]}
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>

          {/* Map */}
          <Map
            themeColor={themeColor}
            // theme={theme[themeColor]}
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app_right" style={{backgroundColor: selectedTheme.cardBackground }}>
          <CardContent style={{backgroundColor: selectedTheme.cardBackground}}>
            <h3 style={{ color: selectedTheme.primaryText }}>Live cases by Country</h3>
            <Table countries={tableData} theme={theme[themeColor]} />
            <h3 style={{ color: selectedTheme.primaryText, marginTop: 40, marginBottom: 20 }}>
              Worldwide new {casesType}
            </h3>
            <LineGraph casesType={casesType} theme={theme[themeColor]} />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default withTheme(App);
