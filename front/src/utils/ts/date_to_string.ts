// 2023-02-14T02:00:00.000+00:00
function DATE_TO_STRING(date: string){
    console.log("Date_TE_STRING date  : " + date)
    if(date === undefined){
        return;
    }
    const result1: string = date.split('.')[0];
    const yyyy_mm_dd_hour_min_sec: string[] = result1.split(':');
    console.log(yyyy_mm_dd_hour_min_sec);
    const yyyy_mm_dd_hour: string[] = yyyy_mm_dd_hour_min_sec[0].split('T');
    const am_pm_hour = replace_am_pm(yyyy_mm_dd_hour[1]);
    return yyyy_mm_dd_hour[0] + am_pm_hour + ":" + yyyy_mm_dd_hour_min_sec[1];
}

function replace_am_pm(hour: string){
    const result1: number = parseInt(hour);
    let result: string = "";
    if(result1 > 12){
        const tmp = (result1 - 12).toString();
        if(result1 > 21){
            result = " PM " + tmp;
        }
        result = " PM 0" + tmp;
    }
    else{
        const tmp = result1.toString();
        if(result1 > 9){
            result = " AM " + tmp;
        }
        result = " AM 0" + tmp;
    }

    return result;
}

export default DATE_TO_STRING;