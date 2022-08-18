import {
    SET_STEP,
    LOAD_STATE_SESSIONSTORAGE,
    UPDATE_FORM,
    CLEAR_STATE,
  } from "../types/weatherFormTypes";
import { WeatherForm } from "../models/WeatherForm.js";

  export default function payload(state = WeatherForm, action) {
    switch (action.type) {
      case LOAD_STATE_SESSIONSTORAGE:
        return { ...action.payload };
      case SET_STEP:
        return {
          ...state,
          step: action.payload.step,
          percentage: action.payload.percentage,
        };

      case UPDATE_FORM:
        return {
          ...state,
          [action.payload.stateType]: action.payload.value,
        };

      case CLEAR_STATE:
        var response = WeatherForm
        response.step = state.step
        return response;
      default:
        return state;
    }
  };

  
