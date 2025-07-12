import { Component } from 'react';
import Header from '../components/header';
import Content from '../components/content';

export default class Principal extends Component {
  state = {
    name: localStorage.getItem('busqueda') || '',
    error: false,
  };

  handleSearchChange = (e: string) => {
    this.setState({ name: e });
  };

  handleError = () => {
    this.setState({ error: !this.state.error });
  };

  render() {
    return (
      <div className="flex flex-col h-screen w-full">
        <Header name={this.state.name} onSearch={this.handleSearchChange} />
        <div className="flex-grow text-center p-10">
          {!this.state.error ? (
            <Content name={this.state.name} />
          ) : (
            <p>Technical Debt - Implement Error Boundary - Press Error again</p>
          )}
        </div>
        <button
          className="w-40 ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
          onClick={this.handleError}
        >
          Error
        </button>
      </div>
    );
  }
}
