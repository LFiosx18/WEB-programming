var RECT_SIZE = 500
var OFFSET = RECT_SIZE/16
var canvas = document.getElementById("graph");
var ctx = canvas.getContext('2d');
var LINE_LENGTHS = RECT_SIZE - 2*OFFSET //Длинна всей оси без отступа сбоку
var RADIUS_LENGTH = LINE_LENGTHS/4 //Расстояние в px между половиной графика
var radius = "1"; // добавить чтение радиуса
var length = RECT_SIZE/100
canvas.width = RECT_SIZE;
canvas.height = RECT_SIZE;
const MAIN_RECT = canvas.getBoundingClientRect()

var arrayOfCoords = []
var arrayOfCoordsFromServer = []
var x_error = document.getElementById("x_error")
var y_error = document.getElementById("y_error")
var r_error = document.getElementById("r_error")

class Coordinate{
	constructor(x, y, r, isNew){
		this.x = x
		this.y = y
		this.r = r
		this.isNew = isNew
	}
}

ctx.lineCap = "round"
ctx.lineWidth = 1

function drawMainRect() {
	ctx.strokeRect(0, 0, RECT_SIZE, RECT_SIZE);
}



//Рисуем квадрат
function square() {
	ctx.beginPath();
	ctx.fillRect(RECT_SIZE/2, RECT_SIZE/2-2*RADIUS_LENGTH, RADIUS_LENGTH, RADIUS_LENGTH * 2)
	ctx.fillStyle="rgba(255, 236, 224, 0.7)"
	ctx.fill()
	ctx.closePath()
}

//Рисуем 1/4 круга
function circle(){
	ctx.beginPath();
	ctx.arc(RECT_SIZE/2, RECT_SIZE/2, RADIUS_LENGTH, 0, Math.PI/2, false);
	ctx.lineTo(RECT_SIZE/2, RECT_SIZE/2)
	ctx.lineTo(RECT_SIZE/2 + RADIUS_LENGTH*2, RECT_SIZE/2)
	ctx.fillStyle="rgba(255, 236, 224, 0.7)"
	ctx.fill()
	ctx.closePath()
}

//Рисуем треугольник
function triangle(){
	ctx.beginPath()
	ctx.moveTo(RECT_SIZE/2, RECT_SIZE/2)
	ctx.lineTo(RECT_SIZE/2 - 2*RADIUS_LENGTH, RECT_SIZE/2)
	ctx.lineTo(RECT_SIZE/2, RECT_SIZE/2 - 2*RADIUS_LENGTH)
	ctx.fillStyle="rgba(255, 236, 224, 0.7)"
	ctx.fill()
	ctx.closePath()
}
//Рисуем ось Y cо стрелочкой
function drawAxisY(){
	ctx.beginPath()
	ctx.moveTo(RECT_SIZE/2, RECT_SIZE); //передвигаем перо
	ctx.lineTo(RECT_SIZE/2, 0); //рисуем линию
	ctx.lineTo(RECT_SIZE/2 - 5, 10);
	ctx.moveTo(RECT_SIZE/2, 0);
	ctx.lineTo(RECT_SIZE/2 + 5, 10);
	ctx.stroke();
	ctx.closePath()
}

//Рисуем ось X со стрелочкой
function drawAxisX(){
	ctx.beginPath()
	ctx.moveTo(0, RECT_SIZE/2);
	ctx.lineTo(RECT_SIZE, RECT_SIZE/2);
	ctx.lineTo(RECT_SIZE - 10, RECT_SIZE/2 - 5)
	ctx.moveTo(RECT_SIZE, RECT_SIZE/2);
	ctx.lineTo(RECT_SIZE - 10, RECT_SIZE/2 + 5)
	ctx.fillStyle="rgba(255, 236, 224, 0.7)"
	ctx.stroke()
	ctx.closePath()
}

