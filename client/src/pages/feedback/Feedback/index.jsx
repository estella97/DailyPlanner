import React from 'react';
import CSSModules from 'react-css-modules';
import { Layout, Row, Col } from 'antd';

import Form from './components/Form';
import Comments from './components/Comments';
import { styles } from './styles.css';

const Feedback = () => (
	<div className="feedbackbody">
		<Layout>
			<Layout.Content>
				<Row gutter={32}>
					<Col span={8}>
						<Form />
					</Col>
					<Col span={16}>
						<Comments />
					</Col>
				</Row>
			</Layout.Content>
		</Layout>
	</div>
);

export default CSSModules(Feedback, styles);
