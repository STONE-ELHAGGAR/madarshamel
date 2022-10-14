const Question = ({children,q_1st_line,q_2nd_line}) => {
    return(
    <div className="container">
        <div className="row">
            <div className="col-lg-2 col-sm-1 col-12" />
            <div className="col-lg-8 col-sm-10 col-12 text-center mt-70">
                <h2 className="text-heading-1 color-gray-900">
                    {q_1st_line}<br className="d-lg-block d-none" />{q_2nd_line}
                </h2>
                <p className="text-body-lead-large color-gray-600 mt-20">
                    {children}
                </p>
            </div>
            <div className="col-lg-2 col-sm-1 col-12" />
        </div>
    </div>
)
}

export default Question