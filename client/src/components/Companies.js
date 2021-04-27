import React from 'react';
import PageNavbar from './PageNavbar';
import BestMoviesRow from './BestMoviesRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Companies extends React.Component {
	constructor(props) {
		super(props);
    }
    render(){
        return(
            <div className="Companies">
                <PageNavbar active="companies" />
            </div>
        );
    };
}