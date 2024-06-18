import { Component } from "react";
import { RiMoonFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";

import "./index.css";

const apiStatus = {
    progress: "progress",
    failure: "failure",
    success: "success",
}; // update initial view in state

const keys = "7c5acb3360cbf78c38878f05b828837f";
const api = "https://api.openweathermap.org/data/2.5/";

class Main extends Component {
    state = {
        mode: true,
        dateTime: new Date(),
        city: "",
        weathers: {},
        status: apiStatus.progress,
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({ dateTime: new Date() });
        }, 1000);
    }

    changeMode = () => {
        this.setState((prevState) => ({ mode: !prevState.mode }));
    }; // changing theme mode

    changeInput = (event) => {
        this.setState({ city: event.target.value });
    }; // update city in the stste

    searchValue = async () => {
        const { city } = this.state;
        const response = await fetch(
            `${api}weather?q=${city}&units=metric&APPID=${keys}`
        );

        const data = await response.json();

        console.log(response.ok); //  fetch the api and checking the response ,
        if (response.ok === true) {
            this.setState({ weathers: data, status: apiStatus.success }); // if successfully fetched the  data , so update  in the state
        } else {
            this.setState({ status: apiStatus.failure }); // else  failure response update in the state
        }
    };

    successData = () => {
        const { weathers } = this.state;
        const { name, main, weather, wind, sys } = weathers;
        const temperature = main?.temp;
        const feelsLike = main?.feels_like;
        const description = weather?.[0]?.description;
        // const haze = weather?.[0]?.main;
        const windSpeed = wind?.speed;
        const country = sys?.country;

        return (
            <div className="deg">
                <p>
                    City : <span> {name}</span>
                </p>
                <p>
                    Temperature : <span> {temperature} °C</span>{" "}
                </p>
                <p>
                    climate : <span> {description} </span>
                </p>
                <p>
                    Feels Like : <span> {feelsLike} </span>
                </p>
                <p>
                    Wind Speed : <span> {windSpeed} </span>
                </p>
                <p>
                    Country : <span> {country} </span>
                </p>
            </div>
        );
    }; // Showing Success View

    failureView = () => (
        <div>
            <h1 className="failure">City Not Found</h1>
        </div>
    ); // showing failure view

    LoadingView = () => (
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    ); // showing Loading view

    data = () => {
        const { status } = this.state;

        switch (status) {
            case apiStatus.progress:
                return this.LoadingView(); // showing inital or loading view
            case apiStatus.success:
                return this.successData(); // showing success view

            case apiStatus.failure:
                return this.failureView(); // showing failure view

            default:
                return null;
        }
    };

    render() {
        const { mode, dateTime, city } = this.state;
        // get the current date and time
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();

        const climateMode = !mode ? "dark" : "light";

        return (
            <div className={`${climateMode} main`}>
                <header>
                    <h1 className="head">Weather App</h1>
                    <div className="wet-con">
                        <div className="date-con">
                            <div>
                                <p>
                                    <FaClock className="i" /> {hour} : {minute}
                                </p>
                            </div>
                            <div>
                                <p>
                                    {day}-{month}-{year}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={this.changeMode}
                                className="mode-btn">
                                <RiMoonFill fontSize={35} color="#fff" />
                            </button>
                        </div>
                    </div>
                </header>
                <div>
                    <input
                        onChange={this.changeInput}
                        value={city}
                        placeholder="Enter city"
                    />
                    <button className="btn" onClick={this.searchValue}>
                        Search
                    </button>
                </div>
                <div className="data"> {this.data()} </div>
            </div>
        );
    }
}

export default Main;
