
// Set the minimum date to the current date
var currentDate = new Date();
var formattedCurrentDate = currentDate.toISOString().split('T')[0];

function openPdf2(empid) {

    var new_empid = empid.split(",")

    var empid1 = new_empid[0]
    var filaname = new_empid[1]
    var filepath = new_empid[2]


    var file_paths = filepath.split('/')

    var new_file_path = file_paths[3]

    var url = "/static/media/" + empid1 + "/" + new_file_path;

    var New_fileName = filaname.replace(/\./g, '');

    document.getElementById('viewFrame').src = url


}


var digitally_signed = document.getElementById('digitally_signed');
var hraDec = document.getElementById('hraDec');

var mode_of_pay = document.getElementById('mode_of_pay');


if (saved_hra_empid) {
    function validateMode_of_pay() {
        if (mode_of_pay.value) {
            digitally_signed.disabled = false;
        } else {
            digitally_signed.disabled = true;
        }
    }
}


function hraSignedDigitallyStatus() {
    if (digitally_signed.checked == true) {
        hraDec.disabled = false;
    } else {
        hraDec.disabled = true;
    }

}

var saved_hra_dec = document.getElementById('saved_hra_dec');

function submit_hraDec() {
    if (hraDec.disabled == false) {
        var apiUrl = 'viewhraform';
        saved_hra_dec.action = apiUrl;
        saved_hra_dec.submit()
    } else {
        if (digitally_signed.disabled == true) {
            if (!mode_of_pay.value) {
                mode_of_pay.setCustomValidity("Please fill this field");
                mode_of_pay.reportValidity();
            }
        }
        if (digitally_signed.checked == false) {
            digitally_signed.setCustomValidity("Please Check this field");
            digitally_signed.reportValidity();
        }
    }
}

function cancelcheck1() {
    digitally_signed.checked = false;
}



var digitally_signed_80c = document.getElementById('digitally_signed_80c');
var submit_80C_btn = document.getElementById('submit_80C_btn');

var lic_for = document.getElementById('lic_for');
var ppf_for = document.getElementById('ppf_for');
var c80_place = document.getElementById('c80_place');



function enable_80c_check() {

    disable_btn = true;

    if (saved_80C_lic) {
        if (!lic_for.value) {
            disable_btn = false
        }
    }
    if (saved_80C_ppf) {
        if (!ppf_for.value) {
            disable_btn = false
        }
    }

    if (!c80_place.value) {
        disable_btn = false
    }


    if (disable_btn == true) {
        digitally_signed_80c.disabled = false;
    } else {
        digitally_signed_80c.disabled = true;
    }

}


function SignedDigitallyStatus_80C() {
    if (digitally_signed_80c.checked == true) {
        submit_80C_btn.disabled = false;
    } else {
        submit_80C_btn.disabled = true;
    }
}

var dec_80c_form = document.getElementById('dec_80c_form');

function submit_80C() {
    if (submit_80C_btn.disabled == false) {
        var apiUrl = 'view_80C_form';
        dec_80c_form.action = apiUrl;
        dec_80c_form.submit()
    } else {
        if (!c80_place.value) {
            c80_place.setCustomValidity("Please fill this field");
            c80_place.reportValidity();
        }
        if (saved_80C_ppf) {
            if (!ppf_for.value) {
                ppf_for.setCustomValidity("Please fill this field");
                ppf_for.reportValidity();
            }
        }
        if (saved_80C_lic) {
            if (!lic_for.value) {
                lic_for.setCustomValidity("Please fill this field");
                lic_for.reportValidity();
            }
        }
        if (digitally_signed_80c.checked == false) {
            digitally_signed_80c.setCustomValidity("Please Check this field");
            digitally_signed_80c.reportValidity();
        }

    }
}

function cancelcheck3() {
    digitally_signed_80c.checked = false;
}




var mip_for = document.getElementById('mip_for');
var dependent_dis_for = document.getElementById('dependent_dis_for');
var critical_illness_for = document.getElementById('critical_illness_for');
var education_loan_for = document.getElementById('education_loan_for');

var digitally_signed_80Ded = document.getElementById('digitally_signed_80Ded');
var submit_80Ded_btn = document.getElementById('submit_80Ded_btn');

var ded80_place = document.getElementById('ded80_place');


