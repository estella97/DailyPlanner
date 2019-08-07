import React from 'react';
import { connect } from "react-redux";
import { selectFeelings } from '../../actions/actions'
import { dictionary } from './feelingsDictionary'
import { Checkbox } from 'antd';
import './feelings.css';

class Feeling extends React.Component {
    handleChange(checkedValues) {
        this.props.selectFeelings(checkedValues);
    }
    render() {
        return (
            <div>
                <Checkbox.Group options={dictionary} onChange={this.handleChange.bind(this)}>
                    <br />
                    <br />
                </Checkbox.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => { return { feelings: state.feelings } };
const mapDispatchToProps = { selectFeelings };
export default connect(mapStateToProps, mapDispatchToProps)(Feeling);