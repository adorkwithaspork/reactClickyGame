import React, { Component} from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickPicture = id => {
    // Arrange the pictures in a random order
    const shuffledArray = this.shuffleArray(friends);
    this.setState({friends: shuffledArray});
    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect...maybe next time! Click an image to start again!", shakeit: "true"});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "That's Correct! 1 Point Awarded...you're pretty okay at this...",
        shakeit: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
  }
  shuffleArray = (picturesArray) => {
      for (let i = picturesArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
      }
      return picturesArray;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My React Dog Click Game!!</h1>
        </header>
        <h3 className="App-intro">
          <strong>Click on a different image to earn points. If you click the same image twice in a row, you loose</strong> 
          <p className = "score"><strong>Score: {this.state.score} | Top Score: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper
        shakeWrapper = {this.state.shakeit}
        pictures=
          {this.state.friends.map(picture => (
            <FriendCard
              clickPicture={this.clickPicture}
              id={picture.id}
              // this is to get rid of unique key prop warning
              key={picture.id} 
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
        <footer className="footer">
      <div className="container">
        <span className="text-muted">&copy;G's Clicky Game</span>
      </div>
    </footer> 
      </div>
    );
  }
}
export default App;



