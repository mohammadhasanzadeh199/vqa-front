var video = document.getElementById("video");



var current_fragment = {
    timestamp: null,
    time:null,
    startPTS:null,
    endPTS:null
}
var current_fragment_timestamp = null;
var current_fragment_time = null;
var current_fragment_startPTS = null;
var current_fragment_endPTS = null;

var fragment_data = [];

var inited_pts = 0;

var temp_date = new Date();

// initPlayer()



function initPlayer() {
    if (Hls.isSupported()) {
        let frame_num = 0;
        var hls = new Hls();
        hls.on(Hls.Events.LEVEL_PTS_UPDATED,function(event,data){
            console.log('level',data)
        })
        hls.on(Hls.Events.INIT_PTS_FOUND ,function(event,data){
            inited_pts = data.initPTS/86400;
            console.log("triger",inited_pts,new Date())
            console.log(new Date("Tue Sep 10 2019 23:36:12 GMT-0700 (Pacific Daylight Time)")-new Date("Tue Sep 10 2019 23:37:30 GMT-0700 (Pacific Daylight Time)"));
            console.log(-9673.724074074074 +9601.349074074074)
            console.log(144.11666666666497/133)
            console.log(78/72.375)
            console.log(-106.26666666666279/106)
        })
        hls.on(Hls.Events.BUFFER_CODECS,function(event,data){   
            console.log("event",data)
        })
        hls.on(Hls.Events.FRAG_PARSING_DATA,function(event,data){
            console.log(data.nb/(data.startPTS-data.endPTS))            
        })

        // bind them together
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

        hls.on(Hls.Events.FRAG_CHANGED,function(event,data){
            // console.log(data)
            current_fragment = {
                time: new Date(),
                startPTS: inited_pts + data.frag.startPTS,
                endPTS: inited_pts + data.frag.startPTS+data.frag.duration,
            }   
        })

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.log("ERROR",event,data);
        });
    }
}



function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
// $(".header").click( 
//     function(){
//         download(JSON.stringify(holeData), 'data.txt', 'text/plain')
//     }
// )
// $(".log").click( 
//     function(){
//         download(JSON.stringify(Fragments), 'fragments.txt', 'text/plain')
//     }
// )

