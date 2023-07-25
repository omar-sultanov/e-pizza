import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import './scss/app.scss';
// import { createContext} from 'react';

import MainLayout from './layouts/MainLayout';


const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/'./pages/FullPizza'));
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/NotFound'));
// export const SearchContext = createContext();
function App() {

  return (

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        } />
        <Route path="pizza/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            <FullPizza />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>

  );
}
export default App;

// in react same {function()}  and <Function/>