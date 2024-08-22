


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



var payingrentyesbtn = document.getElementById('payingrentyes');
var hra_form1section = document.getElementById('hra_form1');



var LandlordPAN1input = document.getElementById('LandlordPAN1');
var StartDate1input = document.getElementById('StartDate1');
var EndDate1input = document.getElementById('EndDate1');
var MonthRent1input = document.getElementById('MonthRent1');
var Pincode1input = document.getElementById('Pincode1');
var cityType1input = document.getElementById('cityType1');
var lanlordName1input = document.getElementById('lanlordName1');
var landlordContact1input = document.getElementById('landlordContact1');
var landlordAddress1input = document.getElementById('landlordAddress1');
var rentedAddress1input = document.getElementById('rentedAddress1');

var LandlordPAN1ErrorSpan = document.getElementById('LandlordPAN1Error');
var MonthRent1ErrorSpan = document.getElementById('MonthRent1Error');
var landlordContact1ErrorSpan = document.getElementById('landlordContact1Error');
var Pincode1ErrorSpan = document.getElementById('Pincode1Error');




var LandlordPAN2input = document.getElementById('LandlordPAN2');
var StartDate2input = document.getElementById('StartDate2');
var EndDate2input = document.getElementById('EndDate2');
var MonthRent2input = document.getElementById('MonthRent2');
var Pincode2input = document.getElementById('Pincode2');
var cityType2input = document.getElementById('cityType2');
var lanlordName2input = document.getElementById('lanlordName2');
var landlordContact2input = document.getElementById('landlordContact2');
var landlordAddress2input = document.getElementById('landlordAddress2');
var rentedAddress2input = document.getElementById('rentedAddress2');

var LandlordPAN2ErrorSpan = document.getElementById('LandlordPAN2Error');
var MonthRent2ErrorSpan = document.getElementById('MonthRent2Error');
var landlordContact2ErrorSpan = document.getElementById('landlordContact2Error');
var Pincode2ErrorSpan = document.getElementById('Pincode2Error');


// Form 3
var LandlordPAN3input = document.getElementById('LandlordPAN3');
var StartDate3input = document.getElementById('StartDate3');
var EndDate3input = document.getElementById('EndDate3');
var MonthRent3input = document.getElementById('MonthRent3');
var Pincode3input = document.getElementById('Pincode3');
var cityType3input = document.getElementById('cityType3');
var lanlordName3input = document.getElementById('lanlordName3');
var landlordContact3input = document.getElementById('landlordContact3');
var landlordAddress3input = document.getElementById('landlordAddress3');
var rentedAddress3input = document.getElementById('rentedAddress3');

var LandlordPAN3ErrorSpan = document.getElementById('LandlordPAN3Error');
var MonthRent3ErrorSpan = document.getElementById('MonthRent3Error');
var landlordContact3ErrorSpan = document.getElementById('landlordContact3Error');
var Pincode3ErrorSpan = document.getElementById('Pincode3Error');

// StartDate3input EndDate3input Pincode3input cityType3input
// Form 4
var LandlordPAN4input = document.getElementById('LandlordPAN4');
var StartDate4input = document.getElementById('StartDate4');
var EndDate4input = document.getElementById('EndDate4');
var MonthRent4input = document.getElementById('MonthRent4');
var Pincode4input = document.getElementById('Pincode4');
var cityType4input = document.getElementById('cityType4');
var lanlordName4input = document.getElementById('lanlordName4');
var landlordContact4input = document.getElementById('landlordContact4');
var landlordAddress4input = document.getElementById('landlordAddress4');
var rentedAddress4input = document.getElementById('rentedAddress4');

var LandlordPAN4ErrorSpan = document.getElementById('LandlordPAN4Error');
var MonthRent4ErrorSpan = document.getElementById('MonthRent4Error');
var landlordContact4ErrorSpan = document.getElementById('landlordContact4Error');
var Pincode4ErrorSpan = document.getElementById('Pincode4Error');


// Form 5
var LandlordPAN5input = document.getElementById('LandlordPAN5');
var StartDate5input = document.getElementById('StartDate5');
var EndDate5input = document.getElementById('EndDate5');
var MonthRent5input = document.getElementById('MonthRent5');
var Pincode5input = document.getElementById('Pincode5');
var cityType5input = document.getElementById('cityType5');
var lanlordName5input = document.getElementById('lanlordName5');
var landlordContact5input = document.getElementById('landlordContact5');
var landlordAddress5input = document.getElementById('landlordAddress5');
var rentedAddress5input = document.getElementById('rentedAddress5');


var LandlordPAN5ErrorSpan = document.getElementById('LandlordPAN5Error');
var MonthRent5ErrorSpan = document.getElementById('MonthRent5Error');
var landlordContact5ErrorSpan = document.getElementById('landlordContact5Error');
var Pincode5ErrorSpan = document.getElementById('Pincode5Error');


