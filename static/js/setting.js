let equalizer_variant_colors = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];

let storage_default_setting = localStorage.getItem("default_setting");
let saved_setting = localStorage.getItem("setting");
get_storage_handler();

function get_storage_handler(){
    if (saved_setting == null){
        saved_setting = __defualt_setting__;
        localStorage.setItem("setting",JSON.stringify(saved_setting));
        localStorage.setItem("default_setting",JSON.stringify(__defualt_setting__));
        console.log("1111111",saved_setting);
    } else {
        saved_setting = JSON.parse(saved_setting);
        console.log("22222",saved_setting);
    }
    if ( JSON.stringify(__defualt_setting__) != storage_default_setting ) {
        get_changes(saved_setting.circular,__defualt_setting__.circular);
        get_changes(saved_setting.equalizer,__defualt_setting__.equalizer);
        localStorage.setItem("default_setting",JSON.stringify(__defualt_setting__));
        localStorage.setItem("setting",JSON.stringify(saved_setting));
        console.log("33333333",saved_setting)
    }
}


function get_changes() {
    for(let i = 0; i < __defualt_setting__.circular.length; i++ ) {
        let isFind = false;
        for ( let j=0; j<saved_setting.circular.length;j++){
            if (saved_setting.circular[j].id == __defualt_setting__.circular[i].id) {
                saved_setting.circular[j].name = __defualt_setting__.circular[i].name;
                if (!saved_setting.circular[j].gradiant_edit){
                    saved_setting.circular[j].gradiant = __defualt_setting__.circular[i].gradiant;
                }
                if (!saved_setting.circular[j].treshold_edit){
                    saved_setting.circular[j].value = __defualt_setting__.circular[i].value;
                }
                isFind = true;
                break;
            }
        }
        if (!isFind){
            saved_setting.circular.push(__defualt_setting__.circular[i])
        }
    }
    for(let i = 0; i < saved_setting.circular.length; i++ ) {
        let isFind = false;
        for (let j=0; j< __defualt_setting__.circular.length;j++){
            if (saved_setting.circular[i].id == __defualt_setting__.circular[j].id){
                isFind = true;
                break;
            }
        }
        if (!isFind){
            saved_setting.circular.splice(i,1);
            i--;
        }
    }


    for(let i = 0; i < __defualt_setting__.equalizer.length; i++ ) {
        let isFind = false;
        for ( let j=0; j<saved_setting.equalizer.length;j++){
            if (saved_setting.equalizer[j].id == __defualt_setting__.equalizer[i].id) {
                saved_setting.equalizer[j].name = __defualt_setting__.equalizer[i].name;
                if (!saved_setting.equalizer[j].gradiant_edit){
                    saved_setting.equalizer[j].gradiant = __defualt_setting__.equalizer[i].gradiant;
                }
                if (!saved_setting.equalizer[j].treshold_edit){
                    saved_setting.equalizer[j].value = __defualt_setting__.equalizer[i].value;
                }
                isFind = true;
                break;
            }
        }
        if (!isFind){
            saved_setting.equalizer.push(__defualt_setting__.equalizer[i])
        }
    }
    for(let i = 0; i < saved_setting.equalizer.length; i++ ) {
        let isFind = false;
        for (let j=0; j< __defualt_setting__.equalizer.length;j++){
            if (saved_setting.equalizer[i].id == __defualt_setting__.equalizer[j].id){
                isFind = true;
                break;
            }
        }
        if (!isFind){
            saved_setting.equalizer.splice(i,1);
            i--;
        }
    }
}


set_equalizer_setting_obj(saved_setting.equalizer);
set_video_features_setting_obj(saved_setting.circular);
init_equalizer_setting(saved_setting);
init_video_features_setting(saved_setting);

function init_equalizer_setting(json) {
    $("#settingModal .equalizer-setting:not(.source)").remove();
    let eq_data = json.equalizer;
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
    let vf_data = json.circular;
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
            saved_setting.circular[i].gradiant_edit = true;
        }
    }
}
function change_video_feature_treshold(name,value){
    for (let i = 0; i< saved_setting.circular.length; i++ ){
        if (saved_setting.circular[i].name == name){
            saved_setting.circular[i].value = value;
            saved_setting.circular[i].treshold_edit = true;
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
            saved_setting.equalizer[i].gradiant_edit = true;
        }
    }
}

function change_equalizer_treshold(name,value){
    for (let i = 0; i< saved_setting.equalizer.length; i++ ){
        if (saved_setting.equalizer[i].name == name){
            saved_setting.equalizer[i].value = Number(value);
            saved_setting.equalizer[i].treshold_edit = true;
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
    init_equalizer_setting(saved_setting);
    init_video_features_setting(saved_setting);
});

$("#areYouSure .reset").click(function(){
    saved_setting = __defualt_setting__;
    localStorage.setItem("setting",JSON.stringify(__defualt_setting__));
    init_equalizer_setting(saved_setting);
    init_video_features_setting(saved_setting);
})
 

if (!__video_features_MOS__){
    $(".video-features .top-part .header .second").css("display","none");
}
if (!__audio_features_MOS__){
    $(".equalizer .equalizer-header .second").css("display","none");
}