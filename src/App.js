import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import history from './history';
import PokemonCard from './PokemonCard';



class App extends React.Component {

  constructor() { 
    super(); 
    this.state = {};
  }

  async componentDidMount() {
    this.fetchPokemon();
  }

  async fetchPokemon() {
    try {
      const response = await fetch('https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json');
      const data = await response.json();
      this.setState(data);

    } catch (error) {
      this.setState({ });
      
    }
  }

  goToTeamsPage() {
    history.push('/viewTeams'); 
  }

  render() { 
    const data = this.state;

    return ( 
        <div className="App">
          <header className="App-header">
            <h2 className="App-title">PoGo Battle Builder</h2>
            <Button onClick={() => this.goToTeamsPage()} style={{marginBottom: "50px"}} variant="contained">View My Teams</Button>

            <Grid alignItems="stretch" style={{display: "flex", justifyContent: "center"}} container spacing={2}>
              {data && Object.keys(data).map(function(keyName, keyIndex) {
                return (
                  <Grid style={{width: "200px"}} item key={data[keyName]["id"]} >
                    <Card style={{height: "380px", margin: "0px", position: "relative"}} variant="outlined"> 
                      <PokemonCard mainPage={true} pokemon={data[keyName]}></PokemonCard>
                    </Card>
                  </Grid>
                )
              })}
            </Grid> 
          </header>
        </div>
      
    ) 
  } 
  
  
}

export default App;