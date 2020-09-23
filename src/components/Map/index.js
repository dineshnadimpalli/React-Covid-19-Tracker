import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../utils";
import './Map.css'

export default function Map({countries, casesType, center, zoom, themeColor}) {
  // console.log("------countries-----", countries, casesType)
  return (
    <div className="map">
      {/* <h1>I am the map</h1> */}
      <LeafletMap
        center={center}
        zoom={zoom}
      >
        {
          themeColor === 'dark' ? (
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          ) : (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          )
        }
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}
