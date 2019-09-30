// ------- data queue to store data for sync playing ------------------------------------------------------------------
var stored_data = [];
// ------- boolean var to init player after getting date --------------------------------------------------------------
var first_data_recived = true;
// ------- user input url ---------------------------------------------------------------------------------------------
__stream_url__ = null;
// ------- launch websocket connection --------------------------------------------------------------------------------
// init_connection();


// ====================================================================================================================
// ------- websocket handler ------------------------------------------------------------------------------------------
// ====================================================================================================================
function init_connection(){
    websocket = new WebSocket(__websocket_url__);
    websocket.onopen = function(evt) { 
        $(".video-container .alert-danger").css("display","none");
        console.log("open")
        websocket.send("videourl:"+__stream_url__);
    };
    websocket.onclose = function(evt) { 
        init_connection();
    };
    websocket.onmessage = function(evt) {
        websocket_onmessage_handler(evt);
    };
    websocket.onerror = function(evt) {
        $(".video-container .alert-danger").text(__websocket_error_text__);
        $(".video-container .alert-danger").css("display","block");
    };
}


// ====================================================================================================================
// ------- websocket given data handler (check is header or log data) -------------------------------------------------
// ====================================================================================================================
function websocket_onmessage_handler(evt){
    let geted_data = JSON.parse(evt.data);
    if (geted_data.type == "header"){
        setHeader(geted_data)
    } else if (geted_data.type == "warning"){
        let warn_element = $(".video-container .alert-warning");
        warn_element.text(geted_data.message);
        warn_element.css("display","block");
        setTimeout(() => {
            warn_element.css("display","none");            
        }, __backend_warning_display_timeout__);
    }  else if (geted_data.type == "error"){
        let error_element = $(".video-container .alert-danger");
        error_element.text(geted_data.message);
        error_element.css("display","block");
        setTimeout(() => {
            error_element.css("display","none");            
        }, __backend_error_display_timeout__);
    } else {
        if (first_data_recived){
            initPlayer();
            first_data_recived = false;
        }
        console.log("recived",geted_data.data.time,stored_data.length);
        stored_data.push(geted_data); 
        if (inited_backend_time != "0"){
            delay_controll(geted_data);
        }
    }
}


// ====================================================================================================================
// ------- on start button click handler. need to send url to give data -----------------------------------------------
// ====================================================================================================================
$(".video-container button").click(function (){
    __stream_url__ = $(".video-container input").val();
    console.log("videourl:"+$(".video-container input").val());
    init_connection();
});
