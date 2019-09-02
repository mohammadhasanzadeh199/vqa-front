console.log("start")
websocket = new WebSocket("ws://192.168.43.37:8001/");
websocket.onopen = function(evt) { console.log(evt) };
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt) { 
    // console.log("json",JSON.parse(evt.data))
    setEqualizers(JSON.parse(evt.data));
    setCircular(JSON.parse(evt.data));
    setNeon(JSON.parse(evt.data));
};
websocket.onerror = function(evt) { console.log(evt) };