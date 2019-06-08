import React from "react";
import { connect } from "react-redux";
import './commute.css';

class CommuteButton extends React.Component {
    render() {
      const commute = this.props.commute;
      return (
        <input type="image" src={process.env.PUBLIC_URL+"/image/"+commute+".png" }
            onClick={() => this.commuteState = commute} className="horizontal" alt={commute} />
      );
    }
  }

class Commute extends React.Component {
    render() {
        const commutes = ["bus", "car", "walk", "bike"];
        let buttons = commutes.map((commute) => {
            return <CommuteButton key={commute} commute={commute} />
        });
        return (
            <div className="center">
                {buttons}
            </div>
        )
    }
}

const mapStateToProps = (state) => {return {commuteState: state.commute}};
export default connect(mapStateToProps)(Commute);