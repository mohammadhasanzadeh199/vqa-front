let eq_colors = ["#2b8d00","#ffea00","#ff9c00","#ff5500"];

let equalizer_setting = null;

let eq_pending_to_log = [];


function set_equalizer_setting_obj(obj){
    equalizer_setting = obj;
}


// ====================================================================================================================
// ------- set recived equalizers data to view. called in connecttion.js. input param is header json ------------------
// ====================================================================================================================
function setEqualizers(json) {
    let eq_data = json.data.equalizer;
    // remove every thing first ........................................................
    $(".equalizer .table-header .th:not(.source)").remove();
    $(".equalizer .table-body .table-col:not(.source)").remove();
    // now create each column ..........................................................
    for (let i = 0; i<eq_data.length;i++){
        let header = $(".equalizer .table-header .source").clone();
        header.text(Math.round(eq_data[i].value * 100) / 100);
        header.removeClass("source");
        header.insertAfter(".equalizer .table-header .source");
        let row = $(".equalizer .table-body .table-col.source").clone();
        row.attr("title",eq_data[i].name);
        // render each column row ......................................................
        for (let j = 0; j<__equalizer_row_num__;j++){
            let body = row.find(".td.source").clone();
            body.removeClass("source");
            if (j < eq_data[i].value*__equalizer_row_num__){ // enable cell ............
                body.find("div").css("background-color",eq_map_to_color(j,eq_data[i].name));
            }
            else { // disable cell .....................................................
                body.find("div").css("background-color","#383838");
                body.find("div").css("box-shadow", "0px 2px 8px 0px #161616 inset")
            }
            body.insertAfter(row.find(".td.source"));
        }
        // log control .................................................................
        eq_log_control(eq_data[i].name,eq_data[i].value)
        row.removeClass("source");
        row.insertAfter(".equalizer .table-body .table-col.source")
    }
}


// ====================================================================================================================
// ------- set recived mos data to view. called in connecttion.js. input param is data json ---------------------------
// ====================================================================================================================
function setAudioMOS (json){
    let mos = json.data.audio_mos;
    $(".equalizer .equalizer-header .second").text("MOS: "+mos);
}


// ====================================================================================================================
// ------- determin cell color by setting. called in setEqualizers function -------------------------------------------
// ====================================================================================================================
function eq_map_to_color(index, name){
    // index of cell in column , name of column (audio feature) ..........................
    let new_row_num = __equalizer_row_num__-1;
    // defualt gradiant ..................................................................
    let gradiant = [0.25,0.5,0.75];
    for (let i = 0; i< equalizer_setting.length; i++){
        if (equalizer_setting[i].name == name) {
            gradiant = equalizer_setting[i].gradiant;
        }
    }
    if (index/new_row_num<gradiant[0]){
        return eq_colors[0];
    } else if (index/new_row_num<gradiant[1]){
        return eq_colors[1];
    } else if (index/new_row_num<gradiant[2]){
        return eq_colors[2];
    } else {
        return eq_colors[3];
    }
}


function eq_log_control(name , value){
    let treshold_value = 0.5;
    for (let i = 0; i< equalizer_setting.length; i++){
        if (equalizer_setting[i].name == name) {
            treshold_value = equalizer_setting[i].value;
        }
    }
    let isPending = false;
    for (let i = 0; i< eq_pending_to_log.length; i++){
        if (eq_pending_to_log[i].name == name) {
            isPending = true;
            if (value < treshold_value || (new Date() - new Date(eq_pending_to_log[i].start)) > 5000 ){
                eq_add_to_log(eq_pending_to_log[i].name,eq_pending_to_log[i].start,new Date);
            }
        }
    }
    if (!isPending && value > treshold_value){
        eq_pending_to_log.push({
            name:name,
            start: new Date()
        });
    }
}

function eq_add_to_log(name,start,end){
    let start_dt = new Date(start);
    let start_str = start_dt.getHours() + ":" + start_dt.getMinutes() + ":" + start_dt.getSeconds() + ":" + start_dt.getMilliseconds();
    let end_dt = new Date(end);
    let end_str = end_dt.getHours() + ":" + end_dt.getMinutes() + ":" + end_dt.getSeconds() + ":" + end_dt.getMilliseconds();
    let row = $(".log .source").clone();
    row.removeClass("source");
    row.find(".features").text(name);
    row.find(".start").text(start_str);
    row.find(".end").text(end_str);
    row.find(".date").text(start_dt.getFullYear()+"/"+(start_dt.getMonth()+1)+"/"+start_dt.getDate());
    row.find(".icon").attr("src","/static/pic/icon/loudness.png");
    row.insertAfter(".log .source");
    for (let i = 0; i< eq_pending_to_log.length; i++){
        if (eq_pending_to_log[i].name == name) {
            eq_pending_to_log.splice(i, 1);
        }
    }
    if ($(".log .scrolable tr").length > __log_box_limit__){
        $(".log .scrolable tr:last-child").remove();
    }
}

$(".log .clear").click(function(){
    $(".log .scrolable tr:not(.source)").remove();
})