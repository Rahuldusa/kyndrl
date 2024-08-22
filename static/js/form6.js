
var regimeValue = String(regimeValue);

var salary = 0;

var empsalaryValue_new = document.getElementById('empsalary').value;
var professionaltaxValue_new = document.getElementById('professionaltax').value;
var providentfundValue_new = document.getElementById('providentfund').value;
var incometax6Value_new = document.getElementById('incometax6').value;


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

if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
    // console.log('empStartDate', empStartDate)
    // console.log('financialYearStart', financialYearStart)
    // console.log('financialYearEnd', financialYearEnd)
    document.addEventListener("DOMContentLoaded", function () {

        if (empsalaryValue_new) {
            salary = empsalaryValue_new;
        } else {
            salary = 0
        }

    });
}


var convertedText_professionaltax = document.getElementById("convertedText_professionaltax");
var convertedText_providentfund = document.getElementById("convertedText_providentfund");
var convertedText_incometax6 = document.getElementById("convertedText_incometax6");



function validateTotal() {
    var salary = parseFloat(document.getElementById('empsalary').value) || 0;
    var professionalTax = parseFloat(document.getElementById('professionaltax').value) || 0;
    var providentFund = parseFloat(document.getElementById('providentfund').value) || 0;
    var incomeTax = parseFloat(document.getElementById('incometax6').value) || 0;

    if (professionalTax < 0 || !Number.isInteger(professionalTax) ||
        providentFund < 0 || !Number.isInteger(providentFund) ||
        incomeTax < 0 || !Number.isInteger(incomeTax)) {

        return false;
    }

    var total = professionalTax + providentFund + incomeTax;

    var lastEnteredField = document.activeElement;

    if (total > salary) {

        var diff = total - salary;

        if (lastEnteredField.id === "incometax6") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                incomeTax -= diff;
                document.getElementById('incometax6').value = incomeTax;

                const amount = parseInt(incomeTax);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_incometax6.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_incometax6.style.color = "red";
                } else {
                    convertedText_incometax6.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "providentfund") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                providentFund -= diff;
                document.getElementById('providentfund').value = providentFund;

                const amount = parseInt(providentFund);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_providentfund.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_providentfund.style.color = "red";
                } else {
                    convertedText_providentfund.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "professionaltax") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                professionalTax -= diff;
                if (professionalTax > 4000) {
                    professionalTax = 4000;
                }
                document.getElementById('professionaltax').value = professionalTax;
                
                const amount = parseInt(professionalTax);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_professionaltax.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_professionaltax.style.color = "red";
                } else {
                    convertedText_professionaltax.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "empsalary") {
            document.getElementById('professionaltax').value = null;
            document.getElementById('providentfund').value = null;
            document.getElementById('incometax6').value = null;
                        
            convertedText_professionaltax.textContent = '';
            convertedText_providentfund.textContent = '';
            convertedText_incometax6.textContent = '';
        }

        return false;
    } else if (lastEnteredField.id === "empsalary") {
        document.getElementById('professionaltax').value = null;
        document.getElementById('providentfund').value = null;
        document.getElementById('incometax6').value = null;
  
        convertedText_professionaltax.textContent = '';
        convertedText_providentfund.textContent = '';
        convertedText_incometax6.textContent = '';
    } else {
        return true;
    }

}

function validateEmpSalary() {
    var empsalary = document.getElementById('empsalary')
    var inputValue = empsalary.value;
    var empsalaryErrorSpan = document.getElementById('empsalaryError');

    const convertedText_empsalary = document.getElementById("convertedText_empsalary");

    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            document.getElementById('savebtn6').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            empsalaryErrorSpan.textContent = "Please enter a positive integer value.";
            convertedText_empsalary.textContent = '';
        } else if (Number(inputValue) == 0) {
            convertedText_empsalary.textContent = '';
            empsalaryErrorSpan.textContent = "";
        } else {
            document.getElementById('savebtn6').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            empsalaryErrorSpan.textContent = "";

            const amount = parseInt(empsalary.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_empsalary.textContent = `${convertedValue} Rupees Only`;
            if (amount >= 1000000) {
                convertedText_empsalary.style.color = "red";
            } else {
                convertedText_empsalary.style.color = "";
            }

            validateTotal();
        }
    } else {
        empsalaryErrorSpan.textContent = "";
        document.getElementById('professionaltax').value = null;
        document.getElementById('providentfund').value = null;
        document.getElementById('incometax6').value = null;
        convertedText_empsalary.textContent = '';

    }
}


function validateProfessionalTax() {
    var salary = parseFloat(document.getElementById('empsalary').value) || 0;
    var total = document.getElementById('professionaltax').value;
    var professionaltaxErrorSpan = document.getElementById('professionaltaxError');

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            professionaltaxErrorSpan.textContent = "Please enter a valid non-negative integer value.";
            convertedText_professionaltax.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_professionaltax.textContent = '';
        } else {
            professionaltaxErrorSpan.textContent = "";    
            
            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_professionaltax.textContent = `${convertedValue} Rupees Only`;
            if (amount >= 1000000) {
                convertedText_professionaltax.style.color = "red";
            } else {
                convertedText_professionaltax.style.color = "";
            }
        }
        if (total > 4000) {
            alert("Professional tax should not exceed Rs. 4,000.");
            document.getElementById('professionaltax').value = '4000';

            const amount = parseInt(4000);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_professionaltax.textContent = `${convertedValue} Rupees Only`;
            if (amount >= 1000000) {
                convertedText_professionaltax.style.color = "red";
            } else {
                convertedText_professionaltax.style.color = "";
            }
        } 
    } else {
        convertedText_professionaltax.textContent = '';
    }
    validateTotal();
}

function validateProvidentfund() {
    var salary = parseFloat(document.getElementById('empsalary').value) || 0;
    var total = document.getElementById('providentfund').value;
    var providentfundErrorSpan = document.getElementById('providentfundError');

    

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            providentfundErrorSpan.textContent = "Please enter a valid non-negative integer value.";
            convertedText_providentfund.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_providentfund.textContent = '';
        } else {
            providentfundErrorSpan.textContent = "";

            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_providentfund.textContent = `${convertedValue} Rupees Only`;
            if (amount >= 1000000) {
                convertedText_providentfund.style.color = "red";
            } else {
                convertedText_providentfund.style.color = "";
            }
        }
    } else {
        convertedText_providentfund.textContent = '';
    }
    validateTotal();
}

function validateIncometax6() {
    var salary = parseFloat(document.getElementById('empsalary').value) || 0;
    var total = document.getElementById('incometax6').value;

    var incometax6ErrorSpan = document.getElementById('incometax6Error');

    

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            incometax6ErrorSpan.textContent = "Please enter a valid non-negative integer value.";
            convertedText_incometax6.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_incometax6.textContent = '';
        } else {
            incometax6ErrorSpan.textContent = "";
            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_incometax6.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_incometax6.style.color = "red";
            } else {
                convertedText_incometax6.style.color = "";
            }
        }
    } else{
        convertedText_incometax6.textContent = '';
    }
    validateTotal();
}



document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById('empsalary').value) {
        validateEmpSalary()
    }

    if (document.getElementById('professionaltax').value) {
        validateProfessionalTax()
    }

    if (document.getElementById('providentfund').value) {
        validateProvidentfund()
    }

    if (document.getElementById('incometax6').value) {
        validateIncometax6()
    }

    


});


