import React from "react";
import "semantic-ui-css/semantic.min.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import UploadForm from "./components/UploadForm/UploadForm";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.css";
function App() {
  return (
    <div className="App">
      <NavigationBar style={{ height: "10vh" }} />
      <Container
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Switch>
          <Route path="/upload" component={UploadForm} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
      <footer
        style={{
          backgroundColor: "black",
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
      >
        <h5 style={{ color: "#ccc", padding: "1.5rem 1.5rem" }}>
          Copyrights Noobs Tech
        </h5>
      </footer>
    </div>
  );
}

export default App;