var lanlordName1ErrorSpan = document.getElementById('lanlordName1Error');
var lanlordName2ErrorSpan = document.getElementById('lanlordName2Error');
var lanlordName3ErrorSpan = document.getElementById('lanlordName3Error');
var lanlordName4ErrorSpan = document.getElementById('lanlordName4Error');
var lanlordName5ErrorSpan = document.getElementById('lanlordName5Error');

var ilhpyesbtn = document.getElementById('ilhpyes');



var self_date = document.getElementById('self_date');
var selfOccupiedHousePropertyErrorSpan = document.getElementById('selfOccupiedHousePropertyError');
var otherselfHomeLoanLenderNameErrorSpan = document.getElementById('otherselfHomeLoanLenderNameError');
var otherselfHomeLoanLenderPANErrorSpan = document.getElementById('otherselfHomeLoanLenderPANError');




var annualLettableValueErrorSpan = document.getElementById('annualLettableValueError');
var municipalPropertyTaxErrorSpan = document.getElementById('municipalPropertyTaxError');
var homeLoanInterestErrorSpan = document.getElementById('homeLoanInterestError');
var standardDeductionErrorSpan = document.getElementById('standardDeductionError');
var otherloanLenderNameErrorSpan = document.getElementById('otherloanLenderNameError');
var otherloanLenderPANErrorSpan = document.getElementById('otherloanLenderPANError');


var section_80ee = document.getElementById('section_80ee');
var loandt_80ee = document.getElementById('loandt_80ee');


var section_80eea = document.getElementById('section_80eea');
var loandt_80eea = document.getElementById('loandt_80eea');



var loan_amountErrorSpan = document.getElementById('loan_amountError');
var property_valueErrorSpan = document.getElementById('property_valueError');
var home_loanErrorSpan = document.getElementById('home_loanError');
var otherloan_lenderErrorSpan = document.getElementById('otherloan_lenderError');
var otherlender_panErrorSpan = document.getElementById('otherlender_panError');

var property_value_otherErrorSpan = document.getElementById('property_value_otherError');


var selfOccupiedHousePropertyInp = document.getElementById('selfOccupiedHouseProperty');
var selfHomeLoanLenderNameInp = document.getElementById('selfHomeLoanLenderName');
var selfHomeLoanLenderPANInp = document.getElementById('selfHomeLoanLenderPAN');
var otherselfHomeLoanLenderNameInp = document.getElementById('otherselfHomeLoanLenderName');
var otherselfHomeLoanLenderPANInp = document.getElementById('otherselfHomeLoanLenderPAN');

var annualLettableValueInp = document.getElementById('annualLettableValue');
var municipalPropertyTaxInp = document.getElementById('municipalPropertyTax');
var homeLoanInterestInp = document.getElementById('homeLoanInterest');
var incomeLossOnHousePropertyInp = document.getElementById('incomeLossOnHouseProperty');
var standardDeductionInp = document.getElementById('standardDeduction');
var loanLenderNameInp = document.getElementById('loanLenderName');

var loanLenderPANInp = document.getElementById('loanLenderPAN');
var otherloanLenderNameInp = document.getElementById('otherloanLenderName');
var otherloanLenderPANInp = document.getElementById('otherloanLenderPAN');

var loan_sanctioned_dateInp = document.getElementById('loan_sanctioned_date');
var loan_amountInp = document.getElementById('loan_amount');
var property_valueInp = document.getElementById('property_value');
var home_loanInp = document.getElementById('home_loan');

var loan_lenderInp = document.getElementById('loan_lender');
var lender_panInp = document.getElementById('lender_pan');
var otherloan_lenderInp = document.getElementById('otherloan_lender');
var otherlender_panInp = document.getElementById('otherlender_pan');



var loan_sanctioned_date_eeInp = document.getElementById('loan_sanctioned_date_ee');
var op80eeayesInp = document.getElementById('op80eeayes');
var op80eeanoInp = document.getElementById('op80eeano');
var property_value_otherInp = document.getElementById('property_value_other');
var op80eeayes_eligInp = document.getElementById('op80eeayes_elig');
var op80eeano_eligInp = document.getElementById('op80eeano_elig');

var section80oiyesbtn = document.getElementById('section80oiyes');
var other_income_oiInp = document.getElementById('other_income_oi');
var other_income_ErrorSpan = document.getElementById('other_income_Error');


var section80ttayesbtn = document.getElementById('section80ttayes');


var interest_80ttaInp = document.getElementById('interest_80tta');
var interest_80tta_errorSpan = document.getElementById('interest_80tta_error');

var section80dyesbtn = document.getElementById('section80dyes');

var section80dyes_mip = document.getElementById('section80dyes_mip');

var medical_insurance_self_mipErrorSpan = document.getElementById('medical_insurance_self_mipError');
var medical_insurance_parents_mipErrorSpan = document.getElementById('medical_insurance_parents_mipError');
var mediclaim_insurance_parents_mipErrorSpan = document.getElementById('mediclaim_insurance_parents_mipError');
var preventive_health_checkup_mipErrorSpan = document.getElementById('preventive_health_checkup_mipError');


var treatment_valueErrorSpan = document.getElementById('treatment_valueError');

var interest_educationErrorSpan = document.getElementById('interest_educationError');
var interest_education = document.getElementById('interest_education');

