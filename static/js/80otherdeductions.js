

// save data
// saveddata display
// 12bb
// 48hrs

var paymentLifeInsuranceInp = document.getElementById('paymentLifeInsurance');
var timeDepositInp = document.getElementById('timeDeposit');
var ulipContributionInp = document.getElementById('ulipContribution');
var nscSubscriptionInp = document.getElementById('nscSubscription');
var nscInterestInp = document.getElementById('nscInterest');
var ppfContributionInp = document.getElementById('ppfContribution');
var houseLoanInp = document.getElementById('houseLoan');
var tuitionFeeInp = document.getElementById('tuitionFee');
var mutualFundSubscriptionInp = document.getElementById('mutualFundSubscription');
var termDepositsInp = document.getElementById('termDeposits');
var pensionContributionInp = document.getElementById('pensionContribution');
var sukanyaSamriddhiInp = document.getElementById('sukanyaSamriddhi');





var paymentLifeInsuranceErrorSpan = document.getElementById('paymentLifeInsuranceError');
var timeDepositErrorSpan = document.getElementById('timeDepositError');
var ulipContributionErrorSpan = document.getElementById('ulipContributionError');
var nscSubscriptionErrorSpan = document.getElementById('nscSubscriptionError');
var nscInterestErrorSpan = document.getElementById('nscInterestError');
var ppfContributionErrorSpan = document.getElementById('ppfContributionError');
var houseLoanErrorSpan = document.getElementById('houseLoanError');
var tuitionFeeErrorSpan = document.getElementById('tuitionFeeError');
var mutualFundSubscriptionErrorSpan = document.getElementById('mutualFundSubscriptionError');
var termDepositsErrorSpan = document.getElementById('termDepositsError');
var pensionContributionErrorSpan = document.getElementById('pensionContributionError');
var sukanyaSamriddhiErrorSpan = document.getElementById('sukanyaSamriddhiError');




var lifeInsurance_file1 = document.getElementById('lifeInsurance_file1');
var postOfficeDeposit_file1 = document.getElementById('postOfficeDeposit_file1');
var ulip_file1 = document.getElementById('ulip_file1');
var nscSubscription_file1 = document.getElementById('nscSubscription_file1');
var nscInterest_file1 = document.getElementById('nscInterest_file1');
var ppf_file1 = document.getElementById('ppf_file1');
var houseLoan_file1 = document.getElementById('houseLoan_file1');
var tuitionFee_file1 = document.getElementById('tuitionFee_file1');
var mutualFund_file1 = document.getElementById('mutualFund_file1');
var termDeposit_file1 = document.getElementById('termDeposit_file1');
var pensionFunds_file1 = document.getElementById('pensionFunds_file1');
var sukanyaSamriddhi_file1 = document.getElementById('sukanyaSamriddhi_file1');



function empty_all_fields() {
    paymentLifeInsuranceInp.value = null;
    timeDepositInp.value = null;
    ulipContributionInp.value = null;
    nscSubscriptionInp.value = null;
    nscInterestInp.value = null;
    ppfContributionInp.value = null;
    houseLoanInp.value = null;
    tuitionFeeInp.value = null;
    mutualFundSubscriptionInp.value = null;
    termDepositsInp.value = null;
    pensionContributionInp.value = null;
    sukanyaSamriddhiInp.value = null;


    paymentLifeInsuranceErrorSpan.textContent = '';
    timeDepositErrorSpan.textContent = '';
    ulipContributionErrorSpan.textContent = '';
    nscSubscriptionErrorSpan.textContent = '';
    nscInterestErrorSpan.textContent = '';
    ppfContributionErrorSpan.textContent = '';
    houseLoanErrorSpan.textContent = '';
    tuitionFeeErrorSpan.textContent = '';
    mutualFundSubscriptionErrorSpan.textContent = '';
    termDepositsErrorSpan.textContent = '';
    pensionContributionErrorSpan.textContent = '';
    sukanyaSamriddhiErrorSpan.textContent = '';


    lifeInsurance_file1.style.display = 'none';
    postOfficeDeposit_file1.style.display = 'none';
    ulip_file1.style.display = 'none';
    nscSubscription_file1.style.display = 'none';
    nscInterest_file1.style.display = 'none';
    ppf_file1.style.display = 'none';
    houseLoan_file1.style.display = 'none';
    tuitionFee_file1.style.display = 'none';
    mutualFund_file1.style.display = 'none';
    termDeposit_file1.style.display = 'none';
    pensionFunds_file1.style.display = 'none';
    sukanyaSamriddhi_file1.style.display = 'none';
}




