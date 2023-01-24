import http from "../http-common";

class ElementDataService {
  getAll() {
    return http.get("/elements");
  }

  getAllActivated() {
    return http.get("/elements/activated");
  }

  get(id) {
    return http.get(`/elements/${id}`);
  }

  create(data) {
    return http.post("/elements", data);
  }

  update(id, data) {
    return http.put(`/elements/${id}`, data);
  }

  delete(id) {
    return http.delete(`/elements/${id}`);
  }

  deleteAll() {
    return http.delete(`/elements`);
  }

  findByUsername(username) {
    return http.get(`/elements?username=${username}`);
  }
}

export default new ElementDataService();