




function validateTotal() {
    var salary = parseFloat(allowed_salary_previousemp.value) || 0;
    var professionalTax = parseFloat(allowed_professional_tax.value) || 0;
    var providentFund = parseFloat(allowed_provident_fund.value) || 0;
    var incomeTax = parseFloat(allowed_income_tax.value) || 0;

    if (professionalTax < 0 || !Number.isInteger(professionalTax) ||
        providentFund < 0 || !Number.isInteger(providentFund) ||
        incomeTax < 0 || !Number.isInteger(incomeTax)) {

        return false;
    }
    var total = professionalTax + providentFund + incomeTax;

    var lastEnteredField = document.activeElement;

    if (total > salary) {        
        var diff = total - salary;

        if (lastEnteredField.id === "allowed_income_tax") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                incomeTax -= diff;
                document.getElementById('allowed_income_tax').value = incomeTax;
            }
        } else if (lastEnteredField.id === "allowed_provident_fund") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                providentFund -= diff;
                document.getElementById('allowed_provident_fund').value = providentFund;
            }
        } else if (lastEnteredField.id === "allowed_professional_tax") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                professionalTax -= diff;
                if (professionalTax > 4000) {
                    professionalTax = 4000;
                }
                document.getElementById('allowed_professional_tax').value = professionalTax;
            }
        } else if (lastEnteredField.id === "allowed_salary_previousemp") {
            document.getElementById('allowed_professional_tax').value = null;
            document.getElementById('allowed_provident_fund').value = null;
            document.getElementById('allowed_income_tax').value = null;
        }        
        return false;
    } else if (lastEnteredField.id === "allowed_salary_previousemp") {
        document.getElementById('allowed_professional_tax').value = null;
        document.getElementById('allowed_provident_fund').value = null;
        document.getElementById('allowed_income_tax').value = null;
    } else {
        return true;
    }
    submit_btn_enable();
}

function validateAllowed_salary_previousemp() {
    if (allowed_salary_previousemp.value) {
        inputValue = allowed_salary_previousemp.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_salary_previousempError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_salary_previousempError.textContent = '';
        } else {
            allowed_salary_previousempError.textContent = '';
        }
    } else {
        allowed_salary_previousempError.textContent = '';
    }
    validateTotal();
}


function validateAllowed_provident_fund(){
    if (allowed_provident_fund.value) {
        inputValue = allowed_provident_fund.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_provident_fundError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_provident_fundError.textContent = '';
        }  else {
            allowed_provident_fundError.textContent = '';
        }
    } else {
        allowed_provident_fundError.textContent = '';
    }
    validateTotal();    
}


function validateAllowed_professional_tax(){
    if (allowed_professional_tax.value) {
        inputValue = allowed_professional_tax.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_professional_taxError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_professional_taxError.textContent = '';
        } else if (inputValue > 4000){
            allowed_professional_tax.value = 4000;
            alert("Professional Tax has limit 4000 ");
        }  else {
            allowed_professional_taxError.textContent = '';
        }
    } else {
        allowed_professional_taxError.textContent = '';
    }
    validateTotal();    
}

function validateAllowed_income_tax(){
    if (allowed_income_tax.value) {
        inputValue = allowed_income_tax.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_income_taxError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_income_taxError.textContent = '';
        } else {
            allowed_income_taxError.textContent = '';
        }
    } else {
        allowed_income_taxError.textContent = '';
    }
    validateTotal();    
}






