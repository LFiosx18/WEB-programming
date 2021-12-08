var x = document.getElementById("x");
var r = document.getElementById("r");
var y = document.getElementById("y");



function testNum(n, min, max) {
    n.value=n.value.replace(",", ".");
    let check;
    if (n.value>min && n.value<max && n.value.trim() != null) {
        if (/^(0$|-?[1-9]\d*(\.\d*[1-9]$)?|-?0\.\d*[1-9])$/.test(n.value)) {
            check = true;
        }
        else {
            check = false;
        }
    }
    else {
        check = false;
    }
    if (!check){
        $(n).parent().find(".error_text").html("Введите значение из диапазона, без пробелов и прочих символов!");
    }
    else {

        $(n).parent().find(".error_text").html("");

    }
    return check;
}

function test() {
    let a = testNum(x, -3, 5);
    let b = testNum(y, -5, 5);
    let c = a && b;
    if (c) {
        $('[submit]').removeAttr('disabled').removeClass("disabled_1").addClass("submit");
    }
    else {
        $('[submit]').removeClass("submit").addClass("disabled_1").attr('disabled', true);
    }
    return c;
}

$(document).ready(function () {
    $('[clear_table]').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: "clear.php",
            type: "GET",
            success: function() {
                let table = document.getElementById("answer_table");
                table.innerHTML = `
               <tr>
                    <td><p>X</p></td>
                    <td><p>Y</p></td>
                    <td><p>R</p></td>
                    <td><p>Время</p></td>
                    <td><p>Выполнение</p></td>
                    <td><p>Результат</p></td>
                </tr>
                `
            },
        });
        location.reload();
    })

    $(document).ready(function() {
        $('[submit]').on('click',function(e) {
            e.preventDefault();
            let check = test();
            if (check) {
                $.ajax({
                    url: "new.php",
                    type: "GET",
                    data: {"x": x.value, "y": y.value, "r": r.value},
                    success: function (response) {
                        let table = document.getElementById("answer_table");
                        table.insertAdjacentHTML('afterend', response);
                    },
                    //web errors checking
                    error: function (jqXHR, exception) {
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status === 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status === 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                        alert(msg);
                    }

                });
            }
        })
    });

})