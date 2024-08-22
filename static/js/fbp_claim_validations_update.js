

var fuelModal = document.getElementById('f_M_form_edit');
if (fuelModal) {
    document.addEventListener('DOMContentLoaded', function () {

        fuelModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget; // Button that triggered the modal
            var fuel_id_no = button.getAttribute('data-id-no');
            var expenseDate = button.getAttribute('data-expense-date');
            var claimedAmount = button.getAttribute('data-claimed-amount');
            var receiptNo = button.getAttribute('data-receipt-no');
            var vehicleNo = button.getAttribute('data-vehicle-no');

            // Update the modal's input fields
            var modal = fuelModal;
            modal.querySelector('#fuel_id_no').value = fuel_id_no;
            modal.querySelector('#f_expenseDate_edit').value = expenseDate;
            modal.querySelector('#f_claimedAmount_edit').value = claimedAmount;
            modal.querySelector('#f_receiptNo_edit').value = receiptNo;
            modal.querySelector('#f_VehNumber_edit').value = vehicleNo;
        });

    });
}

var roadModal = document.getElementById('r_v_form_edit');
if (roadModal) {
    document.addEventListener('DOMContentLoaded', function () {
        roadModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget; // Button that triggered the modal
            var road_id_no = button.getAttribute('data-id-no');
            var expenseDate = button.getAttribute('data-expense-date');
            var claimedAmount = button.getAttribute('data-claimed-amount');
            var receiptNo = button.getAttribute('data-receipt-no');
            var vehicleNo = button.getAttribute('data-vehicle-no');

            // Update the modal's input fields
            var modal = roadModal;
            modal.querySelector('#road_id_no').value = road_id_no;
            modal.querySelector('#r_expenseDate_edit').value = expenseDate;
            modal.querySelector('#r_claimedAmount_edit').value = claimedAmount;
            modal.querySelector('#r_receiptNo_edit').value = receiptNo;
            modal.querySelector('#r_VehNumber_edit').value = vehicleNo;
        });

    });
}


var spouse_edit = document.getElementById('spouse_edit');
var children_edit = document.getElementById('children_edit');
var parents_edit = document.getElementById('parents_edit');


var lta_model_edit = document.getElementById('lta_model_edit');
if (lta_model_edit) {
    document.addEventListener('DOMContentLoaded', function () {
        lta_model_edit.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget; // Button that triggered the modal

            var lta_id_no = button.getAttribute('data-id-no');
            var expenseDate = button.getAttribute('data-expense-date');
            var claimedAmount = button.getAttribute('data-claimed-amount');
            var receiptNo = button.getAttribute('data-receipt-no');

            var stdt = button.getAttribute('data-StDt-date');
            var enddt = button.getAttribute('data-EndDt-date');
            var origin = button.getAttribute('data-origin-place');
            var travel = button.getAttribute('data-PlaceTravel-place');
            var famdec = button.getAttribute('data-FamDec-yr');
            var lastclaim = button.getAttribute('data-LastClaim-yr');

            var famdec_1 = famdec.split(',')

            // Update the modal's input fields
            var modal = lta_model_edit;
            modal.querySelector('#lta_id_no').value = lta_id_no;

            modal.querySelector('#ExpenseDt_edit').value = expenseDate;
            modal.querySelector('#Origin_edit').value = origin;
            modal.querySelector('#StDt_edit').value = stdt;
            modal.querySelector('#PlaceTravel_edit').value = travel;
            modal.querySelector('#EndDt_edit').value = enddt;
            modal.querySelector('#AmtClaimed_edit').value = claimedAmount;
            modal.querySelector('#LastClaim_edit').value = lastclaim;
            modal.querySelector('#RecNumber_edit').value = receiptNo;


            if (famdec_1.includes('Spouse')) {
                spouse_edit.checked = true;
            } else {
                spouse_edit.checked = false;
            }
            if (famdec_1.includes('Children')) {
                children_edit.checked = true;
            } else {
                children_edit.checked = false;
            }
            if (famdec_1.includes('Parents')) {
                parents_edit.checked = true;
            } else {
                parents_edit.checked = false;
            }

        });

    });

}

var driverModal = document.getElementById('driver_model_edit');
if (driverModal) {
    document.addEventListener('DOMContentLoaded', function () {
        driverModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget; // Button that triggered the modal
            var driver_id_no = button.getAttribute('data-id-no');
            var expenseDate = button.getAttribute('data-expense-date');
            var claimedAmount = button.getAttribute('data-claimed-amount');
            var receiptNo = button.getAttribute('data-receipt-no');
            var salarymonth = button.getAttribute('data-salary-month');

            // Update the modal's input fields
            var modal = driverModal;
            modal.querySelector('#driver_id_no').value = driver_id_no;
            modal.querySelector('#d_ExpenseDt_edit').value = expenseDate;
            modal.querySelector('#d_DriveSal_edit').value = claimedAmount;
            modal.querySelector('#d_RecNumber_edit').value = receiptNo;

            var salaryMonthSelect = modal.querySelector('#d_SalaryMonth_edit');
            for (var i = 0; i < salaryMonthSelect.options.length; i++) {
                if (salaryMonthSelect.options[i].value === salarymonth) {
                    salaryMonthSelect.options[i].selected = true;
                    break;
                }
            }

        });

    });
}


