




function convertToMidnight(dateString) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    const formattedDate = date.toString();
    return formattedDate;
}


function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}


function submit_btn_enable() {     
    disabledbtn = true;

    if (ver_level_2.checked != true) {
        disabledbtn = false;
    }
    if (!custom_remark.value) {
        disabledbtn = false;
    }
    if (itd1stdt_value) {
        
        if (!allow_rent_1.value || allow_rent_1Error.textContent != '' ||  !ita1stdt.value || !ita1enddt.value  || a_city1.value == '--select--') {
            disabledbtn = false;
        } 
        if (Number(itd1.value) > Number(allow_rent_1.value)){
            if (hra_remark_1.value == '--select--' || hra_remark_1.value == 'No Remark'){
                disabledbtn = false;
            }
        }
        
    }
    if (itd2stdt_value) {
        if (!allow_rent_2.value || allow_rent_2Error.textContent != '' ||  a_city2.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd2.value) > Number(allow_rent_2.value)){
            if (hra_remark_2.value == '--select--' || hra_remark_2.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (convertToMidnight(new Date(ita1enddt.value)) != new Date(financialYearEnd)) {
            if (!ita2stdt.value || !ita2enddt.value) {
                disabledbtn = false;
            }
        }
    }
    if (itd3stdt_value) {
        if (!allow_rent_3.value || allow_rent_3Error.textContent != '' ||  a_city3.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd3.value) > Number(allow_rent_3.value)){
            if (hra_remark_3.value == '--select--' || hra_remark_3.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (convertToMidnight(new Date(ita1enddt.value)) != new Date(financialYearEnd) && convertToMidnight(new Date(ita2enddt.value)) != new Date(financialYearEnd)) {
            if (!ita3stdt.value || !ita3enddt.value) {
                disabledbtn = false;
            }
        }
    }
    if (itd4stdt_value) {
        if (!allow_rent_4.value || allow_rent_4Error.textContent != '' || a_city4.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd4.value) > Number(allow_rent_4.value)){
            if (hra_remark_4.value == '--select--' || hra_remark_4.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (convertToMidnight(new Date(ita1enddt.value)) != new Date(financialYearEnd) && convertToMidnight(new Date(ita2enddt.value)) != new Date(financialYearEnd) && convertToMidnight(new Date(ita4enddt.value)) != new Date(financialYearEnd)) {
            if (!ita4stdt.value || !ita4enddt.value) {
                disabledbtn = false;
            }
        }
    }
    if (itd5stdt_value) {
        if (!allow_rent_5.value || allow_rent_5Error.textContent != '' ||  a_city5.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd5.value) > Number(allow_rent_5.value)){
            if (hra_remark_5.value == '--select--' || hra_remark_5.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (convertToMidnight(new Date(ita1enddt.value)) != new Date(financialYearEnd) && convertToMidnight(new Date(ita2enddt.value)) != new Date(financialYearEnd) && convertToMidnight(new Date(ita4enddt.value)) != new Date(financialYearEnd) && convertToMidnight(new Date(ita5enddt.value)) != new Date(financialYearEnd)) {
            if (!ita5stdt.value || !ita5enddt.value) {
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_self) {
        if (!allowed_self.value || allowed_selfError.textContent != '') {
            disabledbtn = false;
        }

        if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value)){
            if (self_remark.value == '--select--' || self_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }

    }
    if (saved_Ilhp_letout) {
        if (!allowed_annualLettableValue.value || allowed_annualLettableValueError.textContent != '' ||
            !allowed_municipalPropertyTax.value || allowed_municipalPropertyTaxError.textContent != '' || 
            !allowed_homeLoanInterest.value || allowed_homeLoanInterestError.textContent != '' ||
            allowed_incomeLossOnHousePropertyError.textContent != '' || 
            allowed_standardDeductionError.textContent != '' ) {
            disabledbtn = false;
        }

        if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value)){
            if (allowed_annualLettableValue_remark.value == '--select--' || allowed_annualLettableValue_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value)){
            if (allowed_municipalPropertyTax_remark.value == '--select--' || allowed_municipalPropertyTax_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value)){
            if (allowed_homeLoanInterest_remark.value == '--select--' || allowed_homeLoanInterest_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value)){
            if (allowed_incomeLossOnHouseProperty_remark.value == '--select--' || allowed_incomeLossOnHouseProperty_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }

        if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value)){
            if (allowed_standardDeduction_remark.value == '--select--' || allowed_standardDeduction_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    // check
    if (saved_Ilhp_80EE) {
        if (!allowed_loan_amount.value || allowed_loan_amountError.textContent != '' || 
            !allowed_property_value.value || allowed_property_valueError.textContent != '' || 
            !allowed_home_loan.value || allowed_home_loanError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(loan_amount.value) > Number(allowed_loan_amount.value)){
            if (loan_amount_remark.value == '--select--' || loan_amount_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
        if (Number(property_value.value) > Number(allowed_property_value.value)){
            if (property_value_remark.value == '--select--' || property_value_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
        if (Number(home_loan.value) > Number(allowed_home_loan.value)){
            if (home_loan_remark.value == '--select--' || home_loan_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_80EEA) {
        if (!allowed_property_value_other.value || property_value_otherError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(property_value_other.value) > Number(allowed_property_value_other.value)){
            if (property_value_other_remark.value == '--select--' || property_value_other_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_otherincome) {
        if (!allowed_other_income_oi.value || allowed_other_income_oiError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value)){
            if (other_income_oi_remark.value == '--select--' || other_income_oi_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_80tta) {
        if (!allowed_interest_80tta.value || allowed_interest_80ttaError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value)){
            if (interest_80tta_remark.value == '--select--' || interest_80tta_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_other80_med) {
        if (!allowed_medical_insurance.value || allowed_medical_insuranceError.textContent != '') {
            disabledbtn = false;
        }

        if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value)) {
            if (medical_insurance_remark.value == '--select--' || medical_insurance_remark.value == 'No Remark') {
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_parent){

        if(!allowed_parents_mip_nsn.value || allowed_parents_mip_nsnError.textContent != ''){
            disabledbtn = false;
        }
        if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value)) {
            if (parents_mip_nsn_remark.value == '--select--' || parents_mip_nsn_remark.value == 'No Remark') {
                disabledbtn = false;
            }
        }
       
    }

    if (saved_other80_senior){
        if(!allowed_parents_mip_sn.value || allowed_parents_mip_snError.textContent != ''){
            disabledbtn = false;
        }
        if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value)) {
            if (parents_mip_sn_remark.value == '--select--' || parents_mip_sn_remark.value == 'No Remark') {
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_preventive){
        if(!allowed_health_checkup.value || allowed_health_checkupError.textContent != ''){
            disabledbtn = false;
        }
        if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value)) {
            if (health_checkup_remark.value == '--select--' || health_checkup_remark.value == 'No Remark') {
                disabledbtn = false;
            }
        }
    }


    if (saved_illness) {
        if (!allowed_treatment_value.value || allowed_treatment_valueError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(treatment_value.value) > Number(allowed_treatment_value.value)){
            if (treatment_value_remark.value == '--select--' || treatment_value_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }
    if (saved_education) {
        if (!allowed_interest_education.value || allowed_interest_educationError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(interest_education.value) > Number(allowed_interest_education.value)){
            if (interest_education_remark.value == '--select--' || interest_education_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_dependent) {
        if (!allowed_Dependent_dis.value || allowed_Dependent_disError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value)){
            if (allowed_Dependent_remark.value == '--select--' || allowed_Dependent_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }
    if (saved_self) {
        if (!allowed_self_dis.value || allowed_self_disError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value)){
            if (allowed_self_remark.value == '--select--' || allowed_self_remark.value == 'No Remark'){
                disabledbtn = false;
            } 
        }
    }
    if (saved_80eeb) {
        if (!allowed_vehicle_value.value || allowed_vehicle_valueError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value)){
            if (vehicle_value_remark.value == '--select--' || vehicle_value_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80ccd) {
        if (!allowed_nps_80ccd1b.value || allowed_nps_80ccd1bError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value)){
            if (nps_80ccd1b_remark.value == '--select--' || nps_80ccd1b_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    // ==========


    if (saved_80c_payment) {
        if (!allowed_paymentLifeInsurance.value || allowed_paymentLifeInsuranceError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value)){
            if (paymentLifeInsurance_remark.value == '--select--' || paymentLifeInsurance_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_timeDeposit) {
        if (!allowed_timeDeposit.value || allowed_timeDepositError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value)){
            if (timeDeposit_remark.value == '--select--' || timeDeposit_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ulipContribution) {
        if (!allowed_ulipContribution.value || allowed_ulipContributionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value)){
            if (ulipContribution_remark.value == '--select--' || ulipContribution_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_nscSubscription) {
        if (!allowed_nscSubscription.value || allowed_nscSubscriptionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value)){
            if (nscSubscription_remark.value == '--select--' || nscSubscription_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_nscInterest) {
        if (!allowed_nscInterest.value || allowed_nscInterestError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(nscInterest.value) > Number(allowed_nscInterest.value)){
            if (nscInterest_remark.value == '--select--' || nscInterest_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ppfContribution) {
        if (!allowed_ppfContribution.value || allowed_ppfContributionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value)){
            if (ppfContribution_remark.value == '--select--' || ppfContribution_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_houseLoan) {
        if (!allowed_houseLoan.value || allowed_houseLoanError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(houseLoan.value) > Number(allowed_houseLoan.value)){
            if (houseLoan_remark.value == '--select--' || houseLoan_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_tuitionFee) {
        if (!allowed_tuitionFee.value || allowed_tuitionFeeError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value)){
            if (tuitionFee_remark.value == '--select--' || tuitionFee_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_mutualFundSubscription) {
        if (!allowed_mutualFundSubscription.value || allowed_mutualFundSubscriptionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value)){
            if (mutualFundSubscription_remark.value == '--select--' || mutualFundSubscription_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_termDeposits) {
        if (!allowed_termDeposits.value || allowed_termDepositsError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(termDeposits.value) > Number(allowed_termDeposits.value)){
            if (termDeposits_remark.value == '--select--' || termDeposits_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_pensionContribution) {
        if (!allowed_pensionContribution.value || allowed_pensionContributionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value)){
            if (pensionContribution_remark.value == '--select--' || pensionContribution_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_sukanyaSamriddhi) {
        if (!allowed_sukanyaSamriddhi.value || allowed_sukanyaSamriddhiError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value)){
            if (sukanyaSamriddhi_remark.value == '--select--' || sukanyaSamriddhi_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }

    if (saved_previous_emp) {
        if (!allowed_salary_previousemp.value || allowed_salary_previousempError.textContent != '' ||
            !allowed_provident_fund.value || allowed_provident_fundError.textContent != '' ||
            !allowed_professional_tax.value || allowed_professional_taxError.textContent != '' ||
            !allowed_income_tax.value || allowed_income_taxError.textContent != '') {
            disabledbtn = false;
        }

        if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp.value)){
            if (salary_previousemp_remark.value == '--select--' || salary_previousemp_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
        if (Number(provident_fund.value) != Number(allowed_provident_fund.value)){
            if (provident_fund_remark.value == '--select--' || provident_fund_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
        if (Number(professional_tax.value) != Number(allowed_professional_tax.value)){
            if (professional_tax_remark.value == '--select--' || professional_tax_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
        if (Number(income_tax.value) != Number(allowed_income_tax.value)){           
            if (income_tax_remark.value == '--select--' || income_tax_remark.value == 'No Remark'){
                disabledbtn = false;
            }
        }
    }


    if (disabledbtn == true) {
        Submitdata.disabled = false;
    } else {
        Submitdata.disabled = true;    
    }
}

function submit_btn_enable_2(){
    disabledbtn = true;

    if (ver_level_2.checked != true) {        
        disabledbtn = false;
    }
    if (!custom_remark.value) {        
        disabledbtn = false;
    }
    if (itd1stdt_value) {
        if (!allow_rent_1_2.value || !ita1stdt.value || !ita1enddt.value){            
            disabledbtn = false;
        }
        if (Number(allow_rent_1_2.value) + Number(allow_rent_1.value) !== Number(itd1.value)){
            if (hra_remark_1_2.value == '--select--'){                
                disabledbtn = false;
            }
        }
    }

    if (itd2stdt_value) {
        if (!allow_rent_2_2.value || !ita2stdt.value || !ita2enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_2_2.value) + Number(allow_rent_2.value) !== Number(itd2.value)){
            if (hra_remark_2_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (itd3stdt_value) {
        if (!allow_rent_3_2.value || !ita3stdt.value || !ita3enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_3_2.value) + Number(allow_rent_3.value) !== Number(itd3.value)){
            if (hra_remark_3_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (itd4stdt_value) {
        if (!allow_rent_4_2.value || !ita4stdt.value || !ita4enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_4_2.value) + Number(allow_rent_4.value) !== Number(itd4.value)){
            if (hra_remark_4_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (itd5stdt_value) {
        if (!allow_rent_5_2.value || !ita5stdt.value || !ita5enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_5_2.value) + Number(allow_rent_5.value) !== Number(itd5.value)){
            if (hra_remark_5_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_self) {
        if (!allowed_self_2.value){
            disabledbtn = false;  
        }
        if (Number(allowed_self.value) + Number(allowed_self_2.value) !== Number(selfOccupiedHouseProperty.value)  ){
            if (self_remark_2.value == '--select--'){
                disabledbtn = false; 
                   
            }
        }
    }

    if (saved_Ilhp_letout) {
        if (!allowed_annualLettableValue_2.value || !allowed_municipalPropertyTax_2.value || !allowed_homeLoanInterest_2.value || !allowed_incomeLossOnHouseProperty_2.value || 
            !allowed_standardDeduction_2.value || allowed_standardDeduction_2Error.textContent != '' || allowed_incomeLossOnHouseProperty_2Error.textContent != ''){
            disabledbtn = false;
        }
        if (Number(allowed_annualLettableValue_2.value) + Number(allowed_annualLettableValue.value) !== Number(annualLettableValue.value)){
            if (allowed_annualLettableValue_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax.value) !== Number(municipalPropertyTax.value)){
            if (allowed_municipalPropertyTax_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_homeLoanInterest_2.value) + Number(allowed_homeLoanInterest.value) !== Number(homeLoanInterest.value)){
            if (allowed_homeLoanInterest_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_incomeLossOnHouseProperty_2.value) + Number(allowed_incomeLossOnHouseProperty.value) !== Number(incomeLossOnHouseProperty.value)){
            if (allowed_incomeLossOnHouseProperty_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_standardDeduction_2.value) + Number(allowed_standardDeduction.value) !== Number(standardDeduction.value)){
            if (allowed_standardDeduction_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_80EE){
        if (!allowed_loan_amount_2.value || !allowed_property_value_2.value || !allowed_home_loan_2.value ){
            disabledbtn = false;
        }

        if (Number(allowed_loan_amount_2.value) + Number(allowed_loan_amount.value) !== Number(loan_amount.value)){
            if (loan_amount_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_property_value_2.value) + Number(allowed_property_value.value) !== Number(property_value.value)){
            if (property_value_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_home_loan_2.value) + Number(allowed_home_loan.value) !== Number(home_loan.value)){
            if (home_loan_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }
    
    if (saved_Ilhp_80EEA){
        if (!allowed_property_value_other_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_property_value_other_2.value) + Number(allowed_property_value_other.value) !== Number(property_value_other.value)){
            if (property_value_other_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_otherincome){
        if (!allowed_other_income_oi_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_other_income_oi_2.value) + Number(allowed_other_income_oi.value) !== Number(other_income_oi.value)){
            if (other_income_oi_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_80tta){
        if (!allowed_interest_80tta_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_interest_80tta_2.value) + Number(allowed_interest_80tta.value) !== Number(interest_80tta.value)){
            if (interest_80tta_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_other80_med){
        if (!allowed_medical_insurance_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_medical_insurance_2.value) + Number(allowed_medical_insurance.value) !== Number(medical_insurance_self_mip.value)){
            if (medical_insurance_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_parent){
        if (!allowed_parents_mip_nsn_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_parents_mip_nsn_2.value) + Number(allowed_parents_mip_nsn.value) !== Number(medical_insurance_parents_mip.value)){
            if (parents_mip_nsn_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_senior){
        if (!allowed_parents_mip_sn_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_parents_mip_sn_2.value) + Number(allowed_parents_mip_sn.value) !== Number(mediclaim_insurance_parents_mip.value)){
            if (parents_mip_sn_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
       
    }

    if (saved_other80_preventive){
        if (!allowed_health_checkup_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_health_checkup_2.value) + Number(allowed_health_checkup.value) !== Number(preventive_health_checkup_mip.value)){
            if (health_checkup_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_illness){
        if (!allowed_treatment_value_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_treatment_value_2.value) + Number(allowed_treatment_value.value) !== Number(treatment_value.value)){
            if (treatment_value_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_education){
        if (!allowed_interest_education_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_interest_education_2.value) + Number(allowed_interest_education.value) !== Number(interest_education.value)){
            if (interest_education_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_dependent){
        if (!allowed_Dependent_dis_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_Dependent_dis_2.value) + Number(allowed_Dependent_dis.value) !== Number(paymentDependentDisability.value)){
            if (allowed_Dependent_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    
    if (saved_self){
        if (!allowed_self_dis_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_self_dis_2.value) + Number(allowed_self_dis.value) !== Number(paymentSelfDisability.value)){
            if (allowed_self_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80eeb){
        if (!allowed_vehicle_value_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_vehicle_value_2.value) + Number(allowed_vehicle_value.value) !== Number(vehicle_loan_80eeb.value)){
            if (vehicle_value_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80ccd){
        if (!allowed_nps_80ccd1b_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_nps_80ccd1b_2.value) + Number(allowed_nps_80ccd1b.value) !== Number(nps_80ccd1b.value)){
            if (nps_80ccd1b_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_payment){
        if (!allowed_paymentLifeInsurance_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance.value) !== Number(paymentLifeInsurance.value)){
            if (paymentLifeInsurance_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_timeDeposit){
        if (!allowed_timeDeposit_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_timeDeposit_2.value) + Number(allowed_timeDeposit.value) !== Number(timeDeposit.value)){
            if (timeDeposit_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ulipContribution){
        if (!allowed_ulipContribution_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_ulipContribution_2.value) + Number(allowed_ulipContribution.value) !== Number(ulipContribution.value)){
            if (ulipContribution_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }


    if (saved_80c_nscSubscription){
        if (!allowed_nscSubscription_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_nscSubscription_2.value) + Number(allowed_nscSubscription.value) !== Number(nscSubscription.value)){
            if (nscSubscription_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_nscInterest){
        if (!allowed_nscInterest_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_nscInterest_2.value) + Number(allowed_nscInterest.value) !== Number(nscInterest.value)){
            if (nscInterest_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ppfContribution){
        if (!allowed_ppfContribution_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_ppfContribution_2.value) + Number(allowed_ppfContribution.value) !== Number(ppfContribution.value)){
            if (ppfContribution_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_houseLoan){
        if (!allowed_houseLoan_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_houseLoan_2.value) + Number(allowed_houseLoan.value) !== Number(houseLoan.value)){
            if (houseLoan_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_tuitionFee){
        if (!allowed_tuitionFee_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_tuitionFee_2.value) + Number(allowed_tuitionFee.value) !== Number(tuitionFee.value)){
            if (tuitionFee_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_mutualFundSubscription){
        if (!allowed_mutualFundSubscription_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_mutualFundSubscription_2.value) + Number(allowed_mutualFundSubscription.value) !== Number(mutualFundSubscription.value)){
            if (mutualFundSubscription_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_termDeposits){
        if (!allowed_termDeposits_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_termDeposits_2.value) + Number(allowed_termDeposits.value) !== Number(termDeposits.value)){
            if (termDeposits_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_pensionContribution){
        if (!allowed_pensionContribution_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_pensionContribution_2.value) + Number(allowed_pensionContribution.value) !== Number(pensionContribution.value)){
            if (pensionContribution_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_sukanyaSamriddhi){
        if (!allowed_sukanyaSamriddhi_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_sukanyaSamriddhi_2.value) + Number(allowed_sukanyaSamriddhi.value) !== Number(sukanyaSamriddhi.value)){
            if (sukanyaSamriddhi_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }


    if (saved_previous_emp){
        if (!allowed_salary_previousemp_2.value || !allowed_professional_tax_2.value || !allowed_provident_fund_2.value || !allowed_income_tax_2.value){
            disabledbtn = false;
        }
        if (Number(allowed_salary_previousemp_2.value) !== Number(salary_previousemp.value)){
            if (salary_previousemp_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_professional_tax_2.value)  !== Number(professional_tax.value)){
            if (professional_tax_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_provident_fund_2.value) !== Number(provident_fund.value)){
            if (provident_fund_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_income_tax_2.value)  !== Number(income_tax.value)){
            if (income_tax_remark_2.value == '--select--'){
                disabledbtn = false;
            }
        }
    }



    if (disabledbtn == true) {
        Submitdata_2.disabled = false;
    } else {
        Submitdata_2.disabled = true;    
    }
}

function submit_btn_enable_3(){
    disabledbtn = true;

    if (ver_level_2.checked != true) {        
        disabledbtn = false;
    }
    if (!custom_remark.value) {        
        disabledbtn = false;
    }
    if (itd1stdt_value) {
        if (!allow_rent_1_3.value || !ita1stdt.value || !ita1enddt.value){            
            disabledbtn = false;
        }
        if (Number(allow_rent_1_3.value) + Number(allow_rent_1_2.value) + Number(allow_rent_1.value) !== Number(itd1.value)){
            if (hra_remark_1_3.value == '--select--'){                
                disabledbtn = false;
            }
        }
    }

    if (itd2stdt_value) {
        if (!allow_rent_2_3.value || !ita2stdt.value || !ita2enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_2_3.value) + Number(allow_rent_2_2.value) + Number(allow_rent_2.value) !== Number(itd2.value)){
            if (hra_remark_2_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (itd3stdt_value) {
        if (!allow_rent_3_3.value || !ita3stdt.value || !ita3enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_3_3.value) + Number(allow_rent_3_2.value) + Number(allow_rent_3.value) !== Number(itd3.value)){
            if (hra_remark_3_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (itd4stdt_value) {
        if (!allow_rent_4_3.value || !ita4stdt.value || !ita4enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_4_3.value) + Number(allow_rent_4_2.value) + Number(allow_rent_4.value) !== Number(itd4.value)){
            if (hra_remark_4_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (itd5stdt_value) {
        if (!allow_rent_5_3.value || !ita5stdt.value || !ita5enddt.value){
            disabledbtn = false;
        }
        if (Number(allow_rent_5_3.value) + Number(allow_rent_5_2.value) + Number(allow_rent_5.value) !== Number(itd5.value)){
            if (hra_remark_5_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_self) {
        if (!allowed_self_3.value){
            disabledbtn = false;  
        }
        if (Number(allowed_self.value) + Number(allowed_self_3.value) + Number(allowed_self_2.value) !== Number(selfOccupiedHouseProperty.value)  ){
            if (self_remark_3.value == '--select--'){
                disabledbtn = false;             
            }
        }
    }

    if (saved_Ilhp_letout) {
        if (!allowed_annualLettableValue_3.value || !allowed_municipalPropertyTax_3.value || !allowed_homeLoanInterest_3.value || !allowed_incomeLossOnHouseProperty_3.value || 
            !allowed_standardDeduction_3.value || allowed_standardDeduction_3Error.textContent != '' || allowed_incomeLossOnHouseProperty_3Error.textContent != ''){
            disabledbtn = false;
        }
        if (Number(allowed_annualLettableValue_3.value) + Number(allowed_annualLettableValue_2.value) + Number(allowed_annualLettableValue.value) !== Number(annualLettableValue.value)){
            if (allowed_annualLettableValue_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if ( Number(allowed_municipalPropertyTax_3.value) + Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax.value) !== Number(municipalPropertyTax.value)){
            if (allowed_municipalPropertyTax_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_homeLoanInterest_3.value) + Number(allowed_homeLoanInterest_2.value) + Number(allowed_homeLoanInterest.value) !== Number(homeLoanInterest.value)){
            if (allowed_homeLoanInterest_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_incomeLossOnHouseProperty_3.value) + Number(allowed_incomeLossOnHouseProperty_2.value) + Number(allowed_incomeLossOnHouseProperty.value) !== Number(incomeLossOnHouseProperty.value)){
            if (allowed_incomeLossOnHouseProperty_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_standardDeduction_3.value) + Number(allowed_standardDeduction_2.value) + Number(allowed_standardDeduction.value) !== Number(standardDeduction.value)){
            if (allowed_standardDeduction_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_80EE){
        if (!allowed_loan_amount_3.value || !allowed_property_value_3.value || !allowed_home_loan_3.value ){
            disabledbtn = false;
        }

        if (Number(allowed_loan_amount_3.value) + Number(allowed_loan_amount_2.value) + Number(allowed_loan_amount.value) !== Number(loan_amount.value)){
            if (loan_amount_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_property_value_3.value) + Number(allowed_property_value_2.value) + Number(allowed_property_value.value) !== Number(property_value.value)){
            if (property_value_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_home_loan_3.value) + Number(allowed_home_loan_2.value) + Number(allowed_home_loan.value) !== Number(home_loan.value)){
            if (home_loan_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }
    
    if (saved_Ilhp_80EEA){
        if (!allowed_property_value_other_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_property_value_other_3.value) + Number(allowed_property_value_other_2.value) + Number(allowed_property_value_other.value) !== Number(property_value_other.value)){
            if (property_value_other_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_otherincome){
        if (!allowed_other_income_oi_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_other_income_oi_3.value) + Number(allowed_other_income_oi_2.value) + Number(allowed_other_income_oi.value) !== Number(other_income_oi.value)){
            if (other_income_oi_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_Ilhp_80tta){
        if (!allowed_interest_80tta_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_interest_80tta_3.value) + Number(allowed_interest_80tta_2.value) + Number(allowed_interest_80tta.value) !== Number(interest_80tta.value)){
            if (interest_80tta_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_other80_med){
        if (!allowed_medical_insurance_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_medical_insurance_3.value) + Number(allowed_medical_insurance_2.value) + Number(allowed_medical_insurance.value) !== Number(medical_insurance_self_mip.value)){
            if (medical_insurance_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_parent){

        if (!allowed_parents_mip_nsn_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_parents_mip_nsn_3.value) + Number(allowed_parents_mip_nsn_2.value) + Number(allowed_parents_mip_nsn.value) !== Number(medical_insurance_parents_mip.value)){
            if (parents_mip_nsn_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_senior){

        if (!allowed_parents_mip_sn_3.value){
            disabledbtn = false;
        }

        if (Number(allowed_parents_mip_sn_3.value) + Number(allowed_parents_mip_sn_2.value) + Number(allowed_parents_mip_sn.value) !== Number(mediclaim_insurance_parents_mip.value)){
            if (parents_mip_sn_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        
    }

    if (saved_other80_preventive){

        if (!allowed_health_checkup_3.value){
            disabledbtn = false;
        }

        if (Number(allowed_health_checkup_3.value) + Number(allowed_health_checkup_2.value) + Number(allowed_health_checkup.value) !== Number(preventive_health_checkup_mip.value)){
            if (health_checkup_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_illness){
        if (!allowed_treatment_value_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_treatment_value_3.value) + Number(allowed_treatment_value_2.value) + Number(allowed_treatment_value.value) !== Number(treatment_value.value)){
            if (treatment_value_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_education){
        if (!allowed_interest_education_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_interest_education_3.value) + Number(allowed_interest_education_2.value) + Number(allowed_interest_education.value) !== Number(interest_education.value)){
            if (interest_education_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_dependent){
        if (!allowed_Dependent_dis_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_Dependent_dis_3.value) + Number(allowed_Dependent_dis_2.value) + Number(allowed_Dependent_dis.value) !== Number(paymentDependentDisability.value)){
            if (allowed_Dependent_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    
    if (saved_self){
        if (!allowed_self_dis_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_self_dis_3) + Number(allowed_self_dis_2.value) + Number(allowed_self_dis.value) !== Number(paymentSelfDisability.value)){
            if (allowed_self_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80eeb){
        if (!allowed_vehicle_value_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_vehicle_value_3.value) + Number(allowed_vehicle_value_2.value) + Number(allowed_vehicle_value.value) !== Number(vehicle_loan_80eeb.value)){
            if (vehicle_value_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80ccd){
        if (!allowed_nps_80ccd1b_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_nps_80ccd1b_3.value) + Number(allowed_nps_80ccd1b_2.value) + Number(allowed_nps_80ccd1b.value) !== Number(nps_80ccd1b.value)){
            if (nps_80ccd1b_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_payment){
        if (!allowed_paymentLifeInsurance_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_paymentLifeInsurance_3.value) + Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance.value) !== Number(paymentLifeInsurance.value)){
            if (paymentLifeInsurance_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_timeDeposit){
        if (!allowed_timeDeposit_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_timeDeposit_3.value) + Number(allowed_timeDeposit_2.value) + Number(allowed_timeDeposit.value) !== Number(timeDeposit.value)){
            if (timeDeposit_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ulipContribution){
        if (!allowed_ulipContribution_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_ulipContribution_3.value) + Number(allowed_ulipContribution_2.value) + Number(allowed_ulipContribution.value) !== Number(ulipContribution.value)){
            if (ulipContribution_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }


    if (saved_80c_nscSubscription){
        if (!allowed_nscSubscription_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_nscSubscription_3.value) + Number(allowed_nscSubscription_2.value) + Number(allowed_nscSubscription.value) !== Number(nscSubscription.value)){
            if (nscSubscription_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_nscInterest){
        if (!allowed_nscInterest_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_nscInterest_3.value) + Number(allowed_nscInterest_2.value) + Number(allowed_nscInterest.value) !== Number(nscInterest.value)){
            if (nscInterest_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ppfContribution){
        if (!allowed_ppfContribution_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_ppfContribution_3.value) + Number(allowed_ppfContribution_2.value) + Number(allowed_ppfContribution.value) !== Number(ppfContribution.value)){
            if (ppfContribution_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_houseLoan){
        if (!allowed_houseLoan_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_houseLoan_3.value) + Number(allowed_houseLoan_2.value) + Number(allowed_houseLoan.value) !== Number(houseLoan.value)){
            if (houseLoan_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_tuitionFee){
        if (!allowed_tuitionFee_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_tuitionFee_3.value) + Number(allowed_tuitionFee_2.value) + Number(allowed_tuitionFee.value) !== Number(tuitionFee.value)){
            if (tuitionFee_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_mutualFundSubscription){
        if (!allowed_mutualFundSubscription_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_mutualFundSubscription_3.value) + Number(allowed_mutualFundSubscription_2.value) + Number(allowed_mutualFundSubscription.value) !== Number(mutualFundSubscription.value)){
            if (mutualFundSubscription_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_termDeposits){
        if (!allowed_termDeposits_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_termDeposits_3.value) + Number(allowed_termDeposits_2.value) + Number(allowed_termDeposits.value) !== Number(termDeposits.value)){
            if (termDeposits_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_pensionContribution){
        if (!allowed_pensionContribution_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_pensionContribution_3.value) + Number(allowed_pensionContribution_2.value) + Number(allowed_pensionContribution.value) !== Number(pensionContribution.value)){
            if (pensionContribution_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_sukanyaSamriddhi){
        if (!allowed_sukanyaSamriddhi_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_sukanyaSamriddhi_3.value) + Number(allowed_sukanyaSamriddhi_2.value) + Number(allowed_sukanyaSamriddhi.value) !== Number(sukanyaSamriddhi.value)){
            if (sukanyaSamriddhi_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }


    if (saved_previous_emp){
        if (!allowed_salary_previousemp_3.value || !allowed_professional_tax_3.value || !allowed_provident_fund_3.value || !allowed_income_tax_3.value){
            disabledbtn = false;
        }
        if (Number(allowed_salary_previousemp_3.value) !== Number(salary_previousemp.value)){
            if (salary_previousemp_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_professional_tax_3.value)  !== Number(professional_tax.value)){
            if (professional_tax_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_provident_fund_3.value) !== Number(provident_fund.value)){
            if (provident_fund_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
        if (Number(allowed_income_tax_3.value)  !== Number(income_tax.value)){
            if (income_tax_remark_3.value == '--select--'){
                disabledbtn = false;
            }
        }
    }



    if (disabledbtn == true) {
        Submitdata_3.disabled = false;
    } else {
        Submitdata_3.disabled = true;    
    }
}

function ValidateCheck2() {
    if (ver_level_2.checked == true) {
        ver_level_2.value = 'yes'
    } else {
        ver_level_2.value = 'no'
    }

    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}

function  validate_date_city(){
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}

function validateCustom_remark(){
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}



function showValidationError(element, message) {
    element.setCustomValidity(message);
    element.reportValidity();
}


function Submitdata_fun() {
    if (Submitdata.disabled == false) {        
        basic_form_formdata = new FormData(document.getElementById("basic_form"));

        custom_re_formdata = new FormData(document.getElementById("custom_re"));
        for (let [key, value] of custom_re_formdata.entries()) {
            basic_form_formdata.append(key, value);
        }

        if (saved_hra_new) {
            hra_form_formdata = new FormData(document.getElementById("hra_form"));
            for (let [key, value] of hra_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }
        if (saved_Ilhp_new) {
            ilh_form_formdata = new FormData(document.getElementById("ilh_form"));
            for (let [key, value] of ilh_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_other80_new) {
            other80_form_formdata = new FormData(document.getElementById("other80_form"));
            for (let [key, value] of other80_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_80c_new) {
            _80C_form_formdata = new FormData(document.getElementById("_80C_form"));
            for (let [key, value] of _80C_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_previous_emp) {
            previousemp_form_formdata = new FormData(document.getElementById("previousemp_form"));
            for (let [key, value] of previousemp_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }



        let combinedFormData = new FormData();

        for (let [key, value] of basic_form_formdata.entries()) {
            combinedFormData.append(key, value);
        }

        let apiUrl = "submit_checker";


        let hiddenForm = document.createElement('form');
        hiddenForm.style.display = 'none';
        hiddenForm.action = apiUrl;
        hiddenForm.method = 'POST';


        for (let [key, value] of combinedFormData.entries()) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
    } 
    else {        
        let invalidField = null;

    if (!custom_remark.value) {
        showValidationError(custom_remark, "Please fill this field");
        invalidField = custom_remark;
    }

    if (saved_previous_emp) {
        if (!allowed_income_tax.value) {
            showValidationError(allowed_income_tax, "Please fill this field");
            invalidField = allowed_income_tax;
        } else if (Number(income_tax.value) != Number(allowed_income_tax.value)) {
            if (income_tax_remark.value == '--select--' || income_tax_remark.value == 'No Remark') {
                showValidationError(income_tax_remark, "Please select remarks");
                invalidField = income_tax_remark;
            }
        }

        if (!allowed_provident_fund.value) {
            showValidationError(allowed_provident_fund, "Please fill this field");
            invalidField = allowed_provident_fund;
        } else if (Number(provident_fund.value) != Number(allowed_provident_fund.value)) {
            if (provident_fund_remark.value == '--select--' || provident_fund_remark.value == 'No Remark') {
                showValidationError(provident_fund_remark, "Please select remarks");
                invalidField = provident_fund_remark;
            }
        }

        if (!allowed_professional_tax.value) {
            showValidationError(allowed_professional_tax, "Please fill this field");
            invalidField = allowed_professional_tax;
        } else if (Number(professional_tax.value) != Number(allowed_professional_tax.value)) {
            if (professional_tax_remark.value == '--select--' || professional_tax_remark.value == 'No Remark') {
                showValidationError(professional_tax_remark, "Please select remarks");
                invalidField = professional_tax_remark;
            }
        }

        if (!allowed_salary_previousemp.value) {
            showValidationError(allowed_salary_previousemp, "Please fill this field");
            invalidField = allowed_salary_previousemp;
        } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp.value)) {
            if (salary_previousemp_remark.value == '--select--' || salary_previousemp_remark.value == 'No Remark') {
                showValidationError(salary_previousemp_remark, "Please select remarks");
                invalidField = salary_previousemp_remark;
            }
        }
    }

    // 80C
    if (saved_80c_sukanyaSamriddhi) {
        if (!allowed_sukanyaSamriddhi.value) {
            showValidationError(allowed_sukanyaSamriddhi, "Please fill this field");
            invalidField = allowed_sukanyaSamriddhi;
        } else if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value)) {
            if (sukanyaSamriddhi_remark.value == '--select--' || sukanyaSamriddhi_remark.value == 'No Remark') {
                showValidationError(sukanyaSamriddhi_remark, "Please select remarks");
                invalidField = sukanyaSamriddhi_remark;
            }
        }
    }

    if (saved_80c_pensionContribution) {
        if (!allowed_pensionContribution.value) {
            showValidationError(allowed_pensionContribution, "Please fill this field");
            invalidField = allowed_pensionContribution;
        } else if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value)) {
            if (pensionContribution_remark.value == '--select--' || pensionContribution_remark.value == 'No Remark') {
                showValidationError(pensionContribution_remark, "Please select remarks");
                invalidField = pensionContribution_remark;
            }
        }
    }

    if (saved_80c_termDeposits) {
        if (!allowed_termDeposits.value) {
            showValidationError(allowed_termDeposits, "Please fill this field");
            invalidField = allowed_termDeposits;
        } else if (Number(termDeposits.value) > Number(allowed_termDeposits.value)) {
            if (termDeposits_remark.value == '--select--' || termDeposits_remark.value == 'No Remark') {
                showValidationError(termDeposits_remark, "Please select remarks");
                invalidField = termDeposits_remark;
            }
        }
    }

    if (saved_80c_mutualFundSubscription) {
        if (!allowed_mutualFundSubscription.value) {
            showValidationError(allowed_mutualFundSubscription, "Please fill this field");
            invalidField = allowed_mutualFundSubscription;
        } else if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value)) {
            if (mutualFundSubscription_remark.value == '--select--' || mutualFundSubscription_remark.value == 'No Remark') {
                showValidationError(mutualFundSubscription_remark, "Please select remarks");
                invalidField = mutualFundSubscription_remark;
            }
        }
    }

    if (saved_80c_tuitionFee) {
        if (!allowed_tuitionFee.value) {
            showValidationError(allowed_tuitionFee, "Please fill this field");
            invalidField = allowed_tuitionFee;
        } else if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value)) {
            if (tuitionFee_remark.value == '--select--' || tuitionFee_remark.value == 'No Remark') {
                showValidationError(tuitionFee_remark, "Please select remarks");
                invalidField = tuitionFee_remark;
            }
        }
    }

    if (saved_80c_houseLoan) {
        if (!allowed_houseLoan.value) {
            showValidationError(allowed_houseLoan, "Please fill this field");
            invalidField = allowed_houseLoan;
        } else if (Number(houseLoan.value) > Number(allowed_houseLoan.value)) {
            if (houseLoan_remark.value == '--select--' || houseLoan_remark.value == 'No Remark') {
                showValidationError(houseLoan_remark, "Please select remarks");
                invalidField = houseLoan_remark;
            }
        }
    }

    if (saved_80c_ppfContribution) {
        if (!allowed_ppfContribution.value) {
            showValidationError(allowed_ppfContribution, "Please fill this field");
            invalidField = allowed_ppfContribution;
        } else if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value)) {
            if (ppfContribution_remark.value == '--select--' || ppfContribution_remark.value == 'No Remark') {
                showValidationError(ppfContribution_remark, "Please select remarks");
                invalidField = ppfContribution_remark;
            }
        }
    }

    if (saved_80c_nscInterest) {
        if (!allowed_nscInterest.value) {
            showValidationError(allowed_nscInterest, "Please fill this field");
            invalidField = allowed_nscInterest;
        } else if (Number(nscInterest.value) > Number(allowed_nscInterest.value)) {
            if (nscInterest_remark.value == '--select--' || nscInterest_remark.value == 'No Remark') {
                showValidationError(nscInterest_remark, "Please select remarks");
                invalidField = nscInterest_remark;
            }
        }
    }

    if (saved_80c_nscSubscription) {
        if (!allowed_nscSubscription.value) {
            showValidationError(allowed_nscSubscription, "Please fill this field");
            invalidField = allowed_nscSubscription;
        } else if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value)) {
            if (nscSubscription_remark.value == '--select--' || nscSubscription_remark.value == 'No Remark') {
                showValidationError(nscSubscription_remark, "Please select remarks");
                invalidField = nscSubscription_remark;
            }
        }
    }

    if (saved_80c_ulipContribution) {
        if (!allowed_ulipContribution.value) {
            showValidationError(allowed_ulipContribution, "Please fill this field");
            invalidField = allowed_ulipContribution;
        } else if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value)) {
            if (ulipContribution_remark.value == '--select--' || ulipContribution_remark.value == 'No Remark') {
                showValidationError(ulipContribution_remark, "Please select remarks");
                invalidField = ulipContribution_remark;
            }
        }
    }

    if (saved_80c_timeDeposit) {
        if (!allowed_timeDeposit.value) {
            showValidationError(allowed_timeDeposit, "Please fill this field");
            invalidField = allowed_timeDeposit;
        } else if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value)) {
            if (timeDeposit_remark.value == '--select--' || timeDeposit_remark.value == 'No Remark') {
                showValidationError(timeDeposit_remark, "Please select remarks");
                invalidField = timeDeposit_remark;
            }
        }
    }

    if (saved_80c_payment) {
        if (!allowed_paymentLifeInsurance.value) {
            showValidationError(allowed_paymentLifeInsurance, "Please fill this field");
            invalidField = allowed_paymentLifeInsurance;
        } else if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value)) {
            if (paymentLifeInsurance_remark.value == '--select--' || paymentLifeInsurance_remark.value == 'No Remark') {
                showValidationError(paymentLifeInsurance_remark, "Please select remarks");
                invalidField = paymentLifeInsurance_remark;
            }
        }
    }

    // 80 Other

    if (saved_80ccd) {
        if (!allowed_nps_80ccd1b.value) {
            showValidationError(allowed_nps_80ccd1b, "Please fill this field");
            invalidField = allowed_nps_80ccd1b;
        } else if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value)) {
            if (nps_80ccd1b_remark.value == '--select--' || nps_80ccd1b_remark.value == 'No Remark') {
                showValidationError(nps_80ccd1b_remark, "Please select remarks");
                invalidField = nps_80ccd1b_remark;
            }
        }
    }

    if (saved_80eeb) {
        if (!allowed_vehicle_value.value) {
            showValidationError(allowed_vehicle_value, "Please fill this field");
            invalidField = allowed_vehicle_value;
        } else if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value)) {
            if (vehicle_value_remark.value == '--select--' || vehicle_value_remark.value == 'No Remark') {
                showValidationError(vehicle_value_remark, "Please select remarks");
                invalidField = vehicle_value_remark;
            }
        }
    }

    if (saved_self) {
        if (!allowed_self_dis.value) {
            showValidationError(allowed_self_dis, "Please fill this field");
            invalidField = allowed_self_dis;
        } else if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value)) {
            if (allowed_self_remark.value == '--select--' || allowed_self_remark.value == 'No Remark') {
                showValidationError(allowed_self_remark, "Please select remarks");
                invalidField = allowed_self_remark;
            }
        }
    }

    if (saved_dependent) {
        if (!allowed_Dependent_dis.value) {
            showValidationError(allowed_Dependent_dis, "Please fill this field");
            invalidField = allowed_Dependent_dis;
        } else if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value)) {
            if (allowed_Dependent_remark.value == '--select--' || allowed_Dependent_remark.value == 'No Remark') {
                showValidationError(allowed_Dependent_remark, "Please select remarks");
                invalidField = allowed_Dependent_remark;
            }
        }
    }

    if (saved_education) {
        if (!allowed_interest_education.value) {
            showValidationError(allowed_interest_education, "Please fill this field");
            invalidField = allowed_interest_education;
        } else if (Number(interest_education.value) > Number(allowed_interest_education.value)) {
            if (interest_education_remark.value == '--select--' || interest_education_remark.value == 'No Remark') {
                showValidationError(interest_education_remark, "Please select remarks");
                invalidField = interest_education_remark;
            }
        }
    }

    if (saved_illness) {
        if (!allowed_treatment_value.value) {
            showValidationError(allowed_treatment_value, "Please fill this field");
            invalidField = allowed_treatment_value;
        } else if (Number(treatment_value.value) > Number(allowed_treatment_value.value)) {
            if (treatment_value_remark.value == '--select--' || treatment_value_remark.value == 'No Remark') {
                showValidationError(treatment_value_remark, "Please select remarks");
                invalidField = treatment_value_remark;
            }
        }
    }

    if (saved_other80_preventive) {
        if (!allowed_health_checkup.value) {
            showValidationError(allowed_health_checkup, "Please fill this field");
            invalidField = allowed_health_checkup;
        } else if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value)) {
            if (health_checkup_remark.value == '--select--' || health_checkup_remark.value == 'No Remark') {
                showValidationError(health_checkup_remark, "Please select remarks");
                invalidField = health_checkup_remark;
            }
        }
    }

    if (saved_other80_senior) {
        if (!allowed_parents_mip_sn.value) {
            showValidationError(allowed_parents_mip_sn, "Please fill this field");
            invalidField = allowed_parents_mip_sn;
        } else if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value)) {
            if (parents_mip_sn_remark.value == '--select--' || parents_mip_sn_remark.value == 'No Remark') {
                showValidationError(parents_mip_sn_remark, "Please select remarks");
                invalidField = parents_mip_sn_remark;
            }
        }
    }

    if (saved_other80_parent) {
        if (!allowed_parents_mip_nsn.value) {
            showValidationError(allowed_parents_mip_nsn, "Please fill this field");
            invalidField = allowed_parents_mip_nsn;
        } else if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value)) {
            if (parents_mip_nsn_remark.value == '--select--' || parents_mip_nsn_remark.value == 'No Remark') {
                showValidationError(parents_mip_nsn_remark, "Please select remarks");
                invalidField = parents_mip_nsn_remark;
            }
        }
    }

    if (saved_other80_med) {
        if (!allowed_medical_insurance.value) {
            showValidationError(allowed_medical_insurance, "Please fill this field");
            invalidField = allowed_medical_insurance;
        } else if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value)) {
            if (medical_insurance_remark.value == '--select--' || medical_insurance_remark.value == 'No Remark') {
                showValidationError(medical_insurance_remark, "Please select remarks");
                invalidField = medical_insurance_remark;
            }
        }
    }

    // Income/Loss

    if (saved_Ilhp_80tta) {
        if (!allowed_interest_80tta.value) {
            showValidationError(allowed_interest_80tta, "Please fill this field");
            invalidField = allowed_interest_80tta;
        } else if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value)) {
            if (interest_80tta_remark.value == '--select--' || interest_80tta_remark.value == 'No Remark') {
                showValidationError(interest_80tta_remark, "Please select remarks");
                invalidField = interest_80tta_remark;
            }
        }
    }

    if (saved_Ilhp_otherincome) {
        if (!allowed_other_income_oi.value) {
            showValidationError(allowed_other_income_oi, "Please fill this field");
            invalidField = allowed_other_income_oi;
        } else if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value)) {
            if (other_income_oi_remark.value == '--select--' || other_income_oi_remark.value == 'No Remark') {
                showValidationError(other_income_oi_remark, "Please select remarks");
                invalidField = other_income_oi_remark;
            }
        }
    }

    if (saved_Ilhp_80EEA) {
        if (!allowed_property_value_other.value) {
            showValidationError(allowed_property_value_other, "Please fill this field");
            invalidField = allowed_property_value_other;
        } else if (Number(property_value_other.value) > Number(allowed_property_value_other.value)) {
            if (property_value_other_remark.value == '--select--' || property_value_other_remark.value == 'No Remark') {
                showValidationError(property_value_other_remark, "Please select remarks");
                invalidField = property_value_other_remark;
            }
        }
    }

    if (saved_Ilhp_80EE) {
        if (!allowed_home_loan.value) {
            showValidationError(allowed_home_loan, "Please fill this field");
            invalidField = allowed_home_loan;
        } else if (Number(home_loan.value) > Number(allowed_home_loan.value)) {
            if (home_loan_remark.value == '--select--' || home_loan_remark.value == 'No Remark') {
                showValidationError(home_loan_remark, "Please select remarks");
                invalidField = home_loan_remark;
            }
        }

        if (!allowed_property_value.value) {
            showValidationError(allowed_property_value, "Please fill this field");
            invalidField = allowed_property_value;
        } else if (Number(property_value.value) > Number(allowed_property_value.value)) {
            if (property_value_remark.value == '--select--' || property_value_remark.value == 'No Remark') {
                showValidationError(property_value_remark, "Please select remarks");
                invalidField = property_value_remark;
            }
        }

        if (!allowed_loan_amount.value) {
            showValidationError(allowed_loan_amount, "Please fill this field");
            invalidField = allowed_loan_amount;
        } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value)) {
            if (loan_amount_remark.value == '--select--' || loan_amount_remark.value == 'No Remark') {
                showValidationError(loan_amount_remark, "Please select remarks");
                invalidField = loan_amount_remark;
            }
        }
    }

    if (saved_Ilhp_letout) {
        if (!allowed_standardDeduction.value) {
            showValidationError(allowed_standardDeduction, "Please fill this field");
            invalidField = allowed_standardDeduction;
        } else if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value)) {
            if (allowed_standardDeduction_remark.value == '--select--' || allowed_standardDeduction_remark.value == 'No Remark') {
                showValidationError(allowed_standardDeduction_remark, "Please select remarks");
                invalidField = allowed_standardDeduction_remark;
            }
        }

        if (!allowed_incomeLossOnHouseProperty.value) {
            showValidationError(allowed_incomeLossOnHouseProperty, "Please fill this field");
            invalidField = allowed_incomeLossOnHouseProperty;
        } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value)) {
            if (allowed_incomeLossOnHouseProperty_remark.value == '--select--' || allowed_incomeLossOnHouseProperty_remark.value == 'No Remark') {
                showValidationError(allowed_incomeLossOnHouseProperty_remark, "Please select remarks");
                invalidField = allowed_incomeLossOnHouseProperty_remark;
            }
        }

        if (!allowed_homeLoanInterest.value) {
            showValidationError(allowed_homeLoanInterest, "Please fill this field");
            invalidField = allowed_homeLoanInterest;
        } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value)) {
            if (allowed_homeLoanInterest_remark.value == '--select--' || allowed_homeLoanInterest_remark.value == 'No Remark') {
                showValidationError(allowed_homeLoanInterest_remark, "Please select remarks");
                invalidField = allowed_homeLoanInterest_remark;
            }
        }

        if (!allowed_municipalPropertyTax.value) {
            showValidationError(allowed_municipalPropertyTax, "Please fill this field");
            invalidField = allowed_municipalPropertyTax;
        } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value)) {
            if (allowed_municipalPropertyTax_remark.value == '--select--' || allowed_municipalPropertyTax_remark.value == 'No Remark') {
                showValidationError(allowed_municipalPropertyTax_remark, "Please select remarks");
                invalidField = allowed_municipalPropertyTax_remark;
            }
        }

        if (!allowed_annualLettableValue.value) {
            showValidationError(allowed_annualLettableValue, "Please fill this field");
            invalidField = allowed_annualLettableValue;
        } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value)) {
            if (allowed_annualLettableValue_remark.value == '--select--' || allowed_annualLettableValue_remark.value == 'No Remark') {
                showValidationError(allowed_annualLettableValue_remark, "Please select remarks");
                invalidField = allowed_annualLettableValue_remark;
            }
        }
    }

    if (saved_Ilhp_self) {
        if (!allowed_self.value) {
            showValidationError(allowed_self, "Please fill this field");
            invalidField = allowed_self;
        } else if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value)) {
            if (self_remark.value == '--select--' || self_remark.value == 'No Remark') {
                showValidationError(self_remark, "Please select remarks");
                invalidField = self_remark;
            }
        }
    }

    // HRA

    if (itd5stdt_value) {
        if (Number(itd5.value) > Number(allow_rent_5.value)) {
            if (hra_remark_5.value == '--select--' || hra_remark_5.value == 'No Remark') {
                showValidationError(hra_remark_5, "Please select remarks");
                invalidField = hra_remark_5;
            }
        }
        if (a_city5.value == '--select--') {
            showValidationError(a_city5, "Please fill this field");
            invalidField = a_city5;
        }
        if (!allow_rent_5.value) {
            showValidationError(allow_rent_5, "Please fill this field");
            invalidField = allow_rent_5;
        }
        if (!ita5enddt.value) {
            showValidationError(ita5enddt, "Please fill this field");
            invalidField = ita5enddt;
        }
    }

    if (itd4stdt_value) {
        if (Number(itd4.value) > Number(allow_rent_4.value)) {
            if (hra_remark_4.value == '--select--' || hra_remark_4.value == 'No Remark') {
                showValidationError(hra_remark_4, "Please select remarks");
                invalidField = hra_remark_4;
            }
        }
        if (a_city4.value == '--select--') {
            showValidationError(a_city4, "Please fill this field");
            invalidField = a_city4;
        }
        if (!allow_rent_4.value) {
            showValidationError(allow_rent_4, "Please fill this field");
            invalidField = allow_rent_4;
        }
        if (!ita4enddt.value) {
            showValidationError(ita4enddt, "Please fill this field");
            invalidField = ita4enddt;
        }
    }

    if (itd3stdt_value) {
        if (Number(itd3.value) > Number(allow_rent_3.value)) {
            if (hra_remark_3.value == '--select--' || hra_remark_3.value == 'No Remark') {
                showValidationError(hra_remark_3, "Please select remarks");
                invalidField = hra_remark_3;
            }
        }
        if (a_city3.value == '--select--') {
            showValidationError(a_city3, "Please fill this field");
            invalidField = a_city3;
        }
        if (!allow_rent_3.value) {
            showValidationError(allow_rent_3, "Please fill this field");
            invalidField = allow_rent_3;
        }
        if (!ita3enddt.value) {
            showValidationError(ita3enddt, "Please fill this field");
            invalidField = ita3enddt;
        }
    }

    if (itd2stdt_value) {
        if (Number(itd2.value) > Number(allow_rent_2.value)) {
            if (hra_remark_2.value == '--select--' || hra_remark_2.value == 'No Remark') {
                showValidationError(hra_remark_2, "Please select remarks");
                invalidField = hra_remark_2;
            }
        }
        if (a_city2.value == '--select--') {
            showValidationError(a_city2, "Please fill this field");
            invalidField = a_city2;
        }
        if (!allow_rent_2.value) {
            showValidationError(allow_rent_2, "Please fill this field");
            invalidField = allow_rent_2;
        }
        if (!ita2enddt.value) {
            showValidationError(ita2enddt, "Please fill this field");
            invalidField = ita2enddt;
        }
    }

    if (itd1stdt_value) {
        if (Number(itd1.value) > Number(allow_rent_1.value)) {
            if (hra_remark_1.value == '--select--' || hra_remark_1.value == 'No Remark') {
                showValidationError(hra_remark_1, "Please select remarks");
                invalidField = hra_remark_1;
            }
        }
        if (a_city1.value == '--select--') {
            showValidationError(a_city1, "Please fill this field");
            invalidField = a_city1;
        }
        if (!allow_rent_1.value) {
            showValidationError(allow_rent_1, "Please fill this field");
            invalidField = allow_rent_1;
        }
        if (!ita1enddt.value) {
            showValidationError(ita1enddt, "Please fill this field");
            invalidField = ita1enddt;
        }
    }


    if (invalidField) {
        invalidField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return;
    }
    

    if (!ver_level_2.checked) {
        showValidationError(ver_level_2, "Please check this field to verify");
        invalidField = ver_level_2;
        invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return; // Stop submission if the checkbox is not checked
    }  

    }

}















function Submitdata_fun_1() {
    if (Submitdata_2.disabled == false) {
        
        basic_form_formdata = new FormData(document.getElementById("basic_form"));

        custom_re_formdata = new FormData(document.getElementById("custom_re"));
        for (let [key, value] of custom_re_formdata.entries()) {
            basic_form_formdata.append(key, value);
        }

        if (saved_hra_new) {
            hra_form_formdata = new FormData(document.getElementById("hra_form"));
            for (let [key, value] of hra_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }
        if (saved_Ilhp_new) {
            ilh_form_formdata = new FormData(document.getElementById("ilh_form"));
            for (let [key, value] of ilh_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_other80_new) {
            other80_form_formdata = new FormData(document.getElementById("other80_form"));
            for (let [key, value] of other80_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_80c_new) {
            _80C_form_formdata = new FormData(document.getElementById("_80C_form"));
            for (let [key, value] of _80C_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_previous_emp) {
            previousemp_form_formdata = new FormData(document.getElementById("previousemp_form"));
            for (let [key, value] of previousemp_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }



        let combinedFormData = new FormData();

        for (let [key, value] of basic_form_formdata.entries()) {
            combinedFormData.append(key, value);
        }

        let apiUrl = "submit_checker_2";


        let hiddenForm = document.createElement('form');
        hiddenForm.style.display = 'none';
        hiddenForm.action = apiUrl;
        hiddenForm.method = 'POST';


        for (let [key, value] of combinedFormData.entries()) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
    } else {                
        
        let invalidField = null;

    
    
    if (!custom_remark.value) {
        showValidationError(custom_remark, "Please fill this field");
        invalidField = custom_remark;
    }

    if (saved_previous_emp) {
        if (!allowed_income_tax_2.value) {
            showValidationError(allowed_income_tax_2, "Please fill this field");
            invalidField = allowed_income_tax_2;
        } else if (Number(income_tax.value) != Number(allowed_income_tax_2.value)) {
            if (income_tax_remark_2.value == '--select--') {
                showValidationError(income_tax_remark_2, "Please select remarks");
                invalidField = income_tax_remark_2;
            }
        }

        if (!allowed_provident_fund_2.value) {
            showValidationError(allowed_provident_fund_2, "Please fill this field");
            invalidField = allowed_provident_fund_2;
        } else if (Number(provident_fund.value) != Number(allowed_provident_fund_2.value)) {
            if (provident_fund_remark_2.value == '--select--') {
                showValidationError(provident_fund_remark_2, "Please select remarks");
                invalidField = provident_fund_remark_2;
            }
        }

        if (!allowed_professional_tax_2.value) {
            showValidationError(allowed_professional_tax_2, "Please fill this field");
            invalidField = allowed_professional_tax_2;
        } else if (Number(professional_tax.value) != Number(allowed_professional_tax_2.value)) {
            if (professional_tax_remark_2.value == '--select--') {
                showValidationError(professional_tax_remark_2, "Please select remarks");
                invalidField = professional_tax_remark_2;
            }
        }

        if (!allowed_salary_previousemp_2.value) {
            showValidationError(allowed_salary_previousemp_2, "Please fill this field");
            invalidField = allowed_salary_previousemp_2;
        } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp_2.value)) {
            if (salary_previousemp_remark_2.value == '--select--') {
                showValidationError(salary_previousemp_remark_2, "Please select remarks");
                invalidField = salary_previousemp_remark_2;
            }
        }
    }

    // 80C
    if (saved_80c_sukanyaSamriddhi) {
        if (!allowed_sukanyaSamriddhi_2.value) {
            showValidationError(allowed_sukanyaSamriddhi_2, "Please fill this field");
            invalidField = allowed_sukanyaSamriddhi_2;
        } else if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value) + Number(allowed_sukanyaSamriddhi_2.value)) {
            if (sukanyaSamriddhi_remark_2.value == '--select--') {
                showValidationError(sukanyaSamriddhi_remark_2, "Please select remarks");
                invalidField = sukanyaSamriddhi_remark_2;
            }
        }
    }

    if (saved_80c_pensionContribution) {
        if (!allowed_pensionContribution_2.value) {
            showValidationError(allowed_pensionContribution_2, "Please fill this field");
            invalidField = allowed_pensionContribution_2;
        } else if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value) + Number(allowed_pensionContribution_2.value)) {
            if (pensionContribution_remark_2.value == '--select--') {
                showValidationError(pensionContribution_remark_2, "Please select remarks");
                invalidField = pensionContribution_remark_2;
            }
        }
    }

    if (saved_80c_termDeposits) {
        if (!allowed_termDeposits_2.value) {
            showValidationError(allowed_termDeposits_2, "Please fill this field");
            invalidField = allowed_termDeposits_2;
        } else if (Number(termDeposits.value) > Number(allowed_termDeposits.value) + Number(allowed_termDeposits_2.value)) {
            if (termDeposits_remark_2.value == '--select--') {
                showValidationError(termDeposits_remark_2, "Please select remarks");
                invalidField = termDeposits_remark_2;
            }
        }
    }

    if (saved_80c_mutualFundSubscription) {
        if (!allowed_mutualFundSubscription_2.value) {
            showValidationError(allowed_mutualFundSubscription_2, "Please fill this field");
            invalidField = allowed_mutualFundSubscription_2;
        } else if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value) + Number(allowed_mutualFundSubscription_2.value)) {
            if (mutualFundSubscription_remark_2.value == '--select--') {
                showValidationError(mutualFundSubscription_remark_2, "Please select remarks");
                invalidField = mutualFundSubscription_remark_2;
            }
        }
    }

    if (saved_80c_tuitionFee) {
        if (!allowed_tuitionFee_2.value) {
            showValidationError(allowed_tuitionFee_2, "Please fill this field");
            invalidField = allowed_tuitionFee_2;
        } else if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value) + Number(allowed_tuitionFee_2.value)) {
            if (tuitionFee_remark_2.value == '--select--') {
                showValidationError(tuitionFee_remark_2, "Please select remarks");
                invalidField = tuitionFee_remark_2;
            }
        }
    }

    if (saved_80c_houseLoan) {
        if (!allowed_houseLoan_2.value) {
            showValidationError(allowed_houseLoan_2, "Please fill this field");
            invalidField = allowed_houseLoan_2;
        } else if (Number(houseLoan.value) > Number(allowed_houseLoan.value) + Number(allowed_houseLoan_2.value)) {
            if (houseLoan_remark_2.value == '--select--') {
                showValidationError(houseLoan_remark_2, "Please select remarks");
                invalidField = houseLoan_remark_2;
            }
        }
    }

    if (saved_80c_ppfContribution) {
        if (!allowed_ppfContribution_2.value) {
            showValidationError(allowed_ppfContribution_2, "Please fill this field");
            invalidField = allowed_ppfContribution_2;
        } else if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value) + Number(allowed_ppfContribution_2.value)) {
            if (ppfContribution_remark_2.value == '--select--') {
                showValidationError(ppfContribution_remark_2, "Please select remarks");
                invalidField = ppfContribution_remark_2;
            }
        }
    }

    if (saved_80c_nscInterest) {
        if (!allowed_nscInterest_2.value) {
            showValidationError(allowed_nscInterest_2, "Please fill this field");
            invalidField = allowed_nscInterest_2;
        } else if (Number(nscInterest.value) > Number(allowed_nscInterest.value) + Number(allowed_nscInterest_2.value)) {
            if (nscInterest_remark_2.value == '--select--') {
                showValidationError(nscInterest_remark_2, "Please select remarks");
                invalidField = nscInterest_remark_2;
            }
        }
    }

    if (saved_80c_nscSubscription) {
        if (!allowed_nscSubscription_2.value) {
            showValidationError(allowed_nscSubscription_2, "Please fill this field");
            invalidField = allowed_nscSubscription_2;
        } else if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value) + Number(allowed_nscSubscription_2.value)) {
            if (nscSubscription_remark_2.value == '--select--') {
                showValidationError(nscSubscription_remark_2, "Please select remarks");
                invalidField = nscSubscription_remark_2;
            }
        }
    }

    if (saved_80c_ulipContribution) {
        if (!allowed_ulipContribution_2.value) {
            showValidationError(allowed_ulipContribution_2, "Please fill this field");
            invalidField = allowed_ulipContribution_2;
        } else if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value) + Number(allowed_ulipContribution_2.value)) {
            if (ulipContribution_remark_2.value == '--select--') {
                showValidationError(ulipContribution_remark_2, "Please select remarks");
                invalidField = ulipContribution_remark_2;
            }
        }
    }

    if (saved_80c_timeDeposit) {
        if (!allowed_timeDeposit_2.value) {
            showValidationError(allowed_timeDeposit_2, "Please fill this field");
            invalidField = allowed_timeDeposit_2;
        } else if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value) + Number(allowed_timeDeposit_2.value)) {
            if (timeDeposit_remark_2.value == '--select--') {
                showValidationError(timeDeposit_remark_2, "Please select remarks");
                invalidField = timeDeposit_remark_2;
            }
        }
    }

    if (saved_80c_payment) {
        if (!allowed_paymentLifeInsurance_2.value) {
            showValidationError(allowed_paymentLifeInsurance_2, "Please fill this field");
            invalidField = allowed_paymentLifeInsurance_2;
        } else if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance_2.value)) {
            if (paymentLifeInsurance_remark_2.value == '--select--') {
                showValidationError(paymentLifeInsurance_remark_2, "Please select remarks");
                invalidField = paymentLifeInsurance_remark_2;
            }
        }
    }

    // 80 Other

    if (saved_80ccd) {
        if (!allowed_nps_80ccd1b_2.value) {
            showValidationError(allowed_nps_80ccd1b_2, "Please fill this field");
            invalidField = allowed_nps_80ccd1b_2;
        } else if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value) + Number(allowed_nps_80ccd1b_2.value)) {
            if (nps_80ccd1b_remark_2.value == '--select--') {
                showValidationError(nps_80ccd1b_remark_2, "Please select remarks");
                invalidField = nps_80ccd1b_remark_2;
            }
        }
    }

    if (saved_80eeb) {
        if (!allowed_vehicle_value_2.value) {
            showValidationError(allowed_vehicle_value_2, "Please fill this field");
            invalidField = allowed_vehicle_value_2;
        } else if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value) + Number(allowed_vehicle_value_2.value)) {
            if (vehicle_value_remark_2.value == '--select--') {
                showValidationError(vehicle_value_remark_2, "Please select remarks");
                invalidField = vehicle_value_remark_2;
            }
        }
    }

    if (saved_self) {
        if (!allowed_self_dis_2.value) {
            showValidationError(allowed_self_dis_2, "Please fill this field");
            invalidField = allowed_self_dis_2;
        } else if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value) + Number(allowed_self_dis_2.value)) {
            if (allowed_self_remark_2.value == '--select--') {
                showValidationError(allowed_self_remark_2, "Please select remarks");
                invalidField = allowed_self_remark_2;
            }
        }
    }

    if (saved_dependent) {
        if (!allowed_Dependent_dis_2.value) {
            showValidationError(allowed_Dependent_dis_2, "Please fill this field");
            invalidField = allowed_Dependent_dis_2;
        } else if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value) + Number(allowed_Dependent_dis_2.value)) {
            if (allowed_Dependent_remark_2.value == '--select--') {
                showValidationError(allowed_Dependent_remark_2, "Please select remarks");
                invalidField = allowed_Dependent_remark_2;
            }
        }
    }

    if (saved_education) {
        if (!allowed_interest_education_2.value) {
            showValidationError(allowed_interest_education_2, "Please fill this field");
            invalidField = allowed_interest_education_2;
        } else if (Number(interest_education.value) > Number(allowed_interest_education.value) + Number(allowed_interest_education_2.value)) {
            if (interest_education_remark_2.value == '--select--') {
                showValidationError(interest_education_remark_2, "Please select remarks");
                invalidField = interest_education_remark_2;
            }
        }
    }

    if (saved_illness) {
        if (!allowed_treatment_value_2.value) {
            showValidationError(allowed_treatment_value_2, "Please fill this field");
            invalidField = allowed_treatment_value_2;
        } else if (Number(treatment_value.value) > Number(allowed_treatment_value.value) + Number(allowed_treatment_value_2.value)) {
            if (treatment_value_remark_2.value == '--select--') {
                showValidationError(treatment_value_remark_2, "Please select remarks");
                invalidField = treatment_value_remark_2;
            }
        }
    }

    if (saved_other80_preventive) {
        if (!allowed_health_checkup_2.value) {
            showValidationError(allowed_health_checkup_2, "Please fill this field");
            invalidField = allowed_health_checkup_2;
        } else if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value) + Number(allowed_health_checkup_2.value)) {
            if (health_checkup_remark_2.value == '--select--') {
                showValidationError(health_checkup_remark_2, "Please select remarks");
                invalidField = health_checkup_remark_2;
            }
        }
    }

    if (saved_other80_senior) {
        if (!allowed_parents_mip_sn_2.value) {
            showValidationError(allowed_parents_mip_sn_2, "Please fill this field");
            invalidField = allowed_parents_mip_sn_2;
        } else if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value) + Number(allowed_parents_mip_sn_2.value)) {
            if (parents_mip_sn_remark_2.value == '--select--') {
                showValidationError(parents_mip_sn_remark_2, "Please select remarks");
                invalidField = parents_mip_sn_remark_2;
            }
        }
    }

    if (saved_other80_parent) {
        if (!allowed_parents_mip_nsn_2.value) {
            showValidationError(allowed_parents_mip_nsn_2, "Please fill this field");
            invalidField = allowed_parents_mip_nsn_2;
        } else if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value) + Number(allowed_parents_mip_nsn_2.value)) {
            if (parents_mip_nsn_remark_2.value == '--select--') {
                showValidationError(parents_mip_nsn_remark_2, "Please select remarks");
                invalidField = parents_mip_nsn_remark_2;
            }
        }
    }

    if (saved_other80_med) {
        if (!allowed_medical_insurance_2.value) {
            showValidationError(allowed_medical_insurance_2, "Please fill this field");
            invalidField = allowed_medical_insurance_2;
        } else if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value) + Number(allowed_medical_insurance_2.value)) {
            if (medical_insurance_remark_2.value == '--select--') {
                showValidationError(medical_insurance_remark_2, "Please select remarks");
                invalidField = medical_insurance_remark_2;
            }
        }
    }

    // Income/Loss

    if (saved_Ilhp_80tta) {
        if (!allowed_interest_80tta_2.value) {
            showValidationError(allowed_interest_80tta_2, "Please fill this field");
            invalidField = allowed_interest_80tta_2;
        } else if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value) + Number(allowed_interest_80tta_2.value)) {
            if (interest_80tta_remark_2.value == '--select--') {
                showValidationError(interest_80tta_remark_2, "Please select remarks");
                invalidField = interest_80tta_remark_2;
            }
        }
    }

    if (saved_Ilhp_otherincome) {
        if (!allowed_other_income_oi_2.value) {
            showValidationError(allowed_other_income_oi_2, "Please fill this field");
            invalidField = allowed_other_income_oi_2;
        } else if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value) + Number(allowed_other_income_oi_2.value)) {
            if (other_income_oi_remark_2.value == '--select--') {
                showValidationError(other_income_oi_remark_2, "Please select remarks");
                invalidField = other_income_oi_remark_2;
            }
        }
    }

    if (saved_Ilhp_80EEA) {
        if (!allowed_property_value_other_2.value) {
            showValidationError(allowed_property_value_other_2, "Please fill this field");
            invalidField = allowed_property_value_other_2;
        } else if (Number(property_value_other.value) > Number(allowed_property_value_other.value) + Number(allowed_property_value_other_2.value)) {
            if (property_value_other_remark_2.value == '--select--') {
                showValidationError(property_value_other_remark_2, "Please select remarks");
                invalidField = property_value_other_remark_2;
            }
        }
    }

    if (saved_Ilhp_80EE) {
        if (!allowed_home_loan_2.value) {
            showValidationError(allowed_home_loan_2, "Please fill this field");
            invalidField = allowed_home_loan_2;
        } else if (Number(home_loan.value) > Number(allowed_home_loan.value) + Number(allowed_home_loan_2.value)) {
            if (home_loan_remark_2.value == '--select--') {
                showValidationError(home_loan_remark_2, "Please select remarks");
                invalidField = home_loan_remark_2;
            }
        }

        if (!allowed_property_value_2.value) {
            showValidationError(allowed_property_value_2, "Please fill this field");
            invalidField = allowed_property_value_2;
        } else if (Number(property_value.value) > Number(allowed_property_value.value) + Number(allowed_property_value_2.value)) {
            if (property_value_remark_2.value == '--select--') {
                showValidationError(property_value_remark_2, "Please select remarks");
                invalidField = property_value_remark_2;
            }
        }

        if (!allowed_loan_amount_2.value) {
            showValidationError(allowed_loan_amount_2, "Please fill this field");
            invalidField = allowed_loan_amount_2;
        } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value) + Number(allowed_loan_amount_2.value)) {
            if (loan_amount_remark_2.value == '--select--') {
                showValidationError(loan_amount_remark_2, "Please select remarks");
                invalidField = loan_amount_remark_2;
            }
        }
    }

    if (saved_Ilhp_letout) {
        if (!allowed_standardDeduction_2.value) {
            showValidationError(allowed_standardDeduction_2, "Please fill this field");
            invalidField = allowed_standardDeduction_2;
        } else if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value) + Number(allowed_standardDeduction_2.value)) {
            if (allowed_standardDeduction_remark_2.value == '--select--') {
                showValidationError(allowed_standardDeduction_remark_2, "Please select remarks");
                invalidField = allowed_standardDeduction_remark_2;
            }
        }

        if (!allowed_incomeLossOnHouseProperty_2.value) {
            showValidationError(allowed_incomeLossOnHouseProperty_2, "Please fill this field");
            invalidField = allowed_incomeLossOnHouseProperty_2;
        } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value) + Number(allowed_incomeLossOnHouseProperty_2.value)) {
            if (allowed_incomeLossOnHouseProperty_remark_2.value == '--select--') {
                showValidationError(allowed_incomeLossOnHouseProperty_remark_2, "Please select remarks");
                invalidField = allowed_incomeLossOnHouseProperty_remark_2;
            }
        }

        if (!allowed_homeLoanInterest_2.value) {
            showValidationError(allowed_homeLoanInterest_2, "Please fill this field");
            invalidField = allowed_homeLoanInterest_2;
        } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value) + Number(allowed_homeLoanInterest_2.value)) {
            if (allowed_homeLoanInterest_remark_2.value == '--select--') {
                showValidationError(allowed_homeLoanInterest_remark_2, "Please select remarks");
                invalidField = allowed_homeLoanInterest_remark_2;
            }
        }

        if (!allowed_municipalPropertyTax_2.value) {
            showValidationError(allowed_municipalPropertyTax_2, "Please fill this field");
            invalidField = allowed_municipalPropertyTax_2;
        } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value) + Number(allowed_municipalPropertyTax_2.value)) {
            if (allowed_municipalPropertyTax_remark_2.value == '--select--') {
                showValidationError(allowed_municipalPropertyTax_remark_2, "Please select remarks");
                invalidField = allowed_municipalPropertyTax_remark_2;
            }
        }

        if (!allowed_annualLettableValue_2.value) {
            showValidationError(allowed_annualLettableValue_2, "Please fill this field");
            invalidField = allowed_annualLettableValue_2;
        } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value) + Number(allowed_annualLettableValue_2.value)) {
            if (allowed_annualLettableValue_remark_2.value == '--select--') {
                showValidationError(allowed_annualLettableValue_remark_2, "Please select remarks");
                invalidField = allowed_annualLettableValue_remark_2;
            }
        }
    }

    if (saved_Ilhp_self) {
        if (!allowed_self_2.value) {
            showValidationError(allowed_self_2, "Please fill this field");
            invalidField = allowed_self_2;
        } else if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value) + Number(allowed_self_2.value)) {
            if (self_remark_2.value == '--select--') {
                showValidationError(self_remark_2, "Please select remarks");
                invalidField = self_remark_2;
            }
        }
    }

    // HRA

    if (itd5stdt_value) {
        if (Number(itd5.value) > Number(allow_rent_5.value) + Number(allow_rent_5_2.value)) {
            if (hra_remark_5_2.value == '--select--') {
                showValidationError(hra_remark_5_2, "Please select remarks");
                invalidField = hra_remark_5_2;
            }
        }
        if (!allow_rent_5_2.value) {
            showValidationError(allow_rent_5_2, "Please fill this field");
            invalidField = allow_rent_5_2;
        }
        if (!ita5enddt.value) {
            showValidationError(ita5enddt, "Please fill this field");
            invalidField = ita5enddt;
        }
    }

    if (itd4stdt_value) {
        if (Number(itd4.value) > Number(hra_remark_4.value) + Number(hra_remark_4_2.value)) {
            if (hra_remark_4_2.value == '--select--') {
                showValidationError(hra_remark_4_2, "Please select remarks");
                invalidField = hra_remark_4_2;
            }
        }
        if (!hra_remark_4_2.value) {
            showValidationError(hra_remark_4_2, "Please fill this field");
            invalidField = hra_remark_4_2;
        }
        if (!ita4enddt.value) {
            showValidationError(ita4enddt, "Please fill this field");
            invalidField = ita4enddt;
        }
    }

    if (itd3stdt_value) {
        if (Number(itd3.value) > Number(allow_rent_3.value) + Number(allow_rent_3_2.value)) {
            if (hra_remark_3_2.value == '--select--') {
                showValidationError(hra_remark_3_2, "Please select remarks");
                invalidField = hra_remark_3_2;
            }
        }
        if (!allow_rent_3_2.value) {
            showValidationError(allow_rent_3_2, "Please fill this field");
            invalidField = allow_rent_3_2;
        }
        if (!ita3enddt.value) {
            showValidationError(ita3enddt, "Please fill this field");
            invalidField = ita3enddt;
        }
    }

    if (itd2stdt_value) {
        if (Number(itd2.value) > Number(allow_rent_2.value) + Number(allow_rent_2_2.value)) {
            if (hra_remark_2_2.value == '--select--') {
                showValidationError(hra_remark_2_2, "Please select remarks");
                invalidField = hra_remark_2_2;
            }
        }
        if (!allow_rent_2_2.value) {
            showValidationError(allow_rent_2_2, "Please fill this field");
            invalidField = allow_rent_2_2;
        }
        if (!ita2enddt.value) {
            showValidationError(ita2enddt, "Please fill this field");
            invalidField = ita2enddt;
        }
    }

    if (itd1stdt_value) {
        if (Number(itd1.value) > Number(allow_rent_1.value) + Number(allow_rent_1_2.value)) {
            if (hra_remark_1_2.value == '--select--') {
                showValidationError(hra_remark_1_2, "Please select remarks");
                invalidField = hra_remark_1_2;
            }
        }
        if (!allow_rent_1_2.value) {
            showValidationError(allow_rent_1_2, "Please fill this field");
            invalidField = allow_rent_1_2;
        }
        if (!ita1enddt.value) {
            showValidationError(ita1enddt, "Please fill this field");
            invalidField = ita1enddt;
        }
    }


    if (invalidField) {
        invalidField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return;
    }
    

    if (!ver_level_2.checked) {
        showValidationError(ver_level_2, "Please check this field to verify");
        invalidField = ver_level_2;
        invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return; // Stop submission if the checkbox is not checked
    }  

    }
}


function Submitdata_fun_2() {
    if (Submitdata_3.disabled == false) {
        
        basic_form_formdata = new FormData(document.getElementById("basic_form"));

        custom_re_formdata = new FormData(document.getElementById("custom_re"));
        for (let [key, value] of custom_re_formdata.entries()) {
            basic_form_formdata.append(key, value);
        }

        if (saved_hra_new) {
            hra_form_formdata = new FormData(document.getElementById("hra_form"));
            for (let [key, value] of hra_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }
        if (saved_Ilhp_new) {
            ilh_form_formdata = new FormData(document.getElementById("ilh_form"));
            for (let [key, value] of ilh_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_other80_new) {
            other80_form_formdata = new FormData(document.getElementById("other80_form"));
            for (let [key, value] of other80_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_80c_new) {
            _80C_form_formdata = new FormData(document.getElementById("_80C_form"));
            for (let [key, value] of _80C_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }

        if (saved_previous_emp) {
            previousemp_form_formdata = new FormData(document.getElementById("previousemp_form"));
            for (let [key, value] of previousemp_form_formdata.entries()) {
                basic_form_formdata.append(key, value);
            }
        }



        let combinedFormData = new FormData();

        for (let [key, value] of basic_form_formdata.entries()) {
            combinedFormData.append(key, value);
        }

        let apiUrl = "submit_checker_3";


        let hiddenForm = document.createElement('form');
        hiddenForm.style.display = 'none';
        hiddenForm.action = apiUrl;
        hiddenForm.method = 'POST';


        for (let [key, value] of combinedFormData.entries()) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
    } else {                
        
        let invalidField = null;

    
    
    if (!custom_remark.value) {
        showValidationError(custom_remark, "Please fill this field");
        invalidField = custom_remark;
    }

    if (saved_previous_emp) {
        if (!allowed_income_tax_3.value) {
            showValidationError(allowed_income_tax_3, "Please fill this field");
            invalidField = allowed_income_tax_3;
        } else if (Number(income_tax.value) != Number(allowed_income_tax_3.value)) {
            if (income_tax_remark_3.value == '--select--') {
                showValidationError(income_tax_remark_3, "Please select remarks");
                invalidField = income_tax_remark_3;
            }
        }

        if (!allowed_provident_fund_3.value) {
            showValidationError(allowed_provident_fund_3, "Please fill this field");
            invalidField = allowed_provident_fund_3;
        } else if (Number(provident_fund.value) != Number(allowed_provident_fund_3.value)) {
            if (provident_fund_remark_3.value == '--select--') {
                showValidationError(provident_fund_remark_3, "Please select remarks");
                invalidField = provident_fund_remark_3;
            }
        }

        if (!allowed_professional_tax_3.value) {
            showValidationError(allowed_professional_tax_3, "Please fill this field");
            invalidField = allowed_professional_tax_3;
        } else if (Number(professional_tax.value) != Number(allowed_professional_tax_3.value)) {
            if (professional_tax_remark_3.value == '--select--') {
                showValidationError(professional_tax_remark_3, "Please select remarks");
                invalidField = professional_tax_remark_3;
            }
        }

        if (!allowed_salary_previousemp_3.value) {
            showValidationError(allowed_salary_previousemp_3, "Please fill this field");
            invalidField = allowed_salary_previousemp_3;
        } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp_3.value)) {
            if (salary_previousemp_remark_3.value == '--select--') {
                showValidationError(salary_previousemp_remark_3, "Please select remarks");
                invalidField = salary_previousemp_remark_3;
            }
        }
    }

    // 80C
    if (saved_80c_sukanyaSamriddhi) {
        if (!allowed_sukanyaSamriddhi_3.value) {
            showValidationError(allowed_sukanyaSamriddhi_3, "Please fill this field");
            invalidField = allowed_sukanyaSamriddhi_3;
        } else if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value) + Number(allowed_sukanyaSamriddhi_2.value) + Number(allowed_sukanyaSamriddhi_3.value)) {
            if (sukanyaSamriddhi_remark_3.value == '--select--') {
                showValidationError(sukanyaSamriddhi_remark_3, "Please select remarks");
                invalidField = sukanyaSamriddhi_remark_3;
            }
        }
    }

    if (saved_80c_pensionContribution) {
        if (!allowed_pensionContribution_3.value) {
            showValidationError(allowed_pensionContribution_3, "Please fill this field");
            invalidField = allowed_pensionContribution_3;
        } else if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value) + Number(allowed_pensionContribution_2.value) + Number(allowed_pensionContribution_3.value)) {
            if (pensionContribution_remark_3.value == '--select--') {
                showValidationError(pensionContribution_remark_3, "Please select remarks");
                invalidField = pensionContribution_remark_3;
            }
        }
    }

    if (saved_80c_termDeposits) {
        if (!allowed_termDeposits_3.value) {
            showValidationError(allowed_termDeposits_3, "Please fill this field");
            invalidField = allowed_termDeposits_3;
        } else if (Number(termDeposits.value) > Number(allowed_termDeposits.value) + Number(allowed_termDeposits_2.value) + Number(allowed_termDeposits_3.value)) {
            if (termDeposits_remark_3.value == '--select--') {
                showValidationError(termDeposits_remark_3, "Please select remarks");
                invalidField = termDeposits_remark_3;
            }
        }
    }

    if (saved_80c_mutualFundSubscription) {
        if (!allowed_mutualFundSubscription_3.value) {
            showValidationError(allowed_mutualFundSubscription_3, "Please fill this field");
            invalidField = allowed_mutualFundSubscription_3;
        } else if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value) + Number(allowed_mutualFundSubscription_2.value) + Number(allowed_mutualFundSubscription_3.value)) {
            if (mutualFundSubscription_remark_3.value == '--select--') {
                showValidationError(mutualFundSubscription_remark_3, "Please select remarks");
                invalidField = mutualFundSubscription_remark_3;
            }
        }
    }

    if (saved_80c_tuitionFee) {
        if (!allowed_tuitionFee_3.value) {
            showValidationError(allowed_tuitionFee_3, "Please fill this field");
            invalidField = allowed_tuitionFee_3;
        } else if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value) + Number(allowed_tuitionFee_2.value) + Number(allowed_tuitionFee_3.value)) {
            if (tuitionFee_remark_3.value == '--select--') {
                showValidationError(tuitionFee_remark_3, "Please select remarks");
                invalidField = tuitionFee_remark_3;
            }
        }
    }

    if (saved_80c_houseLoan) {
        if (!allowed_houseLoan_3.value) {
            showValidationError(allowed_houseLoan_3, "Please fill this field");
            invalidField = allowed_houseLoan_3;
        } else if (Number(houseLoan.value) > Number(allowed_houseLoan.value) + Number(allowed_houseLoan_2.value) + Number(allowed_houseLoan_3.value)) {
            if (houseLoan_remark_3.value == '--select--') {
                showValidationError(houseLoan_remark_3, "Please select remarks");
                invalidField = houseLoan_remark_3;
            }
        }
    }

    if (saved_80c_ppfContribution) {
        if (!allowed_ppfContribution_3.value) {
            showValidationError(allowed_ppfContribution_3, "Please fill this field");
            invalidField = allowed_ppfContribution_3;
        } else if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value) + Number(allowed_ppfContribution_2.value) + Number(allowed_ppfContribution_3.value)) {
            if (ppfContribution_remark_3.value == '--select--') {
                showValidationError(ppfContribution_remark_3, "Please select remarks");
                invalidField = ppfContribution_remark_3;
            }
        }
    }

    if (saved_80c_nscInterest) {
        if (!allowed_nscInterest_3.value) {
            showValidationError(allowed_nscInterest_3, "Please fill this field");
            invalidField = allowed_nscInterest_3;
        } else if (Number(nscInterest.value) > Number(allowed_nscInterest.value) + Number(allowed_nscInterest_2.value) + Number(allowed_nscInterest_3.value)) {
            if (nscInterest_remark_3.value == '--select--') {
                showValidationError(nscInterest_remark_3, "Please select remarks");
                invalidField = nscInterest_remark_3;
            }
        }
    }

    if (saved_80c_nscSubscription) {
        if (!allowed_nscSubscription_3.value) {
            showValidationError(allowed_nscSubscription_3, "Please fill this field");
            invalidField = allowed_nscSubscription_3;
        } else if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value) + Number(allowed_nscSubscription_2.value) + Number(allowed_nscSubscription_3.value)) {
            if (nscSubscription_remark_3.value == '--select--') {
                showValidationError(nscSubscription_remark_3, "Please select remarks");
                invalidField = nscSubscription_remark_3;
            }
        }
    }

    if (saved_80c_ulipContribution) {
        if (!allowed_ulipContribution_3.value) {
            showValidationError(allowed_ulipContribution_3, "Please fill this field");
            invalidField = allowed_ulipContribution_3;
        } else if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value) + Number(allowed_ulipContribution_2.value) + Number(allowed_ulipContribution_3.value)) {
            if (ulipContribution_remark_3.value == '--select--') {
                showValidationError(ulipContribution_remark_3, "Please select remarks");
                invalidField = ulipContribution_remark_3;
            }
        }
    }

    if (saved_80c_timeDeposit) {
        if (!allowed_timeDeposit_3.value) {
            showValidationError(allowed_timeDeposit_3, "Please fill this field");
            invalidField = allowed_timeDeposit_3;
        } else if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value) + Number(allowed_timeDeposit_2.value) + Number(allowed_timeDeposit_3.value)) {
            if (timeDeposit_remark_3.value == '--select--') {
                showValidationError(timeDeposit_remark_3, "Please select remarks");
                invalidField = timeDeposit_remark_3;
            }
        }
    }

    if (saved_80c_payment) {
        if (!allowed_paymentLifeInsurance_3.value) {
            showValidationError(allowed_paymentLifeInsurance_3, "Please fill this field");
            invalidField = allowed_paymentLifeInsurance_3;
        } else if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value) + Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance_3.value)) {
            if (paymentLifeInsurance_remark_3.value == '--select--') {
                showValidationError(paymentLifeInsurance_remark_3, "Please select remarks");
                invalidField = paymentLifeInsurance_remark_3;
            }
        }
    }

    // 80 Other

    if (saved_80ccd) {
        if (!allowed_nps_80ccd1b_3.value) {
            showValidationError(allowed_nps_80ccd1b_3, "Please fill this field");
            invalidField = allowed_nps_80ccd1b_3;
        } else if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value) + Number(allowed_nps_80ccd1b_2.value) + Number(allowed_nps_80ccd1b_3.value)) {
            if (nps_80ccd1b_remark_3.value == '--select--') {
                showValidationError(nps_80ccd1b_remark_3, "Please select remarks");
                invalidField = nps_80ccd1b_remark_3;
            }
        }
    }

    if (saved_80eeb) {
        if (!allowed_vehicle_value_3.value) {
            showValidationError(allowed_vehicle_value_3, "Please fill this field");
            invalidField = allowed_vehicle_value_3;
        } else if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value) + Number(allowed_vehicle_value_2.value) + Number(allowed_vehicle_value_3.value)) {
            if (vehicle_value_remark_3.value == '--select--') {
                showValidationError(vehicle_value_remark_3, "Please select remarks");
                invalidField = vehicle_value_remark_3;
            }
        }
    }

    if (saved_self) {
        if (!allowed_self_dis_3.value) {
            showValidationError(allowed_self_dis_3, "Please fill this field");
            invalidField = allowed_self_dis_3;
        } else if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value) + Number(allowed_self_dis_2.value) + Number(allowed_self_dis_3.value)) {
            if (allowed_self_remark_3.value == '--select--') {
                showValidationError(allowed_self_remark_3, "Please select remarks");
                invalidField = allowed_self_remark_3;
            }
        }
    }

    if (saved_dependent) {
        if (!allowed_Dependent_dis_3.value) {
            showValidationError(allowed_Dependent_dis_3, "Please fill this field");
            invalidField = allowed_Dependent_dis_3;
        } else if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value) + Number(allowed_Dependent_dis_2.value) + Number(allowed_Dependent_dis_3.value)) {
            if (allowed_Dependent_remark_3.value == '--select--') {
                showValidationError(allowed_Dependent_remark_3, "Please select remarks");
                invalidField = allowed_Dependent_remark_3;
            }
        }
    }

    if (saved_education) {
        if (!allowed_interest_education_3.value) {
            showValidationError(allowed_interest_education_3, "Please fill this field");
            invalidField = allowed_interest_education_3;
        } else if (Number(interest_education.value) > Number(allowed_interest_education.value) + Number(allowed_interest_education_2.value) + Number(allowed_interest_education_3.value)) {
            if (interest_education_remark_3.value == '--select--') {
                showValidationError(interest_education_remark_3, "Please select remarks");
                invalidField = interest_education_remark_3;
            }
        }
    }

    if (saved_illness) {
        if (!allowed_treatment_value_3.value) {
            showValidationError(allowed_treatment_value_3, "Please fill this field");
            invalidField = allowed_treatment_value_3;
        } else if (Number(treatment_value.value) > Number(allowed_treatment_value.value) + Number(allowed_treatment_value_2.value) + Number(allowed_treatment_value_3.value)) {
            if (treatment_value_remark_3.value == '--select--') {
                showValidationError(treatment_value_remark_3, "Please select remarks");
                invalidField = treatment_value_remark_3;
            }
        }
    }

    if (saved_other80_preventive) {
        if (!allowed_health_checkup_3.value) {
            showValidationError(allowed_health_checkup_3, "Please fill this field");
            invalidField = allowed_health_checkup_3;
        } else if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value) + Number(allowed_health_checkup_2.value) + Number(allowed_health_checkup_3.value)) {
            if (health_checkup_remark_3.value == '--select--') {
                showValidationError(health_checkup_remark_3, "Please select remarks");
                invalidField = health_checkup_remark_3;
            }
        }
    }

    if (saved_other80_senior) {
        if (!allowed_parents_mip_sn_3.value) {
            showValidationError(allowed_parents_mip_sn_3, "Please fill this field");
            invalidField = allowed_parents_mip_sn_3;
        } else if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value) + Number(allowed_parents_mip_sn_2.value) + Number(allowed_parents_mip_sn_3.value)) {
            if (parents_mip_sn_remark_3.value == '--select--') {
                showValidationError(parents_mip_sn_remark_3, "Please select remarks");
                invalidField = parents_mip_sn_remark_3;
            }
        }
    }

    if (saved_other80_parent) {
        if (!allowed_parents_mip_nsn_3.value) {
            showValidationError(allowed_parents_mip_nsn_3, "Please fill this field");
            invalidField = allowed_parents_mip_nsn_3;
        } else if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value) + Number(allowed_parents_mip_nsn_2.value) + Number(allowed_parents_mip_nsn_3.value)) {
            if (parents_mip_nsn_remark_3.value == '--select--') {
                showValidationError(parents_mip_nsn_remark_3, "Please select remarks");
                invalidField = parents_mip_nsn_remark_3;
            }
        }
    }

    if (saved_other80_med) {
        if (!allowed_medical_insurance_3.value) {
            showValidationError(allowed_medical_insurance_3, "Please fill this field");
            invalidField = allowed_medical_insurance_3;
        } else if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value) + Number(allowed_medical_insurance_2.value) + Number(allowed_medical_insurance_3.value)) {
            if (medical_insurance_remark_3.value == '--select--') {
                showValidationError(medical_insurance_remark_3, "Please select remarks");
                invalidField = medical_insurance_remark_3;
            }
        }
    }

    // Income/Loss

    if (saved_Ilhp_80tta) {
        if (!allowed_interest_80tta_3.value) {
            showValidationError(allowed_interest_80tta_3, "Please fill this field");
            invalidField = allowed_interest_80tta_3;
        } else if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value) + Number(allowed_interest_80tta_2.value) + Number(allowed_interest_80tta_3.value)) {
            if (interest_80tta_remark_3.value == '--select--') {
                showValidationError(interest_80tta_remark_3, "Please select remarks");
                invalidField = interest_80tta_remark_3;
            }
        }
    }

    if (saved_Ilhp_otherincome) {
        if (!allowed_other_income_oi_3.value) {
            showValidationError(allowed_other_income_oi_3, "Please fill this field");
            invalidField = allowed_other_income_oi_3;
        } else if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value) + Number(allowed_other_income_oi_2.value) + Number(allowed_other_income_oi_3.value)) {
            if (other_income_oi_remark_3.value == '--select--') {
                showValidationError(other_income_oi_remark_3, "Please select remarks");
                invalidField = other_income_oi_remark_3;
            }
        }
    }

    if (saved_Ilhp_80EEA) {
        if (!allowed_property_value_other_3.value) {
            showValidationError(allowed_property_value_other_3, "Please fill this field");
            invalidField = allowed_property_value_other_3;
        } else if (Number(property_value_other.value) > Number(allowed_property_value_other.value) + Number(allowed_property_value_other_2.value) + Number(allowed_property_value_other_3.value)) {
            if (property_value_other_remark_3.value == '--select--') {
                showValidationError(property_value_other_remark_3, "Please select remarks");
                invalidField = property_value_other_remark_3;
            }
        }
    }

    if (saved_Ilhp_80EE) {
        if (!allowed_home_loan_3.value) {
            showValidationError(allowed_home_loan_3, "Please fill this field");
            invalidField = allowed_home_loan_3;
        } else if (Number(home_loan.value) > Number(allowed_home_loan.value) + Number(allowed_home_loan_2.value) + Number(allowed_home_loan_3.value)) {
            if (home_loan_remark_3.value == '--select--') {
                showValidationError(home_loan_remark_3, "Please select remarks");
                invalidField = home_loan_remark_3;
            }
        }

        if (!allowed_property_value_3.value) {
            showValidationError(allowed_property_value_3, "Please fill this field");
            invalidField = allowed_property_value_3;
        } else if (Number(property_value.value) > Number(allowed_property_value.value) + Number(allowed_property_value_2.value) + Number(allowed_property_value_3.value)) {
            if (property_value_remark_3.value == '--select--') {
                showValidationError(property_value_remark_3, "Please select remarks");
                invalidField = property_value_remark_3;
            }
        }

        if (!allowed_loan_amount_3.value) {
            showValidationError(allowed_loan_amount_3, "Please fill this field");
            invalidField = allowed_loan_amount_3;
        } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value) + Number(allowed_loan_amount_2.value) + Number(allowed_loan_amount_3.value)) {
            if (loan_amount_remark_3.value == '--select--') {
                showValidationError(loan_amount_remark_3, "Please select remarks");
                invalidField = loan_amount_remark_3;
            }
        }
    }

    if (saved_Ilhp_letout) {
        if (!allowed_standardDeduction_3.value) {
            showValidationError(allowed_standardDeduction_3, "Please fill this field");
            invalidField = allowed_standardDeduction_3;
        } else if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value) + Number(allowed_standardDeduction_2.value) + Number(allowed_standardDeduction_3.value)) {
            if (allowed_standardDeduction_remark_3.value == '--select--') {
                showValidationError(allowed_standardDeduction_remark_3, "Please select remarks");
                invalidField = allowed_standardDeduction_remark_3;
            }
        }

        if (!allowed_incomeLossOnHouseProperty_3.value) {
            showValidationError(allowed_incomeLossOnHouseProperty_3, "Please fill this field");
            invalidField = allowed_incomeLossOnHouseProperty_3;
        } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value) + Number(allowed_incomeLossOnHouseProperty_2.value) + Number(allowed_incomeLossOnHouseProperty_3.value)) {
            if (allowed_incomeLossOnHouseProperty_remark_3.value == '--select--') {
                showValidationError(allowed_incomeLossOnHouseProperty_remark_3, "Please select remarks");
                invalidField = allowed_incomeLossOnHouseProperty_remark_3;
            }
        }

        if (!allowed_homeLoanInterest_3.value) {
            showValidationError(allowed_homeLoanInterest_3, "Please fill this field");
            invalidField = allowed_homeLoanInterest_3;
        } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value) + Number(allowed_homeLoanInterest_2.value) + Number(allowed_homeLoanInterest_3.value)) {
            if (allowed_homeLoanInterest_remark_3.value == '--select--') {
                showValidationError(allowed_homeLoanInterest_remark_3, "Please select remarks");
                invalidField = allowed_homeLoanInterest_remark_3;
            }
        }

        if (!allowed_municipalPropertyTax_3.value) {
            showValidationError(allowed_municipalPropertyTax_3, "Please fill this field");
            invalidField = allowed_municipalPropertyTax_3;
        } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value) + Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax_3.value)) {
            if (allowed_municipalPropertyTax_remark_3.value == '--select--') {
                showValidationError(allowed_municipalPropertyTax_remark_3, "Please select remarks");
                invalidField = allowed_municipalPropertyTax_remark_3;
            }
        }

        if (!allowed_annualLettableValue_3.value) {
            showValidationError(allowed_annualLettableValue_3, "Please fill this field");
            invalidField = allowed_annualLettableValue_3;
        } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value) + Number(allowed_annualLettableValue_2.value) + Number(allowed_annualLettableValue_3.value)) {
            if (allowed_annualLettableValue_remark_3.value == '--select--') {
                showValidationError(allowed_annualLettableValue_remark_3, "Please select remarks");
                invalidField = allowed_annualLettableValue_remark_3;
            }
        }
    }

    if (saved_Ilhp_self) {
        if (!allowed_self_3.value) {
            showValidationError(allowed_self_3, "Please fill this field");
            invalidField = allowed_self_3;
        } else if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value) + Number(allowed_self_2.value) + Number(allowed_self_3.value)) {
            if (self_remark_3.value == '--select--') {
                showValidationError(self_remark_3, "Please select remarks");
                invalidField = self_remark_3;
            }
        }
    }

    // HRA

    if (itd5stdt_value) {
        if (Number(itd5.value) > Number(allow_rent_5.value) + Number(allow_rent_5_2.value) + Number(allow_rent_5_3.value)) {
            if (hra_remark_5_3.value == '--select--') {
                showValidationError(hra_remark_5_3, "Please select remarks");
                invalidField = hra_remark_5_3;
            }
        }
        if (!allow_rent_5_3.value) {
            showValidationError(allow_rent_5_3, "Please fill this field");
            invalidField = allow_rent_5_3;
        }
        if (!ita5enddt.value) {
            showValidationError(ita5enddt, "Please fill this field");
            invalidField = ita5enddt;
        }
    }

    if (itd4stdt_value) {
        if (Number(itd4.value) > Number(allow_rent_4.value) + Number(allow_rent_4_2.value) + Number(allow_rent_4_3.value)) {
            if (hra_remark_4_3.value == '--select--') {
                showValidationError(hra_remark_4_3, "Please select remarks");
                invalidField = hra_remark_4_3;
            }
        }
        if (!hra_remark_4_3.value) {
            showValidationError(hra_remark_4_3, "Please fill this field");
            invalidField = hra_remark_4_3;
        }
        if (!ita4enddt.value) {
            showValidationError(ita4enddt, "Please fill this field");
            invalidField = ita4enddt;
        }
    }

    if (itd3stdt_value) {
        if (Number(itd3.value) > Number(allow_rent_3.value) + Number(allow_rent_3_2.value) + Number(allow_rent_3_3.value)) {
            if (hra_remark_3_3.value == '--select--') {
                showValidationError(hra_remark_3_3, "Please select remarks");
                invalidField = hra_remark_3_3;
            }
        }
        if (!allow_rent_3_3.value) {
            showValidationError(allow_rent_3_3, "Please fill this field");
            invalidField = allow_rent_3_3;
        }
        if (!ita3enddt.value) {
            showValidationError(ita3enddt, "Please fill this field");
            invalidField = ita3enddt;
        }
    }

    if (itd2stdt_value) {
        if (Number(itd2.value) > Number(allow_rent_2.value) + Number(allow_rent_2_2.value) + Number(allow_rent_2_3.value)) {
            if (hra_remark_2_3.value == '--select--') {
                showValidationError(hra_remark_2_3, "Please select remarks");
                invalidField = hra_remark_2_3;
            }
        }
        if (!allow_rent_2_3.value) {
            showValidationError(allow_rent_2_3, "Please fill this field");
            invalidField = allow_rent_2_3;
        }
        if (!ita2enddt.value) {
            showValidationError(ita2enddt, "Please fill this field");
            invalidField = ita2enddt;
        }
    }

    if (itd1stdt_value) {
        if (Number(itd1.value) > Number(allow_rent_1.value) + Number(allow_rent_1_2.value) + Number(allow_rent_1_3.value)) {
            if (hra_remark_1_3.value == '--select--') {
                showValidationError(hra_remark_1_3, "Please select remarks");
                invalidField = hra_remark_1_3;
            }
        }

        if (!allow_rent_1_3.value) {
            showValidationError(allow_rent_1_3, "Please fill this field");
            invalidField = allow_rent_1_3;
        }
        if (!ita1enddt.value) {
            showValidationError(ita1enddt, "Please fill this field");
            invalidField = ita1enddt;
        }
    }


    if (invalidField) {
        invalidField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return;
    }
    

    if (!ver_level_2.checked) {
        showValidationError(ver_level_2, "Please check this field to verify");
        invalidField = ver_level_2;
        invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return; // Stop submission if the checkbox is not checked
    }  

    }
}