var medical_insurance_self_mip = document.getElementById('medical_insurance_self_mip');
var medical_insurance_parents_mip = document.getElementById('medical_insurance_parents_mip');
var mediclaim_insurance_parents_mip = document.getElementById('mediclaim_insurance_parents_mip');
var preventive_health_checkup_mip = document.getElementById('preventive_health_checkup_mip');
var selected_illness = document.getElementById('selected_illness');


var non_senior_citizenbtn = document.getElementById('non_senior_citizen');
var senior_citizenbtn = document.getElementById('senior_citizen');
var bothbtn = document.getElementById('both');

var treatment_value = document.getElementById('treatment_value');

var section80uddselfbtn = document.getElementById('section80uddself');
var section80udddependentbtn = document.getElementById('section80udddependent');
var section80uddbothbtn = document.getElementById('section80uddboth');
var section80uddnobtn = document.getElementById('section80uddno');


var section80eeyes_80eebbtn = document.getElementById('section80eeyes_80eeb');
var section80ccdyesbtn = document.getElementById('section80ccdyes');
var section80Cyesbtn = document.getElementById('section80Cyes');



var paymentDependentDisability = document.getElementById("paymentDependentDisability");
var paymentSelfDisability = document.getElementById("paymentSelfDisability");


var loan_sanctioned_date_80eeb = document.getElementById('loan_sanctioned_date_80eeb');
var vehicle_loan_80eeb = document.getElementById('vehicle_loan_80eeb');
var vehicle_loan_80eebErrorSpan = document.getElementById('vehicle_loan_80eebError');
var loan_lender_80eeb = document.getElementById('loan_lender_80eeb');
var lender_pan_80eeb = document.getElementById('lender_pan_80eeb');


var other80eebLender = document.getElementById('other80eebLender');
var other80eebPAN = document.getElementById('other80eebPAN');
var other80eebLenderErrorSpan = document.getElementById('other80eebLenderError');
var other80eebPANErrorSpan = document.getElementById('other80eebPANError');

var section80ccdselfcheck = document.getElementById('section80ccdself');
var section80ccdebpcheck = document.getElementById('section80ccdebp')

var Inp_80ccd1bnps = document.getElementById('80ccd1bnps');
var prannumberInp = document.getElementById('prannumber');

var Inp_80ccd1bnpsErrorSpan = document.getElementById('80ccd1bnpsError');
var prannumberErrorSpan = document.getElementById('prannumberError');

var sectionyes_previousempbtn

if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
    sectionyes_previousempbtn = document.getElementById('sectionyes_previousemp');
}


var salary_previousemp = document.getElementById('salary_previousemp');
var salary_previousemp_Error = document.getElementById('salary_previousemp_Error');

var provident_fund = document.getElementById('provident_fund');
var provident_fund_Error = document.getElementById('provident_fund_Error');

var professional_tax = document.getElementById('professional_tax');
var professional_tax_Error = document.getElementById('professional_tax_Error');

var income_tax = document.getElementById('income_tax');
var income_tax_Error = document.getElementById('income_tax_Error');



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





var placeInput = document.getElementById('place');
var placeErrorSpan = document.getElementById('placeError');
var itproofcheckBox = document.getElementById('itproofcheck');


var saved_basic_empid

if (saved_basic_empid != "") {
    saved_basic_empid = String(saved_basic_empid);
}

var saved_basic_current_page = String(saved_basic_current_page);


function save_father_ispan() {

    if (!saved_basic_empid) {              
        if (payingrentyesbtn.checked == true || ilhpyesbtn.checked == true || section80oiyesbtn.checked == true || section80ttayesbtn.checked == true || section80dyesbtn.checked == true || section80uddselfbtn.checked == true ||
            section80udddependentbtn.checked == true || section80uddbothbtn.checked == true || section80eeyes_80eebbtn.checked == true || section80ccdyesbtn.checked == true || section80Cyesbtn.checked == true) {

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
    } else {            
        if (localStorage.getItem('Basic_form_formData') !== null) {
            localStorage.removeItem('Basic_form_formData');
        }
    }
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
            input.onkeydown = function (event) {
                return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code !== 'Space';
            };
            

            if (input.id !== 'landlordContact1' && input.id !== 'landlordContact2' &&
                input.id !== 'landlordContact3' && input.id !== 'landlordContact4' && input.id !== 'landlordContact5' 
                && input.id !== 'prannumber' ) {

                input.addEventListener('input', function () {                    
                    if (input.value > Number(10000000)) {
                        input.value = Number(10000000);

                        if (input.id === 'annualLettableValue'){
                            convertedText_annualLettable.textContent = 'One crore rupees';
                        }
                        if (input.id === 'other_income_oi'){
                            convertedText_otherincome.textContent = 'One crore rupees';
                        }
                        if (input.id === 'interest_education'){
                            convertedText_interest_education.textContent = 'One crore rupees';
                        }
                    }
                });
            }
        }
    });

    
});

document.querySelectorAll('.place_inp').forEach(function(input) {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });
});

