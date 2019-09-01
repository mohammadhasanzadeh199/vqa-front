let video_features = [
    {
        title: "Brightness",
        value: 42
    },
    {
        title: "Contrast",
        value: 61
    },
    {
        title: "Chroma",
        value: 88
    },
    {
        title: "Blockiness",
        value: 63
    },
    {
        title: "Blurriness",
        value: 15
    },
    {
        title: "Noise estimation",
        value: 58
    }
]




let options = {
    legend: {
        display:false,
    },
    responsive:true,
    title: {
        display: true,
        fontSize: 15,
        fontColor: 'white',
        text: 'some',
        position: 'bottom'
    },
    animation: {
        animateRotate: false
    },
    cutoutPercentage: 65,
    maintainAspectRatio:false,
    plugins: {
        doughnutlabel: {
            labels: [
            {
              text: '30%',
              font: {
                size: '14',
              },
              color: '#bbb'
            }
            ]
        }
}
};

for ( let i = 0 ; i < 6 ; i++ ){
    let chart = $(".video-features .source").clone();
    chart.removeClass("source");
    chart.insertAfter(".video-features .source");
    let canvas = chart.find("canvas");
    let ctx = canvas[0].getContext("2d");

    let data = {
        datasets: [
        {
            fill: true,
            backgroundColor: [ colors[Math.floor(video_features[i].value/10)],'#b0b0b0'],
            data: [video_features[i].value,100-video_features[i].value],
            borderColor:	['black', 'black'],
            borderWidth: [0,0],
            borderAlign:'inner'
        }
        ]
    }; 
    options.title.text = video_features[i].title;
    options.plugins.doughnutlabel.labels[0].text = video_features[i].value + "%";

    let myPieChart = new Chart(ctx, {
        labelAlign: 'center',
        type: 'doughnut',
        data: data,
        options: options
    });
    myPieChart.canvas.parentNode.style.height = '120px';
    myPieChart.canvas.parentNode.style.width = '120px';
}