// function Submitdata_fun() {
//     if (Submitdata.disabled == false) {        
//         basic_form_formdata = new FormData(document.getElementById("basic_form"));

//         custom_re_formdata = new FormData(document.getElementById("custom_re"));
//         for (let [key, value] of custom_re_formdata.entries()) {
//             basic_form_formdata.append(key, value);
//         }

//         if (saved_hra_new) {
//             hra_form_formdata = new FormData(document.getElementById("hra_form"));
//             for (let [key, value] of hra_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }
//         if (saved_Ilhp_new) {
//             ilh_form_formdata = new FormData(document.getElementById("ilh_form"));
//             for (let [key, value] of ilh_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_other80_new) {
//             other80_form_formdata = new FormData(document.getElementById("other80_form"));
//             for (let [key, value] of other80_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_80c_new) {
//             _80C_form_formdata = new FormData(document.getElementById("_80C_form"));
//             for (let [key, value] of _80C_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_previous_emp) {
//             previousemp_form_formdata = new FormData(document.getElementById("previousemp_form"));
//             for (let [key, value] of previousemp_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }



//         let combinedFormData = new FormData();

//         for (let [key, value] of basic_form_formdata.entries()) {
//             combinedFormData.append(key, value);
//         }

//         let apiUrl = "submit_checker";


