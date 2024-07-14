import React, { useEffect, useState } from "react";


const User = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events", {
          credentials: "include",
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const joinEvent = (eventName) => {
    alert("You have joined " + eventName + " event!");
  };

  const removeEvent = async (eventId) => {
    try {
      const csrfResponse = await fetch("http://localhost:3001/api/csrf-token", {
        credentials: "include",
      });
      const { csrfToken } = await csrfResponse.json();

      await fetch(`http://localhost:3001/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
      });
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };

  return (
    <section className="bg-blue-900 text-black body-font">
      <div className=" px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              EVENTS AND VENUES
            </h1>
            <div className="h-1 w-20 bg-green-500 rounded"></div>
          </div>
          <p className="lg:w-1/2  leading-relaxed text-white">
            "Join and explore exciting events happening around you. Find the
            best venues and make memories."
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {events.map((event) => (
            <div key={event.id} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src="https://img.freepik.com/premium-vector/disabled-athletes-sport-competition-banner_48369-8019.jpg?ga=GA1.1.873480028.1714200168&semt=ais_user"
                  alt="content"
                />
                <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">
                  EVENT
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {event.name}
                </h2>
                <h3 className="tracking-widest text-stone-900 text-xs font-medium title-font">
                  TIME & VENUE:
                </h3>
                <p className="leading-relaxed text-base">
                  {event.date} - {event.time} - {event.location}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => joinEvent(event.name)}
                    className="text-green-500 inline-flex items-center"
                  >
                    Join
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-red-500 inline-flex items-center"
                  >
                    Remove
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default User;
