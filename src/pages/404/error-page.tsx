import bg_err from '../../assests/undraw_Page_not_found_re_e9o6.png'

const HandleError404 = () => {
    return (
        <div className="error">
            <img src={bg_err} style={{width: "100%",
                                        height: "calc(100vh - 80px)",
                                        marginTop: "80px",}} alt="" />
        </div>
    )
}

export default HandleError404