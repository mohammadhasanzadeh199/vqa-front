// ------- data queue to store data for sync playing ------------------------------------------------------------------
var stored_data = [];
var current_frame_rate = null;


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
        // console.log(geted_data);
        stored_data.push(geted_data); 
        current_frame_rate = geted_data.data.frame_rate;
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
