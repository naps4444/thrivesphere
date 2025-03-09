import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleScroll = (id) => {
    setIsOpen(false);
    if (router.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      }
    } else {
      router.push("/").then(() => {
        setTimeout(() => {
          const section = document.getElementById(id);
          if (section) {
            window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
          }
        }, 500);
      });
    }
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <nav ref={menuRef} className="bg-[#FFF6F1] shadow-md py-4 lg:pt-6 lg:pb-10 xl:container mx-auto font-georgia xl:text-xl ">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleNavigation("/")} className="text-xl -ml-6 lg:ml-0 font-bold text-gray-800">
          <Image src="/logo.svg" alt="logo" height={180} width={180} className="md:w-[200px] lg:w-[240px]" />
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#154E59] pr-4 mt-2" aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:space-x-4 lg:space-x-16 2xl:space-x-[140px] text-[#154E59]">
          {[{ name: "HOME", id: "home" }, { name: "ABOUT", id: "about" }, { name: "SERVICES", id: "services" }, { name: "CONTACT", id: "contact" }].map((item, index) => (
            <li key={index}>
              <button onClick={() => handleScroll(item.id)} className="block py-2 px-4 transition duration-300 ease-in-out hover:text-[#0A2A31]">
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <button onClick={() => handleNavigation("/services/Services")} className="text-white bg-[#154E59] py-3 md:px-3 lg:px-8 transition-transform duration-300 hover:scale-105">
            Walk With Us
          </button>
          {status === "loading" ? null : session && (
            <button onClick={() => signOut()} className="text-white bg-red-500 py-3 md:px-3 lg:px-8 transition-transform duration-300 hover:scale-105">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden`}>
        <ul className="flex flex-col bg-[#FFF6F1] shadow-md px-4 py-4 space-y-2 transition-opacity duration-500">
          {[{ name: "HOME", id: "home" }, { name: "ABOUT", id: "about" }, { name: "SERVICES", id: "services" }, { name: "CONTACT", id: "contact" }].map((item, index) => (
            <li key={index}>
              <button onClick={() => handleScroll(item.id)} className="block py-2 px-4 transition duration-300 ease-in-out hover:text-[#0A2A31]">
                {item.name}
              </button>
            </li>
          ))}
          <div className="pt-2">
            <button onClick={() => handleNavigation("/services/Services")} className="w-full text-white bg-[#154E59] py-3 transition-transform duration-300 hover:scale-105">
              Walk With Us
            </button>
            {session && (
              <button onClick={() => signOut()} className="w-full mt-2 text-white bg-red-500 py-3 transition-transform duration-300 hover:scale-105">
                Logout
              </button>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
