import React, {useEffect}  from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
//import Paper from "@material-ui/core/Paper";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CssBaseline from '@mui/material/CssBaseline';

//import { getUseStyles } from "../../css/styles";

import PrincipalScreen from "../Welcome/PrincipalScreen";

const Main = (props) => {
    const dispatch = useDispatch()
    const {
        WeatherForm
      } = useSelector((state) => state, shallowEqual);

    const renderForm = (step) => {
      switch (step) {

        case 0:
          return (
              <div >
                <PrincipalScreen />
              </div>
          );

        default: {
          return (
                <PrincipalScreen />
              
          );
        }
      }
    };

    return (  
        <React.Fragment>
          <CssBaseline />
          {renderForm(WeatherForm.step)}
        </React.Fragment>
    );
  };

export default Main;