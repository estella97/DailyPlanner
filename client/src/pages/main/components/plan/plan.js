import React from 'react';
import { connect } from "react-redux";
import './plan.css';
import { Meteor } from 'meteor/meteor';
import { history } from '../../../nav/history';

class Plan extends React.Component {
    success(pos) {
        var crd = pos.coords;
        
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        var userLocation = { lat: crd.latitude, lng: crd.longitude }

        Meteor.call("plan", this.props.time, this.props.commute, this.props.feelings,
        userLocation, 100, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(userLocation)
                // TODO: somehow store the results before redirecting to the next page
                localStorage.setItem('results', JSON.stringify(res));
                history.push('/results');
                window.location.reload();
            }
        });
    }; 
    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    plan = () => {
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this), this.options)
    }
    render() {
        return (
            <div>
                <button className="plan" onClick={this.plan}>
                    Plan
                </button>
                <br></br>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feelings: state.feelings,
        commute: state.commute,
        time: state.time,
    }
};

export default connect(mapStateToProps)(Plan);