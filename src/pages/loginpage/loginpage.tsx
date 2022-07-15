import { Link } from "react-router-dom";
import mainLogo from "../../assests/anime-logo-png-7-removebg-preview (1).png";
import "./loginpage.style.css";

const LoginPage = () => {
  return (
    <div className="login_page">
      <div className="login_container">
        <div className="model_login_page">
          <div className="header_model_login_page">
            <Link to={"/"}>
              <img src={mainLogo} alt="" />
            </Link>
            <h2>Đăng nhập</h2>
          </div>
          <div className="body_model_login_page">
            <div className="item_login_page">
              <img
                src="https://accounts.fullstack.edu.vn/assets/images/signin/personal-18px.svg"
                alt=""
              />
              <span>Sử dụng email / số điện thoại</span>
            </div>
            <div className="item_login_page">
              <img
                src="https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg"
                alt=""
              />
              <span>Tiếp tục với Google</span>
            </div>
            <div className="item_login_page">
              <img
                src="https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg"
                alt=""
              />
              <span>Tiếp tục với Facebook</span>
            </div>
          </div>
          <p className="Login_dontHaveAcc">Bạn chưa có tài khoản? <Link to={''}>Đăng ký</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
