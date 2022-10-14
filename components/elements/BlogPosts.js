import Link from "next/link";


const BlogPosts = () => {
    return(
    <section className="section-box mt-100">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h3 className="text-heading-1 mb-10">Latest News</h3>
                    <p className="text-body-lead-large color-gray-600">
                        From Our blog
                    </p>
                </div>
                <div className="col-lg-4 text-lg-end text-start pt-30">
                    <Link href="/blog-1"><a className="btn btn-black icon-arrow-right-white">View More</a></Link>
                </div>
            </div>
        </div>
        <div className="container mt-90">
            <div className="row">
                <div className="col-lg-4 col-sm-12 pr-30">
                    <div className="card-grid-style-4">
                        <span className="tag-dot">Category</span><Link href="/blog-single"><a className="text-heading-4">Replacable title for post</a></Link>
                        <div className="grid-4-img">
                            <Link href="/blog-single">
                                <a><img src="/assets/imgs/page/homepage1/img-news-1.png" alt="Almadar Alshamel" /></a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12 pr-30">
                    <div className="card-grid-style-4">
                        <span className="tag-dot">Category</span><Link href="/blog-single"><a className="text-heading-4">Replacable title for post</a></Link>
                        <div className="grid-4-img">
                            <Link href="/blog-single"><a><img src="/assets/imgs/page/homepage1/img-news-2.png" alt="Almadar Alshamel" /></a></Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12 pr-30">
                    <div className="card-grid-style-4">
                        <span className="tag-dot">Category</span><Link href="/blog-single"><a className="text-heading-4">Replacable title for post</a></Link>
                        <div className="grid-4-img color-bg-4">
                            <Link href="/blog-single"><a><img src="/assets/imgs/page/homepage1/img-news-3.png" alt="Almadar Alshamel" /></a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)}

export default BlogPosts;