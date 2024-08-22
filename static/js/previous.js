var sectionyes_previousemp = document.getElementById('sectionyes_previousemp');
var sectionno_previousemp = document.getElementById('sectionno_previousemp');

var salary_previousemp = document.getElementById('salary_previousemp');
var salary_previousemp_Error = document.getElementById('salary_previousemp_Error');

var provident_fund = document.getElementById('provident_fund');
var provident_fund_Error = document.getElementById('provident_fund_Error');

var professional_tax = document.getElementById('professional_tax');
var professional_tax_Error = document.getElementById('professional_tax_Error');

var income_tax = document.getElementById('income_tax');
var income_tax_Error = document.getElementById('income_tax_Error');

var file_upload_row_previousemp = document.getElementById('file_upload_row_previousemp')


function clearAndHideFieldsPrevEmp() {

    salary_previousemp.value = null;
    provident_fund.value = null;
    professional_tax.value = null;
    income_tax.value = null;

    salary_previousemp_Error.textContent = '';
    professional_tax_Error.textContent = '';
    provident_fund_Error.textContent = '';
    income_tax_Error.textContent = '';


}

function previousEmpChecked(checkbox) {
    if (checkbox === 'yes') {
        document.getElementById('sectionpreviousemp_questions').style.display = 'block';
    } else {
        clearAndHideFieldsPrevEmp();
        document.getElementById('sectionpreviousemp_questions').style.display = 'none';
        file_upload_row_previousemp.style.display = 'none'

        if (localStorage.getItem('formData_previous')) {
            localStorage.removeItem('formData_previous');
        }
    }
    display_save5btn();
    save_father_ispan();
    files_display_section_none();
    display_submit();
    disable_btns();
}


function displayPreviousEmpFile() {

    if (salary_previousemp.value && provident_fund.value && professional_tax.value && income_tax.value &&
        salary_previousemp_Error.textContent === '' && provident_fund_Error.textContent === '' && professional_tax_Error.textContent === '' && income_tax_Error.textContent === '') {
        file_upload_row_previousemp.style.display = 'table-row'
    }
    else {
        file_upload_row_previousemp.style.display = 'none'
    }
    display_submit();
    disable_btns();
}


var convertedText_professional_tax = document.getElementById('convertedText_professional_tax');
var convertedText_provident_fund = document.getElementById('convertedText_provident_fund');
var convertedText_income_tax = document.getElementById('convertedText_income_tax');


function validateTotal() {
    var salary = parseFloat(document.getElementById('salary_previousemp').value) || 0;
    var professionalTax = parseFloat(document.getElementById('professional_tax').value) || 0;
    var providentFund = parseFloat(document.getElementById('provident_fund').value) || 0;
    var incomeTax = parseFloat(document.getElementById('income_tax').value) || 0;

    if (professionalTax < 0 || !Number.isInteger(professionalTax) ||
        providentFund < 0 || !Number.isInteger(providentFund) ||
        incomeTax < 0 || !Number.isInteger(incomeTax)) {

        return false;
    }

    var total = professionalTax + providentFund + incomeTax;

    var lastEnteredField = document.activeElement;

    if (total > salary) {
        var diff = total - salary;

        if (lastEnteredField.id === "income_tax") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                incomeTax -= diff;
                document.getElementById('income_tax').value = incomeTax;

                const amount = parseInt(incomeTax);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_income_tax.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_income_tax.style.color = "red";
                } else {
                    convertedText_income_tax.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "provident_fund") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                providentFund -= diff;
                document.getElementById('provident_fund').value = providentFund;

                const amount = parseInt(providentFund);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_provident_fund.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_provident_fund.style.color = "red";
                } else {
                    convertedText_provident_fund.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "professional_tax") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                professionalTax -= diff;
                if (professionalTax > 4000) {
                    professionalTax = 4000;
                }
                document.getElementById('professional_tax').value = professionalTax;

                const amount = parseInt(professionalTax);
                const convertedValue = convertToIndianCurrency(amount);
                convertedText_professional_tax.textContent = `${convertedValue} Rupees Only`;            
                if (amount >= 1000000) {
                    convertedText_professional_tax.style.color = "red";
                } else {
                    convertedText_professional_tax.style.color = "";
                }
            }
        } else if (lastEnteredField.id === "salary_previousemp") {
            document.getElementById('professional_tax').value = null;
            document.getElementById('provident_fund').value = null;
            document.getElementById('income_tax').value = null;
                        
            convertedText_professional_tax.textContent = '';
            convertedText_provident_fund.textContent = '';
            convertedText_income_tax.textContent = '';

        }
        displayPreviousEmpFile();
        return false;
    } else if (lastEnteredField.id === "salary_previousemp") {
        document.getElementById('professional_tax').value = null;
        document.getElementById('provident_fund').value = null;
        document.getElementById('income_tax').value = null;

                
        convertedText_professional_tax.textContent = '';
        convertedText_provident_fund.textContent = '';
        convertedText_income_tax.textContent = '';

    } else {
        return true;
    }

}



