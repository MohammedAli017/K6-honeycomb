import http from "k6/http";
import { BASE_URL} from "../constants.js";
import { sleep, check } from "k6";

const testeventsFilter = () => {
    try {
        const url = `${BASE_URL}/events/Filter?StartTime=2020-01-01T01%3A20%3A06.0020000Z&EndTime=2025-12-31T01%3A20%3A06.0020000Z&SourceId=81CAE7C0-D275-4D1E-9183-A7C14C16F8AB&ClientId=F01373BB-8688-48A7-9B48-2FC3D4D1CE7D&EventType=Payment&DestinationId=2a959ae4-7242-430d-87c2-c77dba1587c2`
        const response = http.get(url);
        let success = false
        if(response && response.headers){
            const reqContentType = response.headers['Content-Type'];
            const substr = reqContentType.split(";")[0];
            if(substr !== "application/json"){
              return success;
            }}
        // console.log(JSON.stringify(response));
        if(response && response.status === 200 && response.body){
        const responseBodyJson = JSON.parse(response.body)
        if(responseBodyJson && responseBodyJson && responseBodyJson.events && responseBodyJson.events.length &&responseBodyJson.events.length>0 && responseBodyJson.events.length === responseBodyJson.totalCount){
        success = true
        }
        }
        if (! check(response, {
            'is status 200': (r) => r.status === 200,
          }) ) {
            fail (JSON.parse(response.body)) 
          }
    return success;
    } catch (error) {
        console.log("Eventsfilter fn error",error);
    }
}
export default testeventsFilter;

