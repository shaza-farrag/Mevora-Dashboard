import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default ({ images,name }) => {
    if (!images?.length){
        return null
    }
  return (
    <Swiper
      className="h-full w-full"
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      watchOverflow={false}
      loop={images.length > 1}
      autoplay={{ delay: 3000, disableOnInteraction: false}}
      navigation
      pagination={{ clickable: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.url} alt={name} className="w-full h-full object-cover rounded-t-3xl" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};