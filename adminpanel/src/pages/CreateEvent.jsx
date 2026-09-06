import { useState } from "react";
import { toast } from "sonner";

import {
  Upload,
  CalendarDays,
  ImagePlus,
  FileText,
  Sparkles,
} from "lucide-react";

import { event } from "../services/allService";

const CreateEvent = () => {

  const [form, setForm] = useState({
    type: "",
    name: "",
    description: "",
    image: null,
  });

  
  //audio setting
  const clickSound = new Audio("/sound/click.mp3");

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // Submit Event
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // Create FormData
      const formData = new FormData();

      // Append Image
      formData.append(
        "file",
        form.image
      );

      // Append Event JSON
      formData.append(
        "event",
        JSON.stringify({
          type: form.type,
          name: form.name,
          description: form.description,
        })
      );

      // Call API
      const response = await event(
        formData
      );

      console.log(response);
      clickSound.play();
      toast.success("Event added Successfully");

      // Reset Form
      setForm({
        type: "",
        name: "",
        description: "",
        image: null,
      });

      setPreview(null);

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Create Event"
      );

    } finally {

      setLoading(false);
    }
  };

  // Image Upload
  const handleImageUpload = (e) => {

    const file = e.target.files?.[0];

    if (file) {

      setForm({
        ...form,
        image: file,
      });

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 via-white to-orange-50">

      {/* Header */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-6 h-6" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Create Event
            </h2>

            <p className="text-gray-500 mt-1">
              Create and manage amazing events for IGNITRON.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto">

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 space-y-7"
        >

          {/* Event Type */}
          <div className="space-y-2">

            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-orange-500" />
              Event Type
            </label>

            <select
              required
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
              className="w-full h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            >
              <option value="">
                Select event type...
              </option>

              <option value="sports">
               Sports
              </option>

              <option value="cultural">
                Cultural
              </option>

              <option value="technical">
                Technical
              </option>
            </select>
          </div>

          {/* Event Name */}
          <div className="space-y-2">

            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Event Name
            </label>

            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Enter event name"
              className="w-full h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">

            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              Event Description
            </label>

            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Describe your event..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none transition-all"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">

            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-orange-500" />
              Event Banner
            </label>

            <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-orange-200 rounded-3xl p-10 cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-300">

              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={handleImageUpload}
              />

              {preview ? (
                <div className="w-full">

                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-2xl shadow-md"
                  />

                  <p className="text-center text-sm text-gray-500 mt-4">
                    Click to change image
                  </p>
                </div>

              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-orange-500" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-700">
                    Upload Event Image
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Drag & drop or click to upload
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG supported
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? "Creating Event..."
              : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;