//         let hiddenForm = document.createElement('form');
//         hiddenForm.style.display = 'none';
//         hiddenForm.action = apiUrl;
//         hiddenForm.method = 'POST';


//         for (let [key, value] of combinedFormData.entries()) {
//             let input = document.createElement('input');
//             input.type = 'hidden';
//             input.name = key;
//             input.value = value;
//             hiddenForm.appendChild(input);
//         }
//         document.body.appendChild(hiddenForm);
//         hiddenForm.submit();
//     } 
//     else {        
                
//         let invalidField = null;

//         if (ver_level_2.checked == false) {
//             ver_level_2.setCustomValidity("Please Check this field");
//             ver_level_2.reportValidity();
//             invalidField = ver_level_2;
//         }

//         if (!custom_remark.value) {
//             custom_remark.setCustomValidity("Please fill this field");
//             custom_remark.reportValidity();
//             invalidField = custom_remark;
//         }

//         // Previous============
        
//         if (saved_previous_emp) {

//             if (!allowed_income_tax.value) {
//                 allowed_income_tax.setCustomValidity("Please Fill this field");
//                 allowed_income_tax.reportValidity();
//                 invalidField = allowed_income_tax;
//             } else if (Number(income_tax.value) != Number(allowed_income_tax.value)) {
//                 if (income_tax_remark.value == '--select--' || income_tax_remark.value == 'No Remark') {
//                     income_tax_remark.setCustomValidity("Please Fill this field");
//                     income_tax_remark.reportValidity();
//                     invalidField = income_tax_remark;
//                 }
//             }
            
