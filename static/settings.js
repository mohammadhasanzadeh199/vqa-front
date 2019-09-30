// =============================================================================================================
// ============ url setting variables ==========================================================================
// =============================================================================================================

// ------------- streaming url of video player (dev setting) --------------------------------------------------- 
var __stream_url__ = "http://demo-livemedia.irib.ir:1935/temp-test/tv3.stream/live.m3u8";
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
// ------------- ignore front delay under this mean value (ms) -------------------------------------------------
var __front_delay_estimate_mean_ignore__ = 10000;
// ------------- ignore delay under this mean value ------------------------------------------------------------
var __delay_estimate_mean_ignore__ = 1;
// ------------- fix delay under this std value ----------------------------------------------------------------
var __delay_estimate_std_ignore__= 5000;
// ------------- const delay value added to delay --------------------------------------------------------------
var __const_delay_value__ = 5000;



// =============================================================================================================
// ============ export setting =================================================================================
// =============================================================================================================

// ------------- export file prefix name -----------------------------------------------------------------------
var __export_pre_name__ = "Errors";



// =============================================================================================================
// ============ view setting variables =========================================================================
// =============================================================================================================

// ------------- time of dispalying warning message (ms) -------------------------------------------------------
var __backend_warning_display_timeout__ = 3000;
// ------------- time of dispalying error message (ms) ---------------------------------------------------------
var __backend_error_display_timeout__ = 3000;
// ------------- capacity of log report box in html view -------------------------------------------------------
var __log_box_limit__ = 30;
// ------------- capacity of log interval report ---------------------------------------------------------------
var __export_log_interval_limit__ = 3000;
// ------------- iterval time to export log as file (ms) -------------------------------------------------------
var __export_log_interval_time__ = 10*60*1000;
// ------------- pending time to wait to log over treshold value (ms) ------------------------------------------
var __log_pending_time__ = 5000;
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
// ------------- icon pack map to feature name (icons directory is in static/pic/icon) -------------------------
__icon_packes__ = [
    {
        name:"Momentary Loudness",
        value: "loudness.png"
    },
    {
        name:"Integrated Loudness",
        value: "loudness.png"
    },
    {
        name:"ShortTerm Loudness",
        value: "loudness.png"
    },
    {
        name:"LRU Loudness",
        value: "loudness.png"
    },
    {
        name:"TPL Loudness",
        value: "loudness.png"
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
            gradiant:[0.25,0.5,0.75],
            id: 1,
        },
        {
            name:"Integrated Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75],
            id: 2,
        },
        {
            name:"ShortTerm Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75],
            id: 3,
        },
        {
            name:"LRU Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75],
            id: 4,
        },
        {
            name:"TPL Loudness",
            value: 0.5,
            gradiant:[0.25,0.5,0.75],
            id: 5,
        },
        {
            name:"Phase Coherence",
            value: 0.5,
            gradiant:[0.25,0.5,0.75],
            id: 6,
        },
        {
            name:"Noise Detection",
            value: 0.5,
            gradiant:[0.25,0.5,0.75],
            id: 7,
        },
    ],
    circular:[
        {
            name:"Brightness",
            value: 50,
            gradiant:[25,50,75],
            id: 8,
        },
        {
            name:"Contrast",
            value: 50,
            gradiant:[25,50,75],
            id: 9,
        },
        {
            name:"Chroma",
            value: 50,
            gradiant:[25,50,75],
            id: 10,
        },
        {
            name:"Blockiness",
            value: 50,
            gradiant:[25,50,75],
            id: 11,
        },
        {
            name:"Blurriness",
            value: 50,
            gradiant:[25,50,75],
            id: 12,
        },
        {
            name:"Noise estimation",
            value: 50,
            gradiant:[25,50,75],
            id: 13,
        },
    ],
}



// =============================================================================================================
// ============ initial data ===================================================================================
// =============================================================================================================

// ------------- initial data that set until geting data -------------------------------------------------------
let __initial_data__ = {
    data: {
        type:"log",
        equalizer: [
            {
                name:"Momentary Loudness",
                value: 0,
            },
            {
                name:"Integrated Loudness",
                value: 0,
            },
            {
                name:"ShortTerm Loudness",
                value: 0,
            },
            {
                name:"LRU Loudness",
                value: 0,
            },
            {
                name:"TPL Loudness",
                value: 0,
            },
            {
                name:"Phase Coherence",
                value: 0,
            },
            {
                name:"Noise Detection",
                value: 0,
            },
        ],
        circular:[
            {
                name:"Brightness",
                value: 0,
            },
            {
                name:"Contrast",
                value: 0,
            },
            {
                name:"Chroma",
                value: 0,
            },
            {
                name:"Blockiness",
                value: 0,
            },
            {
                name:"Blurriness",
                value: 0,
            },
            {
                name:"Noise estimation",
                value: 0,
            },
        ],
        audio_clipping:0,
        black_frame:0,
        color_gamut:0,
        frame_freezing:0,
        mute_detection:0,
        pillar_boxing:0
    }
};



// =============================================================================================================
// ============ text messages ==================================================================================
// =============================================================================================================
var __websocket_error_text__ = "Data server connection error. please wait while reconnecting ..."
var __init_pts_findig_text__ = "Please wait while syncing video and data ..."



// =============================================================================================================
// ============ dimention variables ============================================================================
// =============================================================================================================
var __video_min_width__ = 300;
var __header_min_width__ = 200;
var __log_min_width__ = 300;
var __equalizer_min_width__ = 500;
var __video_feature_min_width = 400;
var __top_row_min_width__ = 300;
var __bottom_row_min_width__ = 400;