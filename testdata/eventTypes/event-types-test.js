import http from "k6/http";
import { BASE_URL, GET_EVENT_TYPES} from "../constants.js";
import { sleep, check } from "k6";


const testEventTypes = () => {
    try {
        const url = `${BASE_URL+GET_EVENT_TYPES}`;
        const response = http.get(url);
        let success = false
        //console.log(JSON.stringify(response));
        if(response && response.status === 200){
            success = true
            } else {
                console.log("eventType failed",JSON.stringify(response));
              }
              if (! check(response, {
                'is status 200': (r) => r.status === 200,
              }) ) {
                fail (JSON.parse(response.body)) 
              }
    return success;
    } catch (error) {
        console.log("eventType fn error",error);
    }
}
export default testEventTypes;

