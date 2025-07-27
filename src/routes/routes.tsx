import { Routes, Route } from 'react-router';
import Principal from '../pages/principal';
import Detail from '../pages/detail';
import About from '../pages/about';
import Layout from '../pages/layout';
import PageNotFound from '../pages/404';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Principal />}>
          <Route path="/:countryId" element={<Detail />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
