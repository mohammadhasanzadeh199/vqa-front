let videoHeaderWidth = $("#videoHeader" ).width();
let videoWidth = $(".video-container").width();
let logWidht = $(".log").width();
let videoMinWidth = 300;
let headerMinWidth = 200;
let logMinWidth = 300;
//-------------------------------------------------------------
let equalizerWidth = $(".equalizer").width();
let equalizerMinWidth = 500;
let videoFeaturesWidth = $(".video-features").width();
let videoFeaturesMinWidth = 400;
//-------------------------------------------------------------
let topPartHeight = $(".top-row.top-container" ).height();
let bottomPartHeight = $(".bottom-row.bottom-container" ).height();
let topPartMinHeight = 300;
let bottomPartMinHeight = 400;
// =========================================================================================================================
// =========== video header box resizable (just horizontal) ================================================================
// =========================================================================================================================
$("#videoHeader" ).resizable({handles: 'e'});
$("#videoHeader").resize(function(evt){

    if ($("#videoHeader").width() <= headerMinWidth && $("#videoHeader").width() - videoHeaderWidth < 0){
        $("#videoHeader").width(headerMinWidth)
        $(".video-container").width($(window).width() - headerMinWidth - $(".log").width());
        return false;
    } else if ($(".video-container").width() <= videoMinWidth && $("#videoHeader").width() - videoHeaderWidth > 0){
        $(".video-container").width(videoMinWidth);
        $("#videoHeader").width($(window).width() - videoMinWidth - $(".log").width())
        return false;
    } else {
        $(".video-container").width(videoWidth + (videoHeaderWidth - $("#videoHeader" ).width()));
        reload()
    }
})

// =========================================================================================================================
// =========== log box resizable (just horizontal) =========================================================================
// =========================================================================================================================
$(".log" ).resizable({handles: 'w'});
$(".log").resize(function(evt){

    if ($(".log").width() <= logMinWidth && $(".log").width() - logWidht < 0){
        $(".log").width(logMinWidth)
        $(".log").css("left","0");
        $(".video-container").width($(window).width() - logMinWidth - $("#videoHeader").width());
        return false;
    } else if ($(".video-container").width() <= videoMinWidth && $(".log").width() - logWidht > 0){
        $(".video-container").width(videoMinWidth);
        $(".log").width($(window).width() - videoMinWidth - $("#videoHeader").width());
        $(".log").css("left","0");
        return false;
    } else {
        $(".video-container").width(videoWidth + (logWidht - $(".log" ).width()));
        $(".log").css("left","0");
        reload();
    }

})

// =========================================================================================================================
// =========== hole top part resizable (just vertical) =====================================================================
// =========================================================================================================================
$(".top-row.top-container" ).resizable({handles: 's'});
$(".top-row.top-container" ).resize(function(){

    if ($(".top-row.top-container" ).height() <= topPartMinHeight && $(".top-row.top-container" ).height()-topPartHeight < 0){
        $(".top-row.top-container" ).height(topPartMinHeight);
        $(".bottom-row.bottom-container").height($("body").height()-topPartMinHeight);
        return false;
    } else if ($(".bottom-row.bottom-container").height() <= bottomPartMinHeight && $(".top-row.top-container" ).height()-topPartHeight > 0 ) {
        $(".bottom-row.bottom-container").height(bottomPartMinHeight);
        $(".top-row.top-container" ).height(topPartHeight);        
    } else {
        $(".bottom-row.bottom-container").height(bottomPartHeight + ( topPartHeight - $(".top-row.top-container" ).height() ));
        reload();
    }
})


// =========================================================================================================================
// =========== equalizer and video features resizable (horizontal only) ====================================================
// =========================================================================================================================
$(".equalizer" ).resizable({handles: 'e'});
$(".equalizer" ).resize(function(){

    if ($(".equalizer").width() <= equalizerMinWidth && $(".equalizer").width() - equalizerWidth < 0){
        console.log("smallll")
        $(".equalizer").width(equalizerMinWidth)
        $(".video-features").width(0.991*$(window).width() - equalizerMinWidth );
        return false;
    } else if ($(".video-features").width() <= videoFeaturesMinWidth && $(".equalizer").width() - equalizerWidth > 0){
        $(".video-features").width(videoFeaturesMinWidth);
        $(".equalizer").width(0.991*$(window).width() - videoFeaturesMinWidth)
        console.log($(".video-features").width())
        return false;
    } else {
        $(".video-features").width(videoFeaturesWidth + (equalizerWidth - $(".equalizer" ).width()));
        reload()
    }
})

function reload(){
    videoHeaderWidth = $("#videoHeader" ).width();
    videoWidth = $(".video-container").width();
    logWidht = $(".log").width();
    topPartHeight =  $(".top-row.top-container" ).height();
    bottomPartHeight = $(".bottom-row.bottom-container").height();
    equalizerWidth = $(".equalizer").width();
    videoFeaturesWidth = $(".video-features").width();
    // $("#videoHeader" ).css("max-width",$(".top-row.top-container").width()-videoMinWidth-$(".log").width());
    // $(".log" ).css("max-width",$(".top-row.top-container").width()-videoMinWidth-$("#videoHeader").width());
}
