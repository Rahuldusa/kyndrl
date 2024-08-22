var submit_section_1 = document.getElementById('submit_section');

// var SaveDatabtn = document.getElementById('SaveData');
var SubmitDatabtn = '';


// HRA

var saved_hra_empid = String(saved_hra_empid);
var rent_section = String(rent_section).toLowerCase();
var pan_section = String(pan_section).toLowerCase();


var current_page_1 = Number(current_page_1);

// Income/Loss
var saved_Ilhp_empid = String(saved_Ilhp_empid)


var saved_Ilhp_selfOccupiedHouseProperty = Number(saved_Ilhp_selfOccupiedHouseProperty)
var saved_Ilhp_annualLettableValue = Number(saved_Ilhp_annualLettableValue)



var self_occupiedfile_1 = String(self_occupiedfile_1).toLowerCase();


var letout_file = String(letout_file).toLowerCase();


var file_80ee = String(file_80ee).toLowerCase();


var file_80eea = String(file_80eea).toLowerCase();



var other_file = String(other_file).toLowerCase();


// var file_80tta = String(file_80tta).toLowerCase();

// 80 Deductions
var saved_other80_empid = String(saved_other80_empid)


if (saved_other80_medical != null) {
    var saved_other80_medical = Number(saved_other80_medical);
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

if (saved_other80_treatment != null) {
    var saved_other80_treatment = Number(saved_other80_treatment);
}

if (saved_other80_education != null) {
    var saved_other80_education = Number(saved_other80_education);
}

if (saved_other80_Dependent != null) {
    var saved_other80_Dependent = Number(saved_other80_Dependent);
}

if (saved_other80_SelfDis != null) {
    var saved_other80_SelfDis = Number(saved_other80_SelfDis);
}

if (saved_vehicle != null) {
    var saved_vehicle = Number(saved_vehicle);
}

var file_80d = String(file_80d).toLowerCase();


var file_80ddb = String(file_80ddb).toLowerCase();


var file_80e = String(file_80e).toLowerCase();


var file_80u = String(file_80u).toLowerCase();


var file_80dd = String(file_80dd).toLowerCase();




var file_80eeb = String(file_80eeb).toLowerCase();


var file_80ccd = String(file_80ccd).toLowerCase();


// 80C Deductions
var saved_80C_deduction_empid = String(saved_80C_deduction_empid)


if (saved_80C_lic != null) {
    var saved_80C_lic = Number(saved_80C_lic);
}

if (saved_80C_ppf != null) {
    var saved_80C_ppf = Number(saved_80C_ppf);
}

if (saved_80C_tuition != null) {
    var saved_80C_tuition = Number(saved_80C_tuition);
}

if (saved_80C_sukanya != null) {
    var saved_80C_sukanya = Number(saved_80C_sukanya);
}



 


var file_80c_lic = String(file_80c_lic).toLowerCase();


var file_80c_podt = String(file_80c_podt).toLowerCase();


var file_80c_ulip = String(file_80c_ulip).toLowerCase();


var file_80c_nsc = String(file_80c_nsc).toLowerCase();


var file_80c_nsc_int = String(file_80c_nsc_int).toLowerCase();


var file_80c_ppf = String(file_80c_ppf).toLowerCase();


var file_80c_principal = String(file_80c_principal).toLowerCase();


var file_80c_tution = String(file_80c_tution).toLowerCase();


var file_80c_mf = String(file_80c_mf).toLowerCase();


var file_80c_fd = String(file_80c_fd).toLowerCase();


var file_80ccc = String(file_80ccc).toLowerCase();


var file_80c_sukanya = String(file_80c_sukanya).toLowerCase();


// Previous Employement
var saved_previous_emp_empid = String(saved_previous_emp_empid)

var previous_empl_file = String(previous_empl_file).toLowerCase();



var hra_declaration_file_1 = String(hra_declaration_file_1).toLowerCase();
var ilhp_declaration_file_1 = String(ilhp_declaration_file_1).toLowerCase();
var ilhp_self_declaration_file_1 = String(ilhp_self_declaration_file_1).toLowerCase();
var ilhp_let_declaration_file_1 = String(ilhp_let_declaration_file_1).toLowerCase();
var EEB80_declaration_file_1 = String(EEB80_declaration_file_1).toLowerCase();
var other_declaration_file_1 = String(other_declaration_file_1).toLowerCase();
var TTA80_declaration_file_1 = String(TTA80_declaration_file_1).toLowerCase();
var C80_declaration_file_1 = String(C80_declaration_file_1).toLowerCase();
var Ded80_declaration_file_1 = String(Ded80_declaration_file_1).toLowerCase();
var hra_hl_declaration_file_1 = String(hra_hl_declaration_file_1).toLowerCase();


var SubmitData_btn

var SaveData_btn = document.getElementById('SaveData');
var SaveData1_btn = document.getElementById('SaveData1');

var SaveData2_btn = document.getElementById('SaveData2');
var SaveData3_btn = document.getElementById('SaveData3');
var SaveData4_btn = document.getElementById('SaveData4');




var prevBtn_btn = document.getElementById('prevBtn');
var nextBtn_btn = document.getElementById('nextBtn');


var sectionyes_previousempbtn

var SaveData5_btn
var savebtn_prev_section

if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
    sectionyes_previousempbtn = document.getElementById('sectionyes_previousemp');
    SaveData5_btn = document.getElementById('SaveData5');
    savebtn_prev_section = document.getElementById('savebtn_prev');
}