//             if (!allowed_provident_fund.value) {
//                 allowed_provident_fund.setCustomValidity("Please Fill this field");
//                 allowed_provident_fund.reportValidity();
//                 invalidField = allowed_provident_fund;
//             } else if (Number(provident_fund.value) != Number(allowed_provident_fund.value)) {
//                 if (provident_fund_remark.value == '--select--' || provident_fund_remark.value == 'No Remark') {
//                     provident_fund_remark.setCustomValidity("Please Fill this field");
//                     provident_fund_remark.reportValidity();
//                     invalidField = provident_fund_remark;
//                 }
//             } 

//             if (!allowed_professional_tax.value) {
//                 allowed_professional_tax.setCustomValidity("Please Fill this field");
//                 allowed_professional_tax.reportValidity();
//                 invalidField = allowed_professional_tax;
//             } else if (Number(professional_tax.value) != Number(allowed_professional_tax.value)) {
//                 if (professional_tax_remark.value == '--select--' || professional_tax_remark.value == 'No Remark') {
//                     professional_tax_remark.setCustomValidity("Please Fill this field");
//                     professional_tax_remark.reportValidity();
//                     invalidField = professional_tax_remark;
//                 }
//             }

//             if (!allowed_salary_previousemp.value) {
//                 allowed_salary_previousemp.setCustomValidity("Please Fill this field");
//                 allowed_salary_previousemp.reportValidity();
//                 invalidField = allowed_salary_previousemp;
//             } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp.value)) {
//                 if (salary_previousemp_remark.value == '--select--' || salary_previousemp_remark.value == 'No Remark') {
//                     salary_previousemp_remark.setCustomValidity("Please Fill this field");
//                     salary_previousemp_remark.reportValidity();
//                     invalidField = salary_previousemp_remark;
//                 }
//             }                            
//         } 
       
