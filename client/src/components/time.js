import React from "react";
import { connect } from "react-redux";

class Todo extends React.Component {
    render() {
        return (
            <h3>Test</h3>
        )
    }
}

export default connect()(Todo);