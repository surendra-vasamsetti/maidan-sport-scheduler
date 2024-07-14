import React, { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfResponse = await fetch("http://localhost:3001/api/csrf-token", {
        credentials: "include",
      });
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch("http://localhost:3001/api/schedule/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify(eventData),
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setMessage("Event created successfully");
        setEventData({ name: "", date: "", time: "", location: "" });
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Error creating event");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 via-blue-900  min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Create Sports Schedule
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Schedule
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-green-500">{message}</p>
        )}
      </section>
    </div>
  );
};

export default Admin;