function enable_80d_check() {
    disable_check = true;
    if (medical_insurance_self_mip.value > 0) {
        if (!mip_for.value) {
            disable_check = false;
        }
    }
    if (paymentDependentDisability.value) {
        if (!dependent_dis_for.value) {
            disable_check = false;
        }
    }
    if (treatment_value.value) {
        if (!critical_illness_for.value) {
            disable_check = false;
        }
    }
    if (interest_education.value) {
        if (!education_loan_for.value) {
            disable_check = false;
        }
    }
    if (!ded80_place.value) {
        disable_check = false;
    }

    if (disable_check == true) {
        digitally_signed_80Ded.disabled = false;
    } else {
        digitally_signed_80Ded.disabled = true;
    }
}


function SignedDigitallyStatus_80Ded() {
    if (digitally_signed_80Ded.checked == true) {
        submit_80Ded_btn.disabled = false;
    } else {
        submit_80Ded_btn.disabled = true;
    }
}

var dec_80Ded_form = document.getElementById('dec_80Ded_form');

function submit_80Ded() {
    if (submit_80Ded_btn.disabled == false) {
        var apiUrl = 'view_80Ded_form';
        dec_80Ded_form.action = apiUrl;
        dec_80Ded_form.submit()
    } else {

        if (!ded80_place.value) {
            ded80_place.setCustomValidity("Please Fill this field");
            ded80_place.reportValidity();
        }

        if (medical_insurance_self_mip.value) {
            if (!mip_for.value) {
                mip_for.setCustomValidity("Please select this field");
                mip_for.reportValidity();
            }
        }
        if (paymentDependentDisability.value) {
            if (!dependent_dis_for.value) {
                dependent_dis_for.setCustomValidity("Please select this field");
                dependent_dis_for.reportValidity();
            }
        }
        if (treatment_value.value) {
            if (!critical_illness_for.value) {
                critical_illness_for.setCustomValidity("Please select this field");
                critical_illness_for.reportValidity();
            }
        }
        if (interest_education.value) {
            if (!education_loan_for.value) {
                education_loan_for.setCustomValidity("Please select this field");
                education_loan_for.reportValidity();
            }
        }
        if (digitally_signed_80Ded.checked == false) {
            digitally_signed_80Ded.setCustomValidity("Please Check this field");
            digitally_signed_80Ded.reportValidity();
        }
    }
}

function cancelcheck3_80Ded() {
    digitally_signed_80Ded.checked = false;
}


var digitally_signed_80EEB = document.getElementById('digitally_signed_80EEB');
var submit_80EEB_btn = document.getElementById('submit_80EEB_btn');


function SignedDigitallyStatus_80EEB() {
    if (digitally_signed_80EEB.checked == true) {
        submit_80EEB_btn.disabled = false;

    } else {
        submit_80EEB_btn.disabled = true;

    }
}

var dec_80eeb_form = document.getElementById('dec_80eeb_form');

var veh_reg_num = document.getElementById('veh_reg_num');
var eeb80_place = document.getElementById('eeb80_place');

function validateVeh_reg_num() {
    var pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    var new_value = veh_reg_num.value.toUpperCase();
    veh_reg_num.value = new_value
    if (new_value) {
        if (!pattern.test(new_value)) {
            digitally_signed_80EEB.disabled = true;
            veh_reg_num.setCustomValidity("Registration number should match the pattern AA11AA1111.");
            veh_reg_num.reportValidity();
        } else {
            digitally_signed_80EEB.disabled = false;
        }
    } else {
        digitally_signed_80EEB.disabled = true;
    }
}

function enable_80eeb_chck() {
    check_80eeb = true;

    var pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    var new_value = veh_reg_num.value.toUpperCase();
    veh_reg_num.value = new_value
    if (new_value) {
        if (!pattern.test(new_value)) {
            check_80eeb = false;
            veh_reg_num.setCustomValidity("Registration number should match the pattern AA11AA1111.");
            veh_reg_num.reportValidity();
        } else {
            check_80eeb = true;
        }
    } else {
        check_80eeb = false;
    }

    if (!eeb80_place.value) {
        check_80eeb = false;
    }

    if (check_80eeb == true) {
        digitally_signed_80EEB.disabled = false;
    } else {
        digitally_signed_80EEB.disabled = true;
    }
}

function submit_80EEB() {
    if (submit_80EEB_btn.disabled == false) {
        var apiUrl = 'view_80EEB_form';
        dec_80eeb_form.action = apiUrl;
        dec_80eeb_form.submit()
    } else {
        if (!eeb80_place.value) {
            eeb80_place.setCustomValidity("Please fill this field");
            eeb80_place.reportValidity();
        }
        if (!veh_reg_num.value) {
            veh_reg_num.setCustomValidity("Please fill this field");
            veh_reg_num.reportValidity();
        }
        if (digitally_signed_80EEB.checked == false) {
            digitally_signed_80EEB.setCustomValidity("Please Check this field");
            digitally_signed_80EEB.reportValidity();
        }
    }
}

