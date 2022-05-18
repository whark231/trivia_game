import React from "react";
import { Navigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { login } from "./Requests";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      submitted: false,
      error: false,
    };
  }

  submit = (e) => {
    e.preventDefault();
    const { username } = this.state;
    login(
      username,
      () => {
        localStorage.setItem("username", username);
        this.setState({
          submitted: true,
        });
      },
      () => {
        this.setState({
          error: true,
        });
      },
    );
  };

  nameChange = (event) => {
    const { value } = event.target;
    this.setState({
      username: value,
    });
  };

  render() {
    const { submitted, username, error } = this.state;
    if (submitted) {
      return <Navigate to="/" />;
    }
    return (
      <main>
        <Container>
          <h2>Login below</h2>
          <Form onSubmit={this.submit}>
            <Form.Group>
              <label htmlFor="username">
                Alphanumeric Username (required){" "}
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={this.nameChange}
                />
              </label>
              {error ? "Invalid username" : ""}
            </Form.Group>
          </Form>
        </Container>
      </main>
    );
  }
}
