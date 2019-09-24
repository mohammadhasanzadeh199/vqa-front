// elements current dim -------------------------------------------------------------
let windowWidth = $(window).width();
let videoHeaderWidth = $("#videoHeader" ).width();
let videoWidth = $(".video-container").width();
let logWidht = $(".log").width();
let equalizerWidth = $(".equalizer").width();
let videoFeaturesWidth = $(".video-features").width();
let topPartHeight = $(".top-row.top-container" ).height();
let bottomPartHeight = $(".bottom-row.bottom-container" ).height();
// elements min dim -----------------------------------------------------------------
let videoMinWidth = __video_min_width__;
let headerMinWidth = __header_min_width__;
let logMinWidth = __log_min_width__;
let equalizerMinWidth = __equalizer_min_width__;
let videoFeaturesMinWidth = __video_feature_min_width;
let topPartMinHeight = __top_row_min_width__;
let bottomPartMinHeight = __bottom_row_min_width__;


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


// =========================================================================================================================
// =========== reinit variables after changing =============================================================================
// =========================================================================================================================
function reload(){
    videoHeaderWidth = $("#videoHeader" ).width();
    videoWidth = $(".video-container").width();
    logWidht = $(".log").width();
    topPartHeight =  $(".top-row.top-container" ).height();
    bottomPartHeight = $(".bottom-row.bottom-container").height();
    equalizerWidth = $(".equalizer").width();
    videoFeaturesWidth = $(".video-features").width();
}



// =========================================================================================================================
// =========== window resize handler =======================================================================================
// =========================================================================================================================
$(window).resize(function(){
    if (windowWidth != $(window).width()){
        windowWidth = $(window).width();
        console.log("resytle");
        restyle()
    }
})



// =========================================================================================================================
// =========== restyling boxes by percentage like first look ===============================================================
// =========================================================================================================================
function restyle(){
    $("#videoHeader" ).width("calc(2 * 100% / 12)");
    $(".video-container").width("calc( 100% / 12 * 5)");
    $(".log").width("calc(5 * 100% / 12)");
    $(".top-row.top-container" ).height("calc( 9 / 16 * 5 / 12 * 100vw + 50px)");
    $(".bottom-row.bottom-container").height("calc(100vh - 9 / 16 * 5 / 12 * 100vw)");
    $(".equalizer").width("calc(7 / 12 * 100%)");
    $(".video-features").width("calc(5 / 12 * 100%)");
    reload();
}
