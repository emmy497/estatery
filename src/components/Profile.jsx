import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";
import ArrowRight from "../assets/ArrowRightWhite.png";

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where(
          "userRef",
          "==",
          "auth.currentUser.uid",
          orderBy("timestamp", "desc")
        )
      );

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogOut = () => {
   


        auth.signOut();
        navigate("/");

   
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //Update the display name in firebase

        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("could not update profile details");
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updateListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updateListings);
      toast.succes("Successfully deleted listing");
    }
  };
  return (
    <>
      <div className="p-10 rounded-md shadow-2xl m-10">
        <header className="profileHeader">
          <p className="mb-10 w-full  text-center font-bold text-[38px]">
            My Profile
          </p>
        </header>

        <main>
          <div className="profileDetailsHeader  mb-4">
            <p className="mb-4 text-[20px]">Edit Personal Details</p>

            <div className="mb-4 ">
              <form className="flex flex-col  " action="">
                <input
                  type="text"
                  id="name"
                  className="mb-4 border-b-4 focus:outline-none focus:border-[black]"
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                />
                <input
                  type="text"
                  id="email"
                  className="mb-4 border-b-4 focus:outline-none focus:border-[black]"
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                />
              </form>
            </div>

            <div
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
              className="mb-4 flex justify-center items-center w-[120px] px-2 py-2 bg-[#7065F0] cursor-pointer rounded-md text-[#fff] "
            >
              <div className="">{changeDetails ? "Done" : "Edit details"}</div>
            </div>
          </div>

          
            <Link to="/create-listing" className="mb-4 flex justify-start items-center  px-2 py-2 bg-[#7065F0] cursor-pointer rounded-md text-[#fff] max-w-[150px]">
              <div className="mr-2"> Create listing</div>
              <div className="max-w-[20px]">
                <img className="" src={ArrowRight} alt="" />
              </div>
            </Link>
       

          <button
            type="button"
            className="mb-4 px-2 py-2 bg-[#7065F0] cursor-pointer rounded-md text-[#fff] max-w-[220px]"
            onClick={onLogOut}
          >
            Logout
          </button>
        </main>
      </div>
      <div className="listings">
        {!loading && listings.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
