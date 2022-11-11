/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "./../../components/layout/Layout";
const SingleVendor = () => {

    let Router = useRouter()


    const { id } = Router.query;


    useEffect(() => {
        console.log(id);
    }, [id]);

    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };


    return (
        <>
            <Layout>
            <h1>{id}</h1>
            </Layout>
        </>
    );
};



export default SingleVendor;