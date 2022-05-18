import React from "react";
import { Container, Button } from "react-bootstrap";
import { getScore } from "./Requests";

export default class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      score: 0,
      username: localStorage.getItem("username"),
    };
  }

  componentDidMount() {
    // make api call to fetch scores
    const { username } = this.state;
    getScore(username, (result) => {
      this.setState({
        scores: result.highScores,
        score: result.userHighScore,
      });
    });
  }

  render() {
    const { scores, score } = this.state;
    const displayscores = scores.map((m, i) => (
      <div>
        {i + 1}.{m.name}: {m.score}
      </div>
    ));
    return (
      <main>
        <Container>
          <h2>High Scores</h2>
          {displayscores}

          <h2>Your High Score</h2>
          {score}
          <br />
          <br />
          <a href="/">
            <Button>Return to home</Button>
          </a>
        </Container>
      </main>
    );
  }
}
