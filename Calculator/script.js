$(document).ready(function() {
    let expression = "";

    $(".btn").click(function() {
        let value = $(this).text();
        
        if (value === "=") {
            try {
                expression = eval(expression); // Evaluates the math expression
                $("#display").val(expression);
            } catch {
                $("#display").val("Error");
            }
        } else if (value === "C") {
            expression = "";
            $("#display").val("");
        } else {
            expression += value;
            $("#display").val(expression);
        }
    });
});
