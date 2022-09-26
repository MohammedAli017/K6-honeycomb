import http from "k6/http";
import { BASE_URL, GET_DESTINATION_BY_ID} from "../constants.js";
import { sleep, check } from "k6";


const testGetDestinationByClientId = () => {
    try {
      const clientId = "2F8E1F0C-16FC-4677-910F-2DD43722BE8E";
      const sourceId = "9FEA9442-60B0-46D7-B539-C92661228AD0";
      const eventType = "Incident";
        const url = `${BASE_URL+GET_DESTINATION_BY_ID}/clientId=${clientId}&sourceId=${sourceId}&eventType=${eventType}`;
        const response = http.get(url);
        let success = false
        if(response && response.headers){
          const reqContentType = response.headers['Content-Type'];
          const substr = reqContentType.split(";")[0];
          if(substr !== "application/json"){
            return success;
          }}
        if(response && response.status === 200  && response.body){
            const responseBodyJson = JSON.parse(response.body);
            if(responseBodyJson && responseBodyJson.length && responseBodyJson.length>0){
              success = true
            }
          } else {
            console.log("get destinationByClintID. failed",JSON.stringify(response));
          }
          if (! check(response, {
            'is status 200': (r) => r.status === 200,
          }) ) {
            fail (JSON.parse(response.body)) 
          }  
      return success;
    } catch (error) {
        console.log("destinationByClintID fn error",error);
    }
}
export default testGetDestinationByClientId;


