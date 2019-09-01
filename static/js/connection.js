console.log("start")
websocket = new WebSocket("ws://192.168.43.239:8000/");
websocket.onopen = function(evt) { console.log(evt) };
websocket.onclose = function(evt) { console.log(evt) };
websocket.onmessage = function(evt) { console.log(evt) };
websocket.onerror = function(evt) { console.log(evt) };