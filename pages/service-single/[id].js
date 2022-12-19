/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";


function BlogSingle({content}) {
    let router = useRouter()
    const { id } = router.query;
    let {t} = useTranslation();
    return (
        <>
            <Layout>
                <div>
                    <section className="section-box">
                        <div className="banner-hero banner-head-image" style={{ background: 'url(../assets/imgs/page/blog/single/shipping.webp)' }}>
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="text-heading-1 color-white mt-30">{t("common:"+id)}</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2" />
                                <div className="col-lg-8">
                                    <div className="single-detail mt-50">
                                        <p>{t("common:"+id+"-p")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </Layout>

        </>
    )
}

export default BlogSingle;