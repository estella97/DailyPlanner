import React from "react";
import { connect } from "react-redux";

import { Select } from 'antd';

const { Option } = Select;

class time extends React.Component {
    handleChange(value) {
        console.log(value);
    }
    render() {
        return (
            <h3>
                I'm free for
                <br /> 
                <Select defaultValue="1" onChange={ this.handleChange.bind(this) }>
                    <Option value="1">1 hour</Option>
                    <Option value="2">2 hours</Option>
                    <Option value="3">3 hours</Option>
                    <Option value="5">5 hours</Option>
                    <Option value="8">8 hours</Option>
                </Select>
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