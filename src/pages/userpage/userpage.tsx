import "./userpage.style.css";
import bg_profile from "../../assests/bg-profile.jpg";
import { useAppSelector } from "../../redux/useTypeSelector";

const UserPage = () => {
    const selectUser = useAppSelector(state => state.auth!.currentUser)
    
  return (
    <div className="user-page">
      <div className="user-container">
        <div
          className="user-banner"
          style={{ backgroundImage: `url(${bg_profile})` }}
        >
          <div className="user-info">
            <div className="user-avt">
              <img
                src={selectUser?.img ?selectUser?.img : "https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"}
                alt=""
              />
            </div>
            <div className="user-name">
              <h3>{selectUser?.name}</h3>
            </div>
          </div>
        </div>
        <div className="user-body">
          <div className="user-body-row">
            <div className="user-body-left">
              <div className="content-left">
                <div className="wrap-item-left">
                  <h4>Giới thiệu</h4>
                  <div className="profile-user">
                    <div className="profile-item">
                      <span>Họ và tên :</span> <span>{selectUser?.name}</span>
                    </div>
                    <div className="profile-item">
                      <span>Sinh nhật :</span> <span>chưa cập nhật</span>
                    </div>
                    <div className="profile-item">
                      <span>Giới tính :</span> <span>chưa cập nhật</span>
                    </div>
                    <div className="profile-item">
                      <span>Thành viên :</span> <span>Member</span>
                    </div>
                    <div className="profile-item">
                      <span>Email :</span> <span>{selectUser?.email}</span>
                    </div>
                    <div className="profile-item">
                      <span>Tham gia vào ngày :</span>{" "}
                      <span>{selectUser?.createAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-body-right">
              <div className="content-right">
                <div className="content-header-right">
                  <div className="profile-form">
                    <img
                      src="https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                      alt=""
                    />
                    <div className="form-input">
                      <input type="text" placeholder="Bạn đang nghĩ gì" />
                    </div>
                    <div className="post-blog">
                      <span>Đăng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