var f_claimedAmount_edit = document.getElementById('f_claimedAmount_edit');
var d_DriveSal_edit = document.getElementById('d_DriveSal_edit');
var AmtClaimed_edit = document.getElementById('AmtClaimed_edit');

const f_expenseDate_edit = document.getElementById('f_expenseDate_edit');

const r_expenseDate_edit = document.getElementById('r_expenseDate_edit');

const ExpenseDt_edit = document.getElementById('ExpenseDt_edit');

const d_ExpenseDt_edit = document.getElementById('d_ExpenseDt_edit');

var StDt_edit = document.getElementById('StDt_edit');
var EndDt_edit = document.getElementById('EndDt_edit');

function validateD_Fuel_edit() {
    const selectedDate = new Date(f_expenseDate_edit.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        f_expenseDate_edit.value = null;
    }
}

function validateD_Road_edit() {
    const selectedDate = new Date(r_expenseDate_edit.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        r_expenseDate_edit.value = null;
    }
}

function validateD_LTA_edit() {
    const selectedDate = new Date(ExpenseDt_edit.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        ExpenseDt_edit.value = null;
    }
}

function validateD_driver_edit() {
    const selectedDate = new Date(d_ExpenseDt_edit.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        d_ExpenseDt_edit.value = null;
    }
}




function validateStartDt_edit() {
    if (StDt_edit.value) {
        const selectedDate = new Date(StDt_edit.value);
        if (selectedDate > currentDate) {
            alert('The date must be not in future.');
            StDt_edit.value = null;
            EndDt_edit.value = null;
            EndDt_edit.disabled = true;
        } else {
            EndDt_edit.value = null;
            EndDt_edit.disabled = false;
        }
    } else {
        EndDt_edit.value = null;
        EndDt_edit.disabled = true;
    }
}

function validateEndDt_edit() {
    if (EndDt_edit.value) {
        const selectedDate = new Date(EndDt_edit.value);
        const startdt = new Date(StDt_edit.value);

        if (selectedDate > currentDate || selectedDate < startdt) {
            alert('The date must be after leave start date and not in future.');
            EndDt_edit.value = null;
        }
    }
}




function validateFuel_edit() {
    if (f_claimedAmount_edit.value) {
        new_value = f_claimedAmount_edit.value;

        if (clc_new) {
            if (Number(new_value) > Number(36000)) {
                f_claimedAmount_edit.value = null;
                alert('Claimed Amount must not be more than 36000.')
            }
        } else if (have_car_new) {
            if (own_car_new) {
                if (cc_new == 'More than 1600 CC') {
                    if (Number(new_value) > Number(28800)) {
                        f_claimedAmount_edit.value = null;
                        alert('Claimed Amount must not be more than 28800.')
                    }
                }
                if (cc_new == 'Less than 1600 CC') {
                    if (Number(new_value) > Number(21600)) {
                        f_claimedAmount_edit.value = null;
                        alert('Claimed Amount must not be more than 21600.')
                    }
                }
            }

        }
    }
}

function validateA_driver_edit() {
    if (d_DriveSal_edit.value) {
        new_value = d_DriveSal_edit.value;

        if (clc_new) {
            if (Number(new_value) > Number(2100)) {
                d_DriveSal_edit.value = null;
                alert('Driver Salary must not be more than 2100.')
            }
        } else if (have_car_new) {
            if (Number(new_value) > Number(900)) {
                d_DriveSal_edit.value = null;
                alert('Driver Salary must not be more than 900.')
            }
        }
    }
}

function validateA_LTA_edit() {
    if (band == 'A' || band == 'B' || band == 'C' || band == 'D') {
        if (AmtClaimed_edit.value) {
            if (Number(AmtClaimed_edit.value) > Number(350000)) {
                AmtClaimed_edit.value = null;
                alert('Claimed Amount must not be more than 350000.');
            }
        }
    } else {
        if (AmtClaimed_edit.value) {
            if (Number(AmtClaimed_edit.value) > Number(200000)) {
                AmtClaimed_edit.value = null;
                alert('Claimed Amount must not be more than 200000.');
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {

    if (f_expenseDate_edit) {
        f_expenseDate_edit.setAttribute('max', formatDateString(currentDate));
        f_expenseDate_edit.setAttribute('min', formatDateString(pastDate));
    }

    if (r_expenseDate_edit) {
        r_expenseDate_edit.setAttribute('max', formatDateString(currentDate));
        r_expenseDate_edit.setAttribute('min', formatDateString(pastDate));
    }

    if (ExpenseDt_edit) {
        ExpenseDt_edit.setAttribute('max', formatDateString(currentDate));
        ExpenseDt_edit.setAttribute('min', formatDateString(pastDate));
    }

    if (d_ExpenseDt_edit) {
        d_ExpenseDt_edit.setAttribute('max', formatDateString(currentDate));
        d_ExpenseDt_edit.setAttribute('min', formatDateString(pastDate));
    }


    if (StDt_edit) {
        StDt_edit.setAttribute('max', formatDateString(currentDate));
    }
    if (EndDt_edit) {
        EndDt_edit.setAttribute('max', formatDateString(currentDate));
    }

});
