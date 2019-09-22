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

let video_features_setting = null;
let vf_colors = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];
let vf_pending_to_log = [];


function set_video_features_setting_obj(obj){
    video_features_setting = obj;
}


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
                backgroundColor: [ vf_map_to_color(vf_data[i].value,vf_data[i].name),'#b0b0b0'],
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
        vf_log_control(vf_data[i].value,vf_data[i].name)
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



function vf_map_to_color(value, name){
    let gradiant = [25,50,75];
    for (let i = 0; i< video_features_setting.length; i++){
        if (video_features_setting[i].name == name) {
            gradiant = video_features_setting[i].gradiant;
        }
    }
    if (value<gradiant[0]){
        return vf_colors[0];
    } else if (value<gradiant[1]){
        return vf_colors[1];
    } else if (value<gradiant[2]){
        return vf_colors[2];
    } else {
        return vf_colors[3];
    }
}


function vf_log_control(value , name){
    let treshold_value = 50;
    for (let i = 0; i< video_features_setting.length; i++){
        if (video_features_setting[i].name == name) {
            treshold_value = video_features_setting[i].value;
        }
    }
    let isPending = false;
    for (let i = 0; i< vf_pending_to_log.length; i++){
        if (vf_pending_to_log[i].name == name) {
            isPending = true;
            if (value < treshold_value|| (new Date() - new Date(vf_pending_to_log[i].start)) > 5000){
                eq_add_to_log(vf_pending_to_log[i].name,vf_pending_to_log[i].start,new Date());
            }
        }
    }
    if (!isPending && value > treshold_value){
        vf_pending_to_log.push({
            name:name,
            start: new Date()
        });
    }
}

function vf_add_to_log(name,start,end){
    let start_dt = new Date(start);
    let start_str = start_dt.getHours() + ":" + start_dt.getMinutes() + ":" + start_dt.getSeconds() + ":" + start_dt.getMilliseconds();
    let end_dt = new Date(end);
    let end_str = end_dt.getHours() + ":" + end_dt.getMinutes() + ":" + end_dt.getSeconds() + ":" + end_dt.getMilliseconds();
    let row = $(".log .source").clone();
    row.removeClass("source");
    row.find(".features").text(name);
    row.find(".start").text(start_str);
    row.find(".end").text(end_str);
    row.find(".date").text(start_dt.getFullYear()+"/"+(start_dt.getMonth()+1)+"/"+start_dt.getDate());
    row.find(".icon").attr("src","/static/pic/icon/"+vf_icon_finder(name));
    row.insertAfter(".log .source");
    for (let i = 0; i< vf_pending_to_log.length; i++){
        if (vf_pending_to_log[i].name == name) {
            vf_pending_to_log.splice(i, 1);
        }
    }
}


function vf_icon_finder(name){
    for (let i=0;i<__icon_packes__.length;i++){
        if (__icon_packes__[i].name == name){
            return __icon_packes__[i].value;
        }
    }
    return "Brightness.png";
}