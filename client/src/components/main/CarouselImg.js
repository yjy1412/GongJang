import React from 'react';

const CarouselImg = ({ image }) => {

  const carouselStyles={
    width: 100+"%",
    height: 100+"%",
  }

  return <img src={image} alt="carousel-img" style={carouselStyles}/>
};

export default CarouselImg;