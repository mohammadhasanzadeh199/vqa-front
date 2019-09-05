console.log("start")
websocket = new WebSocket("ws://192.168.43.37:8006/");
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
    $('video').attr("src","https://as1.cdn.asset.aparat.com/aparat-video/ac05f607f9fb63b8c63d992d2006e7dc16651944-480p__95366.mp4")
    console.log("videourl:"+$(".video-container input").val());
    websocket.send("videourl:"+$(".video-container input").val());
})