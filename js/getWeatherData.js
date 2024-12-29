export async function getWeatherData(handleError, location) {
  const VISUAL_CROSSING_API_KEY = "";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&iconSet=icons1&key=${VISUAL_CROSSING_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    handleError();
  }
}
