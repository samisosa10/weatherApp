import { LoadingButton } from "@mui/lab"
import { Box, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=6876ff6d134446b3814212144233010&q=`

export function App() {
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    error: false,
    message: "",
  })
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  })

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError({})
    try {
      if (!city.trim()) throw { message: "the city field is required" }

      const response = await fetch(`${API_WEATHER}${city}`)
      const data = await response.json()
      if (data.error) throw { message: data.error.message }

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.icon,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      })
    } catch (error) {
      setError({ error: true, message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack alignItems={"center"} maxWidth="xs" sx={{ m: 2 }}>
      <Typography textAlign="center" mb={2} component={"h1"} variant="h3">
        Weather App
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2 }}
        component={"form"}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          label="City"
          size="small"
          variant="outlined"
          required
          value={city}
          error={error.error}
          helperText={error.message}
          onChange={e => setCity(e.target.value)}
        />

        {weather.city && (
          <Box
            sx={{
              mt: 1,
              display: "grid",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h2">
              {weather.city},{weather.country}
            </Typography>
            <Box
              component={"img"}
              alt={weather.conditionText}
              src={weather.icon}
              sx={{ m: "0 auto" }}
            />
            <Typography variant="h5" component={"h3"}>
              {weather.temp} °C
            </Typography>
            <Typography variant="h6" component={"h4"}>
              {weather.conditionText}
            </Typography>
          </Box>
        )}
        <LoadingButton
          type="submit"
          loading={loading}
          loadingIndicator={"Cargando..."}
          variant="contained"
        >
          Search
        </LoadingButton>
      </Box>
    </Stack>
  )
}
