// ------- data queue to store data for sync playing ------------------------------------------------------------------
var stored_data = [];


// ------- launch websocket connection --------------------------------------------------------------------------------
init_connection();


// ====================================================================================================================
// ------- websocket handler ------------------------------------------------------------------------------------------
// ====================================================================================================================
function init_connection(){
    websocket = new WebSocket(__websocket_url__);
    websocket.onopen = function(evt) { console.log(evt); };
    websocket.onclose = function(evt) { console.log(evt) };
    websocket.onmessage = function(evt) { websocket_onmessage_handler(evt) };
    websocket.onerror = function(evt) { console.log(evt) };
}

// ====================================================================================================================
// ------- websocket given data handler (check is header or log data) -------------------------------------------------
// ====================================================================================================================
function websocket_onmessage_handler(evt){
    let geted_data = JSON.parse(evt.data);
    if (geted_data.type == "header"){
        setHeader(geted_data)
    } else {
        syncPlay(geted_data);
        // setEqualizers(geted_data);
        // setCircular(geted_data);
        // setNeon(geted_data);
        // setVideoMOS(geted_data);
        // setAudioMOS(geted_data);
    }
}


// ====================================================================================================================
// ------- on start button click handler. need to send url to give data -----------------------------------------------
// ====================================================================================================================
$(".video-container button").click(function (){
    // $('video').attr("src",$(".video-container input").val())
    console.log("videourl:"+$(".video-container input").val());
    websocket.send("videourl:"+$(".video-container input").val());
});


// ====================================================================================================================
// ------- syncing algorithem, set data to view according to playing frame --------------------------------------------
// ====================================================================================================================
function syncPlay(geted_data){
    let data = geted_data.data;// log data
    stored_data.push(geted_data); // first need to push to data collection
    let now = (new Date() - new Date(current_fragment.time)) / current_fragment.duration * current_fragment.nb / data.frame_rate;
    progresive_pts = now;
    let selected_data = null;
    let selected_index = null;
    console.log("data",now,geted_data.data.timestamp);
    console.log("diff",now-geted_data.data.timestamp);
    for ( let i = 0; i < stored_data.length; i++ ){
        let timestamp = stored_data[i].data.timestamp;
        if ( timestamp >= now - __sync_play_ignore_time__[0] && timestamp <= now + __sync_play_ignore_time__[1] ){
            console.log("playable",now,timestamp)
            if (selected_data == null){
                selected_data = stored_data[i];
                selected_index = i;
            } else if (Math.abs(now - selected_data.timestamp) >= Math.abs(now-timestamp)){
                selected_data = stored_data[i];
                selected_index = i;
            }
        } else if (timestamp < now - __sync_play_ignore_time__[0]){
            stored_data.splice(i, 1);
        }
    }
    
    if ( selected_data != null ){
        setEqualizers(selected_data);
        setCircular(selected_data);
        setNeon(selected_data);
        setVideoMOS(selected_data);
        setAudioMOS(selected_data);
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