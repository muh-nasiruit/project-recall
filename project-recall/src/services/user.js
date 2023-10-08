import { firestore } from "./firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
//   orderBy,
  // limit,
  Timestamp,
  where,
} from "firebase/firestore";

export async function createUser({ uid, text, title }) {
//   const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const data = { uid: uid,
     text: text,
     title: title,
     date: Timestamp.now() };
  const docRef = await addDoc(collection(firestore, "users"), data);
  console.log('Data Saved!')
  return { id: docRef.id, ...data };
}

export async function delUser(id) {
  await deleteDoc(doc(firestore, "users", id));
}

export async function fetchUser({email, passWord}) {
    console.log(email, passWord)
    if (!email || !passWord) return;

    const collectionRef = collection(firestore, "users");
    const condition1 = where("email", "==", email);
    const condition2 = where("password", "==", passWord);
    // const queryOrder = orderBy("date", "desc");
    const dbQuery = query(collectionRef, condition1, condition2);

    const snapshot = await getDocs(dbQuery)

    const check = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    // if (!snapshot.exists()) return null;
    return check
}