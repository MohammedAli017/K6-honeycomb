import http from "k6/http";
import { BASE_URL, GET_DESTINATION_BY_ID} from "../constants.js";
import { sleep, check } from "k6";

const testDeleteDestination = (destinationId="73d7e9c2-3ca1-4cef-aa98-25a0abae30f6") => {
    try {
        const url = `${BASE_URL+GET_DESTINATION_BY_ID}/destinationId=${destinationId}`;
       // console.log(destinationId);
        const response = http.del(url);
        let success = false
        // console.log(JSON.stringify(response));
        if(response && response.status === 200){
            success = true
        } else {
            console.log("delete failed",JSON.stringify(response));
        }
        if (! check(response, {
            'is status 200': (r) => r.status === 200,
          }) ) {
            fail (JSON.parse(response.body)) 
          }
    return success;
    } catch (error) {
        console.log("delete fn error",error);
    }
}
export default testDeleteDestination;

