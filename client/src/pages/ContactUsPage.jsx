import React, { useState } from "react";
import contact from "../assets/contact.jpg";
import { toast, Toaster } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    otherIssue: "",
    address: "",
    message: "",
    preferredContact: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form validation checker
  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.issueType.trim() &&
    formData.address.trim() &&
    formData.message.trim() &&
    formData.consent &&
    (formData.issueType !== "Other" || formData.otherIssue.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact/createReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Submission failed");
        return;
      }

      toast.success("Form submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        issueType: "",
        otherIssue: "",
        address: "",
        message: "",
        preferredContact: "",
        consent: false,
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 relative">
      <Toaster richColors position="top-center" expand={true} />
      {/* HERO */}
      <section className="relative py-28 overflow-hidden">
        <img
          src={contact}
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
            We are here to listen and assist you with your concerns.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={contact}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-white/90"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* ISSUE TYPE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Issue Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Select an issue</option>
                  <option value="Water Supply Issues">
                    Water Supply Issues
                  </option>
                  <option value="Electricity Problems">
                    Electricity Problems
                  </option>
                  <option value="Road Conditions">Road Conditions</option>
                  <option value="Public Safety Concerns">
                    Public Safety Concerns
                  </option>
                  <option value="Waste Management Issues">
                    Waste Management Issues
                  </option>
                  <option value="Environmental Concerns">
                    Environmental Concerns
                  </option>
                  <option value="Health Services">Health Services</option>
                  <option value="Education Issues">Education Issues</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* OTHER ISSUE */}
              {formData.issueType === "Other" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="otherIssue"
                    value={formData.otherIssue}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              )}

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {/* PREFERRED CONTACT */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Method of Contact
                </label>
                <div className="flex gap-4 text-sm">
                  {["Email", "Phone Call", "SMS"].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {/* CONSENT */}
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <p>I consent to the collection and use of my information.</p>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  !isFormValid || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* LOADING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-xl shadow-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm font-medium">Submitting your report...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
