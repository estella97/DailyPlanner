import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { Timeline, Rate } from 'antd';

const Comment = props => (
	<Timeline.Item>
		<div className="info">
			<Rate
				disabled
				value={props.rating}
			/>
			<a href={`mailto:${props.email}`}>{props.name}</a>{' - '}
			<span className="date">{moment(props.date).format('ll')}</span>
		</div>
		{props.comment}
	</Timeline.Item>
);

class Comments extends React.Component {
	constructor() {
		super()
		this.state = { comments: [] }
	}

	componentDidMount() {
		Meteor.call("getFeedback", (err, result) => {
			if (!err) {
				this.setState({comments: result});
			}
		});
	}

	render() {
		return (
			<div>
				<h4>Comments</h4>
				{this.state.comments.length ? (
					<Timeline>
						{this.state.comments.map((comment, index) => (
							<Comment
								key={index}
								{...comment}
							/>
						))}
					</Timeline>
				) : 'No comments yet'}
			</div>
		)
	}
}

export default Comments;
