var video = document.getElementById("video");

var current_fragment = {
    timestamp: null,
    time:null,
    startPTS:null,
    endPTS:null
}

var fragment_data = [];

var inited_pts = 0;
var progresive_pts = 0;

var loaded_fragment_additional_data = [];

initPlayer()



function initPlayer() {
    if (Hls.isSupported()) {
        let frame_num = 0;
        var hls = new Hls();
        hls.on(Hls.Events.LEVEL_PTS_UPDATED,function(event,data){
            // console.log('level',data)
        })
        hls.on(Hls.Events.INIT_PTS_FOUND ,function(event,data){
            inited_pts = progresive_pts = data.initPTS/90000;
            console.log("triger",inited_pts,new Date())
        })
        hls.on(Hls.Events.FRAG_PARSING_DATA,function(event,data){  
            if (data.type == "video"){
                loaded_fragment_additional_data.push({
                    nb: data.nb,
                    sn: data.frag.sn
                });
            }
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
            inited_pts = progresive_pts;
            for (let i=0; i < loaded_fragment_additional_data.length; i++){
                if ( loaded_fragment_additional_data[i].sn == data.frag.sn ) {
                    current_fragment = {
                        time: new Date(),
                        duration:data.frag.duration,
                        nb: loaded_fragment_additional_data[i].nb
                    }
                    loaded_fragment_additional_data.splice(i,1);   
                    console.log(current_fragment,loaded_fragment_additional_data);
                }
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

