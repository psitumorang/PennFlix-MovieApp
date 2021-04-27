import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class KeywordButton extends React.Component {
	/* props looks like:
		{
			id
			onClick
			keyword
		}
	*/
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			onClick: "",
			keyword: "",
			path: ""
		};
    }

	render() {
		return (
			<div className="keyword" id={this.props.id} onClick={this.props.onClick}>
				{this.props.keyword}
				<img src={"https://m.media-amazon.com/images/M"+this.props.path} alt={this.props.keyword} title={this.props.keyword} />
			</div>
		);
	};
};
