import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { user } from "../../redux/auth/auth.action";
import { useAppSelector } from "../../redux/useTypeSelector";
import { comment, posts } from "../../utils/type";
import { currentDate } from "../../utils/utils";
import CollectionComment from "../collection-comment/collection-comment";
import "./collection-post.style.css";

interface propType {
  item: posts;
  useT: user;
  useId: string;
}
const CollectionPost = ({ item, useT, useId }: propType) => {
  const [countLike, setCountLike] = useState<number>(item.like.length);
  const selectUser = useAppSelector((state) => state.auth!.currentUser);
  const [like, setLike] = useState(false);
  const [dataComment, setDataComment] = useState("");
  const [comment, setcomment] = useState<comment[]>();

  const getComment = async () => {
    const postRef = doc(firestore, "users", useId!, "posts", item.pid);
    const snapDoc = await getDoc(postRef);
    var arrCm: comment[] = snapDoc.data()!.comment;
    setcomment(arrCm);
  };
  const handleLike = async (u_id: string) => {
    const postRef = doc(firestore, "users", useT.uid, "posts", item.pid);
    const snapDoc = await getDoc(postRef);
    var arrLike: string[] = snapDoc.data()!.like;
    const isLike = arrLike.includes(u_id);
    if (isLike) {
      const items = arrLike.filter((item) => item !== u_id);
      const washingtonRef = doc(
        firestore,
        "users",
        useT.uid,
        "posts",
        item.pid
      );
      await updateDoc(washingtonRef, {
        like: items,
      });
      setLike(false);
      setCountLike(items.length);
    } else {
      arrLike.push(u_id);
      const washingtonRef = doc(
        firestore,
        "users",
        useT.uid,
        "posts",
        item.pid
      );
      await updateDoc(washingtonRef, {
        like: arrLike,
      });
      setLike(true);
      setCountLike(arrLike.length);
    }
  };
  useEffect(() => {
    getComment();
    setcomment(item.comment);
  }, [item.comment]);
  useEffect(() => {
    setCountLike(item.like.length);
  }, [item.like]);

  const handleSubmitComment = async () => {
    const postRef = doc(firestore, "users", useId!, "posts", item.pid);
    const randomId = Math.random().toString(36).slice(2, 12);
    const snapDoc = await getDoc(postRef);
    var arrCm: comment[] = snapDoc.data()!.comment;
    const data = {
      mid: randomId,
      uid: selectUser?.uid!,
      content: dataComment,
      date: currentDate(),
    };
    arrCm.push(data);
    setcomment(arrCm);
    await updateDoc(postRef, {
      comment: arrCm,
    });
  };

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

          {item.url.split("/")[item.url.split("/").length - 1].split("%")[0] ===
          "images" ? (
            <div className="post-img-video">
              <div className="img-container">
                <img src={item.url} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
          {item.url.split("/")[item.url.split("/").length - 1].split("%")[0] ===
          "vidoes" ? (
            <div className="post-img-video">
              <div className="video-container">
                <video src={item.url} controls></video>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="react-post">
          <div className="like item-react">
            <span
              className="material-icons"
              style={{
                color:
                  item.like.includes(selectUser?.uid as never) || like
                    ? "red"
                    : "#fff",
              }}
              onClick={() => handleLike(selectUser!.uid)}
            >
              favorite
            </span>
            <span>{item.like.length || countLike} Like</span>
          </div>
          <div className="comment item-react">
            <span className="material-icons">comment</span>
            <span>Commnet</span>
          </div>
        </div>

        <div className="rep-post">
          {comment?.map((data) => (
            <CollectionComment key={data.mid} cm={data} />
          ))}
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
                <input
                  type="text"
                  onChange={(e) => setDataComment(e.target.value)}
                  placeholder="Viết bình luận"
                />
              </div>
              <div className="button-sm">
                <button onClick={handleSubmitComment}>Bình luận</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPost;
