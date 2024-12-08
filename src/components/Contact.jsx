import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    };

    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="shadow-2xl p-10 max-w-[70%] mx-auto">
      <header>
        <p className="pageHeader font-bold text-[20px] mb-4">
          Contact Landlord
        </p>
      </header>

      {landlord !== null && (
        <main >
          <div className="mb-4">
            <p className="">Contact {landlord?.name}</p>
          </div>

          <form className=" ">
            <div className="flex flex-col">
              <label htmlFor="message" className=" font-bold mb-4">
                Message
              </label>
              <textarea
                name="message"
                className=" shadow-2xl h-[100px] focus:outline-none focus:border-2 mb-8"
                value={message}
                onChange={onChange}
                id="message"
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button
                className="w-full primaryButton rounded-md  bg-[#7065F0] text-[white] p-2 max-w-[200px]"
                type="submit"
              >
                Send message
              </button>{" "}
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
