const axios = require('axios').default
function sendPayload() {
  axios({
    method: 'post',
    url: 'https://api.honeycomb.io/1/markers/KafkaDispatcher_Api',
    data: {
      "message": "k6-loadtest",
      "type": "Testing"
  },
    headers: {
        "X-Honeycomb-Team": "9Hl7Jf35QFelQDgBsrvudP"
    }
  }).then(data => {
    console.log(data)
  }).catch(error => { console.log(error) })
  }
  sendPayload()