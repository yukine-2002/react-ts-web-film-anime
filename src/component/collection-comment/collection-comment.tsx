import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { user } from "../../redux/auth/auth.action";
import { comment } from "../../utils/type";
import "./collection-comment.style.css";

interface tUserComment {
  user: user;
  comment: comment;
}

const CollectionComment = ({ cm }: { cm: comment }) => {
  const [selectUserCm, setSelectUser] = useState<tUserComment>();
  const nav= useNavigate()
  const getUser = async () => {
    if (cm.uid) {
      const postRef = doc(firestore, "users", cm.uid);
      const docSnap = await getDoc(postRef);
      setSelectUser({
        user: {
          uid: docSnap.id,
          name: docSnap.data()?.name,
          email: docSnap.data()?.email,
          img: docSnap.data()?.img,
          createAt: docSnap.data()?.createAt,
        },
        comment : cm
      });
    }
  };
  const handleProfile = (id:string) => {
    nav(`/profile/${id}`)
  }
  useEffect(() => {
    getUser()
  },[cm])
  return (
    <div className="CollectionComment">
      <div className="content-header-right">
        <div className="profile-form">
          <img
            src={selectUserCm?.user?.img!}
            alt=""
          />

          <div className="form-input">
            <h3 style={{cursor : 'pointer'}} onClick={() => handleProfile(selectUserCm?.user.uid!)}>{selectUserCm?.user?.name!}</h3>
            <p>
             {selectUserCm?.comment?.content!}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectionComment;
