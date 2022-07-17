import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOutCurrentUser } from "../../redux/auth/auth.action";
import { useAppDispatch, useAppSelector } from "../../redux/useTypeSelector";
import "./auth-dropdown.style.css";

const AuthDropDown = () => {
    const selectUser = useAppSelector((state) => state.auth!.currentUser);
    const dispatch = useAppDispatch();

  return (
    <div className="auth_dropdown">
      <div className="auth_dropdown_container">
        <div className="auth_dropdown_header">
            <div className="auth_img">
                <img src={selectUser?.img} alt="" />
            </div>
            <div className="auth_info">
                <h3>{!selectUser?.name ? "auth" :selectUser?.name }</h3>
                <span>{selectUser?.email}</span>
            </div>
        </div>
        <div className="auth_dropdown_body">
          <div className="auth_dropdown_item">
            <Link  to={'/profile'}>
                <span>Trang cá nhân</span>
            </Link>
          </div>
          <div className="auth_dropdown_item">
            <Link  to={''}>
                <span>Anime đã xem</span>
            </Link>
          </div>

          <div className="auth_dropdown_item">
            <Link  to={''}>
                <span>Anime Theo dõi</span>
            </Link>
          </div>

          <div className="auth_dropdown_item">
            <Link  to={''}>
                <span>Cài đặt</span>
            </Link>
          </div>

          <div className="auth_dropdown_item" onClick={() =>dispatch(signOutCurrentUser() as any) }>
            <Link  to={''}>
                <span >Đăng xuất</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDropDown;
