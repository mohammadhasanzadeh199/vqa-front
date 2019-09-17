var video = document.getElementById("video");

var current_fragment = {
    timestamp: null,
    time:null,
    startPTS: 0,
    endPTS:0
}

var fragment_data = [];

var inited_pts = 0;
var video_delay = 0;
var current_play_data_timestamp = null;
var inited_backend_time = null;

var loaded_fragment_additional_data = [];


function initPlayer() {
    if (Hls.isSupported()) {
        var hls = new Hls({});
        hls.on(Hls.Events.INIT_PTS_FOUND ,function(event,data){
            if (data.initPTS>0){
                inited_pts = progresive_pts = data.initPTS/90000;
            }else {
                inited_pts = progresive_pts = (data.initPTS + Math.pow(2,33))/90000;
            }
            let selected_data = null;
            for ( let i = 0; i < stored_data.length; i++ ){
                let timestamp = stored_data[i].data.timestamp;
                if (selected_data == null || Math.abs(inited_pts - selected_data.data.timestamp) >= Math.abs(inited_pts - timestamp)){
                    selected_data = stored_data[i];
                }
            }
            if (selected_data != null) {
                inited_backend_time = selected_data.data.time;
                console.log("triger",data.initPTS,selected_data.data.timestamp - inited_pts, inited_backend_time);
            }
        });

        // hls.on(Hls.Events.FRAG_PARSING_DATA,function(event,data){  
        //     if (data.type == "video"){
        //         loaded_fragment_additional_data.push({
        //             nb: data.nb,
        //             sn: data.frag.sn
        //         });
        //     }
        // });


        // bind them together
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function() {
            console.log("video and hls.js are now bound together !");
            hls.loadSource(__stream_url__);
            hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
                console.log(
                    "manifest loaded, found " +
                        data.levels.length +
                        " quality level",data
                );
            });
        });

        hls.on(Hls.Events.FRAG_CHANGED,function(event,data){
            video_delay = 0;
            current_fragment = {
                startPTS: current_fragment.endPTS,
                endPTS:current_fragment.endPTS + data.frag.duration*1000,
                time: (new Date()).valueOf()
            }
            console.log(current_fragment)
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.log("ERROR",event,data);
        });
    }
}

video.addEventListener('timeupdate',function(e){
    // console.log(video.captureStream().getVideoTracks()[0].getSettings().frameRate)
    syncPlay();
})


// ====================================================================================================================
// ------- syncing algorithem, set data to view according to playing frame --------------------------------------------
// ====================================================================================================================
// console.log(39317.19059528302-39395.86072173524)
// console.log(new Date("Mon Sep 16 2019 06:17:40 GMT-0700 (Pacific Daylight Time)")-new Date("Mon Sep 16 2019 06:19:00 GMT-0700 (Pacific Daylight Time)"))
// console.log(39413.924536454855-39602.06438403859)
// console.log(new Date("Mon Sep 16 2019 06:19:23 GMT-0700 (Pacific Daylight Time)")-new Date("Mon Sep 16 2019 06:22:32 GMT-0700 (Pacific Daylight Time)"))
// console.log(39673.52685581395-40008.19439546027)
// console.log(new Date("Mon Sep 16 2019 06:23:44 GMT-0700 (Pacific Daylight Time)")-new Date('Mon Sep 16 2019 06:29:23 GMT-0700 (Pacific Daylight Time)'))
// console.log("rrrrrrrrrrr");
// console.log((3143729332- 3134860372)/(1568730925223-1568730821714)*1000);
// console.log((3265196932- 3250760932)/(1568732277966-1568732116226)*1000);
// console.log((-2985513952+ 2998947712)/(1568732567627-1568732411686)*1000);

function syncPlay(){
    console.log(current_fragment.startPTS,(new Date()).valueOf() - current_fragment.time, inited_backend_time)
    let now = current_fragment.startPTS + (new Date()).valueOf() - current_fragment.time - video_delay + Number(inited_backend_time);
    let selected_data = null;
    let selected_index = null;
    for ( let i = 0; i < stored_data.length; i++ ){
        if ( stored_data[i].data.time < now ) {
            stored_data.splice(i, 1);
            i--;
        }
    }
    for ( let i = 0; i < stored_data.length; i++ ){
        let time = stored_data[i].data.time;
        if (selected_data == null || Math.abs(now - selected_data.data.time) >= Math.abs(now - time)){
            selected_data = stored_data[i];
            selected_index = i;
        }
    }
    if ( selected_data != null && current_play_data_timestamp !=  selected_data.data.timestamp){
        console.log("data",now,selected_data.data.time);
        console.log("diff",now-selected_data.data.time);
        console.log("size",stored_data.length);
        current_play_data_timestamp = selected_data.timestamp;
        setEqualizers(selected_data);
        setCircular(selected_data);
        setNeon(selected_data);
        setVideoMOS(selected_data);
        setAudioMOS(selected_data);
        // delay_controll(now,selected_data.timestamp);
        stored_data.splice(selected_index, 1);
    }
    while(stored_data.length>__sync_play_stored_data_num__){
        stored_data_controle();
    }
}


// ====================================================================================================================
// ------- queue control, delete if is more than certain size ---------------------------------------------------------
// ====================================================================================================================
function stored_data_controle(){
    let selected_index = null;
    for ( let i = 0; i < stored_data.length; i++ ){
        if (selected_index == null || stored_data[i].timestamp<stored_data[selected_index].timestamp){
            selected_index = i;
        }
    }
    if (selected_index != null){
        stored_data.splice(selected_index, 1);
    }
}



let diff_arr = [];
function delay_controll(client_ts,server_ts){
    if (diff_arr < __delay_estimate_sample_num__ ) {
        diff_arr.push(client_ts-server_ts);
    } else {
        let result = statistics(diff_arr);
        let mean = result[0];
        let std = result[1];
        if (mean > Math.abs(__delay_estimate_mean_ignore__) && std < Math.abs(__delay_estimate_std_ignore__)){
            video.pause();
            diff_arr = [];
            video_delay = ( mean - __fix_delay__ ) * 1000;
            setTimeout(() => {
                video.play();
            },  ( mean - __fix_delay__ ) * 1000);
        }
    }
}

function statistics( arr ){
    let sum = 0;
    for (let i = 0; i<arr.length; i++ ){
        sum += arr[i];
    }
    let mean = sum / arr.length;
    let std = 0
    for (let i = 0; i<arr.length; i++ ){
        std += Math.pow( arr[i] - mean , 2 );
    }
    std = std / arr.length;
    return [mean, std];
}



function fake_render(){
    $("#fake_video").remove();
    let element = $("<video autoplay ></video>");
    element.attr("id","fake_video");
    element.css({
        "display":"none"
    });
    $('body').append(element);
    let fake_video = document.getElementById("fake_video");
    let fake_hls = new Hls({maxBufferLength:0});
    fake_hls.on(Hls.Events.INIT_PTS_FOUND ,function(event,data){
        console.log("pts",data.initPTS/90000,(new Date()).valueOf()/1000);
    });
    fake_hls.attachMedia(fake_video);
    fake_hls.on(Hls.Events.MEDIA_ATTACHED, function() {
        // console.log("video and hls.js are now bound together !");
        fake_hls.loadSource(__stream_url__);
    });
}