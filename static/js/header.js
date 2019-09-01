let header_data = [
    {
        key: "Video Codec",
        value: "h256"
    },
    {
        key: "Deuration",
        value: "02:24:20:3632"
    },
    {
        key: "Resolution",
        value: "1920*1080"
    },
    {
        key: "Frame Rate",
        value: "24"
    },
    {
        key: "Bit Rate",
        value: "3.43 mbps"
    },
    {
        key: "Aspect Ratio",
        value: "16:9"
    },
    {
        key: "Pixel Format",
        value: "4:2:2"
    },
    {
        key: "Audio Codec",
        value: "AAC"
    },
    {
        key: "Sample Rate",
        value: "44100"
    }
];

header_data = header_data.reverse();

for (let i = 0; i<header_data.length; i++){
    let table_row = $(".header tr.source").clone();
    table_row.removeClass("source");
    table_row.find(".key").text(header_data[i].key);
    table_row.find(".value").text(header_data[i].value);
    table_row.insertAfter(".header tr.source");
}