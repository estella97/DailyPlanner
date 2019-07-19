import React from 'react';
import { connect } from 'react-redux';
import { updateField } from '../actions/actions';
import { UPDATE_FEEDBACK } from '../actions/actionDictionary'

// import './post.css';

class PostInput extends React.Component {
    handleUpdate(fieldType, e) {
        this.props.updateField(e.target.value, fieldType);
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-25">
                    <label>Feedback</label>
                </div>
                <div className="col-75">
                    <textarea name="thought" value={ this.props.feedback } onChange={ this.handleUpdate.bind(this, UPDATE_FEEDBACK) } placeholder="Write something..." style={{height: '200px'}}></textarea>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        feedback: state.form.feedback
    };
}

export default connect(mapStateToProps, { updateField })(PostInput);
