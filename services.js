import axios from "axios";

const baseURL = "https://livetag-backend.osc-fr1.scalingo.io/";
const base = axios.create({ baseURL });

const services = {
  getEventByCode(code) {
    console.log("==========>", code);
    return base.get(`/mobile/${code}`).then((res) => res.data);
  },

  checkEntry() {
    console.log("==========>checkentry", data);
  },
};

export default services;
