import { useEffect, useState } from "react";

import {
  Trash2,
  Eye,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import {
  getAllEvents,
  deleteEvent,
} from "../services/allService";

import { toast } from "sonner";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  // audio setting
  const clickSound = new Audio("/sound/click.mp3");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();

      console.log(data);

      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(eventId);

      setEvents(
        events.filter(
          (event) => event.id !== eventId
        )
      );

      clickSound.play();

      toast.success(
        "Event deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    }
  };

 return (
  <div className="space-y-8">
    
    {/* Header */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-2xl">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
        <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-white" />
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            Manage Events
          </h2>

          <p className="text-white/80 mt-3 text-sm md:text-base">
            Organize, monitor and manage all Ignitron events beautifully.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-lg">
          
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-yellow-300" />
          </div>

          <div>
            <p className="text-sm text-white/70">
              Total Events
            </p>

            <h3 className="text-3xl font-bold">
              {events.length}
            </h3>
          </div>
        </div>
      </div>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
      
      {events.map((event) => (
        
        <div
          key={event.id}
          className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          
          {/* Image */}
          <div className="relative overflow-hidden">
            
            <img
              src={event.eventImage}
              alt={event.name}
              className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-xs font-semibold shadow-lg">
                {event.type}
              </span>
            </div>

            {/* Floating Buttons */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            
            <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-blue-500 transition-all flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </button>

          </div>

            {/* Bottom Text */}
            <div className="absolute bottom-0 left-0 w-full p-5 text-white">
              
              <h3 className="text-2xl font-bold">
                {event.name}
              </h3>

              <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
                <CalendarDays className="w-4 h-4" />
                <span>Ignitron Event</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {event.description}
            </p>

           {/* Bottom Action */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                <span className="text-xs text-gray-500 font-medium">
                  Active Event
                </span>
              </div>

              <button
                onClick={() =>
                  handleDelete(event.id)
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium shadow-lg hover:scale-105 hover:shadow-red-300 transition-all duration-300 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {events.length === 0 && (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-20 text-center shadow-sm">
        
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-gray-800">
          No Events Found
        </h3>

        <p className="text-gray-500 mt-2">
          Create your first event and it will appear here.
        </p>
      </div>
    )}
  </div>
);
};

export default ManageEvents;