var video = document.getElementById("video");
// video.addEventListener("timeupdate",function(){
//     console.log(video.volume)
// })
// video.addEventListener('loadedmetadata',function(event) {
//     console.log("meta",event)
//   });

var holeData=[];
var Fragments=[];

var myExports = document.getElementById("library")
// initPlayer()

var id3 = new ID3();
console.log(id3)


function initPlayer() {
    // console.log(this)
    if (Hls.isSupported()) {
        let frame_num = 0;
        var hls = new Hls();
        hls.on(Hls.Events.LEVEL_PTS_UPDATED,function(event,data){
            // holeData.push(data);
            // let some = data.details.fragments;
            // for (let index = 0; index < some.length; index++) {
            //     Fragments.push(some[index])
            // }
            // console.log(data);
            // console.log(holeData);
            // console.log(Fragments)
            // frame_num += some;
            // data = ID3.getTimeStamp(some)
            // console.log("some new",frame_num)
        })
        hls.on(Hls.Events.FRAG_PARSING_METADATA,function(event,data){
            console.log("triger")
        })
        hls.on(Hls.Events.FRAG_PARSING_DATA,function(event,data){
            let some = ID3.getID3Data(data.data1,0);
            console.log(data)
            // console.log("some hey",video.currentTime,data)
            // console.log(video)
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
        // setTimeout(function(){
        //     video.play();
        // },5000)
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

