/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, {useState, useEffect} from 'react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link"

SwiperCore.use([Autoplay, Navigation]);
const TestimonialSlider = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
      setDomLoaded(true);
    }, []);
    const data = [
        {
            avatar: "1.png",
            name: "Wade Warren",
            company: "Louis Vuitton",
            quote: "Simple text that can be replaced later.",
            bg: ""
        },
        {
            avatar: "2.png",
            name: "Brooklyn Simmons",
            company: "Nintendo",
            quote: "Simple text that can be replaced later.",
            bg: "bd-bg-6"
        },
        {
            avatar: "3.png",
            name: "Jenny Wilson",
            company: "Starbucks",
            quote: "Simple text that can be replaced later.",
            bg: "bd-bg-10"
        },
        {
            avatar: "4.png",
            name: "Albert Flores",
            company: "Bank of America",
            quote: "Simple text that can be replaced later.",
            bg: "bd-bg-6"
        }
    ];


    return (
        <>
            <div className="box-swiper">
                <div className="swiper-container swiper-group-4">
                {domLoaded && (
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                        breakpoints={{
                            0: {
                              slidesPerView: 1,
                              spaceBetween: 20
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 30
                            }
                          }}
                        navigation={{
                            prevEl: ".swiper-button-prev-4",
                            nextEl: ".swiper-button-next-4"
                        }}
                        className="swiper-wrapper pb-70 pt-5"
                    >
                        {data.map((item, i) => (
                            <SwiperSlide>
                                <div className="swiper-slide active">
                                    <div className={`card-grid-style-3 hover-up ${item.bg}`}>
                                        <div className="grid-3-img">
                                            <img src={`assets/imgs/page/homepage1/user-${item.avatar}`} alt="Agon" />
                                        </div>
                                        <h3 className="text-heading-6 mb-5 mt-20">{item.name}</h3>
                                        <span className="text-body-small d-block">{item.company}</span>
                                        <p className="text-body-text text-desc color-gray-500 mt-20">{item.quote}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                </div>
                <div className="swiper-button-next swiper-button-next-4" />
                <div className="swiper-button-prev swiper-button-prev-4" />
            </div>
        </>
    );
};

export default TestimonialSlider;

