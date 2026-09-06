import { useEffect, useState } from "react";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

import { registeredStd } from "../services/allService";

import { toast } from "sonner";

const RegisteredStudents = () => {

  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  useEffect(() => {

    fetchStudents();

  }, []);

  // Fetch Students
  const fetchStudents = async () => {

    try {

      setLoading(true);

      const data = await registeredStd();

      console.log(data);

      setStudents(data || []);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch students"
      );

    } finally {

      setLoading(false);
    }
  };

  // Search Filter
  const filtered = students.filter(
    (s) =>

      s?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      s?.regdNo
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents =
    filtered.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );

  const totalPages = Math.ceil(
    filtered.length / studentsPerPage
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-2xl">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -top-10 right-0 w-40 h-40 rounded-full bg-white" />

          <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-white" />

        </div>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h2 className="text-4xl font-extrabold">
              Registered Students
            </h2>

            <p className="text-white/80 mt-3">
              View all registered students
              with attendance details.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

              <GraduationCap className="w-7 h-7 text-yellow-300" />

            </div>

            <div>

              <p className="text-sm text-white/70">
                Total Students
              </p>

              <h3 className="text-3xl font-bold">
                {students.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setCurrentPage(1);
          }}
          placeholder="Search by name or Regd No..."
          className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Regd No
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Degree
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Department
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Year
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Phone
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Attendance
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-10 text-gray-500"
                  >
                    Loading students...
                  </td>

                </tr>

              ) : currentStudents.length > 0 ? (

                currentStudents.map((s, index) => (

                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-indigo-50/40 transition-all"
                  >

                    {/* Name */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold">

                          {s?.name
                            ? s.name.charAt(0).toUpperCase()
                            : "S"}

                        </div>

                        <span className="font-semibold text-gray-800">
                          {s?.name || "Not Updated"}
                        </span>
                      </div>
                    </td>

                    {/* Regd No */}
                    <td className="px-6 py-5 text-gray-600">
                      {s?.regdNo || "N/A"}
                    </td>

                    {/* Degree */}
                    <td className="px-6 py-5 text-gray-700">
                      {s?.degree || "N/A"}
                    </td>

                    {/* Department */}
                    <td className="px-6 py-5 text-gray-700">
                      {s?.department || "N/A"}
                    </td>

                    {/* Year */}
                    <td className="px-6 py-5 text-gray-600">
                      {s?.year || "N/A"}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-5 text-gray-600">
                      {s?.phno || "N/A"}
                    </td>

                    {/* Attendance */}
                    <td className="px-6 py-5">

                      <span
                        className={`font-bold ${
                          s?.attendancePercentage >= 50
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {s?.attendancePercentage ?? 0}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          s?.attendancePercentage >= 50
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {s?.attendancePercentage >= 50
                          ? "Eligible"
                          : "Low Attendance"}
                      </span>
                    </td>
                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">

                        <GraduationCap className="w-10 h-10 text-white" />

                      </div>

                      <h3 className="mt-6 text-2xl font-bold text-gray-800">
                        No Students Found
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Students will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing {currentStudents.length} of {filtered.length} students
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-2">

            {/* Prev */}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev > 1 ? prev - 1 : 1
                )
              }
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            >

              <ChevronLeft className="w-4 h-4" />

            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`w-9 h-9 rounded-xl text-sm font-semibold flex items-center justify-center transition-all ${
                    currentPage === index + 1
                      ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < totalPages
                    ? prev + 1
                    : totalPages
                )
              }
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            >

              <ChevronRight className="w-4 h-4" />

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredStudents;