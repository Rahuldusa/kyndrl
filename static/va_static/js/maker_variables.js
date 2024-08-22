


var startdate = new Date(startdate);

var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1;

var financialYearStart, financialYearEnd;

if (currentMonth >= 4 && currentMonth <= 12) {
    financialYearStart = new Date(currentYear, 3, 1);
    financialYearEnd = new Date(currentYear + 1, 2, 31);
} else {
    financialYearStart = new Date(currentYear - 1, 3, 1);
    financialYearEnd = new Date(currentYear, 2, 31);
}


if (empsub_1 != null) {
    var empsub_1 = new Date(empsub_1);
}


if (empsub_2 != null) {
    var empsub_2 = new Date(empsub_2);
}

if (empsub_3 != null) {
    var empsub_3 = new Date(empsub_3);
}



var Submitdata = document.getElementById('Submitdata');
var ver_level_1 = document.getElementById('ver_level_1');
var custom_remark = document.getElementById('custom_remark');

// HRA Section Variables:-
// =======================

if (saved_hra_new != null ){
    var saved_hra_new = String(saved_hra_new)
}

if (itd1stdt_value != null) {
    var itd1stdt_value = new Date(itd1stdt_value);
}
if (itd2stdt_value != null) {
    var itd2stdt_value = new Date(itd2stdt_value);
}
if (itd3stdt_value != null) {
    var itd3stdt_value = new Date(itd3stdt_value);
}
if (itd4stdt_value != null) {
    var itd4stdt_value = new Date(itd4stdt_value);
}

if (itd5stdt_value != null) {
    var itd5stdt_value = new Date(itd5stdt_value);
}

if (itd1stdt_value) {
    var itd1 = document.getElementById('itd1');
    var allow_rent_1 = document.getElementById('allow_rent_1');
    var allow_rent_1Error = document.getElementById('allow_rent_1Error');

    var a_city1 = document.getElementById('a_city1');
    var hra_remark_1 = document.getElementById('hra_remark_1');

    var ita1stdt = document.getElementById('ita1stdt');
    var itd1stdt = document.getElementById('itd1stdt');
    var ita1enddt = document.getElementById('ita1enddt');
}


if (itd2stdt_value) {
    var itd2 = document.getElementById('itd2');
    var allow_rent_2 = document.getElementById('allow_rent_2');
    var allow_rent_2Error = document.getElementById('allow_rent_2Error');

    var a_city2 = document.getElementById('a_city2');
    var hra_remark_2 = document.getElementById('hra_remark_2');

    var ita2stdt = document.getElementById('ita2stdt');
    var itd2stdt = document.getElementById('itd2stdt');
    var ita2enddt = document.getElementById('ita2enddt');
}

if (itd3stdt_value) {
    var itd3 = document.getElementById('itd3');
    var allow_rent_3 = document.getElementById('allow_rent_3');
    var allow_rent_3Error = document.getElementById('allow_rent_3Error');

    var a_city3 = document.getElementById('a_city3');
    var hra_remark_3 = document.getElementById('hra_remark_3');

    var ita3stdt = document.getElementById('ita3stdt');
    var itd3stdt = document.getElementById('itd3stdt');
    var ita3enddt = document.getElementById('ita3enddt');
}

if (itd4stdt_value) {
    var itd4 = document.getElementById('itd4');
    var allow_rent_4 = document.getElementById('allow_rent_4');
    var allow_rent_4Error = document.getElementById('allow_rent_4Error');

    var a_city4 = document.getElementById('a_city4');
    var hra_remark_4 = document.getElementById('hra_remark_4');

    var ita4stdt = document.getElementById('ita4stdt');
    var itd4stdt = document.getElementById('itd4stdt');
    var ita4enddt = document.getElementById('ita4enddt');
}


if (itd5stdt_value) {
    var itd5 = document.getElementById('itd5');
    var allow_rent_5 = document.getElementById('allow_rent_5');
    var allow_rent_5Error = document.getElementById('allow_rent_5Error');

    var a_city5 = document.getElementById('a_city5');
    var hra_remark_5 = document.getElementById('hra_remark_5');

    var ita5stdt = document.getElementById('ita5stdt');
    var itd5stdt = document.getElementById('itd5stdt');
    var ita5enddt = document.getElementById('ita5enddt');
}


// ILH Section Variables:-
// =======================


