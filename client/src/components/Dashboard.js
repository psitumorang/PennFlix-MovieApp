import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
import DashboardMovieRow from './DashboardMovieRow';
import Logo from './logo.png';

console.log(Logo);

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      posters: [],
      keywords: [],
      movies: [],
      genres: [],
      titles: [],
      overviews: []
    };

    this.showMovies = this.showMovies.bind(this);
  };

  // React function that is called when the page load.
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
          id={"button-" + keywordObj.keyword}
          //onClick={() => this.showMovies(keywordObj.keyword)}
          keyword={keywordObj.keyword}
        />
      );

  //     // Set the state of the keywords list to the value returned by the HTTP response from the server.
  //     this.setState({
  //       keywords: keywordsDivs
  //     });
  //     this.showMovies();
  //   }, err => {
  //     // Print the error if there is one.
  //     console.log(err);
  //   });
  // };

      // const posterDivs = keywordsList.map((keywordObj, i) =>
      //   <img src={"https://www.themoviedb.org/t/p/w200"+keywordObj.path} alt={keywordObj.name} title={keywordObj.name} />
      // );


      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        keywords: keywordsDivs,
        // posters : posterDivs
      });
      this.showMovies();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  };

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies() {
    var url = "http://localhost:8081/movies/";
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
            movie = {movieObj.movie}
            overview = {movieObj.overview}
            genre = {movieObj.genre}
          />
        );
        const movie = moviesList.map((movieObj, i) => movieObj.movie);
        const overview = moviesList.map((movieObj, i) => movieObj.overview);
        const genre = moviesList.map((movieObj, i) => movieObj.genre);
      this.setState({
        movies: moviesDivs,
        titles: this.state.titles.concat(movie),
        genres: this.state.genres.concat(genre),
        overviews: this.state.overviews.concat(overview)
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
            <div className="jumbotron-header">
              <div className="h2">Top 10 Ranked Movies</div>
              <br />
                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[0]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[0]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[0]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[1]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[1]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[1]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[2]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[2]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[2]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[3]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[3]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[3]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[4]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[4]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[4]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[5]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[5]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[5]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[6]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[6]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[6]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[7]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[7]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[7]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[8]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[8]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[8]}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />

                <div className="movies-container">
                  <div class='row'>
                    <div class='left-column'>
                      <img src={Logo} alt="website logo" width="160" height="130"/>
                    </div>
                    <div class='right-column'>
                      <div class='row'>
                        {this.state.titles[9]}
                      </div>
                      <div class='row'>
                        Genres: {this.state.genres[9]}
                      </div>
                      <br />
                      <div class='row'>
                        {this.state.overviews[9]}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          <br />

          <div className="jumbotron">
            <div className="h5">Top 10 Most Profitable Movie Keywords</div>
            <div className="keywords-container">
               {this.state.keywords}
            </div>
          </div>
        </div>
      </div>
    );
  };
};
