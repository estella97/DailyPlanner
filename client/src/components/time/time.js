import React from "react";
import { connect } from "react-redux";

class time extends React.Component {
    render() {
        return (
            <h3>I'm free for
                <button>2 hour</button>
                and I'm feeling
            </h3>
        )
    }
}

export default connect()(time);

// import React from "react";
// import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
// import DateFnsUtils from "@date-io/date-fns";

// function Time() {
//     return (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <div className="App">
//             <h1>Hello CodeSandbox</h1>
//             <h2>Start editing to see some magic happen!</h2>
//             <InlineDatePicker onChange={console.log} value={new Date()} />
//             </div>
//         </MuiPickersUtilsProvider>
//     );
// }

// export default Time;