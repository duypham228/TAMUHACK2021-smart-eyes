import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";
class NavigationBar extends Component {
  render() {
    let activeItem = this.props.location.pathname;
    if (activeItem === "/") {
      activeItem = "home";
    } else {
      activeItem = activeItem.slice(1);
    }
    return (
      <Segment inverted size="mini">
        <Menu size="small" inverted pointing secondary>
          <Menu.Item
            as={NavLink}
            to="/"
            name="home"
            exact
            active={activeItem === "home"}
          />
          <Menu.Item
            as={NavLink}
            to="/upload"
            name="upload"
            active={activeItem === "upload"}
          />
        </Menu>
      </Segment>
    );
  }
}
export default withRouter(NavigationBar);
