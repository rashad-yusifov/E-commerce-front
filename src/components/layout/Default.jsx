import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

function Default({children}) {
  return (
    <>
        <Header/>
            {children}
        <Footer/>
    </>
  );
}


export default Default;