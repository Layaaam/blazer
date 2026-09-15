import React, { useState } from "react";
import blazerLogo from "../../../assets/images/blazer_logo_white.png";

interface FormData {
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  email?: string;
  subject?: string;
  message?: string;
  [key: string]: string | undefined;
}

type FormFieldName = keyof FormData;

function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const validateField = (name: FormFieldName, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return "";
      case "subject":
        if (!value) return "Subject is required";
        if (value.length < 3) return "Subject must be at least 3 characters";
        return "";
      case "message":
        if (!value) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as FormFieldName]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as FormFieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<FormFieldName>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setFormData({ email: "", subject: "", message: "" });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    Object.values(errors).every((error) => error === "");

  return (
    <section id="contact" className="relative">
      <div className="bg-gradient-to-br from-[#024334] via-[#024334] to-[#08795F] relative overflow-hidden">
        <div
          className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 opacity-90 hover:opacity-40 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${blazerLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-1 bg-white/40 mx-auto mb-6"></div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-libre-baskerville tracking-tight">
              Contact Us!
            </h2>
            <div className="w-16 h-1 bg-white/40 mx-auto mb-8"></div>
          </div>
          <p className="text-white/90 text-lg sm:text-xl font-poppins leading-relaxed max-w-3xl mx-auto text-center">
            Have questions about the yearbook, or need to get in touch with our
            editorial team? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-3xl mx-auto px-6 py-20">
          {submitStatus === "success" && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold font-poppins">
                  Message sent successfully!
                </p>
                <p className="text-sm opacity-90">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold font-poppins">
                  Failed to send message
                </p>
                <p className="text-sm opacity-90">
                  Please try again or contact us directly.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-8">
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="block text-gray-900 font-semibold text-sm font-poppins"
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
                    className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl transition-all duration-200 font-poppins focus:outline-none ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#024334] focus:ring-[#024334]/10 focus:bg-white"
                    } focus:ring-4`}
                    placeholder="your.email@example.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-600 text-sm font-poppins flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="subject"
                  className="block text-gray-900 font-semibold text-sm font-poppins"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl transition-all duration-200 font-poppins focus:outline-none ${
                      errors.subject
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#024334] focus:ring-[#024334]/10 focus:bg-white"
                    } focus:ring-4`}
                    placeholder="What's this about?"
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                    aria-invalid={errors.subject ? "true" : "false"}
                  />
                  {errors.subject && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.subject && (
                  <p
                    id="subject-error"
                    className="text-red-600 text-sm font-poppins flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                    </svg>
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="block text-gray-900 font-semibold text-sm font-poppins"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl transition-all duration-200 resize-vertical font-poppins focus:outline-none ${
                      errors.message
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#024334] focus:ring-[#024334]/10 focus:bg-white"
                    } focus:ring-4`}
                    placeholder="Tell us more about your inquiry..."
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <div className="absolute top-4 right-4 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-red-600 text-sm font-poppins flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                    </svg>
                    {errors.message}
                  </p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Minimum 10 characters</span>
                  <span
                    className={`${
                      formData.message.length < 10
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              <div className="text-center pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`group relative overflow-hidden px-12 py-4 rounded-full font-bold text-sm tracking-[0.05em] transition-all duration-300 font-poppins min-w-[200px] focus:outline-none focus:ring-4 focus:ring-[#024334]/30 ${
                    isFormValid && !isSubmitting
                      ? "bg-[#024334] hover:bg-[#08795F] text-white shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* TODO: Link facebook and gmail to the actualy site */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-[#024334] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=theblazer@cmu.edu.ph">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
                <h3 className="font-bold text-[#024334] font-poppins text-lg mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 font-poppins">
                  theblazer@cmu.edu.ph
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-[#024334] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <a href="https://www.facebook.com/share/16ainVEWkA/">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
                <h3 className="font-bold text-[#024334] font-poppins text-lg mb-2">
                  Follow Us
                </h3>
                <p className="text-gray-600 font-poppins">CMU - The Blazer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
