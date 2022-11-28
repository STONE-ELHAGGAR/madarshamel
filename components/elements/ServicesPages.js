import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';

const ServicesPages = ({content}) => {
    let allItems = '';
    if(content?.pages){
    if(content.pages?.length > 0){
        allItems = content.pages?.map((page) => {
            return(
                <li>
                    <Link href={"/service-single/"+page._id}><a>{page.title}</a></Link>
                </li>
            )
        })
    }
    return (
        <ul className="sub-menu">
            {allItems}
        </ul>
    );
  }else{
    return (
      <>
      </>
  );
  }
}

export default ServicesPages;