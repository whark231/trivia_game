import React from "react";
import { Container, Button } from "react-bootstrap";
import { deleteAccount } from "./Requests";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
    };
  }

  componentDidMount() {
    const { username } = this.state;
    if (username == null) {
      window.location.href = "/login";
    }
  }

  delete = () => {
    const { username } = this.state;
    deleteAccount(username, () => {
      localStorage.removeItem("username");
    });
    window.location.href = "/login";
  };

  logout = () => {
    localStorage.removeItem("username");
    this.setState({
      username: "",
    });
    window.location.href = "/login";
  };

  render() {
    return (
      <main>
        <Container>
          <h2>Home</h2>
          <a href="/game">
            <Button>Start Game</Button>
          </a>
          <a href="/scores">
            <Button>View High Scores</Button>
          </a>
          <Button onClick={this.logout}>Logout</Button>
          <Button onClick={this.delete}>Delete Account</Button>
        </Container>
      </main>
    );
  }
}
