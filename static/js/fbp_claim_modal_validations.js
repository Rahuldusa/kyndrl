

var digitally_signed_road = document.getElementById('digitally_signed_road');

var submit_road_btn = document.getElementById('submit_road_btn');

var road_dec_form = document.getElementById('road_dec_form'); //form id

var road_check_1 = document.getElementById('road_check_1');
var road_check_2 = document.getElementById('road_check_2');
var road_check_3 = document.getElementById('road_check_3');


function enable_sign_road(){
    if (road_check_1.checked == true || road_check_2.checked == true || road_check_3.checked == true){
        digitally_signed_road.disabled = false;
    } else{
        digitally_signed_road.disabled = true;
    }
}


function SignedDigitallyStatus_road(){
    if (digitally_signed_road.checked == true ){
        submit_road_btn.disabled = false;
    } else{
        submit_road_btn.disabled = true;
    }
}

function submit_road() {
    if (submit_road_btn.disabled == false) {
        var apiUrl = 'road_dec_file';
        road_dec_form.action = apiUrl;
        road_dec_form.submit()
    } else {
        if (digitally_signed_road.disabled == true){
            alert('Please check any from list')
        }
        if (digitally_signed_road.checked == false) {
            digitally_signed_road.setCustomValidity("Please Check this field");
            digitally_signed_road.reportValidity();
        }
    }
}


var lta_dec_form = document.getElementById('lta_dec_form'); // form 

var digitally_signed_lta = document.getElementById('digitally_signed_lta'); //check
var submit_lta_btn = document.getElementById('submit_lta_btn'); // submit btn

var st_point = document.getElementById('st_point');
var end_point = document.getElementById('end_point');
var tra_mode = document.getElementById('tra_mode');
var tot_fare = document.getElementById('tot_fare');

var st_dt = document.getElementById('st_dt');
var end_dt = document.getElementById('end_dt');


var fam_dec_tbl = document.getElementById('fam_dec_tbl');

var fm_1 = document.getElementById('fm_1');
var fm_2 = document.getElementById('fm_2');
var fm_3 = document.getElementById('fm_3');
var fm_4 = document.getElementById('fm_4');
var fm_5 = document.getElementById('fm_5');
var fm_6 = document.getElementById('fm_6');
var fm_7 = document.getElementById('fm_7');
var fm_8 = document.getElementById('fm_8');


var rel_1 = document.getElementById('rel_1');
var rel_2 = document.getElementById('rel_2');
var rel_3 = document.getElementById('rel_3');
var rel_4 = document.getElementById('rel_4');
var rel_5 = document.getElementById('rel_5');
var rel_6 = document.getElementById('rel_6');
var rel_7 = document.getElementById('rel_7');
var rel_8 = document.getElementById('rel_8');


var fm_place = document.getElementById('fm_place');

function enable_check_fm(){
    enable_yes = true;

    if (!st_point.value || !end_point.value || !tra_mode.value || !tot_fare.value || !st_dt.value || !end_dt.value || !fm_place.value){
        enable_yes = false;        
    }

    if (!fm_1.value && !fm_2.value && !fm_3.value && !fm_4.value && !fm_5.value && !fm_6.value && !fm_7.value && !fm_8.value){
        enable_yes = false;        
    }

    if (!rel_1.value && !rel_2.value && !rel_3.value && !rel_4.value && !rel_5.value && !rel_6.value && !rel_7.value && !rel_8.value){
        enable_yes = false;        
    }

    if (enable_yes == true){
        digitally_signed_lta.disabled = false;
    } else {
        digitally_signed_lta.disabled = true;
    }

}

function SignedDigitallyStatus_lta(){
    if (digitally_signed_lta.checked == true){
        submit_lta_btn.disabled = false;
    } else {
        submit_lta_btn.disabled = true;
    }
}

function submit_lta(){
    if (submit_lta_btn.disabled == false){
        var apiUrl = 'lta_dec_file';
        lta_dec_form.action = apiUrl;
        lta_dec_form.submit()
    } else{
        if (!st_point.value) {
            st_point.setCustomValidity("Please Fill this field");
            st_point.reportValidity();
        } 
        if (!end_point.value) {
            end_point.setCustomValidity("Please Fill this field");
            end_point.reportValidity();
        }
        if (!tra_mode.value) {
            tra_mode.setCustomValidity("Please Fill this field");
            tra_mode.reportValidity();
        }
        if (!tot_fare.value) {
            tot_fare.setCustomValidity("Please Fill this field");
            tot_fare.reportValidity();
        }
        if (!st_dt.value) {
            st_dt.setCustomValidity("Please Fill this field");
            st_dt.reportValidity();
        }
        if (!end_dt.value) {
            end_dt.setCustomValidity("Please Fill this field");
            end_dt.reportValidity();
        }
        if (!fm_1.value && !fm_2.value && !fm_3.value && !fm_4.value && !fm_5.value && !fm_6.value && !fm_7.value && !fm_8.value){
            alert("Please Fill any from family member's details")
        }
        if (!rel_1.value && !rel_2.value && !rel_3.value && !rel_4.value && !rel_5.value && !rel_6.value && !rel_7.value && !rel_8.value){
            alert("Please Fill any from family member's details")
        }
        if (digitally_signed_lta.checked == false) {
            digitally_signed_lta.setCustomValidity("Please Check this field");
            digitally_signed_lta.reportValidity();
        }
    }
}


var driver_dec_form = document.getElementById('driver_dec_form') // form
var digitally_signed_driver = document.getElementById('digitally_signed_driver') // check box
var submit_driver_btn = document.getElementById('submit_driver_btn') // submit btn


var driv_name = document.getElementById('driv_name')
var name_dr = document.getElementById('name_dr')



function enable_driv_check(){
    if ( driv_name.value && name_dr.value ){
        digitally_signed_driver.disabled = false;
    } else{
        digitally_signed_driver.disabled = true;
    }
}

function SignedDigitallyStatus_driver(){
    if (digitally_signed_driver.checked == true){
        submit_driver_btn.disabled = false;
    } else{
        submit_driver_btn.disabled = true;
    }
}

function submit_driver(){
    if (submit_driver_btn.disabled == false){
        var apiUrl = 'drive_dec_file';
        driver_dec_form.action = apiUrl;
        driver_dec_form.submit()
    } else{
       
        if (!driv_name.value) {
            driv_name.setCustomValidity("Please Fill this field");
            driv_name.reportValidity();
        }
        if (!name_dr.value) {
            name_dr.setCustomValidity("Please Fill this field");
            name_dr.reportValidity();
        }
         
        if (digitally_signed_driver.checked == false) {
            digitally_signed_driver.setCustomValidity("Please Check this field");
            digitally_signed_driver.reportValidity();
        }
    }
}




document.addEventListener("DOMContentLoaded", function () {

    if(dec_da){
        if (driv_name){
            enable_driv_check();
        }                 
        if (road_check_1){
            enable_sign_road();
        }                
        if(st_point){
            enable_check_fm();
        }

    }
});
