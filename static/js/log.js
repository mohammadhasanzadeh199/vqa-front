// ------- interval log list array ------------------------------------------------------------------------------------
var interval_saved_log_list = [];


// ====================================================================================================================
// ------- on save button click handler (download log) ----------------------------------------------------------------
// ====================================================================================================================
$(".log button.save").click(function(){
    let log_elements = $(".log .scrolable tbody tr:not(.source)").toArray();
    let content = [];
    let downloade_date = new Date();
    let time = "_" + downloade_date.getHours() + "_" + downloade_date.getMinutes() + "_" + downloade_date.getSeconds()
    for (let i = 0; i<log_elements.length;i++){
        content.push([$(log_elements[i]).find(".features").text(),$(log_elements[i]).find(".start").text(),$(log_elements[i]).find(".end").text(),$(log_elements[i]).find(".date").text()])
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    let tempContent = ""
    content.forEach(function(rowArray) {
        let row = rowArray.join(",");
        tempContent += row + "\r\n";
    });
    if ( navigator.msSaveOrOpenBlob ) {
        // Works for Internet Explorer and Microsoft Edge
        let blob = new Blob( [ tempContent ], { type: "text/csv"} );
        navigator.msSaveOrOpenBlob( blob, __export_pre_name__ + time +'.csv' );
    } else {
        csvContent += tempContent
        var hiddenElement = document.createElement('a');
        hiddenElement.href = encodeURI( csvContent);
        hiddenElement.target = '_blank';
        hiddenElement.download = __export_pre_name__ + time +'.csv';
        document.getElementById("settingModal").appendChild(hiddenElement);
        console.log(hiddenElement);
        hiddenElement.click();
    }
})


// ====================================================================================================================
// ------- interval to save in certain times automaticly --------------------------------------------------------------
// ====================================================================================================================
setInterval(() => {
    if (interval_saved_log_list.length>0) {
        let content = interval_saved_log_list;
        let csvContent = "data:text/csv;charset=utf-8,";
        content.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        var hiddenElement = document.createElement('a');
        hiddenElement.href = encodeURI( csvContent);
        hiddenElement.target = '_blank';
        let downloade_date = new Date();
        let time = "_" + downloade_date.getHours() + "_" + downloade_date.getMinutes() + "_" + downloade_date.getSeconds()
        hiddenElement.download = __export_pre_name__ + time +'.csv';
        document.getElementById("settingModal").appendChild(hiddenElement);
        hiddenElement.click();
        interval_saved_log_list = [];
    }
}, __export_log_interval_time__);




// ====================================================================================================================
// ------- remove button onclick handler ------------------------------------------------------------------------------
// ====================================================================================================================
$(".log .clear").click(function(){
    $(".log .scrolable tr:not(.source)").remove();
})
