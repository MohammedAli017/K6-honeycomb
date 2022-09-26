import http from "k6/http";
import { BASE_URL, GET_DESTINATION_BY_ID} from "../constants.js";
import { sleep, check } from "k6";

const testGetDestinationById = () => {
    try {
        const destinationId = "C10C0CE4-0943-4271-B7EF-7C75E83D167F";
        const url = `${BASE_URL+GET_DESTINATION_BY_ID}/destinationId=${destinationId}`;
        const response = http.get(url);
        let success = false
        //console.log(JSON.stringify(response));
        if(response && response.status === 200 && response.body){
          const responseBodyJson = JSON.parse(response.body)
          if(responseBodyJson && responseBodyJson.destinationId && destinationId === responseBodyJson.destinationId){
            success = true
          } else {
            console.log("get destinationByID. failed",JSON.stringify(response));
          }
        }
        if (! check(response, {
          'is status 200': (r) => r.status === 200,
        }) ) {
          fail (JSON.parse(response.body)) 
        }
    return success;
    } catch (error) {
        console.log("getdestinationByID fn error",error);
    }
}
export default testGetDestinationById;

