import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import history from './history';
import PokemonCard from './PokemonCard';
import CardActions from '@mui/material/CardActions';
import { AlertDialog } from './AlertDialog';
import { TeamStats } from './TeamStats';


class TeamsPage extends React.Component {

  constructor(props) {
    super(props);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.state = {"selectedPokemon": [], "alert": false, 0: false, 1: false, 2: false};
  }

  async componentDidMount() {
    this.fetchPokemon();
  }

  async fetchPokemon() {
    try {
      const response = await fetch('http://dboseydv4f872.cloudfront.net/pokemon-teams/', {referrerPolicy: "unsafe-url"});
      const data = await response.json();
      this.setState({"allPokemon": data, "selectedPokemon": []});
    } catch (error) {
      this.setState({"alertText": String(error), "alert": true});
    }
  }

  removePokemon(currentPokemon, keyIndex) {
    let i = 0;
    let newPokemon = {};
    for (var index in currentPokemon) {
      if (index != keyIndex) {
        newPokemon[i] = currentPokemon[index];
        i++;
      }
    }

    return newPokemon;
  }

  async deletePokemon(pokemon, keyIndex) {
    const id = pokemon["id"];

    try {
        await fetch(`http://dboseydv4f872.cloudfront.net/pokemon-teams/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 204) {
                let currentPokemon = this.state["allPokemon"];
                this.setState({"allPokemon": this.removePokemon(currentPokemon, keyIndex)});
            }
        });

    } catch (error) {
        this.setState({"alertText": String(error), "alert": true});
        console.log(error);
      
    }
  }

  alreadySelected(currentPokemon, pokemon) {
    for (var index in currentPokemon) {
      if (currentPokemon[index]["id"] === pokemon["id"]) {
        return true;
      }
    }
    return false;
  }

  selectCard(pokemon) {
    let currentState = this.state["selectedPokemon"];
    if (this.alreadySelected(currentState, pokemon) === true) {
      this.setState({"alertText": "Cannot select the same card", "alert": true});
    } else if (Object.keys(currentState).length >= 3) {
      this.setState({"alertText": "Cannot select more than 3 Pokemon", "alert": true});
    } else {
      currentState.push(pokemon);
      this.setState({"selectedPokemon": currentState, "alert": false});
    }

  }

  unselectCard(keyIndex) {
    const currentPokemon = this.state["selectedPokemon"];
    const newPokemon = this.removePokemon(currentPokemon, keyIndex);
    const newPokemonArr = Object.keys(newPokemon).map((key) => newPokemon[key])
    this.setState({"selectedPokemon": newPokemonArr});
  }

  handleDialogClose() {
    this.setState({"alert": false});
  }

  goToMainPage() {
    history.push('/'); 
  }

  clearSelection() {
    this.setState({"selectedPokemon": [], "alert": false, 0: false, 1: false, 2: false});
  }

  setShowStats(keyIndex, show) {
    this.setState({ [keyIndex]: show});
  }

  render() {
    const data = this.state["allPokemon"];
    const selectedPokemon = this.state["selectedPokemon"];
    const state = this.state;

    const deletePokemon = this.deletePokemon.bind(this);
    const selectCard = this.selectCard.bind(this);
    const setShowStats = this.setShowStats.bind(this);
    const clearSelection = this.clearSelection.bind(this);


    return (
      <div className="App-Teams-Page">
        <header className="App-header-1-Teams-Page">
          <h3 className="App-title">Saved Pokemon</h3>
          <Button style={{marginBottom: "40px"}} onClick={() => this.goToMainPage()} variant="contained">Back to Browse</Button>

          <AlertDialog close={this.handleDialogClose} open={this.state.alert} content={this.state["alertText"]}/>

          <Grid alignItems="stretch" style={{display: "flex", justifyContent: "center"}} container spacing={2}>
            {data && Object.keys(data).map(function(keyName, keyIndex) {
              return (
                <Grid style={{width: "200px"}} item key={data[keyName]["id"]} >
                  <Card style={{height: "380px", margin: "0px", position: "relative"}} variant="outlined"> 
                    <PokemonCard showStats={false} mainPage={false} pokemon={data[keyName]}></PokemonCard>
                    <CardActions style={{width: "165px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", bottom: "0", position: "absolute"}}>
                        <Button onClick={() => selectCard(data[keyName])} size="small">Select</Button>
                        <Button style={{"color": "red"}} onClick={() => deletePokemon(data[keyName], keyIndex)} size="small">Unsave</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </header>



        <header className="App-header-2-Teams-Page">
          <h3 className="App-title">Current Team Selection</h3>
          <Button style={{marginBottom: "40px"}} onClick={() => clearSelection()} variant="contained">Clear</Button>

          <Grid alignItems="stretch" style={{display: "flex", justifyContent: "center"}} container spacing={2}>
            {selectedPokemon && Object.keys(selectedPokemon).map(function(keyName, keyIndex) {
              return (
                <Grid className={`flip-card ${state[keyIndex] ? "flipped" : ""}`} style={{width: "200px", transformStyle: "preserve-3d", transition: "transform 0.5s"}} item key={selectedPokemon[keyName]["id"]} >
                  <Card className="flip-card-inner" style={{height: "380px", margin: "0px", position: "relative"}} variant="outlined"> 
                    <PokemonCard showStats={state[keyIndex]} mainPage={false} pokemon={selectedPokemon[keyName]}></PokemonCard>
                    {!state[keyIndex] ?
                        <CardActions className="flip-card-front" style={{justifyContent: "space-between", bottom: "0", position: "absolute"}}>
                            <Button onClick={() => setShowStats(keyIndex, true)} size="small">More</Button>
                        </CardActions>
                        :
                        <CardActions className="flip-card-back" style={{justifyContent: "space-between", bottom: "0", position: "absolute"}}>
                            <Button onClick={() => setShowStats(keyIndex, false)} size="small">Back</Button>
                        </CardActions>
                    }
                  </Card>
                </Grid>
              )
            })}
          </Grid>

        <TeamStats pokemon={selectedPokemon}/>

        </header>
      </div>
    )
  }

}

export { TeamsPage };