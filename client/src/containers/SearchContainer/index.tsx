import React from "react";
import { connect } from "react-redux";

import { fetchData, removeData } from "../../redux/actions/databaseActions";
import { modalOpen } from "../../redux/actions/modalActions";

import { SearchContainerProps, SearchContainerState } from "../../@types";

import { SpinnerComponent, Card } from "../../components";
import { SearchBarContainer } from "../";

import "./styles.css";

const initialState = Object.freeze({
  filtered: [],
  data: []
});

const handleChange = Symbol();
const handleAddData = Symbol();
const handleRemoveData = Symbol();
const handleUpdateData = Symbol();

class SearchContainer extends React.Component<
  SearchContainerProps,
  SearchContainerState
> {
  readonly state: any = initialState;

  componentDidMount() {
    console.log("MOUN TED");
    this.props.fetchData();
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // console.log(nextProps, "NEXTPROPS");
    // console.log(prevState, "PREVSTATE");
    // console.log("DERIVED", nextProps.items !== prevState.filtered);
    console.log(nextProps.error, nextProps.loading);
    if (nextProps.data !== prevState.data) {
      console.log("CALL GET DERIVED SETSTATE");
      return { filtered: nextProps.data, data: nextProps.data };
    } else return null;
  }

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   console.log("DID PREVPROPS", prevProps);
  //   console.log("DID PREVSTATE", prevProps);
  //   console.log("DID THISPROPS", this.props.data);
  //   // if (prevProps.data !== this.props.data) {
  //   //   //Perform some operation here
  //   //   this.setState({ filtered: this.props.data });
  //   // }
  // }

  [handleAddData] = (): void => {
    this.props.modalOpen("addModal");
  };
  [handleRemoveData] = (e: any, value: any): void => {
    console.log(value);
    this.props.removeData(value);
  };
  [handleUpdateData] = (e: any, name: any, login: any, password: any): void => {
    console.log(name, login, password);
    this.props.modalOpen("updateModal");
    // SET REDUX STATE NAME LGONI PASSWORD
    // SHOW MODAL
  };

  [handleChange] = (e: any) => {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.data;

      newList = currentList.filter((item: any) => {
        const lc = JSON.stringify(item.name).toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.data;
    }
    console.log("NEWSTATE", newList);
    this.setState({
      filtered: newList
    });
  };

  render() {
    const { data, loading, error } = this.props;
    const { filtered } = this.state;
    return (
      <div className="search-container">
        <SearchBarContainer
          onChange={this[handleChange]}
          onClick={this[handleAddData]}
          placeholder="Search..."
        />
        {loading ? (
          <SpinnerComponent />
        ) : filtered &&
          filtered.constructor === Array &&
          filtered.length === 0 ? (
          "No entries found."
        ) : (
          filtered.map((item: any, i: any) => (
            <Card
              key={i}
              name={item.name}
              login={item.login}
              password={item.password}
              onClickRemove={this[handleRemoveData]}
              onClickUpdate={this[handleUpdateData]}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.database.data,
  loading: state.database.loading,
  error: state.database.error
});

export default connect(mapStateToProps, {
  fetchData,
  removeData,
  modalOpen
})(SearchContainer);
