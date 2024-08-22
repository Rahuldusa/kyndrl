

empStartDate

var regimeValue = String(regimeValue);

var empStartDate = new Date(startdate);

var startdate = new Date(startdate);


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


var section80oiyesbtn = document.getElementById('section80oiyes');
var other_income_oiInp = document.getElementById('other_income_oi');
var other_income_ErrorSpan = document.getElementById('other_income_Error');


var sectionyes_previousempbtn


var salary_previousemp = document.getElementById('salary_previousemp');
var salary_previousemp_Error = document.getElementById('salary_previousemp_Error');

var provident_fund = document.getElementById('provident_fund');
var provident_fund_Error = document.getElementById('provident_fund_Error');

var professional_tax = document.getElementById('professional_tax');
var professional_tax_Error = document.getElementById('professional_tax_Error');

var income_tax = document.getElementById('income_tax');
var income_tax_Error = document.getElementById('income_tax_Error');




var placeInput = document.getElementById('place');
var placeErrorSpan = document.getElementById('placeError');
var itproofcheckBox = document.getElementById('itproofcheck');


var saved_basic_empid = String(saved_basic_empid);

if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
    sectionyes_previousempbtn = document.getElementById('sectionyes_previousemp');
}


var saved_basic_current_page = String(saved_basic_current_page);




function save_father_ispan() {

    if (section80oiyesbtn.checked == true) {
        var fathernameValue = document.getElementById('fathername');
        var isyourpanyesbtn = document.getElementById('isyourpanyes');
        var isyourpannobtn = document.getElementById('isyourpanno');

        var isyourpan_new = null

        if (isyourpanyesbtn.checked == true) {
            isyourpan_new = 'yes'
        } else if (isyourpannobtn.checked == true) {
            (isyourpan_new = 'no')
        }
        const Basic_form_formData = {
            fathernameValue: fathernameValue.value,
            isyourpan_new: isyourpan_new
        };

        const jsonData = JSON.stringify(Basic_form_formData);
        localStorage.setItem('Basic_form_formData', jsonData);
    } else if (sectionyes_previousempbtn) {
        if (sectionyes_previousempbtn.checked == true) {
            var fathernameValue = document.getElementById('fathername');
            var isyourpanyesbtn = document.getElementById('isyourpanyes');
            var isyourpannobtn = document.getElementById('isyourpanno');

            var isyourpan_new = null

            if (isyourpanyesbtn.checked == true) {
                isyourpan_new = 'yes'
            } else if (isyourpannobtn.checked == true) {
                (isyourpan_new = 'no')
            }
            const Basic_form_formData = {
                fathernameValue: fathernameValue.value,
                isyourpan_new: isyourpan_new
            };

            const jsonData = JSON.stringify(Basic_form_formData);
            localStorage.setItem('Basic_form_formData', jsonData);
        } else {
            if (localStorage.getItem('Basic_form_formData') !== null) {
                localStorage.removeItem('Basic_form_formData');
            }
            if (localStorage.getItem('currentTab') !== null) {
                localStorage.removeItem('currentTab');
            }
        }
    } else {
        if (localStorage.getItem('Basic_form_formData') !== null) {
            localStorage.removeItem('Basic_form_formData');
        }
        if (localStorage.getItem('currentTab') !== null) {
            localStorage.removeItem('currentTab');
        }
    }
}



// Set the minimum date to the current date
var currentDate = new Date();
var formattedCurrentDate = currentDate.toISOString().split('T')[0];

function openPdf2(empid) {

    var new_empid = empid.split(",")

    var empid1 = new_empid[0]
    var filaname = new_empid[1]
    var filepath = new_empid[2]


    var file_paths = filepath.split('/')

    var new_file_path = file_paths[3]

    var url = "/static/media/" + empid1 + "/" + new_file_path;

    var New_fileName = filaname.replace(/\./g, '');

    document.getElementById('viewFrame').src = url


}


var digitally_signed_other = document.getElementById('digitally_signed_other');
var submit_other_btn = document.getElementById('submit_other_btn');


function SignedDigitallyStatus_other() {
    if (digitally_signed_other.checked == true) {
        submit_other_btn.disabled = false;
    } else {
        submit_other_btn.disabled = true;
    }
}

function submit_other() {
    if (submit_other_btn.disabled == false) {
        var apiUrl = 'view_other_form';
        submit_other_btn.href = apiUrl;
    } else {
        if (digitally_signed_other.checked == false) {
            digitally_signed_other.setCustomValidity("Please Check this field");
            digitally_signed_other.reportValidity();
        }
    }
}

function cancelcheck6() {
    digitally_signed_other.checked = false;
}

document.addEventListener("DOMContentLoaded", function () {

    var fathernameValue = document.getElementById('fathername');
    var isyourpanyesbtn = document.getElementById('isyourpanyes');
    var isyourpannobtn = document.getElementById('isyourpanno');

    const storedData_basic = localStorage.getItem('Basic_form_formData');
    if (storedData_basic) {
        const storedFormData = JSON.parse(storedData_basic);
        if (storedFormData.fathernameValue) {

            fathernameValue.value = storedFormData.fathernameValue;
            ValidateFatherName();
            if (storedFormData.isyourpan_new == 'yes') {
                isyourpanyesbtn.checked = true;
                isyourpan = 'yes'
                Validateisyourpan_2(isyourpan);
            } else if (storedFormData.isyourpan_new == 'no') {
                isyourpannobtn.checked = true;
                isyourpan = 'no'
                Validateisyourpan_2(isyourpan);
            } else {
                isyourpanyesbtn.checked = false;
                isyourpannobtn.checked = false;
                isyourpan = null;
                Validateisyourpan_2(isyourpan);
            }
        }
    }

});


// Function to convert number to Indian currency text format
function convertToIndianCurrency(number) {
    const numberWords = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tensWords = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (Number(number) > Number(10000000)){
        number = Number(10000000)
    }

    
    if (number === 0) {
        return "Zero";
    }

    if (number < 20) {
        return numberWords[number];
    }

    if (number < 100) {
        return tensWords[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + numberWords[number % 10] : "");
    }

    if (number < 1000) {
        return numberWords[Math.floor(number / 100)] + " Hundred" + (number % 100 !== 0 ? " " + convertToIndianCurrency(number % 100) : "");
    }

    if (number < 100000) {
        return convertToIndianCurrency(Math.floor(number / 1000)) + " Thousand" + (number % 1000 !== 0 ? " " + convertToIndianCurrency(number % 1000) : "");
    }

    if (number < 10000000) {
        return convertToIndianCurrency(Math.floor(number / 100000)) + " Lakh" + (number % 100000 !== 0 ? " " + convertToIndianCurrency(number % 100000) : "");
    }

    if (number < 1000000000) {
        return convertToIndianCurrency(Math.floor(number / 10000000)) + " Crore" + (number % 10000000 !== 0 ? " " + convertToIndianCurrency(number % 10000000) : "");
    }

    return "Enter valid amount below one crore";
}




document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        if (input.id !== 'incomeLossOnHouseProperty' && input.id !== 'standardDeduction') {
            input.onkeydown = function(event) {
                return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code !== 'Space';
            };
            input.addEventListener('input', function() {
                if (input.value > Number(10000000)) {
                    input.value = Number(10000000);
                    
                    if (input.id === 'other_income_oi'){
                        convertedText_otherincome.textContent = 'One crore rupees';
                    }
                }
            });
        }
    });
});


document.querySelectorAll('.place_inp').forEach(function(input) {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });
});