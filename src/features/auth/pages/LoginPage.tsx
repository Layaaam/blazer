import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import blazerLogo from "../../../assets/images/blazer_logo.png";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated, user } =
    useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from || "/";
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "college_editor") {
        navigate("/editor/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (error) {
      clearError();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const fieldError = validateField(key, formData[key]);
      if (fieldError) {
        newErrors[key] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData);
    } catch (error) {}
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    Object.values(errors).every((error) => error === "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#024334] via-[#024334] to-[#08795F] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200 font-poppins text-xs font-medium group"
      >
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </button>

      <div className="max-w-sm w-full space-y-6 relative z-10">
        <div className="text-center">
          <img
            src={blazerLogo}
            alt="The Blazer Logo"
            className="mx-auto h-12 w-auto drop-shadow-lg"
          />
          <h2 className="mt-4 text-xl font-bold text-white font-libre-baskerville">
            Welcome Back
          </h2>
          <p className="mt-1 text-xs text-white/70 font-poppins">
            Sign in to your account
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold font-poppins">Login Failed</p>
                  <p className="text-xs">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-900 font-semibold text-xs font-poppins"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-lg transition-all duration-200 font-poppins focus:outline-none ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#024334] focus:ring-[#024334]/10 focus:bg-white"
                  } focus:ring-2`}
                  placeholder="your.email@cmu.edu.ph"
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs font-poppins flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-gray-900 font-semibold text-xs font-poppins"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 text-sm bg-gray-50 border rounded-lg transition-all duration-200 font-poppins focus:outline-none ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#024334] focus:ring-[#024334]/10 focus:bg-white"
                  } focus:ring-2`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs font-poppins flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full px-5 py-2.5 rounded-lg font-bold text-xs tracking-[0.05em] transition-all duration-300 font-poppins focus:outline-none focus:ring-2 focus:ring-[#024334]/30 ${
                isFormValid && !isLoading
                  ? "bg-[#024334] hover:bg-[#08795F] text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
