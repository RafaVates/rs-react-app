import { Component } from 'react';

interface Data {
  name: string;
}

export default class Content extends Component<Data> {
  render() {
    return <p>{this.props.name}</p>;
  }
}