//Рисуем черточку разметки по x
function paintLineLenghtX(x, y, line_length){
	ctx.beginPath()
	let backWidth = ctx.lineWidth
	ctx.lineWidth = 1
	ctx.moveTo(x, y - line_length)
	ctx.lineTo(x, y + line_length)
	ctx.stroke();
	ctx.fillStyle="rgba(255, 236, 224, 0.7)"
	ctx.closePath()
	ctx.lineWidth = backWidth
}
//Рисуем черточку разметки по y
function paintLineLenghtY(x, y, line_length){
	ctx.beginPath()
	let backWidth = ctx.lineWidth
	ctx.lineWidth = 1
	ctx.moveTo(x - line_length, y )
	ctx.lineTo(x + line_length, y)
	ctx.fillStyle="rgba(255, 236, 224, 0.7)"
	ctx.stroke();
	ctx.closePath()
	ctx.lineWidth = backWidth
}
//Рисуем слова разметки
function paintNumber(number, x, y) {
	let backColor = ctx.fillStyle
	ctx.fillStyle = "#480c48"
	ctx.textAlign = "center";
	ctx.font = "15px Comic Sans MS"
	ctx.fillText(number, x, y)
	ctx.fillStyle = backColor
}
//Рисуем всю разметку
function paintAllLines() {
	let NUMBER_OFFSET = RECT_SIZE/80
	//По x рисуем
	for(let i = 0; i < 5; i++){
		if (i===2){
			paintNumber((i-2)*radius/2, OFFSET + i*RADIUS_LENGTH + 2*NUMBER_OFFSET , RECT_SIZE/2 - NUMBER_OFFSET)
		}
		else {
			paintLineLenghtX(OFFSET + i*RADIUS_LENGTH, RECT_SIZE/2, length)
			paintNumber((i-2)*radius/2, OFFSET + i*RADIUS_LENGTH, RECT_SIZE/2 - NUMBER_OFFSET)
			ctx.fillStyle = "#480c48"
		}
	}
	//По y рисуем
	for(let i = 0; i < 5; i++){
		if (i === 2) continue;
		paintNumber((2-i)*radius/2, RECT_SIZE/2 + 2*NUMBER_OFFSET , OFFSET + i*RADIUS_LENGTH)
		paintLineLenghtY(RECT_SIZE/2 , OFFSET + i*RADIUS_LENGTH, length)
		ctx.fillStyle = "#480c48"
	}
}

function xFromCanvasToNoraml(coord){
	let ans = 2*radius*(coord - RECT_SIZE/2)/(LINE_LENGTHS)
	return ans;
}

function yFromCanvasToNoraml(coord){
	let ans = Math.round((-2)*radius*(coord - RECT_SIZE/2)/(LINE_LENGTHS));
	return ans
}

function xFromNormalToCanvas(coord){
	let ans = (coord*LINE_LENGTHS)/(2*radius) + RECT_SIZE/2;
	return ans
}

function yFromNormalToCanvas(coord){
	let ans = (coord*LINE_LENGTHS)/(-2*radius) + RECT_SIZE/2;
	return ans
}


function drawCoord(x ,y, color){
	let colorBack = ctx.fillStyle
	ctx.beginPath()
	ctx.fillStyle = color
	let dif = RECT_SIZE/2 - y;
	let yNewCor = RECT_SIZE/2 - Math.round(2*radius*dif/LINE_LENGTHS)*RADIUS_LENGTH*2/radius //todo
	ctx.arc(x, yNewCor, RECT_SIZE/100, 0, 2*Math.PI)
	ctx.fill()
	ctx.closePath()
	ctx.fillStyle = colorBack;
}

canvas.addEventListener("mousedown", e => {
	let xCor = e.clientX - MAIN_RECT.left
	let yCor = e.clientY - MAIN_RECT.top
	let rCor = radius
	clearArea()
	arrayOfCoords = [new Coordinate(xFromCanvasToNoraml(xCor), yFromCanvasToNoraml(yCor), rCor, undefined)]
	draw()
	$("#x_input").val(arrayOfCoords[0].x.toFixed(3))
	$("#y_input").val(arrayOfCoords[0].y)
	r_error.innerHTML = ""
	x_error.innerHTML = ""
	y_error.innerHTML = ""
})

