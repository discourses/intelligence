

export function quantilesExtrinsic(source) {

    let indices = source['columns'];

    let i_datetime = indices.indexOf('milliseconds'),
        i_open = indices.indexOf('l_quartile'), f_open = indices.indexOf('n_l_quartile'),
        i_high = indices.indexOf('u_whisker'), f_high = indices.indexOf('n_u_whisker'),
        i_low = indices.indexOf('l_whisker'), f_low = indices.indexOf('n_l_whisker'),
        i_close = indices.indexOf('u_quartile'), f_close = indices.indexOf('n_u_quartile'),
        i_median = indices.indexOf('median'), f_median = indices.indexOf('n_median'),
        i_e_u_whisker = indices.indexOf('e_u_whisker'), f_e_u_whisker = indices.indexOf('n_e_u_whisker'),
        i_e_l_whisker = indices.indexOf('e_l_whisker'), f_e_l_whisker = indices.indexOf('n_e_l_whisker');

    // split the data set into ohlc and medians
    let ohlc = [],
        medians = [],
        e_u_whisker = [],
        e_l_whisker = [];

    for (let i = 0; i < source.data.length; i += 1) {

        ohlc.push({
            x: source.data[i][i_datetime],
            open: source.data[i][i_open], // percentage
            high: source.data[i][i_high],
            low: source.data[i][i_low],
            close: source.data[i][i_close],
            custom: {
                f_open: source.data[i][f_open], // frequency
                f_high: source.data[i][f_high],
                f_low: source.data[i][f_low],
                f_close: source.data[i][f_close]
            }
        });

        medians.push({
            x: source.data[i][i_datetime], // date
            y: source.data[i][i_median], // median, %
            name: source.data[i][f_median] // frequency
        });

        e_u_whisker.push({
            x: source.data[i][i_datetime], // the date
            y: source.data[i][i_e_u_whisker], // 0.99
            name: source.data[i][f_e_u_whisker]
        });

        e_l_whisker.push({
            x: source.data[i][i_datetime], // the date
            y: source.data[i][i_e_l_whisker], // 0.01
            name: source.data[i][f_e_l_whisker]
        });

    }

    return { ohlc, medians, e_u_whisker, e_l_whisker};

}

export default quantilesExtrinsic
