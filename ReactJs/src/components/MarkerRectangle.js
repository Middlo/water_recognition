import React, { Component } from 'react';
import { Marker, Rectangle } from '@react-google-maps/api';

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

export default class MarkerRectangle extends Component{
    constructor(props){
        super(props)
        this.bounds = {}
    }

    state={
        position : {
            lat: this.props.lat,
            lng: this.props.lng
        }    
    }

    calculateCoords = (lat, lng) => {
        const R = 6378.1
        const brngA = degrees_to_radians(135)
        const brngB = degrees_to_radians(315)

        const d = 2.5

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

    RectangleCoords = () => {
        let coords = this.calculateCoords(this.props.lat,this.props.lng)
        let bounds = {north: coords[0], east: coords[1], south: coords[2], west:coords[3]}
        this.bounds = bounds
    }

    onClick = () => {
        //REMOVE
    }

    render(){
        this.RectangleCoords()
        return(
            <div>
                <Marker clickable onClick={() => this.onClick()}position={this.state.position}/>  
                <Rectangle bounds={this.bounds}/>            
            </div>
        )
    }
}