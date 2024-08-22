from django.urls import path
from app2 import views

urlpatterns = [
    path('', views.user_login, name='user_login'),
    path('user_login', views.user_login, name='user_login'),   
    path('user_logout', views.user_logout, name='user_logout'), 
    

    path('verifier1_dashboard', views.verifier1_dashboard, name='verifier1_dashboard'),     
    path('verifier2_dashboard', views.verifier2_dashboard, name='verifier2_dashboard'),
    path('admin_dashboard', views.admin_dashboard, name='admin_dashboard'),

    path('maker_emp_page', views.maker_emp_page, name='maker_emp_page'),
    path('submit_maker', views.submit_maker, name='submit_maker'), 

    path('checker_emp_page', views.checker_emp_page, name='checker_emp_page'),   
    path('submit_checker', views.submit_checker, name='submit_checker'),   

    path('submit_checker_2', views.submit_checker_2, name='submit_checker_2'),

    path('submit_checker_3', views.submit_checker_3, name='submit_checker_3'),
    
    path('maker_control_number', views.maker_control_number, name='maker_control_number'),
    
    path('maker_emp_page_cnumber<str:id>', views.maker_emp_page_cnumber, name='maker_emp_page_cnumber'),

    path('checker_control_number', views.checker_control_number, name='checker_control_number'),
    path('checker_emp_page_cnumber<str:id>', views.checker_emp_page_cnumber, name='checker_emp_page_cnumber'),

    path('chekcer_emppage_1<str:inputEmpNo>', views.chekcer_emppage_1, name='chekcer_emppage_1'),


    path('fbp_verifier1', views.fbp_verifier1, name='fbp_verifier1'),
    path('fbp_verifier2', views.fbp_verifier2, name='fbp_verifier2'),
    path('fbp_resubDashboard', views.fbp_resubDashboard, name='fbp_resubDashboard'),


    path('fbp_maker_emp', views.fbp_maker_emp, name='fbp_maker_emp'),
    path('fbp_maker_verify<str:claim_no>', views.fbp_maker_verify, name='fbp_maker_verify'),
    path('fbp_maker_submit', views.fbp_maker_submit, name='fbp_maker_submit'),


    path('fbp_checker_emp', views.fbp_checker_emp, name='fbp_checker_emp'),
    path('fbp_checker_verify<str:claim_no>', views.fbp_checker_verify, name='fbp_checker_verify'),
    path('fbp_checker_submit', views.fbp_checker_submit, name='fbp_checker_submit'),
    path('fbp_checker_onhold<str:claim_no>', views.fbp_checker_onhold, name='fbp_checker_onhold'),


    path('fbp_resub_emp', views.fbp_resub_emp, name='fbp_resub_emp'),
    path('fbp_resub_verify<str:claim_no>', views.fbp_resub_verify, name='fbp_resub_verify'),
    path('fbp_resub_submit', views.fbp_resub_submit, name='fbp_resub_submit'),
]