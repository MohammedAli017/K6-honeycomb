import { sleep, check,group} from "k6";
import { Counter } from "k6/metrics";
import testEventTypes from "./eventTypes/event-types-test.js";
import testCreateDestinations from "./destinations/post-createdestinations-test.js";
import testGetDestinationById from "./destinations/get-destination-by-id-test.js";
import testDeleteDestination from "./destinations/delete-destination-test.js";
import testGetDestinationByClientId from "./destinations/get-destination-byClientId-test.js"
import testAllDestination from "./destinations/get-alldestination-test.js";
import testevents from "./events/get-events-test.js";
import testeventsFilter from "./events/get-events-filter-test.js";
import testEventsSearch from "./events/get-events-search-test.js";
import testPostEventsView from "./events/post-events-viewJson-test.js";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export const options =  {
    // scenarios: {
    //   constant_request_rate: {
    //     executor: 'constant-arrival-rate',
    //     rate: 10,
    //     timeunit: '10s',
    //     duration: '1m',
    //     preallocatedVUs: 2,
    //     maxvus: 5
    //   },
    // }}

    stages: [
            //Stress testing
       { duration: '1m', target: 5, rps: 50 }, // below normal load
//        { duration: '30s', target: 35 },
//     //    { duration: '2m', target: 10 }, // normal load
//     //    { duration: '5m', target: 10 },
//     //    { duration: '2m', target: 15 }, // around the breaking point
//     //    { duration: '5m', target: 15 },
//     //    { duration: '2m', target: 20 }, // beyond the breaking point
//     //    { duration: '5m', target: 20 },
//     //    { duration: '2m', target: 0 }     
    ]
 
}  
    export const option = {

 thresholds: {
   http_req_failed:   ['rate<0.01'], // http errors should be less than 1%
   'group_duration{group:::All Events API}': ['avg < 1500'], //average duration must be less than 1.5s
   'group_duration{group:::All Destination API}': ['avg < 1500'], // average duration must be less than 1.5s
   'group_duration{group:::Events API}': ['avg < 320'] //average run duration must be less than 320ms
}}
//}

//const SLEEP_DURATION = 0.1;
export default function () {   


    //Events API

    group(`All Events API`, function () {
    const Getevents = testevents();
    check(Getevents, {
    "GetEvents API" : (r) => Getevents
    })
    const GetEventsFilter = testeventsFilter();
    check(GetEventsFilter, {
    "GetEventsFilter API" : (r) => GetEventsFilter 
    })
    const GetEventsSearch = testEventsSearch();
    check(GetEventsSearch, {
    "GetEventsSearch API" : (r) => GetEventsSearch
    })
    const PostEventsView = testPostEventsView();
    check(PostEventsView,{
    "PostEventsView API": (r) => PostEventsView,
    })
    })

    //Destinations

    group(`All Destination API`, function () {
    const getallDestination = testAllDestination();
    check(getallDestination,{
        "allDestination API": (r) => getallDestination,
    })
    const getDestinationById = testGetDestinationById();
    check(getDestinationById, {
    "getDestinationById API": (r) => getDestinationById,
   });
    const createDestinations = testCreateDestinations();
    check(createDestinations, {
        "createDestinations API": (r) => createDestinations.success,
    });
    if(createDestinations && createDestinations.createdDestinationIds.length){
        createDestinations.createdDestinationIds.map(item=>{
        const deleteDestination = testDeleteDestination(item);
        // console.log("applog",JSON.stringify(deleteDestination));
        check(deleteDestination, {
        "deleteDestination API": (r) => deleteDestination,
        });
        })
    }
    const getDestinationByClientId = testGetDestinationByClientId();
    check(getDestinationByClientId, {
        "getDestinationByclientId API" : (r) => getDestinationByClientId
    })
    })

    //Events Types

    group(`Events API`, function () {
    const eventTypeRes =  testEventTypes();
    const checkEventTypeRes = check(eventTypeRes, {
    "EVENTS TYPES API": (r) => eventTypeRes,
    
    })
    });
    
} 
