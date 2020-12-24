import { control } from "leaflet";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";


function MyMap({ center, zoom }) {
 console.log(center)
 return (
  <div className="map">

   <MapContainer center={center} zoom={zoom}>
    <TileLayer
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />

   </MapContainer>
  </div>
 );
}

export default MyMap;
