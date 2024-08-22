

var regimeValue = String(regimeValue);

var empStartDate = new Date(empDoj);



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





function validateunspecified_income() {
    var unspecified_incomeValue = document.getElementById('unspecified_income').value;
    var unspecified_incomeErrorSpan = document.getElementById('unspecified_incomeError');

    if (unspecified_incomeValue) {
        if (!Number.isInteger(Number(unspecified_incomeValue)) || Number(unspecified_incomeValue) < 0 || unspecified_incomeValue.includes('.')) {
            document.getElementById('savebtn7').disabled = true;
            document.getElementById('New_Submit').disabled = true;
            unspecified_incomeErrorSpan.textContent = 'Other Income value must be positive integer number.'

        } else {
            document.getElementById('savebtn7').disabled = false;
            document.getElementById('New_Submit').disabled = false;
            unspecified_incomeErrorSpan.textContent = ''
        }
    } else {
        document.getElementById('savebtn7').disabled = false;
        document.getElementById('New_Submit').disabled = false;
        unspecified_incomeErrorSpan.textContent = ''
    }
}



var regimeValue = String(regimeValue);

var salary2 = 0;

document.addEventListener("DOMContentLoaded", function () {
    if (regimeValue == 'New') {
        var empsalary2Value = document.getElementById('empsalary2').value;

        if (empsalary2Value) {
            salary2 = empsalary2Value;
        }
    }

});

var convertedText_professionaltax2 = document.getElementById("convertedText_professionaltax2");
var convertedText_providentfund2 = document.getElementById("convertedText_providentfund2");
var convertedText_incometax62 = document.getElementById("convertedText_incometax62");



function validateTotal() {
    var empsalary2 = parseFloat(document.getElementById('empsalary2').value) || 0;
    var professionaltax2 = parseFloat(document.getElementById('professionaltax2').value) || 0;
    var providentfund2 = parseFloat(document.getElementById('providentfund2').value) || 0;
    var incometax62 = parseFloat(document.getElementById('incometax62').value) || 0;

    if (professionaltax2 < 0 || !Number.isInteger(professionaltax2) ||
        providentfund2 < 0 || !Number.isInteger(providentfund2) ||
        incometax62 < 0 || !Number.isInteger(incometax62)) {

        return false;
    }

    var total = professionaltax2 + providentfund2 + incometax62;

    var lastEnteredField = document.activeElement;

    if (total > empsalary2) {

        var diff = total - empsalary2;

        if (lastEnteredField.id === "incometax62") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > empsalary2) {
                incometax62 -= diff;
                document.getElementById('incometax62').value = incometax62;

                const amount = parseInt(incometax62);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_incometax62.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_incometax62.style.color = "red";
                } else {
                    convertedText_incometax62.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "providentfund2") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > empsalary2) {
                providentfund2 -= diff;
                document.getElementById('providentfund2').value = providentfund2;

                const amount = parseInt(providentfund2);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_providentfund2.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_providentfund2.style.color = "red";
                } else {
                    convertedText_providentfund2.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "professionaltax2") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > empsalary2) {
                professionaltax2 -= diff;
                if (professionaltax2 > 4000) {
                    professionaltax2 = 4000;
                }
                document.getElementById('professionaltax2').value = professionaltax2;

                const amount = parseInt(professionaltax2);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_professionaltax2.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_professionaltax2.style.color = "red";
                } else {
                    convertedText_professionaltax2.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "empsalary2") {
            document.getElementById('professionaltax2').value = null;
            document.getElementById('providentfund2').value = null;
            document.getElementById('incometax62').value = null;

                        
            convertedText_professionaltax2.textContent = '';
            convertedText_providentfund2.textContent = '';
            convertedText_incometax62.textContent = '';
        }

        return false;
    } else if (lastEnteredField.id === "empsalary2") {
        document.getElementById('professionaltax2').value = null;
        document.getElementById('providentfund2').value = null;
        document.getElementById('incometax62').value = null;
                
        convertedText_professionaltax2.textContent = '';
        convertedText_providentfund2.textContent = '';
        convertedText_incometax62.textContent = '';
    } else {
        return true;
    }

}

function validateEmpSalary2() {
    var inputValue = document.getElementById('empsalary2').value;
    var empsalary2ErrorSpan = document.getElementById('empsalary2Error');
    const convertedText_empsalary_2 = document.getElementById("convertedText_empsalary_2");

    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            document.getElementById('savebtn8').disabled = true;
            document.getElementById('New_Submit').disabled = true;
            empsalary2ErrorSpan.textContent = "Please enter a positive integer value.";
            convertedText_empsalary_2.textContent = '';
        } else if (Number(inputValue) == 0) {
            convertedText_empsalary_2.textContent = '';
        } else {
            document.getElementById('savebtn8').disabled = false;
            document.getElementById('New_Submit').disabled = false;
            empsalary2ErrorSpan.textContent = "";

            const amount = parseInt(inputValue);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_empsalary_2.textContent = `${convertedValue} Rupees Only`;            // Apply red color if amount is greater than 1000000
            if (amount >= 1000000) {
                convertedText_empsalary_2.style.color = "red";
            } else {
                convertedText_empsalary_2.style.color = "";
            }

            validateTotal();
        }
    } else {
        empsalary2ErrorSpan.textContent = "";
        document.getElementById('professionaltax2').value = null;
        document.getElementById('providentfund2').value = null;
        document.getElementById('incometax62').value = null;
        convertedText_empsalary_2.textContent = '';
    }
}


