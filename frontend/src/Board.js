import React, { Component } from "react";
import BoardForm from "./BoardForm";
import BoardItem from "./BoardItem";
import axios from "axios";

/*
    component files.
*/
class Board extends Component {
  state = {
    maxNo: 3,
    boards: [
      {
        brdno: 1,
        brdwriter: "안태선",
        brdtitle: "제목",
        brddate: new Date(),
      },
      {
        brdno: 2,
        brdwriter: "안안태선",
        brdtitle: "제제제목",
        brddate: new Date(),
      },
    ],
    selectedBoard: {},
  };

  handleSaveData = (data) => {
    if (!data.brdno) {
      // new : Insert
      this.setState({
        maxNo: this.state.maxNo + 1,
        boards: this.state.boards.concat({
          brdno: this.state.maxNo,
          brddate: new Date(),
          ...data,
        }),
        selectedBoard: {},
      });
    } else {
      // Update
      this.setState({
        boards: this.state.boards.map((row) =>
          data.brdno === row.brdno ? { ...data } : row
        ),
        selectedBoard: {},
      });
    }
  };

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter((row) => row.brdno !== brdno),
    });
  };

  handleSelectRow = (row) => {
    this.setState({ selectedBoard: row });
  };

  render() {
    const { boards, selectedBoard } = this.state;

    axios
      .get("http://127.0.0.1:8000/persons")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return (
      <div>
        <BoardForm
          selectedBoard={selectedBoard}
          onSaveData={this.handleSaveData}
        />
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {boards.map((row) => (
              <BoardItem
                key={row.brdno}
                row={row}
                onRemove={this.handleRemove}
                onSelectRow={this.handleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