function validateSalaryPrevEmp(inputField) {    
    const convertedText_salary = document.getElementById("convertedText_salary");
    var inputValue = inputField.value;
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            salary_previousemp_Error.textContent = "Please enter a positive integer value.";
            convertedText_salary.textContent = '';
        } else if (parseFloat(inputValue) == 0) {
            salary_previousemp_Error.textContent = "";
            convertedText_salary.textContent = '';
        }
        else {
            salary_previousemp_Error.textContent = "";

            const amount = parseInt(inputField.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_salary.textContent = `${convertedValue} Rupees Only`;
            if (amount >= 1000000) {
                convertedText_salary.style.color = "red";
            } else {
                convertedText_salary.style.color = "";
            }
            validateTotal();
        }
    } else {
        salary_previousemp_Error.textContent = "";
        document.getElementById('professional_tax').value = null;
        document.getElementById('provident_fund').value = null;
        document.getElementById('income_tax').value = null;
        convertedText_salary.textContent = '';
    }
    displayPreviousEmpFile();
}


function validateProfessionalTax(inputField) {
    var salary = parseFloat(document.getElementById('salary_previousemp').value) || 0;
    var total = inputField.value;

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            professional_tax_Error.textContent = "Please enter a valid non-negative integer value.";
            convertedText_professional_tax.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_professional_tax.textContent = '';
        } else {
            professional_tax_Error.textContent = "";

            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_professional_tax.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_professional_tax.style.color = "red";
            } else {
                convertedText_professional_tax.style.color = "";
            }
        }
        if (total > 4000) {
            alert("Professional tax should not exceed Rs. 4,000.");
            inputField.value = 4000;

            const amount = parseInt(4000);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_professional_tax.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_professional_tax.style.color = "red";
            } else {
                convertedText_professional_tax.style.color = "";
            }
        }
    } else{
        convertedText_professional_tax.textContent = '';
    }
    validateTotal();
    displayPreviousEmpFile();
}

function validateProvidentFund(inputField) {
    var salary = parseFloat(document.getElementById('salary_previousemp').value) || 0;
    var total = inputField.value;

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            provident_fund_Error.textContent = "Please enter a valid non-negative integer value.";
            convertedText_provident_fund.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_provident_fund.textContent = '';
        } else {
            provident_fund_Error.textContent = "";

            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_provident_fund.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_provident_fund.style.color = "red";
            } else {
                convertedText_provident_fund.style.color = "";
            }
        }
    } else{
        convertedText_provident_fund.textContent = '';
    }
    validateTotal();
    displayPreviousEmpFile();
}

function validateIncomeTax(inputField) {
    var salary = parseFloat(document.getElementById('salary_previousemp').value) || 0;
    var total = inputField.value;

    if (total) {
        if (isNaN(total) || total.includes('.') || parseFloat(total) < 0) {
            income_tax_Error.textContent = "Please enter a valid non-negative integer value.";
            convertedText_income_tax.textContent = '';
        } else if (Number(total) == 0) {
            convertedText_income_tax.textContent = '';
        } else {
            income_tax_Error.textContent = "";

            const amount = parseInt(total);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_income_tax.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_income_tax.style.color = "red";
            } else {
                convertedText_income_tax.style.color = "";
            }
        }
    } else{
        convertedText_income_tax.textContent = '';
    }
    validateTotal();
    displayPreviousEmpFile();
}

function uploadEmploymentProofPrevEmp() {

    const formData_previous = {
        salary_previousempValue: salary_previousemp.value,
        provident_fundValue: provident_fund.value,
        professional_taxValue: professional_tax.value,
        income_taxValue: income_tax.value,
    };
    const jsonData = JSON.stringify(formData_previous);
    localStorage.setItem('formData_previous', jsonData);


    if (regimeValue == 'New') {
        if (localStorage.getItem('currentTab') !== null) {
            currentTab = 2;
        } else {
            localStorage.setItem('currentTab', 2)
        }

    } else {
        if (localStorage.getItem('currentTab') !== null) {
            currentTab = 5;
        } else {
            localStorage.setItem('currentTab', 5)
        }
    }

    let apiUrl = "upload_prev_emp_file";
    document.getElementById("previousemp_form").action = apiUrl;
    document.getElementById("previousemp_form").submit();
}

if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
    document.addEventListener("DOMContentLoaded", function () {
        var sectionyes_previousempbtn = document.getElementById('sectionyes_previousemp');
        var sectionno_previousempbtn = document.getElementById('sectionno_previousemp');


        const storedData_previous = localStorage.getItem('formData_previous');
        if (storedData_previous) {
            const storedFormData = JSON.parse(storedData_previous);

            if (storedFormData) {
                salary_previousemp.value = storedFormData.salary_previousempValue;
                provident_fund.value = storedFormData.provident_fundValue;
                professional_tax.value = storedFormData.professional_taxValue;
                income_tax.value = storedFormData.income_taxValue;

                sectionyes_previousempbtn.checked = true;
                checkbox = 'yes'
                previousEmpChecked(checkbox);
            }
        }

        if (sectionyes_previousempbtn.checked === true) {
            checkbox = 'yes'
            previousEmpChecked(checkbox);
        } else {
            checkbox = 'no'
            previousEmpChecked(checkbox);
        }

        displayPreviousEmpFile();


        if (salary_previousemp.value) {
            validateSalaryPrevEmp(salary_previousemp);
        }

        if (provident_fund.value) {
            validateProvidentFund(provident_fund);
        }

        if (professional_tax.value) {
            validateProfessionalTax(professional_tax);
        }

        if (income_tax.value) {
            validateIncomeTax(income_tax);
        }





    });
}