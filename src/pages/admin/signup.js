import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/signup", { email, password });
      alert(res.data.message);
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen xl:container mx-auto">
      {/* Left Side - Image */}
      <div className="hidden md:block my-auto">
        <Image
          src="/authimg.svg"
          alt="Smiling lady"
          layout="responsive"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-10/12 mx-auto">
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 w-8/12 mx-0 mt-4 font-volkhov"
        >
          <h1 className="text-[40px] font-cinzel font-bold">SIGN UP</h1>

          <label className="text-[20px] font-[400]">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border py-2 px-3 bg-white rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-[20px] font-[400]">Set Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="border py-2 px-3 bg-white rounded-md w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <button
  type="submit"
  className="bg-[#A8781C] text-white px-4 py-2 rounded-md hover:bg-[#8f6615] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
>
  Sign Up
</button>


          {/* OR Divider */}
          <div className="grid grid-cols-3 w-9/12 mx-auto justify-between items-center">
            <div className="bg-[#808080] h-[1px]"></div>
            <p className="text-[#808080] text-center">or</p>
            <div className="bg-[#808080] h-[1px]"></div>
          </div>

          {/* Google Sign-In */}
          <button className="flex justify-center items-center gap-2 border border-[#A8781C] py-2 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
  <Image
    src="/goo.svg"
    height={20}
    width={20}
    alt="Google icon"
    className="w-4"
  />
  <p className="font-volkhov">Continue with Google</p>
</button>


          {/* Already have an account? */}
          <div className="flex gap-2 text-gray-600">
            <p>Have an Account?</p>
            <Link href="/admin/login" className="text-[#A8781C] hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
