import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineOfficeBuilding, HiOutlineTruck, HiOutlinePencilAlt, HiOutlinePhotograph } from "react-icons/hi";

const ServiceCenterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const payload = new FormData();
    const requestObject = {
      brand: data.brand,
      description: data.description,
      model: data.model,
      requesttype: "service",
      veichletype: data.veichletype,
    };

    payload.append(
      "obj",
      new Blob([JSON.stringify(requestObject)], { type: "application/json" })
    );
    payload.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:8080/requests/addRequest", {
        method: "POST",
        body: payload,
      });
      if (response.ok) {
        alert("Service request submitted successfully!");
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting request.");
    }
  };

  // Preview image before upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-indigo-100 py-10">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT: Info panel */}
        <div className="relative flex flex-col justify-center items-center px-8 py-12 bg-gradient-to-tr from-orange-400 to-orange-600 text-white">
          <div className="mb-6">
            <img src="https://www.pngall.com/wp-content/uploads/8/Service-PNG-Free-Download.png"
              alt="Service" className="w-28 mb-4 drop-shadow-lg" />
            <h1 className="text-4xl font-bold mb-2 drop-shadow">One-Stop Services</h1>
            <div className="text-orange-100/90 text-base leading-relaxed">
              Gaddi Mitra <b>brings reliable auto &amp; home services</b> at your fingertips.<br />
              30+ professionals. Fast, fair, genuine advice.
            </div>
          </div>
          <div className="flex gap-3 mt-6 text-sm">
            <span className="rounded-full bg-white bg-opacity-10 px-3 py-1">⏱️ Fast Support</span>
            <span className="rounded-full bg-white bg-opacity-10 px-3 py-1">⭐ Verified Centers</span>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="py-12 px-8 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Brand */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Brand</label>
              <div className="relative">
                <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-orange-400"/>
                <input
                  type="text"
                  placeholder="Enter car/bike brand"
                  {...register("brand", { required: true })}
                  className={`pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition ${errors.brand ? "border-red-400" : ""}`}
                />
              </div>
              {errors.brand && <span className="text-red-500 text-xs">Brand is required</span>}
            </div>
            {/* Model */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Model</label>
              <div className="relative">
                <HiOutlineTruck className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-orange-400"/>
                <input
                  type="text"
                  placeholder="Model name/number"
                  {...register("model", { required: true })}
                  className={`pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition ${errors.model ? "border-red-400" : ""}`}
                />
              </div>
              {errors.model && <span className="text-red-500 text-xs">Model is required</span>}
            </div>
            {/* Vehicle Type */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Vehicle Type</label>
              <select
                {...register("veichletype", { required: true })}
                className={`py-2 px-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition ${errors.veichletype ? "border-red-400" : ""}`}
              >
                <option value="">Select...</option>
                <option value="2-wheeler">2-Wheeler</option>
                <option value="4-wheeler">4-Wheeler</option>
              </select>
              {errors.veichletype && <span className="text-red-500 text-xs">Please select vehicle type</span>}
            </div>
            {/* Description */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Problem Description</label>
              <div className="relative">
                <HiOutlinePencilAlt className="absolute left-3 top-2.5 text-lg text-orange-400"/>
                <input
                  type="text"
                  placeholder="Describe your issue or requirement"
                  {...register("description", { required: true })}
                  className={`pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition ${errors.description ? "border-red-400" : ""}`}
                />
              </div>
              {errors.description && <span className="text-red-500 text-xs">Description is required</span>}
            </div>
            {/* Image upload */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Problem Photo</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-4 rounded-lg font-medium shadow focus:ring-2 focus:ring-orange-400">
                  <HiOutlinePhotograph className="text-xl" />
                  <span>{imageFile?.name ? imageFile.name : "Attach Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <img src={imagePreview}
                    alt="preview"
                    className="w-14 h-14 object-cover rounded-md border border-gray-200 shadow"
                  />
                )}
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg transform hover:-translate-y-0.5 transition">
              GET CALL BACK
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ServiceCenterForm;
