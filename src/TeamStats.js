import './App.css';
import React from 'react';

class TeamStats extends React.Component {
    constructor(props) {
        super(props);
        this.calculateTotal.bind(this);
    }

    calculateTotal(selectedPokemon, stat) {
        let total = 0;
        for (var index in selectedPokemon) {
            total += selectedPokemon[index][stat];
        }
        return total;
    }

    render() {
        let totalAttack = this.calculateTotal(this.props.pokemon, "attack");
        let totalDefense = this.calculateTotal(this.props.pokemon, "defense");

        return (
            <div>
                <p>Total Attack:&nbsp;{totalAttack}</p>
                <p>Total Defense:&nbsp;{totalDefense}</p>
            </div>
        )
    }

}

export { TeamStats };