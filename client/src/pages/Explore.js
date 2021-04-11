import React, { useContext, Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, GridColumn, Transition, Table, GridRow, Item } from 'semantic-ui-react';
import rp from "request-promise";
import moment from 'moment';
import { Link } from 'react-router-dom';


class Explore extends Component {
   constructor(){
    super() 
      this.state = {
        data: [],
        cov: []
      }
    
  }

  componentDidMount() {
    // use the request-promise library to fetch the HTML from pokemon.org
    rp({
        url: "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' },
        json:true
    })
      .then(html =>{ this.setState({
          data: html.regionData,
          cov: html
        });
    });
  }

  render() {
    return (
        <Grid>
        <Grid.Row centered>
            <h1>Latest Covid Data
              <span><h5>Last updated {moment(this.state.cov.lastUpdatedAtApify).fromNow()}</h5></span>
            </h1>
        </Grid.Row><br/><br/><br/>
        <Grid.Row columns={3} divided>
            <Grid.Column>
                <h3>Total Active Cases:</h3> <h1>{this.state.cov.activeCases}</h1>
            </Grid.Column>
            <Grid.Column>
                 <h3>Total Recovered:</h3> <h1>{this.state.cov.recovered}</h1>
            </Grid.Column>
            <Grid.Column>
                 <h3>Total Cases:</h3> <h1>{this.state.cov.totalCases}</h1>
            </Grid.Column>
        </Grid.Row>
        <GridRow>
                
                   
        </GridRow>
      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Total Infected</Table.HeaderCell>
            <Table.HeaderCell>New Infected</Table.HeaderCell>
            <Table.HeaderCell>Recovered</Table.HeaderCell>
            <Table.HeaderCell>New Recovered</Table.HeaderCell>
            <Table.HeaderCell>Deceased</Table.HeaderCell>
            <Table.HeaderCell>New Deceased</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data.map(el => {
            return (
              <Table.Row key={el.id}>
                <Table.Cell>{el.region}</Table.Cell>
                <Table.Cell>{el.totalInfected}</Table.Cell>
                <Table.Cell>{el.newInfected}</Table.Cell>
                <Table.Cell>{el.recovered}</Table.Cell>
                <Table.Cell>{el.newRecovered}</Table.Cell>
                <Table.Cell>{el.deceased}</Table.Cell>
                <Table.Cell>{el.newDeceased}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Grid.Row centered>
            <Item.Content as = {Link} to='https://www.mohfw.gov.in/'>Data from source {this.state.cov.sourceUrl}</Item.Content>
        </Grid.Row><br/><br/><br/>
      </Grid> 
    );
  }
}


export default Explore;