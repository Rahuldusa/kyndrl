


var f_M_yes = document.getElementById('f_M_yes');
var f_M_no = document.getElementById('f_M_no');
var f_M_block = document.getElementById('f_M_block');


var r_v_yes = document.getElementById('r_v_yes');
var r_v_no = document.getElementById('r_v_no');
var r_v_block = document.getElementById('r_v_block');


var lta_yes = document.getElementById('lta_yes');
var lta_no = document.getElementById('lta_no');
var lta_block = document.getElementById('lta_block');

var driver_yes = document.getElementById('driver_yes');
var driver_no = document.getElementById('driver_no');
var driver_block = document.getElementById('driver_block');




function f_M_model_validation() {
    if (f_M_yes.checked == true) {        
        document.addEventListener('DOMContentLoaded', function () {
            var modalElement = document.getElementById('f_M_form');
            
            if (modalElement) {
                var myModal = new bootstrap.Modal(modalElement);

                var openModalButton_1 = document.getElementById('openModalButton_1');
                if (openModalButton_1) {
                    openModalButton_1.addEventListener('click', function () {
                        myModal.show();
                    });
                } else {
                    console.error('Element with ID "openModalButton_1" not found.');
                }
            } else {
                console.error('Element with ID "f_M_form" not found.');
            }
        });
    }
}

function f_M_model_validation_2() {
    if (f_M_yes.checked == true) {        
        document.addEventListener('DOMContentLoaded', function () {
            var modalElement = document.getElementById('f_M_form_edit');
            
            if (modalElement) {
                var myModal = new bootstrap.Modal(modalElement);

                var openModalButton_1 = document.getElementById('openModalButton_1');
                if (openModalButton_1) {
                    openModalButton_1.addEventListener('click', function () {
                        myModal.show();
                    });
                } else {
                    console.error('Element with ID "openModalButton_1" not found.');
                }
            } else {
                console.error('Element with ID "f_M_form_edit" not found.');
            }
        });
    }
}

function validate_f_M() {
    if (f_M_yes.checked == true) {
        f_M_block.style.display = 'block';
    } else {
        f_M_block.style.display = 'none';
    }
    f_M_model_validation();
}



function r_v_model_validation() {
    if (r_v_yes.checked == true) {
        document.addEventListener('DOMContentLoaded', function () {
            var modalElement = document.getElementById('r_v_form');

            if (modalElement) {
                var myModal = new bootstrap.Modal(modalElement);

                var openModalButton_2 = document.getElementById('openModalButton_2');
                if (openModalButton_2) {
                    openModalButton_2.addEventListener('click', function () {
                        myModal.show();
                    });
                } else {
                    console.error('Element with ID "openModalButton_2" not found.');
                }
            } else {
                console.error('Element with ID "r_v_form" not found.');
            }
        });
    }

}


function validate_r_v() {
    if (r_v_yes.checked == true) {
        r_v_block.style.display = 'block';
    } else {
        r_v_block.style.display = 'none';
    }
    r_v_model_validation();
}


function lta_model_validation() {
    if (lta_yes.checked == true) {
        document.addEventListener('DOMContentLoaded', function () {
            var modalElement = document.getElementById('lta_form');

            if (modalElement) {
                var myModal = new bootstrap.Modal(modalElement);

                var openModalButton_3 = document.getElementById('openModalButton_3');
                if (openModalButton_3) {
                    openModalButton_3.addEventListener('click', function () {
                        myModal.show();
                    });
                } else {
                    console.error('Element with ID "openModalButton_3" not found.');
                }
            } else {
                console.error('Element with ID "lta_form" not found.');
            }
        });
    }

}

function validate_lta() {
    if (lta_yes.checked == true) {
        lta_block.style.display = 'block';
    } else {
        lta_block.style.display = 'none';
    }
    lta_model_validation();
}

function driver_model_validation() {
    if (driver_yes.checked == true) {
        document.addEventListener('DOMContentLoaded', function () {
            var modalElement = document.getElementById('driver_form');

            if (modalElement) {
                var myModal = new bootstrap.Modal(modalElement);

                var openModalButton_3 = document.getElementById('openModalButton_3');
                if (openModalButton_3) {
                    openModalButton_3.addEventListener('click', function () {
                        myModal.show();
                    });
                } else {
                    console.error('Element with ID "openModalButton_3" not found.');
                }
            } else {
                console.error('Element with ID "driver_form" not found.');
            }
        });
    }
}

function validate_driver() {
    if (driver_yes.checked == true) {
        driver_block.style.display = 'block';
    } else {
        driver_block.style.display = 'none';
    }
    driver_model_validation();
}







var fuel_tb = fuel_tb
var road_tb = road_tb
var lta_tb = lta_tb
var driver_tb = driver_tb


document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.onkeydown = function (event) {
            return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code !== 'Space';
        };
    });


    if (fuel_tb){
        f_M_yes.checked = true;
        validate_f_M();
        f_M_model_validation_2();
    }
    if (road_tb){
        r_v_yes.checked = true;
        validate_r_v();
    }
    if (lta_tb){
        lta_yes.checked = true;
        validate_lta();
    }
    if (driver_tb){
        driver_yes.checked = true;
        validate_driver();
    }
});


function resetForm() {
    document.getElementById('p_s_form').reset();
}
  