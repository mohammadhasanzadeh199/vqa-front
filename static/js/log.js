var interval_saved_log_list = [];

$(".log button.save").click(function(){
    let log_elements = $(".log .scrolable tbody tr:not(.source)").toArray();
    let content = [];
    console.log(log_elements.length)
    for (let i = 0; i<log_elements.length;i++){
        content.push([$(log_elements[i]).find(".features").text(),$(log_elements[i]).find(".start").text(),$(log_elements[i]).find(".end").text(),$(log_elements[i]).find(".date").text()])
    }
    console.log(log_elements);
    console.log(content);
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
    hiddenElement.click();
})


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
        hiddenElement.click();
        interval_saved_log_list = [];
    }
}, __export_log_interval_time__);