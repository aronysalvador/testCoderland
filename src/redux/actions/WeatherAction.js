import {
    SET_STEP,
    LOAD_STATE_SESSIONSTORAGE,
    UPDATE_FORM,
  } from "../types/weatherFormTypes";

import Axios from "axios";

export const setStep = (step) => {
    return {
        type: SET_STEP,
        payload: {
            step
        },
    };
};

export const loadStateFromSessionStorage = (state) => {
    return {
        type: LOAD_STATE_SESSIONSTORAGE,
        payload: state,
    };
};

export const updateForm = (stateType, value) => {
    return {
        type: UPDATE_FORM,
        payload: {
            stateType,
            value,
        },
    };
};

export const getDataWeather = (lat, long) => async (dispatch, getState) => {  
    try {
        let dataWeather =  await getWeather(lat,long)
        dispatch(updateForm('dataWeather', dataWeather.data));
        dispatch(updateForm('loader', false)); 
    } catch (error) {
        console.log(error)
        dispatch(updateForm('dataWeather', {}));
        dispatch(updateForm('loader', false)); 
    }
};

export const getWeather =  async(lat, long) => {
    return  await Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1aacc737497189f3b502aca2f722aef9&units=metric`);
}