function validateProfessionalTax2() {
    var salary = parseFloat(document.getElementById('empsalary2').value) || 0;
    var total = document.getElementById('professionaltax2').value;
    var professionaltax2ErrorSpan = document.getElementById('professionaltax2Error');

    

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            professionaltax2ErrorSpan.textContent = "Please enter a valid non-negative integer value.";
            convertedText_professionaltax2.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_professionaltax2.textContent = '';
        } else {
            professionaltax2ErrorSpan.textContent = "";
            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_professionaltax2.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_professionaltax2.style.color = "red";
            } else {
                convertedText_professionaltax2.style.color = "";
            }
        }
        if (total > 4000) {
            alert("Professional tax should not exceed Rs. 4,000.");
            document.getElementById('professionaltax2').value = '4000';

            const amount = parseInt(4000);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_professionaltax2.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_professionaltax2.style.color = "red";
            } else {
                convertedText_professionaltax2.style.color = "";
            }
        }
    } else {
        convertedText_professionaltax2.textContent = '';
    }
    validateTotal();
}

function validateProvidentfund2() {
    var salary = parseFloat(document.getElementById('empsalary2').value) || 0;
    var total = document.getElementById('providentfund2').value;
    var providentfund2ErrorSpan = document.getElementById('providentfund2Error');

    

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            providentfund2ErrorSpan.textContent = "Please enter a valid non-negative integer value.";
            convertedText_providentfund2.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_providentfund2.textContent = '';
        } else {
            providentfund2ErrorSpan.textContent = "";
            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_providentfund2.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_providentfund2.style.color = "red";
            } else {
                convertedText_providentfund2.style.color = "";
            }
        }
    } else {
        convertedText_providentfund2.textContent = '';
    }
    validateTotal();
}

function validateIncometax62() {
    var salary = parseFloat(document.getElementById('empsalary2').value) || 0;
    var total = document.getElementById('incometax62').value;

    var incometax62ErrorSpan = document.getElementById('incometax62Error');

    

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            incometax62ErrorSpan.textContent = "Please enter a valid non-negative integer value.";
            convertedText_incometax62.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_incometax62.textContent = '';
        } else {
            incometax62ErrorSpan.textContent = "";
            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_incometax62.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_incometax62.style.color = "red";
            } else {
                convertedText_incometax62.style.color = "";
            }
        } 
    } else {
        convertedText_incometax62.textContent = '';
    }
    validateTotal();
}





function New_Submit() {

    var unspecified_income = document.querySelector('input[name="unspecified_income"]').value;

    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
        var empsalary2 = document.querySelector('input[name="empsalary2"]').value;
        var professionaltax2 = document.querySelector('input[name="professionaltax2"]').value;
        var providentfund2 = document.querySelector('input[name="providentfund2"]').value;
        var incometax62 = document.querySelector('input[name="incometax62"]').value;
    }


    // Create a message with selected values for form2
    var message = "<h5>Selected values for Other Income Unspecified</h5>";
    message += "<table class='bordered-table'>";
    message += "<tr><td style='width: 500px;'>Other Income Unspecified:</td><td><input value='" + unspecified_income + "' readonly></td></tr>";
    message += "</table>";

    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
        message += "<h5>Selected values for Previous Employment</h5>";
        message += "<table class='bordered-table'>";
        message += "<tr><td style='width: 500px;'>Salary as privision u/s 17(1):</td><td><input value='" + empsalary2 + "' readonly></td></tr>";
        message += "<tr><td>Professional Tax:</td><td><input value='" + professionaltax2 + "' readonly></td></tr>";
        message += "<tr><td>Provident Fund:</td><td><input value='" + providentfund2 + "' readonly></td></tr>";
        message += "<tr><td>Income Tax:</td><td><input value='" + incometax62 + "' readonly></td></tr>";
        message += "</table>";
    }

    // Display the message in the modal
    document.getElementById('New_message').innerHTML = message;
    $('#New_modal').modal('show');
}



if (regimeValue == 'New') {
    document.getElementById('New_cancle').addEventListener('click', function () {
        var New_modal = document.getElementById('New_modal');
        if (New_modal) {
            $(New_modal).modal('hide');
        }
    });
}


var sub_btn_2 = document.getElementById('sub_btn_2');

var it_dec_check2 = document.getElementById('it_dec_check2');

function enable_btn_2() {
    if (it_dec_check2.checked == true) {
        sub_btn_2.disabled = false;
    } else {
        sub_btn_2.disabled = true;
    }
}

function New_submit() {

    if (sub_btn_2.disabled == false) {

        // Construct the API endpoint URL
        let apiUrl = "TaxDeclaration_submit2";

        // Create FormData objects for both forms
        let formDataForm7 = new FormData(document.getElementById("form7"));

        if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
            let formDataForm8 = new FormData(document.getElementById("form8"));
            // Merge form data
            for (let [key, value] of formDataForm8.entries()) {
                formDataForm7.append(key, value);
            }
        }

        // Use the fetch API to make an asynchronous request
        fetch(apiUrl, {
            method: 'POST',
            body: formDataForm7,
        })

        let redirectUrl = "ITDeclarations";


        setTimeout(function () {
            alert("Values for IT declarations are submitted successfully.");
            window.location.href = redirectUrl;

            // Reload the page after the redirection
            window.location.reload();
        }, 1000); // Adjust the delay (in milliseconds) as needed

        var New_modal = document.getElementById('New_modal');
        if (New_modal) {
            $(New_modal).modal('hide');
        }
    } else {
        if (it_dec_check2.checked == false) {
            it_dec_check2.setCustomValidity("Please check this field");
            it_dec_check2.reportValidity();
        }
    }
}



document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById('empsalary2').value) {
        validateEmpSalary2()
    }

    if (document.getElementById('professionaltax2').value) {
        validateProfessionalTax2()
    }

    if (document.getElementById('providentfund2').value) {
        validateProvidentfund2()
    }

    if (document.getElementById('incometax62').value) {
        validateIncometax62()
    }


});

