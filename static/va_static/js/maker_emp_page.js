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

    if (ver_level_1.checked != true) {
        disabledbtn = false;
    }
    if (!custom_remark.value) {
        disabledbtn = false;
    }
    if (itd1stdt_value) {

        if (!allow_rent_1.value || allow_rent_1Error.textContent != '' || !ita1stdt.value || !ita1enddt.value || a_city1.value == '--select--') {
            disabledbtn = false;
        }
        if (Number(itd1.value) > Number(allow_rent_1.value)) {
            if (hra_remark_1.value == '--select--') {
                disabledbtn = false;
            }
        }

    }
    if (itd2stdt_value) {
        if (!allow_rent_2.value || allow_rent_2Error.textContent != '' || a_city2.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd2.value) > Number(allow_rent_2.value)) {
            if (hra_remark_2.value == '--select--') {
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
        if (!allow_rent_3.value || allow_rent_3Error.textContent != '' || a_city3.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd3.value) > Number(allow_rent_3.value)) {
            if (hra_remark_3.value == '--select--') {
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

        if (Number(itd4.value) > Number(allow_rent_4.value)) {
            if (hra_remark_4.value == '--select--') {
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
        if (!allow_rent_5.value || allow_rent_5Error.textContent != '' || a_city5.value == '--select--') {
            disabledbtn = false;
        }

        if (Number(itd5.value) > Number(allow_rent_5.value)) {
            if (hra_remark_5.value == '--select--') {
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

        if (Number(selfOccupiedHouseProperty.value) > Number(allowed_self.value)) {
            if (self_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

    }
    if (saved_Ilhp_letout) {
        if (!allowed_annualLettableValue.value || allowed_annualLettableValueError.textContent != '' ||
            !allowed_municipalPropertyTax.value || allowed_municipalPropertyTaxError.textContent != '' ||
            !allowed_homeLoanInterest.value || allowed_homeLoanInterestError.textContent != '' ||
            allowed_incomeLossOnHousePropertyError.textContent != '' ||
            allowed_standardDeductionError.textContent != '') {
            disabledbtn = false;
        }

        if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value)) {
            if (allowed_annualLettableValue_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

        if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value)) {
            if (allowed_municipalPropertyTax_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

        if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value)) {
            if (allowed_homeLoanInterest_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

        if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value)) {
            if (allowed_incomeLossOnHouseProperty_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

        if (Number(standardDeduction.value) > Number(allowed_standardDeduction.value)) {
            if (allowed_standardDeduction_remark.value == '--select--') {
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
        if (Number(loan_amount.value) > Number(allowed_loan_amount.value)) {
            if (loan_amount_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
        if (Number(property_value.value) > Number(allowed_property_value.value)) {
            if (property_value_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
        if (Number(home_loan.value) > Number(allowed_home_loan.value)) {
            if (home_loan_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_80EEA) {
        if (!allowed_property_value_other.value || property_value_otherError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(property_value_other.value) > Number(allowed_property_value_other.value)) {
            if (property_value_other_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_otherincome) {
        if (!allowed_other_income_oi.value || allowed_other_income_oiError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(other_income_oi.value) > Number(allowed_other_income_oi.value)) {
            if (other_income_oi_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }
    if (saved_Ilhp_80tta) {
        if (!allowed_interest_80tta.value || allowed_interest_80ttaError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(interest_80tta.value) > Number(allowed_interest_80tta.value)) {
            if (interest_80tta_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_other80_med) {
        if (!allowed_medical_insurance.value || allowed_medical_insuranceError.textContent != '') {
            disabledbtn = false;
        }

        if (Number(medical_insurance_self_mip.value) > Number(allowed_medical_insurance.value)) {
            if (medical_insurance_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

    }

    if (saved_other80_parent) {

        if (!allowed_parents_mip_nsn.value || allowed_parents_mip_nsnError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(medical_insurance_parents_mip.value) > Number(allowed_parents_mip_nsn.value)) {
            if (parents_mip_nsn_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

    }

    if (saved_other80_senior) {
        if (!allowed_parents_mip_sn.value || allowed_parents_mip_snError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(mediclaim_insurance_parents_mip.value) > Number(allowed_parents_mip_sn.value)) {
            if (parents_mip_sn_remark.value == '--select--') {
                disabledbtn = false;
            }
        }

    }

    if (saved_other80_preventive) {
        if (!allowed_health_checkup.value || allowed_health_checkupError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(preventive_health_checkup_mip.value) > Number(allowed_health_checkup.value)) {
            if (health_checkup_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }



    if (saved_illness) {
        if (!allowed_treatment_value.value || allowed_treatment_valueError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(treatment_value.value) > Number(allowed_treatment_value.value)) {
            if (treatment_value_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }
    if (saved_education) {
        if (!allowed_interest_education.value || allowed_interest_educationError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(interest_education.value) > Number(allowed_interest_education.value)) {
            if (interest_education_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_dependent) {
        if (!allowed_Dependent_dis.value || allowed_Dependent_disError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(paymentDependentDisability.value) > Number(allowed_Dependent_dis.value)) {
            if (allowed_Dependent_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }
    if (saved_self) {
        if (!allowed_self_dis.value || allowed_self_disError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(paymentSelfDisability.value) > Number(allowed_self_dis.value)) {
            if (allowed_self_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }
    if (saved_80eeb) {
        if (!allowed_vehicle_value.value || allowed_vehicle_valueError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(vehicle_loan_80eeb.value) > Number(allowed_vehicle_value.value)) {
            if (vehicle_value_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80ccd) {
        if (!allowed_nps_80ccd1b.value || allowed_nps_80ccd1bError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(nps_80ccd1b.value) > Number(allowed_nps_80ccd1b.value)) {
            if (nps_80ccd1b_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    // ==========


    if (saved_80c_payment) {
        if (!allowed_paymentLifeInsurance.value || allowed_paymentLifeInsuranceError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(paymentLifeInsurance.value) > Number(allowed_paymentLifeInsurance.value)) {
            if (paymentLifeInsurance_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_timeDeposit) {
        if (!allowed_timeDeposit.value || allowed_timeDepositError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(timeDeposit.value) > Number(allowed_timeDeposit.value)) {
            if (timeDeposit_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ulipContribution) {
        if (!allowed_ulipContribution.value || allowed_ulipContributionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(ulipContribution.value) > Number(allowed_ulipContribution.value)) {
            if (ulipContribution_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_nscSubscription) {
        if (!allowed_nscSubscription.value || allowed_nscSubscriptionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(nscSubscription.value) > Number(allowed_nscSubscription.value)) {
            if (nscSubscription_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_nscInterest) {
        if (!allowed_nscInterest.value || allowed_nscInterestError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(nscInterest.value) > Number(allowed_nscInterest.value)) {
            if (nscInterest_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_ppfContribution) {
        if (!allowed_ppfContribution.value || allowed_ppfContributionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(ppfContribution.value) > Number(allowed_ppfContribution.value)) {
            if (ppfContribution_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_houseLoan) {
        if (!allowed_houseLoan.value || allowed_houseLoanError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(houseLoan.value) > Number(allowed_houseLoan.value)) {
            if (houseLoan_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_tuitionFee) {
        if (!allowed_tuitionFee.value || allowed_tuitionFeeError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(tuitionFee.value) > Number(allowed_tuitionFee.value)) {
            if (tuitionFee_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_mutualFundSubscription) {
        if (!allowed_mutualFundSubscription.value || allowed_mutualFundSubscriptionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(mutualFundSubscription.value) > Number(allowed_mutualFundSubscription.value)) {
            if (mutualFundSubscription_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_termDeposits) {
        if (!allowed_termDeposits.value || allowed_termDepositsError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(termDeposits.value) > Number(allowed_termDeposits.value)) {
            if (termDeposits_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_pensionContribution) {
        if (!allowed_pensionContribution.value || allowed_pensionContributionError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(pensionContribution.value) > Number(allowed_pensionContribution.value)) {
            if (pensionContribution_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
    }

    if (saved_80c_sukanyaSamriddhi) {
        if (!allowed_sukanyaSamriddhi.value || allowed_sukanyaSamriddhiError.textContent != '') {
            disabledbtn = false;
        }
        if (Number(sukanyaSamriddhi.value) > Number(allowed_sukanyaSamriddhi.value)) {
            if (sukanyaSamriddhi_remark.value == '--select--') {
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

        if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp.value)) {
            if (salary_previousemp_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
        if (Number(provident_fund.value) != Number(allowed_provident_fund.value)) {
            if (provident_fund_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
        if (Number(professional_tax.value) != Number(allowed_professional_tax.value)) {
            if (professional_tax_remark.value == '--select--') {
                disabledbtn = false;
            }
        }
        if (Number(income_tax.value) != Number(allowed_income_tax.value)) {
            if (income_tax_remark.value == '--select--') {
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


function ValidateCheck() {
    if (ver_level_1.checked == true) {
        ver_level_1.value = 'yes';
    } else {
        ver_level_1.value = 'no';
    }
    submit_btn_enable();
}



function showValidationError(element, message) {
    element.setCustomValidity(message);
    element.reportValidity();
}

function Submitdata_fun() {
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
            if (income_tax_remark.value == '--select--') {
                showValidationError(income_tax_remark, "Please select remarks");
                invalidField = income_tax_remark;
            }
        }

        if (!allowed_provident_fund.value) {
            showValidationError(allowed_provident_fund, "Please fill this field");
            invalidField = allowed_provident_fund;
        } else if (Number(provident_fund.value) != Number(allowed_provident_fund.value)) {
            if (provident_fund_remark.value == '--select--') {
                showValidationError(provident_fund_remark, "Please select remarks");
                invalidField = provident_fund_remark;
            }
        }

        if (!allowed_professional_tax.value) {
            showValidationError(allowed_professional_tax, "Please fill this field");
            invalidField = allowed_professional_tax;
        } else if (Number(professional_tax.value) != Number(allowed_professional_tax.value)) {
            if (professional_tax_remark.value == '--select--') {
                showValidationError(professional_tax_remark, "Please select remarks");
                invalidField = professional_tax_remark;
            }
        }

        if (!allowed_salary_previousemp.value) {
            showValidationError(allowed_salary_previousemp, "Please fill this field");
            invalidField = allowed_salary_previousemp;
        } else if (Number(salary_previousemp.value) != Number(allowed_salary_previousemp.value)) {
            if (salary_previousemp_remark.value == '--select--') {
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
            if (sukanyaSamriddhi_remark.value == '--select--') {
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
            if (pensionContribution_remark.value == '--select--') {
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
            if (termDeposits_remark.value == '--select--') {
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
            if (mutualFundSubscription_remark.value == '--select--') {
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
            if (tuitionFee_remark.value == '--select--') {
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
            if (houseLoan_remark.value == '--select--') {
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
            if (ppfContribution_remark.value == '--select--') {
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
            if (nscInterest_remark.value == '--select--') {
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
            if (nscSubscription_remark.value == '--select--') {
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
            if (ulipContribution_remark.value == '--select--') {
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
            if (timeDeposit_remark.value == '--select--') {
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
            if (paymentLifeInsurance_remark.value == '--select--') {
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
            if (nps_80ccd1b_remark.value == '--select--') {
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
            if (vehicle_value_remark.value == '--select--') {
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
            if (allowed_self_remark.value == '--select--') {
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
            if (allowed_Dependent_remark.value == '--select--') {
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
            if (interest_education_remark.value == '--select--') {
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
            if (treatment_value_remark.value == '--select--') {
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
            if (health_checkup_remark.value == '--select--') {
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
            if (parents_mip_sn_remark.value == '--select--') {
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
            if (parents_mip_nsn_remark.value == '--select--') {
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
            if (medical_insurance_remark.value == '--select--') {
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
            if (interest_80tta_remark.value == '--select--') {
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
            if (other_income_oi_remark.value == '--select--') {
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
            if (property_value_other_remark.value == '--select--') {
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
            if (home_loan_remark.value == '--select--') {
                showValidationError(home_loan_remark, "Please select remarks");
                invalidField = home_loan_remark;
            }
        }

        if (!allowed_property_value.value) {
            showValidationError(allowed_property_value, "Please fill this field");
            invalidField = allowed_property_value;
        } else if (Number(property_value.value) > Number(allowed_property_value.value)) {
            if (property_value_remark.value == '--select--') {
                showValidationError(property_value_remark, "Please select remarks");
                invalidField = property_value_remark;
            }
        }

        if (!allowed_loan_amount.value) {
            showValidationError(allowed_loan_amount, "Please fill this field");
            invalidField = allowed_loan_amount;
        } else if (Number(loan_amount.value) > Number(allowed_loan_amount.value)) {
            if (loan_amount_remark.value == '--select--') {
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
            if (allowed_standardDeduction_remark.value == '--select--') {
                showValidationError(allowed_standardDeduction_remark, "Please select remarks");
                invalidField = allowed_standardDeduction_remark;
            }
        }

        if (!allowed_incomeLossOnHouseProperty.value) {
            showValidationError(allowed_incomeLossOnHouseProperty, "Please fill this field");
            invalidField = allowed_incomeLossOnHouseProperty;
        } else if (Number(incomeLossOnHouseProperty.value) > Number(allowed_incomeLossOnHouseProperty.value)) {
            if (allowed_incomeLossOnHouseProperty_remark.value == '--select--') {
                showValidationError(allowed_incomeLossOnHouseProperty_remark, "Please select remarks");
                invalidField = allowed_incomeLossOnHouseProperty_remark;
            }
        }

        if (!allowed_homeLoanInterest.value) {
            showValidationError(allowed_homeLoanInterest, "Please fill this field");
            invalidField = allowed_homeLoanInterest;
        } else if (Number(homeLoanInterest.value) > Number(allowed_homeLoanInterest.value)) {
            if (allowed_homeLoanInterest_remark.value == '--select--') {
                showValidationError(allowed_homeLoanInterest_remark, "Please select remarks");
                invalidField = allowed_homeLoanInterest_remark;
            }
        }

        if (!allowed_municipalPropertyTax.value) {
            showValidationError(allowed_municipalPropertyTax, "Please fill this field");
            invalidField = allowed_municipalPropertyTax;
        } else if (Number(municipalPropertyTax.value) > Number(allowed_municipalPropertyTax.value)) {
            if (allowed_municipalPropertyTax_remark.value == '--select--') {
                showValidationError(allowed_municipalPropertyTax_remark, "Please select remarks");
                invalidField = allowed_municipalPropertyTax_remark;
            }
        }

        if (!allowed_annualLettableValue.value) {
            showValidationError(allowed_annualLettableValue, "Please fill this field");
            invalidField = allowed_annualLettableValue;
        } else if (Number(annualLettableValue.value) > Number(allowed_annualLettableValue.value)) {
            if (allowed_annualLettableValue_remark.value == '--select--') {
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
            if (self_remark.value == '--select--') {
                showValidationError(self_remark, "Please select remarks");
                invalidField = self_remark;
            }
        }
    }

    // HRA

    if (itd5stdt_value) {
        if (Number(itd5.value) > Number(allow_rent_5.value)) {
            if (hra_remark_5.value == '--select--') {
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
            if (hra_remark_4.value == '--select--') {
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
            if (hra_remark_3.value == '--select--') {
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
            if (hra_remark_2.value == '--select--') {
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
            if (hra_remark_1.value == '--select--') {
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


    if (!ver_level_1.checked) {
        showValidationError(ver_level_1, "Please check this field to verify");
        invalidField = ver_level_1;
        invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            invalidField.focus();
            invalidField.reportValidity();
        }, 900);
        return; // Stop submission if the checkbox is not checked
    }

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

        let apiUrl = "submit_maker";

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

}
