import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="movie">
				<div className="email">{this.props.email}</div>
				<div className="latitude">{this.props.latitude}</div>
				<div className="longitude">{this.props.longitude}</div>
			</div>
		);
	};
};
