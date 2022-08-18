import React, {useState, useEffect} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import '../../App.css';
import { useTranslation } from "react-i18next";
import { updateForm, getDataWeather } from "../../redux/actions/WeatherAction";

import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import spain from '../../assest/icons/spain.svg'
import uk from '../../assest/icons/uk.svg'
import temp from '../../assest/icons/temp.svg'
import location from '../../assest/icons/location.svg'
import humidity from '../../assest/icons/humidity.svg'


const PrincipalScreen = () => {
	const {
		WeatherForm: { loader , dataWeather, language },
	  } = useSelector((state) => state, shallowEqual);

	const dispatch = useDispatch();

	useEffect(()=>{
	},[loader])

 	const [t, i18n] = useTranslation("global");

	const selectLanguaje = (lan) => {
		i18n.changeLanguage(lan)
		dispatch(updateForm("language", lan));
	};

	const [country, setCountry] = useState('');

	const handleChange =  (event) => {
		let value = event.target.value
		dispatch(updateForm('loader', true)); 
		  switch(value){
			case 1:
				setCountry(value);
				dispatch(updateForm("latitude", 51.508));
				dispatch(updateForm("longitude", -0.125));
				dispatch(getDataWeather(51.508,-0.125))
				break;
			case 2:
				setCountry(value);
				dispatch(updateForm("latitude", 1.283));
				dispatch(updateForm("longitude", 103.85));
				dispatch(getDataWeather(1.283,103.85))
				break;
			case 3:
				setCountry(value);
				dispatch(updateForm("latitude", 43.700));
				dispatch(updateForm("longitude", -79.416));
				dispatch(getDataWeather(43.700,-79.416))
				break;
			default: {
				setCountry("");
				dispatch(updateForm("latitude", 0));
				dispatch(updateForm("longitude", 0));
				dispatch(updateForm('loader', false)); 
			}
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<Grid container spacing={1}>
				
					<Grid item xs={4} justifyContent="right">
					{t("header.hello")}
					</Grid>
					<Grid item xs={8}>
							<Button variant="contained"  onClick={() =>selectLanguaje("es")} className="margin">ES</Button>
						
							<Button variant="contained"  onClick={() =>selectLanguaje("en")} >EN</Button>
						
								{ t("header.description")} : {t("header.language")  }  
						

							<img src={language === "es" ? spain : uk} alt="flag" />
						
					</Grid>
				
				</Grid>
			
			</header>
			
			<body className="App-body">
			
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="demo-simple-select-helper-label">{t("body.countries")}</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={country}
						label="countries"
						onChange={handleChange}
					>
					<MenuItem value="">
						<em>{t("body.none")}</em>
					</MenuItem>
					<MenuItem value={1}>{t("countries.london")}</MenuItem>
					<MenuItem value={2}>{t("countries.singapore")}</MenuItem>
					<MenuItem value={3}>{t("countries.toronto")}</MenuItem>
					</Select>
					<FormHelperText>{t("body.select")}</FormHelperText>
				</FormControl>
				{ loader && <div>
						<Box sx={{ display: 'flex' }}>
							<CircularProgress  size={70}/>
						</Box>
					</div>}

			{dataWeather.weather && 
			<Box sx={{ width: '100%'}}>
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  justifyContent="center">
							<Grid item xs={3}>
								<img  src={`http://openweathermap.org/img/wn/${dataWeather?.weather[0]?.icon}@4x.png`} alt="imageWeather"/>
							</Grid>
							<Grid item xs={3}>
								<Grid item xs={12}>
									<div className="station">
									{t("body.description")} : {dataWeather?.weather[0]?.description}
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className="temperature">
										{dataWeather?.main?.temp}°C
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className="station">
									<img src={temp} alt="" />
									{t("body.tem-min")} : {dataWeather?.main?.temp_min} °C
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className="station">
									<img src={temp} alt="" />
									{t("body.tem-max")} : {dataWeather?.main?.temp_max} °C
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className="station">
									<img src={humidity} alt="" />
									{t("body.humidity")} : {dataWeather?.main?.humidity} 
									</div>
								</Grid>
								<Grid item xs={12}>
								<div className="city">
									<img src={location} alt="" />
									{t("body.country")} : {dataWeather?.name}
								</div>
								</Grid>
							</Grid>
						</Grid>
					</Box>}

			</body>
		</div>
	);
};

export default PrincipalScreen;