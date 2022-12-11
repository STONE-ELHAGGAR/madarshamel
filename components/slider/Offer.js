/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, {useState, useEffect} from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useTranslation from "next-translate/useTranslation";

SwiperCore.use([Autoplay, Navigation]);
const OfferSlider = () => {
    let {t} = useTranslation();
    const data = [
        {
            img: "market.svg",
            title: t("common:customsClearance"),
            text: t("common:customsClearanceDesc")
        },
        {
            img: "consulting.svg",
            title: t("common:consulting"),
            text: t("common:consultingDesc")
        },
        {
            img: "cognity.svg",
            title: t("common:cargoTransportation"),
            text: t("common:cargoTransportationDesc")
        }
    ];

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
      setDomLoaded(true);
    }, []);


    return (
        <>
            <div className="box-swiper">
                <div className="swiper-container swiper-group-4">
                {domLoaded && (
                    <Swiper
                        breakpoints={{
                            0: {
                            slidesPerView: 1,
                            spaceBetween: 20
                            },
                            768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                            }
                        }}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                        navigation={{
                            prevEl: ".swiper-button-prev-5",
                            nextEl: ".swiper-button-next-5"
                        }}
                        className="swiper-wrapper pb-70 pt-5"
                    >
                        {data.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="swiper-slide">
                                    <div className="card-grid-style-2 hover-up">
                                        <div className="grid-2-img">
                                            <img src={`assets/imgs/page/homepage1/${item.img}`} alt="Agon" />
                                        </div>
                                        <h3 className="text-heading-5 mt-20">{item.title}</h3>
                                        <p className="text-body-text color-gray-600 mt-20">{item.text}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                </div>
            </div>
        </>
    );
};

export default OfferSlider;

