import React, { Component } from 'react';
import { Marker, Rectangle } from '@react-google-maps/api';

export default class MarkerRectangle extends Component{
    constructor(props){
        super(props)
    }

    state={
        position : {
            lat: this.props.lat,
            lng: this.props.lng
        },
        bounds : {
            north: this.props.north,
            east: this.props.east,
            south: this.props.south,
            west: this.props.west
        }    
    }



    onClick = () => {
        //REMOVE
    }

    render(){
        return(
            <div>
                <Marker clickable onClick={() => this.onClick()}position={this.state.position}/>  
                <Rectangle bounds={this.state.bounds}/>            
            </div>
        )
    }
}