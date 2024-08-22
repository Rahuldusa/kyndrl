

var noproofsub = document.getElementById('noproofsub');

var r3 = document.getElementById('r3');



var empjoinDate = new Date(empDoj);

var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed month

// Calculate financial year start and end based on current month
var financialYearStart, financialYearEnd;

if (currentMonth >= 4 && currentMonth <= 12) {
    // If the current month is April to December
    financialYearStart = new Date(currentYear, 3, 1); // April 1st of current year
    financialYearEnd = new Date(currentYear + 1, 2, 31); // March 31st of next year
} else {
    // If the current month is January to March
    financialYearStart = new Date(currentYear - 1, 3, 1); // April 1st of previous year
    financialYearEnd = new Date(currentYear, 2, 31); // March 31st of current year
}


var new_empjoinDate = new Date(empjoinDate.getFullYear(), empjoinDate.getMonth() + 1, 18);
var new_financialYearStart = new Date(financialYearStart.getFullYear(), financialYearStart.getMonth(), 18);



if (submit_DT_1 != null) {
    var submit_DT_1 = new Date(submit_DT_1);
}


document.addEventListener("DOMContentLoaded", function () {

    if (!submit_DT_1) {
        if (empjoinDate >= financialYearStart && financialYearEnd >= empjoinDate) {
            if (new_empjoinDate >= currentDate) {
                r3.style.display = 'block';
                noproofsub.style.display = 'none';
            } else {
                r3.style.display = 'none';
                noproofsub.style.display = 'block';
            }
        } else if (financialYearStart >= empjoinDate) {
            if (new_financialYearStart >= currentDate) {
                r3.style.display = 'block';
                noproofsub.style.display = 'none';
            } else {
                r3.style.display = 'none';
                noproofsub.style.display = 'block';
            }
        }
    } 

});


