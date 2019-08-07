import React from "react";
import { connect } from "react-redux";
import { selectCommute } from '../../actions/actions'
import { commutes } from './commuteDictionary'
import { Avatar } from 'antd';
import './commute.css';

class Commute extends React.Component {
    render() {
        let buttons = commutes.map((commute) => {
            // TODO: switch classes when select | notSelect
            return <Avatar src={"/image/" + commute + ".png"} size="large" alt={commute} key={commute}
                commute={commute} style={{marginRight: '7%', marginLeft: '7%', cursor: 'pointer'}}
                shape={commute === this.props.commuteState? "circle" : "square"}
                onClick={() => this.props.selectCommute(commute)} />
        });
        return (
            <div>
                {buttons}
            </div>
        )
    }
}

const mapStateToProps = (state) => { return { commuteState: state.commute } };
const mapDispatchToProps = { selectCommute };
export default connect(mapStateToProps, mapDispatchToProps)(Commute);