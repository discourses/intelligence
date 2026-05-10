
/* 
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
 https://github.com/mdn/js-examples/tree/main/module-examples
 */
import quantilesExtrinsic from "../../../interfaces/quantilesExtrinsic.js";

import Highcharts from 'highcharts/highstock';


let created = [], active = [], inactive = [];


// Counts/Frequencies
$.getJSON('https://raw.githubusercontent.com/discourses/elements/refs/heads/master/src/industries/patterns/annum/frequencies.json', function (data) {

    let source = data['percentages'];

    let indices = source['columns'];

    let i_date = indices.indexOf('milliseconds'),
        i_active = indices.indexOf('active'),
        i_inactive = indices.indexOf('dissolved'),
        i_all = indices.indexOf('all');

    for (let i = 0; i < source.data.length; i += 1) {

        active.push({
            x: source.data[i][i_date], // the date
            y: source.data[i][i_active], //
            name: source.data[i][i_active] * source.data[i][i_all] / 100
        });

        inactive.push({
            x: source.data[i][i_date], // the date
            y: source.data[i][i_inactive], //
            name: source.data[i][i_inactive] * source.data[i][i_all] / 100
        });

        created.push({
            x: source.data[i][i_date], // the date
            y: source.data[i][i_all]
        });

    }

});


// Generate graphs
$.getJSON('https://raw.githubusercontent.com/discourses/elements/refs/heads/master/src/industries/patterns/annum/quantiles/dissolved.json', function (data) {

    // https://api.highcharts.com/highstock/plotOptions.series.dataLabels
    // https://api.highcharts.com/class-reference/Highcharts.Point#.name
    // https://api.highcharts.com/highstock/tooltip.pointFormat


    // data
    let source = data['quotients'];

    // quantiles
    let T = quantilesExtrinsic(source);

    // grouping
    let groupingUnits = [[
        'year',   // unit name
        [1]      // allowed multiples
    ]]


    // drawing graphs
    Highcharts.stockChart('container0004', {

        rangeSelector: {
            selected: 6,
            verticalAlign: 'top',
            floating: false,
            inputPosition: {
                x: 0,
                y: 0
            },
            buttonPosition: {
                x: 0,
                y: 0
            },
            inputEnabled: true,
            inputDateFormat: '%Y-%m-%d'
        },

        chart: {
            zoomType: 'x',
            height: 495,
            width: 465
        },

        title: {
            text: 'The lifespans of dissolved firms'
        },

        subtitle: {
            text: '<p>by year of creation</p><br/>'
        },

        credits: {
            enabled: false
        },

        legend: {
            enabled: true,
            width: 500,
            x: 35,
            y: 10
        },

        caption: {
            text: '<p><br><br>Spreads & Counts</p>'
        },

        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ['viewFullscreen', 'printChart', 'separator',
                        'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'separator',
                        'downloadCSV']
                }
            }
        },

        yAxis: [{
            labels: {
                align: 'left',
                x: 9
            },
            title: {
                text: 'age<br>(factor)',
                x: 0
            },
            min: 0,
            height: '65%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
            }, {
                labels: {
                    align: 'left',
                    x: 9
                },
                title: {
                    text: 'percentages',
                    x: 0
                },
                top: '67.5%',
                height: '31%',
                offset: 0,
                lineWidth: 2
            }
        ],

        plotOptions: {
            series: {
                turboThreshold: 8000
            },
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },

        tooltip: {
            split: false,
            shared: true,
            dateTimeLabelFormats: {
                millisecond: "%A, %e %b, %H:%M:%S.%L",
                second: "%A, %e %b, %H:%M:%S",
                minute: "%A, %e %b, %H:%M",
                hour: "%A, %e %b, %H:%M",
                day: "%A, %e %B, %Y",
                week: "%A, %e %b, %Y",
                month: "%B %Y",
                year: "%Y"
            }

        },

        series: [
            {
                name: '0.99 quantile',
                data: T.e_u_whisker,
                lineWidth: 0,
                marker: {
                    symbol: 'circle',
                    radius: 1.85
                },
                color: '#800000',
                yAxis: 0,
                dataGrouping: {
                    units: groupingUnits
                },
                tooltip: {
                    pointFormat: '<br><span style="color: darkgrey; margin-bottom: 35px;">QUANTILES: years (factor)</span><br/>' +
                        '<b>upper whisker</b><br><span style="color:{point.color}">\u25CF</span> <b>0.99</b>: ' +
                        '{point.name:,.2f}y ({point.y:,.5f})<br/>'
                }
            },
            {
                type: 'candlestick',
                name: 'Core Quantiles',
                data: T.ohlc,
                dataGrouping: {
                    units: groupingUnits,
                    dateTimeLabelFormats: {
                        millisecond: ['%a, %e %b, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                        second: ['%a, %e %b, %H:%M:%S', '-%H:%M:%S'],
                        minute: ['%a, %e %b, %H:%M', '-%H:%M'],
                        hour: ['%a, %e %b, %H:%M', '-%H:%M'],
                        day: ['%a, %e %b, %Y', '%a, %e %b', '-%a, %e %b, %Y'],
                        week: ['Week from %a, %e %b, %Y', '%a, %e %b', '-%a, %e %b, %Y'],
                        month: ['%B %Y', '%B', '-%B %Y'],
                        year: ['%Y', '%Y', '-%Y']
                    }
                },
                tooltip: {
                    pointFormat: '<br/><b>candle stick</b><br>' +
                        '<b>0.90</b>: {point.custom.f_high:,.2f}y ({point.high:,.5f})<br/>' +
                        '<b>0.75</b>: {point.custom.f_close:,.2f}y ({point.close:,.5f})<br/>' +
                        '<b>0.25</b>: {point.custom.f_open:,.2f}y ({point.open:,.5f})<br/>' +
                        '<b>0.10</b>: {point.custom.f_low:,.2f}y ({point.low:,.5f})' + '<br/>'
                }
            },
            {
                name: '0.01 quantile',
                data: T.e_l_whisker,
                lineWidth: 0,
                marker: {
                    symbol: 'circle',
                    radius: 1.85
                },
                color: '#800000',
                yAxis: 0,
                dataGrouping: {
                    units: groupingUnits
                },
                tooltip: {
                    pointFormat: '<br><b>lower whisker</b><br><span style="color:{point.color}">\u25CF</span> <b>0.01</b>: ' +
                        '{point.name:,.2f}y ({point.y:,.5f})<br/>'
                }

            },
            {
                type: 'spline',
                name: 'median',
                data: T.medians,
                color: '#6B8E23',
                yAxis: 0,
                dataGrouping: {
                    units: groupingUnits
                },
                tooltip: {
                    pointFormat: '<br><b>centre</b><br><span style="color:{point.color}">\u25CF</span> <b>{series.name}</b>: ' +
                        '{point.name:,.2f}y ({point.y:,.5f})<br/>'
                }
            },
            {
                type: 'column',
                name: 'active',
                data: active,
                color: '#ED7117',
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                },
                tooltip: {
                    pointFormat: '<br><span style="color: darkgrey; margin-bottom: 35px;">STATES: percentage (frequency)</span><br>' +
                        '<span style="color:{point.color}">\u25CF</span> <b>{series.name}</b>: ' +
                        '{point.y:,.2f}% ({point.name:,.0f})<br/>'
                }
            },
            {
                type: 'column',
                name: 'dissolved',
                data: inactive,
                color: '#000000',
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>{series.name}</b>: ' +
                        '{point.y:,.2f}% ({point.name:,.0f})<br/><br/>'
                }
            }
        ]
    });

});
