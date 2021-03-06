// ------- pie charts defualt config ----------------------------------------------------------------------------------
let options = {
    legend: {
        display:false,
    },
    tooltips: {
        enabled: false
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
// ------- pie charts object and selector -----------------------------------------------------------------------------
let vf_charts = [];
// ------- video features setting (set from setting.js) ---------------------------------------------------------------
let video_features_setting = null;
// ------- pendig data waiting to decrease to log ---------------------------------------------------------------------
let vf_pending_to_log = [];


// =============================================================================================================
// ============ setting object setter ==========================================================================
// =============================================================================================================
function set_video_features_setting_obj(obj){
    video_features_setting = obj;
}



// =============================================================================================================
// ============ set video features data to charts ==============================================================
// =============================================================================================================
function setCircular(json) {
    let vf_data = json.data.circular;
    for ( let i = 0 ; i < vf_data.length ; i++ ){
        let exist = -1;
        // find if chart was created ..................................................................
        for (let j = 0; j<vf_charts.length;j++){
            if (vf_charts[j].name == vf_data[i].name){
                exist = j;
                break;
            }
        }
        // if not created yet ..........................................................................
        if (exist == -1){
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
            vf_charts.push({
                name: vf_data[i].name,
                chart: myPieChart,
                element: chart
            });
        } 
        // else just update exist one ..................................................................        
        else {
            let chart = vf_charts[exist].chart;
            chart.data.datasets[0] = {
                fill: true,
                backgroundColor: [ vf_map_to_color(vf_data[i].value,vf_data[i].name),'#b0b0b0'],
                data: [Number(vf_data[i].value),100-vf_data[i].value],
                borderColor:	['black', 'black'],
                borderWidth: [0,0],
                borderAlign:'inner'
            }
            chart.options.title.text = vf_data[i].name;
            chart.options.plugins.doughnutlabel.labels[0].text = vf_data[i].value + "%";
            chart.update();
        }
        vf_log_control(vf_data[i].value,vf_data[i].name)
    }
    // remove exist chart if is not exist in log data ...................................................
    for ( let i = 0 ; i < vf_charts.length ; i++ ){
        let contain = false;
        for (let j = 0; j<vf_data.length; j++) {
            if (vf_charts[i].name == vf_data[j].name){
                contain = true;
                break;
            }
        }
        if (!contain) {
            vf_charts[i].element.remove();
            vf_charts.splice(i,1);
            i--;
        }
    
    }
}



// =============================================================================================================
// ============ set neon data ==================================================================================
// =============================================================================================================
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



// =============================================================================================================
// ============ set video mos from geted data ==================================================================
// =============================================================================================================
function setVideoMOS(json){
    let mos = json.data.video_mos;
    $(".video-features .top-part .header .second").text("MOS: "+mos);
}



// =============================================================================================================
// ============ map value to color inorder to setting ==========================================================
// =============================================================================================================
function vf_map_to_color(value, name){
    let gradiant = [25,50,75];
    for (let i = 0; i< video_features_setting.length; i++){
        if (video_features_setting[i].name == name) {
            gradiant = video_features_setting[i].gradiant;
        }
    }
    if (value<gradiant[0]){
        return __vf_colors__[0];
    } else if (value<gradiant[1]){
        return __vf_colors__[1];
    } else if (value<gradiant[2]){
        return __vf_colors__[2];
    } else {
        return __vf_colors__[3];
    }
}



// =============================================================================================================
// ============ control if need to loging in log box ===========================================================
// =============================================================================================================
function vf_log_control(value , name){
    // defualt treshold value ..............................................................
    let treshold_value = 50;
    // find treshold value from setting ....................................................
    for (let i = 0; i< video_features_setting.length; i++){
        if (video_features_setting[i].name == name) {
            treshold_value = video_features_setting[i].value;
        }
    }
    let isPending = false;
    // check all log collection array ......................................................
    for (let i = 0; i< vf_pending_to_log.length; i++){
        if (vf_pending_to_log[i].name == name) {
            isPending = true;
            if (value < treshold_value ){
                vf_add_to_log(vf_pending_to_log[i].name,vf_pending_to_log[i].start,new Date());
            } else if ((new Date() - new Date(vf_pending_to_log[i].start)) > __log_pending_time__){
                let end = new Date()
                vf_add_to_log(vf_pending_to_log[i].name,vf_pending_to_log[i].start,end);
                vf_pending_to_log.push({
                    name:name,
                    start: end
                });
            }
        }
    }
    // if is not in collection array add it .................................................
    if (!isPending && value > treshold_value){
        vf_pending_to_log.push({
            name:name,
            start: new Date()
        });
    }
}


// ====================================================================================================================
// ======= add data to log box of view. called in vf_log_contorl ======================================================
// ====================================================================================================================
function vf_add_to_log(name,start,end){
    // generate log table fields ..............................................................
    let start_dt = new Date(start);
    let start_str = start_dt.getHours() + ":" + start_dt.getMinutes() + ":" + start_dt.getSeconds() + ":" + start_dt.getMilliseconds();
    let end_dt = new Date(end);
    let end_str = end_dt.getHours() + ":" + end_dt.getMinutes() + ":" + end_dt.getSeconds() + ":" + end_dt.getMilliseconds();
    // set export interval log ................................................................
    if (interval_saved_log_list.length <= __export_log_interval_limit__){
        interval_saved_log_list.push([name,start,end,start_dt.getFullYear()+"/"+(start_dt.getMonth()+1)+"/"+start_dt.getDate()])
    }
    // set variables to log table fields ......................................................
    let row = $(".log .source").clone();
    row.removeClass("source");
    row.find(".features").text(name);
    row.find(".start").text(start_str);
    row.find(".end").text(end_str);
    row.find(".date").text(start_dt.getFullYear()+"/"+(start_dt.getMonth()+1)+"/"+start_dt.getDate());
    row.find(".icon").attr("src","/static/pic/icon/"+vf_icon_finder(name));
    row.insertAfter(".log .source");
    // remove added log from pending queue .....................................................
    for (let i = 0; i< vf_pending_to_log.length; i++){
        if (vf_pending_to_log[i].name == name) {
            vf_pending_to_log.splice(i, 1);
        }
    }
    // remove last one if is more than limit ...................................................
    if ($(".log .scrolable tr:not(.source)").length > __log_box_limit__){
        $(".log .scrolable tr:last-child").remove();
    }
}


// ====================================================================================================================
// ======= video feature log box icon finder. called in vf_add_to_log function ========================================
// ====================================================================================================================
function vf_icon_finder(name){
    for (let i=0;i<__icon_packes__.length;i++){
        if (__icon_packes__[i].name == name){
            return __icon_packes__[i].value;
        }
    }
    return "Brightness.png";
}



// ====================================================================================================================
// ======= mos display by product setting =============================================================================
// ====================================================================================================================
if (!__video_features_MOS__){
    $(".video-features .top-part .header .second").css("display","none");
}