function paintCoordsLines(){
	paintLineLenghtY(RECT_SIZE/2, RECT_SIZE/2, RECT_SIZE/2)
	let j = 1;
	while (j <= Number.parseInt(radius)){
		paintLineLenghtY(RECT_SIZE/2, RECT_SIZE/2 + j*RADIUS_LENGTH*2/radius, RECT_SIZE/2)
		paintLineLenghtY(RECT_SIZE/2, RECT_SIZE/2 - j*RADIUS_LENGTH*2/radius, RECT_SIZE/2)
		j++
	}
}

function drawAllCoords(){
	arrayOfCoords.forEach(elem =>{
		drawCoord(xFromNormalToCanvas(elem.x), yFromNormalToCanvas(elem.y), "yellow")
	})
	arrayOfCoordsFromServer.forEach(elem =>{
		if (elem.isNew === "OK"){
			drawCoord(xFromNormalToCanvas(elem.x), yFromNormalToCanvas(elem.y), "green")
		} else {
			drawCoord(xFromNormalToCanvas(elem.x), yFromNormalToCanvas(elem.y), "red")
		}
	})
}

function clearArea() {
	ctx.clearRect(0,0, RECT_SIZE, RECT_SIZE)
}

function draw() {
	drawMainRect()
	drawAxisY()
	drawAxisX()
	square()
	circle()
	triangle()
	paintCoordsLines()
	paintAllLines()
	drawAllCoords()
}

window.onload = () => {
	document.getElementById("r1").checked = true

	let jsonNew = sessionStorage.getItem("json")
	if(jsonNew != null && jsonNew !== "null"){
		let jsonObj = JSON.parse(jsonNew)
		for (let j = 0; j < jsonObj.length; j++){
			arrayOfCoordsFromServer.push(new Coordinate(jsonObj[j].x, jsonObj[j].y, jsonObj[j].r, jsonObj[j].isNew))
		}
	}
	draw()
}

//Часть про валидацию данных
function validateR(){
	let radius = $("input[name='radius']:checked").val()
	if (radius == undefined){
		r_error.innerHTML = "Не выбран радиус"
		return false;
	} else {
		r_error.innerHTML = ""
		return true;
	}
}

function validateX(){
	let x_val = $("input[type='text']").val()
	if (x_val){
		let new_x = Number.parseInt(x_val)
		if (!isNaN(new_x)){
			if (!(-5 < new_x && new_x > 3)){
				x_error.innerHTML = ""
				return true;
			} else {
				x_error.innerHTML = "Введенное число не входит в область"
			}
		} else {
			x_error.innerHTML = "Введено не число в поле x"
		}
	} else {
		x_error.innerHTML = "Не введена координата x"
	}
	return false;
}

function validateY(){
	let checkboxes = $("select[name='Y']:checked").val()
	if (checkboxes === 0) {
		y_error.innerHTML = "Не выбрана координата y"
		return false
	} else {
		y_error.innerHTML = ""
		return true
	}
}

document.querySelectorAll("input[type='radio']").forEach(elem =>{
	elem.addEventListener("change", e =>{
		validateR()
		if (elem.checked){
			radius = elem.value
			arrayOfCoords.forEach(elem =>{
				elem.r = radius
			})
			clearArea()
			draw()
		}
	})
})

document.getElementById("x_input").addEventListener("input", e=>{
	if (validateX()){
		if (arrayOfCoords.length != 0){
			arrayOfCoords = []
			document.querySelectorAll("select[name='Y']").forEach((elem)=>{
				if (elem.checked){
					arrayOfCoords.push(new Coordinate($("#x_input").val(), elem.value, radius, undefined))
				}
			})
		}
	} else {
		arrayOfCoords = []
	}
	clearArea()
	draw()
})

document.querySelectorAll("select[name='Y']").forEach((elem)=>{
	elem.addEventListener("change", e =>{
		validateY()
		arrayOfCoords = []
		document.querySelectorAll("select[name='Y']:checked").forEach((elems)=>{
			arrayOfCoords.push(new Coordinate($("#x_input").val(), elems.value, radius, undefined))

		})
		clearArea()
		draw()
	})

})

function validation() {
	if (validateX() && validateR() && validateY()){
		document.getElementById("form").submit()
	}
}