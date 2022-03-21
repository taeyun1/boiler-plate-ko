import React from "react";

import Main_Image from "../../LandingPage/Sections/Main_Image.css";

function MainImage(props) {
  return (
    <div
      className="MainImage"
      style={{
        backgroundImage: `url('${props.image}')`,
      }}
    >
      <div>
        <div className="MainImage__title__description">
          <h2 className="MainImage_title"> {props.title} </h2>
          <p className="MainImage_description">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
