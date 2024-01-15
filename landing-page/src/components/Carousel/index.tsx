import isEqual from 'react-fast-compare';
import { Carousel as CarouselLib } from 'react-responsive-carousel';
import { memo } from 'react';

// Components
import { Image } from '@app/components';

// Utils
import { generatePlaceholder } from '@app/utils';

// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@app/styles/carousel.css';

type TCarouselProps = {
  images: string[];
};

const Carousel = ({ images }: TCarouselProps): JSX.Element => (
  <div className='col-span-12 nearLg:col-span-7'>
    <CarouselLib
      infiniteLoop
      autoPlay
      interval={2000}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
    >
      {images.map((image) => (
        <Image
          alt='This is product name'
          src={image}
          key={image}
          placeholderSrc={generatePlaceholder(250, 250)}
          width={250}
          height={250}
          loading='lazy'
          className='thumb-image'
        />
      ))}
    </CarouselLib>
  </div>
);

const CarouselMemorized = memo(Carousel, isEqual);

export default CarouselMemorized;
