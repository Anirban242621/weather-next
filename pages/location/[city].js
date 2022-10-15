import moment from "moment-timezone";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import HourlyWeather from "../../components/HourlyWeather";
import SearchBox from "../../components/SearchBox";
import TodaysWeather from "../../components/TodaysWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import cities from "../../lib/city.list.json";

// import "../../styles/main.scss";

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  if (!city) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&exclude=minutely&appid=4e45f3423e3b9cedc967bca25cc407c0`
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  //   console.log(data);
  //   console.log(process.env.API_KEY);
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
    },
  };
}

const getCity = (param) => {
  const cityParam = param.trim();
  //get the id of the city
  const splitCity = cityParam.split("-");
  //   console.log(splitCity)
  const id = splitCity[splitCity.length - 1];
  if (!id) {
    return null;
  }
  const city = cities.find((city) => city.id.toString() == id);
  if (city) {
    return city;
  } else {
    return null;
  }
};
const getHourlyWeather = (hourlyData, timezone) => {
  // const current = new Date();
  // current.setHours(current.getHours(), 0, 0, 0);
  // const tomorrow = new Date(current);
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // tomorrow.setHours(0, 0, 0, 0);
  //divide by 1000 to get timestamps in seconds instead of milliseconds
  // const currentTimeStamp = Math.floor(current.getTime() / 1000);
  // const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);
  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
  return todaysData;
};
export default function City({
  hourlyWeather,
  city,
  currentWeather,
  dailyWeather,
  timezone,
}) {
  // console.log(currentWeather);
  return (
    <div>
      <Head>
        <title>{city.name} - Weather - Anirban K Majumdar</title>
      </Head>
      <div>
        <div className="container">
          <br />
          <Link href="/">
            <a
              className="black-link"
              style={{ color: "#05445E", fontSize: "22px" }}
            >
              &larr;HOME
            </a>
          </Link>
          <br />
          <SearchBox placeholder="Search for another location.. " />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
}
