import ArrowRight from "../assets/ArrowRightWhite.png";
import House from "../assets/AboutHouseImage.png";
import Video from "../assets/Video.png";
import Home from "../assets/HomeIcon.png";

const About = () => {
  return (
    <>
      <div className="flex lg:px-[100px] mb-[100px] ">
        {/* left section */}
        <div className="flex-1 relative hidden lg:block">
          <img className="rounded-xl" src={House} alt="" />
          <div className="z-[50]"></div>
          <div className="flex items-start absolute bg-[#fff] w-[400px] shadow-2xl px-8 py-4 -left-[70px] top-[90px] rounded-xl">
            <div className="w-[50px] h-[50px] mr-4">
              <img src={Video} alt="" />
            </div>
            <div>
              <div className="text-[#100A55] text-[25px] font-bold">
                Virtual tour
              </div>
              <div className="text-[#4D5461]">
                We provide you with virtual tour
              </div>
            </div>
          </div>
          <div className=" absolute bg-[#fff] w-[400px] shadow-2xl px-8 py-4 -bottom-[60px] left-[100px] rounded-xl">
            <div className="absolute -top-[20px] right-[50px] w-[50px] h-[40px] ">
              <img src={Home} alt="home Icon" />
            </div>
            <div>
              <div className="text-[#100A55] text-[25px] font-bold">
                Find the best deal
              </div>
              <div className="text-[#4D5461]">
                Browse thousands of properties
              </div>
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="flex-1 pl-4 py-10 text-center lg:text-start">
          <div className=" lg:pt-[100px] text-[42px] font-bold mb-4">
            We make it easy for tenants and landlords
          </div>
          <div className="font-light lg:max-w-[60%] text-center text-center md:text-center  lg:text-start mb-4">
            Whether it’s selling your current home, getting financing, or buying
            a new home, we make it easy and efficient. The best part? you’ll
            save a bunch of money and time with our services.
          </div>

          {/* see more button */}
          <div className="flex w-full  justify-center  lg:justify-start">
          <div className="flex justify-center items-center w-[120px] px-2 py-2 bg-[#7065F0] cursor-pointer rounded-md text-[#fff] ">
            <div className="mr-4">See more</div>
            <div>
              <img className="" src={ArrowRight} alt="" />
            </div>
          </div>
          </div>
          
        </div>
      </div>


      {/* get landlord email desktop */}
      <div className="flex flex-col items-center bg-[#100A55] p-14 lg:p-10">
        <div className="text-[#7065F0] mb-6 text-[24px]">No Spam Promise</div>
        <div className="text-[#FFFFFF] mb-6 text-[40px]">Are you a landlord?</div>
        <div className="text-[D3D5DA] mb-6 text-[16px] text-[#D3D5DA]" >Discover ways to increase your home's value and  get listed. No Spam.</div>
        <div>
            <div className="relative w-[500px] bg-[#fff] p-6 rounded-md shadow-xl items-center">
                <input type="email" className="max-w-[300px] w-full bg-transparent placeholder:text-slate-400 test-slate-700 text-sm focus:outline-none " placeholder="Email Address "/>
                <button className="w-[120px] px-2 py-2 bg-[#7065F0] cursor-pointer rounded-md text-[#fff] absolute top-[15px] right-[20px] hover:bg-[#7065F0] ">Submit</button>
            </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default About;
