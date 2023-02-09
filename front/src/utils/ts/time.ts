function changeForm(date : Date){
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " "  + " " + date.getHours() + ":" + date.getMinutes();
}

export {changeForm};