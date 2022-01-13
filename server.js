const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 8080

const apiRoute = "/api";

app.use(cors({ orgin: true }));

const router = express.Router();

app.use('/', express.static('dist/weather-app'));


router.get("/tomorrow/:latlng", async (req, res) => {
  try {
    const coord = req.params['latlng'];
    const url = "https://api.tomorrow.io/v4/timelines?location=" + coord + "&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timesteps=1h&timesteps=1d&timezone=America/Los_Angeles&apikey=k5Y3EJdsntFnhv2yweYA7Bh2P7FFyTW3";
    const op = await axios.get(url);
    res.json(op.data);
  }
  catch (err) {
    res.send(err);
  }
});


router.get("/autocomplete/:value", async (req, res) => {
  try {
    const val = req.params['value'];
    url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    const config = {
      params: {
        input: val,
        key: "AIzaSyAG-bpTtCMJ6-9m-LSPIhEAzv4dd3fnAGw",
        types: "(cities)"
      }
    }
    const op = await axios.get(url, config);
    res.json(op.data);
  }
  catch (err) {
    //do nothing, autocomplete doesnt work
  }
});

app.use(apiRoute, router);


app.listen(port, () => {
  console.log('App running!');
})