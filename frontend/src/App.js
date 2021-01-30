import React from "react";
import "semantic-ui-css/semantic.min.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import UploadForm from "./components/UploadForm/UploadForm";
import { Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Switch>
          <Route path="/upload" component={UploadForm} />
          <Route path="/" />
        </Switch>
      </Container>

      <h1>Hello World</h1>
    </div>
  );
}

export default App;
