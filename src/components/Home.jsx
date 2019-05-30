import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: true,
            weatherData: []
        }
    }

    async componentDidMount() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://www.metaweather.com/api/location/924938/'
        const data = await fetch(proxy + url).then(resp => resp.json())
        this.setState({ weatherData: data.consolidated_weather, isFetching: false })
        console.log(this.state.weatherData)
    }

    render() {
        if (this.state.isFetching) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div>
                    {this.state.weatherData.map(weather =>
                        <div key={weather.id}>
                            {weather.weather_state_name}
                        </div>
                    )}
                    <h1>Home page</h1>
                </div>
            )
        }
    }
}

export default Home

// import React, { useEffect } from 'react'

// export default function Home() {

//     useEffect(() => {
//         fetchWeatherData()
//     }, [])

//     const fetchWeatherData = async () => {
//         try {
//             const proxy = 'https://cors-anywhere.herokuapp.com/'
//             const url = 'https://www.metaweather.com/api/location/search/?query=london'
//             const data = await fetch(proxy + url)
//             console.log(await data.json());
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div>
//             <h1>Home page</h1>
//         </div>
//     )
// }