//         // 80C
//         if (saved_80c_sukanyaSamriddhi) {
//             if (!allowed_sukanyaSamriddhi.value) {
//                 allowed_sukanyaSamriddhi.setCustomValidity("Please Fill this field");
//                 allowed_sukanyaSamriddhi.reportValidity();
//                 invalidField = allowed_sukanyaSamriddhi;
//             } else if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value)) {
//                 if (sukanyaSamriddhi_remark.value == '--select--' || sukanyaSamriddhi_remark.value == 'No Remark') {
//                     sukanyaSamriddhi_remark.setCustomValidity("Please Fill this field");
//                     sukanyaSamriddhi_remark.reportValidity();
//                     invalidField = sukanyaSamriddhi_remark;
//                 }
//             }
//         }

//         if (saved_80c_pensionContribution) {
//             if (!allowed_pensionContribution.value) {
//                 allowed_pensionContribution.setCustomValidity("Please Fill this field");
//                 allowed_pensionContribution.reportValidity();
//                 invalidField = allowed_pensionContribution;
//             } else if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value)) {
//                 if (pensionContribution_remark.value == '--select--' || pensionContribution_remark.value == 'No Remark') {
//                     pensionContribution_remark.setCustomValidity("Please Fill this field");
//                     pensionContribution_remark.reportValidity();
//                     invalidField = pensionContribution_remark;
//                 }
//             }
//         }
    
//         if (saved_80c_termDeposits) {
//             if (!allowed_termDeposits.value) {
//                 allowed_termDeposits.setCustomValidity("Please Fill this field");
//                 allowed_termDeposits.reportValidity();
//                 invalidField = allowed_termDeposits;
//             } else if (Number(termDeposits.value) > Number(allowed_termDeposits.value)) {
//                 if (termDeposits_remark.value == '--select--' || termDeposits_remark.value == 'No Remark') {
//                     termDeposits_remark.setCustomValidity("Please Fill this field");
//                     termDeposits_remark.reportValidity();
//                     invalidField = termDeposits_remark;
//                 }
//             }
//         }

//         if (saved_80c_mutualFundSubscription) {
//             if (!allowed_mutualFundSubscription.value) {
//                 allowed_mutualFundSubscription.setCustomValidity("Please Fill this field");
//                 allowed_mutualFundSubscription.reportValidity();
//                 invalidField = allowed_mutualFundSubscription;
//             } else if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value)) {
//                 if (mutualFundSubscription_remark.value == '--select--' || mutualFundSubscription_remark.value == 'No Remark') {
//                     mutualFundSubscription_remark.setCustomValidity("Please Fill this field");
//                     mutualFundSubscription_remark.reportValidity();
//                     invalidField = mutualFundSubscription_remark;
//                 }
//             }
//         }
    
//         if (saved_80c_tuitionFee) {
//             if (!allowed_tuitionFee.value) {
//                 allowed_tuitionFee.setCustomValidity("Please Fill this field");
//                 allowed_tuitionFee.reportValidity();
//                 invalidField = allowed_tuitionFee;
//             } else if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value)) {
//                 if (tuitionFee_remark.value == '--select--' || tuitionFee_remark.value == 'No Remark') {
//                     tuitionFee_remark.setCustomValidity("Please Fill this field");
//                     tuitionFee_remark.reportValidity();
//                     invalidField = tuitionFee_remark;
//                 }
//             }
//         }
        
//         if (saved_80c_houseLoan) {
//             if (!allowed_houseLoan.value) {
//                 allowed_houseLoan.setCustomValidity("Please Fill this field");
//                 allowed_houseLoan.reportValidity();
//                 invalidField = allowed_houseLoan;
//             } else if (Number(houseLoan.value) > Number(allowed_houseLoan.value)) {
//                 if (houseLoan_remark.value == '--select--' || houseLoan_remark.value == 'No Remark') {
//                     houseLoan_remark.setCustomValidity("Please Fill this field");
//                     houseLoan_remark.reportValidity();
//                     invalidField = houseLoan_remark;
//                 }
//             }
//         }

//         if (saved_80c_ppfContribution) {
//             if (!allowed_ppfContribution.value) {
//                 allowed_ppfContribution.setCustomValidity("Please Fill this field");
//                 allowed_ppfContribution.reportValidity();
//                 invalidField = allowed_ppfContribution;
//             } else if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value)) {
//                 if (ppfContribution_remark.value == '--select--' || ppfContribution_remark.value == 'No Remark') {
//                     ppfContribution_remark.setCustomValidity("Please Fill this field");
//                     ppfContribution_remark.reportValidity();
//                     invalidField = ppfContribution_remark;
//                 }
//             }
//         }

//         if (saved_80c_nscInterest) {
//             if (!allowed_nscInterest.value) {
//                 allowed_nscInterest.setCustomValidity("Please Fill this field");
//                 allowed_nscInterest.reportValidity();
//                 invalidField = allowed_nscInterest;
//             } else if (Number(nscInterest.value) > Number(allowed_nscInterest.value)) {
//                 if (nscInterest_remark.value == '--select--' || nscInterest_remark.value == 'No Remark') {
//                     nscInterest_remark.setCustomValidity("Please Fill this field");
//                     nscInterest_remark.reportValidity();
//                     invalidField = nscInterest_remark;
//                 }
//             }
//         }
        
//         if (saved_80c_nscSubscription) {
//             if (!allowed_nscSubscription.value) {
//                 allowed_nscSubscription.setCustomValidity("Please Fill this field");
//                 allowed_nscSubscription.reportValidity();
//                 invalidField = allowed_nscSubscription;
//             } else if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value)) {
//                 if (nscSubscription_remark.value == '--select--' || nscSubscription_remark.value == 'No Remark') {
//                     nscSubscription_remark.setCustomValidity("Please Fill this field");
//                     nscSubscription_remark.reportValidity();
//                     invalidField = nscSubscription_remark;
//                 }
//             }
//         }

//         if (saved_80c_ulipContribution) {
//             if (!allowed_ulipContribution.value) {
//                 allowed_ulipContribution.setCustomValidity("Please Fill this field");
//                 allowed_ulipContribution.reportValidity();
//                 invalidField = allowed_ulipContribution;
//             } else if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value)) {
//                 if (ulipContribution_remark.value == '--select--' || ulipContribution_remark.value == 'No Remark') {
//                     ulipContribution_remark.setCustomValidity("Please Fill this field");
//                     ulipContribution_remark.reportValidity();
//                     invalidField = ulipContribution_remark;
//                 }
//             }
//         }
        
//         if (saved_80c_timeDeposit) {
//             if (!allowed_timeDeposit.value) {
//                 allowed_timeDeposit.setCustomValidity("Please Fill this field");
//                 allowed_timeDeposit.reportValidity();
//                 invalidField = allowed_timeDeposit;
//             } else if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value)) {
//                 if (timeDeposit_remark.value == '--select--' || timeDeposit_remark.value == 'No Remark') {
//                     timeDeposit_remark.setCustomValidity("Please Fill this field");
//                     timeDeposit_remark.reportValidity();
//                     invalidField = timeDeposit_remark;
//                 }
//             }
//         }
        
//         if (saved_80c_payment) {
//             if (!allowed_paymentLifeInsurance.value) {
//                 allowed_paymentLifeInsurance.setCustomValidity("Please Fill this field");
//                 allowed_paymentLifeInsurance.reportValidity();
//                 invalidField = allowed_paymentLifeInsurance;
//             } else if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value)) {
//                 if (paymentLifeInsurance_remark.value == '--select--' || paymentLifeInsurance_remark.value == 'No Remark') {
//                     paymentLifeInsurance_remark.setCustomValidity("Please Fill this field");
//                     paymentLifeInsurance_remark.reportValidity();
//                     invalidField = paymentLifeInsurance_remark;
//                 }
//             }
//         }

//         // 80 Other ============

//         if (saved_80ccd) {
//             if (!allowed_nps_80ccd1b.value) {
//                 allowed_nps_80ccd1b.setCustomValidity("Please fill this field");
//                 allowed_nps_80ccd1b.reportValidity();
//                 invalidField = allowed_nps_80ccd1b;
//             } else if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value)) {
//                 if (nps_80ccd1b_remark.value == '--select--' || nps_80ccd1b_remark.value == 'No Remark') {
//                     nps_80ccd1b_remark.setCustomValidity("Please fill this field");
//                     nps_80ccd1b_remark.reportValidity();
//                     invalidField = nps_80ccd1b_remark;
//                 }
//             }
//         }

//         if (saved_80eeb) {
//             if (!allowed_vehicle_value.value) {
//                 allowed_vehicle_value.setCustomValidity("Please fill this field");
//                 allowed_vehicle_value.reportValidity();
//                 invalidField = allowed_vehicle_value;
//             } else if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value)) {
//                 if (vehicle_value_remark.value == '--select--' || vehicle_value_remark.value == 'No Remark') {
//                     vehicle_value_remark.setCustomValidity("Please fill this field");
//                     vehicle_value_remark.reportValidity();
//                     invalidField = vehicle_value_remark;
//                 }
//             }
//         }

//         if (saved_self) {
//             if (!allowed_self_dis.value) {
//                 allowed_self_dis.setCustomValidity("Please fill this field");
//                 allowed_self_dis.reportValidity();
//                 invalidField = allowed_self_dis;
//             } else if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value)) {
//                 if (allowed_self_remark.value == '--select--' || allowed_self_remark.value == 'No Remark') {
//                     allowed_self_remark.setCustomValidity("Please fill this field");
//                     allowed_self_remark.reportValidity();
//                     invalidField = allowed_self_remark;
//                 }
//             }
//         }

//         if (saved_dependent) {
//             if (!allowed_Dependent_dis.value) {
//                 allowed_Dependent_dis.setCustomValidity("Please fill this field");
//                 allowed_Dependent_dis.reportValidity();
//                 invalidField = allowed_Dependent_dis;
//             } else if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value)) {
//                 if (allowed_Dependent_remark.value == '--select--' || allowed_Dependent_remark.value == 'No Remark') {
//                     allowed_Dependent_remark.setCustomValidity("Please fill this field");
//                     allowed_Dependent_remark.reportValidity();
//                     invalidField = allowed_Dependent_remark;
//                 }
//             }
//         }
        
//         if (saved_education) {
//             if (!allowed_interest_education.value) {
//                 allowed_interest_education.setCustomValidity("Please fill this field");
//                 allowed_interest_education.reportValidity();
//                 invalidField = allowed_interest_education;
//             } else if (Number(interest_education.value) > Number(allowed_interest_education.value)) {
//                 if (interest_education_remark.value == '--select--' || interest_education_remark.value == 'No Remark') {
//                     interest_education_remark.setCustomValidity("Please fill this field");
//                     interest_education_remark.reportValidity();
//                     invalidField = interest_education_remark;
//                 }
//             }
//         }

//         if (saved_illness) {
//             if (!allowed_treatment_value.value) {
//                 allowed_treatment_value.setCustomValidity("Please fill this field");
//                 allowed_treatment_value.reportValidity();
//                 invalidField = allowed_treatment_value;
//             } else if (Number(treatment_value.value) > Number(allowed_treatment_value.value)) {
//                 if (treatment_value_remark.value == '--select--' || treatment_value_remark.value == 'No Remark') {
//                     treatment_value_remark.setCustomValidity("Please fill this field");
//                     treatment_value_remark.reportValidity();
//                     invalidField = treatment_value_remark;
//                 }
//             }
//         }

//         if (saved_other80_preventive){
            
//             if (!allowed_health_checkup.value) {
//                 allowed_health_checkup.setCustomValidity("Please fill this field");
//                 allowed_health_checkup.reportValidity();
//                 invalidField = allowed_health_checkup;
//             } else if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value)) {
//                 if (health_checkup_remark.value == '--select--' || health_checkup_remark.value == 'No Remark') {
//                     health_checkup_remark.setCustomValidity("Please fill this field");
//                     health_checkup_remark.reportValidity();
//                     invalidField = health_checkup_remark;
//                 }
//             }
            
//         }

//         if (saved_other80_senior){
            
//             if (!allowed_parents_mip_sn.value) {
//                 allowed_parents_mip_sn.setCustomValidity("Please fill this field");
//                 allowed_parents_mip_sn.reportValidity();
//                 invalidField = allowed_parents_mip_sn;
//             } else if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value)) {
//                 if (parents_mip_sn_remark.value == '--select--' || parents_mip_sn_remark.value == 'No Remark') {
//                     parents_mip_sn_remark.setCustomValidity("Please fill this field");
//                     parents_mip_sn_remark.reportValidity();
//                     invalidField = parents_mip_sn_remark;
//                 }
//             } 
//         }

//         if (saved_other80_parent){                    
//             if (!allowed_parents_mip_nsn.value) {
//                 allowed_parents_mip_nsn.setCustomValidity("Please fill this field");
//                 allowed_parents_mip_nsn.reportValidity();
//                 invalidField = allowed_parents_mip_nsn;
//             } else if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value)) {
//                 if (parents_mip_nsn_remark.value == '--select--' || parents_mip_nsn_remark.value == 'No Remark') {
//                     parents_mip_nsn_remark.setCustomValidity("Please fill this field");
//                     parents_mip_nsn_remark.reportValidity();
//                     invalidField = parents_mip_nsn_remark;
//                 }
//             } 

//         }

//         if (saved_other80_med) {                
//             if (!allowed_medical_insurance.value) {
//                 allowed_medical_insurance.setCustomValidity("Please fill this field");
//                 allowed_medical_insurance.reportValidity();
//                 invalidField = allowed_medical_insurance;
//             } else if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value)) {
//                 if (medical_insurance_remark.value == '--select--' || medical_insurance_remark.value == 'No Remark') {
//                     medical_insurance_remark.setCustomValidity("Please fill this field");
//                     medical_insurance_remark.reportValidity();
//                     invalidField = medical_insurance_remark;
//                 }
//             } 
            
//         }  

        
//         // Income/Loss========

//         if (saved_Ilhp_80tta) {
//             if (!allowed_interest_80tta.value) {
//                 allowed_interest_80tta.setCustomValidity("Please fill this field");
//                 allowed_interest_80tta.reportValidity();
//                 invalidField = allowed_interest_80tta;
//             } else if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value)) {
//                 if (interest_80tta_remark.value == '--select--' || interest_80tta_remark.value == 'No Remark') {
//                     interest_80tta_remark.setCustomValidity("Please fill this field");
//                     interest_80tta_remark.reportValidity();
//                     invalidField = interest_80tta_remark;
//                 }
//             }
//         }

//         if (saved_Ilhp_otherincome) {
//             if (!allowed_other_income_oi.value) {
//                 allowed_other_income_oi.setCustomValidity("Please fill this field");
//                 allowed_other_income_oi.reportValidity();
//                 invalidField = allowed_other_income_oi;
//             } else if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value)) {
//                 if (other_income_oi_remark.value == '--select--' || other_income_oi_remark.value == 'No Remark') {
//                     other_income_oi_remark.setCustomValidity("Please fill this field");
//                     other_income_oi_remark.reportValidity();
//                     invalidField = other_income_oi_remark;
//                 }
//             }
//         }

//         if (saved_Ilhp_80EEA) {
//             if (!allowed_property_value_other.value) {
//                 allowed_property_value_other.setCustomValidity("Please fill this field");
//                 allowed_property_value_other.reportValidity();
//                 invalidField = allowed_property_value_other;
//             } else if (Number(property_value_other.value) > Number(allowed_property_value_other.value)) {
//                 if (property_value_other_remark.value == '--select--' || property_value_other_remark.value == 'No Remark') {
//                     property_value_other_remark.setCustomValidity("Please fill this field");
//                     property_value_other_remark.reportValidity();
//                     invalidField = property_value_other_remark;
//                 }
//             }
//         }

