import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './map.css';

class RadiusMap extends React.Component {
  // TODO Style the map and set current location
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };
  constructor(props) {
    super(props);
    this.state = { userLocation: { lat: 32, lng: 32 } };
  }
  componentDidMount(props) {
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
      return null;
    }
    console.log(userLocation)

    return(
        <Map style={{ display: 'block', margin: 'auto', width: '50%', height: '50%' }} google={google} center={userLocation} zoom={10} />
    );
  }
}

// export default GoogleApiWrapper({
//   apiKey: "-----------"
// })(MapContainer);
//     render() {
//         return (
//             <div style={{ height: '100vh', width: '100%' }}>
//                 <Map
//                     google={this.props.google}
//                     zoom={8}
//                     initialCenter={{ lat: 47.444, lng: -122.176}}
//                 />
//             </div>
//         );
//       }
// }

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBou9WAraqZGu5xbYGcp1H01owc9QxhSqw'
  })(RadiusMap);
