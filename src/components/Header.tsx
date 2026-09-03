"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

import blazerLogo from "../assets/images/blazer_logo.png";

import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 88;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "college_editor") {
        navigate("/editor/dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-br from-[#024334] via-[#024334] to-[#08795F] relative overflow-hidden sticky top-0 z-50 shadow-lg">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-2 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <button
            onClick={() => scrollToSection("home")}
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">THE BLAZER</span>
            <img alt="Blazer Logo" src={blazerLogo} className="h-20 w-auto" />
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm/6 font-poppins font-bold text-white text-[16px] tracking-[0.05em] hover:text-gray-300 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("announcements")}
            className="text-sm/6 font-poppins font-bold text-white text-[16px] tracking-[0.05em] hover:text-gray-300 transition-colors"
          >
            Announcements
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm/6 font-poppins font-bold text-white text-[16px] tracking-[0.05em] hover:text-gray-300 transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm/6 font-poppins font-bold text-white text-[16px] tracking-[0.05em] hover:text-gray-300 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm/6 font-poppins font-bold text-white text-[16px] tracking-[0.05em] hover:text-gray-300 transition-colors"
          >
            Contact
          </button>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-white">
                  <p className="text-sm font-semibold font-poppins">
                    {user.name}
                  </p>
                  <p className="text-xs text-white/80 font-poppins">
                    {user.role === "admin" ? "Admin" : user.college}
                  </p>
                </div>
              </div>
              <div className="h-6 border-l border-white/30"></div>
              <button
                onClick={handleLoginClick}
                className="text-sm/6 font-poppins font-bold tracking-[0.05em] text-white hover:text-gray-300 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="text-sm/6 font-poppins font-bold tracking-[0.05em] text-white hover:text-gray-300 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-sm/6 font-poppins font-bold tracking-[0.05em] text-white hover:text-gray-300 transition-colors"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">THE BLAZER</span>
              <img alt="Blazer Logo" src={blazerLogo} className="h-20 w-auto" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <button
                  onClick={() => scrollToSection("home")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("announcements")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  Announcements
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  Contact
                </button>
              </div>
              <div className="py-6">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 border-b border-gray-200">
                      <p className="text-base font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.role === "admin" ? "Admin" : user.college}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleLoginClick();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
