import React from "react";
import { Modal, Icon, Button, Divider } from "semantic-ui-react";
const ErrorMessage = (props) => {
  let content = (
    <Modal.Content style={{ paddingBottom: "0.2rem" }}>
      <Divider horizontal>
        {props.error ? "Error" : "Success"}
      </Divider>
    </Modal.Content>
  );
  return (
    <>
      <Modal size="mini" open={props.open} onClose={props.closeModal}>
        {content}
        <Modal.Content style={{ padding: "0rem 1rem 1rem" }}>
          <h3>{props.msg} {props.error ? <Icon color="red" name="dont" />: <Icon color="green" name="check"/>}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button size="mini" negative onClick={props.closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
export default ErrorMessage;
