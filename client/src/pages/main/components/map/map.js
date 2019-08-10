import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Spin } from 'antd';
import './map.css';

class RadiusMap extends React.Component {
  // TODO Style the map
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };
  constructor(props) {
    super(props);
    this.state = { userLocation: { lat: 32, lng: 32 } };
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
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return(
        <div className='loading'>
          <Spin size="large" />
        </div>
      );
    }
    console.log(userLocation)

    return(
      <div style={{position: 'relative', height: '400px', width: '100%', alignContent: 'center'}}>
        <Map google={google} center={ userLocation } zoom={10}  style={{position: 'fixed', height: '100%', width: '100%'}}>
          <Marker
              position={ userLocation } />
          </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBou9WAraqZGu5xbYGcp1H01owc9QxhSqw'
  })(RadiusMap);
