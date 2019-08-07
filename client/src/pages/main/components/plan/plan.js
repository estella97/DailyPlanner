import React from 'react';
import { connect } from "react-redux";
import { dictionary } from '../feelings/feelingsDictionary'
import { plan } from '../../actions/actions'
import './plan.css';
import { Meteor } from 'meteor/meteor';
import { API } from '../../../../../../API';
import { history } from '../../../nav/history';

class Plan extends React.Component {
    plan = () => {
        // TODO: add validations here
        // TODO: add geoPoints handler
        console.log(this.props.time)
        console.log(this.props.commute)
        console.log(this.props.feelings)
        Meteor.call(API.plan.name, (this.props.time, this.props.commute, this.props.feelings,
        {"lat": 123.123, "lon": 47.47}, 100), (err, res) => {
            if (err) {
                // TODO: handle this err
            } else {
                // TODO: somehow store the results before redirecting to the next page
                localStorage.setItem('results', JSON.stringify(res));
                history.push('/results');
                window.location.reload();
            }
        });
    }
    render() {
        return (
            <div>
                <button className="plan" onClick={this.plan}>
                    Plan
                </button>
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
const mapDispatchToProps = { plan };
export default connect(mapStateToProps, mapDispatchToProps)(Plan);