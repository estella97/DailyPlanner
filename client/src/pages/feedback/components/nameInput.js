import React from 'react';
import { connect } from 'react-redux';
import { updateField } from '../actions/actions';
import { UPDATE_TITLE, UPDATE_NAME } from '../actions/actionDictionary'

// import './post.css';

class NameInput extends React.Component {
    handleUpdate(fieldType, e) {
        this.props.updateField(e.target.value, fieldType)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-25">
                        <label>Title</label>
                    </div>
                    <div className="col-75">
                        <input type="text" value={ this.props.title } onChange={ this.handleUpdate.bind(this, UPDATE_TITLE) } name="title" placeholder="Title..."></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" value={ this.props.name } onChange={ this.handleUpdate.bind(this, UPDATE_NAME) } name="name" placeholder="Your name..."></input>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        name: state.form.name,
        title: state.form.title
    };
}

export default connect(mapStateToProps, { updateField })(NameInput);