//         if (saved_Ilhp_80EE) {

//             if (!allowed_home_loan.value) {
//                 allowed_home_loan.setCustomValidity("Please fill this field");
//                 allowed_home_loan.reportValidity();
//                 invalidField = allowed_home_loan;
//             } else if (Number(home_loan.value) > Number(allowed_home_loan.value)) {
//                 if (home_loan_remark.value == '--select--' || home_loan_remark.value == 'No Remark') {
//                     home_loan_remark.setCustomValidity("Please fill this field");
//                     home_loan_remark.reportValidity();
//                     invalidField = home_loan_remark;
//                 }
//             }
            
//             if (!allowed_property_value.value) {
//                 allowed_property_value.setCustomValidity("Please fill this field");
//                 allowed_property_value.reportValidity();
//                 invalidField = allowed_property_value;
//             } else if (Number(property_value.value) > Number(allowed_property_value.value)) {
//                 if (property_value_remark.value == '--select--' || property_value_remark.value == 'No Remark') {
//                     property_value_remark.setCustomValidity("Please fill this field");
//                     property_value_remark.reportValidity();
//                     invalidField = property_value_remark;
//                 }
//             }

//             if (!allowed_loan_amount.value) {
//                 allowed_loan_amount.setCustomValidity("Please fill this field");
//                 allowed_loan_amount.reportValidity();
//                 invalidField = allowed_loan_amount;
//             } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value)) {
//                 if (loan_amount_remark.value == '--select--' || loan_amount_remark.value == 'No Remark') {
//                     loan_amount_remark.setCustomValidity("Please fill this field");
//                     loan_amount_remark.reportValidity();
//                     invalidField = loan_amount_remark;
//                 }
//             }

             

            
//         }
    
//         if (saved_Ilhp_letout) {
            
//             if (!allowed_standardDeduction.value) {
//                 allowed_standardDeduction.setCustomValidity("Please fill this field");
//                 allowed_standardDeduction.reportValidity();
//                 invalidField = allowed_standardDeduction;
//             } else if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value)) {
//                 if (allowed_standardDeduction_remark.value == '--select--' || allowed_standardDeduction_remark.value == 'No Remark') {
//                     allowed_standardDeduction_remark.setCustomValidity("Please fill this field");
//                     allowed_standardDeduction_remark.reportValidity();
//                     invalidField = allowed_standardDeduction_remark;
//                 }
//             }
            
//             if (!allowed_incomeLossOnHouseProperty.value) {
//                 allowed_incomeLossOnHouseProperty.setCustomValidity("Please fill this field");
//                 allowed_incomeLossOnHouseProperty.reportValidity();
//                 invalidField = allowed_incomeLossOnHouseProperty;
//             } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value)) {
//                 if (allowed_incomeLossOnHouseProperty_remark.value == '--select--' || allowed_incomeLossOnHouseProperty_remark.value == 'No Remark') {
//                     allowed_incomeLossOnHouseProperty_remark.setCustomValidity("Please fill this field");
//                     allowed_incomeLossOnHouseProperty_remark.reportValidity();
//                     invalidField = allowed_incomeLossOnHouseProperty_remark;
//                 }
//             } 

//             if (!allowed_homeLoanInterest.value) {
//                 allowed_homeLoanInterest.setCustomValidity("Please fill this field");
//                 allowed_homeLoanInterest.reportValidity();
//                 invalidField = allowed_homeLoanInterest;
//             } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value)) {
//                 if (allowed_homeLoanInterest_remark.value == '--select--' || allowed_homeLoanInterest_remark.value == 'No Remark') {
//                     allowed_homeLoanInterest_remark.setCustomValidity("Please fill this field");
//                     allowed_homeLoanInterest_remark.reportValidity();
//                     invalidField = allowed_homeLoanInterest_remark;
//                 }
//             } 

//             if (!allowed_municipalPropertyTax.value) {
//                 allowed_municipalPropertyTax.setCustomValidity("Please fill this field");
//                 allowed_municipalPropertyTax.reportValidity();
//                 invalidField = allowed_municipalPropertyTax;
//             } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value)) {
//                 if (allowed_municipalPropertyTax_remark.value == '--select--' || allowed_municipalPropertyTax_remark.value == 'No Remark') {
//                     allowed_municipalPropertyTax_remark.setCustomValidity("Please fill this field");
//                     allowed_municipalPropertyTax_remark.reportValidity();
//                     invalidField = allowed_municipalPropertyTax_remark;
//                 }
//             } 
            
//             if (!allowed_annualLettableValue.value) {
//                 allowed_annualLettableValue.setCustomValidity("Please fill this field");
//                 allowed_annualLettableValue.reportValidity();
//                 invalidField = allowed_annualLettableValue;
//             } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value)) {
//                 if (allowed_annualLettableValue_remark.value == '--select--' || allowed_annualLettableValue_remark.value == 'No Remark') {
//                     allowed_annualLettableValue_remark.setCustomValidity("Please fill this field");
//                     allowed_annualLettableValue_remark.reportValidity();
//                     invalidField = allowed_annualLettableValue_remark;
//                 }
//             }  

            
            
//         }

//         if (saved_Ilhp_self) {
//             if (!allowed_self.value) {
//                 allowed_self.setCustomValidity("Please fill this field");
//                 allowed_self.reportValidity();
//                 invalidField = allowed_self;
//             } else if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value)) {
//                 if (self_remark.value == '--select--' || self_remark.value == 'No Remark') {
//                     self_remark.setCustomValidity("Please fill this field");
//                     self_remark.reportValidity();
//                     invalidField = self_remark;
//                 }
//             }
//         }

//         // HRA=======

        
//         if (itd5stdt_value) {                        
//             if (Number(itd5.value) > Number(allow_rent_5.value)) {
//                 if (hra_remark_5.value == '--select--' || hra_remark_5.value == 'No Remark') {
//                     hra_remark_5.setCustomValidity("Please fill this field");
//                     hra_remark_5.reportValidity();
//                     invalidField = hra_remark_5;
//                 }
//             }
//             if (a_city5.value == '--select--') {
//                 a_city5.setCustomValidity("Please fill this field");
//                 a_city5.reportValidity();
//                 invalidField = a_city5;
//             } 
//             if (!allow_rent_5.value) {
//                 allow_rent_5.setCustomValidity("Please fill this field");
//                 allow_rent_5.reportValidity();
//                 invalidField = allow_rent_5;
//             }
//             if (!ita5enddt.value) {
//                 ita5enddt.setCustomValidity("Please fill this field");
//                 ita5enddt.reportValidity();
//                 invalidField = ita5enddt;
//             }
            
//         }
        
//         if (itd4stdt_value) {
//             if (Number(itd4.value) > Number(allow_rent_4.value)) {
//                 if (hra_remark_4.value == '--select--' || hra_remark_4.value == 'No Remark') {
//                     hra_remark_4.setCustomValidity("Please fill this field");
//                     hra_remark_4.reportValidity();
//                     invalidField = hra_remark_4;
//                 }
//             }
//             if (a_city4.value == '--select--') {
//                 a_city4.setCustomValidity("Please fill this field");
//                 a_city4.reportValidity();
//                 invalidField = a_city4;
//             }  
//             if (!allow_rent_4.value) {
//                 allow_rent_4.setCustomValidity("Please fill this field");
//                 allow_rent_4.reportValidity();
//                 invalidField = allow_rent_4;
//             } 
//             if (!ita4enddt.value) {
//                 ita4enddt.setCustomValidity("Please fill this field");
//                 ita4enddt.reportValidity();
//                 invalidField = ita4enddt;
//             }
            
            
            
//         }

//         if (itd3stdt_value) {
//             if (Number(itd3.value) > Number(allow_rent_3.value)) {
//                 if (hra_remark_3.value == '--select--' || hra_remark_3.value == 'No Remark') {
//                     hra_remark_3.setCustomValidity("Please fill this field");
//                     hra_remark_3.reportValidity();
//                     invalidField = hra_remark_3;
//                 }
//             }
//             if (a_city3.value == '--select--') {
//                 a_city3.setCustomValidity("Please fill this field");
//                 a_city3.reportValidity();
//                 invalidField = a_city3;
//             }  
//             if (!allow_rent_3.value) {
//                 allow_rent_3.setCustomValidity("Please fill this field");
//                 allow_rent_3.reportValidity();
//                 invalidField = allow_rent_3;
//             } 
//             if (!ita3enddt.value) {
//                 ita3enddt.setCustomValidity("Please fill this field");
//                 ita3enddt.reportValidity();
//                 invalidField = ita3enddt;
//             }                                      
//         }

//         if (itd2stdt_value) {
//             if (Number(itd2.value) > Number(allow_rent_2.value)) {
//                 if (hra_remark_2.value == '--select--' || hra_remark_2.value == 'No Remark') {
//                     hra_remark_2.setCustomValidity("Please fill this field");
//                     hra_remark_2.reportValidity();
//                     invalidField = hra_remark_2;
//                 }
//             }
//             if (a_city2.value == '--select--') {
//                 a_city2.setCustomValidity("Please fill this field");
//                 a_city2.reportValidity();
//                 invalidField = a_city2;
//             }  
//             if (!allow_rent_2.value) {
//                 allow_rent_2.setCustomValidity("Please fill this field");
//                 allow_rent_2.reportValidity();
//                 invalidField = allow_rent_2;
//             }
//             if (!ita2enddt.value) {
//                 ita2enddt.setCustomValidity("Please fill this field");
//                 ita2enddt.reportValidity();
//                 invalidField = ita2enddt;
//             }                                 
//         }

//         if (itd1stdt_value) {
//             if (Number(itd1.value) > Number(allow_rent_1.value)) {
//                 if (hra_remark_1.value == '--select--' || hra_remark_1.value == 'No Remark') {
//                     hra_remark_1.setCustomValidity("Please fill this field");
//                     hra_remark_1.reportValidity();
//                     invalidField = hra_remark_1;
//                 }
//             }
//             if (a_city1.value == '--select--') {
//                 a_city1.setCustomValidity("Please fill this field");
//                 a_city1.reportValidity();
//                 invalidField = a_city1;
//             }
//             if (!allow_rent_1.value) {
//                 allow_rent_1.setCustomValidity("Please fill this field");
//                 allow_rent_1.reportValidity();
//                 invalidField = allow_rent_1;
//             } 
//             if (!ita1enddt.value) {
//                 ita1enddt.setCustomValidity("Please fill this field");
//                 ita1enddt.reportValidity();
//                 invalidField = ita1enddt;
//             }      
//         }  

//         if (invalidField) {
//             invalidField.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'center'
//             });
//         }  

//     }

// }


// function Submitdata_fun_1() {
//     if (Submitdata_2.disabled == false) {
        
//         basic_form_formdata = new FormData(document.getElementById("basic_form"));

//         custom_re_formdata = new FormData(document.getElementById("custom_re"));
//         for (let [key, value] of custom_re_formdata.entries()) {
//             basic_form_formdata.append(key, value);
//         }

//         if (saved_hra_new) {
//             hra_form_formdata = new FormData(document.getElementById("hra_form"));
//             for (let [key, value] of hra_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }
//         if (saved_Ilhp_new) {
//             ilh_form_formdata = new FormData(document.getElementById("ilh_form"));
//             for (let [key, value] of ilh_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_other80_new) {
//             other80_form_formdata = new FormData(document.getElementById("other80_form"));
//             for (let [key, value] of other80_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_80c_new) {
//             _80C_form_formdata = new FormData(document.getElementById("_80C_form"));
//             for (let [key, value] of _80C_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_previous_emp) {
//             previousemp_form_formdata = new FormData(document.getElementById("previousemp_form"));
//             for (let [key, value] of previousemp_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }



//         let combinedFormData = new FormData();

//         for (let [key, value] of basic_form_formdata.entries()) {
//             combinedFormData.append(key, value);
//         }

//         let apiUrl = "submit_checker_2";


//         let hiddenForm = document.createElement('form');
//         hiddenForm.style.display = 'none';
//         hiddenForm.action = apiUrl;
//         hiddenForm.method = 'POST';


//         for (let [key, value] of combinedFormData.entries()) {
//             let input = document.createElement('input');
//             input.type = 'hidden';
//             input.name = key;
//             input.value = value;
//             hiddenForm.appendChild(input);
//         }
//         document.body.appendChild(hiddenForm);
//         hiddenForm.submit();
//     } else {                
        
//         let invalidField = null;

//         if (ver_level_2.checked == false) {
//             ver_level_2.setCustomValidity("Please Check this field");
//             ver_level_2.reportValidity();
//             invalidField = ver_level_2;
//         }

//         if (!custom_remark.value) {
//             custom_remark.setCustomValidity("Please fill this field");
//             custom_remark.reportValidity();
//             invalidField = custom_remark;
//         }

//         // Previous============
        
//         if (saved_previous_emp) {

//             if (!allowed_income_tax_2.value) {
//                 allowed_income_tax_2.setCustomValidity("Please Fill this field");
//                 allowed_income_tax_2.reportValidity();
//                 invalidField = allowed_income_tax_2;
//             } else if (Number(income_tax.value) != Number(allowed_income_tax_2.value)) {
//                 if (income_tax_remark_2.value == '--select--') {
//                     income_tax_remark_2.setCustomValidity("Please Fill this field");
//                     income_tax_remark_2.reportValidity();
//                     invalidField = income_tax_remark_2;
//                 }
//             }
            
//             if (!allowed_provident_fund_2.value) {
//                 allowed_provident_fund_2.setCustomValidity("Please Fill this field");
//                 allowed_provident_fund_2.reportValidity();
//                 invalidField = allowed_provident_fund_2;
//             } else if (Number(provident_fund.value) != Number(allowed_provident_fund_2.value)) {
//                 if (provident_fund_remark_2.value == '--select--') {
//                     provident_fund_remark_2.setCustomValidity("Please Fill this field");
//                     provident_fund_remark_2.reportValidity();
//                     invalidField = provident_fund_remark_2;
//                 }
//             } 

//             if (!allowed_professional_tax_2.value) {
//                 allowed_professional_tax_2.setCustomValidity("Please Fill this field");
//                 allowed_professional_tax_2.reportValidity();
//                 invalidField = allowed_professional_tax_2;
//             } else if (Number(professional_tax.value) != Number(allowed_professional_tax_2.value)) {
//                 if (professional_tax_remark_2.value == '--select--') {
//                     professional_tax_remark_2.setCustomValidity("Please Fill this field");
//                     professional_tax_remark_2.reportValidity();
//                     invalidField = professional_tax_remark_2;
//                 }
//             }

//             if (!allowed_salary_previousemp_2.value) {
//                 allowed_salary_previousemp_2.setCustomValidity("Please Fill this field");
//                 allowed_salary_previousemp_2.reportValidity();
//                 invalidField = allowed_salary_previousemp_2;
//             } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp_2.value)) {
//                 if (salary_previousemp_remark_2.value == '--select--') {
//                     salary_previousemp_remark_2.setCustomValidity("Please Fill this field");
//                     salary_previousemp_remark_2.reportValidity();
//                     invalidField = salary_previousemp_remark_2;
//                 }
//             }                            
//         } 
       
//         // 80C
//         if (saved_80c_sukanyaSamriddhi) {
//             if (!allowed_sukanyaSamriddhi_2.value) {
//                 allowed_sukanyaSamriddhi_2.setCustomValidity("Please Fill this field");
//                 allowed_sukanyaSamriddhi_2.reportValidity();
//                 invalidField = allowed_sukanyaSamriddhi_2;
//             } else if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value) + Number(allowed_sukanyaSamriddhi_2.value)) {
//                 if (sukanyaSamriddhi_remark_2.value == '--select--') {
//                     sukanyaSamriddhi_remark_2.setCustomValidity("Please Fill this field");
//                     sukanyaSamriddhi_remark_2.reportValidity();
//                     invalidField = sukanyaSamriddhi_remark_2;
//                 }
//             }
//         }

//         if (saved_80c_pensionContribution) {
//             if (!allowed_pensionContribution_2.value) {
//                 allowed_pensionContribution_2.setCustomValidity("Please Fill this field");
//                 allowed_pensionContribution_2.reportValidity();
//                 invalidField = allowed_pensionContribution_2;
//             } else if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value) + Number(allowed_pensionContribution_2.value)) {
//                 if (pensionContribution_remark_2.value == '--select--') {
//                     pensionContribution_remark_2.setCustomValidity("Please Fill this field");
//                     pensionContribution_remark_2.reportValidity();
//                     invalidField = pensionContribution_remark_2;
//                 }
//             }
//         }
    
//         if (saved_80c_termDeposits) {
//             if (!allowed_termDeposits_2.value) {
//                 allowed_termDeposits_2.setCustomValidity("Please Fill this field");
//                 allowed_termDeposits_2.reportValidity();
//                 invalidField = allowed_termDeposits_2;
//             } else if (Number(termDeposits.value) > Number(allowed_termDeposits.value) + Number(allowed_termDeposits_2.value)) {
//                 if (termDeposits_remark_2.value == '--select--') {
//                     termDeposits_remark_2.setCustomValidity("Please Fill this field");
//                     termDeposits_remark_2.reportValidity();
//                     invalidField = termDeposits_remark_2;
//                 }
//             }
//         }

//         if (saved_80c_mutualFundSubscription) {
//             if (!allowed_mutualFundSubscription_2.value) {
//                 allowed_mutualFundSubscription_2.setCustomValidity("Please Fill this field");
//                 allowed_mutualFundSubscription_2.reportValidity();
//                 invalidField = allowed_mutualFundSubscription_2;
//             } else if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value) + Number(allowed_mutualFundSubscription_2.value)) {
//                 if (mutualFundSubscription_remark_2.value == '--select--') {
//                     mutualFundSubscription_remark_2.setCustomValidity("Please Fill this field");
//                     mutualFundSubscription_remark_2.reportValidity();
//                     invalidField = mutualFundSubscription_remark_2;
//                 }
//             }
//         }
    
//         if (saved_80c_tuitionFee) {
//             if (!allowed_tuitionFee_2.value) {
//                 allowed_tuitionFee_2.setCustomValidity("Please Fill this field");
//                 allowed_tuitionFee_2.reportValidity();
//                 invalidField = allowed_tuitionFee_2;
//             } else if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value) + Number(allowed_tuitionFee_2.value)) {
//                 if (tuitionFee_remark_2.value == '--select--') {
//                     tuitionFee_remark_2.setCustomValidity("Please Fill this field");
//                     tuitionFee_remark_2.reportValidity();
//                     invalidField = tuitionFee_remark_2;
//                 }
//             }
//         }
        
//         if (saved_80c_houseLoan) {
//             if (!allowed_houseLoan_2.value) {
//                 allowed_houseLoan_2.setCustomValidity("Please Fill this field");
//                 allowed_houseLoan_2.reportValidity();
//                 invalidField = allowed_houseLoan_2;
//             } else if (Number(houseLoan.value) > Number(allowed_houseLoan.value) + Number(allowed_houseLoan_2.value)) {
//                 if (houseLoan_remark_2.value == '--select--') {
//                     houseLoan_remark_2.setCustomValidity("Please Fill this field");
//                     houseLoan_remark_2.reportValidity();
//                     invalidField = houseLoan_remark_2;
//                 }
//             }
//         }

//         if (saved_80c_ppfContribution) {
//             if (!allowed_ppfContribution_2.value) {
//                 allowed_ppfContribution_2.setCustomValidity("Please Fill this field");
//                 allowed_ppfContribution_2.reportValidity();
//                 invalidField = allowed_ppfContribution_2;
//             } else if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value) + Number(allowed_ppfContribution_2.value)) {
//                 if (ppfContribution_remark_2.value == '--select--') {
//                     ppfContribution_remark_2.setCustomValidity("Please Fill this field");
//                     ppfContribution_remark_2.reportValidity();
//                     invalidField = ppfContribution_remark_2;
//                 }
//             }
//         }

//         if (saved_80c_nscInterest) {
//             if (!allowed_nscInterest_2.value) {
//                 allowed_nscInterest_2.setCustomValidity("Please Fill this field");
//                 allowed_nscInterest_2.reportValidity();
//                 invalidField = allowed_nscInterest_2;
//             } else if (Number(nscInterest.value) > Number(allowed_nscInterest.value) + Number(allowed_nscInterest_2.value)) {
//                 if (nscInterest_remark_2.value == '--select--') {
//                     nscInterest_remark_2.setCustomValidity("Please Fill this field");
//                     nscInterest_remark_2.reportValidity();
//                     invalidField = nscInterest_remark_2;
//                 }
//             }
//         }
        
//         if (saved_80c_nscSubscription) {
//             if (!allowed_nscSubscription_2.value) {
//                 allowed_nscSubscription_2.setCustomValidity("Please Fill this field");
//                 allowed_nscSubscription_2.reportValidity();
//                 invalidField = allowed_nscSubscription_2;
//             } else if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value) + Number(allowed_nscSubscription_2.value)) {
//                 if (nscSubscription_remark_2.value == '--select--') {
//                     nscSubscription_remark_2.setCustomValidity("Please Fill this field");
//                     nscSubscription_remark_2.reportValidity();
//                     invalidField = nscSubscription_remark_2;
//                 }
//             }
//         }

//         if (saved_80c_ulipContribution) {
//             if (!allowed_ulipContribution_2.value) {
//                 allowed_ulipContribution_2.setCustomValidity("Please Fill this field");
//                 allowed_ulipContribution_2.reportValidity();
//                 invalidField = allowed_ulipContribution_2;
//             } else if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value) + Number(allowed_ulipContribution_2.value)) {
//                 if (ulipContribution_remark_2.value == '--select--') {
//                     ulipContribution_remark_2.setCustomValidity("Please Fill this field");
//                     ulipContribution_remark_2.reportValidity();
//                     invalidField = ulipContribution_remark_2;
//                 }
//             }
//         }
        
//         if (saved_80c_timeDeposit) {
//             if (!allowed_timeDeposit_2.value) {
//                 allowed_timeDeposit_2.setCustomValidity("Please Fill this field");
//                 allowed_timeDeposit_2.reportValidity();
//                 invalidField = allowed_timeDeposit_2;
//             } else if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value) + Number(allowed_timeDeposit_2.value)) {
//                 if (timeDeposit_remark_2.value == '--select--') {
//                     timeDeposit_remark_2.setCustomValidity("Please Fill this field");
//                     timeDeposit_remark_2.reportValidity();
//                     invalidField = timeDeposit_remark_2;
//                 }
//             }
//         }
        
//         if (saved_80c_payment) {
//             if (!allowed_paymentLifeInsurance_2.value) {
//                 allowed_paymentLifeInsurance_2.setCustomValidity("Please Fill this field");
//                 allowed_paymentLifeInsurance_2.reportValidity();
//                 invalidField = allowed_paymentLifeInsurance_2;
//             } else if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value) + Number(allowed_paymentLifeInsurance_2.value)) {
//                 if (paymentLifeInsurance_remark_2.value == '--select--') {
//                     paymentLifeInsurance_remark_2.setCustomValidity("Please Fill this field");
//                     paymentLifeInsurance_remark_2.reportValidity();
//                     invalidField = paymentLifeInsurance_remark_2;
//                 }
//             }
//         }

//         // 80 Other ============

//         if (saved_80ccd) {
//             if (!allowed_nps_80ccd1b_2.value) {
//                 allowed_nps_80ccd1b_2.setCustomValidity("Please fill this field");
//                 allowed_nps_80ccd1b_2.reportValidity();
//                 invalidField = allowed_nps_80ccd1b_2;
//             } else if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value) + Number(allowed_nps_80ccd1b_2.value)) {
//                 if (nps_80ccd1b_remark_2.value == '--select--') {
//                     nps_80ccd1b_remark_2.setCustomValidity("Please fill this field");
//                     nps_80ccd1b_remark_2.reportValidity();
//                     invalidField = nps_80ccd1b_remark_2;
//                 }
//             }
//         }

//         if (saved_80eeb) {
//             if (!allowed_vehicle_value_2.value) {
//                 allowed_vehicle_value_2.setCustomValidity("Please fill this field");
//                 allowed_vehicle_value_2.reportValidity();
//                 invalidField = allowed_vehicle_value_2;
//             } else if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value) + Number(allowed_vehicle_value_2.value)) {
//                 if (vehicle_value_remark_2.value == '--select--') {
//                     vehicle_value_remark_2.setCustomValidity("Please fill this field");
//                     vehicle_value_remark_2.reportValidity();
//                     invalidField = vehicle_value_remark_2;
//                 }
//             }
//         }

//         if (saved_self) {
//             if (!allowed_self_dis_2.value) {
//                 allowed_self_dis_2.setCustomValidity("Please fill this field");
//                 allowed_self_dis_2.reportValidity();
//                 invalidField = allowed_self_dis_2;
//             } else if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value) + Number(allowed_self_dis_2.value)) {
//                 if (allowed_self_remark_2.value == '--select--') {
//                     allowed_self_remark_2.setCustomValidity("Please fill this field");
//                     allowed_self_remark_2.reportValidity();
//                     invalidField = allowed_self_remark_2;
//                 }
//             }
//         }

