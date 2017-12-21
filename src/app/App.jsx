import React, { Component } from 'react';
import beats from 'images/beats';
import logo from 'images/logo';
import logo2 from 'images/logo2';

const hello = () => {
  return (
    <div className="container">

      <div className="image-wrapper">
        <img src={beats} className="image-wrapper__image" alt="beats"/>
      </div>

      <div className="image-wrapper">
        <img src={logo} className="image-wrapper__image" alt="logo"/>
      </div>

      <div className="image-wrapper">
        <img src={logo2} className="image-wrapper__image" alt="logo2"/>
      </div>

    </div>
  )
}

export default hello;