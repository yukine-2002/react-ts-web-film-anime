import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../../assests/anime-logo-png-7-removebg-preview (1).png";
import { auth, signInWithFacebook, signInWithGoogle } from "../../firebase/firebase";
import "./loginpage.style.css";

const LoginPage = () => {
  const [isNormalLogin, setIsNormalLogin] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
    try {
      await signInWithEmailAndPassword(auth,email, password);
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="login_page">
      <div className="login_container">
        <div className="back" onClick={()=>setIsNormalLogin(false)} style={{display : `${!isNormalLogin ? `none` : `block`}`}}>
           <span className="material-icons">arrow_back_ios</span>
        </div>
        <div className="model_login_page">
          <div className="header_model_login_page">
            <Link to={"/"}>
              <img src={mainLogo} alt="" />
            </Link>
            <h2>Đăng nhập</h2>
          </div>
          {!isNormalLogin ? (
            <div className="body_model_login_page">
              <div className="item_login_page">
                <img
                  src="https://accounts.fullstack.edu.vn/assets/images/signin/personal-18px.svg"
                  alt=""
                />
                <span onClick={()=>setIsNormalLogin(true)}>Sử dụng email / số điện thoại</span>
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
          ) : (
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
                      onChange={(e)=> setPassword( e.target.value)}
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
          )}
          <p className="Login_dontHaveAcc">
            Bạn chưa có tài khoản? <Link to={""}>Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
