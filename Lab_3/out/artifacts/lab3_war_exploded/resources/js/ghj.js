function draw_shot(data) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '3');
    let rvalue = Number(data.rval);
    let xvalue = Number(data.xval);
    let yvalue = Number(data.yval);
    circle.setAttribute('r', '3');
    circle.setAttribute('cx', 200 + 150 / rvalue * xvalue);
    circle.setAttribute('cy', 200 - 150 / rvalue * yvalue);
    if (data.result === "true") {
        circle.setAttribute('fill', 'LIME');
    } else {
        circle.setAttribute('fill', 'RED');
    }
    document.getElementById('svg').appendChild(circle);
}

function checkHit(event) {
    let r_val = document.forms[1].elements[5].value;
    let cordX = event.pageX - $('#svg').offset().left;
    let cordY = event.pageY - $('#svg').offset().top;
    let x_val = (cordX - 200) / 150 * 4;
    let y_val = (200 - cordY) / 150 * 4;
    document.forms[2].elements[4].value = x_val;
    document.forms[2].elements[5].value = y_val;
    document.forms[2].elements[6].value = r_val;
    document.forms[2].elements[0].click();
    console.log(document.forms[2].elements);
}
function updateRadius(){
        let r = document.forms[1].elements[5].value;
        if (r > 4 || r<1){
                return;
        }
        let path = "M"+(200 + 75*r/4)+" 200 A "+75*r/4+" "+75*r/4+" 0 0 0 200 "+(200 - 75*r/4)+" L 200 200 Z";
        $("#path").attr("d", path);
        let polygon = "200,"+ (200 + 150*r/4) + " " + (199 - 150*r/4) + ","+(200 + 150*r/4) +" "+(199 - 150*r/4)+",200 200,200";
        $("#rectangle").attr("points", polygon);
        let polygon1 = (200 + 150*r/4)+",200 200,"+(200 + 75*r/4)+" 200,200";
        $("#triangle").attr("points", polygon1);


}
