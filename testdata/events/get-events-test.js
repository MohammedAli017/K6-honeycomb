import http from 'k6/http'
import { BASE_URL } from '../constants.js'
import {check,fail} from 'k6'

const testevents = () => {
    
    try{
      const url = `${BASE_URL}/events?SourceId=81CAE7C0-D275-4D1E-9183-A7C14C16F8AB&ClientId=F01373BB-8688-48A7-9B48-2FC3D4D1CE7D&EventType=Payment&DestinationId=2a959ae4-7242-430d-87c2-c77dba1587c2&Offset=0&Limit=100`
      const response = http.get(url);
      let success = false;
      if(response && response.headers){
        const reqContentType = response.headers['Content-Type'];
        const substr = reqContentType.split(";")[0];
        if(substr !== "application/json"){
          return success;
        }
      }
      
      if(response && response.status === 200 && response.body){
        const responseBodyJson = JSON.parse(response.body)
       // console.log("responseBodyJson.totalCount",responseBodyJson.totalCount,JSON.stringify(responseBodyJson.events[24]));
      if(responseBodyJson && responseBodyJson && responseBodyJson.events && responseBodyJson.events.length &&responseBodyJson.events.length>0){
        success = true
        && responseBodyJson.totalCount===responseBodyJson.events.length
      }
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

export default testevents