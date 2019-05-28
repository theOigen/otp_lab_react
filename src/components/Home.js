import React, { useEffect } from 'react'

export default function Home() {

    useEffect(() => {
        fetchWeatherData()
    }, [])

    const fetchWeatherData = async () => {
        try {
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const url = 'https://www.metaweather.com/api/location/search/?query=london'
            const data = await fetch(proxy + url)
            console.log(await data.json());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}
