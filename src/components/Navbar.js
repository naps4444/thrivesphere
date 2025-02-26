import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
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
    setIsOpen(false); // Close mobile menu

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
    setIsOpen(false); // Close mobile menu
    router.push(path);
  };

  return (
    <nav ref={menuRef} className="bg-[#FFF6F1] shadow-md py-4 lg:pt-6 lg:pb-10 xl:container mx-auto font-georgia">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleNavigation("/")} className="text-xl -ml-6 lg:ml-0 font-bold text-gray-800">
          <Image src="/logo.svg" alt="logo" height={180} width={180} />
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#154E59] pr-4 mt-2" aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:space-x-4 lg:space-x-16 2xl:space-x-[140px] text-[#154E59]">
          {[
            { name: "HOME", id: "home" },
            { name: "ABOUT", id: "about" },
            { name: "SERVICES", id: "services" },
            { name: "CONTACT", id: "contact" },
          ].map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleScroll(item.id)}
                className="block py-2 px-4 relative transition duration-300 ease-in-out hover:text-[#0A2A31]"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#0A2A31] transition-all duration-300 hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNavigation("/services/Services")}
            className="text-white bg-[#154E59] py-3 md:px-3 lg:px-8 transition-transform duration-300 hover:scale-105"
          >
            Walk With Us
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden`}>
        <ul className="flex flex-col bg-[#FFF6F1] shadow-md px-4 py-4 space-y-2 transition-opacity duration-500">
          {[
            { name: "HOME", id: "home" },
            { name: "ABOUT", id: "about" },
            { name: "SERVICES", id: "services" },
            { name: "CONTACT", id: "contact" },
          ].map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleScroll(item.id)}
                className="block py-2 px-4 transition duration-300 ease-in-out hover:text-[#0A2A31]"
              >
                {item.name}
              </button>
            </li>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavigation("/services/Services")}
              className="w-full text-white bg-[#154E59] py-3 transition-transform duration-300 hover:scale-105"
            >
              Walk With Us
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
