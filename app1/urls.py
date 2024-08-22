from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, re_path

from django.conf import settings
from django.conf.urls.static import static
from app1 import views

urlpatterns = [
    path('', views.Emp_login, name='Emp_login'),
    path('Emp_login/',views.Emp_login,name='Emp_login'),
    path('Emppage', views.Emppage, name='Emppage'),
    path('Emp_logout/', views.Emp_logout, name='Emp_logout'),
    path('Tax_Regime', views.Tax_Regime, name='Tax_Regime'),
    path('ITDeclarations', views.ITDeclarations, name='ITDeclarations'),
    path('formpage', views.formpage, name='formpage'),

    path('temp_carDeclarations', views.temp_carDeclarations, name='temp_carDeclarations'),
    path('del_temp_carDeclarations/<empid>', views.del_temp_carDeclarations, name='del_temp_carDeclarations'),


    path('car_declarations_submit', views.car_declarations_submit, name='car_declarations_submit'),

    path('temp_houserent', views.temp_houserent, name='temp_houserent'),
    path('del_temp_houserent/<str:empid>', views.del_temp_houserent, name='del_temp_houserent'),

    path('temp_incomeLoss', views.temp_incomeLoss, name='temp_incomeLoss'),
    path('del_temp_incomeLoss/<str:empid>', views.del_temp_incomeLoss, name='del_temp_incomeLoss'),

    path('upload_Self_file', views.upload_Self_file, name='upload_Self_file'),
    path('upload_education_file', views.upload_education_file, name='upload_education_file'),  

    path('temp_incomeLoss2', views.temp_incomeLoss2, name='temp_incomeLoss2'),


    path('temp_Other', views.temp_Other, name='temp_Other'),
    path('del_temp_Other/<str:empid>', views.del_temp_Other, name='del_temp_Other'),

    path('temp_80C', views.temp_80C, name='temp_80C'),
    path('del_temp_80C/<str:empid>', views.del_temp_80C, name='del_temp_80C'),

    path('temp_prevemp', views.temp_prevemp, name='temp_prevemp'),
    path('del_temp_prevemp/<str:empid>', views.del_temp_prevemp, name='del_temp_prevemp'),


    path('temp_prevemp2', views.temp_prevemp2, name='temp_prevemp2'),

    path('TaxDeclaration_submit', views.TaxDeclaration_submit, name='TaxDeclaration_submit'),

    path('TaxDeclaration_submit2', views.TaxDeclaration_submit2, name='TaxDeclaration_submit2'),

    

    path('workhistory', views.workhistory, name='workhistory'),
    path('cardeclaration_view', views.cardeclaration_view, name='cardeclaration_view'),
    path('iddeclaration_view', views.iddeclaration_view, name='iddeclaration_view'),
    path('regime_declaration_view', views.regime_declaration_view, name='regime_declaration_view'),
    path('form16_files', views.form16_files, name='form16_files'),

    path('itproof_sub', views.itproof_sub, name='itproof_sub'),
    path('itproofsubmissions', views.itproofsubmissions, name='itproofsubmissions'),
    
    path('upload_rent_file', views.upload_rent_file, name='upload_rent_file'),
    path('upload_pan_file', views.upload_pan_file, name='upload_pan_file'),


    path('save_it_proof', views.save_it_proof, name='save_it_proof'),
    path('Submit_it_proof', views.Submit_it_proof, name='Submit_it_proof'),


    path('emp_12bb', views.emp_12bb, name='emp_12bb'),

    path('upload_80c_file', views.upload_80c_file, name='upload_80c_file'),
    path('upload_80c_nsc_int_file', views.upload_80c_nsc_int_file, name='upload_80c_nsc_int_file'),
    path('upload_80ccc_file', views.upload_80ccc_file, name='upload_80ccc_file'),   
    path('upload_80ccd1b_file', views.upload_80ccd1b_file, name='upload_80ccd1b_file'),
    path('upload_Self_occupied_file', views.upload_Self_occupied_file, name='upload_Self_occupied_file'),  
    path('upload_letout_file', views.upload_letout_file, name='upload_letout_file'), 
    path('upload_80EE_file', views.upload_80EE_file, name='upload_80EE_file'),
    path('upload_80EEA_file', views.upload_80EEA_file, name='upload_80EEA_file'),   
    path('upload_other_income_file', views.upload_other_income_file, name='upload_other_income_file'),  
    # path('upload_80tta_file', views.upload_80tta_file, name='upload_80tta_file'), 
    path('upload_prev_emp_file', views.upload_prev_emp_file, name='upload_prev_emp_file'),

    path('upload_80d_file', views.upload_80d_file, name='upload_80d_file'),  
    path('upload_80ddb_file', views.upload_80ddb_file, name='upload_80ddb_file'), 
    path('upload_80E_file', views.upload_80E_file, name='upload_80E_file'),
    path('upload_80U_file', views.upload_80U_file, name='upload_80U_file'), 
    path('upload_80DD_file', views.upload_80DD_file, name='upload_80DD_file'),
    path('upload_80eeb_file', views.upload_80eeb_file, name='upload_80eeb_file'), 

    path('viewhraform',views.viewhraform,name='viewhraform'),
    path('view_80Ded_form',views.view_80Ded_form,name='view_80Ded_form'),   
    path('view_80C_form',views.view_80C_form,name='view_80C_form'),
    path('view_80EEB_form',views.view_80EEB_form,name='view_80EEB_form'),
    path('view_80TTA_form',views.view_80TTA_form,name='view_80TTA_form'),      
    path('view_other_form',views.view_other_form,name='view_other_form'),
    path('view_80ee_form', views.view_80ee_form, name='view_80ee_form'),
    path('view_80eea_form', views.view_80eea_form, name='view_80eea_form'),
    path('view_ilhp_form_both',views.view_ilhp_form_both,name='view_ilhp_form_both'),
    path('view_hra_hl_form',views.view_hra_hl_form,name='view_hra_hl_form'), 
    path('view_ilhp_form_self',views.view_ilhp_form_self,name='view_ilhp_form_self'),
    path('view_ilhp_form_let',views.view_ilhp_form_let,name='view_ilhp_form_let'),  

    path('resub_1', views.resub_1, name='resub_1'),
    path('resub_2', views.resub_2, name='resub_2'),

    
    #test

    path('file_table_display', views.file_table_display, name='file_table_display'),
    
    path('change_table_data', views.change_table_data, name='change_table_data'),  
    path('fbpclaim', views.fbpclaim, name='fbpclaim'),

    path('itproofdisplay', views.itproofdisplay, name='itproofdisplay'),

    path('upload_80c_file_r1', views.upload_80c_file_r1, name='upload_80c_file_r1'),
    path('upload_80c_nsc_int_file_r1', views.upload_80c_nsc_int_file_r1, name='upload_80c_nsc_int_file_r1'),
    path('upload_all_file_r1', views.upload_all_file_r1, name='upload_all_file_r1'),

    path('upload_80c_file_r2', views.upload_80c_file_r2, name='upload_80c_file_r2'),
    path('upload_80c_nsc_int_file_r2', views.upload_80c_nsc_int_file_r2, name='upload_80c_nsc_int_file_r2'),
    path('upload_all_file_r2', views.upload_all_file_r2, name='upload_all_file_r2'),

    path('emp_fbp_claim', views.emp_fbp_claim, name='emp_fbp_claim'),

    path('emp_fuel_submit', views.emp_fuel_submit, name='emp_fuel_submit'),
    path('emp_road_submit', views.emp_road_submit, name='emp_road_submit'),
    path('emp_lta_submit', views.emp_lta_submit, name='emp_lta_submit'),
    path('emp_driver_submit', views.emp_driver_submit, name='emp_driver_submit'),

    path('delete_fbp_fuel/<str:reciept>', views.delete_fbp_fuel, name='delete_fbp_fuel'),

    path('delete_fbp_road/<str:reciept>', views.delete_fbp_road, name='delete_fbp_road'),
    path('delete_fbp_lta/<str:reciept>', views.delete_fbp_lta, name='delete_fbp_lta'),
    path('delete_fbp_driver/<str:reciept>', views.delete_fbp_driver, name='delete_fbp_driver'),

    path('update_fuel', views.update_fuel, name='update_fuel'),
    path('update_road', views.update_road, name='update_road'),
    path('update_lta', views.update_lta, name='update_lta'),
    path('update_driver', views.update_driver, name='update_driver'),

    path('fbp_submit', views.fbp_submit, name='fbp_submit'),

    path('fbp_history<str:claim_no>', views.fbp_history, name='fbp_history'), 
    

    path('save_fbp_claims', views.save_fbp_claims, name='save_fbp_claims'),

    path('road_dec_file', views.road_dec_file, name='road_dec_file'),
    path('lta_dec_file', views.lta_dec_file, name='lta_dec_file'),   
    path('drive_dec_file', views.drive_dec_file, name='drive_dec_file'),

    path('reminder_mail', views.reminder_mail, name='reminder_mail'),

    path('render_pdf_view', views.render_pdf_view, name='render_pdf_view'),
        
]   

  
