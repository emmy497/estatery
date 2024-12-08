import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase.config.js";
import { toast } from "react-toastify";
import Spinner from "./Spinner/Spinner";
import ListingItem from "./ListingItem";
import { doc, getDoc } from "firebase/firestore";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoadng] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get a reference

        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute query
        const querySnap = await getDocs(q);

        // const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        // setLastfetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setListings(listings);
        setLoadng(false);
      } catch (error) {
        toast.error("Could not fetch Listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  //Pagination .Load more

  const onFetchMoreListings = async () => {
    try {
      //Get a reference
      const listingsRef = collection(db, "listings");

      //create a query
      const q = query(
        listingsRef,
        where(
          "type",
          "==",
          params.categoryName,
          orderBy("timestamp", "desc", startAfter(lastFetchedListing), limit(2))
        )
      );

      //Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastfetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoadng(false);
    } catch (error) {
      toast.error("Could not fetch Listings");
    }
  };

  return (
    <div>
      <header className="w-full text-center p-6 text-[38px] text-bold">
        <p >
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <div className="flex flex-col items-center gap-8 md:flex-row lg:flex-row lg:gap-6 mt-10 px-10">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </div>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
