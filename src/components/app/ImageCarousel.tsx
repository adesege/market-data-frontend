import * as React from 'react';

const ImageCarousel = (props: { images: string[]; alt: string }) => {
  const changeSlide = (delta: number) => {
    const carousel = document.querySelector<HTMLDivElement>('.carousel__items');
    const width = carousel.offsetWidth;

    carousel.scrollTo(carousel.scrollLeft + width * delta, 0);
  };

  return (
    <div className="carousel relative">
      <div className="carousel__navigation carousel__navigation--previous absolute">
        <svg onClick={() => changeSlide(-1)} className="carousel__navigation--icon" viewBox="0 0 20 20">
          <path fill="none" className="text-gray-700" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z" />
        </svg>
      </div>
      <div className="carousel__navigation carousel__navigation--next absolute">
        <svg onClick={() => changeSlide(1)} className="carousel__navigation--icon" viewBox="0 0 20 20">
          <path fill="none" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
        </svg>
      </div>
      <div className="carousel__items">
        {props.images.map((imageUrl) => <img key={imageUrl} className="w-full carousel__item" src={imageUrl} alt={props.alt} />)}
      </div>
    </div>

  );
};

export default ImageCarousel;
