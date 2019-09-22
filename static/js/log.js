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
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
})