// /client/App.js
import React from "react";

// import { SpinnerComponent } from "./components";
import { SearchContainer, AddModal, UpdateModal } from "./containers";

class App extends React.Component<any, any> {
  // // our update method that uses our backend api
  // // to overwrite existing data base information
  // updateDB = (idToUpdate: any, updateToApply: any) => {
  //   let objIdToUpdate = null;
  //   parseInt(idToUpdate);
  //   this.state.data.forEach((dat: any) => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post("http://localhost:3001/api/updateData", {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply }
  //   });
  // };

  render() {
    // const { list, data } = this.state;
    // const { data, loading, error } = this.props;
    return (
      <>
        <SearchContainer />
        <AddModal />
        <UpdateModal />
      </>
    );
  }
}
export default App;
