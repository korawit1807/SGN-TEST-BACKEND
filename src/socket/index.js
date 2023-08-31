

module.exports = {
    getMessage: (client, count) => {
        const dataChart = [
            {
                id: 0,
                title: 'Page A',
                value: getRamdom(10, 100),
                color: "#c8303b"
            },
            {
                id: 1,
                title: 'Page B',
                value: getRamdom(10, 100),
                color: "#2c2c2c"
            },
            {
                id: 2,
                title: 'Page C',
                value: getRamdom(10, 100),
                color: "#3fc42d"
            }
        ]
        if(count === 3 ){
            dataChart.push({
                id: 3,
                title: 'Page D',
                value: getRamdom(10, 100),
                color: "#3fc42d"
            })
        }
        client.emit("message", dataChart)
    }
}

const getRamdom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}