console.log("start")
websocket = new WebSocket("ws://192.168.43.37:8059/");
websocket.onopen = function(evt) { console.log(evt); };
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt) {
    
    let geted_data = JSON.parse(evt.data);
    if (geted_data.type == "header"){
        setHeader(geted_data)
    } else {
        setEqualizers(geted_data);
        setCircular(geted_data);
        setNeon(geted_data);
        setVideoMOS(geted_data);
        setAudioMOS(geted_data);
    }
};
websocket.onerror = function(evt) { console.log(evt) };


$(".video-container button").click(function (){
    console.log("videourl:"+$(".video-container input").val());
    websocket.send("videourl:"+$(".video-container input").val());
})