function cancelcheck4() {
    digitally_signed_80EEB.checked = false;
}



var digitally_signed_80TTA = document.getElementById('digitally_signed_80TTA');
var submit_80TTA_btn = document.getElementById('submit_80TTA_btn');


function SignedDigitallyStatus_80TTA() {
    if (digitally_signed_80TTA.checked == true) {
        submit_80TTA_btn.disabled = false;
    } else {
        submit_80TTA_btn.disabled = true;
    }
}

function submit_80TTA() {
    if (submit_80TTA_btn.disabled == false) {
        var apiUrl = 'view_80TTA_form';
        submit_80TTA_btn.href = apiUrl;
    } else {
        if (digitally_signed_80TTA.checked == false) {
            digitally_signed_80TTA.setCustomValidity("Please Check this field");
            digitally_signed_80TTA.reportValidity();
        }
    }
}

function cancelcheck5() {
    digitally_signed_80TTA.checked = false;
}

var dec_other_form = document.getElementById('dec_other_form');
var digitally_signed_other = document.getElementById('digitally_signed_other');
var submit_other_btn = document.getElementById('submit_other_btn');

var other_place = document.getElementById('other_place');

function enable_other_check() {
    if (other_place.value) {
        digitally_signed_other.disabled = false;
    } else {
        digitally_signed_other.disabled = true;
    }
}

function SignedDigitallyStatus_other() {
    if (digitally_signed_other.checked == true) {
        submit_other_btn.disabled = false;
    } else {
        submit_other_btn.disabled = true;
    }
}

function submit_other() {
    if (submit_other_btn.disabled == false) {
        var apiUrl = 'view_other_form';
        dec_other_form.action = apiUrl;
        dec_other_form.submit()
    } else {
        if (!other_place.value) {
            other_place.setCustomValidity("Please Fill this field");
            other_place.reportValidity();
        }
        if (digitally_signed_other.checked == false) {
            digitally_signed_other.setCustomValidity("Please Check this field");
            digitally_signed_other.reportValidity();
        }
    }
}

function cancelcheck6() {
    digitally_signed_other.checked = false;
}


var ilh_dec_form_both = document.getElementById('ilh_dec_form_both');
var digitally_signed_ilhp_both = document.getElementById('digitally_signed_ilhp_both');
var submit_ilhp_btn_both = document.getElementById('submit_ilhp_btn_both');



var ilh_dec_form_self = document.getElementById('ilh_dec_form_self');

var sole_join_owner_self = document.getElementById('sole_join_owner_self');
var name_joint_owner_slef = document.getElementById('name_joint_owner_slef');
var relationship_self = document.getElementById('relationship_self');

var extent_income_tax_self = document.getElementById('extent_income_tax_self');
var extent_income_tax_selfError = document.getElementById('extent_income_tax_selfError');
var principal_loan_tax_self = document.getElementById('principal_loan_tax_self');
var principal_loan_tax_selfError = document.getElementById('principal_loan_tax_selfError');

var property_address_self = document.getElementById('property_address_self');

var barrow_date_self = document.getElementById('barrow_date_self');
var barrowdate_selfError = document.getElementById('barrowdate_selfError');
var possession_date_self = document.getElementById('possession_date_self');
var possessiondate_selfError = document.getElementById('possessiondate_selfError');

var digitally_signed_ilhp_self = document.getElementById('digitally_signed_ilhp_self');
var submit_ilhp_btn_self = document.getElementById('submit_ilhp_btn_self');

if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
    document.getElementById('barrow_date_self').max = formattedCurrentDate;
    document.getElementById('possession_date_self').max = formattedCurrentDate;
}



if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
    document.getElementById('barrow_date_self').max = formattedCurrentDate;
    document.getElementById('possession_date_self').max = formattedCurrentDate;
    document.getElementById('barrow_date_let').max = formattedCurrentDate;
    document.getElementById('possession_date_let').max = formattedCurrentDate;
}