//         if (saved_dependent) {
//             if (!allowed_Dependent_dis_2.value) {
//                 allowed_Dependent_dis_2.setCustomValidity("Please fill this field");
//                 allowed_Dependent_dis_2.reportValidity();
//                 invalidField = allowed_Dependent_dis_2;
//             } else if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value) + Number(allowed_Dependent_dis_2.value)) {
//                 if (allowed_Dependent_remark_2.value == '--select--') {
//                     allowed_Dependent_remark_2.setCustomValidity("Please fill this field");
//                     allowed_Dependent_remark_2.reportValidity();
//                     invalidField = allowed_Dependent_remark_2;
//                 }
//             }
//         }
        
//         if (saved_education) {
//             if (!allowed_interest_education_2.value) {
//                 allowed_interest_education_2.setCustomValidity("Please fill this field");
//                 allowed_interest_education_2.reportValidity();
//                 invalidField = allowed_interest_education_2;
//             } else if (Number(interest_education.value) > Number(allowed_interest_education.value) + Number(allowed_interest_education_2.value)) {
//                 if (interest_education_remark_2.value == '--select--') {
//                     interest_education_remark_2.setCustomValidity("Please fill this field");
//                     interest_education_remark_2.reportValidity();
//                     invalidField = interest_education_remark_2;
//                 }
//             }
//         }

//         if (saved_illness) {
//             if (!allowed_treatment_value_2.value) {
//                 allowed_treatment_value_2.setCustomValidity("Please fill this field");
//                 allowed_treatment_value_2.reportValidity();
//                 invalidField = allowed_treatment_value_2;
//             } else if (Number(treatment_value.value) > Number(allowed_treatment_value.value) + Number(allowed_treatment_value_2.value)) {
//                 if (treatment_value_remark_2.value == '--select--') {
//                     treatment_value_remark_2.setCustomValidity("Please fill this field");
//                     treatment_value_remark_2.reportValidity();
//                     invalidField = treatment_value_remark_2;
//                 }
//             }
//         }

//         if (saved_other80_preventive){
//             if (!allowed_health_checkup_2.value) {
//                 allowed_health_checkup_2.setCustomValidity("Please fill this field");
//                 allowed_health_checkup_2.reportValidity();
//                 invalidField = allowed_health_checkup_2;
//             } else if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value) + Number(allowed_health_checkup_2.value)) {
//                 if (health_checkup_remark_2.value == '--select--') {
//                     health_checkup_remark_2.setCustomValidity("Please fill this field");
//                     health_checkup_remark_2.reportValidity();
//                     invalidField = health_checkup_remark_2;
//                 }
//             }
//         }
//         if (saved_other80_senior){                        
//             if (!allowed_parents_mip_sn_2.value) {
//                 allowed_parents_mip_sn_2.setCustomValidity("Please fill this field");
//                 allowed_parents_mip_sn_2.reportValidity();
//                 invalidField = allowed_parents_mip_sn_2;
//             } else if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value) + Number(allowed_parents_mip_sn_2.value)) {
//                 if (parents_mip_sn_remark_2.value == '--select--') {
//                     parents_mip_sn_remark_2.setCustomValidity("Please fill this field");
//                     parents_mip_sn_remark_2.reportValidity();
//                     invalidField = parents_mip_sn_remark_2;
//                 }
//             } 
//         }
//         if (saved_other80_parent){                    
//             if (!allowed_parents_mip_nsn_2.value) {
//                 allowed_parents_mip_nsn_2.setCustomValidity("Please fill this field");
//                 allowed_parents_mip_nsn_2.reportValidity();
//                 invalidField = allowed_parents_mip_nsn_2;
//             } else if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value) + Number(allowed_parents_mip_nsn_2.value)) {
//                 if (parents_mip_nsn_remark_2.value == '--select--') {
//                     parents_mip_nsn_remark_2.setCustomValidity("Please fill this field");
//                     parents_mip_nsn_remark_2.reportValidity();
//                     invalidField = parents_mip_nsn_remark_2;
//                 }
//             } 
//         }

//         if (saved_other80_med) {    
//             if (!allowed_medical_insurance_2.value) {
//                 allowed_medical_insurance_2.setCustomValidity("Please fill this field");
//                 allowed_medical_insurance_2.reportValidity();
//                 invalidField = allowed_medical_insurance_2;
//             } else if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value) + Number(allowed_medical_insurance_2.value)) {
//                 if (medical_insurance_remark_2.value == '--select--') {
//                     medical_insurance_remark_2.setCustomValidity("Please fill this field");
//                     medical_insurance_remark_2.reportValidity();
//                     invalidField = medical_insurance_remark_2;
//                 }
//             }         
//         }  
        
//         // Income/Loss========

//         if (saved_Ilhp_80tta) {
//             if (!allowed_interest_80tta_2.value) {
//                 allowed_interest_80tta_2.setCustomValidity("Please fill this field");
//                 allowed_interest_80tta_2.reportValidity();
//                 invalidField = allowed_interest_80tta_2;
//             } else if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value) + Number(allowed_interest_80tta_2.value)) {
//                 if (interest_80tta_remark_2.value == '--select--') {
//                     interest_80tta_remark_2.setCustomValidity("Please fill this field");
//                     interest_80tta_remark_2.reportValidity();
//                     invalidField = interest_80tta_remark_2;
//                 }
//             }
//         }

//         if (saved_Ilhp_otherincome) {
//             if (!allowed_other_income_oi_2.value) {
//                 allowed_other_income_oi_2.setCustomValidity("Please fill this field");
//                 allowed_other_income_oi_2.reportValidity();
//                 invalidField = allowed_other_income_oi_2;
//             } else if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value) + Number(allowed_other_income_oi_2.value)) {
//                 if (other_income_oi_remark_2.value == '--select--') {
//                     other_income_oi_remark_2.setCustomValidity("Please fill this field");
//                     other_income_oi_remark_2.reportValidity();
//                     invalidField = other_income_oi_remark_2;
//                 }
//             }
//         }

//         if (saved_Ilhp_80EEA) {
//             if (!allowed_property_value_other_2.value) {
//                 allowed_property_value_other_2.setCustomValidity("Please fill this field");
//                 allowed_property_value_other_2.reportValidity();
//                 invalidField = allowed_property_value_other_2;
//             } else if (Number(property_value_other.value) > Number(allowed_property_value_other.value) + Number(allowed_property_value_other_2.value)) {
//                 if (property_value_other_remark_2.value == '--select--') {
//                     property_value_other_remark_2.setCustomValidity("Please fill this field");
//                     property_value_other_remark_2.reportValidity();
//                     invalidField = property_value_other_remark_2;
//                 }
//             }
//         }

//         if (saved_Ilhp_80EE) {

//             if (!allowed_home_loan_2.value) {
//                 allowed_home_loan_2.setCustomValidity("Please fill this field");
//                 allowed_home_loan_2.reportValidity();
//                 invalidField = allowed_home_loan_2;
//             } else if (Number(home_loan.value) > Number(allowed_home_loan.value) + Number(allowed_home_loan_2.value)) {
//                 if (home_loan_remark_2.value == '--select--') {
//                     home_loan_remark_2.setCustomValidity("Please fill this field");
//                     home_loan_remark_2.reportValidity();
//                     invalidField = home_loan_remark_2;
//                 }
//             }
            
//             if (!allowed_property_value_2.value) {
//                 allowed_property_value_2.setCustomValidity("Please fill this field");
//                 allowed_property_value_2.reportValidity();
//                 invalidField = allowed_property_value_2;
//             } else if (Number(property_value.value) > Number(allowed_property_value.value) + Number(allowed_property_value_2.value)) {
//                 if (property_value_remark_2.value == '--select--') {
//                     property_value_remark_2.setCustomValidity("Please fill this field");
//                     property_value_remark_2.reportValidity();
//                     invalidField = property_value_remark_2;
//                 }
//             }

//             if (!allowed_loan_amount_2.value) {
//                 allowed_loan_amount_2.setCustomValidity("Please fill this field");
//                 allowed_loan_amount_2.reportValidity();
//                 invalidField = allowed_loan_amount_2;
//             } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value) + Number(allowed_loan_amount_2.value)) {
//                 if (loan_amount_remark_2.value == '--select--') {
//                     loan_amount_remark_2.setCustomValidity("Please fill this field");
//                     loan_amount_remark_2.reportValidity();
//                     invalidField = loan_amount_remark_2;
//                 }
//             }

             

            
//         }
    
//         if (saved_Ilhp_letout) {
            
//             if (!allowed_standardDeduction_2.value) {
//                 allowed_standardDeduction_2.setCustomValidity("Please fill this field");
//                 allowed_standardDeduction_2.reportValidity();
//                 invalidField = allowed_standardDeduction_2;
//             } else if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value) + Number(allowed_standardDeduction_2.value)) {
//                 if (allowed_standardDeduction_remark_2.value == '--select--') {
//                     allowed_standardDeduction_remark_2.setCustomValidity("Please fill this field");
//                     allowed_standardDeduction_remark_2.reportValidity();
//                     invalidField = allowed_standardDeduction_remark_2;
//                 }
//             }
            
//             if (!allowed_incomeLossOnHouseProperty_2.value) {
//                 allowed_incomeLossOnHouseProperty_2.setCustomValidity("Please fill this field");
//                 allowed_incomeLossOnHouseProperty_2.reportValidity();
//                 invalidField = allowed_incomeLossOnHouseProperty_2;
//             } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value) + Number(allowed_incomeLossOnHouseProperty_2.value)) {
//                 if (allowed_incomeLossOnHouseProperty_remark_2.value == '--select--') {
//                     allowed_incomeLossOnHouseProperty_remark_2.setCustomValidity("Please fill this field");
//                     allowed_incomeLossOnHouseProperty_remark_2.reportValidity();
//                     invalidField = allowed_incomeLossOnHouseProperty_remark_2;
//                 }
//             } 

//             if (!allowed_homeLoanInterest_2.value) {
//                 allowed_homeLoanInterest_2.setCustomValidity("Please fill this field");
//                 allowed_homeLoanInterest_2.reportValidity();
//                 invalidField = allowed_homeLoanInterest_2;
//             } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value) + Number(allowed_homeLoanInterest_2.value)) {
//                 if (allowed_homeLoanInterest_remark_2.value == '--select--') {
//                     allowed_homeLoanInterest_remark_2.setCustomValidity("Please fill this field");
//                     allowed_homeLoanInterest_remark_2.reportValidity();
//                     invalidField = allowed_homeLoanInterest_remark_2;
//                 }
//             } 

//             if (!allowed_municipalPropertyTax_2.value) {
//                 allowed_municipalPropertyTax_2.setCustomValidity("Please fill this field");
//                 allowed_municipalPropertyTax_2.reportValidity();
//                 invalidField = allowed_municipalPropertyTax_2;
//             } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value) + Number(allowed_municipalPropertyTax_2.value)) {
//                 if (allowed_municipalPropertyTax_remark_2.value == '--select--') {
//                     allowed_municipalPropertyTax_remark_2.setCustomValidity("Please fill this field");
//                     allowed_municipalPropertyTax_remark_2.reportValidity();
//                     invalidField = allowed_municipalPropertyTax_remark_2;
//                 }
//             } 
            
//             if (!allowed_annualLettableValue_2.value) {
//                 allowed_annualLettableValue_2.setCustomValidity("Please fill this field");
//                 allowed_annualLettableValue_2.reportValidity();
//                 invalidField = allowed_annualLettableValue_2;
//             } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value) + Number(allowed_annualLettableValue_2.value)) {
//                 if (allowed_annualLettableValue_remark_2.value == '--select--') {
//                     allowed_annualLettableValue_remark_2.setCustomValidity("Please fill this field");
//                     allowed_annualLettableValue_remark_2.reportValidity();
//                     invalidField = allowed_annualLettableValue_remark_2;
//                 }
//             }  

            
            
//         }

//         if (saved_Ilhp_self) {
//             if (!allowed_self_2.value) {
//                 allowed_self_2.setCustomValidity("Please fill this field");
//                 allowed_self_2.reportValidity();
//                 invalidField = allowed_self_2;
//             } else if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value) + Number(allowed_self_2.value)) {
//                 if (self_remark_2.value == '--select--') {
//                     self_remark_2.setCustomValidity("Please fill this field");
//                     self_remark_2.reportValidity();
//                     invalidField = self_remark_2;
//                 }
//             }
//         }

//         // HRA=======

        
//         if (itd5stdt_value) {                        
//             if (Number(itd5.value) > Number(allow_rent_5.value) + Number(allow_rent_5_2.value)) {
//                 if (hra_remark_5_2.value == '--select--') {
//                     hra_remark_5_2.setCustomValidity("Please fill this field");
//                     hra_remark_5_2.reportValidity();
//                     invalidField = hra_remark_5_2;
//                 }
//             }
            
//             if (!allow_rent_5_2.value) {
//                 allow_rent_5_2.setCustomValidity("Please fill this field");
//                 allow_rent_5_2.reportValidity();
//                 invalidField = allow_rent_5_2;
//             }
//             if (!ita5enddt_2.value) {
//                 ita5enddt_2.setCustomValidity("Please fill this field");
//                 ita5enddt_2.reportValidity();
//                 invalidField = ita5enddt_2;
//             }
            
//         }
        
//         if (itd4stdt_value) {
//             if (Number(itd4.value) > Number(allow_rent_4.value) + Number(allow_rent_4_2.value)) {
//                 if (hra_remark_4_2.value == '--select--') {
//                     hra_remark_4_2.setCustomValidity("Please fill this field");
//                     hra_remark_4_2.reportValidity();
//                     invalidField = hra_remark_4_2;
//                 }
//             }
             
//             if (!allow_rent_4_2.value) {
//                 allow_rent_4_2.setCustomValidity("Please fill this field");
//                 allow_rent_4_2.reportValidity();
//                 invalidField = allow_rent_4_2;
//             } 
//             if (!ita4enddt_2.value) {
//                 ita4enddt_2.setCustomValidity("Please fill this field");
//                 ita4enddt_2.reportValidity();
//                 invalidField = ita4enddt_2;
//             }
            
            
            
//         }

//         if (itd3stdt_value) {
//             if (Number(itd3.value) > Number(allow_rent_3.value) + Number(allow_rent_3_2.value)) {
//                 if (hra_remark_3_2.value == '--select--') {
//                     hra_remark_3_2.setCustomValidity("Please fill this field");
//                     hra_remark_3_2.reportValidity();
//                     invalidField = hra_remark_3_2;
//                 }
//             }
              
//             if (!allow_rent_3_2.value) {
//                 allow_rent_3_2.setCustomValidity("Please fill this field");
//                 allow_rent_3_2.reportValidity();
//                 invalidField = allow_rent_3_2;
//             } 
//             if (!ita3enddt_2.value) {
//                 ita3enddt_2.setCustomValidity("Please fill this field");
//                 ita3enddt_2.reportValidity();
//                 invalidField = ita3enddt_2;
//             }                                      
//         }

//         if (itd2stdt_value) {
//             if (Number(itd2.value) > Number(allow_rent_2.value) + Number(allow_rent_2_2.value)) {
//                 if (hra_remark_2_2.value == '--select--') {
//                     hra_remark_2_2.setCustomValidity("Please fill this field");
//                     hra_remark_2_2.reportValidity();
//                     invalidField = hra_remark_2_2;
//                 }
//             }
             
//             if (!allow_rent_2_2.value) {
//                 allow_rent_2_2.setCustomValidity("Please fill this field");
//                 allow_rent_2_2.reportValidity();
//                 invalidField = allow_rent_2_2;
//             }
//             if (!ita2enddt_2.value) {
//                 ita2enddt_2.setCustomValidity("Please fill this field");
//                 ita2enddt_2.reportValidity();
//                 invalidField = ita2enddt_2;
//             }                                 
//         }

//         if (itd1stdt_value) {
//             if (Number(itd1.value) > Number(allow_rent_1.value) + Number(allow_rent_1_2.value)) {
//                 if (hra_remark_1_2.value == '--select--') {
//                     hra_remark_1_2.setCustomValidity("Please fill this field");
//                     hra_remark_1_2.reportValidity();
//                     invalidField = hra_remark_1_2;
//                 }
//             }
            
//             if (!allow_rent_1_2.value) {
//                 allow_rent_1_2.setCustomValidity("Please fill this field");
//                 allow_rent_1_2.reportValidity();
//                 invalidField = allow_rent_1_2;
//             } 
//             if (!ita1enddt_2.value) {
//                 ita1enddt_2.setCustomValidity("Please fill this field");
//                 ita1enddt_2.reportValidity();
//                 invalidField = ita1enddt_2;
//             }      
//         }  

//         if (invalidField) {
//             invalidField.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'center'
//             });
//         }  

//     }
// }


// function Submitdata_fun_2() {
//     if (Submitdata_3.disabled == false) {        
//         basic_form_formdata = new FormData(document.getElementById("basic_form"));

//         custom_re_formdata = new FormData(document.getElementById("custom_re"));
//         for (let [key, value] of custom_re_formdata.entries()) {
//             basic_form_formdata.append(key, value);
//         }

//         if (saved_hra_new) {
//             hra_form_formdata = new FormData(document.getElementById("hra_form"));
//             for (let [key, value] of hra_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }
//         if (saved_Ilhp_new) {
//             ilh_form_formdata = new FormData(document.getElementById("ilh_form"));
//             for (let [key, value] of ilh_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_other80_new) {
//             other80_form_formdata = new FormData(document.getElementById("other80_form"));
//             for (let [key, value] of other80_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_80c_new) {
//             _80C_form_formdata = new FormData(document.getElementById("_80C_form"));
//             for (let [key, value] of _80C_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }

//         if (saved_previous_emp) {
//             previousemp_form_formdata = new FormData(document.getElementById("previousemp_form"));
//             for (let [key, value] of previousemp_form_formdata.entries()) {
//                 basic_form_formdata.append(key, value);
//             }
//         }



//         let combinedFormData = new FormData();

//         for (let [key, value] of basic_form_formdata.entries()) {
//             combinedFormData.append(key, value);
//         }

//         let apiUrl = "submit_checker_3";


//         let hiddenForm = document.createElement('form');
//         hiddenForm.style.display = 'none';
//         hiddenForm.action = apiUrl;
//         hiddenForm.method = 'POST';


//         for (let [key, value] of combinedFormData.entries()) {
//             let input = document.createElement('input');
//             input.type = 'hidden';
//             input.name = key;
//             input.value = value;
//             hiddenForm.appendChild(input);
//         }
//         document.body.appendChild(hiddenForm);
//         hiddenForm.submit();
//     } else {        
    
//         let invalidField = null;

//         if (ver_level_2.checked == false) {
//             ver_level_2.setCustomValidity("Please Check this field");
//             ver_level_2.reportValidity();
//             invalidField = ver_level_2;
//         }

//         if (!custom_remark.value) {
//             custom_remark.setCustomValidity("Please fill this field");
//             custom_remark.reportValidity();
//             invalidField = custom_remark;
//         }
//         // Previous============
        
//         if (saved_previous_emp) {

//             if (!allowed_income_tax_3.value) {
//                 allowed_income_tax_3.setCustomValidity("Please Fill this field");
//                 allowed_income_tax_3.reportValidity();
//                 invalidField = allowed_income_tax_3;
//             } else if (Number(income_tax.value) != Number(allowed_income_tax_3.value)) {
//                 if (income_tax_remark_3.value == '--select--') {
//                     income_tax_remark_3.setCustomValidity("Please Fill this field");
//                     income_tax_remark_3.reportValidity();
//                     invalidField = income_tax_remark_3;
//                 }
//             }
            
//             if (!allowed_provident_fund_3.value) {
//                 allowed_provident_fund_3.setCustomValidity("Please Fill this field");
//                 allowed_provident_fund_3.reportValidity();
//                 invalidField = allowed_provident_fund_3;
//             } else if (Number(provident_fund.value) != Number(allowed_provident_fund_3.value)) {
//                 if (provident_fund_remark_3.value == '--select--') {
//                     provident_fund_remark_3.setCustomValidity("Please Fill this field");
//                     provident_fund_remark_3.reportValidity();
//                     invalidField = provident_fund_remark_3;
//                 }
//             } 

//             if (!allowed_professional_tax_3.value) {
//                 allowed_professional_tax_3.setCustomValidity("Please Fill this field");
//                 allowed_professional_tax_3.reportValidity();
//                 invalidField = allowed_professional_tax_3;
//             } else if (Number(professional_tax.value) != Number(allowed_professional_tax_3.value)) {
//                 if (professional_tax_remark_3.value == '--select--') {
//                     professional_tax_remark_3.setCustomValidity("Please Fill this field");
//                     professional_tax_remark_3.reportValidity();
//                     invalidField = professional_tax_remark_3;
//                 }
//             }

//             if (!allowed_salary_previousemp_3.value) {
//                 allowed_salary_previousemp_3.setCustomValidity("Please Fill this field");
//                 allowed_salary_previousemp_3.reportValidity();
//                 invalidField = allowed_salary_previousemp_3;
//             } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp_3.value)) {
//                 if (salary_previousemp_remark_3.value == '--select--') {
//                     salary_previousemp_remark_3.setCustomValidity("Please Fill this field");
//                     salary_previousemp_remark_3.reportValidity();
//                     invalidField = salary_previousemp_remark_3;
//                 }
//             }                            
//         } 
       
//         // 80C
//         if (saved_80c_sukanyaSamriddhi) {
//             if (!allowed_sukanyaSamriddhi_3.value) {
//                 allowed_sukanyaSamriddhi_3.setCustomValidity("Please Fill this field");
//                 allowed_sukanyaSamriddhi_3.reportValidity();
//                 invalidField = allowed_sukanyaSamriddhi_3;
//             } else if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value) + Number(allowed_sukanyaSamriddhi_2.value) + Number(allowed_sukanyaSamriddhi_3.value)) {
//                 if (sukanyaSamriddhi_remark_3.value == '--select--') {
//                     sukanyaSamriddhi_remark_3.setCustomValidity("Please Fill this field");
//                     sukanyaSamriddhi_remark_3.reportValidity();
//                     invalidField = sukanyaSamriddhi_remark_3;
//                 }
//             }
//         }

//         if (saved_80c_pensionContribution) {
//             if (!allowed_pensionContribution_3.value) {
//                 allowed_pensionContribution_3.setCustomValidity("Please Fill this field");
//                 allowed_pensionContribution_3.reportValidity();
//                 invalidField = allowed_pensionContribution_3;
//             } else if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value) + Number(allowed_pensionContribution_2.value) + Number(allowed_pensionContribution_3.value)) {
//                 if (pensionContribution_remark_3.value == '--select--') {
//                     pensionContribution_remark_3.setCustomValidity("Please Fill this field");
//                     pensionContribution_remark_3.reportValidity();
//                     invalidField = pensionContribution_remark_3;
//                 }
//             }
//         }
    
//         if (saved_80c_termDeposits) {
//             if (!allowed_termDeposits_3.value) {
//                 allowed_termDeposits_3.setCustomValidity("Please Fill this field");
//                 allowed_termDeposits_3.reportValidity();
//                 invalidField = allowed_termDeposits_3;
//             } else if (Number(termDeposits.value) > Number(allowed_termDeposits.value) + Number(allowed_termDeposits_2.value) + Number(allowed_termDeposits_3.value)) {
//                 if (termDeposits_remark_3.value == '--select--') {
//                     termDeposits_remark_3.setCustomValidity("Please Fill this field");
//                     termDeposits_remark_3.reportValidity();
//                     invalidField = termDeposits_remark_3;
//                 }
//             }
//         }

//         if (saved_80c_mutualFundSubscription) {
//             if (!allowed_mutualFundSubscription_3.value) {
//                 allowed_mutualFundSubscription_3.setCustomValidity("Please Fill this field");
//                 allowed_mutualFundSubscription_3.reportValidity();
//                 invalidField = allowed_mutualFundSubscription_3;
//             } else if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value) + Number(allowed_mutualFundSubscription_2.value) + Number(allowed_mutualFundSubscription_3.value)) {
//                 if (mutualFundSubscription_remark_3.value == '--select--') {
//                     mutualFundSubscription_remark_3.setCustomValidity("Please Fill this field");
//                     mutualFundSubscription_remark_3.reportValidity();
//                     invalidField = mutualFundSubscription_remark_3;
//                 }
//             }
//         }
    
//         if (saved_80c_tuitionFee) {
//             if (!allowed_tuitionFee_3.value) {
//                 allowed_tuitionFee_3.setCustomValidity("Please Fill this field");
//                 allowed_tuitionFee_3.reportValidity();
//                 invalidField = allowed_tuitionFee_3;
//             } else if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value) + Number(allowed_tuitionFee_2.value) + Number(allowed_tuitionFee_3.value)) {
//                 if (tuitionFee_remark_3.value == '--select--') {
//                     tuitionFee_remark_3.setCustomValidity("Please Fill this field");
//                     tuitionFee_remark_3.reportValidity();
//                     invalidField = tuitionFee_remark_3;
//                 }
//             }
//         }
        
