/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

function BackToTop() {
    const [hasScrolled, setHasScrolled] = useState("false");
    let {t} = useTranslation();
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    });

    // const scrollToTop = () => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };

    const onScroll = () => {
        if (window.scrollY > 100 && !hasScrolled) {
            setHasScrolled(true);
        } else if (window.scrollY < 100 && hasScrolled) {
            setHasScrolled(false);
        }
    };

    return (
        <>
            {hasScrolled && (
                <a id="scrollUp" className={'scrollUp-'+t("common:dir")} href="#top" style={{ position: 'fixed', zIndex: 2147483647 }}>
                    <i className="fi-rr-arrow-small-up" />
                </a>


            )}
        </>
    );
}
export default BackToTop;