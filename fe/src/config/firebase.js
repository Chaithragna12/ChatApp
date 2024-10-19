import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
    apiKey: "AIzaSyASQns-on4Ku_odf5aam3ROk6vT4Yq485o",
    authDomain: "chat-app-433c9.firebaseapp.com",
    projectId: "chat-app-433c9",
    storageBucket: "chat-app-433c9.appspot.com",
    messagingSenderId: "418465190798",
    appId: "1:418465190798:web:14c3b03d3d182b88170adf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "hey, there, I am using chat app",
            lastSeen: Timestamp.now() // Using Firestore Timestamp
        });

        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        });

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            console.log("User document created successfully:", userSnap.data());
        } else {
            console.error("Failed to create user document in Firestore.");
        }

        toast.success("Successfully signed up");
    } catch (error) {
        console.error("Error during signup:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully logged in");
    } catch (error) {
        console.error("Error during login:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Successfully logged out");
    } catch (error) {
        console.error("Error during logout:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

export { signup, login, logout, auth, db };
