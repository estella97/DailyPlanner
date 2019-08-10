import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polygon } from 'google-maps-react';
import { Select, Spin } from 'antd';
import './map.css';

class RadiusMap extends React.Component {
  // TODO Style the map
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };
  constructor(props) {
    super(props);
    this.state = { radius: 5, userLocation: { lat: 32, lng: 32 } };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { loading, userLocation, radius } = this.state;
    const { google } = this.props;

    localStorage.setItem('radius', radius)

    if (loading) {
      return(
        <div className='loading'>
          <Spin size="large" />
        </div>
      );
    }

    console.log(userLocation)
    let circleCoords = [];
    var angle = 0;
    while (angle < 358) {
      circleCoords.push(
        {lat: userLocation.lat + radius*(Math.PI/180)*Math.cos(angle), lng: userLocation.lng + radius*(Math.PI/180)*Math.sin(angle)}
      );
      angle += 0.01;
    }

    let distance = [1,2,3,5,8,13,21];
    let options = distance.map((radius) => {
        return <Option onClick={() => { localStorage.setItem('radius', radius); this.setState({ radius: radius }) } }key={radius.toString()}>{radius} {(radius > 1) ?  "kilometers" : "kilometer"}</Option>
    });

    return(
      <div>
        <h4>I'm willing to travel
          <br />
          <br />
          <Select defaultValue="5">
              {options}
          </Select>
          <br />
        </h4>
        <div style={{position: 'relative', height: '400px', width: '100%', alignContent: 'center'}}>
          <Map google={google} center={ userLocation } zoom={10} style={{position: 'fixed', height: '100%', width: '100%'}}>
            <Marker
                position={ userLocation } />
            <Polygon
              paths={circleCoords}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={1}
              fillColor="#0000FF"
              fillOpacity={0.35} />
            </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBou9WAraqZGu5xbYGcp1H01owc9QxhSqw'
})(RadiusMap);
