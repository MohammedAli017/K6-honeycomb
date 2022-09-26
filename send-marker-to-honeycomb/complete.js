const axios = require('axios').default
function sendPayload() {

axios({
  method: 'post',
  url: 'https://api.honeycomb.io/1/markers/k6-load-tests',
  data: {
    "message": "k6 loadtest complete",
    "type": "complete"
},
  headers: {
      "X-Honeycomb-Team": "sR88iTCBqXWNI8btdFK52A"
  }
}).then(data => {
  console.log(data)
}).catch(error => { console.log(error) })
}
sendPayload()