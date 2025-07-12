import { Component } from 'react';
import Header from '../components/header';

export default class Principal extends Component {
  render() {
    return (
      <div className="flex flex-col h-screen w-full">
        <Header />
        <div className="flex-grow text-center p-10">
          <h1>Content</h1>
        </div>
        <button className="w-40 ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
          Error
        </button>
      </div>
    );
  }
}