if (saved_Ilhp_new != null ){
    var saved_Ilhp_new = String(saved_Ilhp_new)
}


if (saved_Ilhp_self != null) {
    var saved_Ilhp_self = Number(saved_Ilhp_self);
}

if (saved_Ilhp_letout != null) {
    var saved_Ilhp_letout = Number(saved_Ilhp_letout);
}



if (saved_Ilhp_80EE != null) {
    var saved_Ilhp_80EE = new Date(saved_Ilhp_80EE);
}

if (saved_Ilhp_80EEA != null) {
    var saved_Ilhp_80EEA = new Date(saved_Ilhp_80EEA);
}

if (saved_Ilhp_otherincome != null) {
    var saved_Ilhp_otherincome = Number(saved_Ilhp_otherincome);
}

if (saved_Ilhp_80tta != null) {
    var saved_Ilhp_80tta = Number(saved_Ilhp_80tta);
}





if (saved_Ilhp_self) {
    var selfOccupiedHouseProperty = document.getElementById('selfOccupiedHouseProperty');
    var allowed_self = document.getElementById('allowed_self');
    var allowed_selfError = document.getElementById('allowed_selfError');
    var self_remark = document.getElementById('self_remark');
}

if (saved_Ilhp_letout) {

    var annualLettableValue = document.getElementById('annualLettableValue');
    var allowed_annualLettableValue = document.getElementById('allowed_annualLettableValue');
    var allowed_annualLettableValueError = document.getElementById('allowed_annualLettableValueError');
    var allowed_annualLettableValue_remark = document.getElementById('allowed_annualLettableValue_remark');

    var municipalPropertyTax = document.getElementById('municipalPropertyTax');
    var allowed_municipalPropertyTax = document.getElementById('allowed_municipalPropertyTax');
    var allowed_municipalPropertyTaxError = document.getElementById('allowed_municipalPropertyTaxError');
    var allowed_municipalPropertyTax_remark = document.getElementById('allowed_municipalPropertyTax_remark');

    var homeLoanInterest = document.getElementById('homeLoanInterest');
    var allowed_homeLoanInterest = document.getElementById('allowed_homeLoanInterest');
    var allowed_homeLoanInterestError = document.getElementById('allowed_homeLoanInterestError');
    var allowed_homeLoanInterest_remark = document.getElementById('allowed_homeLoanInterest_remark');

    var incomeLossOnHouseProperty = document.getElementById('incomeLossOnHouseProperty');
    var allowed_incomeLossOnHouseProperty = document.getElementById('allowed_incomeLossOnHouseProperty');
    var allowed_incomeLossOnHousePropertyError = document.getElementById('allowed_incomeLossOnHousePropertyError');
    var allowed_incomeLossOnHouseProperty_remark = document.getElementById('allowed_incomeLossOnHouseProperty_remark');

    var standardDeduction = document.getElementById('standardDeduction');
    var allowed_standardDeduction = document.getElementById('allowed_standardDeduction');
    var allowed_standardDeductionError = document.getElementById('allowed_standardDeductionError');
    var allowed_standardDeduction_remark = document.getElementById('allowed_standardDeduction_remark');
}

if (saved_Ilhp_80EE){
    var loan_sanctioned_date = document.getElementById('loan_sanctioned_date');    

    var loan_amount = document.getElementById('loan_amount');
    var allowed_loan_amount = document.getElementById('allowed_loan_amount');
    var allowed_loan_amountError = document.getElementById('allowed_loan_amountError');
    var loan_amount_remark = document.getElementById('loan_amount_remark');

    var property_value = document.getElementById('property_value');
    var allowed_property_value = document.getElementById('allowed_property_value');
    var allowed_property_valueError = document.getElementById('allowed_property_valueError');
    var property_value_remark = document.getElementById('property_value_remark');

    var home_loan = document.getElementById('home_loan');
    var allowed_home_loan = document.getElementById('allowed_home_loan');
    var allowed_home_loanError = document.getElementById('allowed_home_loanError');
    var home_loan_remark = document.getElementById('home_loan_remark');
}

if (saved_Ilhp_80EEA){
    var loan_sanctioned_date_ee = document.getElementById('loan_sanctioned_date_ee');
    var allowed_loan_sanctioned_date_ee = document.getElementById('allowed_loan_sanctioned_date_ee');    
    var loan_sanctioned_date_ee_remark = document.getElementById('loan_sanctioned_date_ee_remark');

    var property_value_other = document.getElementById('property_value_other');
    var allowed_property_value_other = document.getElementById('allowed_property_value_other');
    var property_value_otherError = document.getElementById('property_value_otherError');
    var property_value_other_remark = document.getElementById('property_value_other_remark');
}

