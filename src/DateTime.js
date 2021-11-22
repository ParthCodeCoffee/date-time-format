import React, { useEffect, useLayoutEffect, useState } from "react";

const DateTime = () => {
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [currentTimeZone, setCurrentTimeZone] = useState("Asia/Kolkata");
  const [currentDateFormate, setCurrentDateFormate] = useState(
    "dd/MM/yyyy hh:mm:ss"
  );
  const [currentTime, setCurrentTime] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [currentHour, setCurrentHour] = useState();
  const [currentMinute, setCurrentMinute] = useState();
  const [currentSecond, setCurrentSecond] = useState();

  useEffect(() => {
    const fetchTimezone = async () => {
      const url = "http://worldtimeapi.org/api/timezone";
      const response = await fetch(url);
      const data = await response.json();
      setTimeZoneList(data);
    };

    fetchTimezone();
  }, []);

  const fetchCurrentTime = async () => {
    const url = `http://worldtimeapi.org/api/timezone/${currentTimeZone}`;
    const response = await fetch(url);
    const data = await response.json();

    let date_ob = new Date(data.datetime);

    // adjust 0 before single digit date
    setCurrentDate(("0" + date_ob.getDate()).slice(-2));

    // current month
    setCurrentMonth(("0" + (date_ob.getMonth() + 1)).slice(-2));

    // current year
    setCurrentYear(date_ob.getFullYear());

    // current hours
    setCurrentHour(date_ob.getHours());

    // current minutes
    setCurrentMinute(date_ob.getMinutes());

    // current seconds
    setCurrentSecond(date_ob.getSeconds());
  };

  useEffect(() => {
    fetchCurrentTime();
  }, [currentTimeZone]);

  useLayoutEffect(() => {
    const fetchCurrentDateFormate = () => {
      switch (currentDateFormate) {
        case "dd/MM/yyyy hh:mm:ss":
          return setCurrentTime(
            currentDate +
              "/" +
              currentMonth +
              "/" +
              currentYear +
              " " +
              currentHour +
              ":" +
              currentMinute +
              ":" +
              currentSecond
          );
        case "dd-MM-yyyy hh:mm:ss":
          return setCurrentTime(
            currentDate +
              "-" +
              currentMonth +
              "-" +
              currentYear +
              " " +
              currentHour +
              ":" +
              currentMinute +
              ":" +
              currentSecond
          );
        case "MM dd yyyy HH:MM:SS":
          return setCurrentTime(
            currentMonth +
              " " +
              currentDate +
              " " +
              currentYear +
              " " +
              currentHour +
              ":" +
              currentMinute +
              ":" +
              currentSecond
          );
        case "MM/dd/yyyy HH:MM:SS":
          return setCurrentTime(
            currentMonth +
              "/" +
              currentDate +
              "/" +
              currentYear +
              " " +
              currentHour +
              ":" +
              currentMinute +
              ":" +
              currentSecond
          );
        default:
          return setCurrentTime(
            currentDate +
              "/" +
              currentMonth +
              "/" +
              currentYear +
              " " +
              currentHour +
              ":" +
              currentMinute +
              ":" +
              currentSecond
          );
      }
    };

    fetchCurrentDateFormate();
  }, [currentDateFormate, currentSecond]);

  // setInterval(fetchCurrentTime, 10000);

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
            timeZoneList.map((t, i) => (
              <option key={i} value={t}>
                {t}
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
          onChange={(e) => setCurrentDateFormate(e.target.value)}
          value={currentDateFormate}
          style={{ padding: "5px" }}
        >
          <option value="dd/MM/yyyy hh:mm:ss">dd/MM/yyyy hh:mm:ss</option>
          <option value="dd-MM-yyyy hh:mm:ss">dd-MM-yyyy hh:mm:ss</option>
          <option value="MM dd yyyy HH:MM:SS">MM dd yyyy HH:MM:SS</option>
          <option value="MM/dd/yyyy HH:MM:SS">MM/dd/yyyy HH:MM:SS</option>
        </select>
      </div>
      <br />
      {currentSecond && (
        <div>
          Current Time at
          <strong style={{ color: "#ffffff", margin: "0 7px" }}>
            {currentTimeZone} :
          </strong>
          <strong style={{ color: "#79ff4d" }}>{currentTime}</strong>
        </div>
      )}
    </>
  );
};

export default DateTime;
