import React from "react";
import { connect } from "react-redux";
import { selectTime } from '../../actions/actions';
import { Select } from 'antd';

const { Option } = Select;

class time extends React.Component {
    render() {
        let hours = [1,2,3,5,8];
        let options = hours.map((hour) => {
            return <Option onClick={() => this.props.selectTime(hour)} key={hour.toString()}>{hour} hour</Option>
        });
        return (
            <div>
                <h4>I'm free for
                <br />
                    <Select defaultValue="1">
                        {options}
                    </Select>
                    <br />
                    and I'm feeling</h4>
            </div>
        )
    }
}
const mapStateToProps = (state) => { return { timeState: state.time } };
const mapDispatchToProps = { selectTime };
export default connect(mapStateToProps, mapDispatchToProps)(time);