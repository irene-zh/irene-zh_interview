import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
import DashboardRow from './DashboardRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      people: []
    };

    this.showPeople = this.showPeople.bind(this);
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
      // A button which triggers the showPeople function for each keyword.
      const keywordsDivs = keywordsList.map((keywordObj, i) =>
        <KeywordButton
          id={"button-" + keywordObj.kwd_name}
          onClick={() => this.showPeople(keywordObj.kwd_name)}
          keyword={keywordObj.kwd_name}
        />
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        keywords: keywordsDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  };

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showPeople(keyword) {
    fetch("http://localhost:8081/keywords/" + keyword,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(personList => {
          if (!personList) return;
          // Map each keyword in this.state.keywords to an HTML element:
          // A button which triggers the showMovies function for each keyword.
          const personDivs = personList.map((personObj, i) =>

            <DashboardRow
              id={"movie-" + personObj.title}
              title={personObj.title}
              rating={personObj.rating}
              votes={personObj.num_ratings}
            />

          );

          // Set the state of the keywords list to the value returned by the HTTP response from the server.
          this.setState({
            people: personDivs
          });
        }, err => {
          // Print the error if there is one.
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
            <div className="h5">Input form</div>
            <div className="input-container">
							<input type='text' placeholder="Enter e-mail" value={this.state.movieName} onChange={this.handleMovieNameChange} required/><br/>
              <input type='text' placeholder="Enter City"/><br/>
              <input type='text' placeholder="Enter Country"/><br/>
              <button className="submit-btn" id="submitBtn" onClick={this.submitForm}>Submit</button>
            </div>
          </div>

          <br />
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>email</strong></div>
                <div className="header"><strong>latitude</strong></div>
                <div className="header"><strong>longitude</strong></div>
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
