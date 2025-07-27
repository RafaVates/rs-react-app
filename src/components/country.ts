export default interface Country {
  name: {
    common: string;
  };
  population: number;
  flags: { png: string };
  capital: string[];
}
