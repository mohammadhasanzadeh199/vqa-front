let equalizer_variant_colors = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];


let defualt_setting = {
    equalizer: [
        {
            name:"Momentary Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"Integrated Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"ShortTerm Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"LRU Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"TPL Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"Phase Coherence",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"Noise Detection",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
    ],
    circular:[
        {
            name:"Brightness",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Contrast",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Chroma",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Blockiness",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Blurriness",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Noise estimation",
            value: 50,
            gradiant:[25,50,75]
        },
    ],
}

let saved_setting = localStorage.getItem("setting");
get_storage_handler();

function get_storage_handler(){
    if (saved_setting == null){
        saved_setting = defualt_setting;
        localStorage.setItem("setting",JSON.stringify(saved_setting));
    } else {
        saved_setting = JSON.parse(saved_setting);
    }
}

set_equalizer_setting_obj(saved_setting.equalizer);
set_video_features_setting_obj(saved_setting.equalizer);


function init_equalizer_setting(json) {
    $("#settingModal .equalizer-setting:not(.source)").remove();
    let eq_data = json.data.equalizer;
    for (let i = 0; i<eq_data.length;i++){
        let input = $("#settingModal .equalizer-setting.source").clone();
        input.removeClass("source");
        input.find(".h5").text(eq_data[i].name);
        input.find(".col-12 label").attr("for","equalizerTresholdVlaue"+i);
        input.find(".input-group input").attr("id","equalizerTresholdVlaue"+i);
        input.find(".equalizer-slider").attr("id", "equalizerSlider"+i);
        input.insertAfter("#settingModal .equalizer-setting.source");
        init_eq_slider("equalizerSlider"+i);
        set_equalizer_setting_value("equalizerTresholdVlaue"+i,"equalizerSlider"+i,eq_data[i].name);
    }
}


function init_video_features_setting(json){
    $("#settingModal .video-features-setting:not(.source)").remove();
    let vf_data = json.data.circular;
    for (let i = 0; i<vf_data.length;i++){
        let input = $("#settingModal .video-features-setting.source").clone();
        input.removeClass("source");
        input.find(".h5").text(vf_data[i].name);
        input.find(".col-12 label").attr("for","videoFeaturesTresholdVlaue"+i);
        input.find(".input-group input").attr("id","videoFeaturesTresholdVlaue"+i);
        input.find(".video-features-slider").attr("id", "videoFeaturesSlider"+i);
        input.insertAfter("#settingModal .video-features-setting.source");
        init_vf_slider("videoFeaturesSlider"+i);
        set_video_features_setting_value("videoFeaturesTresholdVlaue"+i,"videoFeaturesSlider"+i,vf_data[i].name)
    }

}


function set_video_features_setting_value(inputID,sliderID,name) {
    let setting = saved_setting.circular;
    let isFound = false;
    let updateSlider = document.getElementById(sliderID);
    for ( let i = 0; i < setting.length; i++ ){
        if (setting[i].name == name){
            isFound = true;
            $("#"+inputID).val(setting[i].value);
            updateSlider.noUiSlider.updateOptions({
                start: setting[i].gradiant
            });
        }
    }
    if (!isFound){
        $("#"+inputID).val(0.5);
        setting.push({
            name:name,
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        });
    }
    saved_setting.circular = setting;
    updateSlider.noUiSlider.on('change', function (start) {
        change_video_feature(name,start);
    });
    $("#"+inputID).change( function () {
        change_video_feature_treshold(name,Number($("#"+inputID).val()));
    });
}

function change_video_feature(name, start) {
    for (let i = 0; i< saved_setting.circular.length; i++ ){
        if (saved_setting.circular[i].name == name){
            saved_setting.circular[i].gradiant = [Number(start[0]),Number(start[1]),Number(start[2])];
        }
    }
}
function change_video_feature_treshold(name,value){
    for (let i = 0; i< saved_setting.circular.length; i++ ){
        if (saved_setting.circular[i].name == name){
            saved_setting.circular[i].value = value;
        }
    }
}



function set_equalizer_setting_value(inputID,sliderID,name) {
    let setting = saved_setting.equalizer;
    let isFound = false;
    let updateSlider = document.getElementById(sliderID);
    for ( let i = 0; i < setting.length; i++ ){
        if (setting[i].name == name){
            isFound = true;

            $("#"+inputID).val(setting[i].value);
            updateSlider.noUiSlider.updateOptions({
                start: setting[i].gradiant
            });
        }
    }
    if (!isFound){
        $("#"+inputID).val(0.5);
        setting.push({
            name:name,
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        });
    }
    saved_setting.equalizer = setting;
    updateSlider.noUiSlider.on('change', function (start) {
        change_equalizer(name,start);
    });
    $("#"+inputID).change( function () {
        change_equalizer_treshold(name,$("#"+inputID).val());
    });
}

function change_equalizer(name, start) {
    for (let i = 0; i< saved_setting.equalizer.length; i++ ){
        if (saved_setting.equalizer[i].name == name){
            console.log(start);
            saved_setting.equalizer[i].gradiant = [Number(start[0]),Number(start[1]),Number(start[2])];
        }
    }
}

function change_equalizer_treshold(name,value){
    for (let i = 0; i< saved_setting.equalizer.length; i++ ){
        if (saved_setting.equalizer[i].name == name){
            saved_setting.equalizer[i].value = Number(value);
        }
    }
}



function init_eq_slider(id) {
    let slider = document.getElementById(id);
    noUiSlider.create(slider, {

        range: {
            'min': 0,
            'max': 1
        },
        step: 0.01,
        start: [0.25,0.5,0.75],
        connect: [true,true,true,true],
        behaviour: 'tap-drag',
        tooltips: true,
    });
    let connect = slider.querySelectorAll('.noUi-connect');
    for (var i = 0; i < connect.length; i++) {
        connect[i].style.backgroundColor=equalizer_variant_colors[i] ;
    }
}

function init_vf_slider(id) {
    let slider = document.getElementById(id);
    noUiSlider.create(slider, {

        range: {
            'min': 0,
            'max': 100
        },
        step: 1,
        start: [25,50,75],
        connect: [true,true,true,true],
        behaviour: 'tap-drag',
        tooltips: true,
    });
    let connect = slider.querySelectorAll('.noUi-connect');
    for (var i = 0; i < connect.length; i++) {
        connect[i].style.backgroundColor=equalizer_variant_colors[i] ;
    }
}



$("#settingModal .modal-footer button.save").click(function(){
    localStorage.setItem("setting",JSON.stringify(saved_setting));
    set_equalizer_setting_obj(saved_setting.equalizer);
    set_video_features_setting_obj(saved_setting.circular);
    $('#settingModal').modal('hide');
})


$('#settingModal').on('hidden.bs.modal', function (e) {
    saved_setting = localStorage.getItem("setting");
    saved_setting = JSON.parse(saved_setting);
    init_equalizer_setting(current_data);
    init_video_features_setting(current_data);
});

$("#areYouSure .reset").click(function(){
    saved_setting = defualt_setting;
    localStorage.setItem("setting",JSON.stringify(defualt_setting));
    init_equalizer_setting(current_data);
    init_video_features_setting(current_data);
})
 