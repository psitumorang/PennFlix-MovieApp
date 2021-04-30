import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './logo.png';
import '../style/Recommendations.css';

console.log(Logo);

export default class RecommendationsRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="movies-container">
				<div class='paddedRow'>

					<div class='left-column'>
						<img src={"https://m.media-amazon.com/images/M"+this.props.path} alt={this.props.title} width="160" height="230"/>
					</div>

					<div class='right-column'>
						<div class='row'>
							<a href={this.props.query}>{this.props.title}</a>
						</div>

						<div class='row'>
							Genres: {this.props.genre}
						</div>

						<div class='row'>
							Rating: {this.props.rating}
						</div>
						<br />

						<div class='row'>
							{this.props.overview}
						</div>
				  </div>

				</div>
			</div>
		);
	};
};
