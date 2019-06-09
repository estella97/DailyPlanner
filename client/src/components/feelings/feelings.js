import React from 'react';
import { connect } from "react-redux";
import { selectFeeling } from '../../actions/actions'
import { dictionary } from './feelingsDictionary'
import './feelings.css';

class Feeling extends React.Component {
    render() {
        const feelings = dictionary;
        let feelingButtons = feelings.map((feeling) =>
            <button key={feeling} feeling={feeling}
                onClick={() => this.props.selectFeeling(feeling)}
                className={this.props.feelings[feeling]? "buttonOnSelect" : "button"}>
                {feeling}
            </button>
        );
        return (
            <div>
                <div className="row">
                    {feelingButtons.slice(0, 4)}
                </div>
                <br></br>
                <div className="row">
                    {feelingButtons.slice(4, 8)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {return {feelings: state.feelings}};
const mapDispatchToProps = { selectFeeling };
export default connect(mapStateToProps, mapDispatchToProps)(Feeling);