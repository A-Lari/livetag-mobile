import axios from "axios";

const baseURL = "http://localhost:3001";
const base = axios.create({ baseURL });

const services = {
  getEventByCode(code) {
    console.log("==========>", code);
    return base.get(`/mobile/${code}`).then((res) => res.data);
  },
};

export default services;
