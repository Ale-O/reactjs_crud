import http from "../http-common";

class ElementDataService {
  getAll() {
    return http.get("/elements");
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

  findByTitle(title) {
    return http.get(`/elements?title=${title}`);
  }
}

export default new ElementDataService();