function save_80c_temp() {

    const formData_80c_contribution = {
        paymentLifeInsuranceInpValue: paymentLifeInsuranceInp.value,
        timeDepositInpValue: timeDepositInp.value,
        ulipContributionInpValue: ulipContributionInp.value,
        nscSubscriptionInpValue: nscSubscriptionInp.value,
        nscInterestInpValue: nscInterestInp.value,
        ppfContributionInpValue: ppfContributionInp.value,
        houseLoanInpValue: houseLoanInp.value,
        tuitionFeeInpValue: tuitionFeeInp.value,
        mutualFundSubscriptionInpValue: mutualFundSubscriptionInp.value,
        termDepositsInpValue: termDepositsInp.value,
        pensionContributionInpValue: pensionContributionInp.value,
        sukanyaSamriddhiInpValue: sukanyaSamriddhiInp.value,
    };
    const jsonData = JSON.stringify(formData_80c_contribution);
    localStorage.setItem('formData_80c_contribution', jsonData);


    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 4;
    } else {
        localStorage.setItem('currentTab', 4)
    }

}



function other80cContributions(value) {
    var additionalQuestionsContainer = document.getElementById('section80C_questions');
    if (value === 'yes') {
        additionalQuestionsContainer.style.display = 'block';

    } else {
        additionalQuestionsContainer.style.display = 'none';
        empty_all_fields();

        if (localStorage.getItem('formData_80c_contribution')) {
            localStorage.removeItem('formData_80c_contribution');
        }
    
    }
    display_save4btn();
    save_father_ispan();
    files_display_section_none();
    disable_btns();
    display_submit();
}


