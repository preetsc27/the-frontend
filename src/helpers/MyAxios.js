import Axios from "axios";

class MyAxios{
    static get(url, data) {
        return new Promise((resolve, reject) => {
            const headers = {
                "token": localStorage.getItem("token")
            }
            Axios.get(url, data, {headers})
              .then(res => {
                  resolve(res)
              })
              .catch(err => {
                  reject(err)
              })
        }) 
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            const headers = {
                "token": localStorage.getItem("token")
            }
            Axios.post(url, data, {headers})
              .then(res => {
                  resolve(res)
              })
              .catch(err => {
                  reject(err)
              })
        }) 
    }

}

export default MyAxios