function enable_check_both() {
    if (sole_join_owner_self.value && extent_income_tax_self.value && principal_loan_tax_self.value && property_address_self.value &&
        barrow_date_self.value && possession_date_self.value && extent_income_tax_selfError.textContent === '' && principal_loan_tax_selfError.textContent === '' &&
        barrowdate_selfError.textContent === '' && possessiondate_selfError.textContent === '' &&
        sole_join_owner_let.value && extent_income_tax_let.value && principal_loan_tax_let.value && property_address_let.value &&
        barrow_date_let.value && possession_date_let.value && extent_income_tax_letError.textContent === '' && principal_loan_tax_letError.textContent === '' &&
        barrowdate_letError.textContent === '' && possession_date_letError.textContent === '') {


        if (sole_join_owner_self.value == 'jointly' && sole_join_owner_let.value != 'jointly') {
            if (name_joint_owner_slef.value && relationship_self.value) {
                digitally_signed_ilhp_both.disabled = false;
            } else {
                digitally_signed_ilhp_both.disabled = true;
            }
        } else if (sole_join_owner_let.value == 'jointly' && sole_join_owner_self.value != 'jointly') {
            if (name_joint_owner_let.value && relationship_let.value) {
                digitally_signed_ilhp_both.disabled = false;
            } else {
                digitally_signed_ilhp_both.disabled = true;
            }
        } else if (sole_join_owner_self.value == 'jointly' && sole_join_owner_let.value == 'jointly') {
            if (name_joint_owner_slef.value && relationship_self.value && name_joint_owner_let.value && relationship_let.value) {
                digitally_signed_ilhp_both.disabled = false;
            } else {
                digitally_signed_ilhp_both.disabled = true;
            }
        } else {
            digitally_signed_ilhp_both.disabled = false;
        }

    } else {
        digitally_signed_ilhp_both.disabled = true;
    }
}

function enable_check_self() {
    if (sole_join_owner_self.value && extent_income_tax_self.value && principal_loan_tax_self.value && property_address_self.value &&
        barrow_date_self.value && possession_date_self.value && extent_income_tax_selfError.textContent === '' && principal_loan_tax_selfError.textContent === '' &&
        barrowdate_selfError.textContent === '' && possessiondate_selfError.textContent === '') {
        if (sole_join_owner_self.value == 'jointly') {
            if (name_joint_owner_slef.value && relationship_self.value) {
                digitally_signed_ilhp_self.disabled = false;
            } else {
                digitally_signed_ilhp_self.disabled = true;
            }
        } else {
            digitally_signed_ilhp_self.disabled = false;
        }
    } else {
        digitally_signed_ilhp_self.disabled = true;
    }

}


