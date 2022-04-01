update()
setInterval(update, 8000);

function update(){
    document.getElementById('time').innerText = currentTime()
    document.getElementById('date').innerText = currentDate()
}

function currentTime(){
    let date = new Date()
    let hours = validateTime(date.getHours())
    let minutes = validateTime(date.getMinutes())
    let seconds = validateTime(date.getSeconds())

    return `${hours}:${minutes}:${seconds}`
}

function validateTime(time){
    if (String(time).length < 2){
        console.log(String(time).length)
        return `0${time}`
    }else return time
}

function currentDate(){
    let date = new Date()
    return `${getWeekDay(date)}, ${date.getDate()} ${getMonthName(date)} ${date.getFullYear()} г.`
}

function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date.getDay()];
}

function getMonthName(date) {
    let days = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
        'октября', 'ноября', 'декабря'];
    return days[date.getMonth()];
}