import React from 'react';
import NameInput from './nameInput';
import PostInput from './feedbackInput';
import PostList from './feedbackList'
import { connect } from 'react-redux';
import { toggleFormInput, getFeedbackData, putFeedback, updateField } from '../actions/actions'; //CHANGE ME to putFeedbackData for API call!!
import { CLEAR_FORM } from '../actions/actionDictionary'

class Feedback extends React.Component {
    saveFeedback(e) {
        e.preventDefault(); // allows us to display feedback immediately instead of waiting for reload
        let newPost = {
            _id: this.getRandomInt(1, 10000),
            title: this.props.title,
            name: this.props.name,
            feedback: this.props.feedback
        };

        this.props.putFeedback(newPost);
        this.props.updateField("", CLEAR_FORM);
        this.props.toggleFormInput(this.props.showForm);
    }

    clearForm(e) {
        e.preventDefault(); //don't reload
        this.props.updateField("", CLEAR_FORM);
    }

    getRandomInt(bottom, top) {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }

    toggleForm() {
        this.props.toggleFormInput(this.props.showForm);
    }

    render() {
        if (!this.props.showForm) {
            return ( <button className="addPostButton" onClick={ this.toggleForm.bind(this) }>Add Feedback</button> );
        }
        return (
            <div className="container">
                <button className="addPostButton" onClick={ this.toggleForm.bind(this) }>Add Feedback</button>
                <form onSubmit={ this.saveFeedback.bind(this) }>
                    <NameInput/>
                    <PostInput/>
                    <div className="row">
                        <button type="submit" id="submitButton" disabled={ !this.props.title || !this.props.name || !this.props.feedback }>Submit</button>
                        <button type="reset" id="resetButton" onClick={ this.clearForm.bind(this) }>Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.form.name,
        title: state.form.title,
        feedback: state.form.feedback,

        posts: state.posts,

        showForm: state.showForm
    };
}

export default connect(mapStateToProps, { toggleFormInput, getFeedbackData, putFeedback, updateField })(Feedback);
