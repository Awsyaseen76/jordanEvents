// Month is 0 index 06 is July

// 0: Sun   1: Mon   2: Tue   3: Wed    4: Thu  5: Fri  6: Sat 


var startDate = new Date(2018, 6, 2);
var endDate = new Date(2018, 7, 15);

function calculateDays(start, end){
    var days = []
    for (start; end>start; start.setDate(start.getDate()+1)){
        if(start.getDay() === 6 || start.getDay() === 1 || start.getDay() === 3){
            days.push(start.toDateString());
        }
    }
    return days;
}

