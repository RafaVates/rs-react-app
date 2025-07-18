import { Component } from 'react';
import type Country from '../components/country';
interface Data {
  data: Country[];
}

export default class Content extends Component<Data> {
  render() {
    const countries = this.props.data.slice(0, 20);

    return (
      <>
        <h2 className="p-2 text-4xl font-extrabold">
          List of countries and its population
        </h2>
        <div className="flex justify-center">
          <ul className="p-4">
            {countries.map((country, i) => (
              <li key={i}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-60">{country.name.common}</div>
                  <div className="w-60">{country.population}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
