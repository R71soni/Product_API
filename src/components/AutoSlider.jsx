import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../AllCSS/AutoSlider.css";

function AutoSlider() {

    const slides = [
        "/Slider/image1.png",
       "/Slider/image2.png",
       "/Slider/image3.png",
      "/Slider/image4.png",
      "/Slider/image5.png",
      "/Slider/image6.png",
      "/Slider/image7.png",
      "/Slider/image8.png",
      "/Slider/image9.png",
      "/Slider/image10.png",
    ];

    return (
        <div className="auto-slider">

            <Swiper
                modules={[
                    Autoplay,
                    Pagination,
                    Navigation
                ]}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}

                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}

                pagination={{
                    clickable: true
                }}

                navigation
            >

                {slides.map((image, index) => (
                    <SwiperSlide key={index}>

                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                        />

                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    );
}

export default AutoSlider;