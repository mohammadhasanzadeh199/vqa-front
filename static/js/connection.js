websocket = new WebSocket(__websocket_url__);
websocket.onopen = function(evt) { console.log(evt); };
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt) {
    let geted_data = JSON.parse(evt.data);
    if (geted_data.type == "header"){
        setHeader(geted_data)
    } else {
        // syncPlay(geted_data);
        setEqualizers(geted_data);
        setCircular(geted_data);
        setNeon(geted_data);
        setVideoMOS(geted_data);
        setAudioMOS(geted_data);
    }
};
websocket.onerror = function(evt) { console.log(evt) };


var stored_data = [];


$(".video-container button").click(function (){
    $('video').attr("src",$(".video-container input").val())
    console.log("videourl:"+$(".video-container input").val());
    websocket.send("videourl:"+$(".video-container input").val());
});


function syncPlay(geted_data){
    let data = geted_data.data;
    stored_data.push(geted_data);
    // console.log(new Date() - new Date(current_fragment.time))
    let now = (new Date() - new Date(current_fragment.time))/1000+current_fragment.startPTS;
    console.log(now-data.timestamp)
    let selected_data = null;
    let selected_index = null;
    for ( let i = 0; i < stored_data.length; i++ ){
        let timestamp = stored_data[i].data.timestamp;
        // console.log(now-timestamp,now);
        // console.log(timestamp,now,now - __sync_play_ignore_time__[0])
        if ( timestamp >= now - __sync_play_ignore_time__[0] && timestamp <= now + __sync_play_ignore_time__[1] ){
            console.log("playable")
            if (selected_data == null){
                selected_data = stored_data[i];
                selected_index = i;
            }else if (Math.abs(now - selected_data.timestamp)>=Math.abs(now-timestamp)){
                selected_data = stored_data[i];
                selected_data = i;
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
    // console.log(stored_data.length)
    while(stored_data.length>__sync_play_stored_data_num__){
        stored_data_controle();
    }
}

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