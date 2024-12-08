import React from "react";
import { Link } from "react-router-dom";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathIcon from "../assets/svg/bathtubIcon.svg";

const ListingItem = ({ listing, id }) => {
  return (
    <div className="rounded-xl shadow-2xl  max-w-[300px] transition ease-in-out delay-100  hover:scale-105  ">
      <Link to={`/category/${listing.type}/${id}`} className="">
        <img className="h-[200px] w-full " src={listing.imgUrls[0]} alt={listing.name} />

        <div className="p-4">
          <div className="pb-2">
            <p>{listing.location}</p>
          </div>

          <div className="pb-2">
            <p className="">{listing.name}</p>
          </div>

          <p className="text-bold mb-4">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && "/Month"}
          </p>

          <div className="">
            <div className="flex mb-4">
              <div className="mr-4">
                <img src={bedIcon} alt="bed" />
              </div>
              <p className="categoryListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}
              </p>
            </div>

            <div className="flex">
              <div className="mr-4">
                <img src={bathIcon} alt="bath" />
              </div>
              <p className="">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
