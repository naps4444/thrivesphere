import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      alert(res.data.message);

      // Store token
      if (rememberMe) {
        localStorage.setItem("authToken", res.data.token);
      } else {
        sessionStorage.setItem("authToken", res.data.token);
      }

      router.push("/admin/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
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
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-8/12 mx-0 mt-4 font-volkhov">
          <h1 className="text-[40px] font-cinzel font-bold">LOGIN</h1>

          <label className="text-[20px] font-[400]">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border py-2 px-3 bg-white rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-[20px] font-[400]">Password</label>
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

          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Keep me logged in</label>
            </div>

            <Link href="/forgot-password" className="text-[#A8781C] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
  type="submit"
  className="bg-[#A8781C] text-white px-4 py-2 rounded-md hover:bg-[#8f6615] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
>
  Login
</button>


          {/* Don't have an account? */}
          <div className="flex gap-2 text-gray-600">
            <p>Don't have an account?</p>
            <Link href="/admin/signup" className="text-[#A8781C] hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