function validateNumberField(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('lifeInsurance_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('lifeInsurance_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('lifeInsurance_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('lifeInsurance_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}

function validateNumberField2(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('postOfficeDeposit_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('postOfficeDeposit_file1').style.display = 'none';
        }
        else {
            errorSpan.textContent = "";
            document.getElementById('postOfficeDeposit_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('postOfficeDeposit_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}



function validateNumberField3(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('ulip_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('ulip_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('ulip_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('ulip_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField4(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value 4.";
            document.getElementById('nscSubscription_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('nscSubscription_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('nscSubscription_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('nscSubscription_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}

function validateNumberField5(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('nscInterest_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('nscInterest_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('nscInterest_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('nscInterest_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField6(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('ppf_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('ppf_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('ppf_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('ppf_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField7(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('houseLoan_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('houseLoan_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('houseLoan_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('houseLoan_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField8(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('tuitionFee_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('tuitionFee_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('tuitionFee_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('tuitionFee_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField9(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('mutualFund_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('mutualFund_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('mutualFund_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('mutualFund_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField10(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('termDeposit_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('termDeposit_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('termDeposit_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('termDeposit_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField11(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('pensionFunds_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('pensionFunds_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('pensionFunds_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('pensionFunds_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}
function validateNumberField12(inputField) {
    var inputValue = inputField.value;
    var errorSpan = document.getElementById(inputField.id + "Error");
    if (inputValue) {
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            errorSpan.textContent = "Please enter a positive integer value.";
            document.getElementById('sukanyaSamriddhi_file1').style.display = 'none';
        } else if (parseFloat(inputValue) == 0) {
            errorSpan.textContent = "";
            document.getElementById('sukanyaSamriddhi_file1').style.display = 'none';
        } else {
            errorSpan.textContent = "";
            document.getElementById('sukanyaSamriddhi_file1').style.display = 'block';
        }
    }
    else {
        errorSpan.textContent = "";
        document.getElementById('sukanyaSamriddhi_file1').style.display = 'none';
    }
    display_submit();
    disable_btns();
}


function validateFileFormat(inputId) {
    var fileInput = document.getElementById(inputId);
    var fileName = fileInput.value;
    var allowedExtensions = /(\.pdf|\.png|\.jpg)$/i;
    if (!allowedExtensions.exec(fileName)) {
        alert('Invalid file format! Please upload only PDF, PNG, or JPG files.');
        fileInput.value = '';
        return false;
    }
}



function submit_80c_file(formName) {

    save_80c_temp();

    let apiUrl = "upload_80c_file";
    apiUrl += `?name=${encodeURIComponent(formName)}`;
    document.getElementById("80cC").action = apiUrl;
    document.getElementById("80cC").submit();
}




function submit_80c_nsc_int_file(formName) {

    save_80c_temp();

    let apiUrl = "upload_80c_nsc_int_file";
    document.getElementById("80cC").action = apiUrl;
    document.getElementById("80cC").submit();
}






function submit_80ccc_file(formName) {

    save_80c_temp();

    let apiUrl = "upload_80ccc_file";
    document.getElementById("80cC").action = apiUrl;
    document.getElementById("80cC").submit();
}



document.addEventListener("DOMContentLoaded", function () {
    var section80Cyesbtn = document.getElementById('section80Cyes');
    var section80Cnobtn = document.getElementById('section80Cno');



    const storedData_80c_contribution = localStorage.getItem('formData_80c_contribution');
    if (storedData_80c_contribution) {
        const storedFormData = JSON.parse(storedData_80c_contribution);
        if (storedFormData) {
            paymentLifeInsuranceInp.value = storedFormData.paymentLifeInsuranceInpValue;
            timeDepositInp.value = storedFormData.timeDepositInpValue;
            ulipContributionInp.value = storedFormData.ulipContributionInpValue;
            nscSubscriptionInp.value = storedFormData.nscSubscriptionInpValue;
            nscInterestInp.value = storedFormData.nscInterestInpValue;
            ppfContributionInp.value = storedFormData.ppfContributionInpValue;

            houseLoanInp.value = storedFormData.houseLoanInpValue;
            tuitionFeeInp.value = storedFormData.tuitionFeeInpValue;
            mutualFundSubscriptionInp.value = storedFormData.mutualFundSubscriptionInpValue;
            termDepositsInp.value = storedFormData.termDepositsInpValue;
            pensionContributionInp.value = storedFormData.pensionContributionInpValue;
            sukanyaSamriddhiInp.value = storedFormData.sukanyaSamriddhiInpValue;


            section80Cyesbtn.checked = true;
            checkbox = 'yes'
            other80cContributions(checkbox);
        }
    }



    if (section80Cyesbtn.checked === true) {
        checkbox = 'yes'
        other80cContributions(checkbox);
    } else {
        checkbox = 'no'
        other80cContributions(checkbox);
    }

    if (paymentLifeInsuranceInp.value) {
        validateNumberField(paymentLifeInsuranceInp);
    }
    if (timeDepositInp.value) {
        validateNumberField2(timeDepositInp);
    }
    if (ulipContributionInp.value) {
        validateNumberField3(ulipContributionInp);
    }
    if (nscSubscriptionInp.value) {
        validateNumberField4(nscSubscriptionInp);
    }
    if (nscInterestInp.value) {
        validateNumberField5(nscInterestInp);
    }
    if (ppfContributionInp.value) {
        validateNumberField6(ppfContributionInp);
    }
    if (houseLoanInp.value) {
        validateNumberField7(houseLoanInp);
    }
    if (tuitionFeeInp.value) {
        validateNumberField8(tuitionFeeInp);
    }
    if (mutualFundSubscriptionInp.value) {
        validateNumberField9(mutualFundSubscriptionInp);
    }
    if (termDepositsInp.value) {
        validateNumberField10(termDepositsInp);
    }
    if (pensionContributionInp.value) {
        validateNumberField11(pensionContributionInp);
    }
    if (sukanyaSamriddhiInp.value) {
        validateNumberField12(sukanyaSamriddhiInp);
    }






});


