let equalizer_variant_colors = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];



function init_equalizer_setting(json) {
    $("#settingModal .equalizer-setting:not(.source)").remove();
    let eq_data = json.data.equalizer;
    for (let i = 0; i<eq_data.length;i++){
        let input = $("#settingModal .equalizer-setting.source").clone();
        input.removeClass("source");
        input.find(".h5").text(eq_data[i].name);
        input.find(".col-12 label").attr("for","tresholdVlaue"+i);
        input.find(".input-group input").attr("id","tresholdVlaue"+i);
        input.find(".equalizer-slider").attr("id", "equalizerSlider"+i);
        input.insertAfter("#settingModal .equalizer-setting.source");
        init_slider("equalizerSlider"+i)
    }
}


function init_video_features_setting(json){
    $("#settingModal .video-features-setting:not(.source)").remove();
    let vf_data = json.data.circular;
    for ( let i = 0; i<vf_data.length; i++){
        let input = $("#settingModal .video-features-setting.source").clone();
        input.removeClass("source");
        input.find("label").text(vf_data[i].name);
        input.insertAfter("#settingModal .video-features-setting.source");
    }

}


function init_slider(id) {
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