if (saved_Ilhp_otherincome){
    var other_income_oi = document.getElementById('other_income_oi');
    var allowed_other_income_oi = document.getElementById('allowed_other_income_oi');
    var allowed_other_income_oiError = document.getElementById('allowed_other_income_oiError');
    var other_income_oi_remark = document.getElementById('other_income_oi_remark');
}

if (saved_Ilhp_80tta){
    var interest_80tta = document.getElementById('interest_80tta');
    var allowed_interest_80tta = document.getElementById('allowed_interest_80tta');
    var allowed_interest_80ttaError = document.getElementById('allowed_interest_80ttaError');
    var interest_80tta_remark = document.getElementById('interest_80tta_remark');
}


// 80 Other Variables:-
// ====================


if (saved_other80_new != null ){
    var saved_other80_new = String(saved_other80_new)
}

if (saved_other80_med != null) {
    var saved_other80_med = Number(saved_other80_med);
}


if (saved_other80_parent != null) {
    var saved_other80_parent = Number(saved_other80_parent);
}


if (saved_other80_senior != null) {
    var saved_other80_senior = Number(saved_other80_senior);
}


if (saved_other80_preventive != null) {
    var saved_other80_preventive = Number(saved_other80_preventive);
}

if (saved_other80_med){
    var medical_insurance_self_mip = document.getElementById('medical_insurance_self_mip');
    var allowed_medical_insurance = document.getElementById('allowed_medical_insurance');
    var allowed_medical_insuranceError = document.getElementById('allowed_medical_insuranceError');
    var medical_insurance_remark = document.getElementById('medical_insurance_remark');    
}

if (saved_other80_parent){

    var medical_insurance_parents_mip = document.getElementById('medical_insurance_parents_mip');
    var allowed_parents_mip_nsn = document.getElementById('allowed_parents_mip_nsn');
    var allowed_parents_mip_nsnError = document.getElementById('allowed_parents_mip_nsnError');
    var parents_mip_nsn_remark = document.getElementById('parents_mip_nsn_remark');    
}

if (saved_other80_senior){
    var mediclaim_insurance_parents_mip = document.getElementById('mediclaim_insurance_parents_mip');
    var allowed_parents_mip_sn = document.getElementById('allowed_parents_mip_sn');
    var allowed_parents_mip_snError = document.getElementById('allowed_parents_mip_snError');
    var parents_mip_sn_remark = document.getElementById('parents_mip_sn_remark');

}

if (saved_other80_preventive){
    var preventive_health_checkup_mip = document.getElementById('preventive_health_checkup_mip');
    var allowed_health_checkup = document.getElementById('allowed_health_checkup');
    var allowed_health_checkupError = document.getElementById('allowed_health_checkupError');
    var health_checkup_remark = document.getElementById('health_checkup_remark');
}


if (saved_illness != null ){
    var saved_illness = String(saved_illness)
}

if (saved_illness){
    var treatment_value = document.getElementById('treatment_value');
    var allowed_treatment_value = document.getElementById('allowed_treatment_value');
    var allowed_treatment_valueError = document.getElementById('allowed_treatment_valueError');
    var treatment_value_remark = document.getElementById('treatment_value_remark');
}

if (saved_education != null) {
    var saved_education = Number(saved_education);
}

if (saved_education){
    var interest_education = document.getElementById('interest_education');
    var allowed_interest_education = document.getElementById('allowed_interest_education');
    var allowed_interest_educationError = document.getElementById('allowed_interest_educationError');
    var interest_education_remark = document.getElementById('interest_education_remark');
}


if (saved_dependent != null) {
    var saved_dependent = Number(saved_dependent);
}

if (saved_dependent){
    var paymentDependentDisability = document.getElementById('paymentDependentDisability');
    var allowed_Dependent_dis = document.getElementById('allowed_Dependent_dis');
    var allowed_Dependent_disError = document.getElementById('allowed_Dependent_disError');
    var allowed_Dependent_remark = document.getElementById('allowed_Dependent_remark');
}

if (saved_self != null) {
    var saved_self = Number(saved_self);
}

