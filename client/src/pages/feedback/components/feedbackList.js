import React from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { deleteFeedbackData } from '../actions/actions';

class PostList extends React.Component {
    deleteFeedback(postid) {
        this.props.deleteFeedbackData(postid);
    }

    updateFeedback(post) {
        //TODO
    }
    
    render() {
        const posts = this.props.posts;
        if (posts === null || posts.length === 0) {
            return null; //don't render this component if there is no feedback
        }
        const listItems = posts.map((post) =>
            <Collapsible key={ post._id } trigger={post.title}>
                <p>{ post.feedback }</p>
                <div className="row">
                    <button onClick={ this.updateFeedback.bind(this, post) }>Update</button>
                    <button onClick={ this.deleteFeedback.bind(this, post._id) }>Delete</button>
                </div>
                <p>{ post.name }</p>
            </Collapsible>
        );
        return (
            <div className="title">
                <h1 id="feedbackTitle">Feedback</h1>
                <p id="feedbackInfo">Click a title to view the feedback</p>
                {listItems}
	        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { deleteFeedbackData })(PostList);
