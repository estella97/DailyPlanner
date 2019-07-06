import React from 'react';
import { connect } from "react-redux";
import { dictionary } from '../feelings/feelingsDictionary'
import { plan } from '../../actions/actions'
import './plan.css';

class Plan extends React.Component {
    generateSelectedFeelings() {
        return dictionary.filter((feeling) => {
            return this.props.feelings[feeling];
        })
    }
    render() {
        return (
            <div>
                <button className="plan" onClick={() => this.props.plan()}>
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
        commute: state.commute
    }
};
const mapDispatchToProps = { plan };
export default connect(mapStateToProps, mapDispatchToProps)(Plan);