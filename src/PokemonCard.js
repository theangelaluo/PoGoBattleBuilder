import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


class PokemonCard extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {};
  }
  
  async componentDidMount() {
    if (!this.props.mainPage) {
        this.analyzeType(this.props.pokemon);
    }
  }

  async analyzeType(pokemon) {
    const primaryType = pokemon["primaryType"];
    const secondaryType = pokemon["secondaryType"];
    let url = `http://dboseydv4f872.cloudfront.net/pokemon-types/?primaryType=${primaryType}`
    if (secondaryType !== "none") {
      url = url.concat(`&secondaryType=${secondaryType}`);
    }
    try {
      await fetch(url)
        .then((response) => {
          if (response.status === 200) {
            response.json()
              .then(json => {
                this.setState({"weaknesses": json["weaknesses"], "strengths": json["strengths"]});
              })
          }
      });

    } catch (error) {
        // TODO: handle error
        // this.setState({"alertText": String(error), "alert": true});
        console.log(error);
      
    }
  }

  savePokemon(pokemon) {
    try {
      fetch('http://dboseydv4f872.cloudfront.net/pokemon-teams/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: pokemon["id"],
          image: pokemon["assets"] ? pokemon["assets"]["image"] : "none",
          attack: pokemon["stats"] ? pokemon["stats"]["attack"]: 0,
          defense: pokemon["stats"] ? pokemon["stats"]["defense"]: 0,
          primaryType: pokemon["primaryType"]["names"]["English"],
          secondaryType: pokemon["secondaryType"] ? pokemon["secondaryType"]["names"]["English"]: "none",
        })
      });
    } catch (error) {
        // TODO: add alert
        console.log(error);
      
    }
  }


  render() {
    const weaknesses = this.state["weaknesses"];
    const strengths = this.state["strengths"];

    let name = "";
    let image = "none";
    let attack = 0;
    let defense = 0;
    let primaryType = "";
    let secondaryType = "none";

    if (this.props.mainPage === true) {
        name = this.props.pokemon["id"];
        primaryType = this.props.pokemon["primaryType"]["names"]["English"];

        const hasSecondaryType = this.props.pokemon["secondaryType"] !== null;
        const hasAssets = this.props.pokemon["assets"] !== null;
        const hasStats = this.props.pokemon["stats"] !== null;
        
        if (hasAssets === true) {
            image = this.props.pokemon["assets"]["image"];
        }
        if (hasSecondaryType === true) {
            secondaryType = this.props.pokemon["secondaryType"]["names"]["English"];
        }
        if (hasStats === true) {
            attack = this.props.pokemon["stats"]["attack"];
            defense = this.props.pokemon["stats"]["defense"];
        }
    } else {
        name = this.props.pokemon["name"];
        attack = this.props.pokemon["attack"];
        defense = this.props.pokemon["defense"];
        primaryType = this.props.pokemon["primaryType"];
        image = this.props.pokemon["image"];
        secondaryType = this.props.pokemon["secondaryType"];

    }

    return (
      <React.Fragment>
        { this.props.showStats ?
            <CardContent className="flip-card-back" style={{maxHeight: "100%"}}>
                <p style={{fontSize: 14}}>Strong Against:</p>
                {strengths && strengths.map(function(elem) {
                    return (
                        <p style={{fontSize: 10}}>{elem}</p>
                    )
                })}

                <p style={{fontSize: 14}}>Weak Against:</p>
                {weaknesses && weaknesses.map(function(elem) {
                    return (
                        <p style={{fontSize: 10}}>{elem}</p>
                    )
                })}
            </CardContent>
            :
            <CardContent className="flip-card-front">
                <p style={{fontSize: 18}}>
                    {name}
                </p>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                    <p style={{fontSize: 14}}>
                    {primaryType}
                    </p>
                    {(secondaryType !== "none") ? <p style={{fontSize: 14}}>&nbsp;|&nbsp;{secondaryType}</p> : <p></p>}
                </div>

                {(image !== "none") ? <img className="Pokemon-image" src={image}/> : <p></p>}
                {(attack !== 0) ? <p style={{fontSize: 14}}>Attack:&nbsp;{attack}</p> : <p></p>}
                {(defense !== 0) ? <p style={{fontSize: 14}}>Defense:&nbsp;{defense}</p> : <p></p>}
            </CardContent>
        }
        
        { this.props.mainPage ?
            <CardActions style={{bottom: "0", position: "absolute"}}>
                <Button onClick={() => this.savePokemon(this.props.pokemon)} size="small">Add</Button>
            </CardActions> : <div></div>
        }
      </React.Fragment>
      
    )
  }
}

export default PokemonCard;