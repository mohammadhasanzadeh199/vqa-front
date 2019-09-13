// ====================================================================================================================
// ------- set recived data to view. called in connecttion.js. input param is header json -----------------------------
// ====================================================================================================================
function setHeader (josn){
    let header_data = josn.data;
    $(".header tbody tr:not(.source)").remove()
    for (let i = 0; i<header_data.length; i++){
        let table_row = $(".header tr.source").clone();
        table_row.removeClass("source");
        table_row.find(".key").text(header_data[i].key);
        table_row.find(".value").text(header_data[i].value);
        table_row.insertAfter(".header tr.source");
    }
}