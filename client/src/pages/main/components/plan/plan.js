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
        Meteor.call(API.plan.name, (this.props.time, this.props.commute, this.generateSelectedFeelings(),
        {"lat": 123.123, "lon": 47.47}, 100), (err, res) => {
            if (err) {
                // TODO: handle this err
            } else {
                // TODO: somehow store the results before redirecting to the next page
                history.push('/result');
                window.location.reload();
            }
        });
    }
    generateSelectedFeelings() {
        return dictionary.filter((feeling) => {
            return this.props.feelings[feeling];
        })
    }
    render() {
        return (
            <div>
                <button className="plan" onClick={this.plan}>
                    Plan
                </button>
                <br></br>
                <div>
                    {this.generateSelectedFeelings()}
                    {Object.keys(this.props.feelings)}
                    <br></br>
                    {this.props.commute}
                </div>
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