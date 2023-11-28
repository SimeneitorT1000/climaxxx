
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherDetail from "./components/WeatherDetail";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");  // Estado para la ciudad
  const [isCelsius, setIsCelsius] = useState(true);

  // Función para obtener el clima por nombre de ciudad
  const fetchWeatherByCity = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fcc7032cd384df1a6a7e286ca7da527&lang=es&units=metric`
      )
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err));
  };

  // Función para obtener el clima por coordenadas geográficas
  const fetchWeatherByCoords = (latitude, longitude) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9fcc7032cd384df1a6a7e286ca7da527&lang=es&units=metric`
      )
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err));
  };

  // Función para obtener la ubicación actual del usuario
  const success = (pos) => {
    const { latitude, longitude } = pos.coords;
    fetchWeatherByCoords(latitude, longitude);
  };

  // Usar useEffect para obtener la ubicación al cargar la página
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // Manejar el cambio en el campo de entrada
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Manejar la búsqueda cuando se presiona Enter
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherByCity();
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const weatherIcon = weather?.weather?.[0]?.icon || 'default';
  const bgImages = {
    "01d": "bg-[url('https://i.pinimg.com/originals/58/08/ed/5808edecd832d47e5dde44bb93046f0f.jpg')]",
    "02d": "bg-[url('https://www.theimagen.com/wp-content/uploads/2020/03/foto-braulio-paisaje-recuerdo.jpg')]",
    "03d": "bg-[url('https://extradigital.com.do/wp-content/uploads/2023/01/como_se_forman_las_nubes_y_sus_tipos_1330_600_thumb_620.jpg')]",
    "04d": "bg-[url(https://live.staticflickr.com/3562/3396514056_2454ffabed_b.jpg)]",
    "09d": "bg-[url(https://netobera.com.ar/wp-content/uploads/2019/02/Lluvia_t750x550-660x400@2x.jpg)]",
    "10d": "bg-[url(https://www.prensalibre.com/wp-content/uploads/2019/06/water-2630618_960_720.jpg?quality=52&w=760&h=430&crop=1)]",
    "11d": "bg-[url(https://www.nationalgeographic.com.es/medio/2023/09/06/tormentas-electrticas_1c4246d5_1036655058_230906095645_1280x853.jpg)]",
    "13d": "bg-[url(https://img.freepik.com/fotos-premium/dia-nieve-parque-hermoso-parque-blanco-nevando-parque_73741-126.jpg)]",
    "50d": "bg-[url(https://www.lavozdelsur.es/uploads/s1/72/59/01/niebla-matinal-13.jpeg)]",
    "01n": "bg-[url(https://th.bing.com/th/id/R.bb664327d07a086665fadbaf2957d7b9?rik=2HOPbk0GywiOuA&riu=http%3a%2f%2fdata.1freewallpapers.com%2fdownload%2fstarry-sky-night-trees-night-landscape.jpg&ehk=xHm6mCn977q5cPlRjPtXxuEiGXMWiiQ%2fjnWQNirBFmE%3d&risl=1&pid=ImgRaw&r=0)]",
    "02n": "bg-[url(https://www.meteorologiaenred.com/wp-content/uploads/2017/10/noche.jpg)]",
    "03n": "bg-[url(https://p4.wallpaperbetter.com/wallpaper/986/913/108/the-sky-moonlight-sky-moonlight-wallpaper-preview.jpg)]",
    "04n": "bg-[url(https://img.freepik.com/fotos-premium/atardecer-cielo-noche-espectacular-nube-luz-solar_38812-284.jpg?size=626&ext=jpg)]",
    "09n": "bg-[url(https://st2.depositphotos.com/1823521/5669/i/450/depositphotos_56698533-stock-photo-rainy-day.jpg)]",
    "10n": "bg-[url(https://revistabarlovento.com/wp-content/uploads/2023/04/depositphotos_85062730-stock-photo-charles-bridge-at-rainy-night.webp)]",
    "11n": "bg-[url(https://static.nationalgeographic.es/files/styles/image_3200/public/20843_0.jpg?w=1190&h=668)]",
    "13n": "bg-[url(https://cdn.pixabay.com/photo/2016/12/17/15/03/winter-1913635_1280.jpg)]",
    "50n": "bg-[url(https://spanish.xinhuanet.com/2017-01/04/135952560_14834939538181n.jpg)]",
    
    
  };


  const backgroundImage = bgImages[weatherIcon] || 'bg-default';

  return (
    <main className={`flex flex-col justify-center items-center h-screen bg-black text-white bg-cover shadow-lg border border-gray-700 ${backgroundImage}`}>
      {/* Campo de entrada para la búsqueda de ciudad */}
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleSearch}
          placeholder="Ingrese una ciudad"
          className="p-2 border border-gray-300 rounded text-blue-600"
        />
      </div>

      {weather ? (
        <WeatherDetail
          weather={weather}
          isCelsius={isCelsius}
          toggleTemperatureUnit={toggleTemperatureUnit}
        />
      ) : (
        <span className="text-xl">Cargando el clima...</span>
      )}
    </main>
  );
}

export default App;