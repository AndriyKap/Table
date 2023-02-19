import React, { useState } from "react";
import "./WeekSchedule.css";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialEvents = [
  { id: 1, day: "Monday", time: "09:00", duration: 2, title: "Meeting with John" },
  { id: 2, day: "Tuesday", time: "11:00", duration: 1, title: "Lunch with Jane" },
  { id: 3, day: "Friday", time: "14:00", duration: 3, title: "Presentation for team" },
];

function WeekSchedule() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ day: "", time: "", duration: "", title: "" });
  const [showForm, setShowForm] = useState(false);

  const handleNewEventChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleNewEventSubmit = (event) => {
    event.preventDefault();
    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
    const newEventWithId = { ...newEvent, id: newId };
    setEvents((prevEvents) => [...prevEvents, newEventWithId]);
    setNewEvent({ day: "", time: "", duration: "", title: "" });
    setShowForm(false);
  };

  const handleTableClick = (event) => {
    const clickedCell = event.target;
    const day = clickedCell.dataset.day;
    const time = clickedCell.dataset.time;
    if (day && time) {
      setNewEvent({ day, time, duration: "", title: "" });
      setShowForm(true);
    }
  };

  return (
    <div className="week-schedule">
      <table onClick={handleTableClick}>
        <thead>
          <tr>
            <th></th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 24 }).map((_, i) => {
            const time = `${i.toString().padStart(2, "0")}:00`;
            return (
              <tr key={time}>
                <td>{time}</td>
                {daysOfWeek.map((day) => {
                  const event = events.find((e) => e.day === day && e.time === time);
                  const rowSpan = event?.duration ?? 1;
                  return (
                    <td
                      key={`${day}-${time}`}
                      data-day={day}
                      data-time={time}
                      rowSpan={rowSpan}
                      className={event ? "event" : ""}
                    >
                      {event && <div>{event.title}</div>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showForm && (
        <form onSubmit={handleNewEventSubmit}>
          <label>
            Day:
            <select name="day" value={newEvent.day} onChange={handleNewEventChange}>
              <option value="">--Select day--</option>
              {daysOfWeek.map((day) => (
                 <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
        <label>
          Time:
          <input type="time" name="time" value={newEvent.time} onChange={handleNewEventChange} />
        </label>
        <label>
          Duration:
          <select name="duration" value={newEvent.duration} onChange={handleNewEventChange}>
            <option value="">--Select duration--</option>
            <option value={1}>1 hour</option>
            <option value={2}>2 hours</option>
            <option value={3}>3 hours</option>
            <option value={4}>4 hours</option>
            <option value={5}>5 hours</option>
            <option value={6}>6 hours</option>
            <option value={7}>7 hours</option>
            <option value={8}>8 hours</option>
          </select>
        </label>
        <label>
          Title:
          <input type="text" name="title" value={newEvent.title} onChange={handleNewEventChange} />
        </label>
        <button type="submit">Add event</button>
      </form>
    )}
  </div>
  );
  }
  
  export default WeekSchedule;