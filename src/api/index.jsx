import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-key": dc84d53f85mshb0349652b0a64d2p1b0e90jsnd1b4c8d65f56,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

//dc84d53f85mshb0349652b0a64d2p1b0e90jsnd1b4c8d65f56
//885b72e914mshff2b6499d53d1b0p147ef1jsne396d1e1b04f
