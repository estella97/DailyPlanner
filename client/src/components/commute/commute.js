import React from "react";
import { connect } from "react-redux";
import { selectCommute } from '../../actions/actions'
import { commutes } from './commuteDictionary'
import './commute.css';

class CommuteButton extends React.Component {
    render() {
      const commute = this.props.commute;
      return (
        <input type="image" src={process.env.PUBLIC_URL+"/image/"+commute+".png" }
            className="horizontal" alt={commute} />
      );
    }
}

class Commute extends React.Component {
    render() {
        let buttons = commutes.map((commute) => {
            // TODO: this action isn't working
            return <CommuteButton key={commute} commute={commute}
                onClick={() => this.props.selectCommute(commute)}/>
        });
        return (
            <div className="center">
                {buttons}
            </div>
        )
    }
}

const mapStateToProps = (state) => {return {commuteState: state.commute}};
const mapDispatchToProps = { selectCommute };
export default connect(mapStateToProps, mapDispatchToProps)(Commute);