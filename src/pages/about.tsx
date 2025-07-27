import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-cyan-600 my-40">
        Designed by Rafael
      </h1>
      <NavLink
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        to="https://rs.school/"
        target="blank"
      >
        Go to Rs School
      </NavLink>
    </div>
  );
};

export default About;
