import React from "react";
// REDUX
import { connect } from "react-redux";
import { modalClose } from "../../redux/actions/modalActions";
import { addData } from "../../redux/actions/databaseActions";
import {
  modalShowModalSelector,
  databaseLoadingSelector
} from "../../redux/selectors";
// COMPONENTS
import { ModalComponent } from "../../components";
import { ClipLoader } from "react-spinners";

import { AddModalState, AddModalProps } from "../../@types";

// FUNCTIONS
import { scorePassword } from "../../utils/functions";

const initialState = Object.freeze({
  name: "",
  login: "",
  password: "",
  passStr: 0
});

const handleSave = Symbol();
const handleClose = Symbol();
const handleChange = Symbol();
const handlePasswordChange = Symbol();

class AddModal extends React.Component<AddModalProps, AddModalState> {
  readonly state: AddModalState = initialState;

  [handleSave] = (): void => {
    this.props.addData(this.state);
  };

  [handleClose] = (): void => {
    this.props.modalClose();
    this.setState(initialState);
  };
  [handleChange] = (event: any): any => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    } as Pick<AddModalState, keyof AddModalState>);
  };
  [handlePasswordChange] = (event: any): void => {
    const { value } = event.target;
    const { password } = this.state;
    this.setState({
      password: value
    } as Pick<AddModalState, keyof AddModalState>);

    console.log(password, !password);
    this.setState({ passStr: scorePassword(value) });
  };

  render() {
    const { showModal, loading } = this.props;
    const { name, login, password, passStr } = this.state;
    return (
      <>
        <ModalComponent
          title="Add entry"
          show={showModal === "addModal" || false}
          onSave={this[handleSave]}
          onClose={this[handleClose]}
          p_name="Name"
          p_login="Login"
          p_password="Password"
          onInputChange={this[handleChange]}
          onPasswordChange={this[handlePasswordChange]}
          loadingComponent={loading ? <ClipLoader size={15} /> : null}
          disabled={!name || !login || !password}
          progress={passStr}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: modalShowModalSelector(state),
  loading: databaseLoadingSelector(state)
});

export default connect(mapStateToProps, {
  modalClose,
  addData
})(AddModal);
