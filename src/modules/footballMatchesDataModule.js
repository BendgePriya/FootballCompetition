import { 
    FETCH_FOOTBALL_MATCHES_DATA_REQUESTED,
    FETCH_FOOTBALL_MATCHES_DATA_RECIEVED
} from '../constants/matches'

import { API_ROOT } from '../constants/api';
const initialState = {
    data: null,
    totalNoOfMatches: 0
}
export default (state = initialState, action) => {
    switch (action.type) {

      case FETCH_FOOTBALL_MATCHES_DATA_REQUESTED:
        return {
          ...state,
          status: FETCH_FOOTBALL_MATCHES_DATA_REQUESTED
        };
      
      case FETCH_FOOTBALL_MATCHES_DATA_RECIEVED:
        let payload = action.payload;
        let total = action.payload.length
        return {
          ...state,
          data: payload,
          totalNoOfMatches: total,
          status: FETCH_FOOTBALL_MATCHES_DATA_RECIEVED
        };
      default:
        return state;
    }
  };
  
export function getData (year){
    return (dispatch) => {
        dispatch(footballMatchesDataRequested());
        let matchesUrl = API_ROOT + `${year}`;
        let options = {
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            }
        };
          fetch(matchesUrl, options)
          .then(response => {
            if (response.status >= 400) {
              if (response.status === 403) {
                console.log('Not Authorised')
              }
              console.log("Sorry! data is not available at this moment")
              return null;
            }
            return response.json();
          })
          .then(json => {
            if (json !== null) {
              dispatch(footballMatchesDataRecieved(json));
            }
          });
      };
}

export function footballMatchesDataRequested() {
    return { type: FETCH_FOOTBALL_MATCHES_DATA_REQUESTED };
}
export function footballMatchesDataRecieved(json) {
    return { type: FETCH_FOOTBALL_MATCHES_DATA_RECIEVED, payload: json.data };
}