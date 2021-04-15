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

class MyComponents extends Component {
  state = {markerList:[]}

  onRightClick = (e) => {
    let latitude = e.latLng.lat()
    let longitude = e.latLng.lng()
    let coordinates = {latitude, longitude}
    this.setState(prevState => ({
     markerList: [...prevState.markerList, coordinates]

    }))
    console.log(this.state.markerList)
  }

  renderMarkers = (list) => {
    return list.map(marker => {
      return (<MarkerRectangle lat={marker.latitude} lng={marker.longitude}/>)
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