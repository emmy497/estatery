import map from "../assets/map.png";
import property from "../assets/Property.png";
import TaponBay from "../assets/TaponBay.png";
import LocationDot from "../assets/LocationDot.png";
import Vector from "../assets/Vector.png";
import group from "../assets/Group.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col px-6 py-10 bg-[#F7F7FD] `}
    >
      <div className={`flex-1 flex-col pl-[40px] md:pl-[150px]`}>
        <div className="w-full mb-6">
          <p className=" text-[42px] text-center  lg:text-start font-bold mb-6 lg:max-w-[70%]">
            Buy, rent or sell your property easily
          </p>
          <p className="font-light lg:max-w-[50%] text-center md:text-center lg:mb-14 lg:text-start">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </p>
        </div>
        <div className="flex w-full mb-10 justify-center lg:justify-start">
          <div className="flex flex-col mr-10 border-l-4 border-[#E0DEF7] pl-[20px]">
            <p className="text-[#7065F0] font-bold text-[24px]  ">50k+</p>
            <p className="font-light">renters</p>
          </div>
          <div className="flex flex-col border-l-4 border-[#E0DEF7] pl-[20px]">
            <p className="text-[#7065F0] font-bold text-[24px]  ">100k+</p>
            <p className="font-light">renters</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row lg:w-[50%]  bg-[#fff] shadow-2xl p-8 lg:absolute mb-12 mt-12 items-center z-[100]">
            <div  className=" px-2 py-2 bg-[#7065F0]  cursor-pointer rounded-md text-[#fff] mb-8 shadow-2xl"><Link to="/category/rent">PLaces for rent</Link></div>
            <div  className=" px-2 py-2 bg-[#7065F0]  cursor-pointer rounded-md text-[#fff] shadow-2xl"><Link to="/category/sale">Places for sale</Link></div>
            <div className=" px-2 py-2 bg-[#7065F0] hidden lg:block cursor-pointer rounded-md text-[#fff] z-[100]">
              Browse properties
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:block hidden relative">
        <img className="max-h-svh z-[1]" src={map} alt="mapBg" />

        <img
          className="z-[2] absolute top-0 w-[300px] h-[300px]"
          src={property}
          alt=""
        />
        <img
          className="z-[2] absolute bottom-0 right-0 w-[198px] h-[298px]"
          src={TaponBay}
          alt=""
        />
        <img
          className="z-[2] absolute top-[24px] left-[310px] w-[50px] h-[50px]"
          src={LocationDot}
          alt=""
        />
        <img
          className="z-[2] absolute top-0 left-[330px] "
          src={Vector}
          alt=""
        />
        <img
          className="z-[2] absolute top-[310px] left-[330px] w-[50px] h-[80px]"
          src={group}
          alt=""
        />
      </div>
    </section>
  );
};

export default Hero;
