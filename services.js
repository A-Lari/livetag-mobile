import axios from "axios";

const baseURL = "https://livetag-backend.osc-fr1.scalingo.io/";
const base = axios.create({ baseURL });

const services = {
  getEventByCode(code) {
    return base.get(`/mobile/events/${code}`).then((res) => res.data);
  },

  getParticipantById(idParticipant) {
    return base
      .get(`/mobile/participants/${idParticipant}`)
      .then((res) => res.data);
  },
};

export default services;
