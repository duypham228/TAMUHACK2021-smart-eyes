import React, { Component } from "react";
import {
  Button,
  Segment,
  Divider,
  Form,
  Icon,
  Header,
} from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
class UploadForm extends Component {
  state = {
    file: null,
    fileName: "",
    open: false,
    msg: null,
    error: false,
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    if (!this.state.file) {
      this.setState({ open: true, error: true, msg: "Cannot upload empty" });
      return;
    }
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data)
        this.setState({
          file: null,
          fileName: "",
          open: true,
          error: false,
          msg: "Upload Sucessfully",
        });
      })
      .catch((error) => {
        this.setState({
          open: true,
          error: true,
          msg: "Invalid file extension",
        });
      });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  onChange = (e) => {
    if (this.state.file !== null && !e.target.files[0]) {
      return;
    }
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  render() {
    let form = (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Field>
          <label>Input Image</label>
          <Button as="label" htmlFor="file" type="button" animated="fade">
            <Button.Content visible>
              <Icon name="file" />
            </Button.Content>
            <Button.Content hidden>Choose a file</Button.Content>
          </Button>
          <input
            type="file"
            hidden
            id="file"
            name="myImage"
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Input
          label="File Chosen:"
          placeholder="Use the above bar to browse your file"
          readOnly
          value={this.state.fileName}
        />
        <Button>Upload</Button>
      </Form>
    );
    return (
      <Segment style={{ width: "50%" }}>
        <Divider horizontal>Upload Your Image</Divider>
        <Header>
          <Icon name="image" />
        </Header>
        {form}
        <ErrorMessage
          open={this.state.open}
          closeModal={this.onCloseModal}
          msg={this.state.msg}
          error={this.state.error}
        />
      </Segment>
    );
  }
}
export default UploadForm;
