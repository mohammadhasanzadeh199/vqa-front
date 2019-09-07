var __stream_url__ = "http://192.168.43.37:8081";
var __websocket_url__ = "ws://192.168.43.37:8006/";

var __log_box_limit__ = 30;
var __log_waiting_time__ = 10;

var __equalizer_row_num__ = 15;


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
