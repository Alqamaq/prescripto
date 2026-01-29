import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-10 text-gray-500 dark:text-gray-400">
        <p>
          CONTACT <span className="text-gray-700 dark:text-white font-semibold">US</span>
        </p>
      </div>

      <div className=" my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ">
        <img
          className="w-full md:max-w-[360px] dark:opacity-90"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600 dark:text-gray-300">Our OFFICE</p>
          <p className="text-gray-500 dark:text-gray-400">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Tel: (415) 555‑0132 <br /> Email: help@prescripto.com
          </p>
          <p className="font-semibold text-lg text-gray-600 dark:text-gray-300">
            Careers at PRESCRIPTO
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Learn more about our teams and job openings.
          </p>
          <button className=" border border-black dark:border-white px-8 py-4 text-sm text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
   </div>
  );
};

export default Contact;