import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      keywords: [],
      posters: [],
      movies: []
    };

    this.showMovies = this.showMovies.bind(this);
  };

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/keywords",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(keywordsList => {
      if (!keywordsList) return;

      // Map each keyword in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      const keywordsDivs = keywordsList.map((keywordObj, i) =>
        <KeywordButton 
          id={"button-" + keywordObj.name} 
          onClick={() => this.showMovies(keywordObj.name)} 
          keyword={keywordObj.name} 
        /> 
      );

      const posterDivs = keywordsList.map((keywordObj, i) => 
        <img src={"https://www.themoviedb.org/t/p/w200"+keywordObj.path} alt={keywordObj.name} title={keywordObj.name} />
      );


      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        keywords: keywordsDivs,
        posters : posterDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  };

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(keyword) {
    var url = "http://localhost:3000/keywords/" + keyword;
    console.log(url);
    fetch(url,
      {
        method: 'GET'
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(moviesList => {
        if (!moviesList) return;
        const moviesDivs = moviesList.map((movieObj, i) =>
          <DashboardMovieRow
          title={movieObj.title}
          rating={movieObj.rating}
          votes={movieObj.num_ratings}
          />
        );
      this.setState({
        movies: moviesDivs
      });
    }, err => {
      console.log(err);
    });
  };

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br />
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Trending Movies</div>
            <div className="keywords-container">
              {this.state.keywords}
              {this.state.posters}
            </div>
          </div>

          <br />
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Title</strong></div>
                <div className="header"><strong>Rating</strong></div>
                <div className="header"><strong>Vote Count</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
