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

// for ( let i = 0 ; i < 6 ; i++ ){
//     let chart = $(".video-features .source").clone();
//     chart.removeClass("source");
//     chart.insertAfter(".video-features .source");
//     let canvas = chart.find("canvas");
//     let ctx = canvas[0].getContext("2d");

//     let data = {
//         datasets: [
//         {
//             fill: true,
//             backgroundColor: [ colors[Math.floor(video_features[i].value/10)],'#b0b0b0'],
//             data: [video_features[i].value,100-video_features[i].value],
//             borderColor:	['black', 'black'],
//             borderWidth: [0,0],
//             borderAlign:'inner'
//         }
//         ]
//     };

//     let myPieChart = new Chart(ctx, {
//         labelAlign: 'center',
//         type: 'doughnut',
//         data: data,
//         options: options
//     });
// }


function setCircular(json) {
    $(".video-features .chart-container:not(.source)").remove();
    let vf_data = json.data.circular;
    for ( let i = 0 ; i < vf_data.length ; i++ ){
        let chart = $(".video-features .source").clone();
        chart.removeClass("source");
        chart.insertAfter(".video-features .source");
        let canvas = chart.find("canvas");
        let ctx = canvas[0].getContext("2d");
        let data = {
            datasets: [
            {
                fill: true,
                backgroundColor: [ colors[Math.floor(vf_data[i].value/10)],'#b0b0b0'],
                data: [vf_data[i].value,100-vf_data[i].value],
                borderColor:	['black', 'black'],
                borderWidth: [0,0],
                borderAlign:'inner'
            }
            ]
        }; 
        options.title.text = vf_data[i].name;
        options.plugins.doughnutlabel.labels[0].text = vf_data[i].value + "%";
    
        let myPieChart = new Chart(ctx, {
            labelAlign: 'center',
            type: 'doughnut',
            data: data,
            options: options
        });
        myPieChart.canvas.parentNode.style.height = '120px';
        myPieChart.canvas.parentNode.style.width = '120px';
    }

}


function setNeon(json){
    let n_data = json.data;
    $(".video-features .bottom-part .filter").removeClass("active");
    $(".video-features .bottom-part .neon-text").removeClass("neon-text-active");
    if (n_data.audio_clipping == 1){
        $(".video-features .bottom-part .audio-cliping .filter").addClass("active");
        $(".video-features .bottom-part .audio-cliping .neon-text").addClass("neon-text-active");
    }
    if (n_data.black_frame == 1){
        $(".video-features .bottom-part .black-frame .filter").addClass("active");
        $(".video-features .bottom-part .black-frame .neon-text").addClass("neon-text-active");
    }
    if (n_data.color_gamut == 1){
        $(".video-features .bottom-part .color-gamut .filter").addClass("active");
        $(".video-features .bottom-part .color-gamut .neon-text").addClass("neon-text-active");
    }
    if (n_data.frame_freezing == 1){
        $(".video-features .bottom-part .frame-freezing .filter").addClass("active");
        $(".video-features .bottom-part .frame-freezing .neon-text").addClass("neon-text-active");
    }
    if (n_data.mute_detection == 1){
        $(".video-features .bottom-part .mute-detection .filter").addClass("active");
        $(".video-features .bottom-part .mute-detection .neon-text").addClass("neon-text-active");
    }
    if (n_data.pillar_boxing == 1){
        $(".video-features .bottom-part .boxing .filter").addClass("active");
        $(".video-features .bottom-part .boxing .neon-text").addClass("neon-text-active");
    }
}


function setVideoMOS(json){
    let mos = json.data.video_mos;
    $(".video-features .top-part .header .second").text("MOS: "+mos);
}