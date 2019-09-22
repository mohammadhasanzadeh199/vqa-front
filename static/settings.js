// =============================================================================================================
// ============ url setting variables ==========================================================================
// =============================================================================================================

// ------------- streaming url of video player (dev setting) --------------------------------------------------- 
var __stream_url__ = "http://demo-livemedia.irib.ir:1935/temp-test/tv1.stream/live.m3u8";
// ------------- websocket server url --------------------------------------------------------------------------
var __websocket_url__ = "ws://192.168.43.37:8007/";



// =============================================================================================================
// ============ sync paly setting variables ====================================================================
// =============================================================================================================

// ------------- data time and frame time ignorable diff -------------------------------------------------------
var __sync_play_ignore_time__ = [200,200];
// ------------- time limit for return value back to under treshold value --------------------------------------
var __log_waiting_time__ = 10;
// ------------- capacity of stored log data -------------------------------------------------------------------
var __sync_play_stored_data_num__ = 10000;
// ------------- num of log data to estimate delay -------------------------------------------------------------
var __delay_estimate_sample_num__ = 350;
// ------------- ignore delay under this mean value ------------------------------------------------------------
var __delay_estimate_mean_ignore__ = 1;
// ------------- fix delay under this std value ----------------------------------------------------------------
var __delay_estimate_std_ignore__= 5000;
// ------------- const delay value added to delay --------------------------------------------------------------
var __const_delay_value__ = 5000;



// =============================================================================================================
// ============ view setting variables =========================================================================
// =============================================================================================================

// ------------- capacity of log report box in html view -------------------------------------------------------
var __log_box_limit__ = 30;
// ------------- num of equalizer column rows ------------------------------------------------------------------
var __equalizer_row_num__ = 15;
// ------------- if audio features mos shown or not ------------------------------------------------------------
var __audio_features_MOS__ = true;
// ------------- if video features mos shown or not ------------------------------------------------------------
var __video_features_MOS__ = true;
// ------------- audio features gradiant colors ----------------------------------------------------------------
var __eq_colors__ = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];
// ------------- video features gradiant colors ----------------------------------------------------------------
var __vf_colors__ = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];
// ------------- icon pack map to feature name -----------------------------------------------------------------
__icon_packes__ = [
    {
        name:"Momentary Loudness",
        value: "Brightness.png"
    },
    {
        name:"Integrated Loudness",
        value: "Brightness.png"
    },
    {
        name:"ShortTerm Loudness",
        value: "Brightness.png"
    },
    {
        name:"LRU Loudness",
        value: "Brightness.png"
    },
    {
        name:"TPL Loudness",
        value: "Brightness.png"
    },
    {
        name:"Phase Coherence",
        value: "Phase-Coherence.png"
    },
    {
        name:"Noise Detection",
        value: "Noise_Detection.png"
    },
    {
        name:"Brightness",
        value:"Brightness.png"
    },
    {
        name:"Contrast",
        value:"Contrast.png"
    },
    {
        name:"Chroma",
        value:"Chroma.png"
    },
    {
        name:"Blockiness",
        value:"Blockiness.png"
    },
    {
        name:"Blurriness",
        value:"Bluriness.png"
    },
    {
        name:"Noise estimation",
        value:"Noise Estimation.png"
    },
];



// =============================================================================================================
// ============ defualt setting setting variables ==============================================================
// =============================================================================================================

// ------------- defualt setting of view and algorithem --------------------------------------------------------
var __defualt_setting__ = {
    equalizer: [
        {
            name:"Momentary Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"Integrated Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"ShortTerm Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"LRU Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"TPL Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"Phase Coherence",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
        {
            name:"Noise Detection",
            value: 0.5,
            gradiant:[0.25,0.5,0.75]
        },
    ],
    circular:[
        {
            name:"Brightness",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Contrast",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Chroma",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Blockiness",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Blurriness",
            value: 50,
            gradiant:[25,50,75]
        },
        {
            name:"Noise estimation",
            value: 50,
            gradiant:[25,50,75]
        },
    ],
}