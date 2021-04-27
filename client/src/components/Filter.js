import React from 'react';
import PageNavbar from './PageNavbar';
import BestMoviesRow from './BestMoviesRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Filter extends React.Component {
    constructor(props) {
		super(props);
    }

    render() {
        return(
            <div className="Filter">
            <PageNavbar active="filter"/>
            s</div>
        )
    }
}