import React from "react";
import { connect } from "react-redux";
import { selectTime } from '../../actions/actions';

class time extends React.Component {
    render() {
        return (
            <div>
                 <h3>I'm free for
                    <div class="dropdown">
                        <button ref={this.inputText} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" text="Select available time period">
                            {this.props.timeState}
                        </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li key="1" class="dropdown-item" onClick = {() => this.props.selectTime(1)}>1 hour</li>
                                <li key="2" class="dropdown-item" onClick = {() => this.props.selectTime(2)}>2 hour</li>
                            </ul>
                        </div>
               and I'm feeling</h3>
            </div>
        )
    }
}
const mapStateToProps = (state) => {return {timeState: state.time}};
const mapDispatchToProps = { selectTime };
export default connect(mapStateToProps, mapDispatchToProps)(time);
// import React from "react";
// function Time() {
//     return (
//         <div className="App">
//             <h1>Hello CodeSandbox</h1>
//             <h2>Start editing to see some magic happen!</h2>
//             </div>
//     );
// }
// export default Time;