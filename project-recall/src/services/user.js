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

export async function createUser(payLoad) {
//   const userDetails = JSON.parse(localStorage.getItem('userDetails'));
if (typeof payLoad !== "object") return;
  const data = { 
    // id: v4(),
     username: payLoad.userName,
     email: payLoad.email,
     password: payLoad.passWord,
     createdAt: Timestamp.now() };
  // const data = {...payLoad, startedAt: Timestamp.now()}
  await addDoc(collection(firestore, "users"), { ...data });
  console.log('User Created!', data)
  // return { id: docRef.id, ...payLoad };
  return;
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