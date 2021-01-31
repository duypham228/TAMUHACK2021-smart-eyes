import React, { Component } from "react";
import { Header, Divider, Button } from "semantic-ui-react";
export default class Home extends Component {
  onClickHandler = () => {
    this.props.history.push("/upload");
  };
  render() {
    return (
      <div>
        <Divider horizontal>
          <Header as="h1">SM EYES</Header>
        </Divider>
        <h3>
          A solution to home security and more using face recognition to prevent
          threats to your safety
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={this.onClickHandler} primary>
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}
