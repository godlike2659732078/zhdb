import axios from "axios";
// let url = "http://192.168.10.184:8089";
let url="https://api.wgio.net"
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: url
    });
    instance(config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        return false;
      });
  });
}
