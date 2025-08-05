// src/pages/ContactSupport.jsx
import { useState } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to a support/contact endpoint
    console.log("Form submitted:", formData);
    alert("Thank you for your message! Our support team will get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Support Center</h1>
          <p className="text-lg text-gray-600 mt-2">
            We're here to help. Find answers or get in touch with our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">How do I request a service?</h3>
                <p className="text-gray-600 mt-1">
                  Navigate to your Dashboard, click on "Request Service" under Quick Actions, and fill out the form with your vehicle details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">How do I view quotations?</h3>
                <p className="text-gray-600 mt-1">
                  You will receive a notification when a dealer or service center sends a quotation. You can view it in your notifications panel or on the request details page.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Can I update my profile information?</h3>
                <p className="text-gray-600 mt-1">
                  Yes, you can click on your profile icon in the header and select "Profile" from the dropdown to view and edit your details.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}