import React, { Component } from "react";
import "./WarGame.css";

const CardDeck = ["A", "A", "A", "A", 
                  "K", "K", "K", "K",
                  "Q", "Q", "Q", "Q",
                  "J", "J", "J", "J",
                  "10", "10", "10", "10",
                  "9", "9", "9", "9",
                  "8", "8", "8", "8",
                  "7", "7", "7", "7",
                  "6", "6", "6", "6",
                  "5", "5", "5", "5",
                  "4", "4", "4", "4",
                  "3", "3", "3", "3",
                  "3", "3", "3", "3",
                  "2", "2", "2", "2"];
const cardValues = {"A": 14, "K": 13, "Q":12, "J":11, "10":10}
let isStarted = false;

class WarGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PlayersDeck: new Array(52),
            AIDeck: new Array(52),
            playerCard: null,
            AICard: null,
            playerCardValue: 0,
            AICardValue: 0,
            winner: "",
            playerCount: 0,
            AICount: 0,
            moveCount: 0
        };

        this.startNewGame.bind(this);
        this.getWinner.bind(this);
        //this.doOneMove.bind(this);
        //this.GetOneCardFromDeck.bind(this);
        //this.drawCard.bind(this);
        //this.dealCard.bind(this);
    }

    shuffle = (CardDeck) => {
        let randomCardA;
        let randomCardB;
        let tempX;
        for (let index = 0; index < CardDeck.length; index += 1) {
            randomCardA = Math.floor(Math.random() * CardDeck.length);
            randomCardB = Math.floor(Math.random() * CardDeck.length);
            tempX = CardDeck[randomCardA];
            CardDeck[randomCardA] = CardDeck[randomCardB];
            CardDeck[randomCardB] = tempX;
        }
    }


    startNewGame = () => {
        console.log("new game");
        this.shuffle(CardDeck);

        for (let count = 0; count < 26; count ++) {
            this.state.PlayersDeck[count] = CardDeck[count];
            this.state.AIDeck[count] = CardDeck[count + 26];
        }
    }


    drawPlayerCard = () => {
        if (this.state.PlayersDeck[this.state.moveCount] != null) {
            this.setState({playerCard: this.state.PlayersDeck[this.state.moveCount]});
        } else {
            this.setState({playerCard: "End of deck"});
        }
    }

    drawAICard = () => {
        if (this.state.AIDeck[this.state.moveCount] != null) {
            this.setState({AICard: this.state.AIDeck[this.state.moveCount]});
        } else {
            this.setState({AICard: "End of deck"});
        }
    }

    addMove = () => {
        this.setState({ moveCount: this.state.moveCount + 1 });
    }

    getWinner = () => {
        var value;
        var key;
        for (key in cardValues) {
            value = cardValues[key];
            if (this.state.playerCard === key) {
                this.state.playerCardValue = value;
                break;
            } else {
                this.state.playerCardValue = this.state.playerCard;
            }
        }
        for (key in cardValues) {
            value = cardValues[key];
            if (this.state.AICard === key) {
                this.state.AICardValue = value;
                break;
            } else {
                this.state.AICardValue = this.state.AICard;
            }
        }
        if (this.state.playerCardValue > this.state.AICardValue) {
            this.setState({playerCount: this.state.playerCount + 1});
            this.setState({winner: "Player"});
        } else if (this.state.playerCardValue < this.state.AICardValue) {
            this.setState({AICount: this.state.AICount + 1});
            this.setState({winner: "AI"});
        } else {
            this.setState({winner: "Draw"});
        }
    }

    render = () => {
        return(
        <div className='table'>
            <div className='tableHeader'>
                <div>
                    <button className='drawButton' onClick={() => {
                        if (isStarted === false) {
                            this.startNewGame();
                        }
                        isStarted = true;
                        this.addMove();
                        this.drawPlayerCard(); 
                        this.drawAICard();
                        this.getWinner();
                    }}>Draw</button>
                </div>
                </div>
                <div className='player'>
                    <div className='player_text'>Player</div>
                    <div className="player_card">{this.state.playerCard}</div>
                    <div className="player_score" >Player Score: {this.state.playerCount}</div>
                </div>
                <div className='AI'>
                    <div className='AI_text'>AI</div>
                    <div className="AI_card">{this.state.AICard}</div>
                    <div className="AI_score" >AI Score: {this.state.AICount}</div>
                </div>
            <div className="winner">Winner: {this.state.winner}</div>
        </div>
        );

    }
}
export default WarGame;