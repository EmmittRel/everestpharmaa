import React from 'react';
import "../components/App.css";

function Banner(props) {
  const { backgroundImage, title } = props;

  return (
    <div className="main-image" style={{ background: `url(${backgroundImage}) no-repeat center`, backgroundSize: 'cover' }}>
      <div className="containerr">
        <h1><span>{title}</span></h1>
      </div>
    </div>
  );
}

export default Banner;