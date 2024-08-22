

function Validate_Fuel_amt(index){    
    var dec_amt = fuelData[index];
    var id = `fuel_allowed_value_${index}`;
    

    var app_amt = document.getElementById(id);

    var re_id = `fuel_remark_${index}`;
    var remark = document.getElementById(re_id);
    
    if (Number(app_amt.value) > Number(dec_amt)){
        alert('Approved amount should not be more than Declared amount.')
        app_amt.value = null;
    } 
    if (Number(app_amt.value) < Number(dec_amt)){
        remark.required = true;
    } else {
        remark.required = false;
    }

    validateTotalFuelAllowed(index);

}


function validateTotalFuelAllowed(changedIndex) {
    var total = 0;
    var exceedLimit = false;

    for (var key in fuelData) {
        var id = `fuel_allowed_value_${key}`;
        var app_amt = document.getElementById(id).value;

        if (!exceedLimit) {
            total += Number(app_amt);

            if (total > Number(rem_fuel)) {
                exceedLimit = true;
                alert('Total approved amount should not be more than remaining fuel.');

                // Set the current input and all subsequent inputs to null
                for (var subsequentKey in fuelData) {
                    if (Number(subsequentKey) >= Number(key)) {
                        document.getElementById(`fuel_allowed_value_${subsequentKey}`).value = null;
                    }
                }
            }
        }
    }
}


function Validate_Road_amt(index){    
    var dec_amt = roadData[index];
    var id = `road_allowed_value_${index}`;
    var app_amt = document.getElementById(id);

    var re_id = `road_remark_${index}`;
    var remark = document.getElementById(re_id);
    
    if (Number(app_amt.value) > Number(dec_amt)){
        alert('Approved amount should not be more than Declared amount.')
        app_amt.value = null;
    }
    if (Number(app_amt.value) < Number(dec_amt)){
        remark.required = true;
    } else {
        remark.required = false;
    }
}



function Validate_lta_amt(index){    
    var dec_amt = ltaData[index];
    var id = `lta_allowed_value_${index}`;
    var app_amt = document.getElementById(id);

    var re_id = `lta_remark_${index}`;
    var remark = document.getElementById(re_id);
    
    if (Number(app_amt.value) > Number(dec_amt)){
        alert('Approved amount should not be more than Declared amount.')
        app_amt.value = null;
    }
    if (Number(app_amt.value) < Number(dec_amt)){
        remark.required = true;
    } else {
        remark.required = false;
    }
}


function Validate_Driver_amt(index){    
    var dec_amt = driverData[index];
    var id = `driver_allowed_value_${index}`;
    var app_amt = document.getElementById(id);

    var re_id = `driver_remark_${index}`;
    var remark = document.getElementById(re_id);
    
    if (Number(app_amt.value) > Number(dec_amt)){
        alert('Approved amount should not be more than Declared amount.')
        app_amt.value = null;
    }
    if (Number(app_amt.value) < Number(dec_amt)){
        remark.required = true;
    } else {
        remark.required = false;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    if (Object.keys(fuelData).length > 0) {
        for (var i = 1; i <= Object.keys(fuelData).length; i++) {
            Validate_Fuel_amt(i);
        }
    }

    if (Object.keys(roadData).length > 0) {
        for (var i = 1; i <= Object.keys(roadData).length; i++) {
            Validate_Road_amt(i);
        }
    }

    if (Object.keys(ltaData).length > 0) {
        for (var i = 1; i <= Object.keys(ltaData).length; i++) {
            Validate_lta_amt(i);
        }
    }

    if (Object.keys(driverData).length > 0) {
        for (var i = 1; i <= Object.keys(driverData).length; i++) {
            Validate_Driver_amt(i);
        }
    }
});