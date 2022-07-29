import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../../assests/anime-logo-png-7-removebg-preview (1).png";
import {
  auth,
  createUserProfileDocument,
  signInWithFacebook,
  signInWithGoogle,
} from "../../firebase/firebase";
import "./login-page.style.css";

const LoginPage = () => {
  const [isNormalLogin, setIsNormalLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setError("")
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (data) => await createUserProfileDocument(data.user,{name : name}))
        .catch((error) => setError(error.message));
      setEmail("");
      setName("");
      setError("")
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login_page">
      <div className="login_container">
        <div
          className="back"
          onClick={() => setIsNormalLogin(false)}
          style={{ display: `${!isNormalLogin ? `none` : `block`}` }}
        >
          <span className="material-icons">arrow_back_ios</span>
        </div>
        <div className="model_login_page">
          <div className="header_model_login_page">
            <Link to={"/"}>
              <img src={mainLogo} alt="" />
            </Link>
            <h2>{!isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
            <h6 style={{color:"red", marginTop : "10px"}}>{error.split(":")[1]}</h6>
          </div>
          {!isNormalLogin ? (
            <div className="body_model_login_page">
              <div className="item_login_page">
                <img
                  src="https://accounts.fullstack.edu.vn/assets/images/signin/personal-18px.svg"
                  alt=""
                />
                <span onClick={() => setIsNormalLogin(true)}>
                  Sử dụng email / số điện thoại
                </span>
              </div>
              <div className="item_login_page">
                <img
                  src="https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg"
                  alt=""
                />
                <span onClick={signInWithGoogle}>Tiếp tục với Google</span>
              </div>
              <div className="item_login_page">
                <img
                  src="https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg"
                  alt=""
                />
                <span onClick={signInWithFacebook}>Tiếp tục với Facebook</span>
              </div>
            </div>
          ) : !isLogin ? (
            <div className="body_model_login_page">
              <form onSubmit={handleSubmit}>
                <div className="FormControl">
                  <div className="FormInput">
                    <span className="material-icons">mail</span>
                    <input
                      type="email"
                      placeholder="Vui lòng nhập email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="FormControl">
                  <div className="FormInput">
                    <span className="material-icons">lock</span>
                    <input
                      type="password"
                      placeholder="Vui lòng nhập password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button className="btn-submit">
                  <div className="Submit">
                    <span>Đăng nhập</span>
                  </div>
                </button>
              </form>
            </div>
          ) : (
            <div className="body_model_login_page">
              <form onSubmit={handleRegister}>
                <div className="FormControl">
                  <div className="FormInput">
                    <span className="material-icons">mail</span>
                    <input
                      type="text"
                      placeholder="Vui lòng nhập tên"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="FormControl">
                  <div className="FormInput">
                    <span className="material-icons">mail</span>
                    <input
                      type="email"
                      placeholder="Vui lòng nhập email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="FormControl">
                  <div className="FormInput">
                    <span className="material-icons">lock</span>
                    <input
                      type="password"
                      placeholder="Vui lòng nhập password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button className="btn-submit">
                  <div className="Submit">
                    <span>Đăng ký</span>
                  </div>
                </button>
              </form>
            </div>
          )}
          <p className="Login_dontHaveAcc">
            {isLogin ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}{" "}
            <Link to={""} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
