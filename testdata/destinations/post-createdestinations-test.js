import http from "k6/http";
import { BASE_URL, CREATE_DESTINATIONS} from "../constants.js";
import { AUTH_HEADERS } from "../config.js";
import { sleep, check } from "k6";
import testDeleteDestination from "./delete-destination-test.js";

const testCreateDestinations = () => {
    try {
        const url = `${BASE_URL+CREATE_DESTINATIONS}`;
        const payload = JSON.stringify({
            "authentication": {
              "authenticationType": "string",
              "tokenEndPoint": "string",
              "audience": "string",
              "basicAuthentication": {
                "userName": "string",
                "password": "string"
              },
              "clientCredentials": {
                "client_id": "string",
                "client_secret": "string"
              }
            },
            "description": "string",
            "clientId": "F01373BB-8688-48A7-9B48-2FC3D4D1CE7Z",
            "sourceId": "81CAE7C0-D275-4D1E-9183-A7C14C16F8AZ",
            "eventType": "Broadcast",
            "url": "Payment",
            "paused": true
          });
        
          const params = {
            headers: {
              'Authorization' : AUTH_HEADERS.Authorization,
              'Content-Type': 'application/json'
            }
          };
        const response = http.post(url, payload, params);
        let success = false
        const createdDestinationIds = [];
       //console.log(JSON.stringify(response));
        if(response && response.status === 200 && response.body){
          const responseBodyJson = JSON.parse(response.body)
          if(responseBodyJson && responseBodyJson.destinationId){
            // testDeleteDestination(responseBodyJson.destinationId);
            success = true
            createdDestinationIds.push(responseBodyJson.destinationId);
          }
        } else {
          console.log("create destination failed",JSON.stringify(response));
        }
        if (! check(response, {
          'is status 200': (r) => r.status === 200,
        }) ) {
          fail (JSON.parse(response.body)) 
        }
    return {success, "createdDestinationIds":createdDestinationIds};
    } catch (error) {
        console.log("createDestinations error",error);
    }
}
export default testCreateDestinations;

