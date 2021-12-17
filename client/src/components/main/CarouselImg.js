import React from 'react';

const CarouselImg = ({ image, text, key }) => {

  const carouselStyles={
    width: 50+"%",
    height: 100+"%",
  }

  return (
  <>
    <div className="carousel-text">
      <div className="carousel-text-first">
        {text[0]}
      </div>
      <div className="carousel-text-second">
        {text[1]}
      </div>
      <div className="carousel-text-third">
        {text[2]}
      </div>
    </div>
    <img src={image} alt="carousel-img" style={carouselStyles}/>
  </>
  )
};

export default CarouselImg;