function validateTotal_2() {
    var salary = parseFloat(allowed_salary_previousemp_2.value) || 0;
    var professionalTax = parseFloat(allowed_professional_tax_2.value) || 0;
    var providentFund = parseFloat(allowed_provident_fund_2.value) || 0;
    var incomeTax = parseFloat(allowed_income_tax_2.value) || 0;

    if (professionalTax < 0 || !Number.isInteger(professionalTax) ||
        providentFund < 0 || !Number.isInteger(providentFund) ||
        incomeTax < 0 || !Number.isInteger(incomeTax)) {

        return false;
    }
    var total = professionalTax + providentFund + incomeTax;

    var lastEnteredField = document.activeElement;

    if (total > salary) {        
        var diff = total - salary;

        if (lastEnteredField.id === "allowed_income_tax_2") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                incomeTax -= diff;
                document.getElementById('allowed_income_tax_2').value = incomeTax;
            }
        } else if (lastEnteredField.id === "allowed_provident_fund_2") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                providentFund -= diff;
                document.getElementById('allowed_provident_fund_2').value = providentFund;
            }
        } else if (lastEnteredField.id === "allowed_professional_tax_2") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                professionalTax -= diff;                
                document.getElementById('allowed_professional_tax_2').value = professionalTax;
            }
        } else if (lastEnteredField.id === "allowed_salary_previousemp_2") {
            document.getElementById('allowed_professional_tax_2').value = null;
            document.getElementById('allowed_provident_fund_2').value = null;
            document.getElementById('allowed_income_tax_2').value = null;
        }        
        return false;
    } else if (lastEnteredField.id === "allowed_salary_previousemp_2") {
        document.getElementById('allowed_professional_tax_2').value = null;
        document.getElementById('allowed_provident_fund_2').value = null;
        document.getElementById('allowed_income_tax_2').value = null;
    } else {
        return true;
    }
    submit_btn_enable_2();
}


function validateTotal_3() {
    var salary = parseFloat(allowed_salary_previousemp_3.value) || 0;
    var professionalTax = parseFloat(allowed_professional_tax_3.value) || 0;
    var providentFund = parseFloat(allowed_provident_fund_3.value) || 0;
    var incomeTax = parseFloat(allowed_income_tax_3.value) || 0;

    if (professionalTax < 0 || !Number.isInteger(professionalTax) ||
        providentFund < 0 || !Number.isInteger(providentFund) ||
        incomeTax < 0 || !Number.isInteger(incomeTax)) {

        return false;
    }
    var total = professionalTax + providentFund + incomeTax;

    var lastEnteredField = document.activeElement;

    if (total > salary) {        
        var diff = total - salary;

        if (lastEnteredField.id === "allowed_income_tax_3") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                incomeTax -= diff;
                document.getElementById('allowed_income_tax_3').value = incomeTax;
            }
        } else if (lastEnteredField.id === "allowed_provident_fund_3") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                providentFund -= diff;
                document.getElementById('allowed_provident_fund_3').value = providentFund;
            }
        } else if (lastEnteredField.id === "allowed_professional_tax_3") {
            alert("Sum of Professional tax, Provident Fund, and Income tax should not exceed Salary");
            if (total > salary) {
                professionalTax -= diff;                
                document.getElementById('allowed_professional_tax_3').value = professionalTax;
            }
        } else if (lastEnteredField.id === "allowed_salary_previousemp_3") {
            document.getElementById('allowed_professional_tax_3').value = null;
            document.getElementById('allowed_provident_fund_3').value = null;
            document.getElementById('allowed_income_tax_3').value = null;
        }        
        return false;
    } else if (lastEnteredField.id === "allowed_salary_previousemp_3") {
        document.getElementById('allowed_professional_tax_3').value = null;
        document.getElementById('allowed_provident_fund_3').value = null;
        document.getElementById('allowed_income_tax_3').value = null;
    } else {
        return true;
    }
    submit_btn_enable_3();
}


function validateAllowed_salary_previousemp_2(){
    validateTotal_2();    
}


function validateAllowed_salary_previousemp_3(){
    validateTotal_3();    
}


function validateAllowed_professional_tax_2(){
    if (allowed_professional_tax_2.value){
        if (allowed_professional_tax_2.value > 4000){
            allowed_professional_tax_2.value = 4000;
            alert("Professional Tax has limit 4000 ");
        }
    }
    validateTotal_2();    
}


function validateAllowed_professional_tax_3(){
    if (allowed_professional_tax_3.value){
        if (allowed_professional_tax_3.value > 4000){
            allowed_professional_tax_3.value = 4000;
            alert("Professional Tax has limit 4000 ");
        }
    }
    validateTotal_3();    
}


function validateAllowed_provident_fund_2(){
    validateTotal_2();    
}

function validateAllowed_provident_fund_3(){
    validateTotal_3();    
}


function validateAllowed_income_tax_2(){
    validateTotal_2();    
}


function validateAllowed_income_tax_3(){
    validateTotal_3();    
}

