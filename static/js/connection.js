console.log("start")
websocket = new WebSocket("ws://192.168.43.37:8022/");
websocket.onopen = function(evt) { console.log(evt) };
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt) { 
    console.log("data",evt);
    console.log("event",evt.data)
    console.log("json",JSON.parse(evt.data))
};
websocket.onerror = function(evt) { console.log(evt) };