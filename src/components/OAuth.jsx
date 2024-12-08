import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
import { Link } from "react-router-dom";

function OAuth() {
  const  navigate = useNavigate();
  const locatioin = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for User
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      //If user doesnt exist create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
         
        });

        navigate("/")
      }
    } catch (error) {}
  };

  return (
    <div className="flex p-2 items-center" onClick={onGoogleClick}>
      <div className="mr-2">
        <Link>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</Link>{" "}
      </div>
      <img className="w-[30px] h-[30px]" src={googleIcon} />
    </div>
  );
}

export default OAuth;
