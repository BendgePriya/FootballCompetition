
import React, { Component } from "react";
import "./index.css";
import { getData } from '../../modules/footballMatchesDataModule'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const classNames = require('classnames');

class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null
    };
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.props.getData(year)
    this.setState({
      selectedYear: year
    })
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    let data = this.props.data
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          {data ?
          <section>
           <div className="total-matches" data-testid="total-matches">Total Matches : {this.props.totalNoOfMatches}</div>
           {data.map((item) => {
             return (
              <ul className="mr-20 matches styled" data-testid="match-list">
                <li className="slide-up-fade-in">Match {item.name} won by {item.winner}</li>
              </ul>
             )
           })}
          </section> : ''}
          <div data-testid="no-result" className="slide-up-fade-in no-result"></div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.data,
  totalNoOfMatches: state.totalNoOfMatches
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FootballMatchesData);