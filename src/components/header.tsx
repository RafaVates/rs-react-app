import { Component, type ChangeEvent } from 'react';

interface SearchBarProps {
  name: string;
  onSearch: (query: string) => void;
}
interface SearchBarState {
  query: string;
}

export default class Header extends Component<SearchBarProps, SearchBarState> {
  state = {
    query: this.props.name,
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.query);
    localStorage.setItem('busqueda', this.state.query);
  };

  render() {
    return (
      <div className="bg-gray-200 p-5">
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <input
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={this.state.query}
            onChange={this.handleInputChange}
            placeholder="Search ... Enter a valid region (Asia-America-North America-Europe)"
          />
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
