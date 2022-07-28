import { addDoc, collection, getDocs } from "firebase/firestore";
import { Dispatch } from "redux";
import { auth, firestore } from "../../firebase/firebase";
import { posts } from "../../utils/type";
import { currentDate } from "../../utils/utils";
import { PostActionTypes } from "./posts.types";


interface loadPost {
  type: PostActionTypes.LOADING_POST,
  payload: posts[]
}

interface putPost {
  type: PostActionTypes.UP_POST
}


export type actions = loadPost | putPost


export const setCPost = (uid: string) => {
  return async (dispatch: Dispatch<actions>) => {
    const arr: posts[] = []
    const postRef = collection(firestore, "users", uid, "posts");
    const querySnapshot = await getDocs(postRef);
    querySnapshot.forEach((doc) => {
      arr.push({
        pid: doc.id,
        content: doc.data().content,
        url: doc.data().url,
        comment : doc.data().comment,
        date: doc.data().date,
        like: doc.data().like,
      })
    })

    dispatch({
      type: PostActionTypes.LOADING_POST,
      payload: arr
    })

  }
}

export const upPost = ({ content, url, setModel, setIsChooseFile, setURL, setContent }
  : {
    content: string,
    url: string,
    setModel: React.Dispatch<React.SetStateAction<boolean>>,
    setIsChooseFile: React.Dispatch<React.SetStateAction<boolean>>,
    setURL: React.Dispatch<React.SetStateAction<string>>,
    setContent: React.Dispatch<React.SetStateAction<string>>
  }) => {
  return async (dispatch: Dispatch<actions>) => {
    const postRef = collection(
      firestore,
      "users",
      auth.currentUser?.uid!,
      "posts"
    );
    const docData = {
      content: content,
      url: url,
      like: [],
      comment:[],
      date: currentDate(),
    };
    try {
      await addDoc(postRef, docData);
      dispatch({
        type: PostActionTypes.UP_POST
      })
      setModel(false);
      setIsChooseFile(false);
      setURL("");
      setContent("");
    } catch (error) {
      console.log(error);
    }

  }
}


