// noinspection ES6ConvertVarToLetConst

var Highcharts;


// Generate graphs
$.getJSON('/pages/articles/indices.json', function (source) {

    let data = source['data'], keys = source['columns'];

    // key indices
    let i_level = keys.indexOf('level'), i_url = keys.indexOf('url');

    // symbols
    const symbols = new Map();
    symbols.set("chapter", "circle"), symbols.set("section", "circle"), symbols.set("page", "circle"), 
    symbols.set("study", "square");

    // And
    let colour = [];

    // Add the nodes option through an event call. We want to start with the parent
    // item and apply separate colors to each child element, then the same color to
    // grandchildren.
    Highcharts.addEvent(
        Highcharts.Series,
        'afterSetOptions',
        function (e) {

            const colors = Highcharts.getOptions().colors,
                nodes = {};

            let i = 0;

            if ( this instanceof Highcharts.Series.types.networkgraph && e.options.id === 'chapter' ) {
                e.options.data.forEach(function (link) {

                    if (link[i_url].length === 0) {
                        colour = 'black';
                    } else {
                        colour = 'orange'
                    }

                    if (link[0] === 'CONTENT') {
                        nodes['CONTENT'] = {
                            id: 'CONTENT',
                            marker: {
                                radius: 18
                            },
                            color: colour,
                            dataLabels: {
                                verticalAlign: 'middle',
                                backgroundColor: 'contrast',
                                style: {
                                    textOutline: 'none'
                                }
                            }
                        };
                        nodes[link[1]] = {
                            id: link[1],
                            marker: {
                                radius: link[3]  // 1 + link[1].length
                            },
                            color: colour // colors[i++]
                        };
                    } else if (nodes[link[0]] && nodes[link[0]].color) {
                        nodes[link[1]] = {
                            id: link[1],
                            marker: {
                                symbol: symbols.get(link[i_level]),
                                lineWidth: 0
                            },
                            color: colour // nodes[link[0]].color
                        };
                    }
                });

                e.options.nodes = Object.keys(nodes).map(function (id) {
                    return nodes[id];
                });
            }
        }
    );



    Highcharts.chart('container', {

        chart: {
            type: 'networkgraph',
            width: 850,
            height: 585
        },

        title: {
            text: '',
            align: 'left'
        },

        subtitle: {
            text: 'The content network',
            align: 'left'
        },

        credits: {
            enabled: false
        },

        plotOptions: {
            networkgraph: {
                keys: source['columns'],
                layoutAlgorithm: {
                    maxIterations: 72,
                    enableSimulation: true,
                    friction: -0.9,
                    gravitationalConstant:
                        document.getElementById('container').scrollWidth < 500 ?
                            0.2 : 0.06
                },
                allowPointSelect: true,
                point: {
                    events: {
                        click: function () {
                            const chart = this, point = chart.point;
                            const selectedNode = chart.series.points.find((point) => point.to === chart.point.id);
                            if (selectedNode.url.length > 0) {
                                window.open(selectedNode.url, 'new', 'popup="${selectedNode.popup}",width=495,height=695');
                            }
                        }
                    }
                },
                marker: {
                    symbol: 'circle'
                }                
            }
        },

        tooltip: {
            useHTML: true,
            formatter: function () {
                const chart = this, point = chart.point;
                const selectedNode = chart.series.points.find((point) => point.to === chart.point.id);
                if (selectedNode) {
                    return selectedNode.from + '&Rarr; ' + selectedNode.name;
                }

                return '<b>' + source['description'] + '</b><br><b>';
            }
        },

        exporting: {
            enabled: false
        },

        series: [{
            accessibility: {
                enabled: false
            },
            keys: keys,
            dataLabels: {
                enabled: true,
                linkFormat: '',
                style: {
                    fontSize: '0.8em',
                    fontWeight: 'normal'
                }
            },
            id: 'chapter',
            data: data
        }]
    });

})
