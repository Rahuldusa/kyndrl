// 80C Section Variables:-
// =======================



function validateAllowed_paymentLifeInsurance() {
    if (allowed_paymentLifeInsurance.value) {
        inputValue = allowed_paymentLifeInsurance.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_paymentLifeInsuranceError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_paymentLifeInsuranceError.textContent = '';
        } else if (Number(inputValue) > Number(paymentLifeInsurance.value)) {
            allowed_paymentLifeInsuranceError.textContent = '';
            allowed_paymentLifeInsurance.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_paymentLifeInsuranceError.textContent = '';
        }
    } else {
        allowed_paymentLifeInsuranceError.textContent = '';
    }
    submit_btn_enable();
}



function validateAllowed_paymentLifeInsurance_2(){
    if (allowed_paymentLifeInsurance_2.value){
        total_value = Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance.value)
        if (Number(total_value) > Number(paymentLifeInsurance.value)){
            allowed_paymentLifeInsurance_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_paymentLifeInsurance_3(){
    if (allowed_paymentLifeInsurance_3.value){
        total_value = Number(allowed_paymentLifeInsurance_3.value) + Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance.value)
        if (Number(total_value) > Number(paymentLifeInsurance.value)){
            allowed_paymentLifeInsurance_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}



function validateAllowed_timeDeposit() {
    if (allowed_timeDeposit.value) {
        inputValue = allowed_timeDeposit.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_timeDepositError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_timeDepositError.textContent = '';
        } else if (Number(inputValue) > Number(timeDeposit.value)) {
            allowed_timeDepositError.textContent = '';
            allowed_timeDeposit.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_timeDepositError.textContent = '';
        }
    } else {
        allowed_timeDepositError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_timeDeposit_2(){
    if (allowed_timeDeposit_2.value){
        total_value = Number(allowed_timeDeposit_2.value) + Number(allowed_timeDeposit.value)
        if (Number(total_value) > Number(timeDeposit.value)){
            allowed_timeDeposit_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_timeDeposit_3(){
    if (allowed_timeDeposit_3.value){
        total_value = Number(allowed_timeDeposit_3.value) + Number(allowed_timeDeposit_2.value) + Number(allowed_timeDeposit.value)
        if (Number(total_value) > Number(timeDeposit.value)){
            allowed_timeDeposit_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_ulipContribution() {
    if (allowed_ulipContribution.value) {
        inputValue = allowed_ulipContribution.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_ulipContributionError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_ulipContributionError.textContent = '';
        } else if (Number(inputValue) > Number(ulipContribution.value)) {
            allowed_ulipContributionError.textContent = '';
            allowed_ulipContribution.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_ulipContributionError.textContent = '';
        }
    } else {
        allowed_ulipContributionError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_ulipContribution_2(){
    if (allowed_ulipContribution_2.value){
        total_value = Number(allowed_ulipContribution_2.value) + Number(allowed_ulipContribution.value)
        if (Number(total_value) > Number(ulipContribution.value)){
            allowed_ulipContribution_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_ulipContribution_3(){
    if (allowed_ulipContribution_3.value){
        total_value = Number(allowed_ulipContribution_3.value) + Number(allowed_ulipContribution_2.value) + Number(allowed_ulipContribution.value)
        if (Number(total_value) > Number(ulipContribution.value)){
            allowed_ulipContribution_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_nscSubscription() {
    if (allowed_nscSubscription.value) {
        inputValue = allowed_nscSubscription.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_nscSubscriptionError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_nscSubscriptionError.textContent = '';
        } else if (Number(inputValue) > Number(nscSubscription.value)) {
            allowed_nscSubscriptionError.textContent = '';
            allowed_nscSubscription.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_nscSubscriptionError.textContent = '';
        }
    } else {
        allowed_nscSubscriptionError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_nscSubscription_2(){
    if (allowed_nscSubscription_2.value){
        total_value = Number(allowed_nscSubscription_2.value) + Number(allowed_nscSubscription.value)
        if (Number(total_value) > Number(nscSubscription.value)){
            allowed_nscSubscription_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_nscSubscription_3(){
    if (allowed_nscSubscription_3.value){
        total_value = Number(allowed_nscSubscription_3.value) + Number(allowed_nscSubscription_2.value) + Number(allowed_nscSubscription.value)
        if (Number(total_value) > Number(nscSubscription.value)){
            allowed_nscSubscription_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}



function validateAllowed_nscInterest() {
    if (allowed_nscInterest.value) {
        inputValue = allowed_nscInterest.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_nscInterestError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_nscInterestError.textContent = '';
        } else if (Number(inputValue) > Number(nscInterest.value)) {
            allowed_nscInterestError.textContent = '';
            allowed_nscInterest.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_nscInterestError.textContent = '';
        }
    } else {
        allowed_nscInterestError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_nscInterest_2(){
    if (allowed_nscInterest_2.value){
        total_value = Number(allowed_nscInterest_2.value) + Number(allowed_nscInterest.value)
        if (Number(total_value) > Number(nscInterest.value)){
            allowed_nscInterest_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_nscInterest_3(){
    if (allowed_nscInterest_3.value){
        total_value = Number(allowed_nscInterest_3.value) + Number(allowed_nscInterest_2.value) + Number(allowed_nscInterest.value)
        if (Number(total_value) > Number(nscInterest.value)){
            allowed_nscInterest_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_ppfContribution() {
    if (allowed_ppfContribution.value) {
        inputValue = allowed_ppfContribution.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_ppfContributionError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_ppfContributionError.textContent = '';
        } else if (Number(inputValue) > Number(ppfContribution.value)) {
            allowed_ppfContributionError.textContent = '';
            allowed_ppfContribution.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_ppfContributionError.textContent = '';
        }
    } else {
        allowed_ppfContributionError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_ppfContribution_2(){
    if (allowed_ppfContribution_2.value){
        total_value = Number(allowed_ppfContribution_2.value) + Number(allowed_ppfContribution.value)
        if (Number(total_value) > Number(ppfContribution.value)){
            allowed_ppfContribution_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_ppfContribution_3(){
    if (allowed_ppfContribution_3.value){
        total_value = Number(allowed_ppfContribution_3.value) + Number(allowed_ppfContribution_2.value) + Number(allowed_ppfContribution.value)
        if (Number(total_value) > Number(ppfContribution.value)){
            allowed_ppfContribution_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}



function validateAllowed_houseLoan() {
    if (allowed_houseLoan.value) {
        inputValue = allowed_houseLoan.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_houseLoanError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_houseLoanError.textContent = '';
        } else if (Number(inputValue) > Number(houseLoan.value)) {
            allowed_houseLoanError.textContent = '';
            allowed_houseLoan.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_houseLoanError.textContent = '';
        }
    } else {
        allowed_houseLoanError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_houseLoan_2(){
    if (allowed_houseLoan_2.value){
        total_value = Number(allowed_houseLoan_2.value) + Number(allowed_houseLoan.value)
        if (Number(total_value) > Number(houseLoan.value)){
            allowed_houseLoan_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_houseLoan_3(){
    if (allowed_houseLoan_3.value){
        total_value = Number(allowed_houseLoan_3.value) + Number(allowed_houseLoan_2.value) + Number(allowed_houseLoan.value)
        if (Number(total_value) > Number(houseLoan.value)){
            allowed_houseLoan_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}




function validateAllowed_tuitionFee() {
    if (allowed_tuitionFee.value) {
        inputValue = allowed_tuitionFee.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_tuitionFeeError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_tuitionFeeError.textContent = '';
        } else if (Number(inputValue) > Number(tuitionFee.value)) {
            allowed_tuitionFeeError.textContent = '';
            allowed_tuitionFee.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_tuitionFeeError.textContent = '';
        }
    } else {
        allowed_tuitionFeeError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_tuitionFee_2(){
    if (allowed_tuitionFee_2.value){
        total_value = Number(allowed_tuitionFee_2.value) + Number(allowed_tuitionFee.value)
        if (Number(total_value) > Number(tuitionFee.value)){
            allowed_tuitionFee_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_tuitionFee_3(){
    if (allowed_tuitionFee_3.value){
        total_value = Number(allowed_tuitionFee_3.value) + Number(allowed_tuitionFee_2.value) + Number(allowed_tuitionFee.value)
        if (Number(total_value) > Number(tuitionFee.value)){
            allowed_tuitionFee_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_mutualFundSubscription() {
    if (allowed_mutualFundSubscription.value) {
        inputValue = allowed_mutualFundSubscription.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_mutualFundSubscriptionError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_mutualFundSubscriptionError.textContent = '';
        } else if (Number(inputValue) > Number(mutualFundSubscription.value)) {
            allowed_mutualFundSubscriptionError.textContent = '';
            allowed_mutualFundSubscription.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_mutualFundSubscriptionError.textContent = '';
        }
    } else {
        allowed_mutualFundSubscriptionError.textContent = '';
    }
    submit_btn_enable();
}

function validateAllowed_mutualFundSubscription_2(){
    if (allowed_mutualFundSubscription_2.value){
        total_value = Number(allowed_mutualFundSubscription_2.value) + Number(allowed_mutualFundSubscription.value)
        if (Number(total_value) > Number(mutualFundSubscription.value)){
            allowed_mutualFundSubscription_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_mutualFundSubscription_3(){
    if (allowed_mutualFundSubscription_3.value){
        total_value =Number(allowed_mutualFundSubscription_3.value) + Number(allowed_mutualFundSubscription_2.value) + Number(allowed_mutualFundSubscription.value)
        if (Number(total_value) > Number(mutualFundSubscription.value)){
            allowed_mutualFundSubscription_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_termDeposits() {
    if (allowed_termDeposits.value) {
        inputValue = allowed_termDeposits.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_termDepositsError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_termDepositsError.textContent = '';
        } else if (Number(inputValue) > Number(termDeposits.value)) {
            allowed_termDepositsError.textContent = '';
            allowed_termDeposits.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_termDepositsError.textContent = '';
        }
    } else {
        allowed_termDepositsError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_termDeposits_2(){
    if (allowed_termDeposits_2.value){
        total_value = Number(allowed_termDeposits_2.value) + Number(allowed_termDeposits.value)
        if (Number(total_value) > Number(termDeposits.value)){
            allowed_termDeposits_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_termDeposits_3(){
    if (allowed_termDeposits_3.value){
        total_value = Number(allowed_termDeposits_3.value) + Number(allowed_termDeposits_2.value) + Number(allowed_termDeposits.value)
        if (Number(total_value) > Number(termDeposits.value)){
            allowed_termDeposits_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}



function validateAllowed_pensionContribution() {
    if (allowed_pensionContribution.value) {
        inputValue = allowed_pensionContribution.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_pensionContributionError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_pensionContributionError.textContent = '';
        } else if (Number(inputValue) > Number(pensionContribution.value)) {
            allowed_pensionContributionError.textContent = '';
            allowed_pensionContribution.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_pensionContributionError.textContent = '';
        }
    } else {
        allowed_pensionContributionError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_pensionContribution_2(){
    if (allowed_pensionContribution_2.value){
        total_value = Number(allowed_pensionContribution_2.value) + Number(allowed_pensionContribution.value)
        if (Number(total_value) > Number(pensionContribution.value)){
            allowed_pensionContribution_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}



function validateAllowed_pensionContribution_3(){
    if (allowed_pensionContribution_3.value){
        total_value = Number(allowed_pensionContribution_3.value) + Number(allowed_pensionContribution_2.value) + Number(allowed_pensionContribution.value)
        if (Number(total_value) > Number(pensionContribution.value)){
            allowed_pensionContribution_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}




function validateAllowed_sukanyaSamriddhi() {
    if (allowed_sukanyaSamriddhi.value) {
        inputValue = allowed_sukanyaSamriddhi.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_sukanyaSamriddhiError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_sukanyaSamriddhiError.textContent = '';
        } else if (Number(inputValue) > Number(sukanyaSamriddhi.value)) {
            allowed_sukanyaSamriddhiError.textContent = '';
            allowed_sukanyaSamriddhi.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_sukanyaSamriddhiError.textContent = '';
        }
    } else {
        allowed_sukanyaSamriddhiError.textContent = '';
    }
    submit_btn_enable();
}



function validateAllowed_sukanyaSamriddhi_2(){
    if (allowed_sukanyaSamriddhi_2.value){
        total_value = Number(allowed_sukanyaSamriddhi_2.value) + Number(allowed_sukanyaSamriddhi.value)
        if (Number(total_value) > Number(sukanyaSamriddhi.value)){
            allowed_sukanyaSamriddhi_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_sukanyaSamriddhi_3(){
    if (allowed_sukanyaSamriddhi_3.value){
        total_value = Number(allowed_sukanyaSamriddhi_3.value) + Number(allowed_sukanyaSamriddhi_2.value) + Number(allowed_sukanyaSamriddhi.value)
        if (Number(total_value) > Number(sukanyaSamriddhi.value)){
            allowed_sukanyaSamriddhi_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}



























