/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";


function BlogSingle({content}) {
    return (
        <>
            <Layout>
                <div>
                    <section className="section-box">
                        <div className="banner-hero banner-head-image" style={{ background: 'url(../assets/imgs/page/blog/single/shipping.jpg)' }}>
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="text-heading-1 color-white mt-30">{content.pages[0].title}</h1>
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
                                        <p>{content.pages[0].description}</p>
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


export async function getServerSideProps(context) {
    let id = context.params.id;
    const servicesPagesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/pages/readById', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    });
  
    let resultData = await servicesPagesRequest.json();

    return {
      props:{
        content: resultData
      }
    }
  } 