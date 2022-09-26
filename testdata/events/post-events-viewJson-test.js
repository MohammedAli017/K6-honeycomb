import http from "k6/http";
import { BASE_URL, CREATE_DESTINATIONS} from "../constants.js";
import { AUTH_HEADERS } from "../config.js";
import { sleep, check } from "k6";

const testPostEventsView = () => {
  try {
        const url = `${BASE_URL}/events/ViewJson`
        const payloadJson = {
            "event_id": "C944A9ED-E529-4FCC-8702-4EEC4F6EF1CD",
            "client_id": "F01373BB-8688-48A7-9B48-2FC3D4D1CE7D",
            "event_type": "Payment",
            "event_time": "2024-09-05T13:20:06.0020000Z",
            "destination_id": "2a959ae4-7242-430d-87c2-c77dba1587c2"
    };
    const params = {
      headers: {
        'Authorization' : AUTH_HEADERS.Authorization,
        'Content-Type': 'application/json'
    }}
    const payload = JSON.stringify(payloadJson);
    const response = http.post(url, payload, params);
    let success = false;
    if(response && response.headers){
    const reqContentType = response.headers['Content-Type'];
    const substr = reqContentType.split(";")[0];
    if(substr !== "application/json"){
    return success;
    }};
    // console.log(JSON.stringify(response));
    if(response && response.status === 200 && response.body)
    {
    const responseBodyJson = JSON.parse(response.body);
    if(responseBodyJson && (responseBodyJson.event_id && payloadJson.event_id === responseBodyJson.event_id) && responseBodyJson.client_id && responseBodyJson.source_id)
    {
    success = true
    }
    }
    if (! check(response, {
      'is status 200': (r) => r.status === 200,
    }) ) {
      fail (JSON.parse(response.body)) 
    }
    return success;
    }
     catch (error)
    {
     console.log("PostEventsView error",error);
    }
}
export default testPostEventsView;

