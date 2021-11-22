import React, { useEffect, useState } from "react";

const DateTimeOld = () => {
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [currentTimeZone, setCurrentTimeZone] = useState("Asia/Kolkata");
  const [currentTime, setCurrentTime] = useState();
  const [timeFormat, setTimeFormat] = useState("dd/MM/yyyy hh:mm");

  useEffect(() => {
    const fetchTimezone = async () => {
      const url = "http://worldtimeapi.org/api/timezone";
      const response = await fetch(url);
      const data = await response.json();
      setTimeZoneList(data);
    };

    fetchTimezone();
  }, []);

  useEffect(() => {
    const fetchCurrentTime = async () => {
      const url = `http://worldtimeapi.org/api/timezone/${currentTimeZone}`;
      const response = await fetch(url);
      const data = await response.json();
      setCurrentTime(data.datetime);
    };
    fetchCurrentTime();
  }, [currentTimeZone]);

  // setInterval(fetchCurrentTime, 5000);

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <label
          htmlFor="timeZoneList"
          style={{ lineHeight: "1", margin: " 0 10px 0 0" }}
        >
          <h6 style={{ margin: "0" }}>Choose a TimeZone:</h6>
        </label>
        <select
          name="timeZoneList"
          id="timeZoneList"
          onChange={(e) => setCurrentTimeZone(e.target.value)}
          value={currentTimeZone}
          style={{ padding: "5px" }}
        >
          {timeZoneList &&
            timeZoneList.map((timeZone, i) => (
              <option key={i} value={timeZone}>
                {timeZone}
              </option>
            ))}
        </select>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}
      >
        <label
          htmlFor="dateTimeFormat"
          style={{ lineHeight: "1", margin: " 0 10px 0 0" }}
        >
          <h6 style={{ margin: "0" }}>Select Date Time Format:</h6>
        </label>
        <select
          name="dateTimeFormat"
          id="dateTimeFormat"
          style={{ padding: "5px" }}
          value={timeFormat}
          onChange={(event) => setTimeFormat(event.target.value)}
        >
          <option value="dd/MM/yyyy hh:mm">dd/MM/yyyy hh:mm</option>
          <option value="dd-MM-yyyy hh:mm">dd-MM-yyyy hh:mm</option>
          <option value="MM dd yyyy HH:MM">MM dd yyyy HH:MM</option>
          <option value="MM/dd/yyyy HH:MM:SS">MM/dd/yyyy HH:MM:SS</option>
        </select>
      </div>

      <p>
        <strong>{currentTimeZone} : </strong>
        <strong style={{ color: "#79ff4d" }}>{currentTime} : </strong>
        <strong>{timeFormat}</strong>
      </p>
    </>
  );
};

export default DateTimeOld;
