import { useEffect, useState } from "react";
import { user } from "../../redux/auth/auth.action";
import { useAppSelector } from "../../redux/useTypeSelector";
import { posts } from "../../utils/type";
import "./collection-post.style.css";

interface propType {
  item: posts;
  useT : user
}
const CollectionPost = ({ item , useT }: propType) => {
  
  const [type, setType] = useState("videos" || "images");
  const selectUser = useAppSelector((state) => state.auth!.currentUser);
 

  return (
    <div className="collectionPost">
      <div className="container-post">
        <div className="model-body-info">
          <div className="user-avt">
            <img
              src={
                useT?.img
                  ? useT?.img
                  : "https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
              }
              alt=""
            />
          </div>
          <div className="user-name">
            <h3>{useT?.name}</h3>
            <span>{item.date}</span>
          </div>
        </div>
        <div className="post-body">
          <div className="post-body-text">
            <p>{item.content}</p>
          </div>
          <div className="post-img-video">
            {item.url.split("/")[item.url.split("/").length - 1].split("%")[0] === "images" ? (
              <div className="img-container">
                <img src={item.url} alt="" />
              </div>
            ) : (
              <div className="video-container">
                <video src={item.url} controls ></video>
              </div>
            )}
          </div>
        </div>

        <div className="react-post">
          <div className="like item-react">
            <span className="material-icons">favorite</span>
            <span>Like</span>
          </div>
          <div className="comment item-react">
            <span className="material-icons">comment</span>
            <span>Commnet</span>
          </div>
        </div>

        <div className="rep-post">
          <div className="content-header-right">
            <div className="profile-form">
              <img
                src={
                  selectUser?.img
                    ? selectUser.img
                    : `https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg`
                }
                alt=""
              />
              <div className="form-input">
                <input type="text" placeholder="Viết bình luận" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPost;
