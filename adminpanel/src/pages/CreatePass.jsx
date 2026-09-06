import { useEffect, useState } from "react";
import {Pencil, Trash2, Ticket, Sparkles,} from "lucide-react";
import {createpass,getpass, deletepass,} from "../services/allService";
import { toast } from "sonner";

const CreatePass = () => {
  const [form, setForm] = useState({
    type: "",
    price: "",
    maxevents: "",
  });

  const [passes, setPasses] = useState([]);

  // Fetch Passes
  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const data = await getpass();

      console.log(data);

      setPasses(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load passes");
    }
  };

  //set click sound
  const clickSound = new Audio("/sound/click.mp3");

  // Create Pass
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createpass(form);

      console.log(response);
      
      toast.success(
        "Pass created successfully"
      );
 clickSound.play();
      // Clear Form
      setForm({
        type: "",
        price: "",
        maxevents: "",
      });

      // Refresh Table
      fetchPasses();
    } catch (error) {
      console.log(error);

      toast.error("Failed to create pass");
    }
  };

  // Delete Pass
  const handleDelete = async (passid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pass?"
    );

    if (!confirmDelete) return;

    try {
      await deletepass(passid);

      setPasses(
        passes.filter(
          (pass) => pass.id !== passid
        )
      );

      toast.success(
        "Pass deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete pass");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 right-0 w-40 h-40 rounded-full bg-white" />

          <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-white" />
        </div>

        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-extrabold">
              Create Event Pass
            </h2>

            <p className="mt-3 text-white/80">
              Manage premium event passes
              for students and participants.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-yellow-300" />
            </div>

            <div>
              <p className="text-sm text-white/70">
                Total Passes
              </p>

              <h3 className="text-3xl font-bold">
                {passes.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Pass Information
            </h3>

            <p className="text-sm text-gray-500">
              Fill all required details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pass Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Pass Type
            </label>

            <input
            required
              type="number"
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
              placeholder="500"
              className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Pass Price
            </label>

            <input
            required
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              placeholder="500"
              className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Max Events */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Max Events Allowed
          </label>

          <input
          required
            type="number"
            value={form.maxevents}
            onChange={(e) =>
              setForm({
                ...form,
                maxevents: e.target.value,
              })
            }
            placeholder="5"
            className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white font-semibold shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
        >
          Create Pass
        </button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Existing Passes
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              All created event passes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                  Pass Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                  Max Events
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {passes.map((pass) => (
                <tr
                  key={pass.id}
                  className="border-t border-gray-100 hover:bg-blue-50/40 transition-all"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-blue-600" />
                      </div>

                      <span className="font-semibold text-gray-800">
                        {pass.type}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-medium text-gray-700">
                    ₹ {pass.price}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {pass.maxevents}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleDelete(pass.id)
                        }
                        className="w-10 h-10 rounded-xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {passes.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto flex items-center justify-center shadow-lg">
                <Ticket className="w-10 h-10 text-white" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                No Passes Found
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first event pass.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePass;