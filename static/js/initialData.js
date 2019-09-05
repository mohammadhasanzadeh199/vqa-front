let initial_data = {
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
current_data = initial_data;

setEqualizers(initial_data);
setCircular(initial_data);
setNeon(initial_data);

init_equalizer_setting(initial_data);
init_video_features_setting(initial_data);

function set_current_data(data) {
    current_data = data;
}