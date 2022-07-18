import { user } from "../../redux/auth/auth.action";
import { Spinner } from "../lazyLoading/lazyLoading";

interface typeProps {
  model: boolean;
  setModel: React.Dispatch<React.SetStateAction<boolean>>;
  selectUser: user;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleRemoveImage: () => void;
  isChooseFile: boolean;
  handleClickUpload: () => void;
  refUploadFile: React.RefObject<HTMLInputElement>;
  handleSubmitPost: () => void;
  url: string;
  handleFile: () => void;
  percent: number;
}

const ModelPost = ({
  model,
  setModel,
  selectUser,
  setContent,
  handleRemoveImage,
  isChooseFile,
  handleClickUpload,
  refUploadFile,
  handleSubmitPost,
  url,
  handleFile,
  percent,
}: typeProps) => {
  return (
    <div
      className="model-post-box"
      style={{ display: model ? "flex" : "none" }}
    >
      <div className="model-container">
        <div className="model-header">
          <h4>Tạo bài viết</h4>
          <div className="model-close" onClick={() => setModel(false)}>
            <span className="material-icons">close</span>
          </div>
        </div>
        <div className="model-body">
          <div className="model-body-info">
            <div className="user-avt">
              <img
                src={
                  selectUser?.img
                    ? selectUser?.img
                    : "https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                }
                alt=""
              />
            </div>
            <div className="user-name">
              <h3>{selectUser?.name}</h3>
            </div>
          </div>
          <div className="model-body-content">
            <div className="model-body-text">
              <input
                type="text"
                onChange={(e) => setContent(e.target.value)}
                placeholder={`${
                  selectUser?.name ? selectUser.name : ""
                } bạn đang nghĩ gì ?`}
              />
            </div>
            <div className="model-body-img">
              <div className="model-img" onClick={() => handleRemoveImage()}>
                <span className="material-icons">close</span>
              </div>
              <div className="model-body-container" id="model-body-c-icon">
                {!isChooseFile ? (
                  <div
                    className="model-body-c-icon"
                    id="model-body-c-icon"
                    onClick={handleClickUpload}
                  >
                    <span className="material-icons">add_photo_alternate</span>
                    <p>Thêm ảnh hoặc video</p>
                  </div>
                ) : percent === 100 ? (
                  refUploadFile.current!.files![0].type.split("/")[0] ===
                  "image" ? (
                    <img src={url} />
                  ) : (
                    <video src={url} controls />
                  )
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner />
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleFile}
                  name="fileUpload"
                  ref={refUploadFile}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <div className="model-body-adv">
            <span></span>
            <div className="model-body-icon"></div>
          </div>
          <div className="model-body-button">
            <button onClick={() => handleSubmitPost()}>Đăng</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModelPost;