//         if (saved_80c_houseLoan) {
//             if (!allowed_houseLoan_3.value) {
//                 allowed_houseLoan_3.setCustomValidity("Please Fill this field");
//                 allowed_houseLoan_3.reportValidity();
//                 invalidField = allowed_houseLoan_3;
//             } else if (Number(houseLoan.value) > Number(allowed_houseLoan.value) + Number(allowed_houseLoan_2.value) + Number(allowed_houseLoan_3.value)) {
//                 if (houseLoan_remark_3.value == '--select--') {
//                     houseLoan_remark_3.setCustomValidity("Please Fill this field");
//                     houseLoan_remark_3.reportValidity();
//                     invalidField = houseLoan_remark_3;
//                 }
//             }
//         }

//         if (saved_80c_ppfContribution) {
//             if (!allowed_ppfContribution_3.value) {
//                 allowed_ppfContribution_3.setCustomValidity("Please Fill this field");
//                 allowed_ppfContribution_3.reportValidity();
//                 invalidField = allowed_ppfContribution_3;
//             } else if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value) + Number(allowed_ppfContribution_2.value) + Number(allowed_ppfContribution_3.value)) {
//                 if (ppfContribution_remark_3.value == '--select--') {
//                     ppfContribution_remark_3.setCustomValidity("Please Fill this field");
//                     ppfContribution_remark_3.reportValidity();
//                     invalidField = ppfContribution_remark_3;
//                 }
//             }
//         }

//         if (saved_80c_nscInterest) {
//             if (!allowed_nscInterest_3.value) {
//                 allowed_nscInterest_3.setCustomValidity("Please Fill this field");
//                 allowed_nscInterest_3.reportValidity();
//                 invalidField = allowed_nscInterest_3;
//             } else if (Number(nscInterest.value) > Number(allowed_nscInterest.value) + Number(allowed_nscInterest_2.value) + Number(allowed_nscInterest_3.value)) {
//                 if (nscInterest_remark_3.value == '--select--') {
//                     nscInterest_remark_3.setCustomValidity("Please Fill this field");
//                     nscInterest_remark_3.reportValidity();
//                     invalidField = nscInterest_remark_3;
//                 }
//             }
//         }
        
//         if (saved_80c_nscSubscription) {
//             if (!allowed_nscSubscription_3.value) {
//                 allowed_nscSubscription_3.setCustomValidity("Please Fill this field");
//                 allowed_nscSubscription_3.reportValidity();
//                 invalidField = allowed_nscSubscription_3;
//             } else if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value) + Number(allowed_nscSubscription_2.value) + Number(allowed_nscSubscription_3.value)) {
//                 if (nscSubscription_remark_3.value == '--select--') {
//                     nscSubscription_remark_3.setCustomValidity("Please Fill this field");
//                     nscSubscription_remark_3.reportValidity();
//                     invalidField = nscSubscription_remark_3;
//                 }
//             }
//         }

//         if (saved_80c_ulipContribution) {
//             if (!allowed_ulipContribution_3.value) {
//                 allowed_ulipContribution_3.setCustomValidity("Please Fill this field");
//                 allowed_ulipContribution_3.reportValidity();
//                 invalidField = allowed_ulipContribution_3;
//             } else if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value) + Number(allowed_ulipContribution_2.value) + Number(allowed_ulipContribution_3.value)) {
//                 if (ulipContribution_remark_3.value == '--select--') {
//                     ulipContribution_remark_3.setCustomValidity("Please Fill this field");
//                     ulipContribution_remark_3.reportValidity();
//                     invalidField = ulipContribution_remark_3;
//                 }
//             }
//         }
        
//         if (saved_80c_timeDeposit) {
//             if (!allowed_timeDeposit_3.value) {
//                 allowed_timeDeposit_3.setCustomValidity("Please Fill this field");
//                 allowed_timeDeposit_3.reportValidity();
//                 invalidField = allowed_timeDeposit_3;
//             } else if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value) + Number(allowed_timeDeposit_2.value) + Number(allowed_timeDeposit_3.value)) {
//                 if (timeDeposit_remark_3.value == '--select--') {
//                     timeDeposit_remark_3.setCustomValidity("Please Fill this field");
//                     timeDeposit_remark_3.reportValidity();
//                     invalidField = timeDeposit_remark_3;
//                 }
//             }
//         }
        
//         if (saved_80c_payment) {
//             if (!allowed_paymentLifeInsurance_3.value) {
//                 allowed_paymentLifeInsurance_3.setCustomValidity("Please Fill this field");
//                 allowed_paymentLifeInsurance_3.reportValidity();
//                 invalidField = allowed_paymentLifeInsurance_3;
//             } else if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value) + Number(allowed_paymentLifeInsurance_2.value) + Number(allowed_paymentLifeInsurance_3.value)) {
//                 if (paymentLifeInsurance_remark_3.value == '--select--') {
//                     paymentLifeInsurance_remark_3.setCustomValidity("Please Fill this field");
//                     paymentLifeInsurance_remark_3.reportValidity();
//                     invalidField = paymentLifeInsurance_remark_3;
//                 }
//             }
//         }

//         // 80 Other ============

//         if (saved_80ccd) {
//             if (!allowed_nps_80ccd1b_3.value) {
//                 allowed_nps_80ccd1b_3.setCustomValidity("Please fill this field");
//                 allowed_nps_80ccd1b_3.reportValidity();
//                 invalidField = allowed_nps_80ccd1b_3;
//             } else if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value) + Number(allowed_nps_80ccd1b_2.value) + Number(allowed_nps_80ccd1b_3.value)) {
//                 if (nps_80ccd1b_remark_3.value == '--select--') {
//                     nps_80ccd1b_remark_3.setCustomValidity("Please fill this field");
//                     nps_80ccd1b_remark_3.reportValidity();
//                     invalidField = nps_80ccd1b_remark_3;
//                 }
//             }
//         }

//         if (saved_80eeb) {
//             if (!allowed_vehicle_value_3.value) {
//                 allowed_vehicle_value_3.setCustomValidity("Please fill this field");
//                 allowed_vehicle_value_3.reportValidity();
//                 invalidField = allowed_vehicle_value_3;
//             } else if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value) + Number(allowed_vehicle_value_2.value) + Number(allowed_vehicle_value_3.value)) {
//                 if (vehicle_value_remark_3.value == '--select--') {
//                     vehicle_value_remark_3.setCustomValidity("Please fill this field");
//                     vehicle_value_remark_3.reportValidity();
//                     invalidField = vehicle_value_remark_3;
//                 }
//             }
//         }

//         if (saved_self) {
//             if (!allowed_self_dis_3.value) {
//                 allowed_self_dis_3.setCustomValidity("Please fill this field");
//                 allowed_self_dis_3.reportValidity();
//                 invalidField = allowed_self_dis_3;
//             } else if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value) + Number(allowed_self_dis_2.value) + Number(allowed_self_dis_3.value)) {
//                 if (allowed_self_remark_3.value == '--select--') {
//                     allowed_self_remark_3.setCustomValidity("Please fill this field");
//                     allowed_self_remark_3.reportValidity();
//                     invalidField = allowed_self_remark_3;
//                 }
//             }
//         }

//         if (saved_dependent) {
//             if (!allowed_Dependent_dis_3.value) {
//                 allowed_Dependent_dis_3.setCustomValidity("Please fill this field");
//                 allowed_Dependent_dis_3.reportValidity();
//                 invalidField = allowed_Dependent_dis_3;
//             } else if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value) + Number(allowed_Dependent_dis_2.value) + Number(allowed_Dependent_dis_3.value)) {
//                 if (allowed_Dependent_remark_3.value == '--select--') {
//                     allowed_Dependent_remark_3.setCustomValidity("Please fill this field");
//                     allowed_Dependent_remark_3.reportValidity();
//                     invalidField = allowed_Dependent_remark_3;
//                 }
//             }
//         }
        
//         if (saved_education) {
//             if (!allowed_interest_education_3.value) {
//                 allowed_interest_education_3.setCustomValidity("Please fill this field");
//                 allowed_interest_education_3.reportValidity();
//                 invalidField = allowed_interest_education_3;
//             } else if (Number(interest_education.value) > Number(allowed_interest_education.value) + Number(allowed_interest_education_2.value) + Number(allowed_interest_education_3.value)) {
//                 if (interest_education_remark_3.value == '--select--') {
//                     interest_education_remark_3.setCustomValidity("Please fill this field");
//                     interest_education_remark_3.reportValidity();
//                     invalidField = interest_education_remark_3;
//                 }
//             }
//         }

//         if (saved_illness) {
//             if (!allowed_treatment_value_3.value) {
//                 allowed_treatment_value_3.setCustomValidity("Please fill this field");
//                 allowed_treatment_value_3.reportValidity();
//                 invalidField = allowed_treatment_value_3;
//             } else if (Number(treatment_value.value) > Number(allowed_treatment_value.value) + Number(allowed_treatment_value_2.value) + Number(allowed_treatment_value_3.value)) {
//                 if (treatment_value_remark_3.value == '--select--') {
//                     treatment_value_remark_3.setCustomValidity("Please fill this field");
//                     treatment_value_remark_3.reportValidity();
//                     invalidField = treatment_value_remark_3;
//                 }
//             }
//         }

//         if (saved_other80_preventive){
            
//             if (!allowed_health_checkup_3.value) {
//                 allowed_health_checkup_3.setCustomValidity("Please fill this field");
//                 allowed_health_checkup_3.reportValidity();
//                 invalidField = allowed_health_checkup_3;
//             } else if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value) + Number(allowed_health_checkup_2.value) + Number(allowed_health_checkup_3.value)) {
//                 if (health_checkup_remark_3.value == '--select--') {
//                     health_checkup_remark_3.setCustomValidity("Please fill this field");
//                     health_checkup_remark_3.reportValidity();
//                     invalidField = health_checkup_remark_3;
//                 }
//             }
            
//         }

//         if (saved_other80_senior){
            
//             if (!allowed_parents_mip_sn_3.value) {
//                 allowed_parents_mip_sn_3.setCustomValidity("Please fill this field");
//                 allowed_parents_mip_sn_3.reportValidity();
//                 invalidField = allowed_parents_mip_sn_3;
//             } else if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value) + Number(allowed_parents_mip_sn_2.value) + Number(allowed_parents_mip_sn_3.value)) {
//                 if (parents_mip_sn_remark_3.value == '--select--') {
//                     parents_mip_sn_remark_3.setCustomValidity("Please fill this field");
//                     parents_mip_sn_remark_3.reportValidity();
//                     invalidField = parents_mip_sn_remark_3;
//                 }
//             } 
//         }

//         if (saved_other80_parent){           
            
//             if (!allowed_parents_mip_nsn_3.value) {
//                 allowed_parents_mip_nsn_3.setCustomValidity("Please fill this field");
//                 allowed_parents_mip_nsn_3.reportValidity();
//                 invalidField = allowed_parents_mip_nsn_3;
//             } else if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value) + Number(allowed_parents_mip_nsn_2.value) + Number(allowed_parents_mip_nsn_3.value)) {
//                 if (parents_mip_nsn_remark_3.value == '--select--') {
//                     parents_mip_nsn_remark_3.setCustomValidity("Please fill this field");
//                     parents_mip_nsn_remark_3.reportValidity();
//                     invalidField = parents_mip_nsn_remark_3;
//                 }
//             } 

//         }

//         if (saved_other80_med) {    
            
//             if (!allowed_medical_insurance_3.value) {
//                 allowed_medical_insurance_3.setCustomValidity("Please fill this field");
//                 allowed_medical_insurance_3.reportValidity();
//                 invalidField = allowed_medical_insurance_3;
//             } else if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value) + Number(allowed_medical_insurance_2.value) + Number(allowed_medical_insurance_3.value)) {
//                 if (medical_insurance_remark_3.value == '--select--') {
//                     medical_insurance_remark_3.setCustomValidity("Please fill this field");
//                     medical_insurance_remark_3.reportValidity();
//                     invalidField = medical_insurance_remark_3;
//                 }
//             } 
            
//         }  
        
//         // Income/Loss========

//         if (saved_Ilhp_80tta) {
//             if (!allowed_interest_80tta_3.value) {
//                 allowed_interest_80tta_3.setCustomValidity("Please fill this field");
//                 allowed_interest_80tta_3.reportValidity();
//                 invalidField = allowed_interest_80tta_3;
//             } else if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value) + Number(allowed_interest_80tta_2.value) + Number(allowed_interest_80tta_3.value)) {
//                 if (interest_80tta_remark_3.value == '--select--') {
//                     interest_80tta_remark_3.setCustomValidity("Please fill this field");
//                     interest_80tta_remark_3.reportValidity();
//                     invalidField = interest_80tta_remark_3;
//                 }
//             }
//         }

//         if (saved_Ilhp_otherincome) {
//             if (!allowed_other_income_oi_3.value) {
//                 allowed_other_income_oi_3.setCustomValidity("Please fill this field");
//                 allowed_other_income_oi_3.reportValidity();
//                 invalidField = allowed_other_income_oi_3;
//             } else if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value) + Number(allowed_other_income_oi_2.value) + Number(allowed_other_income_oi_3.value)) {
//                 if (other_income_oi_remark_3.value == '--select--') {
//                     other_income_oi_remark_3.setCustomValidity("Please fill this field");
//                     other_income_oi_remark_3.reportValidity();
//                     invalidField = other_income_oi_remark_3;
//                 }
//             }
//         }

//         if (saved_Ilhp_80EEA) {
//             if (!allowed_property_value_other_3.value) {
//                 allowed_property_value_other_3.setCustomValidity("Please fill this field");
//                 allowed_property_value_other_3.reportValidity();
//                 invalidField = allowed_property_value_other_3;
//             } else if (Number(property_value_other.value) > Number(allowed_property_value_other.value) + Number(allowed_property_value_other_2.value) + Number(allowed_property_value_other_3.value)) {
//                 if (property_value_other_remark_3.value == '--select--') {
//                     property_value_other_remark_3.setCustomValidity("Please fill this field");
//                     property_value_other_remark_3.reportValidity();
//                     invalidField = property_value_other_remark_3;
//                 }
//             }
//         }

//         if (saved_Ilhp_80EE) {

//             if (!allowed_home_loan_3.value) {
//                 allowed_home_loan_3.setCustomValidity("Please fill this field");
//                 allowed_home_loan_3.reportValidity();
//                 invalidField = allowed_home_loan_3;
//             } else if (Number(home_loan.value) > Number(allowed_home_loan.value) + Number(allowed_home_loan_2.value) + Number(allowed_home_loan_3.value)) {
//                 if (home_loan_remark_3.value == '--select--') {
//                     home_loan_remark_3.setCustomValidity("Please fill this field");
//                     home_loan_remark_3.reportValidity();
//                     invalidField = home_loan_remark_3;
//                 }
//             }
            
//             if (!allowed_property_value_3.value) {
//                 allowed_property_value_3.setCustomValidity("Please fill this field");
//                 allowed_property_value_3.reportValidity();
//                 invalidField = allowed_property_value_3;
//             } else if (Number(property_value.value) > Number(allowed_property_value.value) + Number(allowed_property_value_2.value) + Number(allowed_property_value_3.value)) {
//                 if (property_value_remark_3.value == '--select--') {
//                     property_value_remark_3.setCustomValidity("Please fill this field");
//                     property_value_remark_3.reportValidity();
//                     invalidField = property_value_remark_3;
//                 }
//             }

//             if (!allowed_loan_amount_3.value) {
//                 allowed_loan_amount_3.setCustomValidity("Please fill this field");
//                 allowed_loan_amount_3.reportValidity();
//                 invalidField = allowed_loan_amount_3;
//             } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value) + Number(allowed_loan_amount_2.value) + Number(allowed_loan_amount_3.value)) {
//                 if (loan_amount_remark_3.value == '--select--') {
//                     loan_amount_remark_3.setCustomValidity("Please fill this field");
//                     loan_amount_remark_3.reportValidity();
//                     invalidField = loan_amount_remark_3;
//                 }
//             }

             

            
//         }
    
//         if (saved_Ilhp_letout) {
            
//             if (!allowed_standardDeduction_3.value) {
//                 allowed_standardDeduction_3.setCustomValidity("Please fill this field");
//                 allowed_standardDeduction_3.reportValidity();
//                 invalidField = allowed_standardDeduction_3;
//             } else if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value) + Number(allowed_standardDeduction_2.value) + Number(allowed_standardDeduction_3.value)) {
//                 if (allowed_standardDeduction_remark_3.value == '--select--') {
//                     allowed_standardDeduction_remark_3.setCustomValidity("Please fill this field");
//                     allowed_standardDeduction_remark_3.reportValidity();
//                     invalidField = allowed_standardDeduction_remark_3;
//                 }
//             }
            
//             if (!allowed_incomeLossOnHouseProperty_3.value) {
//                 allowed_incomeLossOnHouseProperty_3.setCustomValidity("Please fill this field");
//                 allowed_incomeLossOnHouseProperty_3.reportValidity();
//                 invalidField = allowed_incomeLossOnHouseProperty_3;
//             } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value) + Number(allowed_incomeLossOnHouseProperty_2.value) + Number(allowed_incomeLossOnHouseProperty_3.value)) {
//                 if (allowed_incomeLossOnHouseProperty_remark_3.value == '--select--') {
//                     allowed_incomeLossOnHouseProperty_remark_3.setCustomValidity("Please fill this field");
//                     allowed_incomeLossOnHouseProperty_remark_3.reportValidity();
//                     invalidField = allowed_incomeLossOnHouseProperty_remark_3;
//                 }
//             } 

//             if (!allowed_homeLoanInterest_3.value) {
//                 allowed_homeLoanInterest_3.setCustomValidity("Please fill this field");
//                 allowed_homeLoanInterest_3.reportValidity();
//                 invalidField = allowed_homeLoanInterest_3;
//             } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value) + Number(allowed_homeLoanInterest_2.value) + Number(allowed_homeLoanInterest_3.value)) {
//                 if (allowed_homeLoanInterest_remark_3.value == '--select--') {
//                     allowed_homeLoanInterest_remark_3.setCustomValidity("Please fill this field");
//                     allowed_homeLoanInterest_remark_3.reportValidity();
//                     invalidField = allowed_homeLoanInterest_remark_3;
//                 }
//             } 

//             if (!allowed_municipalPropertyTax_3.value) {
//                 allowed_municipalPropertyTax_3.setCustomValidity("Please fill this field");
//                 allowed_municipalPropertyTax_3.reportValidity();
//                 invalidField = allowed_municipalPropertyTax_3;
//             } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value) + Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax_3.value)) {
//                 if (allowed_municipalPropertyTax_remark_3.value == '--select--') {
//                     allowed_municipalPropertyTax_remark_3.setCustomValidity("Please fill this field");
//                     allowed_municipalPropertyTax_remark_3.reportValidity();
//                     invalidField = allowed_municipalPropertyTax_remark_3;
//                 }
//             } 
            
//             if (!allowed_annualLettableValue_3.value) {
//                 allowed_annualLettableValue_3.setCustomValidity("Please fill this field");
//                 allowed_annualLettableValue_3.reportValidity();
//                 invalidField = allowed_annualLettableValue_3;
//             } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value) + Number(allowed_annualLettableValue_2.value) + Number(allowed_annualLettableValue_3.value)) {
//                 if (allowed_annualLettableValue_remark_3.value == '--select--') {
//                     allowed_annualLettableValue_remark_3.setCustomValidity("Please fill this field");
//                     allowed_annualLettableValue_remark_3.reportValidity();
//                     invalidField = allowed_annualLettableValue_remark_3;
//                 }
//             }  

            
            
//         }

//         if (saved_Ilhp_self) {
//             if (!allowed_self_3.value) {
//                 allowed_self_3.setCustomValidity("Please fill this field");
//                 allowed_self_3.reportValidity();
//                 invalidField = allowed_self_3;
//             } else if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value) + Number(allowed_self_2.value) + Number(allowed_self_3.value)) {
//                 if (self_remark_3.value == '--select--') {
//                     self_remark_3.setCustomValidity("Please fill this field");
//                     self_remark_3.reportValidity();
//                     invalidField = self_remark_3;
//                 }
//             }
//         }

//         // HRA=======

        
//         if (itd5stdt_value) {                        
//             if (Number(itd5.value) > Number(allow_rent_5.value) + Number(allow_rent_5_2.value) + Number(allow_rent_5_3.value)) {
//                 if (hra_remark_5_3.value == '--select--') {
//                     hra_remark_5_3.setCustomValidity("Please fill this field");
//                     hra_remark_5_3.reportValidity();
//                     invalidField = hra_remark_5_3;
//                 }
//             }
            
//             if (!allow_rent_5_3.value) {
//                 allow_rent_5_3.setCustomValidity("Please fill this field");
//                 allow_rent_5_3.reportValidity();
//                 invalidField = allow_rent_5_3;
//             }
//             if (!ita5enddt_3.value) {
//                 ita5enddt_3.setCustomValidity("Please fill this field");
//                 ita5enddt_3.reportValidity();
//                 invalidField = ita5enddt_3;
//             }
            
//         }
        
//         if (itd4stdt_value) {
//             if (Number(itd4.value) > Number(allow_rent_4.value) + Number(allow_rent_4_2.value) + Number(allow_rent_4_3.value)) {
//                 if (hra_remark_4_3.value == '--select--') {
//                     hra_remark_4_3.setCustomValidity("Please fill this field");
//                     hra_remark_4_3.reportValidity();
//                     invalidField = hra_remark_4_3;
//                 }
//             }
             
//             if (!allow_rent_4_3.value) {
//                 allow_rent_4_3.setCustomValidity("Please fill this field");
//                 allow_rent_4_3.reportValidity();
//                 invalidField = allow_rent_4_3;
//             } 
//             if (!ita4enddt_3.value) {
//                 ita4enddt_3.setCustomValidity("Please fill this field");
//                 ita4enddt_3.reportValidity();
//                 invalidField = ita4enddt_3;
//             }
            
            
            
//         }

//         if (itd3stdt_value) {            
//             if (Number(itd3.value) > Number(allow_rent_3.value) + Number(allow_rent_3_2.value) + Number(allow_rent_3_3.value)) {
//                 if (hra_remark_3_3.value == '--select--') {
//                     hra_remark_3_3.setCustomValidity("Please fill this field");
//                     hra_remark_3_3.reportValidity();
//                     invalidField = hra_remark_3_3;
//                 }
//             }
             
//             if (!allow_rent_3_3.value) {
//                 allow_rent_3_3.setCustomValidity("Please fill this field");
//                 allow_rent_3_3.reportValidity();
//                 invalidField = allow_rent_3_3;
//             } 
//             if (!ita3enddt_3.value) {
//                 ita3enddt_3.setCustomValidity("Please fill this field");
//                 ita3enddt_3.reportValidity();
//                 invalidField = ita3enddt_3;
//             }                                      
//         }

//         if (itd2stdt_value) {            
//             if (Number(itd2.value) > Number(allow_rent_2.value) + Number(allow_rent_2_2.value) + Number(allow_rent_2_3.value)) {
//                 if (hra_remark_2_3.value == '--select--') {
//                     hra_remark_2_3.setCustomValidity("Please fill this field");
//                     hra_remark_2_3.reportValidity();
//                     invalidField = hra_remark_2_3;
//                 }
//             }
              
//             if (!allow_rent_2_3.value) {
//                 allow_rent_2_3.setCustomValidity("Please fill this field");
//                 allow_rent_2_3.reportValidity();
//                 invalidField = allow_rent_2_3;
//             }
//             if (!ita2enddt_3.value) {
//                 ita2enddt_3.setCustomValidity("Please fill this field");
//                 ita2enddt_3.reportValidity();
//                 invalidField = ita2enddt_3;
//             }                                 
//         }

//         if (itd1stdt_value) {            
//             if (Number(itd1.value) > Number(allow_rent_1.value) + Number(allow_rent_1_2.value) + Number(allow_rent_1_3.value)) {
//                 if (hra_remark_1_3.value == '--select--') {
//                     hra_remark_1_3.setCustomValidity("Please fill this field");
//                     hra_remark_1_3.reportValidity();
//                     invalidField = hra_remark_1_3;
//                 }
//             }            
//             if (!allow_rent_1_3.value) {
//                 allow_rent_1_3.setCustomValidity("Please fill this field");
//                 allow_rent_1_3.reportValidity();
//                 invalidField = allow_rent_1_3;
//             } 
//             if (!ita1enddt_3.value) {
//                 ita1enddt_3.setCustomValidity("Please fill this field");
//                 ita1enddt_3.reportValidity();
//                 invalidField = ita1enddt_3;
//             }      
//         } 

//         if (invalidField) {
//             invalidField.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'center'
//             });
//         }   

//     }
// }

