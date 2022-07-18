import "./userpage.style.css";
import bg_profile from "../../assests/bg-profile.jpg";
import { useAppSelector } from "../../redux/useTypeSelector";
import React, { useEffect, useRef, useState } from "react";
import { auth, firestore, storage } from "../../firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { currentDate } from "../../utils/utils";
import CollectionPost from "../../component/collection-posts/collection-post";
import { posts } from "../../utils/type";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import { useParams } from "react-router-dom";
import { user } from "../../redux/auth/auth.action";
import ModelPost from "../../component/model-post/model-post";

const UserPage = () => {
  const [selectUser, setSelectUser] = useState<user>();
  const [model, setModel] = useState(false);
  const [isChooseFile, setIsChooseFile] = useState(false);
  const [post, setPost] = useState<posts[]>([]);
  const [url, setURL] = useState("");
  const [content, setContent] = useState("");
  const refUploadFile = useRef<HTMLInputElement>(null);
  const [percent,setPercent] = useState(0)
  const { uid } = useParams();
  const handleClickUpload = () => {
    if (refUploadFile.current) {
      refUploadFile.current.click();
    }
  };

  const handleFile = () => {
    if (refUploadFile) {
      var fileImg = refUploadFile.current!.files![0];
      var type = fileImg.type!;
      var pathReference = null;
      setIsChooseFile(true);
      if (type.split("/")[0] === "image") {
        pathReference = ref(storage, `images/${Date.now()} - ${fileImg.name}`);
      } else {
        pathReference = ref(storage, `videos/${Date.now()} - ${fileImg.name}`);
      }
      const uploadTask = uploadBytesResumable(pathReference, fileImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercent(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setURL(downloadURL);
          });
        }
      );
    }
  };
  console.log(1)
  const handleRemoveImage = () => {
    const desertRef = ref(storage, url);
    deleteObject(desertRef)
      .then(() => {
        setIsChooseFile(false);
        setURL("");
        console.log("success");
      })
      .catch((error) => {
        console.log("fail");
      });
  };
  const handleSubmitPost = async () => {
    const postRef = collection(
      firestore,
      "users",
      auth.currentUser?.uid!,
      "posts"
    );
    const docData = {
      content: content,
      url: url,
      like: "",
      date: currentDate(),
    };
   
    try {
      await addDoc(postRef, docData);
      getPost()
      setModel(false);
      setIsChooseFile(false);
      setURL("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };


  const getPost = async () => {
    if (uid) {
      const postRef = collection(firestore, "users", uid, "posts");   
      const querySnapshot = await getDocs(postRef);
      if (postRef.parent?.id === uid) {
        querySnapshot.forEach((doc) => {
          setPost((oldItem) => {
            const isEx = oldItem.find((item) => item.pid === doc.id);
            if (isEx) {
              return oldItem;
            }
            return [
              ...post,
              {
                pid: doc.id,
                content: doc.data().content,
                url: doc.data().url,
                date: doc.data().date,
                like: doc.data().like,
              },
            ];
          });
        });
      }
    }
  };
  const getUser = async () => {
    if (uid) {
      const postRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(postRef);
      setSelectUser({
        uid: docSnap.id,
        name: docSnap.data()?.name,
        email: docSnap.data()?.email,
        img: docSnap.data()?.img,
        createAt: docSnap.data()?.createAt,
      });
    }
  };
  useEffect(() => {
    getPost();
    getUser();
  }, [post,uid]);

  useEffect(() => {
    setPost([])
  } ,[uid])
 
  return (
    <div className="user-page">
      <ModelPost
        model={model}
        setModel={setModel}
        selectUser={selectUser!}
        setContent={setContent}
        handleRemoveImage={handleRemoveImage}
        isChooseFile={isChooseFile}
        handleClickUpload={handleClickUpload}
        refUploadFile={refUploadFile}
        handleSubmitPost={handleSubmitPost}
        url={url}
        handleFile={handleFile}
        percent={percent}
      />
      <div className="user-container">
        <div
          className="user-banner"
          style={{ backgroundImage: `url(${bg_profile})` }}
        >
          <div className="user-info">
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
                {auth.currentUser?.uid === uid ? (
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
                          onClick={() => setModel(true)}
                          placeholder={`Chào ${
                            selectUser?.name ? selectUser.name : ""
                          } bạn đang nghĩ gì ?`}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {post ? (
                  post
                    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                    .map((item,index) => (
                      <CollectionPost key={index} item={item} useT={selectUser!} />
                    ))
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
