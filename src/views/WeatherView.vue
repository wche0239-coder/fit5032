<template>
  <div class="container mt-5">
    <h1>Weather Check</h1>

    <!-- Search bar: city input + Search button -->
    <div class="d-flex gap-2 mt-3">
      <input
        type="text"
        class="form-control"
        v-model="city"
        placeholder="Enter city name"
        @keyup.enter="searchByCity"
      />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
    </div>

    <!--The <main> tag in HTML is used to specify the main content of a document
    More info about main, check https://www.w3schools.com/tags/tag_main.asp-->
    <main class="mt-4">
      <!--If there are no data returned, then skip rendering the information-->
      <div v-if="weatherData">
        <!--Display the weather data attribute returned from API
        Example of API data: https://openweathermap.org/current-->
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <!--The image source of the weather icon comes from the computed iconUrl-->
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <!-- weather[0] means the current weather -->
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// API key is read from the .env file (VITE_OPENWEATHER_API_KEY)
const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY

// Reactive state
const city = ref('')
const weatherData = ref(null)

// Computed properties
const temperature = computed(() => {
  return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/payload/api/media/file/${weatherData.value.weather[0].icon}.png`
    : null
})

// Methods
const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      await fetchWeatherData(url)
    })
  }
}

// Search weather by the city name typed into the text field

const searchByCity = async () => {
  if (!city.value.trim()) return
  const query = city.value.trim().replace(/\s*,\s*/g, ',')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apikey}`
  await fetchWeatherData(url)
}
// Lifecycle hook: load weather for current location when page opens
onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>