if (saved_self){
    var paymentSelfDisability = document.getElementById('paymentSelfDisability');
    var allowed_self_dis = document.getElementById('allowed_self_dis');
    var allowed_self_disError = document.getElementById('allowed_self_disError');
    var allowed_self_remark = document.getElementById('allowed_self_remark');
}



if (saved_80eeb != null) {
    var saved_80eeb = new Date(saved_80eeb);
}

if (saved_80ccd != null) {
    var saved_80ccd = Number(saved_80ccd);
}

if (saved_80eeb){
    var vehicle_loan_80eeb = document.getElementById('vehicle_loan_80eeb');
    var allowed_vehicle_value = document.getElementById('allowed_vehicle_value');
    var allowed_vehicle_valueError = document.getElementById('allowed_vehicle_valueError');
    var vehicle_value_remark = document.getElementById('vehicle_value_remark');
}


if (saved_80ccd){
    var nps_80ccd1b = document.getElementById('nps_80ccd1b');
    var allowed_nps_80ccd1b = document.getElementById('allowed_nps_80ccd1b');
    var allowed_nps_80ccd1bError = document.getElementById('allowed_nps_80ccd1bError');
    var nps_80ccd1b_remark = document.getElementById('nps_80ccd1b_remark');
}


// 80C Section Variables:-
// =======================

if (saved_80c_new != null) {
    var saved_80c_new = String(saved_80c_new);
}

if (saved_80c_payment != null) {
    var saved_80c_payment = Number(saved_80c_payment);
}

if (saved_80c_payment){
    var paymentLifeInsurance = document.getElementById('paymentLifeInsurance');
    var allowed_paymentLifeInsurance = document.getElementById('allowed_paymentLifeInsurance');
    var allowed_paymentLifeInsuranceError = document.getElementById('allowed_paymentLifeInsuranceError');
    var paymentLifeInsurance_remark = document.getElementById('paymentLifeInsurance_remark');
}

if (saved_80c_timeDeposit != null) {
    var saved_80c_timeDeposit = Number(saved_80c_timeDeposit);
}

if (saved_80c_timeDeposit){
    var timeDeposit = document.getElementById('timeDeposit');
    var allowed_timeDeposit = document.getElementById('allowed_timeDeposit');
    var allowed_timeDepositError = document.getElementById('allowed_timeDepositError');
    var timeDeposit_remark = document.getElementById('timeDeposit_remark');
}

if (saved_80c_ulipContribution != null) {
    var saved_80c_ulipContribution = Number(saved_80c_ulipContribution);
}

if (saved_80c_ulipContribution){
    var ulipContribution = document.getElementById('ulipContribution');
    var allowed_ulipContribution = document.getElementById('allowed_ulipContribution');
    var allowed_ulipContributionError = document.getElementById('allowed_ulipContributionError');
    var ulipContribution_remark = document.getElementById('ulipContribution_remark');
}

if (saved_80c_nscSubscription != null) {
    var saved_80c_nscSubscription = Number(saved_80c_nscSubscription);
}

if (saved_80c_nscSubscription){
    var nscSubscription = document.getElementById('nscSubscription');
    var allowed_nscSubscription = document.getElementById('allowed_nscSubscription');
    var allowed_nscSubscriptionError = document.getElementById('allowed_nscSubscriptionError');
    var nscSubscription_remark = document.getElementById('nscSubscription_remark');
}

if (saved_80c_nscInterest != null) {
    var saved_80c_nscInterest = Number(saved_80c_nscInterest);
}

if (saved_80c_nscInterest){
    var nscInterest = document.getElementById('nscInterest');
    var allowed_nscInterest = document.getElementById('allowed_nscInterest');
    var allowed_nscInterestError = document.getElementById('allowed_nscInterestError');
    var nscInterest_remark = document.getElementById('nscInterest_remark');
}

if (saved_80c_ppfContribution != null) {
    var saved_80c_ppfContribution = Number(saved_80c_ppfContribution);
}

if (saved_80c_ppfContribution){
    var ppfContribution = document.getElementById('ppfContribution');
    var allowed_ppfContribution = document.getElementById('allowed_ppfContribution');
    var allowed_ppfContributionError = document.getElementById('allowed_ppfContributionError');
    var ppfContribution_remark = document.getElementById('ppfContribution_remark');
}

