import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import download from "downloadjs";

import MarkerRectangle from './components/MarkerRectangle';
import data from './test.json'

import './App.css'

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight
};

const center = {
  lat: -3.745,
  lng: -38.523
};


function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}


class MyComponents extends Component {
  state = {markerList:[]}

  calculateCoords = (lat, lng) => {
    const R = 6378.1
    const brngA = degrees_to_radians(135)
    const brngB = degrees_to_radians(315)

    const d = 5

    const φ1 = degrees_to_radians(lat) 
    const λ1 = degrees_to_radians(lng)

    const φ2 = radians_to_degrees(Math.asin( Math.sin(φ1)*Math.cos(d/R) + Math.cos(φ1)*Math.sin(d/R)*Math.cos(brngA) ))
    const λ2 = radians_to_degrees(λ1 + Math.atan2(Math.sin(brngA)*Math.sin(d/R)*Math.cos(φ1), Math.cos(d/R)-Math.sin(φ1)*Math.sin(φ2)))
    console.log(φ2,λ2)

    const φ3 = radians_to_degrees(Math.asin( Math.sin(φ1)*Math.cos(d/R) + Math.cos(φ1)*Math.sin(d/R)*Math.cos(brngB) ))
    const λ3 = radians_to_degrees(λ1 + Math.atan2(Math.sin(brngB)*Math.sin(d/R)*Math.cos(φ1), Math.cos(d/R)-Math.sin(φ1)*Math.sin(φ3)))
    console.log(φ3,λ3)

    return ([φ2,λ2,φ3,λ3]) 
  }

  onRightClick = (e) => {
    let latitude = e.latLng.lat()
    let longitude = e.latLng.lng()
    let coords = this.calculateCoords(latitude, longitude)
    let coordinates = {latitude, longitude, north: coords[0], east: coords[1], south: coords[2], west:coords[3]}

    this.setState(prevState => ({
     markerList: [...prevState.markerList, coordinates]
    }))
    
    console.log(this.state.markerList)
  }

  renderMarkers = (list) => {
    return list.map(marker => {
      return (<MarkerRectangle lat={marker.latitude} lng={marker.longitude} north={marker.north} east={marker.east} south={marker.south} west={marker.west}/>)
    })
  }

  onSave = () => {
    let data = JSON.stringify(this.state.markerList)
    download(data, "test.json", "text/plain")
  }

  onLoad = () => {
    this.setState({markerList: data})
  }

  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyAOCjHQ-RoEgcmpP_PZzdmwjWEZ5wBwnd4"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onRightClick={(e) => this.onRightClick(e)}
        >
          {this.renderMarkers(this.state.markerList)}
        </GoogleMap>
        <button className={"ButtonSave"} onClick={() => this.onSave()}>SAVE</button>
        <button className={"ButtonLoad"} onClick={() => this.onLoad()}>LOAD</button>
      </LoadScript>
    )
  }
}

export default MyComponents