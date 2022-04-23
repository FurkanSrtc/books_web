import React from 'react';
import Header from './layouts/Header';
import Main from './layouts/Main/index';
import Footer from './layouts/Footer';
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
