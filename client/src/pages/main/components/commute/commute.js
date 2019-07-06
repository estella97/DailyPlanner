import React from "react";
import { connect } from "react-redux";
import { selectCommute } from '../../actions/actions'
import { commutes } from './commuteDictionary'
import './commute.css';

class Commute extends React.Component {
    render() {
        let buttons = commutes.map((commute) => {
            // TODO: switch classes when select | notSelect
            return <img src={"/image/" + commute + ".png"}
                className="horizontal" alt={commute} key={commute} commute={commute}
                onClick={() => this.props.selectCommute(commute)} />
        });
        return (
            <div className="center">
                {buttons}
            </div>
        )
    }
}

const mapStateToProps = (state) => { return { commuteState: state.commute } };
const mapDispatchToProps = { selectCommute };
export default connect(mapStateToProps, mapDispatchToProps)(Commute);