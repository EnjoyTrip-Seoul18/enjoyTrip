import axios from "axios";

const { VITE_VUE_API_URL, VITE_VUE_AREA_URL } = import.meta.env;

function localAxios(baseURL) {
  const instance = axios.create({ baseURL });
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";

  return instance;
}

function serverAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
  });
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";
  instance.defaults.headers.patch["Content-Type"] = "application/json";
  return instance;
}

function areaAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_AREA_URL,
  });
  return instance;
}

export { localAxios, serverAxios, areaAxios };
