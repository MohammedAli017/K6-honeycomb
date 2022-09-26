import http from 'k6/http'
import { BASE_URL, GET_ALL_DESTINATIONS } from '../constants.js'
const testallDestination = () => {
    try {
        const url = `${BASE_URL+GET_ALL_DESTINATIONS}`;
        const response = http.get(url);
       let success = false
       if(response && response.headers){
        const reqContentType = response.headers['Content-Type'];
        const substr = reqContentType.split(";")[0];
        if(substr !== "application/json"){
          return success;
        }}
     // console.log(JSON.stringify(response));
        if(response && response.status === 200){
            success = true
        }
        else {
            console.log("alldestination failed",JSON.stringify(response));
          }
          return success;
    } catch (error) {
        console.log("alldestination fn error",error);
        
   }
}
export default testallDestination;

