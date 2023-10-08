import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  orderBy,
  // limit,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, firestore } from "./firebase.js"

export async function createProject( project ) {
  // console.log(typeof project)
  if (typeof project !== "object") return;
  const collectionRef = collection(firestore, "projects");
  const data = {...project, startedAt: Timestamp.now()}
  await addDoc(collectionRef, { ...data });
  console.log('Data Saved!')
  //   const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  // const data = { uid: uid,
  //    text: text,
  //    title: title,
  //    date: Timestamp.now() };
  // const docRef = await addDoc(collection(firestore, "projects"), data);
  // return { id: docRef.id, ...data };
}

export async function delSummary(id) {
  await deleteDoc(doc(firestore, "summaries", id));
}

export async function fetchSummary({uid}) {
    // console.log(uid)
    const snapshot = await getDocs(
        query(collection(firestore, "summaries"), where("uid", "==", uid), orderBy("date", "desc"))
    );
    const check = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    // console.log(check);
    return check
}

export const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
  if (!file) {
    errorCallback("File not found");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if (!fileType.includes("image")) {
    errorCallback("File must an image");
    return;
  }
  if (fileSize > 2) {
    errorCallback("File must smaller than 2MB");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);

  const task = uploadBytesResumable(storageRef, file);

  task.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressCallback(progress);
    },
    (error) => {
      errorCallback(error.message);
    },
    () => {
      getDownloadURL(storageRef).then((url) => {
        urlCallback(url);
      });
    }
  );
};