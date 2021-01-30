import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: null };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  componentDidMount() {
    let path = window.location.pathname;
    if (path === "/") {
      this.setState({ activeItem: "home" });
    } else {
      this.setState({ activeItem: path.slice(1) });
    }
  }
  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={NavLink}
            to="/"
            name="home"
            exact
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/upload"
            name="upload"
            active={activeItem === "upload"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
