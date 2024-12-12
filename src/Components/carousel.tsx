import Carousel from 'react-bootstrap/Carousel';

function CarouselEx() {
  return (
    <Carousel data-bs-theme="dark" indicators={false} controls={false}>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1919/480"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1919/480"
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://picsum.photos/1919/480"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselEx;