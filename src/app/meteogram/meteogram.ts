import * as Highcharts from 'highcharts';

export class Meteogram {
    myData: any;
    pressures = [];
    winds = [];
    temperatures = [];
    humidities = [];


    constructor(meteoData) {
        this.myData = meteoData;
    }

    parseData() {
        let pointStart;
        this.myData.forEach((node, i) => {
            const x = Date.parse(node.startTime),
            to = x + 36e5;

            if (to > pointStart + 120 * 36e5) {
                return;
            }

            this.temperatures.push({
                x,
                y: Math.round(node.values.temperature),
                // custom options used in the tooltip formatter
                to
            });
    
            this.humidities.push({
                x,
                y: Math.round(node.values.humidity),
            });
    
            if (i % 2 === 0) {
                this.winds.push({
                    x,
                    value: node.values.windSpeed,
                    direction: node.values.windDirection
                });
            }
    
            this.pressures.push({
                x,
                y: Math.round(node.values.pressureSeaLevel)
            });
    
            if (i === 0) {
                pointStart = (x + to) / 2;
            }

        });
    }

    getMeteoOptions() {
        return {
            chart: {
                marginBottom: 70,
                marginRight: 40,
                marginTop: 50,
                plotBorderWidth: 1,
                height: 400,
                alignTicks: false,
                scrollablePlotArea: {
                    minWidth: 1000,
                    scrollPositionX: 2
                  }
            },
            title: {
                text: 'Hourly Weather (For Next 5 Days)',
                align: 'center',
                style: {
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: '#716f6f',
                    fontWeight: 'bold'
    
                }
            },
    
    
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<small>{point.x:%A, %b %e, %H:%M}</small><br>'
    
            },
    
            xAxis: [{ // Bottom X axis
                type: 'datetime',
                tickInterval: 2 * 36e5, // two hours
                minorTickInterval: 36e5, // one hour
                tickLength: 0,
                gridLineWidth: 1,
                gridLineColor: 'rgba(128, 128, 128, 0.1)',
                startOnTick: false,
                endOnTick: false,
                minPadding: 0,
                maxPadding: 0,
                offset: 30,
                showLastLabel: true,
                labels: {
                    format: '{value:%H}'
                },
                crosshair: true
            }, { // Top X axis
                linkedTo: 0,
                type: 'datetime',
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                    align: 'left',
                    x: 3,
                    y: -5
                },
                opposite: true,
                tickLength: 20,
                gridLineWidth: 1
            }],
    
            yAxis: [{ // temperature axis
                title: {
                    text: null
                },
                labels: {
                    format: '{value}°',
                    style: {
                        fontSize: '10px'
                    },
                    x: -3
                },
                plotLines: [{ // zero plane
                    value: 0,
                    color: '#BBBBBB',
                    width: 1,
                    zIndex: 2
                }],
                maxPadding: 0.3,
                minRange: 8,
                tickInterval: 1,
                gridLineColor: 'rgba(128, 128, 128, 0.1)'
    
            }, { // precipitation axis - -change to humidity
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                gridLineWidth: 0,
                tickLength: 0,
                minRange: 10,
                min: 0
    
            }, { // Air pressure
                allowDecimals: false,
                title: { // Title on top of axis
                    text: 'inHg',
                    offset: 0,
                    align: 'high',
                    rotation: 0,
                    style: {
                        fontSize: '12px',
                        color: Highcharts.getOptions().colors[3]
                    },
                    textAlign: 'left',
                    x: 3
                },
                labels: {
                    style: {
                        fontSize: '11px',
                        color: Highcharts.getOptions().colors[3]
                    },
                    y: 2,
                    x: 3
                },
                gridLineWidth: 0,
                opposite: true,
                showLastLabel: false
            }],
    
            legend: {
                enabled: false
            },
    
            plotOptions: {
                series: {
                    pointPlacement: 'between'
                }
            },
    
    
            series: [{
                name: 'Temperature',
                data: this.temperatures,
                type: 'spline',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                        '{series.name}: <b>{point.y}°F</b><br/>'
                },
                zIndex: 1,
                color: '#FF3333',
                negativeColor: '#48AFE8'
            }, {
                name: 'Humidity', // CHange to humidity, alternate
                data: this.humidities,
                type: 'column',
                color: '#68CFE8',
                yAxis: 1,
                groupPadding: 0,
                pointPadding: 0,
                grouping: false,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        color: 'gray'
                    }
                },
                tooltip: {
                    valueSuffix: ' %'
                }
            }, {
                name: 'Air pressure',
                color: Highcharts.getOptions().colors[3],
                data: this.pressures,
                marker: {
                    enabled: false
                },
                shadow: false,
                tooltip: {
                    valueSuffix: ' inHg'
                },
                dashStyle: 'shortdot',
                yAxis: 2
            }, {
                name: 'Wind',
                type: 'windbarb',
                id: 'windbarbs',
                color: Highcharts.getOptions().colors[1],
                lineWidth: 1,
                data: this.winds,
                vectorLength: 10,
                yOffset: -15,
                tooltip: {
                    valueSuffix: ' mph'
                }
            }]
        };
    }

    sayHi() {
        console.log("Inside Meteo");
    }
}