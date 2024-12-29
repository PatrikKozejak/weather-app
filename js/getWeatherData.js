export async function getWeatherData(handleError, location) {
  const VISUAL_CROSSING_FREE_API_KEY = "S9BSPW39W5QG2E3W3JSHUKZM8";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&iconSet=icons1&key=${VISUAL_CROSSING_FREE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          `Unable to retrieve data for the entered location, please try another location (Response status: ${response.status})`
        );
      } else if (response.status === 401) {
        throw new Error(
          `Unable to retrieve data due to invalid token (Response status: ${response.status})`
        );
      }
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    handleError(error);
  }
}
