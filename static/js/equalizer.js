// $(".equalizer tbody tr:nth-child(odd)").css()

let cols_data = [13,7,2,10,3,13,6];

let footer_icons = ["loudness.png","loudness.png","loudness.png","loudness.png","loudness.png","loudness.png","loudness.png"]

let colors = ["#2b8d00","#2b8d00","#2b8d00","#2b8d00","#ffea00","#ffea00","#ffea00","#ffea00","#ff9c00","#ff9c00","#ff9c00","#ff5500","#ff5500","#ff5500"];

for (let i = 0; i<cols_data.length;i++){
    let header = $(".equalizer .table-header .source").clone();
    header.text("0."+cols_data[i]+"00");
    header.removeClass("source");
    header.insertAfter(".equalizer .table-header .source");
}

for (let i = 0; i<cols_data.length;i++){
    let row = $(".equalizer .table-body .table-col.source").clone();
    row.attr("title","equilizer value:"+cols_data[i])
    for (let j = 0; j<colors.length;j++){
        let body = row.find(".td.source").clone();
        body.removeClass("source");
        if (j < cols_data[i]){
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

for (let i = 0; i<footer_icons.length;i++){
    let footer = $(".equalizer .table-footer .source").clone();
    footer.find("img").attr("src","pic/icon/"+footer_icons[i]);
    footer.removeClass("source");
    footer.insertAfter(".equalizer .table-footer .source");
}