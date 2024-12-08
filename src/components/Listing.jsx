import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "./Spinner/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "swiper/swiper-bundle.css";
import  { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide  } from "swiper/react"

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
     
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
  
   

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails p-10">

       
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountedPrice">
            ${listing.regularPrice - listing.discountedPrice}
            discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : `1 Bedroom`}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bedrooms`
              : `1 Bathroom`}
          </li>
          <li>{listing.parking && `Parking Spot`}</li>
          <li>{listing.furnished && "Furnished"}</li>

          <div className="leaflet">
            <p className="listingLocationTitle  text-center mb-4">Location</p>
            <div className="leafletContainer  shadow-2xl">
              <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[listing.geolocation.lat, listing.geolocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[listing.geolocation.lat, listing.geolocation.lng]}
                >
                  <Popup>{listing.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {auth.currentUser?.uid !== listing.userRef && (
            <Link to={`/contact/${listing.userRef}`} className="primaryButton">
             
             <button className="w-full primaryButton rounded-md createListingButton bg-[#7065F0] text-[white] p-2 max-w-[400px]" type="submit">
            Contact landlord 
          </button>
            </Link>
          )}
        </ul>
      </div>
    </main>
  );
}

export default Listing;
