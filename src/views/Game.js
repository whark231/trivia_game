import React from "react";
import { Button, Container } from "react-bootstrap";
import { question, putScore } from "./Requests";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      curr: 0,
      score: 0,
      loaded: false,
      username: localStorage.getItem("username"),
    };
  }

  componentDidMount() {
    question(10, (result) => {
      this.setState({
        questions: result,
        loaded: true,
      });
    });
  }

  click = (i) => {
    let { score } = this.state;
    const { username, questions, curr } = this.state;
    if (i === questions[curr].correct) {
      score += 1;
      this.setState({
        score,
      });
    }
    if (curr + 1 >= questions.length) {
      putScore(username, score);
    }
    this.setState({
      curr: curr + 1,
    });
  };

  render() {
    const { curr, questions, loaded, score } = this.state;
    if (loaded) {
      if (curr >= questions.length && loaded) {
        return (
          <main>
            <Container>
              <h2>Game Over</h2>
              <div>Your score was: {score}!</div>
              <br />
              <a href="/">
                <Button>Return to home</Button>
              </a>
            </Container>
          </main>
        );
      }
      const choices = questions[curr].choices.map((m, i) => (
        <Button
          key={m}
          onClick={() => {
            this.click(i);
          }}
        >
          {m}
        </Button>
      ));
      return (
        <main>
          <Container className="text-center">
            <h2>Who is this celebrity?</h2>
            <img
              style={{ maxWidth: "50vw", maxHeight: "50vh" }}
              alt="celebrity"
              src={questions[curr].image}
            />
            <br />
            <br />
            {choices}
            <br />
            {`Current Score: ${score}`}
          </Container>
        </main>
      );
    }
    return "";
  }
}
