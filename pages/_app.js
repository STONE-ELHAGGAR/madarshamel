import '../public/assets/css/style.css'
import "../public/assets/css/swiper-custom.css";
import React, { useEffect, useState } from "react";
import Preloader from '../components/elements/Preloader';
//import 'react-modal-video/css/modal-video.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (typeof window !== "undefined") {
      window.WOW = require("wowjs");
    }
    new WOW.WOW().init();
  }, []);
  function Loading() {
    const router = useRouter();
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setTimeout(() =>{setLoading(false)},5000);
  
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError',  handleComplete)
  
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    
    return loading && (
      <div id="preloader-active">
          <div className="preloader d-flex align-items-center justify-content-center">
              <div className="preloader-inner position-relative">
                  <div className="text-center">
                      <div className="loader" />
                  </div>
              </div>
          </div>
      </div>
    )
  }
  return (
    <>
    <Loading />
      {!loading ? (
        <Component {...pageProps} />
      ) : (
        <Preloader />
      )}

    </>
  )
}

export default MyApp
