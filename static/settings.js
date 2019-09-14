var __stream_url__ = "http://demo-livemedia.irib.ir:1935/temp-test/tv2.stream/live.m3u8";
var __websocket_url__ = "ws://192.168.43.37:8007/";
var __sync_play_ignore_time__ = [200,200];
var __sync_play_stored_data_num__ = 1000;
var __log_box_limit__ = 30;
var __log_waiting_time__ = 10;

var __equalizer_row_num__ = 15;

var __delay_estimate_sample_num__ = 350;
var __delay_estimate_mean_ignore__ = 1;
var __fix_delay__ = 1;
var __delay_estimate_std_ignore__= 300;


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

__icon_packes__ = [
    {
        name:"Momentary Loudness",
        value: ""
    },
    {
        name:"Integrated Loudness",
        value: ""
    },
    {
        name:"ShortTerm Loudness",
        value: ""
    },
    {
        name:"LRU Loudness",
        value: ""
    },
    {
        name:"TPL Loudness",
        value: ""
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