import React from 'react';
import { connect } from "react-redux";
import './plan.css';

class Plan extends React.Component {
    render() {
        return (
            <div>
                <button className="plan">
                    Plan
                </button>
            </div>
        )
    }
}

export default connect()(Plan);