if (saved_80c_houseLoan != null) {
    var saved_80c_houseLoan = Number(saved_80c_houseLoan);
}

if (saved_80c_houseLoan){
    var houseLoan = document.getElementById('houseLoan');
    var allowed_houseLoan = document.getElementById('allowed_houseLoan');
    var allowed_houseLoanError = document.getElementById('allowed_houseLoanError');
    var houseLoan_remark = document.getElementById('houseLoan_remark');
}

if (saved_80c_tuitionFee != null) {
    var saved_80c_tuitionFee = Number(saved_80c_tuitionFee);
}

if (saved_80c_tuitionFee){
    var tuitionFee = document.getElementById('tuitionFee');
    var allowed_tuitionFee = document.getElementById('allowed_tuitionFee');
    var allowed_tuitionFeeError = document.getElementById('allowed_tuitionFeeError');
    var tuitionFee_remark = document.getElementById('tuitionFee_remark');
}

if (saved_80c_mutualFundSubscription != null) {
    var saved_80c_mutualFundSubscription = Number(saved_80c_mutualFundSubscription);
}

if (saved_80c_mutualFundSubscription){
    var mutualFundSubscription = document.getElementById('mutualFundSubscription');
    var allowed_mutualFundSubscription = document.getElementById('allowed_mutualFundSubscription');
    var allowed_mutualFundSubscriptionError = document.getElementById('allowed_mutualFundSubscriptionError');
    var mutualFundSubscription_remark = document.getElementById('mutualFundSubscription_remark');
}

if (saved_80c_termDeposits != null) {
    var saved_80c_termDeposits = Number(saved_80c_termDeposits);
}

if (saved_80c_termDeposits){
    var termDeposits = document.getElementById('termDeposits');
    var allowed_termDeposits = document.getElementById('allowed_termDeposits');
    var allowed_termDepositsError = document.getElementById('allowed_termDepositsError');
    var termDeposits_remark = document.getElementById('termDeposits_remark');
}

if (saved_80c_pensionContribution != null) {
    var saved_80c_pensionContribution = Number(saved_80c_pensionContribution);
}

if (saved_80c_pensionContribution){
    var pensionContribution = document.getElementById('pensionContribution');
    var allowed_pensionContribution = document.getElementById('allowed_pensionContribution');
    var allowed_pensionContributionError = document.getElementById('allowed_pensionContributionError');
    var pensionContribution_remark = document.getElementById('pensionContribution_remark');
}

if (saved_80c_sukanyaSamriddhi != null) {
    var saved_80c_sukanyaSamriddhi = Number(saved_80c_sukanyaSamriddhi);
}

if (saved_80c_sukanyaSamriddhi){
    var sukanyaSamriddhi = document.getElementById('sukanyaSamriddhi');
    var allowed_sukanyaSamriddhi = document.getElementById('allowed_sukanyaSamriddhi');
    var allowed_sukanyaSamriddhiError = document.getElementById('allowed_sukanyaSamriddhiError');
    var sukanyaSamriddhi_remark = document.getElementById('sukanyaSamriddhi_remark');
}

// prevoous emp variables:-
// ========================

if (saved_previous_emp != null) {
    var saved_previous_emp = String(saved_previous_emp);
}

if (saved_previous_emp){

    var salary_previousemp = document.getElementById('salary_previousemp');
    var allowed_salary_previousemp = document.getElementById('allowed_salary_previousemp');
    var allowed_salary_previousempError = document.getElementById('allowed_salary_previousempError');
    var salary_previousemp_remark = document.getElementById('salary_previousemp_remark');

    var provident_fund = document.getElementById('provident_fund');
    var allowed_provident_fund = document.getElementById('allowed_provident_fund');
    var allowed_provident_fundError = document.getElementById('allowed_provident_fundError');
    var provident_fund_remark = document.getElementById('provident_fund_remark');


    var professional_tax = document.getElementById('professional_tax');
    var allowed_professional_tax = document.getElementById('allowed_professional_tax');
    var allowed_professional_taxError = document.getElementById('allowed_professional_taxError');
    var professional_tax_remark = document.getElementById('professional_tax_remark');


    var income_tax = document.getElementById('income_tax');
    var allowed_income_tax = document.getElementById('allowed_income_tax');
    var allowed_income_taxError = document.getElementById('allowed_income_taxError');
    var income_tax_remark = document.getElementById('income_tax_remark');


}

