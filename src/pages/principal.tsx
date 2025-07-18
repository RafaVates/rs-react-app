import { Component } from 'react';
import Header from '../components/header';
import Content from '../components/content';
import ErrorPage from '../components/error';
import type Country from '../components/country';

interface State {
  name: string;
  generated: boolean;
  data: Country[];
  loading: boolean;
  error: Error | null;
}
export default class Principal extends Component<Record<string, never>, State> {
  state = {
    name: localStorage.getItem('busqueda') || '',
    generated: false,
    data: [],
    loading: true,
    error: null,
  };

  handleSearchChange = (e: string) => {
    this.setState({ name: e });
    this.fetchData(e);
  };

  handleError = () => {
    this.setState({ generated: !this.state.generated });
  };

  componentDidMount(): void {
    const initialValue = this.state.name || 'europe';
    this.fetchData(initialValue);
  }

  async fetchData(region: string) {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      localStorage.setItem('busqueda', '');
      if (error instanceof Error) {
        this.setState({ error, loading: false });
      }
    }
  }

  render() {
    if (this.state.generated) {
      throw new Error('A simulated error has occurred');
    }
    return (
      <div className="flex flex-col h-screen w-full">
        <Header name={this.state.name} onSearch={this.handleSearchChange} />
        <div className="flex-grow text-center p-10">
          {this.state.loading && (
            <p className="w-100 ml-50 bg-yellow-500 text-white font-bold py-2 px-4">
              Loading ... wait
            </p>
          )}
          {!this.state.error ? (
            <Content data={this.state.data} />
          ) : (
            <ErrorPage />
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
