
let footer_icons = ["loudness.png","loudness.png","loudness.png","loudness.png","loudness.png","loudness.png","loudness.png"]

let colors = ["#2b8d00","#2b8d00","#2b8d00","#2b8d00","#ffea00","#ffea00","#ffea00","#ffea00","#ff9c00","#ff9c00","#ff9c00","#ff5500","#ff5500","#ff5500"];

function setEqualizers(json) {

    $(".equalizer .table-header .th:not(.source)").remove();
    $(".equalizer .table-body .table-col:not(.source)").remove();
    let eq_data = json.data.equalizer;
    for (let i = 0; i<eq_data.length;i++){
        let header = $(".equalizer .table-header .source").clone();
        header.text(Math.round(eq_data[i].value * 100) / 100);
        header.removeClass("source");
        header.insertAfter(".equalizer .table-header .source");

        let row = $(".equalizer .table-body .table-col.source").clone();
        row.attr("title",eq_data[i].name);
        for (let j = 0; j<colors.length;j++){
            let body = row.find(".td.source").clone();
            body.removeClass("source");
            if (j < eq_data[i].value/10){
                body.find("div").css("background-color",colors[j]);
            }else {
                body.find("div").css("background-color","#383838");
                body.find("div").css("box-shadow", "0px 2px 8px 0px #161616 inset")
            }
            body.insertAfter(row.find(".td.source"));
        }
        row.removeClass("source");
        row.insertAfter(".equalizer .table-body .table-col.source")
    }
}

function setAudioMOS (json){
    let mos = json.data.audio_mos;
    $(".equalizer .equalizer-header .second").text("MOS: "+mos);
}