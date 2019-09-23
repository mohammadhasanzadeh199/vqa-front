// ------------- video player element --------------------------------------------------------------------------------
var video = document.getElementById("video");
// ------------- current fragment data (need to calculate current time base on backend clock) ------------------------
var current_fragment = {
    timestamp: null,
    time:null,
    startPTS: 0,
    endPTS:0
}
// ------------- init pts given by hls.js on player init --------------------------------------------------------------
var inited_pts = 0;
// ------------- player pause time duration (need to calculate current time base on backend clock) --------------------
var video_delay = 0;
// ------------- current shown data timestamp (need to avoid play faster than incoming data rate) ---------------------
var current_play_data_timestamp = null;
// ------------- inited backend time (time of same timstamp in backend. syncing base) ---------------------------------
var inited_backend_time = "0";


// ====================================================================================================================
// ------- syncing algorithem, set data to view according to playing frame --------------------------------------------
// ====================================================================================================================
function initPlayer() {
    if (Hls.isSupported()) {
        var hls = new Hls();

        // calculate syncing base time ..................................................................
        hls.on(Hls.Events.INIT_PTS_FOUND ,function(event,data){
            // handle negetive pts ......................................................................
            if (data.initPTS>0){
                inited_pts = progresive_pts = data.initPTS/90000;
            }else {
                inited_pts = progresive_pts = (data.initPTS + Math.pow(2,33))/90000;
            }
            // find nearest pts from data and calc syncing base time ....................................
            let pts_iterval = setInterval(function(){
                // find nearest pts from data ...........................................................
                let selected_data = null;
                for ( let i = 0; i < stored_data.length; i++ ){
                    let timestamp = stored_data[i].data.timestamp;
                    if (selected_data == null || Math.abs(inited_pts - selected_data.data.timestamp) >= Math.abs(inited_pts - timestamp)){
                        selected_data = stored_data[i];
                    }
                }
                if (selected_data != null) {
                    // if front delay detected, do again to shifting init pts ...........................
                    if (selected_data.data.timestamp - inited_pts >= 1 ){
                        $(".video-container .alert-primary").text(__init_pts_findig_text__);
                        $(".video-container .alert-primary").css("display","block");
                        console.log("front delay",selected_data.data.timestamp - inited_pts);
                        clearInterval(pts_iterval);
                        setTimeout (function(){
                            initPlayer();
                        },5000)
                    } 
                    // if backend delay detected, do again to have more data .............................
                    else if (selected_data.data.timestamp - inited_pts <= -1) {
                        $(".video-container .alert-primary").text(__init_pts_findig_text__);
                        $(".video-container .alert-primary").css("display","block");
                        console.log("back delay",selected_data.data.timestamp - inited_pts);
                    } 
                    // if every thing ok, you find syncing base time .....................................                  
                    else {
                        $(".video-container .alert-primary").css("display","none");
                        clearInterval(pts_iterval);                        
                        console.log("triger",data.initPTS,selected_data.data.timestamp - inited_pts, inited_backend_time);
                        inited_backend_time = selected_data.data.time;
                    }
                }
            },5000);
        });


        // bind element and hls together ...............................................................
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

        // on current fragment change event. collecting fragment needed params ..........................
        hls.on(Hls.Events.FRAG_CHANGED,function(event,data){
            video_delay = 0;
            current_fragment = {
                startPTS: current_fragment.endPTS,
                endPTS:current_fragment.endPTS + data.frag.duration*1000,
                time: (new Date()).valueOf()
            }
            console.log(current_fragment)
        });

        // on hls error .................................................................................
        hls.on(Hls.Events.ERROR, function (event, data) {
            console.log("ERROR",event,data);
        });
    }
}



// ====================================================================================================================
// ------- show data every moment -------------------------------------------------------------------------------------
// ====================================================================================================================
video.addEventListener('timeupdate',function(e){
    if (inited_backend_time!="0"){
        syncPlay();
    }
})


// ====================================================================================================================
// ------- syncing algorithem, set data to view according to playing frame --------------------------------------------
// ====================================================================================================================
function syncPlay(){
    // calculate time base on syncing base time ..........................................................
    let now = current_fragment.startPTS + (new Date()).valueOf() - current_fragment.time - video_delay + Number(inited_backend_time);
    // remove expired data from data queue ...............................................................
    let selected_data = null;
    let selected_index = null;
    for ( let i = 0; i < stored_data.length; i++ ){
        if ( stored_data[i].data.time < now ) {
            stored_data.splice(i, 1);
            i--;
        }
    }
    // find nearest data to this moment ..................................................................
    for ( let i = 0; i < stored_data.length; i++ ){
        let time = stored_data[i].data.time;
        if (selected_data == null || Math.abs(now - selected_data.data.time) >= Math.abs(now - time)){
            selected_data = stored_data[i];
            selected_index = i;
        }
    }
    // show data if is time to show ......................................................................
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
        stored_data.splice(selected_index, 1);
    }
    // remove first data if length of queue is more than capacity ........................................
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


// ====================================================================================================================
// ------- queue control, delete if is more than certain size ---------------------------------------------------------
// ====================================================================================================================
let diff_arr = [];
function delay_controll(geted_data){
    // calculate time base on syncing base time ..........................................................
    let client_ts = current_fragment.startPTS + (new Date()).valueOf() - current_fragment.time - video_delay + Number(inited_backend_time);
    // collect data until fill all capacity ..............................................................
    if (diff_arr.length < __delay_estimate_sample_num__ ) {
        console.log(diff_arr.length,client_ts - geted_data.data.time)
        diff_arr.push(client_ts - geted_data.data.time);
    }
    // if all data collect, now calculate delay ..........................................................
    else {
        // calculate mean and std value of data ..........................................................
        let result = statistics(diff_arr);
        console.log("start shifting .....................................................")
        console.log("result",result);
        let mean = result[0];
        let std = result[1];
        diff_arr = [];
        // if delay is not ignorable, puase video ........................................................
        if (mean > Math.abs(__delay_estimate_mean_ignore__) && std < Math.abs(__delay_estimate_std_ignore__)){
            console.log("need to shift ...................................................")
            video_delay = mean + __const_delay_value__ ;
            video.pause();
            let interval_counter =  Math.floor(video_delay/1000);;
            $(".video-container .alert-warning").css("display","block");
            let sync_interval = setInterval(function(){
                if (interval_counter<0){
                    clearInterval(sync_interval);
                    $(".video-container .alert-warning").css("display","none");
                } else {
                    $(".video-container .alert-warning").text("Syncing video and data. please wait "+ interval_counter + " seconds ...")
                    interval_counter --;
                }
            },1000);
            setTimeout(() => {
                video.play();
            },  video_delay  );
        } 
        // if front has so mutch delay show message ......................................................
        else if ( mean < -Math.abs( __front_delay_estimate_mean_ignore__ ) ){
            $(".video-container .alert-warning").text("Your network connection is poor ...");
            $(".video-container .alert-warning").css("display","block");
            setTimeout(function(){
                $(".video-container .alert-warning").css("display","none");
            },3000)
        }
    }
}



// ====================================================================================================================
// ------- statistics calculation -------------------------------------------------------------------------------------
// ====================================================================================================================
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
    std = Math.sqrt(std) / arr.length;
    return [mean, std];
}