function validateSole_join_owner_self() {
    if (sole_join_owner_self.value) {
        extent_income_tax_self.disabled = false;
        if (sole_join_owner_self.value == 'jointly') {
            name_joint_owner_slef.disabled = false;
            relationship_self.disabled = false;
            extent_income_tax_self.readOnly = false;
            if (extent_income_tax_self.value) {
                extent_income_tax_self.value = null;
            }
        } else {
            extent_income_tax_self.value = 100;
            extent_income_tax_self.readOnly = true;
            name_joint_owner_slef.disabled = true;
            relationship_self.disabled = true;
            name_joint_owner_slef.value = null;
            relationship_self.value = null;
        }
    } else {
        if (extent_income_tax_self.value) {
            extent_income_tax_self.value = null;
        }
        extent_income_tax_self.disabled = true;
        name_joint_owner_slef.disabled = true;
        relationship_self.disabled = true;
        name_joint_owner_slef.value = null;
        relationship_self.value = null;
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validateName_self() {
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}
function validateRelation_self() {
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validateextent_income_tax_self() {
    if (extent_income_tax_self.value) {
        var inputValue = extent_income_tax_self.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0 || Number(inputValue) > 100) {
            extent_income_tax_selfError.textContent = "Please enter a positive integer value between 1-100.";
        } else {
            extent_income_tax_selfError.textContent = ''
        }
    } else {
        extent_income_tax_selfError.textContent = ''
    }
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validatePrincipal_loan_tax_self() {
    if (principal_loan_tax_self.value) {
        var inputValue = principal_loan_tax_self.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            principal_loan_tax_selfError.textContent = "Please enter a positive interger."
        } else {
            principal_loan_tax_selfError.textContent = ''
        }
    } else {
        principal_loan_tax_selfError.textContent = ''
    }
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validateBarrowDate_self() {
    var inputDateValue = barrow_date_self.value;
    var inputDate = new Date(inputDateValue);

    var currentDate = new Date();
    if (inputDate > currentDate) {
        barrowdate_selfError.textContent = 'Borrow date cannot be in the future.';
    } else {
        barrowdate_selfError.textContent = '';
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validatePossession_selfDate() {
    var inputDateValue = possession_date_self.value;
    var inputDate = new Date(inputDateValue);

    var currentDate = new Date();
    if (inputDate > currentDate) {
        possessiondate_selfError.textContent = 'Possession date cannot be in the future.';
    } else {
        possessiondate_selfError.textContent = '';
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
        enable_check_self();
    }
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function SignedDigitallyStatus_ilhp_self() {
    if (digitally_signed_ilhp_self.disabled == false) {
        if (digitally_signed_ilhp_self.checked == true) {
            submit_ilhp_btn_self.disabled = false;
        } else {
            submit_ilhp_btn_self.disabled = true;
        }
    } else {
        submit_ilhp_btn_self.disabled = true;
    }
}

function submit_ilhp_self() {
    if (submit_ilhp_btn_self.disabled == false) {
        var apiUrl = 'view_ilhp_form_self';
        ilh_dec_form_self.action = apiUrl;
        ilh_dec_form_self.submit()
    } else {
        if (!sole_join_owner_self.value) {
            sole_join_owner_self.setCustomValidity("Please fill this field");
            sole_join_owner_self.reportValidity();
        } else if (sole_join_owner_self.value == 'jointly') {
            if (!name_joint_owner_slef.value) {
                name_joint_owner_slef.setCustomValidity("Please fill this field");
                name_joint_owner_slef.reportValidity();
            } else if (!relationship_self.value) {
                relationship_self.setCustomValidity("Please fill this field");
                relationship_self.reportValidity();
            }
        }
        if (!extent_income_tax_self.value) {
            extent_income_tax_self.setCustomValidity("Please fill this field");
            extent_income_tax_self.reportValidity();
        } else if (!principal_loan_tax_self.value) {
            principal_loan_tax_self.setCustomValidity("Please fill this field");
            principal_loan_tax_self.reportValidity();
        } else if (!property_address_self.value) {
            property_address_self.setCustomValidity("Please fill this field");
            property_address_self.reportValidity();
        } else if (!barrow_date_self.value) {
            barrow_date_self.setCustomValidity("Please fill this field");
            barrow_date_self.reportValidity();
        } else if (!possession_date_self.value) {
            possession_date_self.setCustomValidity("Please fill this field");
            possession_date_self.reportValidity();
        } else if (digitally_signed_ilhp_self.checked == false) {
            digitally_signed_ilhp_self.setCustomValidity("Please Check this field");
            digitally_signed_ilhp_self.reportValidity();
        }

    }
}



function cancelcheck2_self() {
    digitally_signed_ilhp_self.checked = false;
}



var ilh_dec_form_let = document.getElementById('ilh_dec_form_let');

var sole_join_owner_let = document.getElementById('sole_join_owner_let');
var name_joint_owner_let = document.getElementById('name_joint_owner_let');
var relationship_let = document.getElementById('relationship_let');

var extent_income_tax_let = document.getElementById('extent_income_tax_let');
var extent_income_tax_letError = document.getElementById('extent_income_tax_letError');
var principal_loan_tax_let = document.getElementById('principal_loan_tax_let');
var principal_loan_tax_letError = document.getElementById('principal_loan_tax_letError');

var property_address_let = document.getElementById('property_address_let');

var barrow_date_let = document.getElementById('barrow_date_let');
var barrowdate_letError = document.getElementById('barrowdate_letError');
var possession_date_let = document.getElementById('possession_date_let');
var possession_date_letError = document.getElementById('possession_date_letError');

var digitally_signed_ilhp_let = document.getElementById('digitally_signed_ilhp_let');
var submit_ilhp_btn_let = document.getElementById('submit_ilhp_btn_let');


if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
    document.getElementById('barrow_date_let').max = formattedCurrentDate;
    document.getElementById('possession_date_let').max = formattedCurrentDate;
}

function enable_check_let() {
    if (sole_join_owner_let.value && extent_income_tax_let.value && principal_loan_tax_let.value && property_address_let.value &&
        barrow_date_let.value && possession_date_let.value && extent_income_tax_letError.textContent === '' && principal_loan_tax_letError.textContent === '' &&
        barrowdate_letError.textContent === '' && possession_date_letError.textContent === '') {
        if (sole_join_owner_let.value == 'jointly') {
            if (name_joint_owner_let.value && relationship_let.value) {
                digitally_signed_ilhp_let.disabled = false;
            } else {
                digitally_signed_ilhp_let.disabled = true;
            }
        } else {
            digitally_signed_ilhp_let.disabled = false;
        }
    } else {
        digitally_signed_ilhp_let.disabled = true;
    }
}



function validateSole_join_owner_let() {
    if (sole_join_owner_let.value) {
        extent_income_tax_let.disabled = false;
        if (sole_join_owner_let.value == 'jointly') {
            name_joint_owner_let.disabled = false;
            relationship_let.disabled = false;
            extent_income_tax_let.readOnly = false;
            if (extent_income_tax_let.value) {
                extent_income_tax_let.value = null;
            }
        } else {
            extent_income_tax_let.readOnly = true;
            extent_income_tax_let.value = 100;
            name_joint_owner_let.disabled = true;
            relationship_let.disabled = true;
            name_joint_owner_let.value = null;
            relationship_let.value = null;
        }
    } else {
        extent_income_tax_let.disabled = true;
        if (extent_income_tax_let.value) {
            extent_income_tax_let.value = null;
        }
        name_joint_owner_let.disabled = true;
        relationship_let.disabled = true;
        name_joint_owner_let.value = null;
        relationship_let.value = null;
    }

    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validateName_let() {
    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}
function validateRelation_let() {
    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validateextent_income_tax_let() {
    if (extent_income_tax_let.value) {
        var inputValue = extent_income_tax_let.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0 || Number(inputValue) > 100) {
            extent_income_tax_letError.textContent = "Please enter a positive integer value between 1-100.";
        } else {
            extent_income_tax_letError.textContent = ''
        }
    } else {
        extent_income_tax_letError.textContent = ''
    }

    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validatePrincipal_loan_tax_let() {
    if (principal_loan_tax_let.value) {
        var inputValue = principal_loan_tax_let.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            principal_loan_tax_letError.textContent = "Please enter a positive interger."
        } else {
            principal_loan_tax_letError.textContent = ''
        }
    } else {
        principal_loan_tax_letError.textContent = ''
    }

    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validateBarrowDate_let() {
    var inputDateValue = barrow_date_let.value;
    var inputDate = new Date(inputDateValue);

    var currentDate = new Date();
    if (inputDate > currentDate) {
        barrowdate_letError.textContent = 'Borrow date cannot be in the future.';
    } else {
        barrowdate_letError.textContent = '';
    }

    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }
    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function validatePossessionDate_let() {
    var inputDateValue = possession_date_let.value;
    var inputDate = new Date(inputDateValue);

    var currentDate = new Date();
    if (inputDate > currentDate) {
        possession_date_letError.textContent = 'Possession date cannot be in the future.';
    } else {
        possession_date_letError.textContent = '';
    }

    if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
        enable_check_let();
    }

    if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
        enable_check_both();
    }
}

function SignedDigitallyStatus_ilhp_let() {
    if (digitally_signed_ilhp_let.disabled == false) {
        if (digitally_signed_ilhp_let.checked == true) {
            submit_ilhp_btn_let.disabled = false;
        } else {
            submit_ilhp_btn_let.disabled = true;
        }
    } else {
        submit_ilhp_btn_let.disabled = true;
    }
}

function submit_ilhp_let() {
    if (submit_ilhp_btn_let.disabled == false) {
        var apiUrl = 'view_ilhp_form_let';
        ilh_dec_form_let.action = apiUrl;
        ilh_dec_form_let.submit()
    } else {
        if (!sole_join_owner_let.value) {
            sole_join_owner_let.setCustomValidity("Please fill this field");
            sole_join_owner_let.reportValidity();
        } else if (sole_join_owner_let.value == 'jointly') {
            if (!name_joint_owner_let.value) {
                name_joint_owner_let.setCustomValidity("Please fill this field");
                name_joint_owner_let.reportValidity();
            } else if (!relationship_let.value) {
                relationship_let.setCustomValidity("Please fill this field");
                relationship_let.reportValidity();
            }
        }
        if (!extent_income_tax_let.value) {
            extent_income_tax_let.setCustomValidity("Please fill this field");
            extent_income_tax_let.reportValidity();
        } else if (!principal_loan_tax_let.value) {
            principal_loan_tax_let.setCustomValidity("Please fill this field");
            principal_loan_tax_let.reportValidity();
        } else if (!property_address_let.value) {
            property_address_let.setCustomValidity("Please fill this field");
            property_address_let.reportValidity();
        } else if (!barrow_date_let.value) {
            barrow_date_let.setCustomValidity("Please fill this field");
            barrow_date_let.reportValidity();
        } else if (!possession_date_let.value) {
            possession_date_let.setCustomValidity("Please fill this field");
            possession_date_let.reportValidity();
        } else if (digitally_signed_ilhp_let.checked == false) {
            digitally_signed_ilhp_let.setCustomValidity("Please Check this field");
            digitally_signed_ilhp_let.reportValidity();
        }
    }
}


function cancelcheck2_let() {
    digitally_signed_ilhp_let.checked = false;
}

function SignedDigitallyStatus_ilhp_both() {
    if (digitally_signed_ilhp_both.disabled == false) {
        if (digitally_signed_ilhp_both.checked == true) {
            submit_ilhp_btn_both.disabled = false;
        } else {
            submit_ilhp_btn_both.disabled = true;
        }
    } else {
        submit_ilhp_btn_both.disabled = true;
    }
}

function submit_ilhp_both() {
    if (submit_ilhp_btn_both.disabled == false) {
        var apiUrl = 'view_ilhp_form_both';
        ilh_dec_form_both.action = apiUrl;
        ilh_dec_form_both.submit()
    } else {
        if (!sole_join_owner_self.value) {
            sole_join_owner_self.setCustomValidity("Please fill this field");
            sole_join_owner_self.reportValidity();
        } else if (sole_join_owner_self.value == 'jointly') {
            if (!name_joint_owner_slef.value) {
                name_joint_owner_slef.setCustomValidity("Please fill this field");
                name_joint_owner_slef.reportValidity();
            } else if (!relationship_self.value) {
                relationship_self.setCustomValidity("Please fill this field");
                relationship_self.reportValidity();
            }
        }
        if (!extent_income_tax_self.value) {
            extent_income_tax_self.setCustomValidity("Please fill this field");
            extent_income_tax_self.reportValidity();
        } else if (!principal_loan_tax_self.value) {
            principal_loan_tax_self.setCustomValidity("Please fill this field");
            principal_loan_tax_self.reportValidity();
        } else if (!property_address_self.value) {
            property_address_self.setCustomValidity("Please fill this field");
            property_address_self.reportValidity();
        } else if (!barrow_date_self.value) {
            barrow_date_self.setCustomValidity("Please fill this field");
            barrow_date_self.reportValidity();
        } else if (!possession_date_self.value) {
            possession_date_self.setCustomValidity("Please fill this field");
            possession_date_self.reportValidity();
        }

        if (!sole_join_owner_let.value) {
            sole_join_owner_let.setCustomValidity("Please fill this field");
            sole_join_owner_let.reportValidity();
        } else if (sole_join_owner_let.value == 'jointly') {
            if (!name_joint_owner_let.value) {
                name_joint_owner_let.setCustomValidity("Please fill this field");
                name_joint_owner_let.reportValidity();
            } else if (!relationship_let.value) {
                relationship_let.setCustomValidity("Please fill this field");
                relationship_let.reportValidity();
            }
        }
        if (!extent_income_tax_let.value) {
            extent_income_tax_let.setCustomValidity("Please fill this field");
            extent_income_tax_let.reportValidity();
        } else if (!principal_loan_tax_let.value) {
            principal_loan_tax_let.setCustomValidity("Please fill this field");
            principal_loan_tax_let.reportValidity();
        } else if (!property_address_let.value) {
            property_address_let.setCustomValidity("Please fill this field");
            property_address_let.reportValidity();
        } else if (!barrow_date_let.value) {
            barrow_date_let.setCustomValidity("Please fill this field");
            barrow_date_let.reportValidity();
        } else if (!possession_date_let.value) {
            possession_date_let.setCustomValidity("Please fill this field");
            possession_date_let.reportValidity();
        }


        if (digitally_signed_ilhp_both.checked == false) {
            digitally_signed_ilhp_both.setCustomValidity("Please Check this field");
            digitally_signed_ilhp_both.reportValidity();
        }
    }
}
function cancelcheck2_both() {
    digitally_signed_ilhp_both.checked = false;
}




var hra_hl_dec_form = document.getElementById('hra_hl_dec_form');

var hra_hl_startdt = document.getElementById('hra_hl_startdt');
var hra_hl_startdtError = document.getElementById('hra_hl_startdtError');
var hra_hl_enddt = document.getElementById('hra_hl_enddt');
var hra_hl_enddtError = document.getElementById('hra_hl_enddtError');

var digitally_signed_hra_hl = document.getElementById('digitally_signed_hra_hl')
var submit_hra_hl_btn = document.getElementById('submit_hra_hl_btn')

function enable_check_hra_hl() {
    if (hra_hl_startdt.value && hra_hl_enddt.value && hra_hl_startdtError.textContent === '' && hra_hl_enddtError.textContent === '') {
        digitally_signed_hra_hl.disabled = false;
    } else {
        digitally_signed_hra_hl.disabled = true;
    }
}

function validateHra_hl_startdt() {
    if (hra_hl_startdt.value) {
        if (new Date(hra_hl_startdt.value) < new Date(financialYearStart) || new Date(hra_hl_startdt.value) > new Date(financialYearEnd)) {
            hra_hl_startdtError.textContent = 'Start Date must be in between crrent financial year 2024-2025.';
        } else {
            hra_hl_startdtError.textContent = '';
        }
    } else {
        hra_hl_startdtError.textContent = '';
    }
    enable_check_hra_hl();
}

function validateHra_hl_enddt() {
    if (hra_hl_enddt.value) {
        if (new Date(hra_hl_enddt.value) < new Date(hra_hl_startdt.value)) {
            hra_hl_enddtError.textContent = 'End Date must be after start date.'
        } else if (new Date(hra_hl_enddt.value) < new Date(financialYearStart) || new Date(hra_hl_enddt.value) > new Date(financialYearEnd)) {
            hra_hl_enddtError.textContent = 'End Date must be in between crrent financial year 2024-2025.';
        } else {
            hra_hl_enddtError.textContent = ''
        }
    } else {
        hra_hl_startdtError.textContent = '';
    }
    enable_check_hra_hl();
}



function SignedDigitallyStatus_hra_hl() {
    if (digitally_signed_hra_hl.disabled == false) {
        if (digitally_signed_hra_hl.checked == true) {
            submit_hra_hl_btn.disabled = false
        } else {
            submit_hra_hl_btn.disabled = true
        }
    } else {
        submit_hra_hl_btn.disabled = true
    }
}

function submit_hra_hl() {
    if (submit_hra_hl_btn.disabled == false) {
        var apiUrl = 'view_hra_hl_form';
        hra_hl_dec_form.action = apiUrl;
        hra_hl_dec_form.submit()
    } else {
        if (!hra_hl_startdt.value) {
            hra_hl_startdt.setCustomValidity("Please fill this field");
            hra_hl_startdt.reportValidity();
        } else if (!hra_hl_enddt.value) {
            hra_hl_enddt.setCustomValidity("Please fill this field");
            hra_hl_enddt.reportValidity();
        } else if (digitally_signed_hra_hl.checked == false) {
            digitally_signed_hra_hl.setCustomValidity("Please Check this field");
            digitally_signed_hra_hl.reportValidity();
        }
    }
}




function cancelcheck7() {
    digitally_signed_hra_hl.checked = false;
}


document.addEventListener("DOMContentLoaded", function () {


    if (saved_hra_empid) {
        validateMode_of_pay();
    }

    if (saved_Ilhp_selfOccupiedHouseProperty) {
        if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value == 0) {
            enable_check_self();
            if (sole_join_owner_self.value == 'jointly') {
                extent_income_tax_self.disabled = false;
                name_joint_owner_slef.disabled = false;
                relationship_self.disabled = false;
            } else {
                validateSole_join_owner_self();
            }
        }
    }
    if (saved_Ilhp_annualLettableValue) {
        if (selfOccupiedHousePropertyInp.value == 0 && annualLettableValueInp.value > 0) {
            enable_check_let();
            if (sole_join_owner_let.value == 'jointly') {
                extent_income_tax_let.disabled = false;
                name_joint_owner_let.disabled = false;
                relationship_let.disabled = false;
            }
        }
    }
    if (saved_Ilhp_selfOccupiedHouseProperty && saved_Ilhp_annualLettableValue) {
        if (selfOccupiedHousePropertyInp.value > 0 && annualLettableValueInp.value > 0) {
            enable_check_both();
            if (sole_join_owner_self.value == 'jointly') {
                extent_income_tax_self.disabled = false;
                name_joint_owner_slef.disabled = false;
                relationship_self.disabled = false;
            } else {
                validateSole_join_owner_self();
            }
            if (sole_join_owner_let.value == 'jointly') {
                extent_income_tax_let.disabled = false;
                name_joint_owner_let.disabled = false;
                relationship_let.disabled = false;
            }

            if (property_address_self.value) {
                if (hra_hl_startdt.value) {
                    validateHra_hl_startdt();
                }
                if (hra_hl_enddt.value) {
                    validateHra_hl_enddt();
                }
            }
        }
    }
    if (saved_other80_medical || saved_other80_parent || saved_other80_senior || saved_other80_preventive || saved_other80_treatment || saved_other80_education || saved_other80_Dependent || saved_other80_SelfDis) {
        enable_80d_check();
    }
    if (saved_vehicle) {
        validateVeh_reg_num();
    }

    if (saved_80C_lic || saved_80C_ppf || saved_80C_tuition || saved_80C_sukanya) {
        enable_80c_check();
    }


});



var hl_80eea = document.getElementById('hl_80eea');
function validateHl_80eea() {
    if (hl_80eea.value) {
        if (Number(hl_80eea.value) > Number(3500000)) {
            hl_80eea.value = Number(3500000);
        }
    }
}


