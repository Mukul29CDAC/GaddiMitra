import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { useNavigate } from "react-router-dom";

const ServiceCenterForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(true);

  // 🟢 Fetch all service centers on component mount
  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        setLoadingCenters(true);
        const response = await axios.get("http://localhost:8080/servicecenter/allcenters");
        setServiceCenters(response.data);
      } catch (error) {
        console.error("Error fetching service centers:", error);
      } finally {
        setLoadingCenters(false);
      }
    };

    fetchServiceCenters();
  }, []);

  const centersdetails = (center) =>{
    navigate("/servicenter/details",{state:{center}},);
  } 

  // 🟢 Handle form submission
  const onSubmit = async (data) => {
    const payload = new FormData();

    const requestObject = {
      brand: data.brand,
      description: data.description,
      model: data.model,
      requesttype: "service",
      veichletype: data.veichletype,
    };

    payload.append("obj", new Blob([JSON.stringify(requestObject)], { type: "application/json" }));
    payload.append("image", imageFile);

    try {
      const response = await axios.post("http://localhost:8080/requests/addRequest", payload);
      if (response.status === 200) {
        alert("✅ Service request submitted successfully!");
        reset();
        setImageFile(null);
      } else {
        alert("❌ Failed to submit request.");
      }
    } catch (error) {
      alert("❗ Error submitting request.");
    }
  };

  // 🟢 Helper: Show preview of selected image
  const imagePreviewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <>
      <Header />

      <section className="flex flex-col md:flex-row gap-12 bg-gradient-to-br from-orange-50 via-white to-slate-100 p-8 rounded-2xl shadow-xl mx-auto max-w-[1100px] mt-10">
        {/* LEFT SIDE TEXT */}
        <div className="flex flex-col md:items-center md:justify-center text-left md:text-center gap-6 flex-1">
          <h1 className="text-4xl font-black text-orange-600 drop-shadow mb-2">Best Home Services</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-semibold">Gaddi Mitra</span> strives to become India’s most reliable one-stop platform for home services. <br />
            <span className="text-orange-500">30+ home services</span> are already available through our handpicked professionals!
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white shadow-2xl border border-slate-100 rounded-2xl p-8 w-full max-w-lg mx-auto flex-1">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Book Best Services</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Brand */}
            <div>
              <input
                type="text"
                autoComplete="off"
                placeholder="Brand*"
                {...register("brand", { required: true })}
                className={`input-field ${errors.brand ? "ring ring-red-400" : ""}`}
              />
              {errors.brand && <span className="input-error">Brand is required</span>}
            </div>

            {/* Model */}
            <div>
              <input
                type="text"
                placeholder="Model*"
                {...register("model", { required: true })}
                className={`input-field ${errors.model ? "ring ring-red-400" : ""}`}
              />
              {errors.model && <span className="input-error">Model is required</span>}
            </div>

            {/* Vehicle Type */}
            <div>
              <select
                {...register("veichletype", { required: true })}
                className={`input-field ${errors.veichletype ? "ring ring-red-400" : ""}`}
              >
                <option value="">Select Vehicle Type*</option>
                <option value="2-wheeler">2-Wheeler</option>
                <option value="4-wheeler">4-Wheeler</option>
              </select>
              {errors.veichletype && <span className="input-error">Vehicle type is required</span>}
            </div>

            {/* Description */}
            <div>
              <textarea
                rows={3}
                placeholder="Describe the issue or requirement*"
                {...register("description", { required: true })}
                className={`input-field resize-none ${errors.description ? "ring ring-red-400" : ""}`}
              />
              {errors.description && <span className="input-error">Description is required</span>}
            </div>

            {/* Image Upload (custom style) */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Upload image*</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="file-input"
                  id="image-upload"
                  style={{ background: 'none' }}
                />
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded shadow ring-1 ring-orange-200"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg text-white w-full py-3 rounded-lg font-bold tracking-wide text-lg focus:outline-none active:scale-95"
            >
              {isSubmitting ? "Submitting..." : "GET CALL BACK"}
            </button>
          </form>
        </div>
      </section>

      {/* SERVICE CENTER CARDS */}
      <div className="p-8 mx-auto max-w-[1200px] mt-12 mb-20">
        <h2 className="text-3xl font-extrabold mb-8 text-orange-700 text-center tracking-tight">Available Service Centers</h2>
        {loadingCenters ? (
          <div className="flex justify-center py-12 text-gray-600 animate-pulse">
            <span className="loader mr-2" /> Loading service centers...
          </div>
        ) : serviceCenters.length === 0 ? (
          <p className="text-center text-gray-500">No service centers found yet. Please check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCenters.map((center, index) => (
              <div
                key={index}
                onClick={()=>centersdetails(center)}
                className="bg-white border border-slate-200 shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform p-6 rounded-2xl flex flex-col gap-1 group"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-orange-600">{center.name}</h3>
                <div className="text-gray-700 text-sm mb-2">{center.address}</div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="font-semibold">Phone:</span> {center.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="font-semibold">Email:</span> {center.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Tailwind custom style overrides for inputs */}
      <style>{`
        .input-field {
          border: 1.5px solid #f3f4f6;
          padding: 0.75rem 1rem;
          border-radius: 0.7rem;
          width: 100%;
          font-size: 1.05rem;
          background: #f9fafb;
          transition: border 0.2s, box-shadow 0.2s;
          box-shadow: 0px 1px 4px #f3f4f6;
        }
        .input-field:focus {
          border-color: #fdba74;
          outline: none;
          background: #fff7ed;
        }
        .input-error {
          color: #f87171;
          font-size: 0.89rem;
          margin-top: 0.16rem;
          display: block;
        }
        .file-input {
          border: none;
          padding: 0;
          background: none;
        }
        .loader {
          width: 1.5rem;
          height: 1.5rem;
          border: 3px solid #f8b26a;
          border-top: 3px solid transparent;
          border-radius: 50%;
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default ServiceCenterForm;
