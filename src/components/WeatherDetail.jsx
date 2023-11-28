function WeatherDetail({ weather, isCelsius, toggleTemperatureUnit }) {
  const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

  const displayTemperature = isCelsius ? weather.main.temp : celsiusToFahrenheit(weather.main.temp);

  return (
    <article className="text-center grid gap-4">
      <h3>{weather.name}, {weather.sys.country}</h3>
      <section className="bg-white/50 p-4 rounded-xl shadow-md grid lg:grid-cols-2 items-center">
        <h3 className="col-span-2 text-2xl">{weather.weather[0].description}</h3>
        <span className="text-4xl">{displayTemperature.toFixed(1)}°{isCelsius ? 'C' : 'F'}</span>
        <div>
          <img className="block mx-auto" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
        </div>
      </section>
      <section className="p-4 rounded-xl grid grid-cols-3 justify-items-center bg-white/50 shadow-md">
        <div className="flex gap-2 items-center">
          <img src="/wind.svg" alt="Wind Icon" className="w-6 h-6" />
          <span>{weather.wind.speed}m/s</span>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/humidity.svg" alt="Humidity Icon" className="w-6 h-6" />
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/pressure.svg" alt="Pressure Icon" className="w-6 h-6" />
          <span>{weather.main.pressure}hPa</span>
        </div>
      </section>
      <button
        onClick={toggleTemperatureUnit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Cambiar {isCelsius ? 'a °F' : 'a °C'}
      </button>
    </article>
  );
}

export default WeatherDetail;