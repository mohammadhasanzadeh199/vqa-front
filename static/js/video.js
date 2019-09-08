var player = videojs('video', {
    html5: {
        hls: {
        overrideNative: true
        }
    }
});

player.src({
    src: __stream_url__,
    type: 'application/x-mpegURL',
    overrideNative: true
});

// player.on("timeupdate",function(data){
//     console.log("some",player.recordedData);
// })
// console.log("jsmpeg")
// var player = new JSMpeg.Player(__stream_url__ ,{
//     loop: true, 
//     autoplay: true,
//     progressive:false,
//     onVideoDecode: function(){
//         console.log("now")
//     }
// });
