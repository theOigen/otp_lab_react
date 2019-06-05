import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import cardStyles from './cardStyles'

class Forecast extends Component {

    rotatedArrow(direction) {
        return {
            transform: `rotate(${direction}deg)`
        }
    }

    render() {
        const forecast = this.props.forecast
        const classes = this.props.classes
        return (
            <>
                <Grid item key={forecast.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            className={classes.cardMedia}
                            image={`https://www.metaweather.com/static/img/weather/${forecast.weather_state_abbr}.svg`}
                            title="Weather icon"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {forecast.weather_state_name}
                            </Typography>
                            <Typography>
                                Max: {Math.round(forecast.max_temp)} °C
                                                <br />
                                Min: {Math.round(forecast.min_temp)} °C
                                                <br />
                                <img src="https://www.metaweather.com/static/img/windarrow.svg"
                                    style={this.rotatedArrow(forecast.wind_direction)}
                                    title={forecast.wind_direction_compass}
                                    alt="Wind direction"
                                    className={classes.windIcon} />
                                {`${Math.round(forecast.wind_speed)}mph`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        )
    }
}

export default withStyles(cardStyles)(Forecast)
