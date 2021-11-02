import React from "react";

export default class Connect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "defualt",
    };
  }

  onclick = () => {
    fetch("http://localhost:3001/data", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json.test_body,
        });
      });
  };

  render() {
    return (
        <h3>{this.state.data}</h3>
    );
  }
}