// var player = videojs('video', {
//     html5: {
//         hls: {
//         overrideNative: true
//         }
//     }
// });

// player.src({
//     src: __stream_url__,
//     type: 'application/x-mpegURL',
//     overrideNative: true
// });

// player.on("timeupdate",function(data){
//     console.log("some",player.recordedData);
// })

var player = new JSMpeg.Player(__stream_url__ ,{
    loop: true, 
    autoplay: true,
    onVideoDecode: function(){
        console.log("now")
    }
});