var savebtnhra_section = document.getElementById('savebtnhra');
var savebtn_ilh_section = document.getElementById('savebtn_ilh');
var savebtn_80ded_section = document.getElementById('savebtn_80ded');
var savebtn_80C_section = document.getElementById('savebtn_80C');

var savedata_section = document.getElementById('savedata_section')



function display_func() {
    displayFlag_2 = true;

    if (current_time_date1 > edit_48_hrs1) {        
        displayFlag_2 = false;        
    }
    if (maker_1Date){
        displayFlag_2 = false;   
    }
    if (displayFlag_2) {
        savedata_section.style.display = 'block';    
    } else {                      
        savedata_section.style.display = 'none';        
    }
}


function display_submit() {

    let displayFlag = true;

    if (localStorage.getItem('currentTab')) {
        if (currentTab == 6) {
            let displayFlag_2 = true;
            if (!saved_hra_empid && !saved_Ilhp_empid && !saved_other80_empid && !saved_80C_deduction_empid && !saved_previous_emp_empid) {
                displayFlag_2 = false;
            }

            if (!placeInput.value || placeErrorSpan.textContent != '' || itproofcheckBox.checked == false) {
                displayFlag_2 = false;
            }

            if (payingrentyesbtn.checked == true) {
                if (!rent_section || !pan_section || !hra_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }


            if (saved_hra_empid) {
                if (!rent_section || !pan_section || !hra_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }

            // if (saved_80C_deduction_empid) {
            //     if (!C80_declaration_file_1) {
            //         displayFlag_2 = false;
            //     }
            // }

            if (saved_80C_lic || saved_80C_ppf || saved_80C_tuition || saved_80C_sukanya) {
                if (!C80_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }


            if (saved_other80_empid) {
                if (saved_other80_medical || saved_other80_parent || saved_other80_senior || saved_other80_preventive || saved_other80_treatment || saved_other80_education || saved_other80_Dependent || saved_other80_SelfDis) {
                    if (!Ded80_declaration_file_1) {
                        displayFlag_2 = false;
                    }
                }
            }


            if (other_income_oiInp.value > 0 && !other_declaration_file_1) {
                displayFlag_2 = false;
            }

            if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
                if (!ilhp_self_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }
            if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
                if (!ilhp_let_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }

            if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
                if (!ilhp_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }


            if (interest_80ttaInp.value && !TTA80_declaration_file_1) {
                displayFlag_2 = false;
            }


            if (selfOccupiedHousePropertyInp.value > 0 && saved_hra_empid) {
                if (!hra_hl_declaration_file_1) {
                    displayFlag_2 = false;
                }
            }

            if (current_time_date1 > edit_48_hrs1) {        
                displayFlag_2 = false;        
            }

            if (maker_1Date){
                displayFlag_2 = false;
            }
        

            if (displayFlag_2) {
                submit_section_1.style.display = 'block';
                SubmitData_btn = document.getElementById('SubmitData');
            } else {
                submit_section_1.style.display = 'none';
                SubmitData_btn = '';
            }
        }
    }

    if (payingrentyesbtn.checked == true) {
        if (!rent_section || !pan_section || !hra_declaration_file_1) {
            displayFlag = false;            
        }
    }


    if (saved_hra_empid) {
        if (!rent_section || !pan_section || !hra_declaration_file_1) {
            displayFlag = false;            
        }
    }

    // if (saved_80C_deduction_empid) {
    //     if (!C80_declaration_file_1) {
    //         displayFlag = false;
    //     }
    // }    

    if (saved_80C_lic || saved_80C_ppf || saved_80C_tuition || saved_80C_sukanya) {
        if (!C80_declaration_file_1) {
            displayFlag = false;            
        }
    }

    if (saved_other80_empid) {
        if (saved_other80_medical || saved_other80_parent || saved_other80_senior || saved_other80_preventive || saved_other80_treatment || saved_other80_education || saved_other80_Dependent || saved_other80_SelfDis) {
            if (!Ded80_declaration_file_1) {
                displayFlag = false;
            }
        }
    }

    if (other_income_oiInp.value > 0 && !other_declaration_file_1) {
        displayFlag = false;
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        if (!ilhp_self_declaration_file_1) {
            displayFlag = false;
        }
    }
    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        if (!ilhp_let_declaration_file_1) {
            displayFlag = false;
        }
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        if (!ilhp_declaration_file_1) {
            displayFlag = false;
        }
    }


    if (interest_80ttaInp.value && !TTA80_declaration_file_1) {
        displayFlag = false;
    }


    if (selfOccupiedHousePropertyInp.value > 0 && saved_hra_empid) {
        if (!hra_hl_declaration_file_1) {
            displayFlag = false;
        }
    }



    if (selfOccupiedHousePropertyInp.value > 0 && !self_occupiedfile_1) {
        displayFlag = false;
    }
    if (annualLettableValueInp.value > 0 && !letout_file) {
        displayFlag = false;
    }
    if (loan_amountInp.value > 0 && !file_80ee) {
        displayFlag = false;
    }
    if (property_value_otherInp.value > 0 && !file_80eea) {
        displayFlag = false;
    }

    if (other_income_oiInp.value > 0 && !other_file) {
        displayFlag = false;
    }
    // if (interest_80ttaInp.value > 0 && !file_80tta) {
    //     displayFlag = false;
    // }
    if (medical_insurance_self_mip.value > 0 && !file_80d) {
        displayFlag = false;
    }
    if (selected_illness.value && !file_80ddb) {
        displayFlag = false;
    }
    if (interest_education.value > 0 && !file_80e) {
        displayFlag = false;
    }
    if (paymentDependentDisability.value > 0 && !file_80dd) {
        displayFlag = false;
    }
    if (paymentSelfDisability.value > 0 && !file_80u) {
        displayFlag = false;
    }


    if (Inp_80ccd1bnps.value > 0 && !file_80ccd) {
        displayFlag = false;
    }



    if (paymentLifeInsuranceInp.value > 0 && !file_80c_lic) {
        displayFlag = false;
    }
    if (timeDepositInp.value > 0 && !file_80c_podt) {
        displayFlag = false;
    }
    if (ulipContributionInp.value > 0 && !file_80c_ulip) {
        displayFlag = false;
    }
    if (nscSubscriptionInp.value > 0 && !file_80c_nsc) {
        displayFlag = false;
    }
    if (nscInterestInp.value > 0 && !file_80c_nsc_int) {
        displayFlag = false;
    }
    if (ppfContributionInp.value > 0 && !file_80c_ppf) {
        displayFlag = false;
    }
    if (houseLoanInp.value > 0 && !file_80c_principal) {
        displayFlag = false;
    }
    if (tuitionFeeInp.value > 0 && !file_80c_tution) {
        displayFlag = false;
    }
    if (mutualFundSubscriptionInp.value > 0 && !file_80c_mf) {
        displayFlag = false;
    }
    if (termDepositsInp.value > 0 && !file_80c_fd) {
        displayFlag = false;
    }
    if (pensionContributionInp.value > 0 && !file_80ccc) {
        displayFlag = false;
    }
    if (sukanyaSamriddhiInp.value > 0 && !file_80c_sukanya) {
        displayFlag = false;
    }

    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
        if (salary_previousemp.value > 0 && !previous_empl_file) {
            displayFlag = false;
        }
    }

    // !saved_hra_empid && !saved_Ilhp_empid && !saved_other80_empid && !saved_80C_deduction_empid && !saved_previous_emp_empid

    if (payingrentyesbtn.checked == true) {

        if (!saved_hra_empid) {
            displayFlag = false;
        }

        if (hra_form1section.style.display == 'table-row') {
            if (LandlordPAN1ErrorSpan.textContent != '' || MonthRent1ErrorSpan.textContent != '' || landlordContact1ErrorSpan.textContent != '' || Pincode1ErrorSpan.textContent != '' || lanlordName1ErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (!EndDate1input.value || !MonthRent1input.value) {
                displayFlag = false;
            } else if (StartDate1input.value && EndDate1input.value && MonthRent1input.value > 0) {
                if (!LandlordPAN1input.value || !Pincode1input.value || !cityType1input.value || !lanlordName1input.value || !landlordAddress1input.value || !rentedAddress1input.value) {
                    displayFlag = false;
                }
            }
        }
        if (rent_2.style.display == 'table-row') {
            if (LandlordPAN2ErrorSpan.textContent != '' || MonthRent2ErrorSpan.textContent != '' || landlordContact2ErrorSpan.textContent != '' || Pincode2ErrorSpan.textContent != '' || lanlordName2ErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (!EndDate2input.value || !MonthRent2input.value) {
                displayFlag = false;
            } else if (StartDate2input.value && EndDate2input.value && MonthRent2input.value > 0) {
                if (!LandlordPAN2input.value || !Pincode2input.value || !cityType2input.value || !lanlordName2input.value || !landlordAddress2input.value || !rentedAddress2input.value) {
                    displayFlag = false;
                }
            }
        }
        if (rent_3.style.display == 'table-row') {
            if (LandlordPAN3ErrorSpan.textContent != '' || MonthRent3ErrorSpan.textContent != '' || landlordContact3ErrorSpan.textContent != '' || Pincode3ErrorSpan.textContent != '' || lanlordName3ErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (!EndDate3input.value || !MonthRent3input.value) {
                displayFlag = false;
            } else if (StartDate3input.value && EndDate3input.value && MonthRent3input.value > 0) {
                if (!LandlordPAN3input.value || !Pincode3input.value || !cityType3input.value || !lanlordName3input.value || !landlordAddress3input.value || !rentedAddress3input.value) {
                    displayFlag = false;
                }
            }
        }
        if (rent_4.style.display == 'table-row') {
            if (LandlordPAN4ErrorSpan.textContent != '' || MonthRent4ErrorSpan.textContent != '' || landlordContact4ErrorSpan.textContent != '' || Pincode4ErrorSpan.textContent != '' || lanlordName4ErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (!EndDate4input.value || !MonthRent4input.value) {
                displayFlag = false;
            } else if (StartDate4input.value && EndDate4input.value && MonthRent4input.value > 0) {
                if (!LandlordPAN4input.value || !Pincode4input.value || !cityType4input.value || !lanlordName4input.value || !landlordAddress4input.value || !rentedAddress4input.value) {
                    displayFlag = false;
                }
            }
        }
        if (rent_5.style.display == 'table-row') {
            if (LandlordPAN5ErrorSpan.textContent != '' || MonthRent5ErrorSpan.textContent != '' || landlordContact5ErrorSpan.textContent != '' || Pincode5ErrorSpan.textContent != '' || lanlordName5ErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (!EndDate5input.value || !MonthRent5input.value) {
                displayFlag = false;
            } else if (StartDate5input.value && EndDate5input.value && MonthRent5input.value > 0) {
                if (!LandlordPAN5input.value || !Pincode5input.value || !cityType5input.value || !lanlordName5input.value || !landlordAddress5input.value || !rentedAddress5input.value) {
                    displayFlag = false;
                }
            }
        }
    }

    if (ilhpyesbtn.checked == true) {
        if (!saved_Ilhp_empid) {
            displayFlag = false;
        }
        if (selfOccupiedHousePropertyErrorSpan.textContent != '' || otherselfHomeLoanLenderNameErrorSpan.textContent != '' || otherselfHomeLoanLenderPANErrorSpan.textContent != '' ||
            annualLettableValueErrorSpan.textContent != '' || municipalPropertyTaxErrorSpan.textContent != '' || homeLoanInterestErrorSpan.textContent != '' || otherloanLenderNameErrorSpan.textContent != '' || otherloanLenderPANErrorSpan.textContent != '' ||
            loan_amountErrorSpan.textContent != '' || property_valueErrorSpan.textContent != '' || home_loanErrorSpan.textContent != '' || otherloan_lenderErrorSpan.textContent != '' || otherlender_panErrorSpan.textContent != '' || property_value_otherErrorSpan.textContent != '') {
            displayFlag = false;
        }
        if (saved_Ilhp_empid) {
            if (selfOccupiedHousePropertyInp.value > 0) {
                if (!selfHomeLoanLenderNameInp.value || !self_date.value) {
                    displayFlag = false;
                } else if (selfHomeLoanLenderNameInp.value == 'other') {
                    if (!otherselfHomeLoanLenderNameInp.value || !otherselfHomeLoanLenderPANInp.value) {
                        displayFlag = false;
                    }
                } else {
                    if (!selfHomeLoanLenderPANInp.value) {
                        displayFlag = false;
                    }
                }
            }
            if (annualLettableValueInp.value > 0) {
                if (!municipalPropertyTaxInp.value || !homeLoanInterestInp.value || !incomeLossOnHousePropertyInp.value || !standardDeductionInp.value || !loanLenderNameInp.value) {
                    displayFlag = false;
                } else if (loanLenderNameInp.value == 'other') {
                    if (!otherloanLenderNameInp.value || !otherloanLenderPANInp.value) {
                        displayFlag = false;
                    }
                } else {
                    if (!loanLenderPANInp.value) {
                        displayFlag = false;
                    }
                }
            }
            if (loan_amountInp.value > 0) {
                if (!loan_amountInp.value || !property_valueInp.value || !home_loanInp.value || !loan_lenderInp.value) {
                    displayFlag = false;
                } else if (loan_lenderInp.value == 'other') {
                    if (!otherloan_lenderInp.value || !otherlender_panInp.value) {
                        displayFlag = false;
                    }
                } else {
                    if (!lender_panInp.value) {
                        displayFlag = false;
                    }
                }
            }
            if (property_value_otherInp.value > 0) {
                if (!property_value_otherInp.value) {
                    displayFlag = false;
                }
            }
            if (!selfOccupiedHousePropertyInp.value && !annualLettableValueInp.value && !loan_amountInp.value && !property_value_otherInp.value) {
                displayFlag = false;
            }
        } else {
            displayFlag = false;
        }
    }

    if (section80oiyesbtn.checked == true) {
        if (!saved_Ilhp_empid) {
            displayFlag = false;
        }
        if (other_income_ErrorSpan.textContent != '') {
            displayFlag = false;
        }
        if (!other_income_oiInp.value) {
            displayFlag = false;
        }
    }

    if (section80ttayesbtn.checked == true) {
        if (!saved_Ilhp_empid) {
            displayFlag = false;
        }
        if (interest_80tta_errorSpan.textContent != '') {
            displayFlag = false;
        }
        if (!interest_80ttaInp.value) {
            displayFlag = false;
        }
    }




    if (section80dyesbtn.checked == true) {
        if (!saved_other80_empid) {
            displayFlag = false;
        }
        if (section80dyes_mip.checked == true) {
            if (medical_insurance_self_mipErrorSpan.textContent != '' || medical_insurance_parents_mipErrorSpan.textContent != '' || mediclaim_insurance_parents_mipErrorSpan.textContent != '' || preventive_health_checkup_mipErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (!medical_insurance_self_mip.value || !medical_insurance_parents_mip.value || !mediclaim_insurance_parents_mip.value || !preventive_health_checkup_mip.value) {
                displayFlag = false;
            }
        }
        if (selected_illness.value) {
            if (treatment_valueErrorSpan.textContent != '') {
                displayFlag = false;
            }
            if (non_senior_citizenbtn.checked != true && senior_citizenbtn.checked != true && bothbtn.checked != true) {
                displayFlag = false;
            }
            if (!treatment_value.value) {
                displayFlag = false;
            }
        }
        if (section80dyes_mip.checked == false && !selected_illness.value) {
            if (!interest_education.value) {
                displayFlag = false;
            }
        }
    }

    if (section80udddependentbtn.checked == true) {
        if (!saved_other80_empid) {
            displayFlag = false;
        }
        if (saved_other80_empid) {
            if (!paymentDependentDisability.value > 0) {
                displayFlag = false;
            }
        } else {
            displayFlag = false;
        }
    }
    if (section80uddselfbtn.checked == true) {
        if (!saved_other80_empid) {
            displayFlag = false;
        }
        if (saved_other80_empid) {
            if (!paymentSelfDisability.value > 0) {
                displayFlag = false;
            }
        } else {
            displayFlag = false;
        }
    }
    if (section80uddbothbtn.checked == true) {
        if (!saved_other80_empid) {
            displayFlag = false;
        }
        if (saved_other80_empid) {
            if (!paymentSelfDisability.value > 0 || !paymentDependentDisability.value > 0) {
                displayFlag = false;
            }
        } else {
            displayFlag = false;
        }
    }



    if (section80eeyes_80eebbtn.checked == true) {
        if (!saved_other80_empid) {
            displayFlag = false;
        }
        if (vehicle_loan_80eebErrorSpan.textContent != '') {
            displayFlag = false;
        }
        if (saved_other80_empid) {
            if (loan_sanctioned_date_80eeb.value) {
                if (!vehicle_loan_80eeb.value || !loan_lender_80eeb.value) {
                    displayFlag = false;
                } else if (loan_lender_80eeb.value == 'other') {
                    if (!other80eebLender.value || !other80eebPAN.value) {
                        displayFlag = false;
                    }
                } else {
                    if (!loan_lender_80eeb.value) {
                        displayFlag = false;
                    }
                }
            } else {
                displayFlag = false;
            }
        } else {
            displayFlag = false;
        }


    }

    if (loan_sanctioned_date_80eeb.value && !file_80eeb) {
        displayFlag = false;
    }

    if (loan_sanctioned_date_80eeb.value && !EEB80_declaration_file_1) {
        displayFlag = false;
    }


    if (section80ccdyesbtn.checked == true) {
        if (!saved_other80_empid) {
            displayFlag = false;
        }
        if (Inp_80ccd1bnpsErrorSpan.textContent != '' || prannumberErrorSpan.textContent != '') {
            displayFlag = false;
        }
        if (saved_other80_empid) {
            if (section80ccdselfcheck.checked == true) {
                if (Inp_80ccd1bnpsErrorSpan.textContent != '' || prannumberErrorSpan.textContent != '') {
                    displayFlag = false;
                }
                if (!Inp_80ccd1bnps.value) {
                    displayFlag = false;
                }
            }
            if (section80ccdselfcheck.checked == false && section80ccdebpcheck.checked == false) {
                displayFlag = false;
            }
        } else {
            displayFlag = false;
        }
    }

    if (sectionyes_previousempbtn) {
        if (sectionyes_previousempbtn.checked == true) {
            if (!saved_previous_emp_empid) {
                displayFlag = false;
            }
            if (salary_previousemp_Error.textContent != '' || provident_fund_Error.textContent != '' || professional_tax_Error.textContent != '' || income_tax_Error.textContent != '') {
                displayFlag = false;
            }
            if (!salary_previousemp.value) {
                displayFlag = false;
            }
        }
    }

    if (section80Cyesbtn.checked == true) {
        if (!saved_80C_deduction_empid) {
            displayFlag = false;
        }
        if (paymentLifeInsuranceErrorSpan.textContent != '' || timeDepositErrorSpan.textContent != '' || ulipContributionErrorSpan.textContent != '' || nscSubscriptionErrorSpan.textContent != '' || nscInterestErrorSpan.textContent != '' || ppfContributionErrorSpan.textContent != '' ||
            houseLoanErrorSpan.textContent != '' || tuitionFeeErrorSpan.textContent != '' || mutualFundSubscriptionErrorSpan.textContent != '' || termDepositsErrorSpan.textContent != '' || pensionContributionErrorSpan.textContent != '' || sukanyaSamriddhiErrorSpan.textContent != '') {
            displayFlag = false;
        }
        if (!paymentLifeInsuranceInp.value && !timeDepositInp.value && !ulipContributionInp.value && !nscSubscriptionInp.value && !nscInterestInp.value && !ppfContributionInp.value &&
            !houseLoanInp.value && !tuitionFeeInp.value && !mutualFundSubscriptionInp.value && !termDepositsInp.value && !pensionContributionInp.value && !sukanyaSamriddhiInp.value) {
            displayFlag = false;
        }
    }

    if (saved_basic_empid) {
        if (saved_basic_current_page == '1') {
            if (!payingrentyesbtn.checked == true) {
                saved_basic_current_page = 'None'
            }
        }

        if (saved_basic_current_page == '2') {
            if (!ilhpyesbtn.checked == true && !section80oiyesbtn.checked == true && !section80ttayesbtn.checked == true) {
                saved_basic_current_page = 'None'
            }
        }
        if (saved_basic_current_page == '3') {
            if (!section80dyesbtn.checked == true && !section80udddependentbtn.checked == true && !section80uddselfbtn.checked == true &&
                !section80uddbothbtn.checked == true && !section80eeyes_80eebbtn.checked == true && !section80ccdyesbtn.checked == true) {
                saved_basic_current_page = 'None'
            }

        }
        if (saved_basic_current_page == '4') {
            if (!section80Cyesbtn.checked == true) {
                saved_basic_current_page = 'None'
            }
        }
        
        if (sectionyes_previousempbtn) {
            if (saved_basic_current_page == '5') {
                if (!sectionyes_previousempbtn.checked == true) {
                    saved_basic_current_page = 'None'
                }
            }
        }
    }

    if (saved_basic_empid) {
        if (saved_basic_current_page != 'None') {
            displayFlag = false;            
        }
    }

    if (displayFlag) {
        prevBtn_btn.disabled = false;
        nextBtn_btn.disabled = false;
    } else {
        prevBtn_btn.disabled = true;
        nextBtn_btn.disabled = true;
    }

}

function file_names() {
    console.log('rent_section', rent_section)
    console.log('pan_section', pan_section)
    console.log('SelfOccupied_file', self_occupiedfile_1)
    console.log('Letout_file', letout_file)
    console.log('file_80EE', file_80ee)
    console.log('file_80EEA', file_80eea)
    console.log('OTHER_file', other_file)
    // console.log('file_80TTA', file_80tta)


    console.log('file_80D', file_80d)
    console.log('file_80DDB', file_80ddb)
    console.log('file_80E', file_80e)
    console.log('file_80U', file_80u)
    console.log('file_80DD', file_80dd)
    console.log('file_80EEB', file_80eeb)
    console.log('file_80CCD', file_80ccd)



    console.log('file_80C_LIC', file_80c_lic)
    console.log('file_80C_PODT', file_80c_podt)
    console.log('file_80C_ULIP', file_80c_ulip)
    console.log('file_80C_NSC', file_80c_nsc)
    console.log('file_80C_NSC_INT', file_80c_nsc_int)
    console.log('file_80C_PPF', file_80c_ppf)



    console.log('file_80C_principal', file_80c_principal)
    console.log('file_80C_Tution', file_80c_tution)
    console.log('file_80C_MF', file_80c_mf)
    console.log('file_80C_FD', file_80c_fd)
    console.log('file_80CCC', file_80ccc)
    console.log('file_80C_Sukanya', file_80c_sukanya)
    console.log('previous_empl_file', previous_empl_file)
}


// 58



function convertToMidnight(dateString) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    const formattedDate = date.toString();
    return formattedDate;
}




function disable_btns() {
    let disable_btns_Flag = true;


    if (localStorage.getItem('currentTab')) {

        if (currentTab == 6) {
            let disable_btns_Flag2 = true;

            if (!placeInput.value || placeErrorSpan.textContent != '' || itproofcheckBox.checked == false) {
                disable_btns_Flag2 = false;
            }

            if (disable_btns_Flag2) {
                SaveData_btn.disabled = false;
                if (SubmitData_btn) {
                    SubmitData_btn.disabled = false;
                }
            } else {
                SaveData_btn.disabled = true;
                if (SubmitData_btn) {
                    SubmitData_btn.disabled = true;
                }
            }

        }
    }

    if (payingrentyesbtn.checked == true) {

        if (convertToMidnight(EndDate1input.value) != new Date(financialYearEnd) && convertToMidnight(EndDate2input.value) != new Date(financialYearEnd) &&
            convertToMidnight(EndDate3input.value) != new Date(financialYearEnd) && convertToMidnight(EndDate4input.value) != new Date(financialYearEnd) &&
            convertToMidnight(EndDate5input.value) != new Date(financialYearEnd)) {
            disable_btns_Flag = false;
        }
        if (hra_form1section.style.display == 'table-row') {
            if (LandlordPAN1ErrorSpan.textContent != '' || MonthRent1ErrorSpan.textContent != '' || landlordContact1ErrorSpan.textContent != '' || Pincode1ErrorSpan.textContent != '' || lanlordName1ErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            } else if (!EndDate1input.value || !MonthRent1input.value) {
                disable_btns_Flag = false;
            } else if (StartDate1input.value && EndDate1input.value && MonthRent1input.value > 0) {
                if (!LandlordPAN1input.value || !Pincode1input.value || !cityType1input.value || !lanlordName1input.value || !landlordAddress1input.value || !rentedAddress1input.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (rent_2.style.display == 'table-row') {
            if (LandlordPAN2ErrorSpan.textContent != '' || MonthRent2ErrorSpan.textContent != '' || landlordContact2ErrorSpan.textContent != '' || Pincode2ErrorSpan.textContent != '' || lanlordName2ErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            } else if (!EndDate2input.value || !MonthRent2input.value) {
                disable_btns_Flag = false;
            } else if (StartDate2input.value && EndDate2input.value && MonthRent2input.value > 0) {
                if (!LandlordPAN2input.value || !Pincode2input.value || !cityType2input.value || !lanlordName2input.value || !landlordAddress2input.value || !rentedAddress2input.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (rent_3.style.display == 'table-row') {
            if (LandlordPAN3ErrorSpan.textContent != '' || MonthRent3ErrorSpan.textContent != '' || landlordContact3ErrorSpan.textContent != '' || Pincode3ErrorSpan.textContent != '' || lanlordName3ErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            } else if (!EndDate3input.value || !MonthRent3input.value) {
                disable_btns_Flag = false;
            } else if (StartDate3input.value && EndDate3input.value && MonthRent3input.value > 0) {
                if (!LandlordPAN3input.value || !Pincode3input.value || !cityType3input.value || !lanlordName3input.value || !landlordAddress3input.value || !rentedAddress3input.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (rent_4.style.display == 'table-row') {
            if (LandlordPAN4ErrorSpan.textContent != '' || MonthRent4ErrorSpan.textContent != '' || landlordContact4ErrorSpan.textContent != '' || Pincode4ErrorSpan.textContent != '' || lanlordName4ErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            } else if (!EndDate4input.value || !MonthRent4input.value) {
                disable_btns_Flag = false;
            } else if (StartDate4input.value && EndDate4input.value && MonthRent4input.value > 0) {
                if (!LandlordPAN4input.value || !Pincode4input.value || !cityType4input.value || !lanlordName4input.value || !landlordAddress4input.value || !rentedAddress4input.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (rent_5.style.display == 'table-row') {
            if (LandlordPAN5ErrorSpan.textContent != '' || MonthRent5ErrorSpan.textContent != '' || landlordContact5ErrorSpan.textContent != '' || Pincode5ErrorSpan.textContent != '' || lanlordName5ErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            } else if (!EndDate5input.value || !MonthRent5input.value) {
                disable_btns_Flag = false;
            } else if (StartDate5input.value && EndDate5input.value && MonthRent5input.value > 0) {
                if (!LandlordPAN5input.value || !Pincode5input.value || !cityType5input.value || !lanlordName5input.value || !landlordAddress5input.value || !rentedAddress5input.value) {
                    disable_btns_Flag = false;
                }
            }
        }

        if (MonthRent1input.value <= 0 && MonthRent2input.value <= 0 && MonthRent3input.value <= 0 && MonthRent4input.value <= 0 && MonthRent5input.value <= 0) {
            disable_btns_Flag = false;
        }


    }

    if (ilhpyesbtn.checked == true) {

        if (selfOccupiedHousePropertyErrorSpan.textContent != '' || otherselfHomeLoanLenderNameErrorSpan.textContent != '' || otherselfHomeLoanLenderPANErrorSpan.textContent != '' ||
            annualLettableValueErrorSpan.textContent != '' || municipalPropertyTaxErrorSpan.textContent != '' || homeLoanInterestErrorSpan.textContent != '' || otherloanLenderNameErrorSpan.textContent != '' || otherloanLenderPANErrorSpan.textContent != '' ||
            loan_amountErrorSpan.textContent != '' || property_valueErrorSpan.textContent != '' || home_loanErrorSpan.textContent != '' || otherloan_lenderErrorSpan.textContent != '' || otherlender_panErrorSpan.textContent != '' || property_value_otherErrorSpan.textContent != '') {
            disable_btns_Flag = false;
        }

        if (selfOccupiedHousePropertyInp.value > 0) {
            if (!selfHomeLoanLenderNameInp.value || !self_date.value) {
                disable_btns_Flag = false;
            } else if (selfHomeLoanLenderNameInp.value == 'other') {
                if (!otherselfHomeLoanLenderNameInp.value || !otherselfHomeLoanLenderPANInp.value) {
                    disable_btns_Flag = false;
                }
            } else {
                if (!selfHomeLoanLenderPANInp.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (annualLettableValueInp.value > 0) {
            if (!municipalPropertyTaxInp.value || !homeLoanInterestInp.value || !incomeLossOnHousePropertyInp.value || !standardDeductionInp.value || !loanLenderNameInp.value) {
                disable_btns_Flag = false;
            } else if (loanLenderNameInp.value == 'other') {
                if (!otherloanLenderNameInp.value || !otherloanLenderPANInp.value) {
                    disable_btns_Flag = false;
                }
            } else {
                if (!loanLenderPANInp.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (loan_amountInp.value > 0) {
            if (!loan_amountInp.value || !property_valueInp.value || !home_loanInp.value || !loan_lenderInp.value) {
                disable_btns_Flag = false;
            } else if (loan_lenderInp.value == 'other') {
                if (!otherloan_lenderInp.value || !otherlender_panInp.value) {
                    disable_btns_Flag = false;
                }
            } else {
                if (!lender_panInp.value) {
                    disable_btns_Flag = false;
                }
            }
        }
        if (property_value_otherInp.value > 0) {
            if (!property_value_otherInp.value) {
                disable_btns_Flag = false;
            }
        }
        if (!selfOccupiedHousePropertyInp.value && !annualLettableValueInp.value && !loan_amountInp.value && !property_value_otherInp.value) {
            disable_btns_Flag = false;
        }
    }

    if (section80oiyesbtn.checked == true) {
        if (other_income_ErrorSpan.textContent != '') {
            disable_btns_Flag = false;
        }
        if (!other_income_oiInp.value) {
            disable_btns_Flag = false;
        }
    }

    if (section80ttayesbtn.checked == true) {
        if (interest_80tta_errorSpan.textContent != '') {
            disable_btns_Flag = false;
        }
        if (!interest_80ttaInp.value) {
            console.log('interest_80ttaInp')
            disable_btns_Flag = false;
        }
    }

    if (section80dyesbtn.checked == true) {
        if (section80dyes_mip.checked == true) {
            if (medical_insurance_self_mipErrorSpan.textContent != '' || medical_insurance_parents_mipErrorSpan.textContent != '' || mediclaim_insurance_parents_mipErrorSpan.textContent != '' || preventive_health_checkup_mipErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            }
            if (!medical_insurance_self_mip.value || !medical_insurance_parents_mip.value || !mediclaim_insurance_parents_mip.value || !preventive_health_checkup_mip.value) {
                disable_btns_Flag = false;
            }
        }
        if (selected_illness.value) {
            if (treatment_valueErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            }
            if (non_senior_citizenbtn.checked != true && senior_citizenbtn.checked != true && bothbtn.checked != true) {
                disable_btns_Flag = false;
            }
            if (!treatment_value.value) {
                disable_btns_Flag = false;
            }
        }
        if (interest_educationErrorSpan.textContent != '') {
            disable_btns_Flag = false;
        }
        if (section80dyes_mip.checked == false && !selected_illness.value) {
            if (!interest_education.value) {
                disable_btns_Flag = false;
            }
        }
    }

    if (section80udddependentbtn.checked == true) {
        if (!paymentDependentDisability.value > 0) {
            disable_btns_Flag = false;
        }
    }
    if (section80uddselfbtn.checked == true) {
        if (!paymentSelfDisability.value > 0) {
            disable_btns_Flag = false;
        }
    }
    if (section80uddbothbtn.checked == true) {
        if (!paymentSelfDisability.value > 0 || !paymentDependentDisability.value > 0) {
            disable_btns_Flag = false;
        }
    }
    if (section80eeyes_80eebbtn.checked == true) {
        if (loan_sanctioned_date_80eeb.value) {
            if (vehicle_loan_80eebErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            }
            if (!vehicle_loan_80eeb.value || !loan_lender_80eeb.value) {
                disable_btns_Flag = false;
            } else if (loan_lender_80eeb.value == 'other') {
                if (!other80eebLender.value || !other80eebPAN.value || other80eebLenderErrorSpan.textContent != '' || other80eebPANErrorSpan.textContent != '') {
                    disable_btns_Flag = false;
                }
            } else {
                if (!loan_lender_80eeb.value) {
                    disable_btns_Flag = false;
                }
            }
        } else {
            disable_btns_Flag = false;
        }
    }

    if (section80ccdyesbtn.checked == true) {
        if (section80ccdselfcheck.checked == true) {
            if (Inp_80ccd1bnpsErrorSpan.textContent != '' || prannumberErrorSpan.textContent != '') {
                disable_btns_Flag = false;
            }
            if (!Inp_80ccd1bnps.value) {
                disable_btns_Flag = false;
            }
        }
        if (section80ccdselfcheck.checked == false && section80ccdebpcheck.checked == false) {
            disable_btns_Flag = false;
        }
    }

    if (sectionyes_previousempbtn) {
        if (sectionyes_previousempbtn.checked == true) {
            if (salary_previousemp_Error.textContent != '' || provident_fund_Error.textContent != '' || professional_tax_Error.textContent != '' || income_tax_Error.textContent != '') {
                disable_btns_Flag = false;
            }
            if (!salary_previousemp.value) {
                disable_btns_Flag = false;
            }
        }
    }

    if (section80Cyesbtn.checked == true) {
        if (paymentLifeInsuranceErrorSpan.textContent != '' || timeDepositErrorSpan.textContent != '' || ulipContributionErrorSpan.textContent != '' || nscSubscriptionErrorSpan.textContent != '' || nscInterestErrorSpan.textContent != '' || ppfContributionErrorSpan.textContent != '' ||
            houseLoanErrorSpan.textContent != '' || tuitionFeeErrorSpan.textContent != '' || mutualFundSubscriptionErrorSpan.textContent != '' || termDepositsErrorSpan.textContent != '' || pensionContributionErrorSpan.textContent != '' || sukanyaSamriddhiErrorSpan.textContent != '') {
            disable_btns_Flag = false;
        }
        if (!paymentLifeInsuranceInp.value && !timeDepositInp.value && !ulipContributionInp.value && !nscSubscriptionInp.value && !nscInterestInp.value && !ppfContributionInp.value &&
            !houseLoanInp.value && !tuitionFeeInp.value && !mutualFundSubscriptionInp.value && !termDepositsInp.value && !pensionContributionInp.value && !sukanyaSamriddhiInp.value) {
            disable_btns_Flag = false;
        }
    }


    if (disable_btns_Flag == false) {
        SaveData1_btn.disabled = true;
        SaveData2_btn.disabled = true;
        SaveData3_btn.disabled = true;
        SaveData4_btn.disabled = true;

        if (SaveData5_btn) {
            SaveData5_btn.disabled = true;
        }
        if (SubmitData_btn) {
            SubmitData_btn.disabled = true;
        }
    } else {
        SaveData1_btn.disabled = false;
        SaveData2_btn.disabled = false;
        SaveData3_btn.disabled = false;
        SaveData4_btn.disabled = false;
        if (SaveData5_btn) {
            SaveData5_btn.disabled = false;
        }
        if (SubmitData_btn) {
            SubmitData_btn.disabled = false;
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    display_submit();
    disable_btns();
    display_func();
});






function display_save1btn() {

    let displayFlag = true;
    if (payingrentyesbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }

    if (current_time_date1 > edit_48_hrs1) {        
        displayFlag = false;        
    }
    if (maker_1Date){
        displayFlag = false; 
    }

    if (displayFlag) {        
        savebtnhra_section.style.display = 'block';
    } else {
        savebtnhra_section.style.display = 'none';
    }
}



function display_save2btn() {
    let displayFlag = true;
    if (ilhpyesbtn.checked == true || section80oiyesbtn.checked == true || section80ttayesbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }
    if (current_time_date1 > edit_48_hrs1) {        
        displayFlag = false;        
    }
    if (maker_1Date){
        displayFlag = false; 
    }
    if (displayFlag) {
        savebtn_ilh_section.style.display = 'block';
    } else {
        savebtn_ilh_section.style.display = 'none';
    }
}



function display_save3btn() {
    let displayFlag = true;
    if (section80dyesbtn.checked == true || section80uddselfbtn.checked == true || section80udddependentbtn.checked == true
        || section80uddbothbtn.checked == true || section80eeyes_80eebbtn.checked == true || section80ccdyesbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }
    if (current_time_date1 > edit_48_hrs1) {        
        displayFlag = false;        
    }
    if (maker_1Date){
        displayFlag = false; 
    }
    if (displayFlag) {
        savebtn_80ded_section.style.display = 'block';
    } else {
        savebtn_80ded_section.style.display = 'none';
    }
}





function display_save4btn() {

    let displayFlag = true;
    if (section80Cyesbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }
    if (current_time_date1 > edit_48_hrs1) {        
        displayFlag = false;        
    }
    if (maker_1Date){
        displayFlag = false; 
    }
    if (displayFlag) {
        savebtn_80C_section.style.display = 'block';
    } else {
        savebtn_80C_section.style.display = 'none';
    }
}





function display_save5btn() {
    let displayFlag = true;
    if (sectionyes_previousempbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }
    if (current_time_date1 > edit_48_hrs1) {        
        displayFlag = false;        
    }
    if (maker_1Date){
        displayFlag = false; 
    }
    if (displayFlag) {
        savebtn_prev_section.style.display = 'block';
    } else {
        savebtn_prev_section.style.display = 'none';
    }
}



