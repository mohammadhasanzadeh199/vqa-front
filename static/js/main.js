var video = document.getElementById("video");

var current_fragment = {
    timestamp: null,
    time:null,
    startPTS:null,
    endPTS:null
}

var fragment_data = [];

var inited_pts = 0;
var progresive_pts = 0;
var video_delay = 0;
var current_play_data_timestamp = null;

var loaded_fragment_additional_data = [];

initPlayer()



function initPlayer() {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.on(Hls.Events.INIT_PTS_FOUND ,function(event,data){
            if (data.initPTS>0){
                inited_pts = progresive_pts = data.initPTS/90000;
            }else {
                inited_pts = progresive_pts = (data.initPTS + Math.pow(2,33))/90000;
            }
            console.log("triger",inited_pts,new Date())
        });
        hls.on(Hls.Events.FRAG_PARSING_DATA,function(event,data){  
            if (data.type == "video"){
                loaded_fragment_additional_data.push({
                    nb: data.nb,
                    sn: data.frag.sn
                });
            }
        });

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
            inited_pts = progresive_pts;
            for (let i=0; i < loaded_fragment_additional_data.length; i++){
                if ( loaded_fragment_additional_data[i].sn == data.frag.sn ) {
                    video_delay = 0;
                    current_fragment = {
                        time: new Date(),
                        duration:data.frag.duration,
                        nb: loaded_fragment_additional_data[i].nb
                    }
                    loaded_fragment_additional_data.splice(i,1);   
                    console.log(current_fragment,loaded_fragment_additional_data);
                }
            }
            
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.log("ERROR",event,data);
        });
    }
}


video.addEventListener('timeupdate',function(){
    syncPlay();
})


// ====================================================================================================================
// ------- syncing algorithem, set data to view according to playing frame --------------------------------------------
// ====================================================================================================================
function syncPlay(){
    let now = (new Date() - new Date(current_fragment.time) - video_delay)/ 1000 / current_fragment.duration * current_fragment.nb / current_frame_rate;
    now += inited_pts;
    progresive_pts = now;
    let selected_data = null;
    let selected_index = null;
    for ( let i = 0; i < stored_data.length; i++ ){
        let timestamp = stored_data[i].data.timestamp;
        if ( stored_data[i].data.timestamp < now ) {
            stored_data.splice(i, 1);
        } else if (selected_data == null || Math.abs(now - selected_data.data.timestamp) >= Math.abs(now-timestamp)){
            selected_data = stored_data[i];
            selected_index = i;
        }
    }
    if ( selected_data != null && current_play_data_timestamp !=  selected_data.data.timestamp){
        console.log("data",now,selected_data.data.timestamp);
        console.log("diff",now-selected_data.data.timestamp);
        current_play_data_timestamp = selected_data.timestamp;
        setEqualizers(selected_data);
        setCircular(selected_data);
        setNeon(selected_data);
        setVideoMOS(selected_data);
        setAudioMOS(selected_data);
        delay_controll(now,selected_data.timestamp);
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