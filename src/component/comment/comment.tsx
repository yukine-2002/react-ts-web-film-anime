import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { useAppSelector } from "../../redux/useTypeSelector";
import { comment } from "../../utils/type";
import { currentDate } from "../../utils/utils";
import CollectionComment from "../collection-comment/collection-comment";
import "./comment.style.css";

const Comment = ({ slug }: { slug: string }) => {
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState<comment[]>([]);
  const selectUser = useAppSelector((state) => state.auth.currentUser);

  const handleSubmit = async () => {
    const randomId = Math.random().toString(36).slice(2, 12);
    const postRef = doc(firestore, "anime-comment", slug);
    const querySnapshot = await getDoc(postRef);
    var arr: comment[] = querySnapshot.data()?.comment || [];
    if (arr.length === 0) {
      await arr.push({
        fid: randomId,
        mid: slug,
        uid: selectUser?.uid!,
        content: comment,
        date: currentDate(),
      });

      const data = {
        comment: arr,
      };

      await setDoc(postRef, data);
    } else {
      await arr.push({
        fid: randomId,
        mid: slug,
        uid: selectUser?.uid!,
        content: comment,
        date: currentDate(),
      });

      const data = {
        comment: arr,
      };
      await updateDoc(postRef, data);
    }
    fetchComment();
    arr = [];
    setComment("");
  };
  const fetchComment = async () => {
    const postRef = doc(firestore, "anime-comment", slug);
    const querySnapshot = await getDoc(postRef);
    setCommentData(querySnapshot.data()?.comment);
  };
  useEffect(() => {
    fetchComment();
  }, [comment]);
  return (
    <div className="comment">
      <div className="title-comment">
        <h4>Bình luận</h4>
      </div>

      {selectUser ? (
        <div className="header-commnent">
          <div className="avt-comment">
            <img
              src="https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
              alt=""
            />
          </div>
          <div className="comment-field">
            <textarea
              className="content-comment"
              onChange={(e) => setComment(e.target.value)}
              rows={1}
              placeholder="Thêm bình luận..."
              value={comment}
              tabIndex={-1}
              onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : "")}
              spellCheck={false}
            ></textarea>
          </div>
        </div>
      ) : (
        <p style={{color : `var(--colorItem)`}}>Vui lòng đăng nhập để tiếp tục</p>
      )}

      <div className="body-comment">
        {commentData
          ?.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .map((cm, index) => (
            <CollectionComment key={index} cm={cm} />
          ))}
      </div>
    </div>
  );
};

export default Comment;
