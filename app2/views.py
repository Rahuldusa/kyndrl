from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import *
from app1.models import *
from django.contrib.auth.hashers import check_password
from django.core.mail import send_mail
from django.conf import settings
import random
import string
from datetime import datetime, date
from django.utils import timezone
from datetime import timedelta

from django.template.loader import render_to_string
from io import BytesIO
from xhtml2pdf import pisa
from django.core.mail import EmailMessage
from django.urls import reverse

from django.db.models import Q
from django.core.serializers import serialize
import json

def verifier1_dashboard(request):
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    data = CustomUser.objects.get(username = username) 
   
    return render(request, 'va_templates/verifier1_dashboard.html', {'data':data})

def verifier2_dashboard(request):
    username = request.session.get('username', None)   
    data = CustomUser.objects.get(username = username)
    return render(request, 'va_templates/verifier2_dashboard.html', {'data':data})

def admin_dashboard(request):
    username = request.session.get('username', None)   
    data = CustomUser.objects.get(username = username)
    return render(request, 'va_templates/admin_dashboard.html', {'data':data})




def fbp_verifier1(request):
    username = request.session.get('username', None)
    data = CustomUser.objects.get(username = username)
    return render(request, 'va_templates/fbp1_dashboard.html', {'data':data})

def fbp_verifier2(request):
    username = request.session.get('username', None)
    data = CustomUser.objects.get(username = username)

    user_id = data.user_id
    control_num_st = data.control_num_st
    control_num_end = data.control_num_end


    all_verifier = CustomUser.objects.all()

    try:
        default_emp_data = tblClaimeMaster.objects.filter(verL1User = user_id, verL2Date = None, id__gte=control_num_st, id__lte=control_num_end).exclude(verL1Date=None)
        default_emp_data_1 = []
        for index, file in enumerate(default_emp_data):
            days_diff = (date.today() - file.SubDate.date()).days
            default_emp_data_1.append((index + 1, file, days_diff))
    except tblClaimeMaster.DoesNotExist:
        default_emp_data = None
        default_emp_data_1 = None

    try:
        hold_emp_data = tblClaimeMaster.objects.filter(verL1User = user_id, verL2Date = None, Status = 'On Hold', id__gte=control_num_st, id__lte=control_num_end).exclude(verL1Date=None)
        hold_emp_data_1 = []
        for index, file in enumerate(hold_emp_data):
            days_diff = (date.today() - file.SubDate.date()).days
            hold_emp_data_1.append((index + 1, file, days_diff))
    except tblClaimeMaster.DoesNotExist:
        hold_emp_data = None
        hold_emp_data_1 = None

    

    return render(request, 'va_templates/fbp2_dashboard.html', {'data':data, 'all_verifier':all_verifier, 'default_emp_data':default_emp_data, 'default_emp_data_1':default_emp_data_1,
                                                                'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})

def fbp_resubDashboard(request):
    username = request.session.get('username', None)
    data = CustomUser.objects.get(username = username)

    user_id = data.user_id
    control_num_st = data.control_num_st
    control_num_end = data.control_num_end


    all_verifier = CustomUser.objects.all()

    try:
        default_emp_data = tblClaimeMaster.objects.filter(verL2User=user_id, ver2date=None, Status = 'On Hold',  id__gte=control_num_st, id__lte=control_num_end).exclude(Q(verL1Date=None) | Q(verL2Date=None) | Q(Sub2date=None))
        default_emp_data_1 = []
        for index, file in enumerate(default_emp_data):
            days_diff = (date.today() - file.SubDate.date()).days
            default_emp_data_1.append((index + 1, file, days_diff))
    except tblClaimeMaster.DoesNotExist:
        default_emp_data = None
        default_emp_data_1 = None

    try:        
        hold_emp_data = tblClaimeMaster.objects.filter(ver2date=None, id__gte=control_num_st, Status = 'On Hold',  id__lte=control_num_end).exclude(Q(verL1Date=None) | Q(verL2Date=None) | Q(Sub2date=None))
        hold_emp_data_1 = []
        for index, file in enumerate(hold_emp_data):
            days_diff = (date.today() - file.SubDate.date()).days
            hold_emp_data_1.append((index + 1, file, days_diff))
    except tblClaimeMaster.DoesNotExist:
        hold_emp_data = None
        hold_emp_data_1 = None    

    return render(request, 'va_templates/fbp_resubDashboard.html', {'data':data, 'all_verifier':all_verifier, 'default_emp_data':default_emp_data, 'default_emp_data_1':default_emp_data_1,
                                                                'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})



def user_login(request):

    username = request.session.get('username', None) 

    if username:
        data = CustomUser.objects.get(username = username) 

        if data.roles == 'verifier1':
            return redirect('verifier1_dashboard')
        elif data.roles  == 'verifier2':
            return redirect('verifier2_dashboard')
        elif data.roles  == 'td_admin':
            return redirect('admin_dashboard') 
        elif data.roles == 'fbp_verifier1':
            return redirect('fbp_verifier1')
        elif data.roles == 'fbp_verifier2':
            return redirect('fbp_verifier2')
        elif data.roles == 'fbp_resub_verifier':
            return redirect('fbp_resubDashboard')

    if request.method=='POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        try:
            data = CustomUser.objects.get(username = username)
            if data:
                if check_password (password, data.password):
                    request.session['username'] = username   

                    if data.roles == 'verifier1':
                        return redirect('verifier1_dashboard')
                    elif data.roles  == 'verifier2':
                        return redirect('verifier2_dashboard')
                    elif data.roles  == 'td_admin':
                        return redirect('admin_dashboard') 
                    elif data.roles == 'fbp_verifier1':
                        return redirect('fbp_verifier1')
                    elif data.roles == 'fbp_verifier2':
                        return redirect('fbp_verifier2')
                    elif data.roles == 'fbp_resub_verifier':
                        return redirect('fbp_resubDashboard')
                else:
                    error_message = 'Invalid Credentials1'
                    return render(request, 'va_templates/va_login.html', {'error_message':error_message})
            else:
                error_message = 'Invalid Credentials2'
                return render(request, 'va_templates/va_login.html', {'error_message':error_message})
        except:
            error_message = 'Invalid Credentials3'
            return render(request, 'va_templates/va_login.html', {'error_message':error_message})
    
    return render(request, 'va_templates/va_login.html')
   
def user_logout(request):    
    username = request.session.get('username', None)  
    if not username:     
        return redirect('user_login')
    if username:        
        request.session.clear()
        return redirect('user_login')




def maker_emp_page(request):    
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':

        inputEmpNo = request.POST.get('inputEmpNo')

        proof_sub_all = it_proof_basic.objects.all()

              
        for i in proof_sub_all:                        
            if i.empid.lower() == inputEmpNo.lower():                
                if i.submit_DT: 
                    if not i.ver1Date:
                        if not i.verL2Date:                    
                            try:
                                filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit')
                                enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
                            except:
                                filenames = None
                                enumerated_filenames = None
                            
                            try:
                                dec_files = declaration_files.objects.filter(empid=inputEmpNo)
                                enum_dec_files = [(index + 1, file) for index, file in enumerate(dec_files)]
                            except:
                                dec_files = None
                                enum_dec_files = None
                            
                            band = ['09', '9', '10', 'A', 'B', 'C', 'D']
    
                            try:
                                emp = EmployeeDetail.objects.get(empid=inputEmpNo)                                                       
                            except:
                                emp = None

                            

                            try:
                                saved_basic = it_proof_basic.objects.get(empid=inputEmpNo)                          
                            except:
                                saved_basic = None
                            try:
                                saved_hra = it_proof_hra.objects.get(empid=inputEmpNo)  

                                line1_count = 0
                                line1_count_result = 0 

                                line2_count = 0
                                line2_count_result = 0 

                                line3_count = 0
                                line3_count_result = 0 

                                line4_count = 0
                                line4_count_result = 0 

                                line5_count = 0
                                line5_count_result = 0 
                        
                                if saved_hra.itd1stdt:                                            
                                    start_date = saved_hra.itd1stdt
                                    end_date = saved_hra.itd1enddt
                                    date_difference = end_date - start_date
                                    line1_count = date_difference.days
                                    line1_count_result = (line1_count * saved_hra.itd1)/30
                                    
                                    
                                if saved_hra.itd2stdt:        
                                    start_date = saved_hra.itd2stdt
                                    end_date = saved_hra.itd2enddt
                                    date_difference = end_date - start_date
                                    line2_count = date_difference.days    
                                    line2_count_result = (line2_count * saved_hra.itd2)/30

                                if saved_hra.itd3stdt:
                                    start_date = saved_hra.itd3stdt
                                    end_date = saved_hra.itd3enddt
                                    date_difference = end_date - start_date
                                    line3_count = date_difference.days    
                                    line3_count_result = (line3_count * saved_hra.itd3)/30

                                if saved_hra.itd4stdt:
                                    start_date = saved_hra.itd4stdt
                                    end_date = saved_hra.itd4enddt
                                    date_difference = end_date - start_date
                                    line4_count = date_difference.days   
                                    line4_count_result = (line4_count * saved_hra.itd4)/30

                                if saved_hra.itd5stdt:
                                    start_date = saved_hra.itd5stdt
                                    end_date = saved_hra.itd5enddt
                                    date_difference = end_date - start_date
                                    line5_count = date_difference.days   
                                    line5_count_result = (line5_count * saved_hra.itd5)/30

                                total_rent1 = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

                                total_rent = round(total_rent1)      
                            except:
                                saved_hra = None
                                total_rent = 0

                            try:
                                saved_Ilhp = it_proof_income_loss.objects.get(empid=inputEmpNo)        
                            except:
                                saved_Ilhp = None
                            try:
                                saved_other80 = it_proof_80_other.objects.get(empid=inputEmpNo)        
                            except:
                                saved_other80 = None
                            try:
                                saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=inputEmpNo)        
                            except:
                                saved_80C_deduction = None
                            try:
                                saved_previous_emp = it_proof_previousemp.objects.get(empid=inputEmpNo)        
                            except:
                                saved_previous_emp = None
                                                
                            remark = remarks.objects.all()
                                                
                            return render(request, 'va_templates/maker_emp_page.html', { 'data':data, 'band':band, 'emp':emp, 'saved_basic':saved_basic, 'saved_hra':saved_hra, 'total_rent':total_rent, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
                                                                        'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp, 'remark':remark, 
                                                                        'filenames':filenames, 'enumerated_filenames':enumerated_filenames, 'dec_files':dec_files, 'enum_dec_files':enum_dec_files})

                    else:
                        error_message = 'Verification-1 is already completed.'
                        return render(request, 'va_templates/verifier1_dashboard.html', {'data':data, 'error_message':error_message, 'inputEmpNo':inputEmpNo})
                                        
        error_message = 'Employee not submitted.!'
        return render(request, 'va_templates/verifier1_dashboard.html', {'data':data, 'error_message':error_message, 'inputEmpNo':inputEmpNo})
    else:
        error_message = 'Something went wrong. Please Try again later'
        return render(request, 'va_templates/verifier1_dashboard.html', {'data':data, 'error_message':error_message})

def maker_control_number(request):
 
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':

        controlNoFrom = request.POST.get('controlNoFrom')
        controlNoTo = request.POST.get('controlNoTo')       

        proof_sub_all = it_proof_basic.objects.filter(id__gte=controlNoFrom, id__lte=controlNoTo, submit_DT__isnull=False, ver1Date__isnull= True)

        
        for record in proof_sub_all:            
            record.enable_link = record.ver1Date is None and record.submit_DT and (timezone.now() - record.submit_DT) > timedelta(hours=48, minutes=00)

        return render(request, 'va_templates/maker_control_number.html', {'data':data, 'proof_sub_all':proof_sub_all})
    return render(request, 'va_templates/maker_control_number.html')

def maker_emp_page_cnumber(request, id):    
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    
    inputEmpNo = id    
                    
    try:
        filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit')
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
    except:
        filenames = None
        enumerated_filenames = None
    
    try:
        dec_files = declaration_files.objects.filter(empid=inputEmpNo)
        enum_dec_files = [(index + 1, file) for index, file in enumerate(dec_files)]
    except:
        dec_files = None
        enum_dec_files = None
    
    band = ['09', '9', '10', 'A', 'B', 'C', 'D']
    
    try:
        emp = EmployeeDetail.objects.get(empid=inputEmpNo)                                                       
    except:
        emp = None

    try:
        saved_basic = it_proof_basic.objects.get(empid=inputEmpNo)                          
    except:
        saved_basic = None
    try:
        saved_hra = it_proof_hra.objects.get(empid=inputEmpNo)  

        line1_count = 0
        line1_count_result = 0 

        line2_count = 0
        line2_count_result = 0 

        line3_count = 0
        line3_count_result = 0 

        line4_count = 0
        line4_count_result = 0 

        line5_count = 0
        line5_count_result = 0 

        if saved_hra.itd1stdt:                                            
            start_date = saved_hra.itd1stdt
            end_date = saved_hra.itd1enddt
            date_difference = end_date - start_date
            line1_count = date_difference.days
            line1_count_result = (line1_count * saved_hra.itd1)/30            
            
        if saved_hra.itd2stdt:        
            start_date = saved_hra.itd2stdt
            end_date = saved_hra.itd2enddt
            date_difference = end_date - start_date
            line2_count = date_difference.days    
            line2_count_result = (line2_count * saved_hra.itd2)/30

        if saved_hra.itd3stdt:
            start_date = saved_hra.itd3stdt
            end_date = saved_hra.itd3enddt
            date_difference = end_date - start_date
            line3_count = date_difference.days    
            line3_count_result = (line3_count * saved_hra.itd3)/30

        if saved_hra.itd4stdt:
            start_date = saved_hra.itd4stdt
            end_date = saved_hra.itd4enddt
            date_difference = end_date - start_date
            line4_count = date_difference.days   
            line4_count_result = (line4_count * saved_hra.itd4)/30

        if saved_hra.itd5stdt:
            start_date = saved_hra.itd5stdt
            end_date = saved_hra.itd5enddt
            date_difference = end_date - start_date
            line5_count = date_difference.days   
            line5_count_result = (line5_count * saved_hra.itd5)/30

        total_rent = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

        total_rent = round(total_rent)      
    except:
        saved_hra = None
        total_rent = 0

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=inputEmpNo)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=inputEmpNo)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=inputEmpNo)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=inputEmpNo)        
    except:
        saved_previous_emp = None
                        
    remark = remarks.objects.all()
                        
    return render(request, 'va_templates/maker_emp_page.html', { 'data':data, 'band':band, 'emp':emp, 'saved_basic':saved_basic, 'saved_hra':saved_hra, 'total_rent':total_rent, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
                                                'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp, 'remark':remark, 
                                                'filenames':filenames, 'enumerated_filenames':enumerated_filenames, 'dec_files':dec_files, 'enum_dec_files':enum_dec_files})

def submit_maker(request):   

    
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':
        ver_level_1 =  request.POST.get('ver_level_1')        
        empid =  request.POST.get('empid')
        custom_remark = request.POST.get('custom_remark')

        ver_level_1 = True if ver_level_1 == 'yes' else False

        saved_basic = it_proof_basic.objects.get(empid=empid)

        saved_basic.ver_level_1 = ver_level_1        
        saved_basic.ver1Date = timezone.now() + timedelta(hours=5, minutes=30)
        saved_basic.custom_remark = custom_remark
        saved_basic.save()

        try:  
            saved_hra = it_proof_hra.objects.get(empid=empid) 
        except:
            saved_hra = None

        if saved_hra:
            if saved_hra.itd1stdt:
                ita1stdt =  request.POST.get('ita1stdt')
                ita1enddt =  request.POST.get('ita1enddt')        
                allow_rent_1 =  request.POST.get('allow_rent_1')
                a_city1 =  request.POST.get('a_city1')
                hra_remark_1 =  request.POST.get('hra_remark_1')

                if hra_remark_1 == '--select--':
                    hra_remark_1 = None

                if ita1stdt:    
                    ita1stdt = datetime.strptime(ita1stdt, "%Y-%m-%d")            
                else:        
                    ita1stdt = None
                if ita1enddt:    
                    ita1enddt = datetime.strptime(ita1enddt, "%Y-%m-%d")            
                else:        
                    ita1enddt = None

                allow_rent_1 = int(allow_rent_1) if allow_rent_1 else int(0)  

                saved_hra.ita1 = allow_rent_1
                saved_hra.ita1stdt = ita1stdt
                saved_hra.ita1enddt = ita1enddt
                saved_hra.a_city1 =  a_city1  
                saved_hra.hra_remark_1 = hra_remark_1            

                saved_hra.save()
                        
            if saved_hra.itd2stdt:
                ita2stdt =  request.POST.get('ita2stdt')
                ita2enddt =  request.POST.get('ita2enddt')        
                allow_rent_2 =  request.POST.get('allow_rent_2')
                a_city2 =  request.POST.get('a_city2')
                hra_remark_2 =  request.POST.get('hra_remark_2')

                if hra_remark_2 == '--select--':
                    hra_remark_2 = None
                                
                if ita2stdt:    
                    ita2stdt = datetime.strptime(ita2stdt, "%Y-%m-%d")            
                else:        
                    ita2stdt = None 
                if ita2enddt:    
                    ita2enddt = datetime.strptime(ita2enddt, "%Y-%m-%d")            
                else:        
                    ita2enddt = None
                
                allow_rent_2 = int(allow_rent_2) if allow_rent_2 else int(0)  

                saved_hra.ita2 = allow_rent_2
                saved_hra.ita2stdt = ita2stdt
                saved_hra.ita2enddt = ita2enddt
                saved_hra.a_city2 =  a_city2
                saved_hra.hra_remark_2 = hra_remark_2

                saved_hra.save()
              
            if saved_hra.itd3stdt:
                ita3stdt =  request.POST.get('ita3stdt')
                ita3enddt =  request.POST.get('ita3enddt')        
                allow_rent_3 =  request.POST.get('allow_rent_3')
                a_city3 =  request.POST.get('a_city3')
                hra_remark_3 =  request.POST.get('hra_remark_3')

                if hra_remark_3 == '--select--':
                    hra_remark_3 = None

                if ita3stdt:    
                    ita3stdt = datetime.strptime(ita3stdt, "%Y-%m-%d")            
                else:        
                    ita3stdt = None 
                if ita3enddt:    
                    ita3enddt = datetime.strptime(ita3enddt, "%Y-%m-%d")            
                else:        
                    ita3enddt = None
                allow_rent_3 = int(allow_rent_3) if allow_rent_3 else int(0)

                saved_hra.ita3 = allow_rent_3
                saved_hra.ita3stdt = ita3stdt
                saved_hra.ita3enddt = ita3enddt
                saved_hra.a_city3 =  a_city3
                saved_hra.hra_remark_3 = hra_remark_3

                saved_hra.save()
        
            if saved_hra.itd4stdt:
                ita4stdt =  request.POST.get('ita4stdt')
                ita4enddt =  request.POST.get('ita4enddt')        
                allow_rent_4 =  request.POST.get('allow_rent_4')
                a_city4 =  request.POST.get('a_city4')
                hra_remark_4 =  request.POST.get('hra_remark_4')

                if hra_remark_4 == '--select--':
                    hra_remark_4 = None

                if ita4stdt:    
                    ita4stdt = datetime.strptime(ita4stdt, "%Y-%m-%d")            
                else:        
                    ita4stdt = None 
                if ita4enddt:    
                    ita4enddt = datetime.strptime(ita4enddt, "%Y-%m-%d")            
                else:        
                    ita4enddt = None
                allow_rent_4 = int(allow_rent_4) if allow_rent_4 else int(0)

                saved_hra.ita4 = allow_rent_4
                saved_hra.ita4stdt = ita4stdt
                saved_hra.ita4enddt = ita4enddt
                saved_hra.a_city4 =  a_city4
                saved_hra.hra_remark_4 = hra_remark_4

                saved_hra.save()
  
            if saved_hra.itd5stdt:
                ita5stdt =  request.POST.get('ita5stdt')
                ita5enddt =  request.POST.get('ita5enddt')        
                allow_rent_5 =  request.POST.get('allow_rent_5')
                a_city5 =  request.POST.get('a_city5')
                hra_remark_5 =  request.POST.get('hra_remark_5')

                if hra_remark_5 == '--select--':
                    hra_remark_5 = None


                if ita5stdt:    
                    ita5stdt = datetime.strptime(ita5stdt, "%Y-%m-%d")            
                else:        
                    ita5stdt = None 
                if ita5enddt:    
                    ita5enddt = datetime.strptime(ita5enddt, "%Y-%m-%d")            
                else:        
                    ita5enddt = None

                allow_rent_5 = int(allow_rent_5) if allow_rent_5 else int(0)

                saved_hra.ita5 = allow_rent_5
                saved_hra.ita5stdt = ita5stdt
                saved_hra.ita5enddt = ita5enddt
                saved_hra.a_city5 =  a_city5
                saved_hra.hra_remark_5 = hra_remark_5

                saved_hra.save()

        try:
            saved_Ilhp = it_proof_income_loss.objects.get(empid=empid) 
        except:
            saved_Ilhp = None    

        if saved_Ilhp:
            if saved_Ilhp.selfOccupiedHouseProperty:

                allowed_self = request.POST.get('allowed_self')
                self_remark = request.POST.get('self_remark')  

                if self_remark == '--select--':
                    self_remark = None


                allowed_self = int(allowed_self) if allowed_self else int(0)

                saved_Ilhp.allowed_self = allowed_self
                saved_Ilhp.self_remark = self_remark
                saved_Ilhp.save()

            if saved_Ilhp.annualLettableValue:

                allowed_annualLettableValue = request.POST.get('allowed_annualLettableValue') 
                allowed_municipalPropertyTax = request.POST.get('allowed_municipalPropertyTax') 
                allowed_homeLoanInterest = request.POST.get('allowed_homeLoanInterest') 
                allowed_incomeLossOnHouseProperty = request.POST.get('allowed_incomeLossOnHouseProperty') 
                allowed_standardDeduction = request.POST.get('allowed_standardDeduction') 

                allowed_annualLettableValue_remark = request.POST.get('allowed_annualLettableValue_remark') 
                allowed_municipalPropertyTax_remark = request.POST.get('allowed_municipalPropertyTax_remark') 
                allowed_homeLoanInterest_remark = request.POST.get('allowed_homeLoanInterest_remark') 
                allowed_incomeLossOnHouseProperty_remark = request.POST.get('allowed_incomeLossOnHouseProperty_remark') 
                allowed_standardDeduction_remark = request.POST.get('allowed_standardDeduction_remark')  

                if allowed_annualLettableValue_remark == '--select--':
                    allowed_annualLettableValue_remark = None

                if allowed_municipalPropertyTax_remark == '--select--':
                    allowed_municipalPropertyTax_remark = None
                
                if allowed_homeLoanInterest_remark == '--select--':
                    allowed_homeLoanInterest_remark = None

                if allowed_incomeLossOnHouseProperty_remark == '--select--':
                    allowed_incomeLossOnHouseProperty_remark = None

                if allowed_standardDeduction_remark == '--select--':
                    allowed_standardDeduction_remark = None

                allowed_annualLettableValue = int(allowed_annualLettableValue) if allowed_annualLettableValue else int(0)  
                allowed_municipalPropertyTax = int(allowed_municipalPropertyTax) if allowed_municipalPropertyTax else int(0)  
                allowed_homeLoanInterest = int(allowed_homeLoanInterest) if allowed_homeLoanInterest else int(0)  
                allowed_incomeLossOnHouseProperty = int(allowed_incomeLossOnHouseProperty) if allowed_incomeLossOnHouseProperty else int(0) 
                allowed_standardDeduction = int(allowed_standardDeduction) if allowed_standardDeduction else int(0) 

                
                saved_Ilhp.allowed_annualLettableValue = allowed_annualLettableValue
                saved_Ilhp.allowed_municipalPropertyTax = allowed_municipalPropertyTax
                saved_Ilhp.allowed_homeLoanInterest = allowed_homeLoanInterest
                saved_Ilhp.allowed_incomeLossOnHouseProperty = allowed_incomeLossOnHouseProperty
                saved_Ilhp.allowed_standardDeduction = allowed_standardDeduction
            
                saved_Ilhp.allowed_annualLettableValue_remark = allowed_annualLettableValue_remark
                saved_Ilhp.allowed_municipalPropertyTax_remark = allowed_municipalPropertyTax_remark
                saved_Ilhp.allowed_homeLoanInterest_remark = allowed_homeLoanInterest_remark
                saved_Ilhp.allowed_incomeLossOnHouseProperty_remark = allowed_incomeLossOnHouseProperty_remark
                saved_Ilhp.allowed_standardDeduction_remark = allowed_standardDeduction_remark

                saved_Ilhp.save()

            if saved_Ilhp.loan_sanctioned_date:
                # allowed_loan_sanctioned_date = request.POST.get('allowed_loan_sanctioned_date')
                # allowed_loan_sanctioned_date_remark = request.POST.get('allowed_loan_sanctioned_date_remark')        

                allowed_loan_amount = request.POST.get('allowed_loan_amount')
                allowed_property_value = request.POST.get('allowed_property_value')
                allowed_home_loan = request.POST.get('allowed_home_loan')

                
                loan_amount_remark = request.POST.get('loan_amount_remark')         
                property_value_remark = request.POST.get('property_value_remark')        
                home_loan_remark = request.POST.get('home_loan_remark')

                # if allowed_loan_sanctioned_date_remark == '--select--':
                #     allowed_loan_sanctioned_date_remark = None
                
                # if allowed_loan_sanctioned_date:    
                #     allowed_loan_sanctioned_date = datetime.strptime(allowed_loan_sanctioned_date, "%Y-%m-%d")            
                # else:        
                #     allowed_loan_sanctioned_date = None
                
                if loan_amount_remark == '--select--':
                    loan_amount_remark = None

                if property_value_remark == '--select--':
                    property_value_remark = None
                
                if home_loan_remark == '--select--':
                    home_loan_remark = None

                

                allowed_loan_amount = int(allowed_loan_amount) if allowed_loan_amount else int(0)  
                allowed_property_value = int(allowed_property_value) if allowed_property_value else int(0)  
                allowed_home_loan = int(allowed_home_loan) if allowed_home_loan else int(0)   

                # saved_Ilhp.allowed_loan_sanctioned_date = allowed_loan_sanctioned_date
                # saved_Ilhp.allowed_loan_sanctioned_date_remark = allowed_loan_sanctioned_date_remark
                
                saved_Ilhp.allowed_loan_amount = allowed_loan_amount
                saved_Ilhp.loan_amount_remark = loan_amount_remark

                saved_Ilhp.allowed_property_value = allowed_property_value
                saved_Ilhp.property_value_remark = property_value_remark
                saved_Ilhp.allowed_home_loan = allowed_home_loan
                saved_Ilhp.home_loan_remark = home_loan_remark 

                saved_Ilhp.save()  

            if saved_Ilhp.loan_sanctioned_date_ee:

                # allowed_loan_sanctioned_date_ee = request.POST.get('allowed_loan_sanctioned_date_ee')
                # loan_sanctioned_date_ee_remark = request.POST.get('loan_sanctioned_date_ee_remark')
                allowed_property_value_other = request.POST.get('allowed_property_value_other')
                property_value_other_remark = request.POST.get('property_value_other_remark')

                # if loan_sanctioned_date_ee_remark == '--select--':
                #     loan_sanctioned_date_ee_remark = None

                # if allowed_loan_sanctioned_date_ee:    
                #     allowed_loan_sanctioned_date_ee = datetime.strptime(allowed_loan_sanctioned_date_ee, "%Y-%m-%d")            
                # else:        
                #     allowed_loan_sanctioned_date_ee = None
                
                if property_value_other_remark == '--select--':
                    property_value_other_remark = None
                
                allowed_property_value_other = int(allowed_property_value_other) if allowed_property_value_other else int(0)


                # saved_Ilhp.allowed_loan_sanctioned_date_ee = allowed_loan_sanctioned_date_ee
                # saved_Ilhp.loan_sanctioned_date_ee_remark = loan_sanctioned_date_ee_remark

                saved_Ilhp.allowed_property_value_other = allowed_property_value_other                  
                saved_Ilhp.property_value_other_remark = property_value_other_remark
                saved_Ilhp.save()

            if saved_Ilhp.other_income_oi:
                allowed_other_income_oi = request.POST.get('allowed_other_income_oi')
                other_income_oi_remark = request.POST.get('other_income_oi_remark')

                if other_income_oi_remark == '--select--':
                    other_income_oi_remark = None

                allowed_other_income_oi = int(allowed_other_income_oi) if allowed_other_income_oi else int(0)

                saved_Ilhp.allowed_other_income_oi = allowed_other_income_oi
                saved_Ilhp.other_income_oi_remark = other_income_oi_remark
                saved_Ilhp.save()

            if saved_Ilhp.interest_80tta:
                
                allowed_interest_80tta = request.POST.get('allowed_interest_80tta')
                interest_80tta_remark = request.POST.get('interest_80tta_remark')

                if interest_80tta_remark == '--select--':
                    interest_80tta_remark = None

                allowed_interest_80tta = int(allowed_interest_80tta) if allowed_interest_80tta else int(0)

                saved_Ilhp.allowed_interest_80tta = allowed_interest_80tta
                saved_Ilhp.interest_80tta_remark = interest_80tta_remark

                saved_Ilhp.save()
        
        try:
            saved_other80 = it_proof_80_other.objects.get(empid=empid)
        except:
            saved_other80 = None

        if saved_other80:

            if saved_other80.medical_insurance_self_mip or saved_other80.medical_insurance_parents_mip or saved_other80.medical_insurance_Senior_Citizen or saved_other80.preventive_health_checkup_mip:

                allowed_medical_insurance = request.POST.get('allowed_medical_insurance')
                allowed_parents_mip_nsn = request.POST.get('allowed_parents_mip_nsn')
                allowed_parents_mip_sn = request.POST.get('allowed_parents_mip_sn')
                allowed_health_checkup = request.POST.get('allowed_health_checkup')

                medical_insurance_remark = request.POST.get('medical_insurance_remark')
                parents_mip_nsn_remark = request.POST.get('parents_mip_nsn_remark')
                parents_mip_sn_remark = request.POST.get('parents_mip_sn_remark')
                health_checkup_remark = request.POST.get('health_checkup_remark')

                if medical_insurance_remark == '--select--':
                    medical_insurance_remark = None
                
                if parents_mip_nsn_remark == '--select--':
                    parents_mip_nsn_remark = None
                
                if parents_mip_sn_remark == '--select--':
                    parents_mip_sn_remark = None
                
                if health_checkup_remark == '--select--':
                    health_checkup_remark = None


                allowed_medical_insurance = int(allowed_medical_insurance) if allowed_medical_insurance else int(0)  
                allowed_parents_mip_nsn = int(allowed_parents_mip_nsn) if allowed_parents_mip_nsn else int(0)  
                allowed_parents_mip_sn = int(allowed_parents_mip_sn) if allowed_parents_mip_sn else int(0)  
                allowed_health_checkup = int(allowed_health_checkup) if allowed_health_checkup else int(0) 

                saved_other80.allowed_medical_insurance = allowed_medical_insurance
                saved_other80.allowed_parents_mip_nsn = allowed_parents_mip_nsn
                saved_other80.allowed_parents_mip_sn = allowed_parents_mip_sn
                saved_other80.allowed_health_checkup = allowed_health_checkup
                saved_other80.medical_insurance_remark = medical_insurance_remark
                saved_other80.parents_mip_nsn_remark = parents_mip_nsn_remark
                saved_other80.parents_mip_sn_remark = parents_mip_sn_remark
                saved_other80.health_checkup_remark = health_checkup_remark

                saved_other80.save()

            if saved_other80.selected_illness:

                allowed_treatment_value = request.POST.get('allowed_treatment_value')
                treatment_value_remark = request.POST.get('treatment_value_remark')

                if treatment_value_remark == '--select--':
                    treatment_value_remark = None

                allowed_treatment_value = int(allowed_treatment_value) if allowed_treatment_value else int(0)

                saved_other80.allowed_treatment_value = allowed_treatment_value
                saved_other80.treatment_value_remark = treatment_value_remark
                saved_other80.save()

            if saved_other80.interest_education:

                allowed_interest_education = request.POST.get('allowed_interest_education')
                interest_education_remark = request.POST.get('interest_education_remark')

                if interest_education_remark == '--select--':
                    interest_education_remark = None

                allowed_interest_education = int(allowed_interest_education) if allowed_interest_education else int(0)
                
                saved_other80.allowed_interest_education = allowed_interest_education
                saved_other80.interest_education_remark = interest_education_remark
                saved_other80.save()

            if saved_other80.paymentDependentDisability:
                allowed_Dependent_dis = request.POST.get('allowed_Dependent_dis')
                allowed_Dependent_remark = request.POST.get('allowed_Dependent_remark')

                if allowed_Dependent_remark == '--select--':
                    allowed_Dependent_remark = None

                allowed_Dependent_dis = int(allowed_Dependent_dis) if allowed_Dependent_dis else int(0)

                saved_other80.allowed_Dependent_dis = allowed_Dependent_dis
                saved_other80.allowed_Dependent_remark = allowed_Dependent_remark
                saved_other80.save()

            if saved_other80.paymentSelfDisability:

                allowed_self_dis = request.POST.get('allowed_self_dis')
                allowed_self_remark = request.POST.get('allowed_self_remark')

                if allowed_self_remark == '--select--':
                    allowed_self_remark = None

                allowed_self_dis = int(allowed_self_dis) if allowed_self_dis else int(0)

                saved_other80.allowed_self_dis = allowed_self_dis
                saved_other80.allowed_self_remark = allowed_self_remark

                saved_other80.save()
            
            if saved_other80.loan_sanctioned_date_80eeb:

                allowed_vehicle_value = request.POST.get('allowed_vehicle_value')
                vehicle_value_remark = request.POST.get('vehicle_value_remark')

                if vehicle_value_remark == '--select--':
                    vehicle_value_remark = None

                allowed_vehicle_value = int(allowed_vehicle_value) if allowed_vehicle_value else int(0)
                
                saved_other80.allowed_vehicle_value = allowed_vehicle_value
                saved_other80.vehicle_value_remark = vehicle_value_remark
                saved_other80.save()
            
            if saved_other80.nps_80ccd1b:

                allowed_nps_80ccd1b = request.POST.get('allowed_nps_80ccd1b')
                nps_80ccd1b_remark = request.POST.get('nps_80ccd1b_remark')

                if nps_80ccd1b_remark == '--select--':
                    nps_80ccd1b_remark = None

                allowed_nps_80ccd1b = int(allowed_nps_80ccd1b) if allowed_nps_80ccd1b else int(0)
                
                saved_other80.allowed_nps_80ccd1b = allowed_nps_80ccd1b
                saved_other80.nps_80ccd1b_remark = nps_80ccd1b_remark
                saved_other80.save()


        try:            
            saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=empid)  
        except:
            saved_80C_deduction = None    

        if saved_80C_deduction:

            allowed_paymentLifeInsurance =  request.POST.get('allowed_paymentLifeInsurance')
            allowed_timeDeposit =  request.POST.get('allowed_timeDeposit')
            allowed_ulipContribution =  request.POST.get('allowed_ulipContribution')
            allowed_nscSubscription =  request.POST.get('allowed_nscSubscription')
            allowed_nscInterest =  request.POST.get('allowed_nscInterest')
            allowed_ppfContribution =  request.POST.get('allowed_ppfContribution')
            allowed_houseLoan =  request.POST.get('allowed_houseLoan')
            allowed_tuitionFee =  request.POST.get('allowed_tuitionFee')
            allowed_mutualFundSubscription =  request.POST.get('allowed_mutualFundSubscription')
            allowed_termDeposits =  request.POST.get('allowed_termDeposits')
            allowed_pensionContribution =  request.POST.get('allowed_pensionContribution')
            allowed_sukanyaSamriddhi =  request.POST.get('allowed_sukanyaSamriddhi')

            paymentLifeInsurance_remark =  request.POST.get('paymentLifeInsurance_remark')
            timeDeposit_remark =  request.POST.get('timeDeposit_remark')
            ulipContribution_remark =  request.POST.get('ulipContribution_remark')
            nscSubscription_remark =  request.POST.get('nscSubscription_remark')
            nscInterest_remark =  request.POST.get('nscInterest_remark')
            ppfContribution_remark =  request.POST.get('ppfContribution_remark')
            houseLoan_remark =  request.POST.get('houseLoan_remark')
            tuitionFee_remark =  request.POST.get('tuitionFee_remark')
            mutualFundSubscription_remark =  request.POST.get('mutualFundSubscription_remark')
            termDeposits_remark =  request.POST.get('termDeposits_remark')
            pensionContribution_remark =  request.POST.get('pensionContribution_remark')
            sukanyaSamriddhi_remark =  request.POST.get('sukanyaSamriddhi_remark')

            if paymentLifeInsurance_remark == '--select--':
                    paymentLifeInsurance_remark = None
                
            if timeDeposit_remark == '--select--':
                    timeDeposit_remark = None
            
            if ulipContribution_remark == '--select--':
                    ulipContribution_remark = None
            
            if nscSubscription_remark == '--select--':
                    nscSubscription_remark = None
                
            if nscInterest_remark == '--select--':
                    nscInterest_remark = None
            
            if ppfContribution_remark == '--select--':
                    ppfContribution_remark = None

            if houseLoan_remark == '--select--':
                    houseLoan_remark = None
                
            if tuitionFee_remark == '--select--':
                    tuitionFee_remark = None
            
            if mutualFundSubscription_remark == '--select--':
                    mutualFundSubscription_remark = None
            
            if termDeposits_remark == '--select--':
                    termDeposits_remark = None
                
            if pensionContribution_remark == '--select--':
                    pensionContribution_remark = None
            
            if sukanyaSamriddhi_remark == '--select--':
                    sukanyaSamriddhi_remark = None

            allowed_paymentLifeInsurance = int(allowed_paymentLifeInsurance) if allowed_paymentLifeInsurance else int(0)  
            allowed_timeDeposit = int(allowed_timeDeposit) if allowed_timeDeposit else int(0)  
            allowed_ulipContribution = int(allowed_ulipContribution) if allowed_ulipContribution else int(0)  
            allowed_nscSubscription = int(allowed_nscSubscription) if allowed_nscSubscription else int(0)  
            allowed_nscInterest = int(allowed_nscInterest) if allowed_nscInterest else int(0)  
            allowed_ppfContribution = int(allowed_ppfContribution) if allowed_ppfContribution else int(0)  
            allowed_houseLoan = int(allowed_houseLoan) if allowed_houseLoan else int(0)  
            allowed_tuitionFee = int(allowed_tuitionFee) if allowed_tuitionFee else int(0)  
            allowed_mutualFundSubscription = int(allowed_mutualFundSubscription) if allowed_mutualFundSubscription else int(0)  
            allowed_termDeposits = int(allowed_termDeposits) if allowed_termDeposits else int(0)  
            allowed_pensionContribution = int(allowed_pensionContribution) if allowed_pensionContribution else int(0)  
            allowed_sukanyaSamriddhi = int(allowed_sukanyaSamriddhi) if allowed_sukanyaSamriddhi else int(0)

            saved_80C_deduction.allowed_paymentLifeInsurance = allowed_paymentLifeInsurance
            saved_80C_deduction.allowed_timeDeposit = allowed_timeDeposit
            saved_80C_deduction.allowed_ulipContribution = allowed_ulipContribution
            saved_80C_deduction.allowed_nscSubscription = allowed_nscSubscription
            saved_80C_deduction.allowed_nscInterest = allowed_nscInterest
            saved_80C_deduction.allowed_ppfContribution = allowed_ppfContribution
            saved_80C_deduction.allowed_houseLoan = allowed_houseLoan
            saved_80C_deduction.allowed_tuitionFee = allowed_tuitionFee
            saved_80C_deduction.allowed_mutualFundSubscription = allowed_mutualFundSubscription
            saved_80C_deduction.allowed_termDeposits = allowed_termDeposits
            saved_80C_deduction.allowed_pensionContribution = allowed_pensionContribution
            saved_80C_deduction.allowed_sukanyaSamriddhi = allowed_sukanyaSamriddhi

            saved_80C_deduction.paymentLifeInsurance_remark = paymentLifeInsurance_remark
            saved_80C_deduction.timeDeposit_remark = timeDeposit_remark
            saved_80C_deduction.ulipContribution_remark = ulipContribution_remark
            saved_80C_deduction.nscSubscription_remark = nscSubscription_remark
            saved_80C_deduction.nscInterest_remark = nscInterest_remark
            saved_80C_deduction.ppfContribution_remark = ppfContribution_remark
            saved_80C_deduction.houseLoan_remark = houseLoan_remark
            saved_80C_deduction.tuitionFee_remark = tuitionFee_remark
            saved_80C_deduction.mutualFundSubscription_remark = mutualFundSubscription_remark
            saved_80C_deduction.termDeposits_remark = termDeposits_remark
            saved_80C_deduction.pensionContribution_remark = pensionContribution_remark
            saved_80C_deduction.sukanyaSamriddhi_remark = sukanyaSamriddhi_remark
            
            saved_80C_deduction.save()


        try:
            saved_previous_emp = it_proof_previousemp.objects.get(empid=empid)        
        except:
            saved_previous_emp = None

        if saved_previous_emp:

            allowed_salary_previousemp =  request.POST.get('allowed_salary_previousemp')
            allowed_provident_fund =  request.POST.get('allowed_provident_fund')
            allowed_professional_tax =  request.POST.get('allowed_professional_tax')
            allowed_income_tax =  request.POST.get('allowed_income_tax')

            salary_previousemp_remark =  request.POST.get('salary_previousemp_remark')
            provident_fund_remark =  request.POST.get('provident_fund_remark')
            professional_tax_remark =  request.POST.get('professional_tax_remark')
            income_tax_remark =  request.POST.get('income_tax_remark')


            if salary_previousemp_remark == '--select--':
                    salary_previousemp_remark = None

            if provident_fund_remark == '--select--':
                    provident_fund_remark = None
            
            if professional_tax_remark == '--select--':
                    professional_tax_remark = None

            if income_tax_remark == '--select--':
                    income_tax_remark = None

            allowed_salary_previousemp = int(allowed_salary_previousemp) if allowed_salary_previousemp else int(0) 
            allowed_provident_fund = int(allowed_provident_fund) if allowed_provident_fund else int(0)  
            allowed_professional_tax = int(allowed_professional_tax) if allowed_professional_tax else int(0)  
            allowed_income_tax = int(allowed_income_tax) if allowed_income_tax else int(0)  

            saved_previous_emp.allowed_salary_previousemp = allowed_salary_previousemp
            saved_previous_emp.allowed_provident_fund = allowed_provident_fund
            saved_previous_emp.allowed_professional_tax = allowed_professional_tax
            saved_previous_emp.allowed_income_tax = allowed_income_tax

            saved_previous_emp.salary_previousemp_remark = salary_previousemp_remark
            saved_previous_emp.provident_fund_remark = provident_fund_remark
            saved_previous_emp.professional_tax_remark = professional_tax_remark
            saved_previous_emp.income_tax_remark = income_tax_remark

            saved_previous_emp.save()
        

        success_message = 'Verification-1 completed.'
        return render(request, 'va_templates/maker_emp_page.html', {'data':data, 'success_message':success_message, 'inputEmpNo':empid})
    
    success_message = 'Something went wrong please try again.'
    return render(request, 'va_templates/maker_emp_page.html', {'data':data, 'success_message':success_message, 'inputEmpNo':empid})





def chekcer_emppage_1(request, inputEmpNo):     

    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    inputEmpNo = inputEmpNo
    

    try:
        filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit').exclude(Q(section__startswith='resub1') | Q(section__startswith='resub2'))
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
    except:
        filenames = None
        enumerated_filenames = None

    try:
        resub1_filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit', section__startswith='resub1')
        resub1_enumerated_filenames = [(index + 1, file) for index, file in enumerate(resub1_filenames)]
    except:
        resub1_filenames = None
        resub1_enumerated_filenames = None

    try:
        resub2_filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit', section__startswith='resub2')
        resub2_enumerated_filenames = [(index + 1, file) for index, file in enumerate(resub2_filenames)]
    except:
        resub2_filenames = None
        resub2_enumerated_filenames = None
    
    

    try:
        dec_files = declaration_files.objects.filter(empid=inputEmpNo)
        enum_dec_files = [(index + 1, file) for index, file in enumerate(dec_files)]
    except:
        dec_files = None
        enum_dec_files = None
    
    band = ['09', '9', '10', 'A', 'B', 'C', 'D']
    
    try:
        emp = EmployeeDetail.objects.get(empid=inputEmpNo)                                                       
    except:
        emp = None

    try:
        saved_basic = it_proof_basic.objects.get(empid=inputEmpNo)                                                       
    except:
        saved_basic = None              

    total_rent_1 = 0
    total_rent_2 = 0
    total_rent_3 = 0
    total_rent_4 = 0
    total_rent_5 = 0     

    line1_count = 0
    line1_count_result = 0 

    line2_count = 0
    line2_count_result = 0 

    line3_count = 0
    line3_count_result = 0 

    line4_count = 0
    line4_count_result = 0 

    line5_count = 0
    line5_count_result = 0

    total_rent = 0              

    try:
        saved_hra = it_proof_hra.objects.get(empid=inputEmpNo)

        if saved_hra.itd1stdt:   

            ita1 = saved_hra.ita1 if saved_hra.ita1 else int(0)
            ita1_2 = saved_hra.ita1_2 if saved_hra.ita1_2 else int(0)

            total_rent_1 = ita1 + ita1_2

            start_date = None
            end_date = None            

            if saved_hra.ita1stdt:
                start_date = saved_hra.ita1stdt
                end_date = saved_hra.ita1enddt
           
            if start_date and end_date:
                date_difference = end_date - start_date
                line1_count = date_difference.days
                line1_count_result = (line1_count * total_rent_1)/30       
            
        if saved_hra.itd2stdt:      

            ita2 = saved_hra.ita2 if saved_hra.ita2 else int(0)
            ita2_2 = saved_hra.ita2_2 if saved_hra.ita2_2 else int(0)            

            total_rent_2 = ita2 + ita2_2

            start_date = None
            end_date = None

            if saved_hra.ita2stdt:
                start_date = saved_hra.ita2stdt
                end_date = saved_hra.ita2enddt
            
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line2_count = date_difference.days
                line2_count_result = (line2_count * total_rent_2)/30 

        if saved_hra.itd3stdt:
            
            ita3 = saved_hra.ita3 if saved_hra.ita3 else int(0)
            ita3_2 = saved_hra.ita3_2 if saved_hra.ita3_2 else int(0)            

            total_rent_3 = ita3 + ita3_2
            
            start_date = None
            end_date = None

            if saved_hra.ita3stdt:
                start_date = saved_hra.ita3stdt
                end_date = saved_hra.ita3enddt
            
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line3_count = date_difference.days
                line3_count_result = (line3_count * total_rent_3)/30 

        if saved_hra.itd4stdt:
            
            ita4 = saved_hra.ita4 if saved_hra.ita4 else int(0)
            ita4_2 = saved_hra.ita4_2 if saved_hra.ita4_2 else int(0)            

            total_rent_4 = ita4 + ita4_2

            start_date = None
            end_date = None

            if saved_hra.ita4stdt:
                start_date = saved_hra.ita4stdt
                end_date = saved_hra.ita4enddt
            
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line4_count = date_difference.days
                line4_count_result = (line4_count * total_rent_4)/30 

        if saved_hra.itd5stdt:
            
            ita5 = saved_hra.ita5 if saved_hra.ita5 else int(0)
            ita5_2 = saved_hra.ita5_2 if saved_hra.ita5_2 else int(0)            

            total_rent_5 = ita5 + ita5_2 

            start_date = None
            end_date = None

            if saved_hra.ita5stdt:
                start_date = saved_hra.ita5stdt
                end_date = saved_hra.ita5enddt
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line5_count = date_difference.days
                line5_count_result = (line5_count * total_rent_5)/30                    
    except:
        saved_hra = None
    
    total_rent = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

    total_rent = round(total_rent) 

    if saved_basic.ver1Date and not saved_basic.verL2Date and not saved_basic.ver2Date:
        total_text = 'Allowed Total Rent for Financial Year on Maker verification'
    elif saved_basic.ver1Date and saved_basic.verL2Date and not saved_basic.ver2Date:
        total_text = 'Allowed Total Rent for Financial Year on Checker verification'
    elif saved_basic.ver1Date and saved_basic.verL2Date and saved_basic.ver2Date:
        total_text = 'Allowed Total Rent for Financial Year on Resub-1 verification'

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=inputEmpNo)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=inputEmpNo)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=inputEmpNo)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=inputEmpNo)        
    except:
        saved_previous_emp = None
                        
    remark = remarks.objects.all()
                        
    return render(request, 'va_templates/checker_emp_page.html', { 'data':data, 'band':band, 'emp':emp, 'saved_basic':saved_basic, 'saved_hra':saved_hra, 'total_rent':total_rent, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
                                                'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp, 'remark':remark, 
                                                'filenames':filenames, 'enumerated_filenames':enumerated_filenames, 'dec_files':dec_files, 'enum_dec_files':enum_dec_files,
                                                'resub1_filenames':resub1_filenames, 'resub1_enumerated_filenames':resub1_enumerated_filenames, 'resub2_filenames':resub2_filenames, 'resub2_enumerated_filenames':resub2_enumerated_filenames, 'total_text':total_text})

def checker_emp_page(request):
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':

        inputEmpNo = request.POST.get('inputEmpNo')

        proof_sub_all = it_proof_basic.objects.all()

              
        for i in proof_sub_all:                                   
            if i.empid.lower() == inputEmpNo.lower():                
                if i.submit_DT: 
                    if i.ver1Date:                        
                        if not i.verL2Date:                 
                            return redirect('chekcer_emppage_1', inputEmpNo=inputEmpNo)  
                        elif i.verL2Date and i.sub2Date and not i.ver2Date:                            
                            return redirect('chekcer_emppage_1', inputEmpNo=inputEmpNo)
                        elif i.verL2Date and i.sub2Date and i.ver2Date and i.sub3Date and not i.ver3Date:                           
                            return redirect('chekcer_emppage_1', inputEmpNo=inputEmpNo)
                        else:
                            error_message = 'Verification-2 is already completed.'
                            return render(request, 'va_templates/verifier2_dashboard.html', {'data':data, 'error_message':error_message, 'inputEmpNo':inputEmpNo})
                    else:
                        error_message = 'Verification-1 is not completed.'
                        return render(request, 'va_templates/verifier2_dashboard.html', {'data':data, 'error_message':error_message, 'inputEmpNo':inputEmpNo})
                                        
        error_message = 'Employee not submitted.!'
        return render(request, 'va_templates/verifier2_dashboard.html', {'data':data, 'error_message':error_message, 'inputEmpNo':inputEmpNo})
    else:
        error_message = 'Something went wrong. Please Try again later'
        return render(request, 'va_templates/verifier1_dashboard.html', {'data':data, 'error_message':error_message})
 
def checker_emp_page_cnumber(request, id):
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)
    
    inputEmpNo = id
                      
    try:
        filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit').exclude(Q(section__startswith='resub1') | Q(section__startswith='resub2'))
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
    except:
        filenames = None
        enumerated_filenames = None

    try:
        resub1_filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit', section__startswith='resub1')
        resub1_enumerated_filenames = [(index + 1, file) for index, file in enumerate(resub1_filenames)]
    except:
        resub1_filenames = None
        resub1_enumerated_filenames = None

    try:
        resub2_filenames = itprooffiles.objects.filter(empid=inputEmpNo, file_status = 'submit', section__startswith='resub2')
        resub2_enumerated_filenames = [(index + 1, file) for index, file in enumerate(resub2_filenames)]
    except:
        resub2_filenames = None
        resub2_enumerated_filenames = None
    
    try:
        dec_files = declaration_files.objects.filter(empid=inputEmpNo)
        enum_dec_files = [(index + 1, file) for index, file in enumerate(dec_files)]
    except:
        dec_files = None
        enum_dec_files = None

    band = ['09', '9', '10', 'A', 'B', 'C', 'D']
    
    try:
        emp = EmployeeDetail.objects.get(empid=inputEmpNo)                                                       
    except:
        emp = None  
    

    try:
        saved_basic = it_proof_basic.objects.get(empid=inputEmpNo)                                                       
    except:
        saved_basic = None                                

    try:
        saved_hra = it_proof_hra.objects.get(empid=inputEmpNo)
        
        line1_count = 0
        line1_count_result = 0 

        line2_count = 0
        line2_count_result = 0 

        line3_count = 0
        line3_count_result = 0 

        line4_count = 0
        line4_count_result = 0 

        line5_count = 0
        line5_count_result = 0 

        if saved_hra.itd1stdt:                                            
            start_date = saved_hra.itd1stdt
            end_date = saved_hra.itd1enddt
            date_difference = end_date - start_date
            line1_count = date_difference.days
            line1_count_result = (line1_count * saved_hra.itd1)/30        
            
        if saved_hra.itd2stdt:        
            start_date = saved_hra.itd2stdt
            end_date = saved_hra.itd2enddt
            date_difference = end_date - start_date
            line2_count = date_difference.days    
            line2_count_result = (line2_count * saved_hra.itd2)/30

        if saved_hra.itd3stdt:
            start_date = saved_hra.itd3stdt
            end_date = saved_hra.itd3enddt
            date_difference = end_date - start_date
            line3_count = date_difference.days    
            line3_count_result = (line3_count * saved_hra.itd3)/30

        if saved_hra.itd4stdt:
            start_date = saved_hra.itd4stdt
            end_date = saved_hra.itd4enddt
            date_difference = end_date - start_date
            line4_count = date_difference.days   
            line4_count_result = (line4_count * saved_hra.itd4)/30

        if saved_hra.itd5stdt:
            start_date = saved_hra.itd5stdt
            end_date = saved_hra.itd5enddt
            date_difference = end_date - start_date
            line5_count = date_difference.days   
            line5_count_result = (line5_count * saved_hra.itd5)/30

        total_rent1 = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

        total_rent = round(total_rent1)           
    except:
        saved_hra = None
        total_rent = 0

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=inputEmpNo)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=inputEmpNo)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=inputEmpNo)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=inputEmpNo)        
    except:
        saved_previous_emp = None
                        
    remark = remarks.objects.all()
                        
    return render(request, 'va_templates/checker_emp_page.html', { 'data':data, 'band':band, 'emp':emp, 'saved_basic':saved_basic, 'saved_hra':saved_hra, 'total_rent':total_rent, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
                                                'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp, 'remark':remark, 
                                                'filenames':filenames, 'enumerated_filenames':enumerated_filenames, 'dec_files':dec_files, 'enum_dec_files':enum_dec_files,
                                                'resub1_filenames':resub1_filenames, 'resub1_enumerated_filenames':resub1_enumerated_filenames, 'resub2_filenames':resub2_filenames, 'resub2_enumerated_filenames':resub2_enumerated_filenames})

def checker_control_number(request):
 
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':

        controlNoFrom = request.POST.get('controlNoFrom')
        controlNoTo = request.POST.get('controlNoTo')

        proof_sub_all = it_proof_basic.objects.filter(id__gte=controlNoFrom, id__lte=controlNoTo, submit_DT__isnull=False)

        
        for i in proof_sub_all:   
            if i.ver1Date and i.submit_DT:
                if not i.verL2Date:                 
                    i.enable_link = not i.verL2Date
                elif i.verL2Date and i.sub2Date and not i.ver2Date:
                    i.enable_link = i.verL2Date and i.sub2Date and not i.ver2Date
                elif i.verL2Date and i.sub2Date and i.ver2Date and i.sub3Date and not i.ver3Date:
                    i.enable_link = i.verL2Date and i.sub2Date and i.ver2Date and i.sub3Date and not i.ver3Date
        # and (timezone.now() - i.ver2Date) > timedelta(hours=144, minutes=00)
        return render(request, 'va_templates/checker_control_number.html', {'data':data, 'proof_sub_all':proof_sub_all})
    return render(request, 'va_templates/checker_control_number.html')

def submit_checker(request):      
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':
        ver_level_2 =  request.POST.get('ver_level_2')        
        empid =  request.POST.get('empid')
        custom_remark = request.POST.get('custom_remark')

        ver_level_2 = True if ver_level_2 == 'yes' else False

        saved_basic = it_proof_basic.objects.get(empid=empid)
        

        saved_basic.ver_level_2 = ver_level_2        
        saved_basic.custom_remark = custom_remark
        saved_basic.verL2Date = timezone.now() + timedelta(hours=5, minutes=30)
        saved_basic.save()
  
        try:  
            saved_hra = it_proof_hra.objects.get(empid=empid)             
        except:
            saved_hra = None
            
        

        line1_count = 0
        line1_count_result = 0 

        line2_count = 0
        line2_count_result = 0 

        line3_count = 0
        line3_count_result = 0 

        line4_count = 0
        line4_count_result = 0 

        line5_count = 0
        line5_count_result = 0 

        total_rent = None

        if saved_hra:
            if saved_hra.itd1stdt:
                ita1stdt =  request.POST.get('ita1stdt')
                ita1enddt =  request.POST.get('ita1enddt')        
                allow_rent_1 =  request.POST.get('allow_rent_1')
                a_city1 =  request.POST.get('a_city1')
                hra_remark_1 =  request.POST.get('hra_remark_1')

                if hra_remark_1 == '--select--' or hra_remark_1 == 'No Remark':
                    hra_remark_1 = None

                if ita1stdt:    
                    ita1stdt = datetime.strptime(ita1stdt, "%Y-%m-%d")            
                else:        
                    ita1stdt = None
                if ita1enddt:    
                    ita1enddt = datetime.strptime(ita1enddt, "%Y-%m-%d")            
                else:        
                    ita1enddt = None

                allow_rent_1 = int(allow_rent_1) if allow_rent_1 else int(0)  

                saved_hra.ita1 = allow_rent_1
                saved_hra.ita1stdt = ita1stdt
                saved_hra.ita1enddt = ita1enddt
                saved_hra.a_city1 =  a_city1  
                saved_hra.hra_remark_1 = hra_remark_1            

                saved_hra.save()

                start_date = saved_hra.ita1stdt
                end_date = saved_hra.ita1enddt
                date_difference = end_date - start_date
                line1_count = date_difference.days
                line1_count_result = (line1_count * saved_hra.ita1)/30
                        
            if saved_hra.itd2stdt:
                ita2stdt =  request.POST.get('ita2stdt')
                ita2enddt =  request.POST.get('ita2enddt')        
                allow_rent_2 =  request.POST.get('allow_rent_2')
                a_city2 =  request.POST.get('a_city2')
                hra_remark_2 =  request.POST.get('hra_remark_2')

                if hra_remark_2 == '--select--' or hra_remark_2 == 'No Remark':
                    hra_remark_2 = None

                if ita2stdt:    
                    ita2stdt = datetime.strptime(ita2stdt, "%Y-%m-%d")            
                else:        
                    ita2stdt = None 
                if ita2enddt:    
                    ita2enddt = datetime.strptime(ita2enddt, "%Y-%m-%d")            
                else:        
                    ita2enddt = None
                
                allow_rent_2 = int(allow_rent_2) if allow_rent_2 else int(0)  

                saved_hra.ita2 = allow_rent_2
                saved_hra.ita2stdt = ita2stdt
                saved_hra.ita2enddt = ita2enddt
                saved_hra.a_city2 =  a_city2
                saved_hra.hra_remark_2 = hra_remark_2

                saved_hra.save()

                start_date = saved_hra.ita2stdt
                end_date = saved_hra.ita2enddt
                date_difference = end_date - start_date
                line2_count = date_difference.days
                line2_count_result = (line2_count * saved_hra.ita2)/30
              
            if saved_hra.itd3stdt:
                ita3stdt =  request.POST.get('ita3stdt')
                ita3enddt =  request.POST.get('ita3enddt')        
                allow_rent_3 =  request.POST.get('allow_rent_3')
                a_city3 =  request.POST.get('a_city3')
                hra_remark_3 =  request.POST.get('hra_remark_3')

                if hra_remark_3 == '--select--' or hra_remark_3 == 'No Remark':
                    hra_remark_3 = None

                if ita3stdt:    
                    ita3stdt = datetime.strptime(ita3stdt, "%Y-%m-%d")            
                else:        
                    ita3stdt = None 
                if ita3enddt:    
                    ita3enddt = datetime.strptime(ita3enddt, "%Y-%m-%d")            
                else:        
                    ita3enddt = None
                allow_rent_3 = int(allow_rent_3) if allow_rent_3 else int(0)

                saved_hra.ita3 = allow_rent_3
                saved_hra.ita3stdt = ita3stdt
                saved_hra.ita3enddt = ita3enddt
                saved_hra.a_city3 =  a_city3
                saved_hra.hra_remark_3 = hra_remark_3

                saved_hra.save()

                start_date = saved_hra.ita3stdt
                end_date = saved_hra.ita3enddt
                date_difference = end_date - start_date
                line3_count = date_difference.days
                line3_count_result = (line3_count * saved_hra.ita3)/30
        
            if saved_hra.itd4stdt:
                ita4stdt =  request.POST.get('ita4stdt')
                ita4enddt =  request.POST.get('ita4enddt')        
                allow_rent_4 =  request.POST.get('allow_rent_4')
                a_city4 =  request.POST.get('a_city4')
                hra_remark_4 =  request.POST.get('hra_remark_4')

                if hra_remark_4 == '--select--' or hra_remark_4 == 'No Remark':
                    hra_remark_4 = None

                if ita4stdt:    
                    ita4stdt = datetime.strptime(ita4stdt, "%Y-%m-%d")            
                else:        
                    ita4stdt = None 
                if ita4enddt:    
                    ita4enddt = datetime.strptime(ita4enddt, "%Y-%m-%d")            
                else:        
                    ita4enddt = None
                allow_rent_4 = int(allow_rent_4) if allow_rent_4 else int(0)

                saved_hra.ita4 = allow_rent_4
                saved_hra.ita4stdt = ita4stdt
                saved_hra.ita4enddt = ita4enddt
                saved_hra.a_city4 =  a_city4
                saved_hra.hra_remark_4 = hra_remark_4

                saved_hra.save()

                start_date = saved_hra.ita4stdt
                end_date = saved_hra.ita4enddt
                date_difference = end_date - start_date
                line4_count = date_difference.days
                line4_count_result = (line4_count * saved_hra.ita4)/30
  
            if saved_hra.itd5stdt:
                ita5stdt =  request.POST.get('ita5stdt')
                ita5enddt =  request.POST.get('ita5enddt')        
                allow_rent_5 =  request.POST.get('allow_rent_5')
                a_city5 =  request.POST.get('a_city5')
                hra_remark_5 =  request.POST.get('hra_remark_5')

                if hra_remark_5 == '--select--' or hra_remark_5 == 'No Remark':
                    hra_remark_5 = None

                if ita5stdt:    
                    ita5stdt = datetime.strptime(ita5stdt, "%Y-%m-%d")            
                else:        
                    ita5stdt = None 
                if ita5enddt:    
                    ita5enddt = datetime.strptime(ita5enddt, "%Y-%m-%d")            
                else:        
                    ita5enddt = None

                allow_rent_5 = int(allow_rent_5) if allow_rent_5 else int(0)

                saved_hra.ita5 = allow_rent_5
                saved_hra.ita5stdt = ita5stdt
                saved_hra.ita5enddt = ita5enddt
                saved_hra.a_city5 =  a_city5
                saved_hra.hra_remark_5 = hra_remark_5

                saved_hra.save()

                start_date = saved_hra.ita5stdt
                end_date = saved_hra.ita5enddt
                date_difference = end_date - start_date
                line5_count = date_difference.days
                line5_count_result = (line5_count * saved_hra.ita5)/30

        total_rent = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

        if total_rent:
            total_rent = round(total_rent)  

        try:
            saved_Ilhp = it_proof_income_loss.objects.get(empid=empid) 
        except:
            saved_Ilhp = None    

        if saved_Ilhp:
            if saved_Ilhp.selfOccupiedHouseProperty:

                allowed_self = request.POST.get('allowed_self')
                self_remark = request.POST.get('self_remark')  

                if self_remark == '--select--' or self_remark == 'No Remark':
                    self_remark = None

                allowed_self = int(allowed_self) if allowed_self else int(0)

                saved_Ilhp.allowed_self = allowed_self
                saved_Ilhp.self_remark = self_remark
                saved_Ilhp.save()

            if saved_Ilhp.annualLettableValue:

                allowed_annualLettableValue = request.POST.get('allowed_annualLettableValue') 
                allowed_municipalPropertyTax = request.POST.get('allowed_municipalPropertyTax') 
                allowed_homeLoanInterest = request.POST.get('allowed_homeLoanInterest') 
                allowed_incomeLossOnHouseProperty = request.POST.get('allowed_incomeLossOnHouseProperty') 
                allowed_standardDeduction = request.POST.get('allowed_standardDeduction') 

                allowed_annualLettableValue_remark = request.POST.get('allowed_annualLettableValue_remark') 
                allowed_municipalPropertyTax_remark = request.POST.get('allowed_municipalPropertyTax_remark') 
                allowed_homeLoanInterest_remark = request.POST.get('allowed_homeLoanInterest_remark') 
                allowed_incomeLossOnHouseProperty_remark = request.POST.get('allowed_incomeLossOnHouseProperty_remark') 
                allowed_standardDeduction_remark = request.POST.get('allowed_standardDeduction_remark') 

                if allowed_annualLettableValue_remark == '--select--' or allowed_annualLettableValue_remark == 'No Remark':
                    allowed_annualLettableValue_remark = None

                if allowed_municipalPropertyTax_remark == '--select--' or allowed_municipalPropertyTax_remark == 'No Remark':
                    allowed_municipalPropertyTax_remark = None
                
                if allowed_homeLoanInterest_remark == '--select--' or allowed_homeLoanInterest_remark == 'No Remark':
                    allowed_homeLoanInterest_remark = None

                if allowed_incomeLossOnHouseProperty_remark == '--select--' or allowed_incomeLossOnHouseProperty_remark == 'No Remark':
                    allowed_incomeLossOnHouseProperty_remark = None

                if allowed_standardDeduction_remark == '--select--' or allowed_standardDeduction_remark == 'No Remark':
                    allowed_standardDeduction_remark = None 

                allowed_annualLettableValue = int(allowed_annualLettableValue) if allowed_annualLettableValue else int(0)  
                allowed_municipalPropertyTax = int(allowed_municipalPropertyTax) if allowed_municipalPropertyTax else int(0)  
                allowed_homeLoanInterest = int(allowed_homeLoanInterest) if allowed_homeLoanInterest else int(0)  
                allowed_incomeLossOnHouseProperty = int(allowed_incomeLossOnHouseProperty) if allowed_incomeLossOnHouseProperty else int(0) 
                allowed_standardDeduction = int(allowed_standardDeduction) if allowed_standardDeduction else int(0) 

                
                saved_Ilhp.allowed_annualLettableValue = allowed_annualLettableValue
                saved_Ilhp.allowed_municipalPropertyTax = allowed_municipalPropertyTax
                saved_Ilhp.allowed_homeLoanInterest = allowed_homeLoanInterest
                saved_Ilhp.allowed_incomeLossOnHouseProperty = allowed_incomeLossOnHouseProperty
                saved_Ilhp.allowed_standardDeduction = allowed_standardDeduction
            
                saved_Ilhp.allowed_annualLettableValue_remark = allowed_annualLettableValue_remark
                saved_Ilhp.allowed_municipalPropertyTax_remark = allowed_municipalPropertyTax_remark
                saved_Ilhp.allowed_homeLoanInterest_remark = allowed_homeLoanInterest_remark
                saved_Ilhp.allowed_incomeLossOnHouseProperty_remark = allowed_incomeLossOnHouseProperty_remark
                saved_Ilhp.allowed_standardDeduction_remark = allowed_standardDeduction_remark

                saved_Ilhp.save()

            if saved_Ilhp.loan_sanctioned_date:

                # allowed_loan_sanctioned_date = request.POST.get('allowed_loan_sanctioned_date')
                # allowed_loan_sanctioned_date_remark = request.POST.get('allowed_loan_sanctioned_date_remark')        

                allowed_loan_amount = request.POST.get('allowed_loan_amount')
                allowed_property_value = request.POST.get('allowed_property_value')
                allowed_home_loan = request.POST.get('allowed_home_loan')

                
                loan_amount_remark = request.POST.get('loan_amount_remark')         
                property_value_remark = request.POST.get('property_value_remark')        
                home_loan_remark = request.POST.get('home_loan_remark')
                
                
                if loan_amount_remark == '--select--' or loan_amount_remark == 'No Remark':
                    loan_amount_remark = None

                if property_value_remark == '--select--' or property_value_remark == 'No Remark':
                    property_value_remark = None
                
                if home_loan_remark == '--select--' or home_loan_remark == 'No Remark':
                    home_loan_remark = None

                

                allowed_loan_amount = int(allowed_loan_amount) if allowed_loan_amount else int(0)  
                allowed_property_value = int(allowed_property_value) if allowed_property_value else int(0)  
                allowed_home_loan = int(allowed_home_loan) if allowed_home_loan else int(0)   

                # saved_Ilhp.allowed_loan_sanctioned_date = allowed_loan_sanctioned_date
                # saved_Ilhp.allowed_loan_sanctioned_date_remark = allowed_loan_sanctioned_date_remark

                saved_Ilhp.allowed_loan_amount = allowed_loan_amount
                saved_Ilhp.loan_amount_remark = loan_amount_remark

                saved_Ilhp.allowed_property_value = allowed_property_value
                saved_Ilhp.property_value_remark = property_value_remark
                saved_Ilhp.allowed_home_loan = allowed_home_loan
                saved_Ilhp.home_loan_remark = home_loan_remark 

                saved_Ilhp.save() 

            if saved_Ilhp.loan_sanctioned_date_ee:

                
                allowed_property_value_other = request.POST.get('allowed_property_value_other')
                property_value_other_remark = request.POST.get('property_value_other_remark')
                
                
                if property_value_other_remark == '--select--' or property_value_other_remark == 'No Remark':
                    property_value_other_remark = None
                
                allowed_property_value_other = int(allowed_property_value_other) if allowed_property_value_other else int(0)

                saved_Ilhp.allowed_property_value_other = allowed_property_value_other                  
                saved_Ilhp.property_value_other_remark = property_value_other_remark
                saved_Ilhp.save()

            if saved_Ilhp.other_income_oi:
                allowed_other_income_oi = request.POST.get('allowed_other_income_oi')
                other_income_oi_remark = request.POST.get('other_income_oi_remark')

                if other_income_oi_remark == '--select--' or other_income_oi_remark == 'No Remark':
                    other_income_oi_remark = None

                allowed_other_income_oi = int(allowed_other_income_oi) if allowed_other_income_oi else int(0)

                saved_Ilhp.allowed_other_income_oi = allowed_other_income_oi
                saved_Ilhp.other_income_oi_remark = other_income_oi_remark
                saved_Ilhp.save()

            if saved_Ilhp.interest_80tta:
                
                allowed_interest_80tta = request.POST.get('allowed_interest_80tta')
                interest_80tta_remark = request.POST.get('interest_80tta_remark')

                if interest_80tta_remark == '--select--' or interest_80tta_remark == 'No Remark':
                    interest_80tta_remark = None

                allowed_interest_80tta = int(allowed_interest_80tta) if allowed_interest_80tta else int(0)

                saved_Ilhp.allowed_interest_80tta = allowed_interest_80tta
                saved_Ilhp.interest_80tta_remark = interest_80tta_remark

                saved_Ilhp.save()
        
        try:
            saved_other80 = it_proof_80_other.objects.get(empid=empid)
        except:
            saved_other80 = None

        if saved_other80:

            if saved_other80.medical_insurance_self_mip or saved_other80.medical_insurance_parents_mip or saved_other80.medical_insurance_Senior_Citizen or saved_other80.preventive_health_checkup_mip:

                allowed_medical_insurance = request.POST.get('allowed_medical_insurance')
                allowed_parents_mip_nsn = request.POST.get('allowed_parents_mip_nsn')
                allowed_parents_mip_sn = request.POST.get('allowed_parents_mip_sn')
                allowed_health_checkup = request.POST.get('allowed_health_checkup')

                medical_insurance_remark = request.POST.get('medical_insurance_remark')
                parents_mip_nsn_remark = request.POST.get('parents_mip_nsn_remark')
                parents_mip_sn_remark = request.POST.get('parents_mip_sn_remark')
                health_checkup_remark = request.POST.get('health_checkup_remark')

                if medical_insurance_remark == '--select--' or medical_insurance_remark == 'No Remark':
                    medical_insurance_remark = None
                
                if parents_mip_nsn_remark == '--select--' or parents_mip_nsn_remark == 'No Remark':
                    parents_mip_nsn_remark = None
                
                if parents_mip_sn_remark == '--select--' or parents_mip_sn_remark == 'No Remark':
                    parents_mip_sn_remark = None
                
                if health_checkup_remark == '--select--' or health_checkup_remark == 'No Remark':
                    health_checkup_remark = None


                allowed_medical_insurance = int(allowed_medical_insurance) if allowed_medical_insurance else int(0)  
                allowed_parents_mip_nsn = int(allowed_parents_mip_nsn) if allowed_parents_mip_nsn else int(0)  
                allowed_parents_mip_sn = int(allowed_parents_mip_sn) if allowed_parents_mip_sn else int(0)  
                allowed_health_checkup = int(allowed_health_checkup) if allowed_health_checkup else int(0) 

                saved_other80.allowed_medical_insurance = allowed_medical_insurance
                saved_other80.allowed_parents_mip_nsn = allowed_parents_mip_nsn
                saved_other80.allowed_parents_mip_sn = allowed_parents_mip_sn
                saved_other80.allowed_health_checkup = allowed_health_checkup
                saved_other80.medical_insurance_remark = medical_insurance_remark
                saved_other80.parents_mip_nsn_remark = parents_mip_nsn_remark
                saved_other80.parents_mip_sn_remark = parents_mip_sn_remark
                saved_other80.health_checkup_remark = health_checkup_remark

                saved_other80.save()

            if saved_other80.selected_illness:

                allowed_treatment_value = request.POST.get('allowed_treatment_value')
                treatment_value_remark = request.POST.get('treatment_value_remark')

                if treatment_value_remark == '--select--' or treatment_value_remark == 'No Remark':
                    treatment_value_remark = None

                allowed_treatment_value = int(allowed_treatment_value) if allowed_treatment_value else int(0)

                saved_other80.allowed_treatment_value = allowed_treatment_value
                saved_other80.treatment_value_remark = treatment_value_remark
                saved_other80.save()

            if saved_other80.interest_education:

                allowed_interest_education = request.POST.get('allowed_interest_education')
                interest_education_remark = request.POST.get('interest_education_remark')

                if interest_education_remark == '--select--' or interest_education_remark == 'No Remark':
                    interest_education_remark = None

                allowed_interest_education = int(allowed_interest_education) if allowed_interest_education else int(0)
                
                saved_other80.allowed_interest_education = allowed_interest_education
                saved_other80.interest_education_remark = interest_education_remark
                saved_other80.save()

            if saved_other80.paymentDependentDisability:
                allowed_Dependent_dis = request.POST.get('allowed_Dependent_dis')
                allowed_Dependent_remark = request.POST.get('allowed_Dependent_remark')

                if allowed_Dependent_remark == '--select--' or allowed_Dependent_remark == 'No Remark':
                    allowed_Dependent_remark = None


                allowed_Dependent_dis = int(allowed_Dependent_dis) if allowed_Dependent_dis else int(0)

                saved_other80.allowed_Dependent_dis = allowed_Dependent_dis
                saved_other80.allowed_Dependent_remark = allowed_Dependent_remark
                saved_other80.save()

            if saved_other80.paymentSelfDisability:

                allowed_self_dis = request.POST.get('allowed_self_dis')
                allowed_self_remark = request.POST.get('allowed_self_remark')

                if allowed_self_remark == '--select--' or allowed_self_remark == 'No Remark':                    
                    allowed_self_remark = None            

                allowed_self_dis = int(allowed_self_dis) if allowed_self_dis else int(0)

                saved_other80.allowed_self_dis = allowed_self_dis
                saved_other80.allowed_self_remark = allowed_self_remark

                saved_other80.save()
            
            if saved_other80.loan_sanctioned_date_80eeb:

                allowed_vehicle_value = request.POST.get('allowed_vehicle_value')
                vehicle_value_remark = request.POST.get('vehicle_value_remark')

                if vehicle_value_remark == '--select--' or vehicle_value_remark == 'No Remark':
                    vehicle_value_remark = None

                allowed_vehicle_value = int(allowed_vehicle_value) if allowed_vehicle_value else int(0)
                
                saved_other80.allowed_vehicle_value = allowed_vehicle_value
                saved_other80.vehicle_value_remark = vehicle_value_remark
                saved_other80.save()
            
            if saved_other80.nps_80ccd1b:

                allowed_nps_80ccd1b = request.POST.get('allowed_nps_80ccd1b')
                nps_80ccd1b_remark = request.POST.get('nps_80ccd1b_remark')

                if nps_80ccd1b_remark == '--select--' or nps_80ccd1b_remark == 'No Remark':
                    nps_80ccd1b_remark = None

                allowed_nps_80ccd1b = int(allowed_nps_80ccd1b) if allowed_nps_80ccd1b else int(0)
                
                saved_other80.allowed_nps_80ccd1b = allowed_nps_80ccd1b
                saved_other80.nps_80ccd1b_remark = nps_80ccd1b_remark
                saved_other80.save()


        try:            
            saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=empid)  
        except:
            saved_80C_deduction = None    

        if saved_80C_deduction:

            allowed_paymentLifeInsurance =  request.POST.get('allowed_paymentLifeInsurance')
            allowed_timeDeposit =  request.POST.get('allowed_timeDeposit')
            allowed_ulipContribution =  request.POST.get('allowed_ulipContribution')
            allowed_nscSubscription =  request.POST.get('allowed_nscSubscription')
            allowed_nscInterest =  request.POST.get('allowed_nscInterest')
            allowed_ppfContribution =  request.POST.get('allowed_ppfContribution')
            allowed_houseLoan =  request.POST.get('allowed_houseLoan')
            allowed_tuitionFee =  request.POST.get('allowed_tuitionFee')
            allowed_mutualFundSubscription =  request.POST.get('allowed_mutualFundSubscription')
            allowed_termDeposits =  request.POST.get('allowed_termDeposits')
            allowed_pensionContribution =  request.POST.get('allowed_pensionContribution')
            allowed_sukanyaSamriddhi =  request.POST.get('allowed_sukanyaSamriddhi')

            paymentLifeInsurance_remark =  request.POST.get('paymentLifeInsurance_remark')
            timeDeposit_remark =  request.POST.get('timeDeposit_remark')
            ulipContribution_remark =  request.POST.get('ulipContribution_remark')
            nscSubscription_remark =  request.POST.get('nscSubscription_remark')
            nscInterest_remark =  request.POST.get('nscInterest_remark')
            ppfContribution_remark =  request.POST.get('ppfContribution_remark')
            houseLoan_remark =  request.POST.get('houseLoan_remark')
            tuitionFee_remark =  request.POST.get('tuitionFee_remark')
            mutualFundSubscription_remark =  request.POST.get('mutualFundSubscription_remark')
            termDeposits_remark =  request.POST.get('termDeposits_remark')
            pensionContribution_remark =  request.POST.get('pensionContribution_remark')
            sukanyaSamriddhi_remark =  request.POST.get('sukanyaSamriddhi_remark')

            if paymentLifeInsurance_remark == '--select--' or paymentLifeInsurance_remark == 'No Remark':
                    paymentLifeInsurance_remark = None
                
            if timeDeposit_remark == '--select--' or timeDeposit_remark == 'No Remark':
                    timeDeposit_remark = None
            
            if ulipContribution_remark == '--select--' or ulipContribution_remark == 'No Remark':
                    ulipContribution_remark = None
            
            if nscSubscription_remark == '--select--' or nscSubscription_remark == 'No Remark':
                    nscSubscription_remark = None
                
            if nscInterest_remark == '--select--' or nscInterest_remark == 'No Remark':
                    nscInterest_remark = None
            
            if ppfContribution_remark == '--select--' or ppfContribution_remark == 'No Remark':
                    ppfContribution_remark = None

            if houseLoan_remark == '--select--' or houseLoan_remark == 'No Remark':
                    houseLoan_remark = None
                
            if tuitionFee_remark == '--select--' or tuitionFee_remark == 'No Remark':
                    tuitionFee_remark = None
            
            if mutualFundSubscription_remark == '--select--' or mutualFundSubscription_remark == 'No Remark':
                    mutualFundSubscription_remark = None
            
            if termDeposits_remark == '--select--' or termDeposits_remark == 'No Remark':
                    termDeposits_remark = None
                
            if pensionContribution_remark == '--select--' or pensionContribution_remark == 'No Remark':
                    pensionContribution_remark = None
            
            if sukanyaSamriddhi_remark == '--select--' or sukanyaSamriddhi_remark == 'No Remark':
                    sukanyaSamriddhi_remark = None

            allowed_paymentLifeInsurance = int(allowed_paymentLifeInsurance) if allowed_paymentLifeInsurance else int(0)  
            allowed_timeDeposit = int(allowed_timeDeposit) if allowed_timeDeposit else int(0)  
            allowed_ulipContribution = int(allowed_ulipContribution) if allowed_ulipContribution else int(0)  
            allowed_nscSubscription = int(allowed_nscSubscription) if allowed_nscSubscription else int(0)  
            allowed_nscInterest = int(allowed_nscInterest) if allowed_nscInterest else int(0)  
            allowed_ppfContribution = int(allowed_ppfContribution) if allowed_ppfContribution else int(0)  
            allowed_houseLoan = int(allowed_houseLoan) if allowed_houseLoan else int(0)  
            allowed_tuitionFee = int(allowed_tuitionFee) if allowed_tuitionFee else int(0)  
            allowed_mutualFundSubscription = int(allowed_mutualFundSubscription) if allowed_mutualFundSubscription else int(0)  
            allowed_termDeposits = int(allowed_termDeposits) if allowed_termDeposits else int(0)  
            allowed_pensionContribution = int(allowed_pensionContribution) if allowed_pensionContribution else int(0)  
            allowed_sukanyaSamriddhi = int(allowed_sukanyaSamriddhi) if allowed_sukanyaSamriddhi else int(0)

            saved_80C_deduction.allowed_paymentLifeInsurance = allowed_paymentLifeInsurance
            saved_80C_deduction.allowed_timeDeposit = allowed_timeDeposit
            saved_80C_deduction.allowed_ulipContribution = allowed_ulipContribution
            saved_80C_deduction.allowed_nscSubscription = allowed_nscSubscription
            saved_80C_deduction.allowed_nscInterest = allowed_nscInterest
            saved_80C_deduction.allowed_ppfContribution = allowed_ppfContribution
            saved_80C_deduction.allowed_houseLoan = allowed_houseLoan
            saved_80C_deduction.allowed_tuitionFee = allowed_tuitionFee
            saved_80C_deduction.allowed_mutualFundSubscription = allowed_mutualFundSubscription
            saved_80C_deduction.allowed_termDeposits = allowed_termDeposits
            saved_80C_deduction.allowed_pensionContribution = allowed_pensionContribution
            saved_80C_deduction.allowed_sukanyaSamriddhi = allowed_sukanyaSamriddhi

            saved_80C_deduction.paymentLifeInsurance_remark = paymentLifeInsurance_remark
            saved_80C_deduction.timeDeposit_remark = timeDeposit_remark
            saved_80C_deduction.ulipContribution_remark = ulipContribution_remark
            saved_80C_deduction.nscSubscription_remark = nscSubscription_remark
            saved_80C_deduction.nscInterest_remark = nscInterest_remark
            saved_80C_deduction.ppfContribution_remark = ppfContribution_remark
            saved_80C_deduction.houseLoan_remark = houseLoan_remark
            saved_80C_deduction.tuitionFee_remark = tuitionFee_remark
            saved_80C_deduction.mutualFundSubscription_remark = mutualFundSubscription_remark
            saved_80C_deduction.termDeposits_remark = termDeposits_remark
            saved_80C_deduction.pensionContribution_remark = pensionContribution_remark
            saved_80C_deduction.sukanyaSamriddhi_remark = sukanyaSamriddhi_remark
            
            saved_80C_deduction.save()


        try:
            saved_previous_emp = it_proof_previousemp.objects.get(empid=empid)        
        except:
            saved_previous_emp = None

        if saved_previous_emp:

            allowed_salary_previousemp =  request.POST.get('allowed_salary_previousemp')
            allowed_provident_fund =  request.POST.get('allowed_provident_fund')
            allowed_professional_tax =  request.POST.get('allowed_professional_tax')
            allowed_income_tax =  request.POST.get('allowed_income_tax')

            salary_previousemp_remark =  request.POST.get('salary_previousemp_remark')
            provident_fund_remark =  request.POST.get('provident_fund_remark')
            professional_tax_remark =  request.POST.get('professional_tax_remark')
            income_tax_remark =  request.POST.get('income_tax_remark')

            if salary_previousemp_remark == '--select--' or salary_previousemp_remark == 'No Remark':
                    salary_previousemp_remark = None

            if provident_fund_remark == '--select--' or provident_fund_remark == 'No Remark':
                    provident_fund_remark = None
            
            if professional_tax_remark == '--select--' or professional_tax_remark == 'No Remark':
                    professional_tax_remark = None

            if income_tax_remark == '--select--' or income_tax_remark == 'No Remark':
                    income_tax_remark = None

            allowed_salary_previousemp = int(allowed_salary_previousemp) if allowed_salary_previousemp else int(0) 
            allowed_provident_fund = int(allowed_provident_fund) if allowed_provident_fund else int(0)  
            allowed_professional_tax = int(allowed_professional_tax) if allowed_professional_tax else int(0)  
            allowed_income_tax = int(allowed_income_tax) if allowed_income_tax else int(0)  

            saved_previous_emp.allowed_salary_previousemp = allowed_salary_previousemp
            saved_previous_emp.allowed_provident_fund = allowed_provident_fund
            saved_previous_emp.allowed_professional_tax = allowed_professional_tax
            saved_previous_emp.allowed_income_tax = allowed_income_tax

            saved_previous_emp.salary_previousemp_remark = salary_previousemp_remark
            saved_previous_emp.provident_fund_remark = provident_fund_remark
            saved_previous_emp.professional_tax_remark = professional_tax_remark
            saved_previous_emp.income_tax_remark = income_tax_remark

            saved_previous_emp.save()

        context = {
            'saved_basic':saved_basic, 'saved_hra':saved_hra, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
            'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp, 'total_rent':total_rent
        }

        rendered_html = render_to_string('va_templates/email_template.html', context)
        result = BytesIO()
        
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
       


        if not pdf.err:
            pdf_filename = f"{saved_basic.empid}.pdf"
            
            if saved_basic.CompanyName == 'Kyndryl':

                support_user_1 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-1') 
                support_user_2 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-2')                

                email_body = f'''
                <p>Dear {saved_basic.empname} ({saved_basic.empid}),</p>
                <p>Your Income Tax proof has been verified.</p>
                <p>Attached is the status of your verification.</p>
                <p>To complete the process, please follow the steps below:</p>
                <ol>
                    <li>Click on <a href="https://www.youtube.com/">India Employee Proof Submission Worklet</a> and accept the terms in Disclaimer.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Income Tax Proof Submission Tab</a> on the left-hand side.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Income Tax Proof Submission Link.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Link to Submit Proofs.</li>
                    <li><a href="https://www.youtube.com/">Now upload files in the relevant section where there are rejections.</li>                    
                </ol>
                <p>You can login to workday and check the status of the claim.</p>
                <p>Should you require any assistance or information, please contact incomept@in.kyndryl.com<p>
                <p>Escalation Matrix:</p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>

                <p>Thanks & Regards,</p>
                <p>{saved_basic.CompanyName} Income Tax Proof Verification Team</p>
                '''
                email = EmailMessage(
                    subject='IT Proof Submission Verification',
                    body=email_body,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[saved_basic.emailid],
                )
                email.content_subtype = 'html'
                email.attach(pdf_filename, result.getvalue(), 'application/pdf')
                email.send(fail_silently=False)

            if saved_basic.CompanyName == 'IBM':

                support_user_1 = support_user.objects.get(company_name = 'IBM', user_level = 'level-1') 
                support_user_2 = support_user.objects.get(company_name = 'IBM', user_level = 'level-2')
                
                email_body_1 = f'''
                <p>Dear {saved_basic.empname} ({saved_basic.empid}),</p>
                <p>Your Income Tax proof has been verified.</p>
                <p>Attached is the status of your verification.</p>
                <p>To complete the process, please follow the steps below:</p>
                <ol>
                    <li>Click on <a href="https://www.google.com/maps">India Employee Proof Submission Worklet</a> and accept the terms in Disclaimer.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Income Tax Proof Submission Tab</a> on the left-hand side.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Income Tax Proof Submission Link.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Link to Submit Proofs.</li>
                    <li><a href="https://www.google.com/maps">Now upload files in the relevant section where there are rejections.</li>                    
                </ol>
                <p>You can login to workday and check the status of the claim.</p>               
                <p>Should you require any assistance or information, please contact incomept@in.ibm.com<p>
                <p>Escalation Matrix:</p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>

                <p>Thanks & Regards,</p>
                <p>{saved_basic.CompanyName} Income Tax Proof Verification Team</p>
                '''
                email = EmailMessage(
                    subject='IT Proof Submission Verification',
                    body=email_body_1,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[saved_basic.emailid],
                )
                email.content_subtype = 'html'
                email.attach(pdf_filename, result.getvalue(), 'application/pdf')
                email.send(fail_silently=False)
            
            success_message = 'Verification-2 completed.'
            return render(request, 'va_templates/checker_emp_page.html', {'data': context, 'success_message': success_message, 'inputEmpNo': empid})
        else:
            print("Error during PDF generation:", pdf.err)
            error_message = 'There was an error generating the PDF.'
            return render(request, 'va_templates/checker_emp_page.html', {'data': context, 'error_message': error_message, 'inputEmpNo': empid})
    
    success_message = 'Something went wrong please try again.'
    return render(request, 'va_templates/checker_emp_page.html', {'data':data, 'success_message':success_message, 'inputEmpNo':empid})

def submit_checker_2(request):      
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':
        ver_level_2 =  request.POST.get('ver_level_2')        
        empid =  request.POST.get('empid')
        custom_remark = request.POST.get('custom_remark')

        ver_level_2 = True if ver_level_2 == 'yes' else False

        saved_basic = it_proof_basic.objects.get(empid=empid)
        

        saved_basic.ver_level_2 = ver_level_2        
        saved_basic.custom_remark = custom_remark
        saved_basic.ver2Date = timezone.now() + timedelta(hours=5, minutes=30)
        saved_basic.save()
  
        try:  
            saved_hra = it_proof_hra.objects.get(empid=empid)               
        except:
            saved_hra = None   

        total_rent_1 = None
        total_rent_2 = None
        total_rent_3 = None
        total_rent_4 = None
        total_rent_5 = None

        line1_count = 0
        line1_count_result = 0 

        line2_count = 0
        line2_count_result = 0 

        line3_count = 0
        line3_count_result = 0 

        line4_count = 0
        line4_count_result = 0 

        line5_count = 0
        line5_count_result = 0 

        total_rent = None

        if saved_hra:
            if saved_hra.itd1stdt:
                ita1stdt =  request.POST.get('ita1stdt')
                ita1enddt =  request.POST.get('ita1enddt')        
                allow_rent_1_2 =  request.POST.get('allow_rent_1_2')
                a_city1 =  request.POST.get('a_city1')
                hra_remark_1_2 =  request.POST.get('hra_remark_1_2')

                if hra_remark_1_2 == '--select--':
                    hra_remark_1_2 = None
                                

                if ita1stdt:    
                    ita1stdt = datetime.strptime(ita1stdt, "%Y-%m-%d")            
                else:        
                    ita1stdt = None
                if ita1enddt:    
                    ita1enddt = datetime.strptime(ita1enddt, "%Y-%m-%d")            
                else:        
                    ita1enddt = None

                allow_rent_1_2 = int(allow_rent_1_2) if allow_rent_1_2 else int(0)  

                

                saved_hra.ita1_2 = allow_rent_1_2
                saved_hra.ita1stdt = ita1stdt
                saved_hra.ita1enddt = ita1enddt
                saved_hra.a_city1 =  a_city1  
                saved_hra.hra_remark_1_2 = hra_remark_1_2            

                saved_hra.save()

                total_rent_1 = saved_hra.ita1 + saved_hra.ita1_2

                start_date = saved_hra.ita1stdt
                end_date = saved_hra.ita1enddt
                date_difference = end_date - start_date
                line1_count = date_difference.days
                line1_count_result = (line1_count * total_rent_1)/30
                    
            if saved_hra.itd2stdt:
                ita2stdt =  request.POST.get('ita2stdt')
                ita2enddt =  request.POST.get('ita2enddt')        
                allow_rent_2_2 =  request.POST.get('allow_rent_2_2')
                a_city2 =  request.POST.get('a_city2')
                hra_remark_2_2 =  request.POST.get('hra_remark_2_2')

                if hra_remark_2_2 == '--select--':
                    hra_remark_2_2 = None
                
                
                if ita2stdt:    
                    ita2stdt = datetime.strptime(ita2stdt, "%Y-%m-%d")            
                else:        
                    ita2stdt = None 
                if ita2enddt:    
                    ita2enddt = datetime.strptime(ita2enddt, "%Y-%m-%d")            
                else:        
                    ita2enddt = None
                
                allow_rent_2_2 = int(allow_rent_2_2) if allow_rent_2_2 else int(0)               

                saved_hra.ita2_2 = allow_rent_2_2
                saved_hra.ita2stdt = ita2stdt
                saved_hra.ita2enddt = ita2enddt
                saved_hra.a_city2 =  a_city2
                saved_hra.hra_remark_2_2 = hra_remark_2_2

                saved_hra.save()

                total_rent_2 = saved_hra.ita2 + saved_hra.ita2_2

                start_date = saved_hra.ita2stdt
                end_date = saved_hra.ita2enddt
                date_difference = end_date - start_date
                line2_count = date_difference.days
                line2_count_result = (line2_count * total_rent_2)/30
              
            if saved_hra.itd3stdt:
                ita3stdt =  request.POST.get('ita3stdt')
                ita3enddt =  request.POST.get('ita3enddt')        
                allow_rent_3_2 =  request.POST.get('allow_rent_3_2')
                a_city3 =  request.POST.get('a_city3')
                hra_remark_3_2 =  request.POST.get('hra_remark_3_2')

                if hra_remark_3_2 == '--select--':
                    hra_remark_3_2 = None
                
               

                if ita3stdt:    
                    ita3stdt = datetime.strptime(ita3stdt, "%Y-%m-%d")            
                else:        
                    ita3stdt = None 
                if ita3enddt:    
                    ita3enddt = datetime.strptime(ita3enddt, "%Y-%m-%d")            
                else:        
                    ita3enddt = None
                allow_rent_3_2 = int(allow_rent_3_2) if allow_rent_3_2 else int(0)

                saved_hra.ita3_2 = allow_rent_3_2
                saved_hra.ita3stdt = ita3stdt
                saved_hra.ita3enddt = ita3enddt
                saved_hra.a_city3 =  a_city3
                saved_hra.hra_remark_3_2 = hra_remark_3_2

                saved_hra.save()

                total_rent_3 = saved_hra.ita3 + saved_hra.ita3_2

                start_date = saved_hra.ita3stdt
                end_date = saved_hra.ita3enddt
                date_difference = end_date - start_date
                line3_count = date_difference.days
                line3_count_result = (line3_count * total_rent_3)/30
        
            if saved_hra.itd4stdt:
                ita4stdt =  request.POST.get('ita4stdt')
                ita4enddt =  request.POST.get('ita4enddt')        
                allow_rent_4_2 =  request.POST.get('allow_rent_4_2')
                a_city4 =  request.POST.get('a_city4')
                hra_remark_4_2 =  request.POST.get('hra_remark_4_2')

                if hra_remark_4_2 == '--select--':
                    hra_remark_4_2 = None
              

                if ita4stdt:    
                    ita4stdt = datetime.strptime(ita4stdt, "%Y-%m-%d")            
                else:        
                    ita4stdt = None 
                if ita4enddt:    
                    ita4enddt = datetime.strptime(ita4enddt, "%Y-%m-%d")            
                else:        
                    ita4enddt = None
                allow_rent_4_2 = int(allow_rent_4_2) if allow_rent_4_2 else int(0)

                saved_hra.ita4_2 = allow_rent_4_2
                saved_hra.ita4stdt = ita4stdt
                saved_hra.ita4enddt = ita4enddt
                saved_hra.a_city4 =  a_city4
                saved_hra.hra_remark_4_2 = hra_remark_4_2

                saved_hra.save()

                total_rent_4 = saved_hra.ita4 + saved_hra.ita4_2

                start_date = saved_hra.ita4stdt
                end_date = saved_hra.ita4enddt
                date_difference = end_date - start_date
                line4_count = date_difference.days
                line4_count_result = (line4_count * total_rent_4)/30
  
            if saved_hra.itd5stdt:
                ita5stdt =  request.POST.get('ita5stdt')
                ita5enddt =  request.POST.get('ita5enddt')        
                allow_rent_5_2 =  request.POST.get('allow_rent_5_2')
                a_city5 =  request.POST.get('a_city5')
                hra_remark_5_2 =  request.POST.get('hra_remark_5_2')

                if hra_remark_5_2 == '--select--':
                    hra_remark_5_2 = None

                if ita5stdt:    
                    ita5stdt = datetime.strptime(ita5stdt, "%Y-%m-%d")            
                else:        
                    ita5stdt = None 
                if ita5enddt:    
                    ita5enddt = datetime.strptime(ita5enddt, "%Y-%m-%d")            
                else:        
                    ita5enddt = None

                allow_rent_5_2 = int(allow_rent_5_2) if allow_rent_5_2 else int(0)

                saved_hra.ita5_2 = allow_rent_5_2
                saved_hra.ita5stdt = ita5stdt
                saved_hra.ita5enddt = ita5enddt
                saved_hra.a_city5 =  a_city5
                saved_hra.hra_remark_5_2 = hra_remark_5_2

                saved_hra.save()

                total_rent_5 = saved_hra.ita5 + saved_hra.ita5_2

                start_date = saved_hra.ita5stdt
                end_date = saved_hra.ita5enddt
                date_difference = end_date - start_date
                line5_count = date_difference.days
                line5_count_result = (line5_count * total_rent_5)/30

        total_rent = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

        if total_rent:
            total_rent = round(total_rent)  


        try:
            saved_Ilhp = it_proof_income_loss.objects.get(empid=empid) 
        except:
            saved_Ilhp = None    

        total_self = None

        total_letout = None
        total_municipal = None
        total_let_int = None
        total_let_income = None
        total_let_stand = None

        total_80ee_1 = None
        total_80ee_2 = None
        total_80ee_3 = None
        
        total_80eea_1 = None

        total_other = None

        total_80tta = None

        
        if saved_Ilhp:
            if saved_Ilhp.selfOccupiedHouseProperty:

                allowed_self_2 = request.POST.get('allowed_self_2')
                self_remark_2 = request.POST.get('self_remark_2')  

                if self_remark_2 == '--select--':
                    self_remark_2 = None

                allowed_self_2 = int(allowed_self_2) if allowed_self_2 else int(0)

                saved_Ilhp.allowed_self_2 = allowed_self_2
                saved_Ilhp.self_remark_2 = self_remark_2
                saved_Ilhp.save()

                total_self = saved_Ilhp.allowed_self + saved_Ilhp.allowed_self_2


            if saved_Ilhp.annualLettableValue:

                allowed_annualLettableValue_2 = request.POST.get('allowed_annualLettableValue_2') 
                allowed_municipalPropertyTax_2 = request.POST.get('allowed_municipalPropertyTax_2') 
                allowed_homeLoanInterest_2 = request.POST.get('allowed_homeLoanInterest_2') 
                allowed_incomeLossOnHouseProperty_2 = request.POST.get('allowed_incomeLossOnHouseProperty_2') 
                allowed_standardDeduction_2 = request.POST.get('allowed_standardDeduction_2') 

                allowed_annualLettableValue_remark_2 = request.POST.get('allowed_annualLettableValue_remark_2') 
                allowed_municipalPropertyTax_remark_2 = request.POST.get('allowed_municipalPropertyTax_remark_2') 
                allowed_homeLoanInterest_remark_2 = request.POST.get('allowed_homeLoanInterest_remark_2') 
                allowed_incomeLossOnHouseProperty_remark_2 = request.POST.get('allowed_incomeLossOnHouseProperty_remark_2') 
                allowed_standardDeduction_remark_2 = request.POST.get('allowed_standardDeduction_remark_2') 

                if allowed_annualLettableValue_remark_2 == '--select--':
                    allowed_annualLettableValue_remark_2 = None

                if allowed_municipalPropertyTax_remark_2 == '--select--':
                    allowed_municipalPropertyTax_remark_2 = None
                
                if allowed_homeLoanInterest_remark_2 == '--select--':
                    allowed_homeLoanInterest_remark_2 = None

                if allowed_incomeLossOnHouseProperty_remark_2 == '--select--':
                    allowed_incomeLossOnHouseProperty_remark_2 = None

                if allowed_standardDeduction_remark_2 == '--select--':
                    allowed_standardDeduction_remark_2 = None 

                allowed_annualLettableValue_2 = int(allowed_annualLettableValue_2) if allowed_annualLettableValue_2 else int(0)  
                allowed_municipalPropertyTax_2 = int(allowed_municipalPropertyTax_2) if allowed_municipalPropertyTax_2 else int(0)  
                allowed_homeLoanInterest_2 = int(allowed_homeLoanInterest_2) if allowed_homeLoanInterest_2 else int(0)  
                allowed_incomeLossOnHouseProperty_2 = int(allowed_incomeLossOnHouseProperty_2) if allowed_incomeLossOnHouseProperty_2 else int(0) 
                allowed_standardDeduction_2 = int(allowed_standardDeduction_2) if allowed_standardDeduction_2 else int(0) 

                
                saved_Ilhp.allowed_annualLettableValue_2 = allowed_annualLettableValue_2
                saved_Ilhp.allowed_municipalPropertyTax_2 = allowed_municipalPropertyTax_2
                saved_Ilhp.allowed_homeLoanInterest_2 = allowed_homeLoanInterest_2
                saved_Ilhp.allowed_incomeLossOnHouseProperty_2 = allowed_incomeLossOnHouseProperty_2
                saved_Ilhp.allowed_standardDeduction_2 = allowed_standardDeduction_2
            
                saved_Ilhp.allowed_annualLettableValue_remark_2 = allowed_annualLettableValue_remark_2
                saved_Ilhp.allowed_municipalPropertyTax_remark_2 = allowed_municipalPropertyTax_remark_2
                saved_Ilhp.allowed_homeLoanInterest_remark_2 = allowed_homeLoanInterest_remark_2
                saved_Ilhp.allowed_incomeLossOnHouseProperty_remark_2 = allowed_incomeLossOnHouseProperty_remark_2
                saved_Ilhp.allowed_standardDeduction_remark_2 = allowed_standardDeduction_remark_2

                saved_Ilhp.save()

                total_letout = saved_Ilhp.allowed_annualLettableValue + saved_Ilhp.allowed_annualLettableValue_2
                total_municipal = saved_Ilhp.allowed_municipalPropertyTax + saved_Ilhp.allowed_municipalPropertyTax_2
                total_let_int = saved_Ilhp.allowed_homeLoanInterest + saved_Ilhp.allowed_homeLoanInterest_2
                total_let_income = saved_Ilhp.allowed_incomeLossOnHouseProperty + saved_Ilhp.allowed_incomeLossOnHouseProperty_2
                total_let_stand = saved_Ilhp.allowed_standardDeduction + saved_Ilhp.allowed_standardDeduction_2

            if saved_Ilhp.loan_sanctioned_date:                

                allowed_loan_amount_2 = request.POST.get('allowed_loan_amount_2')
                allowed_property_value_2 = request.POST.get('allowed_property_value_2')
                allowed_home_loan_2 = request.POST.get('allowed_home_loan_2')

                
                loan_amount_remark_2 = request.POST.get('loan_amount_remark_2')         
                property_value_remark_2 = request.POST.get('property_value_remark_2')        
                home_loan_remark_2 = request.POST.get('home_loan_remark_2')                
                
                if loan_amount_remark_2 == '--select--':
                    loan_amount_remark_2 = None

                if property_value_remark_2 == '--select--':
                    property_value_remark_2 = None
                
                if home_loan_remark_2 == '--select--':
                    home_loan_remark_2 = None

                

                allowed_loan_amount_2 = int(allowed_loan_amount_2) if allowed_loan_amount_2 else int(0)  
                allowed_property_value_2 = int(allowed_property_value_2) if allowed_property_value_2 else int(0)  
                allowed_home_loan_2 = int(allowed_home_loan_2) if allowed_home_loan_2 else int(0)               

                saved_Ilhp.allowed_loan_amount_2 = allowed_loan_amount_2
                saved_Ilhp.loan_amount_remark_2 = loan_amount_remark_2

                saved_Ilhp.allowed_property_value_2 = allowed_property_value_2
                saved_Ilhp.property_value_remark_2 = property_value_remark_2

                saved_Ilhp.allowed_home_loan_2 = allowed_home_loan_2
                saved_Ilhp.home_loan_remark_2 = home_loan_remark_2 

                saved_Ilhp.save() 

                total_80ee_1 = saved_Ilhp.allowed_loan_amount + saved_Ilhp.allowed_loan_amount_2
                total_80ee_2 = saved_Ilhp.allowed_property_value + saved_Ilhp.allowed_property_value_2
                total_80ee_3 = saved_Ilhp.allowed_home_loan + saved_Ilhp.allowed_home_loan_2

            if saved_Ilhp.loan_sanctioned_date_ee:                
                
                allowed_property_value_other_2 = request.POST.get('allowed_property_value_other_2')
                property_value_other_remark_2 = request.POST.get('property_value_other_remark_2')                
                
                if property_value_other_remark_2 == '--select--':
                    property_value_other_remark_2 = None
                
                allowed_property_value_other_2 = int(allowed_property_value_other_2) if allowed_property_value_other_2 else int(0)                

                saved_Ilhp.allowed_property_value_other_2 = allowed_property_value_other_2                  
                saved_Ilhp.property_value_other_remark_2 = property_value_other_remark_2
                saved_Ilhp.save()

                total_80eea_1 = saved_Ilhp.allowed_property_value_other + saved_Ilhp.allowed_property_value_other_2

            if saved_Ilhp.other_income_oi:
                allowed_other_income_oi_2 = request.POST.get('allowed_other_income_oi_2')
                other_income_oi_remark_2 = request.POST.get('other_income_oi_remark_2')

                if other_income_oi_remark_2 == '--select--':
                    other_income_oi_remark_2 = None

                allowed_other_income_oi_2 = int(allowed_other_income_oi_2) if allowed_other_income_oi_2 else int(0)

                saved_Ilhp.allowed_other_income_oi_2 = allowed_other_income_oi_2
                saved_Ilhp.other_income_oi_remark_2 = other_income_oi_remark_2
                saved_Ilhp.save()

                total_other = saved_Ilhp.allowed_other_income_oi + saved_Ilhp.allowed_other_income_oi_2

            if saved_Ilhp.interest_80tta:
                
                allowed_interest_80tta_2 = request.POST.get('allowed_interest_80tta_2')
                interest_80tta_remark_2 = request.POST.get('interest_80tta_remark_2')

                if interest_80tta_remark_2 == '--select--':
                    interest_80tta_remark_2 = None

                allowed_interest_80tta_2 = int(allowed_interest_80tta_2) if allowed_interest_80tta_2 else int(0)

                saved_Ilhp.allowed_interest_80tta_2 = allowed_interest_80tta_2
                saved_Ilhp.interest_80tta_remark_2 = interest_80tta_remark_2

                saved_Ilhp.save()

                total_80tta = saved_Ilhp.allowed_interest_80tta + saved_Ilhp.allowed_interest_80tta_2
        
        try:
            saved_other80 = it_proof_80_other.objects.get(empid=empid)
        except:
            saved_other80 = None

        total_80other_1 = None
        total_80other_2 = None
        total_80other_3 = None
        total_80other_4 = None

        total_illness = None
        total_education = None
        total_dep_dis = None
        total_self_dis = None        
        total_vehicle = None
        total_80ccd1b = None

        if saved_other80:

            if saved_other80.medical_insurance_self_mip or saved_other80.medical_insurance_parents_mip or saved_other80.medical_insurance_Senior_Citizen or saved_other80.preventive_health_checkup_mip:

                allowed_medical_insurance_2 = request.POST.get('allowed_medical_insurance_2')
                allowed_parents_mip_nsn_2 = request.POST.get('allowed_parents_mip_nsn_2')
                allowed_parents_mip_sn_2 = request.POST.get('allowed_parents_mip_sn_2')
                allowed_health_checkup_2 = request.POST.get('allowed_health_checkup_2')

                medical_insurance_remark_2 = request.POST.get('medical_insurance_remark_2')
                parents_mip_nsn_remark_2 = request.POST.get('parents_mip_nsn_remark_2')
                parents_mip_sn_remark_2 = request.POST.get('parents_mip_sn_remark_2')
                health_checkup_remark_2 = request.POST.get('health_checkup_remark_2')

                if medical_insurance_remark_2 == '--select--':
                    medical_insurance_remark_2 = None
                
                if parents_mip_nsn_remark_2 == '--select--':
                    parents_mip_nsn_remark_2 = None
                
                if parents_mip_sn_remark_2 == '--select--':
                    parents_mip_sn_remark_2 = None
                
                if health_checkup_remark_2 == '--select--':
                    health_checkup_remark_2 = None


                allowed_medical_insurance_2 = int(allowed_medical_insurance_2) if allowed_medical_insurance_2 else int(0)  
                allowed_parents_mip_nsn_2 = int(allowed_parents_mip_nsn_2) if allowed_parents_mip_nsn_2 else int(0)  
                allowed_parents_mip_sn_2 = int(allowed_parents_mip_sn_2) if allowed_parents_mip_sn_2 else int(0)  
                allowed_health_checkup_2 = int(allowed_health_checkup_2) if allowed_health_checkup_2 else int(0) 

                saved_other80.allowed_medical_insurance_2 = allowed_medical_insurance_2
                saved_other80.allowed_parents_mip_nsn_2 = allowed_parents_mip_nsn_2
                saved_other80.allowed_parents_mip_sn_2 = allowed_parents_mip_sn_2
                saved_other80.allowed_health_checkup_2 = allowed_health_checkup_2

                saved_other80.medical_insurance_remark_2 = medical_insurance_remark_2
                saved_other80.parents_mip_nsn_remark_2 = parents_mip_nsn_remark_2
                saved_other80.parents_mip_sn_remark_2 = parents_mip_sn_remark_2
                saved_other80.health_checkup_remark_2 = health_checkup_remark_2

                saved_other80.save()

                total_80other_1 = saved_other80.allowed_medical_insurance + saved_other80.allowed_medical_insurance_2
                total_80other_2 = saved_other80.allowed_parents_mip_nsn + saved_other80.allowed_parents_mip_nsn_2
                total_80other_3 = saved_other80.allowed_parents_mip_sn + saved_other80.allowed_parents_mip_sn_2
                total_80other_4 = saved_other80.allowed_health_checkup + saved_other80.allowed_health_checkup_2

            if saved_other80.selected_illness:

                allowed_treatment_value_2 = request.POST.get('allowed_treatment_value_2')
                treatment_value_remark_2 = request.POST.get('treatment_value_remark_2')

                if treatment_value_remark_2 == '--select--':
                    treatment_value_remark_2 = None

                allowed_treatment_value_2 = int(allowed_treatment_value_2) if allowed_treatment_value_2 else int(0)

                saved_other80.allowed_treatment_value_2 = allowed_treatment_value_2
                saved_other80.treatment_value_remark_2 = treatment_value_remark_2
                saved_other80.save()

                total_illness = saved_other80.allowed_treatment_value + saved_other80.allowed_treatment_value_2

            if saved_other80.interest_education:

                allowed_interest_education_2 = request.POST.get('allowed_interest_education_2')
                interest_education_remark_2 = request.POST.get('interest_education_remark_2')

                if interest_education_remark_2 == '--select--':
                    interest_education_remark_2 = None

                allowed_interest_education_2 = int(allowed_interest_education_2) if allowed_interest_education_2 else int(0)
                
                saved_other80.allowed_interest_education_2 = allowed_interest_education_2
                saved_other80.interest_education_remark_2 = interest_education_remark_2
                saved_other80.save()

                total_education = saved_other80.allowed_interest_education + saved_other80.allowed_interest_education_2

            if saved_other80.paymentDependentDisability:
                allowed_Dependent_dis_2 = request.POST.get('allowed_Dependent_dis_2')
                allowed_Dependent_remark_2 = request.POST.get('allowed_Dependent_remark_2')

                if allowed_Dependent_remark_2 == '--select--':
                    allowed_Dependent_remark_2 = None


                allowed_Dependent_dis_2 = int(allowed_Dependent_dis_2) if allowed_Dependent_dis_2 else int(0)

                saved_other80.allowed_Dependent_dis_2 = allowed_Dependent_dis_2
                saved_other80.allowed_Dependent_remark_2 = allowed_Dependent_remark_2
                saved_other80.save()

                total_dep_dis = saved_other80.allowed_Dependent_dis + saved_other80.allowed_Dependent_dis_2
        
            if saved_other80.paymentSelfDisability:

                allowed_self_dis_2 = request.POST.get('allowed_self_dis_2')
                allowed_self_remark_2 = request.POST.get('allowed_self_remark_2')

                if allowed_self_remark_2 == '--select--':
                    allowed_self_remark_2 = None

                allowed_self_dis_2 = int(allowed_self_dis_2) if allowed_self_dis_2 else int(0)

                saved_other80.allowed_self_dis_2 = allowed_self_dis_2
                saved_other80.allowed_self_remark_2 = allowed_self_remark_2

                saved_other80.save()

                total_self_dis = saved_other80.allowed_self_dis + saved_other80.allowed_self_dis_2 
            
            if saved_other80.loan_sanctioned_date_80eeb:

                allowed_vehicle_value_2 = request.POST.get('allowed_vehicle_value_2')
                vehicle_value_remark_2 = request.POST.get('vehicle_value_remark_2')

                if vehicle_value_remark_2 == '--select--':
                    vehicle_value_remark_2 = None

                allowed_vehicle_value_2 = int(allowed_vehicle_value_2) if allowed_vehicle_value_2 else int(0)
                
                saved_other80.allowed_vehicle_value_2 = allowed_vehicle_value_2
                saved_other80.vehicle_value_remark_2 = vehicle_value_remark_2
                saved_other80.save()

                total_vehicle = saved_other80.allowed_vehicle_value + saved_other80.allowed_vehicle_value_2
            
            if saved_other80.nps_80ccd1b:

                allowed_nps_80ccd1b_2 = request.POST.get('allowed_nps_80ccd1b_2')
                nps_80ccd1b_remark_2 = request.POST.get('nps_80ccd1b_remark_2')

                if nps_80ccd1b_remark_2 == '--select--':
                    nps_80ccd1b_remark_2 = None

                allowed_nps_80ccd1b_2 = int(allowed_nps_80ccd1b_2) if allowed_nps_80ccd1b_2 else int(0)
                
                saved_other80.allowed_nps_80ccd1b_2 = allowed_nps_80ccd1b_2
                saved_other80.nps_80ccd1b_remark_2 = nps_80ccd1b_remark_2
                saved_other80.save()

                total_80ccd1b = saved_other80.allowed_nps_80ccd1b + saved_other80.allowed_nps_80ccd1b_2


        try:            
            saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=empid)  
        except:
            saved_80C_deduction = None    

        total_c80_1 = None
        total_c80_2 = None
        total_c80_3 = None
        total_c80_4 = None
        total_c80_5 = None
        total_c80_6 = None
        total_c80_7 = None
        total_c80_8 = None
        total_c80_9 = None
        total_c80_10 = None
        total_c80_11 = None
        total_c80_12 = None
        

        if saved_80C_deduction:

            allowed_paymentLifeInsurance_2 =  request.POST.get('allowed_paymentLifeInsurance_2')
            allowed_timeDeposit_2 =  request.POST.get('allowed_timeDeposit_2')
            allowed_ulipContribution_2 =  request.POST.get('allowed_ulipContribution_2')
            allowed_nscSubscription_2 =  request.POST.get('allowed_nscSubscription_2')
            allowed_nscInterest_2 =  request.POST.get('allowed_nscInterest_2')
            allowed_ppfContribution_2 =  request.POST.get('allowed_ppfContribution_2')
            allowed_houseLoan_2 =  request.POST.get('allowed_houseLoan_2')
            allowed_tuitionFee_2 =  request.POST.get('allowed_tuitionFee_2')
            allowed_mutualFundSubscription_2 =  request.POST.get('allowed_mutualFundSubscription_2')
            allowed_termDeposits_2 =  request.POST.get('allowed_termDeposits_2')
            allowed_pensionContribution_2 =  request.POST.get('allowed_pensionContribution_2')
            allowed_sukanyaSamriddhi_2 =  request.POST.get('allowed_sukanyaSamriddhi_2')

            paymentLifeInsurance_remark_2 =  request.POST.get('paymentLifeInsurance_remark_2')
            timeDeposit_remark_2 =  request.POST.get('timeDeposit_remark_2')
            ulipContribution_remark_2 =  request.POST.get('ulipContribution_remark_2')
            nscSubscription_remark_2 =  request.POST.get('nscSubscription_remark_2')
            nscInterest_remark_2 =  request.POST.get('nscInterest_remark_2')
            ppfContribution_remark_2 =  request.POST.get('ppfContribution_remark_2')
            houseLoan_remark_2 =  request.POST.get('houseLoan_remark_2')
            tuitionFee_remark_2 =  request.POST.get('tuitionFee_remark_2')
            mutualFundSubscription_remark_2 =  request.POST.get('mutualFundSubscription_remark_2')
            termDeposits_remark_2 =  request.POST.get('termDeposits_remark_2')
            pensionContribution_remark_2 =  request.POST.get('pensionContribution_remark_2')
            sukanyaSamriddhi_remark_2 =  request.POST.get('sukanyaSamriddhi_remark_2')

            if paymentLifeInsurance_remark_2 == '--select--':
                    paymentLifeInsurance_remark_2 = None
                
            if timeDeposit_remark_2 == '--select--':
                    timeDeposit_remark_2 = None
            
            if ulipContribution_remark_2 == '--select--':
                    ulipContribution_remark_2 = None
            
            if nscSubscription_remark_2 == '--select--':
                    nscSubscription_remark_2 = None
                
            if nscInterest_remark_2 == '--select--':
                    nscInterest_remark_2 = None
            
            if ppfContribution_remark_2 == '--select--':
                    ppfContribution_remark_2 = None

            if houseLoan_remark_2 == '--select--':
                    houseLoan_remark_2 = None
                
            if tuitionFee_remark_2 == '--select--':
                    tuitionFee_remark_2 = None
            
            if mutualFundSubscription_remark_2 == '--select--':
                    mutualFundSubscription_remark_2 = None
            
            if termDeposits_remark_2 == '--select--':
                    termDeposits_remark_2 = None
                
            if pensionContribution_remark_2 == '--select--':
                    pensionContribution_remark_2 = None
            
            if sukanyaSamriddhi_remark_2 == '--select--':
                    sukanyaSamriddhi_remark_2 = None

            allowed_paymentLifeInsurance_2 = int(allowed_paymentLifeInsurance_2) if allowed_paymentLifeInsurance_2 else int(0)  
            allowed_timeDeposit_2 = int(allowed_timeDeposit_2) if allowed_timeDeposit_2 else int(0)  
            allowed_ulipContribution_2 = int(allowed_ulipContribution_2) if allowed_ulipContribution_2 else int(0)  
            allowed_nscSubscription_2 = int(allowed_nscSubscription_2) if allowed_nscSubscription_2 else int(0)  
            allowed_nscInterest_2 = int(allowed_nscInterest_2) if allowed_nscInterest_2 else int(0)  
            allowed_ppfContribution_2 = int(allowed_ppfContribution_2) if allowed_ppfContribution_2 else int(0)  
            allowed_houseLoan_2 = int(allowed_houseLoan_2) if allowed_houseLoan_2 else int(0)  
            allowed_tuitionFee_2 = int(allowed_tuitionFee_2) if allowed_tuitionFee_2 else int(0)  
            allowed_mutualFundSubscription_2 = int(allowed_mutualFundSubscription_2) if allowed_mutualFundSubscription_2 else int(0)  
            allowed_termDeposits_2 = int(allowed_termDeposits_2) if allowed_termDeposits_2 else int(0)  
            allowed_pensionContribution_2 = int(allowed_pensionContribution_2) if allowed_pensionContribution_2 else int(0)  
            allowed_sukanyaSamriddhi_2 = int(allowed_sukanyaSamriddhi_2) if allowed_sukanyaSamriddhi_2 else int(0)

            saved_80C_deduction.allowed_paymentLifeInsurance_2 = allowed_paymentLifeInsurance_2
            saved_80C_deduction.allowed_timeDeposit_2 = allowed_timeDeposit_2
            saved_80C_deduction.allowed_ulipContribution_2 = allowed_ulipContribution_2
            saved_80C_deduction.allowed_nscSubscription_2 = allowed_nscSubscription_2
            saved_80C_deduction.allowed_nscInterest_2 = allowed_nscInterest_2
            saved_80C_deduction.allowed_ppfContribution_2 = allowed_ppfContribution_2
            saved_80C_deduction.allowed_houseLoan_2 = allowed_houseLoan_2
            saved_80C_deduction.allowed_tuitionFee_2 = allowed_tuitionFee_2
            saved_80C_deduction.allowed_mutualFundSubscription_2 = allowed_mutualFundSubscription_2
            saved_80C_deduction.allowed_termDeposits_2 = allowed_termDeposits_2
            saved_80C_deduction.allowed_pensionContribution_2 = allowed_pensionContribution_2
            saved_80C_deduction.allowed_sukanyaSamriddhi_2 = allowed_sukanyaSamriddhi_2            

            saved_80C_deduction.paymentLifeInsurance_remark_2 = paymentLifeInsurance_remark_2
            saved_80C_deduction.timeDeposit_remark_2 = timeDeposit_remark_2
            saved_80C_deduction.ulipContribution_remark_2 = ulipContribution_remark_2
            saved_80C_deduction.nscSubscription_remark_2 = nscSubscription_remark_2
            saved_80C_deduction.nscInterest_remark_2 = nscInterest_remark_2
            saved_80C_deduction.ppfContribution_remark_2 = ppfContribution_remark_2
            saved_80C_deduction.houseLoan_remark_2 = houseLoan_remark_2
            saved_80C_deduction.tuitionFee_remark_2 = tuitionFee_remark_2
            saved_80C_deduction.mutualFundSubscription_remark_2 = mutualFundSubscription_remark_2
            saved_80C_deduction.termDeposits_remark_2 = termDeposits_remark_2
            saved_80C_deduction.pensionContribution_remark_2 = pensionContribution_remark_2
            saved_80C_deduction.sukanyaSamriddhi_remark_2 = sukanyaSamriddhi_remark_2
            
            saved_80C_deduction.save()

            
            total_c80_1 = saved_80C_deduction.allowed_paymentLifeInsurance + saved_80C_deduction.allowed_paymentLifeInsurance_2
            total_c80_2 = saved_80C_deduction.allowed_timeDeposit + saved_80C_deduction.allowed_timeDeposit_2
            total_c80_3 = saved_80C_deduction.allowed_ulipContribution + saved_80C_deduction.allowed_ulipContribution_2
            total_c80_4 = saved_80C_deduction.allowed_nscSubscription + saved_80C_deduction.allowed_nscSubscription_2
            total_c80_5 = saved_80C_deduction.allowed_nscInterest + saved_80C_deduction.allowed_nscInterest_2
            total_c80_6 = saved_80C_deduction.allowed_ppfContribution + saved_80C_deduction.allowed_ppfContribution_2
            total_c80_7 = saved_80C_deduction.allowed_houseLoan + saved_80C_deduction.allowed_houseLoan_2
            total_c80_8 = saved_80C_deduction.allowed_tuitionFee + saved_80C_deduction.allowed_tuitionFee_2
            total_c80_9 = saved_80C_deduction.allowed_mutualFundSubscription + saved_80C_deduction.allowed_mutualFundSubscription_2
            total_c80_10 = saved_80C_deduction.allowed_termDeposits + saved_80C_deduction.allowed_termDeposits_2
            total_c80_11 = saved_80C_deduction.allowed_pensionContribution + saved_80C_deduction.allowed_pensionContribution_2
            total_c80_12 = saved_80C_deduction.allowed_sukanyaSamriddhi + saved_80C_deduction.allowed_sukanyaSamriddhi_2


        try:
            saved_previous_emp = it_proof_previousemp.objects.get(empid=empid)        
        except:
            saved_previous_emp = None

        if saved_previous_emp:

            allowed_salary_previousemp_2 =  request.POST.get('allowed_salary_previousemp_2')
            allowed_provident_fund_2 =  request.POST.get('allowed_provident_fund_2')
            allowed_professional_tax_2 =  request.POST.get('allowed_professional_tax_2')
            allowed_income_tax_2 =  request.POST.get('allowed_income_tax_2')

            salary_previousemp_remark_2 =  request.POST.get('salary_previousemp_remark_2')
            provident_fund_remark_2 =  request.POST.get('provident_fund_remark_2')
            professional_tax_remark_2 =  request.POST.get('professional_tax_remark_2')
            income_tax_remark_2 =  request.POST.get('income_tax_remark_2')

            if salary_previousemp_remark_2 == '--select--':
                    salary_previousemp_remark_2 = None

            if provident_fund_remark_2 == '--select--':
                    provident_fund_remark_2 = None
            
            if professional_tax_remark_2 == '--select--':
                    professional_tax_remark_2 = None

            if income_tax_remark_2 == '--select--':
                    income_tax_remark_2 = None

            allowed_salary_previousemp_2 = int(allowed_salary_previousemp_2) if allowed_salary_previousemp_2 else int(0) 
            allowed_provident_fund_2 = int(allowed_provident_fund_2) if allowed_provident_fund_2 else int(0)  
            allowed_professional_tax_2 = int(allowed_professional_tax_2) if allowed_professional_tax_2 else int(0)  
            allowed_income_tax_2 = int(allowed_income_tax_2) if allowed_income_tax_2 else int(0)  

            saved_previous_emp.allowed_salary_previousemp_2 = allowed_salary_previousemp_2
            saved_previous_emp.allowed_provident_fund_2 = allowed_provident_fund_2
            saved_previous_emp.allowed_professional_tax_2 = allowed_professional_tax_2
            saved_previous_emp.allowed_income_tax_2 = allowed_income_tax_2

            saved_previous_emp.salary_previousemp_remark_2 = salary_previousemp_remark_2
            saved_previous_emp.provident_fund_remark_2 = provident_fund_remark_2
            saved_previous_emp.professional_tax_remark_2 = professional_tax_remark_2
            saved_previous_emp.income_tax_remark_2 = income_tax_remark_2

            saved_previous_emp.save()

        context = {
            'saved_basic':saved_basic, 'saved_hra':saved_hra, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
            'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp,

            'total_rent_1':total_rent_1, 'total_rent_2':total_rent_2, 'total_rent_3':total_rent_3, 'total_rent_4':total_rent_4, 'total_rent_5':total_rent_5, 'total_rent':total_rent,

            'total_self':total_self, 'total_letout':total_letout, 'total_municipal':total_municipal, 'total_let_int':total_let_int, 'total_let_income':total_let_income, 'total_let_stand':total_let_stand,
            'total_80ee_1':total_80ee_1, 'total_80ee_2':total_80ee_2, 'total_80ee_3':total_80ee_3, 'total_80eea_1':total_80eea_1, 'total_other':total_other, 'total_80tta':total_80tta,
            
            'total_80other_1':total_80other_1, 'total_80other_2':total_80other_2, 'total_80other_3':total_80other_3, 'total_80other_4':total_80other_4, 'total_illness':total_illness, 
            'total_education':total_education, 'total_dep_dis':total_dep_dis, 'total_self_dis':total_self_dis, 'total_vehicle':total_vehicle, 'total_80ccd1b':total_80ccd1b,

            'total_c80_1':total_c80_1, 'total_c80_2':total_c80_2, 'total_c80_3':total_c80_3, 'total_c80_4':total_c80_4, 'total_c80_5':total_c80_5, 'total_c80_6':total_c80_6,
            'total_c80_7':total_c80_7, 'total_c80_8':total_c80_8, 'total_c80_9':total_c80_9, 'total_c80_10':total_c80_10, 'total_c80_11':total_c80_11, 'total_c80_12':total_c80_12
        }

        rendered_html = render_to_string('va_templates/email_template_2.html', context)
        result = BytesIO()
        
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        


        if not pdf.err:
            pdf_filename = f"{saved_basic.empid}.pdf"
            
            if saved_basic.CompanyName == 'Kyndryl':

                support_user_1 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-1') 
                support_user_2 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-2')                

                email_body = f'''
                <p>Dear {saved_basic.empname} ({saved_basic.empid}),</p>
                <p>Your Income Tax proof has been verified.</p>
                <p>Attached is the status of your verification.</p>
                <p>To complete the process, please follow the steps below:</p>
                <ol>
                    <li>Click on <a href="https://www.youtube.com/">India Employee Proof Submission Worklet</a> and accept the terms in Disclaimer.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Income Tax Proof Submission Tab</a> on the left-hand side.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Income Tax Proof Submission Link.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Link to Submit Proofs.</li>
                    <li><a href="https://www.youtube.com/">Now upload files in the relevant section where there are rejections.</li>                    
                </ol>
                <p>You can login to workday and check the status of the claim.</p>
                <p>Should you require any assistance or information, please contact incomept@in.kyndryl.com<p>
                <p>Escalation Matrix:</p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>

                <p>Thanks & Regards,</p>
                <p>{saved_basic.CompanyName} Income Tax Proof Verification Team</p>
                '''
                email = EmailMessage(
                    subject='IT Proof Submission Verification',
                    body=email_body,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[saved_basic.emailid],
                )
                email.content_subtype = 'html'
                email.attach(pdf_filename, result.getvalue(), 'application/pdf')
                email.send(fail_silently=False)

            if saved_basic.CompanyName == 'IBM':

                support_user_1 = support_user.objects.get(company_name = 'IBM', user_level = 'level-1') 
                support_user_2 = support_user.objects.get(company_name = 'IBM', user_level = 'level-2')
                
                email_body_1 = f'''
                <p>Dear {saved_basic.empname} ({saved_basic.empid}),</p>
                <p>Your Income Tax proof has been verified.</p>
                <p>Attached is the status of your verification.</p>
                <p>To complete the process, please follow the steps below:</p>
                <ol>
                    <li>Click on <a href="https://www.google.com/maps">India Employee Proof Submission Worklet</a> and accept the terms in Disclaimer.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Income Tax Proof Submission Tab</a> on the left-hand side.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Income Tax Proof Submission Link.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Link to Submit Proofs.</li>
                    <li><a href="https://www.google.com/maps">Now upload files in the relevant section where there are rejections.</li>                    
                </ol>
                <p>You can login to workday and check the status of the claim.</p>               
                <p>Should you require any assistance or information, please contact incomept@in.ibm.com<p>
                <p>Escalation Matrix:</p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>

                <p>Thanks & Regards,</p>
                <p>{saved_basic.CompanyName} Income Tax Proof Verification Team</p>
                '''
                email = EmailMessage(
                    subject='IT Proof Submission Verification',
                    body=email_body_1,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[saved_basic.emailid],
                )
                email.content_subtype = 'html'
                email.attach(pdf_filename, result.getvalue(), 'application/pdf')
                email.send(fail_silently=False)
            
            success_message = 'Resub-1 Verification completed.'
            return render(request, 'va_templates/checker_emp_page.html', {'data': context, 'success_message': success_message, 'inputEmpNo': empid})
        else:
            print("Error during PDF generation:", pdf.err)
            error_message = 'There was an error generating the PDF.'
            return render(request, 'va_templates/checker_emp_page.html', {'data': context, 'error_message': error_message, 'inputEmpNo': empid})
    
    success_message = 'Something went wrong please try again.'
    return render(request, 'va_templates/checker_emp_page.html', {'data':data, 'success_message':success_message, 'inputEmpNo':empid})

def submit_checker_3(request):      
    username = request.session.get('username', None)   
    if not username:     
        return redirect('user_login')
    
    data = CustomUser.objects.get(username = username)

    if request.method == 'POST':
        ver_level_2 =  request.POST.get('ver_level_2')        
        empid =  request.POST.get('empid')
        custom_remark = request.POST.get('custom_remark')

        ver_level_2 = True if ver_level_2 == 'yes' else False

        saved_basic = it_proof_basic.objects.get(empid=empid)
        

        saved_basic.ver_level_2 = ver_level_2        
        saved_basic.custom_remark = custom_remark
        saved_basic.ver3Date = timezone.now() + timedelta(hours=5, minutes=30)
        saved_basic.save()
  
        try:  
            saved_hra = it_proof_hra.objects.get(empid=empid)               
        except:
            saved_hra = None   

        total_rent_1 = None
        total_rent_2 = None
        total_rent_3 = None
        total_rent_4 = None
        total_rent_5 = None

        line1_count = 0
        line1_count_result = 0 

        line2_count = 0
        line2_count_result = 0 

        line3_count = 0
        line3_count_result = 0 

        line4_count = 0
        line4_count_result = 0 

        line5_count = 0
        line5_count_result = 0

        total_rent = None

        if saved_hra:
            if saved_hra.itd1stdt:
                ita1stdt =  request.POST.get('ita1stdt')
                ita1enddt =  request.POST.get('ita1enddt')        
                allow_rent_1_3 =  request.POST.get('allow_rent_1_3')
                a_city1 =  request.POST.get('a_city1')
                hra_remark_1_3 =  request.POST.get('hra_remark_1_3')

                if hra_remark_1_3 == '--select--':
                    hra_remark_1_3 = None
                
               
                if ita1stdt:    
                    ita1stdt = datetime.strptime(ita1stdt, "%Y-%m-%d")            
                else:        
                    ita1stdt = None
                    
                if ita1enddt:    
                    ita1enddt = datetime.strptime(ita1enddt, "%Y-%m-%d")            
                else:        
                    ita1enddt = None

                allow_rent_1_3 = int(allow_rent_1_3) if allow_rent_1_3 else int(0)  

                saved_hra.ita1_3 = allow_rent_1_3
                saved_hra.ita1stdt = ita1stdt
                saved_hra.ita1enddt = ita1enddt
                saved_hra.a_city1 =  a_city1  
                saved_hra.hra_remark_1_3 = hra_remark_1_3            

                saved_hra.save()

                total_rent_1 = saved_hra.ita1 + saved_hra.ita1_2 + saved_hra.ita1_3

                start_date = saved_hra.ita1stdt
                end_date = saved_hra.ita1enddt
                date_difference = end_date - start_date
                line1_count = date_difference.days
                line1_count_result = (line1_count * total_rent_1)/30
                        
            if saved_hra.itd2stdt:
                ita2stdt =  request.POST.get('ita2stdt')
                ita2enddt =  request.POST.get('ita2enddt')        
                allow_rent_2_3 =  request.POST.get('allow_rent_2_3')
                a_city2 =  request.POST.get('a_city2')
                hra_remark_2_3 =  request.POST.get('hra_remark_2_3')

                if hra_remark_2_3 == '--select--':
                    hra_remark_2_3 = None

                

                if ita2stdt:    
                    ita2stdt = datetime.strptime(ita2stdt, "%Y-%m-%d")            
                else:        
                    ita2stdt = None 
                if ita2enddt:    
                    ita2enddt = datetime.strptime(ita2enddt, "%Y-%m-%d")            
                else:        
                    ita2enddt = None
                
                allow_rent_2_3 = int(allow_rent_2_3) if allow_rent_2_3 else int(0)  

                saved_hra.ita2_3 = allow_rent_2_3
                saved_hra.ita2stdt = ita2stdt
                saved_hra.ita2enddt = ita2enddt
                saved_hra.a_city2 =  a_city2
                saved_hra.hra_remark_2_3 = hra_remark_2_3

                saved_hra.save()

                total_rent_2 = saved_hra.ita2 + saved_hra.ita2_2 + saved_hra.ita2_3

                start_date = saved_hra.ita2stdt
                end_date = saved_hra.ita2enddt
                date_difference = end_date - start_date
                line2_count = date_difference.days
                line2_count_result = (line2_count * total_rent_2)/30
              
            if saved_hra.itd3stdt:
                ita3stdt =  request.POST.get('ita3stdt')
                ita3enddt =  request.POST.get('ita3enddt')        
                allow_rent_3_3 =  request.POST.get('allow_rent_3_3')
                a_city3 =  request.POST.get('a_city3')
                hra_remark_3_3 =  request.POST.get('hra_remark_3_3')

                if hra_remark_3_3 == '--select--':
                    hra_remark_3_3 = None
                
                

                if ita3stdt:    
                    ita3stdt = datetime.strptime(ita3stdt, "%Y-%m-%d")            
                else:        
                    ita3stdt = None 
                if ita3enddt:    
                    ita3enddt = datetime.strptime(ita3enddt, "%Y-%m-%d")            
                else:        
                    ita3enddt = None
                allow_rent_3_3 = int(allow_rent_3_3) if allow_rent_3_3 else int(0)

                saved_hra.ita3_3 = allow_rent_3_3
                saved_hra.ita3stdt = ita3stdt
                saved_hra.ita3enddt = ita3enddt
                saved_hra.a_city3 =  a_city3
                saved_hra.hra_remark_3_3 = hra_remark_3_3

                saved_hra.save()

                total_rent_3 = saved_hra.ita3 + saved_hra.ita3_2 + saved_hra.ita3_3

                start_date = saved_hra.ita3stdt
                end_date = saved_hra.ita3enddt
                date_difference = end_date - start_date
                line3_count = date_difference.days
                line3_count_result = (line3_count * total_rent_3)/30
        
            if saved_hra.itd4stdt:
                ita4stdt =  request.POST.get('ita4stdt')
                ita4enddt =  request.POST.get('ita4enddt')        
                allow_rent_4_3 =  request.POST.get('allow_rent_4_3')
                a_city4 =  request.POST.get('a_city4')
                hra_remark_4_3 =  request.POST.get('hra_remark_4_3')

                if hra_remark_4_3 == '--select--':
                    hra_remark_4_3 = None

                

                if ita4stdt:    
                    ita4stdt = datetime.strptime(ita4stdt, "%Y-%m-%d")            
                else:        
                    ita4stdt = None 
                if ita4enddt:    
                    ita4enddt = datetime.strptime(ita4enddt, "%Y-%m-%d")            
                else:        
                    ita4enddt = None
                allow_rent_4_3 = int(allow_rent_4_3) if allow_rent_4_3 else int(0)

                saved_hra.ita4_3 = allow_rent_4_3
                saved_hra.ita4stdt = ita4stdt
                saved_hra.ita4enddt = ita4enddt
                saved_hra.a_city4 =  a_city4
                saved_hra.hra_remark_4_3 = hra_remark_4_3

                saved_hra.save()

                total_rent_4 = saved_hra.ita4 + saved_hra.ita4_2 + saved_hra.ita4_3

                start_date = saved_hra.ita4stdt
                end_date = saved_hra.ita4enddt
                date_difference = end_date - start_date
                line4_count = date_difference.days
                line4_count_result = (line4_count * total_rent_4)/30
  
            if saved_hra.itd5stdt:
                ita5stdt =  request.POST.get('ita5stdt')
                ita5enddt =  request.POST.get('ita5enddt')        
                allow_rent_5_3 =  request.POST.get('allow_rent_5_3')
                a_city5 =  request.POST.get('a_city5')
                hra_remark_5_3 =  request.POST.get('hra_remark_5_3')

                if hra_remark_5_3 == '--select--':
                    hra_remark_5_3 = None            

                if ita5stdt:    
                    ita5stdt = datetime.strptime(ita5stdt, "%Y-%m-%d")            
                else:        
                    ita5stdt = None 
                if ita5enddt:    
                    ita5enddt = datetime.strptime(ita5enddt, "%Y-%m-%d")            
                else:        
                    ita5enddt = None

                allow_rent_5_3 = int(allow_rent_5_3) if allow_rent_5_3 else int(0)

                saved_hra.ita5_3 = allow_rent_5_3
                saved_hra.ita5stdt = ita5stdt
                saved_hra.ita5enddt = ita5enddt
                saved_hra.a_city5 =  a_city5
                saved_hra.hra_remark_5_3 = hra_remark_5_3

                saved_hra.save()

                total_rent_5 = saved_hra.ita5 + saved_hra.ita5_2 + saved_hra.ita5_3

                start_date = saved_hra.ita5stdt
                end_date = saved_hra.ita5enddt
                date_difference = end_date - start_date
                line5_count = date_difference.days
                line5_count_result = (line5_count * total_rent_5)/30
            
        total_rent = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

        if total_rent:
            total_rent = round(total_rent)


        try:
            saved_Ilhp = it_proof_income_loss.objects.get(empid=empid) 
        except:
            saved_Ilhp = None  

        total_self = None

        total_letout = None
        total_municipal = None
        total_let_int = None
        total_let_income = None
        total_let_stand = None

        total_80ee_1 = None
        total_80ee_2 = None
        total_80ee_3 = None
        
        total_80eea_1 = None

        total_other = None

        total_80tta = None  

        if saved_Ilhp:

            if saved_Ilhp.selfOccupiedHouseProperty:

                allowed_self_3 = request.POST.get('allowed_self_3')
                self_remark_3 = request.POST.get('self_remark_3')  

                if self_remark_3 == '--select--':
                    self_remark_3 = None

                allowed_self_3 = int(allowed_self_3) if allowed_self_3 else int(0)

                saved_Ilhp.allowed_self_3 = allowed_self_3
                saved_Ilhp.self_remark_3 = self_remark_3
                saved_Ilhp.save()

                total_self = saved_Ilhp.allowed_self + saved_Ilhp.allowed_self_2 + saved_Ilhp.allowed_self_3

            if saved_Ilhp.annualLettableValue:

                allowed_annualLettableValue_3 = request.POST.get('allowed_annualLettableValue_3') 
                allowed_municipalPropertyTax_3 = request.POST.get('allowed_municipalPropertyTax_3') 
                allowed_homeLoanInterest_3 = request.POST.get('allowed_homeLoanInterest_3') 
                allowed_incomeLossOnHouseProperty_3 = request.POST.get('allowed_incomeLossOnHouseProperty_3') 
                allowed_standardDeduction_3 = request.POST.get('allowed_standardDeduction_3') 

                allowed_annualLettableValue_remark_3 = request.POST.get('allowed_annualLettableValue_remark_3') 
                allowed_municipalPropertyTax_remark_3 = request.POST.get('allowed_municipalPropertyTax_remark_3') 
                allowed_homeLoanInterest_remark_3 = request.POST.get('allowed_homeLoanInterest_remark_3') 
                allowed_incomeLossOnHouseProperty_remark_3 = request.POST.get('allowed_incomeLossOnHouseProperty_remark_3') 
                allowed_standardDeduction_remark_3 = request.POST.get('allowed_standardDeduction_remark_3') 

                if allowed_annualLettableValue_remark_3 == '--select--':
                    allowed_annualLettableValue_remark_3 = None

                if allowed_municipalPropertyTax_remark_3 == '--select--':
                    allowed_municipalPropertyTax_remark_3 = None
                
                if allowed_homeLoanInterest_remark_3 == '--select--':
                    allowed_homeLoanInterest_remark_3 = None

                if allowed_incomeLossOnHouseProperty_remark_3 == '--select--':
                    allowed_incomeLossOnHouseProperty_remark_3 = None

                if allowed_standardDeduction_remark_3 == '--select--':
                    allowed_standardDeduction_remark_3 = None 

                allowed_annualLettableValue_3 = int(allowed_annualLettableValue_3) if allowed_annualLettableValue_3 else int(0)  
                allowed_municipalPropertyTax_3 = int(allowed_municipalPropertyTax_3) if allowed_municipalPropertyTax_3 else int(0)  
                allowed_homeLoanInterest_3 = int(allowed_homeLoanInterest_3) if allowed_homeLoanInterest_3 else int(0)  
                allowed_incomeLossOnHouseProperty_3 = int(allowed_incomeLossOnHouseProperty_3) if allowed_incomeLossOnHouseProperty_3 else int(0) 
                allowed_standardDeduction_3 = int(allowed_standardDeduction_3) if allowed_standardDeduction_3 else int(0) 

                
                saved_Ilhp.allowed_annualLettableValue_3 = allowed_annualLettableValue_3
                saved_Ilhp.allowed_municipalPropertyTax_3 = allowed_municipalPropertyTax_3
                saved_Ilhp.allowed_homeLoanInterest_3 = allowed_homeLoanInterest_3
                saved_Ilhp.allowed_incomeLossOnHouseProperty_3 = allowed_incomeLossOnHouseProperty_3
                saved_Ilhp.allowed_standardDeduction_3 = allowed_standardDeduction_3
            
                saved_Ilhp.allowed_annualLettableValue_remark_3 = allowed_annualLettableValue_remark_3
                saved_Ilhp.allowed_municipalPropertyTax_remark_3 = allowed_municipalPropertyTax_remark_3
                saved_Ilhp.allowed_homeLoanInterest_remark_3 = allowed_homeLoanInterest_remark_3
                saved_Ilhp.allowed_incomeLossOnHouseProperty_remark_3 = allowed_incomeLossOnHouseProperty_remark_3
                saved_Ilhp.allowed_standardDeduction_remark_3 = allowed_standardDeduction_remark_3

                saved_Ilhp.save()

                total_letout = saved_Ilhp.allowed_annualLettableValue + saved_Ilhp.allowed_annualLettableValue_2 + saved_Ilhp.allowed_annualLettableValue_3
                total_municipal = saved_Ilhp.allowed_municipalPropertyTax + saved_Ilhp.allowed_municipalPropertyTax_2 + saved_Ilhp.allowed_municipalPropertyTax_3
                total_let_int = saved_Ilhp.allowed_homeLoanInterest + saved_Ilhp.allowed_homeLoanInterest_2 + saved_Ilhp.allowed_homeLoanInterest_3
                total_let_income = saved_Ilhp.allowed_incomeLossOnHouseProperty + saved_Ilhp.allowed_incomeLossOnHouseProperty_2 + saved_Ilhp.allowed_incomeLossOnHouseProperty_3
                total_let_stand = saved_Ilhp.allowed_standardDeduction + saved_Ilhp.allowed_standardDeduction_2 + saved_Ilhp.allowed_standardDeduction_3

            if saved_Ilhp.loan_sanctioned_date:

                allowed_loan_amount_3 = request.POST.get('allowed_loan_amount_3')
                allowed_property_value_3 = request.POST.get('allowed_property_value_3')
                allowed_home_loan_3 = request.POST.get('allowed_home_loan_3')

                
                loan_amount_remark_3 = request.POST.get('loan_amount_remark_3')         
                property_value_remark_3 = request.POST.get('property_value_remark_3')        
                home_loan_remark_3 = request.POST.get('home_loan_remark_3')
                
                
                if loan_amount_remark_3 == '--select--':
                    loan_amount_remark_3 = None

                if property_value_remark_3 == '--select--':
                    property_value_remark_3 = None
                
                if home_loan_remark_3 == '--select--':
                    home_loan_remark_3 = None

                

                allowed_loan_amount_3 = int(allowed_loan_amount_3) if allowed_loan_amount_3 else int(0)  
                allowed_property_value_3 = int(allowed_property_value_3) if allowed_property_value_3 else int(0)  
                allowed_home_loan_3 = int(allowed_home_loan_3) if allowed_home_loan_3 else int(0)           

                saved_Ilhp.allowed_loan_amount_3 = allowed_loan_amount_3
                saved_Ilhp.loan_amount_remark_3 = loan_amount_remark_3

                saved_Ilhp.allowed_property_value_3 = allowed_property_value_3
                saved_Ilhp.property_value_remark_3 = property_value_remark_3

                saved_Ilhp.allowed_home_loan_3 = allowed_home_loan_3
                saved_Ilhp.home_loan_remark_3 = home_loan_remark_3 

                saved_Ilhp.save() 

                total_80ee_1 = saved_Ilhp.allowed_loan_amount + saved_Ilhp.allowed_loan_amount_2 + saved_Ilhp.allowed_loan_amount_3
                total_80ee_2 = saved_Ilhp.allowed_property_value + saved_Ilhp.allowed_property_value_2 + saved_Ilhp.allowed_property_value_3
                total_80ee_3 = saved_Ilhp.allowed_home_loan + saved_Ilhp.allowed_home_loan_2 + saved_Ilhp.allowed_home_loan_3

            if saved_Ilhp.loan_sanctioned_date_ee:
                                
                allowed_property_value_other_3 = request.POST.get('allowed_property_value_other_3')
                property_value_other_remark_3 = request.POST.get('property_value_other_remark_3')

                
                if property_value_other_remark_3 == '--select--':
                    property_value_other_remark_3 = None
                
                allowed_property_value_other_3 = int(allowed_property_value_other_3) if allowed_property_value_other_3 else int(0)

                saved_Ilhp.allowed_property_value_other_3 = allowed_property_value_other_3                  
                saved_Ilhp.property_value_other_remark_3 = property_value_other_remark_3
                saved_Ilhp.save()

                total_80eea_1 = saved_Ilhp.allowed_property_value_other + saved_Ilhp.allowed_property_value_other_2 + saved_Ilhp.allowed_property_value_other_3

            if saved_Ilhp.other_income_oi:
                allowed_other_income_oi_3 = request.POST.get('allowed_other_income_oi_3')
                other_income_oi_remark_3 = request.POST.get('other_income_oi_remark_3')

                if other_income_oi_remark_3 == '--select--':
                    other_income_oi_remark_3 = None

                allowed_other_income_oi_3 = int(allowed_other_income_oi_3) if allowed_other_income_oi_3 else int(0)

                saved_Ilhp.allowed_other_income_oi_3 = allowed_other_income_oi_3
                saved_Ilhp.other_income_oi_remark_3 = other_income_oi_remark_3
                saved_Ilhp.save()

                total_other = saved_Ilhp.allowed_other_income_oi + saved_Ilhp.allowed_other_income_oi_2 + saved_Ilhp.allowed_other_income_oi_3

            if saved_Ilhp.interest_80tta:
                
                allowed_interest_80tta_3 = request.POST.get('allowed_interest_80tta_3')
                interest_80tta_remark_3 = request.POST.get('interest_80tta_remark_3')

                if interest_80tta_remark_3 == '--select--':
                    interest_80tta_remark_3 = None

                allowed_interest_80tta_3 = int(allowed_interest_80tta_3) if allowed_interest_80tta_3 else int(0)

                saved_Ilhp.allowed_interest_80tta_3 = allowed_interest_80tta_3
                saved_Ilhp.interest_80tta_remark_3 = interest_80tta_remark_3

                saved_Ilhp.save()

                total_80tta = saved_Ilhp.allowed_interest_80tta + saved_Ilhp.allowed_interest_80tta_2 + saved_Ilhp.allowed_interest_80tta_3
        
        try:
            saved_other80 = it_proof_80_other.objects.get(empid=empid)
        except:
            saved_other80 = None

        
        total_80other_1 = None
        total_80other_2 = None
        total_80other_3 = None
        total_80other_4 = None

        total_illness = None
        total_education = None
        total_dep_dis = None
        total_self_dis = None        
        total_vehicle = None
        total_80ccd1b = None

        if saved_other80:

            if saved_other80.medical_insurance_self_mip or saved_other80.medical_insurance_parents_mip or saved_other80.medical_insurance_Senior_Citizen or saved_other80.preventive_health_checkup_mip:

                allowed_medical_insurance_3 = request.POST.get('allowed_medical_insurance_3')
                allowed_parents_mip_nsn_3 = request.POST.get('allowed_parents_mip_nsn_3')
                allowed_parents_mip_sn_3 = request.POST.get('allowed_parents_mip_sn_3')
                allowed_health_checkup_3 = request.POST.get('allowed_health_checkup_3')

                medical_insurance_remark_3 = request.POST.get('medical_insurance_remark_3')
                parents_mip_nsn_remark_3 = request.POST.get('parents_mip_nsn_remark_3')
                parents_mip_sn_remark_3 = request.POST.get('parents_mip_sn_remark_3')
                health_checkup_remark_3 = request.POST.get('health_checkup_remark_3')

                if medical_insurance_remark_3 == '--select--':
                    medical_insurance_remark_3 = None
                
                if parents_mip_nsn_remark_3 == '--select--':
                    parents_mip_nsn_remark_3 = None
                
                if parents_mip_sn_remark_3 == '--select--':
                    parents_mip_sn_remark_3 = None
                
                if health_checkup_remark_3 == '--select--':
                    health_checkup_remark_3 = None


                allowed_medical_insurance_3 = int(allowed_medical_insurance_3) if allowed_medical_insurance_3 else int(0)  
                allowed_parents_mip_nsn_3 = int(allowed_parents_mip_nsn_3) if allowed_parents_mip_nsn_3 else int(0)  
                allowed_parents_mip_sn_3 = int(allowed_parents_mip_sn_3) if allowed_parents_mip_sn_3 else int(0)  
                allowed_health_checkup_3 = int(allowed_health_checkup_3) if allowed_health_checkup_3 else int(0) 

                saved_other80.allowed_medical_insurance_3 = allowed_medical_insurance_3
                saved_other80.allowed_parents_mip_nsn_3 = allowed_parents_mip_nsn_3
                saved_other80.allowed_parents_mip_sn_3 = allowed_parents_mip_sn_3
                saved_other80.allowed_health_checkup_3 = allowed_health_checkup_3

                saved_other80.medical_insurance_remark_3 = medical_insurance_remark_3
                saved_other80.parents_mip_nsn_remark_3 = parents_mip_nsn_remark_3
                saved_other80.parents_mip_sn_remark_3 = parents_mip_sn_remark_3
                saved_other80.health_checkup_remark_3 = health_checkup_remark_3

                saved_other80.save()

                total_80other_1 = saved_other80.allowed_medical_insurance + saved_other80.allowed_medical_insurance_2 + saved_other80.allowed_medical_insurance_3
                total_80other_2 = saved_other80.allowed_parents_mip_nsn + saved_other80.allowed_parents_mip_nsn_2 + saved_other80.allowed_parents_mip_nsn_3
                total_80other_3 = saved_other80.allowed_parents_mip_sn + saved_other80.allowed_parents_mip_sn_2 + saved_other80.allowed_parents_mip_sn_3
                total_80other_4 = saved_other80.allowed_health_checkup + saved_other80.allowed_health_checkup_2 + saved_other80.allowed_health_checkup_3

            if saved_other80.selected_illness:

                allowed_treatment_value_3 = request.POST.get('allowed_treatment_value_3')
                treatment_value_remark_3 = request.POST.get('treatment_value_remark_3')

                if treatment_value_remark_3 == '--select--':
                    treatment_value_remark_3 = None

                allowed_treatment_value_3 = int(allowed_treatment_value_3) if allowed_treatment_value_3 else int(0)

                saved_other80.allowed_treatment_value_3 = allowed_treatment_value_3
                saved_other80.treatment_value_remark_3 = treatment_value_remark_3
                saved_other80.save()

                total_illness = saved_other80.allowed_treatment_value + saved_other80.allowed_treatment_value_2 + saved_other80.allowed_treatment_value_3

            if saved_other80.interest_education:

                allowed_interest_education_3 = request.POST.get('allowed_interest_education_3')
                interest_education_remark_3 = request.POST.get('interest_education_remark_3')

                if interest_education_remark_3 == '--select--':
                    interest_education_remark_3 = None

                allowed_interest_education_3 = int(allowed_interest_education_3) if allowed_interest_education_3 else int(0)
                
                saved_other80.allowed_interest_education_3 = allowed_interest_education_3
                saved_other80.interest_education_remark_3 = interest_education_remark_3
                saved_other80.save()

                total_education = saved_other80.allowed_interest_education + saved_other80.allowed_interest_education_2 + saved_other80.allowed_interest_education_3

            if saved_other80.paymentDependentDisability:
                allowed_Dependent_dis_3 = request.POST.get('allowed_Dependent_dis_3')
                allowed_Dependent_remark_3 = request.POST.get('allowed_Dependent_remark_3')

                if allowed_Dependent_remark_3 == '--select--':
                    allowed_Dependent_remark_3 = None


                allowed_Dependent_dis_3 = int(allowed_Dependent_dis_3) if allowed_Dependent_dis_3 else int(0)

                saved_other80.allowed_Dependent_dis_3 = allowed_Dependent_dis_3
                saved_other80.allowed_Dependent_remark_3 = allowed_Dependent_remark_3
                saved_other80.save()

                total_dep_dis = saved_other80.allowed_Dependent_dis + saved_other80.allowed_Dependent_dis_2 + saved_other80.allowed_Dependent_dis_3

            if saved_other80.paymentSelfDisability:

                allowed_self_dis_3 = request.POST.get('allowed_self_dis_3')
                allowed_self_remark_3 = request.POST.get('allowed_self_remark_3')

                if allowed_self_remark_3 == '--select--':
                    allowed_self_remark_3 = None

                allowed_self_dis_3 = int(allowed_self_dis_3) if allowed_self_dis_3 else int(0)

                saved_other80.allowed_self_dis_3 = allowed_self_dis_3
                saved_other80.allowed_self_remark_3 = allowed_self_remark_3

                saved_other80.save()

                total_self_dis = saved_other80.allowed_self_dis + saved_other80.allowed_self_dis_2 + saved_other80.allowed_self_dis_3
            
            if saved_other80.loan_sanctioned_date_80eeb:

                allowed_vehicle_value_3 = request.POST.get('allowed_vehicle_value_3')
                vehicle_value_remark_3 = request.POST.get('vehicle_value_remark_3')

                if vehicle_value_remark_3 == '--select--':
                    vehicle_value_remark_3 = None

                allowed_vehicle_value_3 = int(allowed_vehicle_value_3) if allowed_vehicle_value_3 else int(0)
                
                saved_other80.allowed_vehicle_value_3 = allowed_vehicle_value_3
                saved_other80.vehicle_value_remark_3 = vehicle_value_remark_3
                saved_other80.save()

                total_vehicle = saved_other80.allowed_vehicle_value + saved_other80.allowed_vehicle_value_2 + saved_other80.allowed_vehicle_value_3
            
            if saved_other80.nps_80ccd1b:

                allowed_nps_80ccd1b_3 = request.POST.get('allowed_nps_80ccd1b_3')
                nps_80ccd1b_remark_3 = request.POST.get('nps_80ccd1b_remark_3')

                if nps_80ccd1b_remark_3 == '--select--':
                    nps_80ccd1b_remark_3 = None

                allowed_nps_80ccd1b_3 = int(allowed_nps_80ccd1b_3) if allowed_nps_80ccd1b_3 else int(0)
                
                saved_other80.allowed_nps_80ccd1b_3 = allowed_nps_80ccd1b_3
                saved_other80.nps_80ccd1b_remark_3 = nps_80ccd1b_remark_3
                saved_other80.save()

                total_80ccd1b = saved_other80.allowed_nps_80ccd1b + saved_other80.allowed_nps_80ccd1b_2 + saved_other80.allowed_nps_80ccd1b_3


        try:            
            saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=empid)  
        except:
            saved_80C_deduction = None

        total_c80_1 = None
        total_c80_2 = None
        total_c80_3 = None
        total_c80_4 = None
        total_c80_5 = None
        total_c80_6 = None
        total_c80_7 = None
        total_c80_8 = None
        total_c80_9 = None
        total_c80_10 = None
        total_c80_11 = None
        total_c80_12 = None    

        if saved_80C_deduction:

            allowed_paymentLifeInsurance_3 =  request.POST.get('allowed_paymentLifeInsurance_3')
            allowed_timeDeposit_3 =  request.POST.get('allowed_timeDeposit_3')
            allowed_ulipContribution_3 =  request.POST.get('allowed_ulipContribution_3')
            allowed_nscSubscription_3 =  request.POST.get('allowed_nscSubscription_3')
            allowed_nscInterest_3 =  request.POST.get('allowed_nscInterest_3')
            allowed_ppfContribution_3 =  request.POST.get('allowed_ppfContribution_3')
            allowed_houseLoan_3 =  request.POST.get('allowed_houseLoan_3')
            allowed_tuitionFee_3 =  request.POST.get('allowed_tuitionFee_3')
            allowed_mutualFundSubscription_3 =  request.POST.get('allowed_mutualFundSubscription_3')
            allowed_termDeposits_3 =  request.POST.get('allowed_termDeposits_3')
            allowed_pensionContribution_3 =  request.POST.get('allowed_pensionContribution_3')
            allowed_sukanyaSamriddhi_3 =  request.POST.get('allowed_sukanyaSamriddhi_3')

            paymentLifeInsurance_remark_3 =  request.POST.get('paymentLifeInsurance_remark_3')
            timeDeposit_remark_3 =  request.POST.get('timeDeposit_remark_3')
            ulipContribution_remark_3 =  request.POST.get('ulipContribution_remark_3')
            nscSubscription_remark_3 =  request.POST.get('nscSubscription_remark_3')
            nscInterest_remark_3 =  request.POST.get('nscInterest_remark_3')
            ppfContribution_remark_3 =  request.POST.get('ppfContribution_remark_3')
            houseLoan_remark_3 =  request.POST.get('houseLoan_remark_3')
            tuitionFee_remark_3 =  request.POST.get('tuitionFee_remark_3')
            mutualFundSubscription_remark_3 =  request.POST.get('mutualFundSubscription_remark_3')
            termDeposits_remark_3 =  request.POST.get('termDeposits_remark_3')
            pensionContribution_remark_3 =  request.POST.get('pensionContribution_remark_3')
            sukanyaSamriddhi_remark_3 =  request.POST.get('sukanyaSamriddhi_remark_3')

            if paymentLifeInsurance_remark_3 == '--select--':
                    paymentLifeInsurance_remark_3 = None
                
            if timeDeposit_remark_3 == '--select--':
                    timeDeposit_remark_3 = None
            
            if ulipContribution_remark_3 == '--select--':
                    ulipContribution_remark_3 = None
            
            if nscSubscription_remark_3 == '--select--':
                    nscSubscription_remark_3 = None
                
            if nscInterest_remark_3 == '--select--':
                    nscInterest_remark_3 = None
            
            if ppfContribution_remark_3 == '--select--':
                    ppfContribution_remark_3 = None

            if houseLoan_remark_3 == '--select--':
                    houseLoan_remark_3 = None
                
            if tuitionFee_remark_3 == '--select--':
                    tuitionFee_remark_3 = None
            
            if mutualFundSubscription_remark_3 == '--select--':
                    mutualFundSubscription_remark_3 = None
            
            if termDeposits_remark_3 == '--select--':
                    termDeposits_remark_3 = None
                
            if pensionContribution_remark_3 == '--select--':
                    pensionContribution_remark_3 = None
            
            if sukanyaSamriddhi_remark_3 == '--select--':
                    sukanyaSamriddhi_remark_3 = None

            allowed_paymentLifeInsurance_3 = int(allowed_paymentLifeInsurance_3) if allowed_paymentLifeInsurance_3 else int(0)  
            allowed_timeDeposit_3 = int(allowed_timeDeposit_3) if allowed_timeDeposit_3 else int(0)  
            allowed_ulipContribution_3 = int(allowed_ulipContribution_3) if allowed_ulipContribution_3 else int(0)  
            allowed_nscSubscription_3 = int(allowed_nscSubscription_3) if allowed_nscSubscription_3 else int(0)  
            allowed_nscInterest_3 = int(allowed_nscInterest_3) if allowed_nscInterest_3 else int(0)  
            allowed_ppfContribution_3 = int(allowed_ppfContribution_3) if allowed_ppfContribution_3 else int(0)  
            allowed_houseLoan_3 = int(allowed_houseLoan_3) if allowed_houseLoan_3 else int(0)  
            allowed_tuitionFee_3 = int(allowed_tuitionFee_3) if allowed_tuitionFee_3 else int(0)  
            allowed_mutualFundSubscription_3 = int(allowed_mutualFundSubscription_3) if allowed_mutualFundSubscription_3 else int(0)  
            allowed_termDeposits_3 = int(allowed_termDeposits_3) if allowed_termDeposits_3 else int(0)  
            allowed_pensionContribution_3 = int(allowed_pensionContribution_3) if allowed_pensionContribution_3 else int(0)  
            allowed_sukanyaSamriddhi_3 = int(allowed_sukanyaSamriddhi_3) if allowed_sukanyaSamriddhi_3 else int(0)

            saved_80C_deduction.allowed_paymentLifeInsurance_3 = allowed_paymentLifeInsurance_3
            saved_80C_deduction.allowed_timeDeposit_3 = allowed_timeDeposit_3
            saved_80C_deduction.allowed_ulipContribution_3 = allowed_ulipContribution_3
            saved_80C_deduction.allowed_nscSubscription_3 = allowed_nscSubscription_3
            saved_80C_deduction.allowed_nscInterest_3 = allowed_nscInterest_3
            saved_80C_deduction.allowed_ppfContribution_3 = allowed_ppfContribution_3
            saved_80C_deduction.allowed_houseLoan_3 = allowed_houseLoan_3
            saved_80C_deduction.allowed_tuitionFee_3 = allowed_tuitionFee_3
            saved_80C_deduction.allowed_mutualFundSubscription_3 = allowed_mutualFundSubscription_3
            saved_80C_deduction.allowed_termDeposits_3 = allowed_termDeposits_3
            saved_80C_deduction.allowed_pensionContribution_3 = allowed_pensionContribution_3
            saved_80C_deduction.allowed_sukanyaSamriddhi_3 = allowed_sukanyaSamriddhi_3

            saved_80C_deduction.paymentLifeInsurance_remark_3 = paymentLifeInsurance_remark_3
            saved_80C_deduction.timeDeposit_remark_3 = timeDeposit_remark_3
            saved_80C_deduction.ulipContribution_remark_3 = ulipContribution_remark_3
            saved_80C_deduction.nscSubscription_remark_3 = nscSubscription_remark_3
            saved_80C_deduction.nscInterest_remark_3 = nscInterest_remark_3
            saved_80C_deduction.ppfContribution_remark_3 = ppfContribution_remark_3
            saved_80C_deduction.houseLoan_remark_3 = houseLoan_remark_3
            saved_80C_deduction.tuitionFee_remark_3 = tuitionFee_remark_3
            saved_80C_deduction.mutualFundSubscription_remark_3 = mutualFundSubscription_remark_3
            saved_80C_deduction.termDeposits_remark_3 = termDeposits_remark_3
            saved_80C_deduction.pensionContribution_remark_3 = pensionContribution_remark_3
            saved_80C_deduction.sukanyaSamriddhi_remark_3 = sukanyaSamriddhi_remark_3
            
            saved_80C_deduction.save()

            total_c80_1 = saved_80C_deduction.allowed_paymentLifeInsurance + saved_80C_deduction.allowed_paymentLifeInsurance_2 + saved_80C_deduction.allowed_paymentLifeInsurance_3
            total_c80_2 = saved_80C_deduction.allowed_timeDeposit + saved_80C_deduction.allowed_timeDeposit_2 + saved_80C_deduction.allowed_timeDeposit_3
            total_c80_3 = saved_80C_deduction.allowed_ulipContribution + saved_80C_deduction.allowed_ulipContribution_2 + saved_80C_deduction.allowed_ulipContribution_3
            total_c80_4 = saved_80C_deduction.allowed_nscSubscription + saved_80C_deduction.allowed_nscSubscription_2 + saved_80C_deduction.allowed_nscSubscription_3
            total_c80_5 = saved_80C_deduction.allowed_nscInterest + saved_80C_deduction.allowed_nscInterest_2 + saved_80C_deduction.allowed_nscInterest_3
            total_c80_6 = saved_80C_deduction.allowed_ppfContribution + saved_80C_deduction.allowed_ppfContribution_2 + saved_80C_deduction.allowed_ppfContribution_3
            total_c80_7 = saved_80C_deduction.allowed_houseLoan + saved_80C_deduction.allowed_houseLoan_2 + saved_80C_deduction.allowed_houseLoan_3
            total_c80_8 = saved_80C_deduction.allowed_tuitionFee + saved_80C_deduction.allowed_tuitionFee_2 + saved_80C_deduction.allowed_tuitionFee_3
            total_c80_9 = saved_80C_deduction.allowed_mutualFundSubscription + saved_80C_deduction.allowed_mutualFundSubscription_2 + saved_80C_deduction.allowed_mutualFundSubscription_3
            total_c80_10 = saved_80C_deduction.allowed_termDeposits + saved_80C_deduction.allowed_termDeposits_2 + saved_80C_deduction.allowed_termDeposits_3
            total_c80_11 = saved_80C_deduction.allowed_pensionContribution + saved_80C_deduction.allowed_pensionContribution_2 + saved_80C_deduction.allowed_pensionContribution_3
            total_c80_12 = saved_80C_deduction.allowed_sukanyaSamriddhi + saved_80C_deduction.allowed_sukanyaSamriddhi_2 + saved_80C_deduction.allowed_sukanyaSamriddhi_3


        try:
            saved_previous_emp = it_proof_previousemp.objects.get(empid=empid)        
        except:
            saved_previous_emp = None

        if saved_previous_emp:

            allowed_salary_previousemp_3 =  request.POST.get('allowed_salary_previousemp_3')
            allowed_provident_fund_3 =  request.POST.get('allowed_provident_fund_3')
            allowed_professional_tax_3 =  request.POST.get('allowed_professional_tax_3')
            allowed_income_tax_3 =  request.POST.get('allowed_income_tax_3')

            salary_previousemp_remark_3 =  request.POST.get('salary_previousemp_remark_3')
            provident_fund_remark_3 =  request.POST.get('provident_fund_remark_3')
            professional_tax_remark_3 =  request.POST.get('professional_tax_remark_3')
            income_tax_remark_3 =  request.POST.get('income_tax_remark_3')

            if salary_previousemp_remark_3 == '--select--':
                    salary_previousemp_remark_3 = None

            if provident_fund_remark_3 == '--select--':
                    provident_fund_remark_3 = None
            
            if professional_tax_remark_3 == '--select--':
                    professional_tax_remark_3 = None

            if income_tax_remark_3 == '--select--':
                    income_tax_remark_3 = None

            allowed_salary_previousemp_3 = int(allowed_salary_previousemp_3) if allowed_salary_previousemp_3 else int(0) 
            allowed_provident_fund_3 = int(allowed_provident_fund_3) if allowed_provident_fund_3 else int(0)  
            allowed_professional_tax_3 = int(allowed_professional_tax_3) if allowed_professional_tax_3 else int(0)  
            allowed_income_tax_3 = int(allowed_income_tax_3) if allowed_income_tax_3 else int(0)  

            saved_previous_emp.allowed_salary_previousemp_3 = allowed_salary_previousemp_3
            saved_previous_emp.allowed_provident_fund_3 = allowed_provident_fund_3
            saved_previous_emp.allowed_professional_tax_3 = allowed_professional_tax_3
            saved_previous_emp.allowed_income_tax_3 = allowed_income_tax_3

            saved_previous_emp.salary_previousemp_remark_3 = salary_previousemp_remark_3
            saved_previous_emp.provident_fund_remark_3 = provident_fund_remark_3
            saved_previous_emp.professional_tax_remark_3 = professional_tax_remark_3
            saved_previous_emp.income_tax_remark_3 = income_tax_remark_3

            saved_previous_emp.save()

        context = {
            'saved_basic':saved_basic, 'saved_hra':saved_hra, 'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80,
            'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp,

            'total_rent_1':total_rent_1, 'total_rent_2':total_rent_2, 'total_rent_3':total_rent_3, 'total_rent_4':total_rent_4, 'total_rent_5':total_rent_5, 'total_rent':total_rent,

            'total_self':total_self, 'total_letout':total_letout, 'total_municipal':total_municipal, 'total_let_int':total_let_int, 'total_let_income':total_let_income, 'total_let_stand':total_let_stand,
            'total_80ee_1':total_80ee_1, 'total_80ee_2':total_80ee_2, 'total_80ee_3':total_80ee_3, 'total_80eea_1':total_80eea_1, 'total_other':total_other, 'total_80tta':total_80tta,
            
            'total_80other_1':total_80other_1, 'total_80other_2':total_80other_2, 'total_80other_3':total_80other_3, 'total_80other_4':total_80other_4, 'total_illness':total_illness, 
            'total_education':total_education, 'total_dep_dis':total_dep_dis, 'total_self_dis':total_self_dis, 'total_vehicle':total_vehicle, 'total_80ccd1b':total_80ccd1b,

            'total_c80_1':total_c80_1, 'total_c80_2':total_c80_2, 'total_c80_3':total_c80_3, 'total_c80_4':total_c80_4, 'total_c80_5':total_c80_5, 'total_c80_6':total_c80_6,
            'total_c80_7':total_c80_7, 'total_c80_8':total_c80_8, 'total_c80_9':total_c80_9, 'total_c80_10':total_c80_10, 'total_c80_11':total_c80_11, 'total_c80_12':total_c80_12
        }

        rendered_html = render_to_string('va_templates/email_template_3.html', context)
        result = BytesIO()
        
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
     

        if not pdf.err:
            pdf_filename = f"{saved_basic.empid}.pdf"
            
            if saved_basic.CompanyName == 'Kyndryl':

                support_user_1 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-1') 
                support_user_2 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-2')                

                email_body = f'''
                <p>Dear {saved_basic.empname} ({saved_basic.empid}),</p>
                <p>Your Income Tax proof has been verified.</p>
                <p>Attached is the status of your verification.</p>
                <p>To complete the process, please follow the steps below:</p>
                <ol>
                    <li>Click on <a href="https://www.youtube.com/">India Employee Proof Submission Worklet</a> and accept the terms in Disclaimer.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Income Tax Proof Submission Tab</a> on the left-hand side.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Income Tax Proof Submission Link.</li>
                    <li>Click on the <a href="https://www.youtube.com/">Link to Submit Proofs.</li>
                    <li><a href="https://www.youtube.com/">Now upload files in the relevant section where there are rejections.</li>                    
                </ol>
                <p>You can login to workday and check the status of the claim.</p>
                <p>Should you require any assistance or information, please contact incomept@in.kyndryl.com<p>
                <p>Escalation Matrix:</p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>

                <p>Thanks & Regards,</p>
                <p>{saved_basic.CompanyName} Income Tax Proof Verification Team</p>
                '''
                email = EmailMessage(
                    subject='IT Proof Submission Verification',
                    body=email_body,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[saved_basic.emailid],
                )
                email.content_subtype = 'html'
                email.attach(pdf_filename, result.getvalue(), 'application/pdf')
                email.send(fail_silently=False)

            if saved_basic.CompanyName == 'IBM':

                support_user_1 = support_user.objects.get(company_name = 'IBM', user_level = 'level-1') 
                support_user_2 = support_user.objects.get(company_name = 'IBM', user_level = 'level-2')
                
                email_body_1 = f'''
                <p>Dear {saved_basic.empname} ({saved_basic.empid}),</p>
                <p>Your Income Tax proof has been verified.</p>
                <p>Attached is the status of your verification.</p>
                <p>To complete the process, please follow the steps below:</p>
                <ol>
                    <li>Click on <a href="https://www.google.com/maps">India Employee Proof Submission Worklet</a> and accept the terms in Disclaimer.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Income Tax Proof Submission Tab</a> on the left-hand side.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Income Tax Proof Submission Link.</li>
                    <li>Click on the <a href="https://www.google.com/maps">Link to Submit Proofs.</li>
                    <li><a href="https://www.google.com/maps">Now upload files in the relevant section where there are rejections.</li>                    
                </ol>
                <p>You can login to workday and check the status of the claim.</p>               
                <p>Should you require any assistance or information, please contact incomept@in.ibm.com<p>
                <p>Escalation Matrix:</p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>

                <p>Thanks & Regards,</p>
                <p>{saved_basic.CompanyName} Income Tax Proof Verification Team</p>
                '''
                email = EmailMessage(
                    subject='IT Proof Submission Verification',
                    body=email_body_1,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[saved_basic.emailid],
                )
                email.content_subtype = 'html'
                email.attach(pdf_filename, result.getvalue(), 'application/pdf')
                email.send(fail_silently=False)
            
            success_message = 'Resub-2 Verification completed.'
            return render(request, 'va_templates/checker_emp_page.html', {'data': context, 'success_message': success_message, 'inputEmpNo': empid})
        else:
            print("Error during PDF generation:", pdf.err)
            error_message = 'There was an error generating the PDF.'
            return render(request, 'va_templates/checker_emp_page.html', {'data': context, 'error_message': error_message, 'inputEmpNo': empid})
    
    success_message = 'Something went wrong please try again.'
    return render(request, 'va_templates/checker_emp_page.html', {'data':data, 'success_message':success_message, 'inputEmpNo':empid})



def fbp_maker_emp(request):
    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)
    control_num_st = data.control_num_st
    control_num_end = data.control_num_end

    if request.method == 'POST':
        cNum = request.POST.get('cNum')
        claimNo = request.POST.get('claimNo')

        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')

        if fromDate:            
            fromDate = datetime.strptime(fromDate, "%Y-%m-%d")
        else:            
            fromDate = None
        
        if toDate:            
            toDate = datetime.strptime(toDate, "%Y-%m-%d")
        else:            
            toDate = None


        if cNum:
            try:
                emp_data = tblClaimeMaster.objects.filter(empid=cNum, verL1Date=None, id__gte=control_num_st, id__lte=control_num_end)
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp1_dashboard.html', {'data': data, 'message': message})
            
            return render(request, 'va_templates/fbp1_dashboard.html', {'data': data, 'emp_data': emp_data, 'emp_data_1': emp_data_1})
            
        elif claimNo:
            try:
                emp_data = tblClaimeMaster.objects.filter(ClaimNo=claimNo, verL1Date=None, id__gte=control_num_st, id__lte=control_num_end)
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp1_dashboard.html', {'data': data, 'message': message})
            
            return render(request, 'va_templates/fbp1_dashboard.html', {'data': data, 'emp_data': emp_data, 'emp_data_1': emp_data_1})
        
        elif fromDate and toDate:
            try:
                emp_data = tblClaimeMaster.objects.filter(SubDate__date__gte=fromDate, SubDate__date__lte=toDate, verL1Date=None, id__gte=control_num_st, id__lte=control_num_end)
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp1_dashboard.html', {'data': data, 'message': message})
            
            return render(request, 'va_templates/fbp1_dashboard.html', {'data': data, 'emp_data': emp_data, 'emp_data_1': emp_data_1})

    return render(request, 'va_templates/fbp1_dashboard.html', {'data': data})

def fbp_maker_verify(request, claim_no):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)


    emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

    emp_id = emp_data.empid
    
    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_id)
        Car_dec_last = Car_dec.last()
        if Car_dec_last.clc:
            remaining_fuel = int(36000);
        elif Car_dec_last.own_car:
            if Car_dec_last.cc == 'More than 1600 CC':
                remaining_fuel = int(28800);
            else:
                remaining_fuel = int(21600);
        else:
            remaining_fuel = None
    except:
        Car_dec = None
        Car_dec_last = None
        remaining_fuel = None
    
    try:
        tbl_claim = tblClaimeMaster.objects.filter(empid = emp_id, Status = 'Approved').exclude(verL2Date=None)        
    except:
        tbl_claim = None
        
    if remaining_fuel:
        if tbl_claim:
            for i in tbl_claim:
                try:
                    app_fuel = tblFuel.objects.filter(empid = emp_id, ClaimNo = i.ClaimNo)
                    for j in app_fuel:
                        remaining_fuel = int(remaining_fuel) - int(j.AppAmt)      
                except:
                    app_fuel = None

    save_number_new = None

    try:
        fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)  
        fuel_tb_1 = [(index + 1, file) for index, file in enumerate(fuel_tb)] 
        fuel_tb_last = fuel_tb.last() 
    except:
        fuel_tb = None
        fuel_tb_1 = None
        fuel_tb_last = None
    
    if fuel_tb_last:
        save_number_new = fuel_tb_last.save_number
    
    try:
        road_tb = tblRoad.objects.filter(ClaimNo=claim_no)   
        road_tb_1 = [(index + 1, file) for index, file in enumerate(road_tb)]
        road_tb_last = road_tb.last()        
    except:
        road_tb = None
        road_tb_1 = None
        road_tb_last = None
    
    if road_tb_last:
        save_number_new = road_tb_last.save_number
    

    try:
        lta_tb = tblLTA.objects.filter(ClaimNo=claim_no) 
        lta_tb_1 = [(index + 1, file) for index, file in enumerate(lta_tb)]  
        lta_tb_last = lta_tb.last()        
    except:
        lta_tb = None
        lta_tb_1 = None
        lta_tb_last = None

    if lta_tb:
        print('lta_tb')

    if lta_tb_last:        
        save_number_new = lta_tb_last.save_number

    try:
        driver_tb = Drive.objects.filter(ClaimNo=claim_no)  
        driver_tb_1 = [(index + 1, file) for index, file in enumerate(driver_tb)]  
        driver_tb_last = driver_tb.last()       
    except:
        driver_tb = None
        driver_tb_1 = None    
        driver_tb_last = None    

    if driver_tb_last:
        save_number_new = driver_tb_last.save_number

    

    empl_no = emp_data.empid

    try:
        fbp_files = fbp_claim_file.objects.filter(empid = empl_no)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(fbp_files)]
    except:
        fbp_files = None
        enumerated_filenames = None
    
    if save_number_new:        
        try:
            dec_files = fbp_claim_file.objects.filter(empid = empl_no, save_number = save_number_new)
        except:
            dec_files = None

    

    return render(request, 'va_templates/fbp_maker_verify.html', {'data':data, 'emp_data':emp_data, 'fbp_files':fbp_files, 'enumerated_filenames':enumerated_filenames,
                                                                'fuel_tb':fuel_tb, 'road_tb':road_tb, 'lta_tb':lta_tb, 'driver_tb':driver_tb, 'remaining_fuel':remaining_fuel,
                                                                'fuel_tb_1':fuel_tb_1, 'road_tb_1':road_tb_1, 'lta_tb_1':lta_tb_1, 'driver_tb_1':driver_tb_1, 'dec_files':dec_files})

def fbp_maker_submit(request):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)    

    if request.method == 'POST':

        claim_no = request.POST.get('claim_no')

        emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

        try:
            fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)              
        except:
            fuel_tb = None            
        
        try:
            road_tb = tblRoad.objects.filter(ClaimNo=claim_no)               
        except:
            road_tb = None            
        
        try:
            lta_tb = tblLTA.objects.filter(ClaimNo=claim_no)             
        except:
            lta_tb = None            

        try:
            driver_tb = Drive.objects.filter(ClaimNo=claim_no)              
        except:
            driver_tb = None  

        customRemarks = request.POST.get('customRemarks', '')
        Status = request.POST.get('Status', '')


        if Status != 'Reject':

            if fuel_tb:
                for index, i in enumerate(fuel_tb):            
                    fuel_allowed_value = request.POST.get(f'fuel_allowed_value_{index+1}', '')
                    fuel_remark = request.POST.get(f'fuel_remark_{index+1}', '')
                
                    fuel_allowed_value = int(fuel_allowed_value)

                    i.AppAmt = fuel_allowed_value
                    i.remarks = fuel_remark
                    i.save()
            
            if road_tb:
                for index, i in enumerate(road_tb):            
                    road_allowed_value = request.POST.get(f'road_allowed_value_{index+1}', '')
                    road_remark = request.POST.get(f'road_remark_{index+1}', '')
                
                    road_allowed_value = int(road_allowed_value)

                    i.AppAmt = road_allowed_value
                    i.remarks = road_remark
                    i.save()
                
            if lta_tb:
                for index, i in enumerate(lta_tb):            
                    lta_allowed_value = request.POST.get(f'lta_allowed_value_{index+1}', '')
                    lta_remark = request.POST.get(f'lta_remark_{index+1}', '')
                
                    lta_allowed_value = int(lta_allowed_value)

                    i.AppAmt = lta_allowed_value
                    i.remarks = lta_remark
                    i.save()

            if driver_tb:
                for index, i in enumerate(driver_tb):            
                    driver_allowed_value = request.POST.get(f'driver_allowed_value_{index+1}', '')
                    driver_remark = request.POST.get(f'driver_remark_{index+1}', '')
                
                    driver_allowed_value = int(driver_allowed_value)

                    i.AppAmt = driver_allowed_value
                    i.remarks = driver_remark
                    i.save()
                
        else:
            if fuel_tb:
                for index, i in enumerate(fuel_tb):                                                
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()
            if road_tb:
                for index, i in enumerate(road_tb):            
                    
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()
                
            if lta_tb:
                for index, i in enumerate(lta_tb):                                

                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()

            if driver_tb:
                for index, i in enumerate(driver_tb):            
                   
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()


        
        emp_data.Status = Status
        emp_data.Remarks = customRemarks
        emp_data.verL1Date = timezone.now() + timedelta(hours=5, minutes=30)
        emp_data.verL1User = data.user_id
        emp_data.save()

        message = 'submitted successfully.'
        return render(request, 'va_templates/fbp_maker_verify.html', {'data': data, 'message': message})    
    

def fbp_checker_emp(request):
    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)

    all_verifier = CustomUser.objects.all()

    user_id = data.user_id
    control_num_st = data.control_num_st
    control_num_end = data.control_num_end

    try:
        hold_emp_data = tblClaimeMaster.objects.filter(verL1User = user_id, verL2Date = None, Status = 'On Hold', id__gte=control_num_st, id__lte=control_num_end).exclude(verL1Date=None)
        hold_emp_data_1 = []
        for index, file in enumerate(hold_emp_data):
            days_diff = (date.today() - file.SubDate.date()).days
            hold_emp_data_1.append((index + 1, file, days_diff))
    except tblClaimeMaster.DoesNotExist:
        hold_emp_data = None
        hold_emp_data_1 = None
    
    if request.method == 'POST':
        cNum = request.POST.get('cNum')
        claimNo = request.POST.get('claimNo')

        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')

        if fromDate:            
            fromDate = datetime.strptime(fromDate, "%Y-%m-%d")
        else:            
            fromDate = None
        
        if toDate:            
            toDate = datetime.strptime(toDate, "%Y-%m-%d")
        else:            
            toDate = None


        if cNum:
            try:             
                emp_data = tblClaimeMaster.objects.filter(empid=cNum, verL2Date = None, id__gte=control_num_st, id__lte=control_num_end).exclude(verL1Date=None)
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'message': message, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
            return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'emp_data': emp_data, 'emp_data_1': emp_data_1, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
        elif claimNo:
            try:                
                emp_data = tblClaimeMaster.objects.filter(ClaimNo=claimNo, verL2Date = None, id__gte=control_num_st, id__lte=control_num_end).exclude(verL1Date=None)
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'message': message, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
            return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'emp_data': emp_data, 'emp_data_1': emp_data_1, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
        
        elif fromDate and toDate:
            try:
                emp_data = tblClaimeMaster.objects.filter(SubDate__date__gte=fromDate, SubDate__date__lte=toDate, verL2Date = None, id__gte=control_num_st, id__lte=control_num_end).exclude(verL1Date=None)
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'message': message, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
            return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'emp_data': emp_data, 'emp_data_1': emp_data_1, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})

    return render(request, 'va_templates/fbp2_dashboard.html', {'data': data, 'all_verifier':all_verifier, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})

def fbp_checker_verify(request, claim_no):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)
    emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

    emp_id = emp_data.empid
    
    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_id)
        Car_dec_last = Car_dec.last()
        if Car_dec_last.clc:
            remaining_fuel = int(36000);
        elif Car_dec_last.own_car:
            if Car_dec_last.cc == 'More than 1600 CC':
                remaining_fuel = int(28800);
            else:
                remaining_fuel = int(21600);
        else:
            remaining_fuel = None
    except:
        Car_dec = None
        Car_dec_last = None
        remaining_fuel = None
    
    try:
        tbl_claim = tblClaimeMaster.objects.filter(empid = emp_id, Status = 'Approved').exclude(verL2Date=None)        
    except:
        tbl_claim = None
        
    if remaining_fuel:
        if tbl_claim:
            for i in tbl_claim:
                try:
                    app_fuel = tblFuel.objects.filter(empid = emp_id, ClaimNo = i.ClaimNo)
                    for j in app_fuel:
                        remaining_fuel = int(remaining_fuel) - int(j.AppAmt)      
                except:
                    app_fuel = None


    save_number_new = None

    try:
        fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)  
        fuel_tb_1 = [(index + 1, file) for index, file in enumerate(fuel_tb)]      
        fuel_tb_last = fuel_tb.last()         
    except:
        fuel_tb = None
        fuel_tb_1 = None 
        fuel_tb_last = None 

    
    if fuel_tb_last:
        save_number_new = fuel_tb_last.save_number      
    
    try:
        road_tb = tblRoad.objects.filter(ClaimNo=claim_no)   
        road_tb_1 = [(index + 1, file) for index, file in enumerate(road_tb)]   
        road_tb_last = road_tb.last()     
    except:
        road_tb = None
        road_tb_1 = None
        road_tb_last = None 

    if road_tb_last:
        save_number_new = road_tb_last.save_number  
    
    try:
        lta_tb = tblLTA.objects.filter(ClaimNo=claim_no) 
        lta_tb_1 = [(index + 1, file) for index, file in enumerate(lta_tb)]
        lta_tb_last = lta_tb.last()          
    except:
        lta_tb = None
        lta_tb_1 = None
        lta_tb_last = None 

    if lta_tb_last:
        save_number_new = lta_tb_last.save_number  


    try:
        driver_tb = Drive.objects.filter(ClaimNo=claim_no)  
        driver_tb_1 = [(index + 1, file) for index, file in enumerate(driver_tb)]  
        driver_tb_last = driver_tb.last()       
    except:
        driver_tb = None
        driver_tb_1 = None  
        driver_tb_last = None 

    if driver_tb_last:
        save_number_new = driver_tb_last.save_number  

    
    empl_no = emp_data.empid

    try:
        fbp_files = fbp_claim_file.objects.filter(empid = empl_no)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(fbp_files)]
    except:
        fbp_files = None
        enumerated_filenames = None
    
    if save_number_new:
        try:
            dec_files = fbp_claim_file.objects.filter(empid = empl_no, save_number = save_number_new)
        except:
            dec_files = None
    


    

    return render(request, 'va_templates/fbp_checker_verify.html', {'data':data, 'emp_data':emp_data, 'fbp_files':fbp_files, 'enumerated_filenames':enumerated_filenames,
                                                                'fuel_tb':fuel_tb, 'road_tb':road_tb, 'lta_tb':lta_tb, 'driver_tb':driver_tb, 'remaining_fuel':remaining_fuel,
                                                                'fuel_tb_1':fuel_tb_1, 'road_tb_1':road_tb_1, 'lta_tb_1':lta_tb_1, 'driver_tb_1':driver_tb_1, 'dec_files':dec_files})

def fbp_checker_submit(request):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)    

    if request.method == 'POST':

        claim_no = request.POST.get('claim_no')

        emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

        t_fuel = 0
        t_road = 0
        t_lta = 0
        t_driver = 0

        try:
            fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no) 
            for i in fuel_tb:
                t_fuel = t_fuel + i.AmtClaimed           
        except:
            fuel_tb = None            
        
        try:
            road_tb = tblRoad.objects.filter(ClaimNo=claim_no)
            for i in road_tb:
                t_road = t_road + i.AmtClaimed                
        except:
            road_tb = None            
        
        try:
            lta_tb = tblLTA.objects.filter(ClaimNo=claim_no)   
            for i in lta_tb:
                t_lta = t_lta + i.AmtClaimed           
        except:
            lta_tb = None            

        try:
            driver_tb = Drive.objects.filter(ClaimNo=claim_no)  
            for i in driver_tb:
                t_driver = t_driver + i.DriveSal             
        except:
            driver_tb = None   


        total_cliamed = t_fuel + t_road + t_lta + t_driver

        customRemarks = request.POST.get('customRemarks', '')
        Status = request.POST.get('Status', '')
        

        if Status != 'Reject':      

            if fuel_tb:
                for index, i in enumerate(fuel_tb):            
                    fuel_allowed_value = request.POST.get(f'fuel_allowed_value_{index+1}', '')
                    fuel_remark = request.POST.get(f'fuel_remark_{index+1}', '')
                
                    fuel_allowed_value = int(fuel_allowed_value)

                    i.AppAmt = fuel_allowed_value
                    i.remarks = fuel_remark
                    i.save()
            
            if road_tb:
                for index, i in enumerate(road_tb):            
                    road_allowed_value = request.POST.get(f'road_allowed_value_{index+1}', '')
                    road_remark = request.POST.get(f'road_remark_{index+1}', '')
                
                    road_allowed_value = int(road_allowed_value)

                    i.AppAmt = road_allowed_value
                    i.remarks = road_remark
                    i.save()
                
            if lta_tb:
                for index, i in enumerate(lta_tb):            
                    lta_allowed_value = request.POST.get(f'lta_allowed_value_{index+1}', '')
                    lta_remark = request.POST.get(f'lta_remark_{index+1}', '')
                
                    lta_allowed_value = int(lta_allowed_value)

                    i.AppAmt = lta_allowed_value
                    i.remarks = lta_remark
                    i.save()

            if driver_tb:
                for index, i in enumerate(driver_tb):            
                    driver_allowed_value = request.POST.get(f'driver_allowed_value_{index+1}', '')
                    driver_remark = request.POST.get(f'driver_remark_{index+1}', '')
                
                    driver_allowed_value = int(driver_allowed_value)

                    i.AppAmt = driver_allowed_value
                    i.remarks = driver_remark
                    i.save()
            
        else:
            if fuel_tb:
                for index, i in enumerate(fuel_tb):                                                
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()
            if road_tb:
                for index, i in enumerate(road_tb):            
                    
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()
                
            if lta_tb:
                for index, i in enumerate(lta_tb):                                

                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()

            if driver_tb:
                for index, i in enumerate(driver_tb):            
                   
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()


        emp_data.Status = Status
        emp_data.Remarks = customRemarks
        emp_data.verL2Date = timezone.now() + timedelta(hours=5, minutes=30)
        emp_data.verL2User = data.user_id
        emp_data.save()


        mail_master_tb = tblClaimeMaster.objects.get(ClaimNo=claim_no)

        try:
            mail_fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)              
        except:
            mail_fuel_tb = None            
        
        try:
            mail_road_tb = tblRoad.objects.filter(ClaimNo=claim_no)               
        except:
            mail_road_tb = None            
        
        try:
            mail_lta_tb = tblLTA.objects.filter(ClaimNo=claim_no)             
        except:
            mail_lta_tb = None            

        try:
            mail_driver_tb = Drive.objects.filter(ClaimNo=claim_no)              
        except:
            mail_driver_tb = None 

        total_fuel = 0
        total_road = 0
        total_lta = 0
        total_driver = 0

        

        if Status == 'Reject':
            total_fuel = 0
            total_road = 0
            total_lta = 0
            total_driver = 0
        else:
            if mail_fuel_tb:
                for i in mail_fuel_tb:
                    total_fuel = total_fuel + i.AppAmt
            if mail_road_tb:
                for i in mail_road_tb:
                    total_road = total_road + i.AppAmt
            if mail_lta_tb:
                for i in mail_lta_tb:
                    total_lta = total_lta + i.AppAmt
            if mail_driver_tb:
                for i in mail_driver_tb:
                    total_driver = total_driver + i.AppAmt

        total_approved = total_fuel + total_road + total_lta + total_driver

        data_1 = EmployeeDetail.objects.get(empid=mail_master_tb.empid)

        if Status == 'Approved' and total_cliamed > total_approved:
            manual_status = 'Partially Approved'
        else:
            manual_status = mail_master_tb.Status

        context = {
        'mail_master_tb':mail_master_tb,
        'mail_fuel_tb':mail_fuel_tb, 'mail_road_tb':mail_road_tb,
        'mail_lta_tb':mail_lta_tb, 'mail_driver_tb':mail_driver_tb,
        'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver,
        'total_cliamed':total_cliamed, 'total_approved':total_approved, 'manual_status':manual_status  
        }

        # rendered_html = render_to_string('it_proof_sub_mail.html', context)
        rendered_html = render_to_string('va_templates/fbp_checker_mail.html', context)
        result = BytesIO()
            
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        email_body = f'''
            <p>Dear {data_1.empname} ({data_1.empid}),</p>
            <p>Thanks for submitting Claim details.</p>

            <ul style="color: red;">
                <li>Please do not reply to this e-mail. This mail id is not monitored.</li>
                <li>Please do not send soft copies of proofs to us by email OR hard copies through post or courier.</li>
                <li>*Note: Please note that Kitty concept has been discontinued in {data_1.Company_Name} effective April 2019. Hence there will be no separate deduction or reimbursement for approved amount of FBP claims.</li>
                <li>You will see a tax exemption directly in your Monthly payslip under Other Exemptions section in the upcoming payroll of the approved FBP claim amount.</li>
            </ul>
            <p>Below is the details of your Verified Claims.</p>
            <h4>Status: <strong>{manual_status}</strong> </h4>             
            '''
        
        if mail_master_tb.Remarks:
            email_body += f'''
            <p>Remarks:<p style="color: red;"> {mail_master_tb.Remarks} </p></p>
            '''

        pdf_filename = f"{data_1.empid}.pdf"
        if not pdf.err:
            email = EmailMessage(
                subject='FBP Claim Verification',
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[data_1.empemail],
            )
            email.content_subtype = 'html'
            email.attach(pdf_filename, result.getvalue(), 'application/pdf')
            email.send(fail_silently=False)

        else:
            print("Error during PDF generation:", pdf.err)

        message = 'submitted successfully.'
        return render(request, 'va_templates/fbp_checker_verify.html', {'data': data, 'message': message})    

def fbp_checker_onhold(request, claim_no):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)
    emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

    emp_id = emp_data.empid
    
    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_id)
        Car_dec_last = Car_dec.last()
        if Car_dec_last.clc:
            remaining_fuel = int(36000);
        elif Car_dec_last.own_car:
            if Car_dec_last.cc == 'More than 1600 CC':
                remaining_fuel = int(28800);
            else:
                remaining_fuel = int(21600);
        else:
            remaining_fuel = None
    except:
        Car_dec = None
        Car_dec_last = None
        remaining_fuel = None
    
    try:
        tbl_claim = tblClaimeMaster.objects.filter(empid = emp_id, Status = 'Approved').exclude(verL2Date=None)        
    except:
        tbl_claim = None
        
    if remaining_fuel:
        if tbl_claim:
            for i in tbl_claim:
                try:
                    app_fuel = tblFuel.objects.filter(empid = emp_id, ClaimNo = i.ClaimNo)
                    for j in app_fuel:
                        remaining_fuel = int(remaining_fuel) - int(j.AppAmt)      
                except:
                    app_fuel = None


    save_number_new = None

    try:
        fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)  
        fuel_tb_1 = [(index + 1, file) for index, file in enumerate(fuel_tb)]      
        fuel_tb_last = fuel_tb.last()         
    except:
        fuel_tb = None
        fuel_tb_1 = None 
        fuel_tb_last = None 

    
    if fuel_tb_last:
        save_number_new = fuel_tb_last.save_number      
    
    try:
        road_tb = tblRoad.objects.filter(ClaimNo=claim_no)   
        road_tb_1 = [(index + 1, file) for index, file in enumerate(road_tb)]   
        road_tb_last = road_tb.last()     
    except:
        road_tb = None
        road_tb_1 = None
        road_tb_last = None 

    if road_tb_last:
        save_number_new = road_tb_last.save_number  
    
    try:
        lta_tb = tblLTA.objects.filter(ClaimNo=claim_no) 
        lta_tb_1 = [(index + 1, file) for index, file in enumerate(lta_tb)]
        lta_tb_last = lta_tb.last()          
    except:
        lta_tb = None
        lta_tb_1 = None
        lta_tb_last = None 

    if lta_tb_last:
        save_number_new = lta_tb_last.save_number  


    try:
        driver_tb = Drive.objects.filter(ClaimNo=claim_no)  
        driver_tb_1 = [(index + 1, file) for index, file in enumerate(driver_tb)]  
        driver_tb_last = driver_tb.last()       
    except:
        driver_tb = None
        driver_tb_1 = None  
        driver_tb_last = None 

    if driver_tb_last:
        save_number_new = driver_tb_last.save_number  


    empl_no = emp_data.empid

    try:
        fbp_files = fbp_claim_file.objects.filter(empid = empl_no)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(fbp_files)]
    except:
        fbp_files = None
        enumerated_filenames = None
    
    if save_number_new:
        try:
            dec_files = fbp_claim_file.objects.filter(empid = empl_no, save_number = save_number_new)
        except:
            dec_files = None 

    

    return render(request, 'va_templates/fbp_checker_onhold.html', {'data':data, 'emp_data':emp_data, 'fbp_files':fbp_files, 'enumerated_filenames':enumerated_filenames,
                                                                'fuel_tb':fuel_tb, 'road_tb':road_tb, 'lta_tb':lta_tb, 'driver_tb':driver_tb, 'remaining_fuel':remaining_fuel,
                                                                'fuel_tb_1':fuel_tb_1, 'road_tb_1':road_tb_1, 'lta_tb_1':lta_tb_1, 'driver_tb_1':driver_tb_1, 'dec_files':dec_files})



def fbp_resub_emp(request):
    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)

    all_verifier = CustomUser.objects.all()

    user_id = data.user_id
    control_num_st = data.control_num_st
    control_num_end = data.control_num_end

    try:
        hold_emp_data = tblClaimeMaster.objects.filter(ver2date=None, Status = 'On Hold',  id__gte=control_num_st, id__lte=control_num_end).exclude(Q(verL1Date=None) | Q(verL2Date=None) | Q(Sub2date=None))
        hold_emp_data_1 = []
        for index, file in enumerate(hold_emp_data):
            days_diff = (date.today() - file.SubDate.date()).days
            hold_emp_data_1.append((index + 1, file, days_diff))
    except tblClaimeMaster.DoesNotExist:
        hold_emp_data = None
        hold_emp_data_1 = None
    
    if request.method == 'POST':
        cNum = request.POST.get('cNum')
        claimNo = request.POST.get('claimNo')

        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')

        if fromDate:            
            fromDate = datetime.strptime(fromDate, "%Y-%m-%d")
        else:            
            fromDate = None
        
        if toDate:            
            toDate = datetime.strptime(toDate, "%Y-%m-%d")
        else:            
            toDate = None


        if cNum:
            try:             
                emp_data = tblClaimeMaster.objects.filter(empid=cNum, ver2date = None, Status = 'On Hold',  id__gte=control_num_st, id__lte=control_num_end).exclude(Q(verL1Date=None) | Q(verL2Date=None) | Q(Sub2date=None))
                                                                                                                                                
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'message': message, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
            return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'emp_data': emp_data, 'emp_data_1': emp_data_1, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
        elif claimNo:
            try:                
                emp_data = tblClaimeMaster.objects.filter(ClaimNo=claimNo, ver2date = None, Status = 'On Hold',  id__gte=control_num_st, id__lte=control_num_end).exclude(Q(verL1Date=None) | Q(verL2Date=None) | Q(Sub2date=None))
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'message': message, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
            return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'emp_data': emp_data, 'emp_data_1': emp_data_1, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
        
        elif fromDate and toDate:
            try:
                emp_data = tblClaimeMaster.objects.filter(SubDate__date__gte=fromDate, Status = 'On Hold',  SubDate__date__lte=toDate, ver2date = None, id__gte=control_num_st, id__lte=control_num_end).exclude(Q(verL1Date=None) | Q(verL2Date=None) | Q(Sub2date=None))
                emp_data_1 = []
                for index, file in enumerate(emp_data):
                    days_diff = (date.today() - file.SubDate.date()).days
                    emp_data_1.append((index + 1, file, days_diff))
            except tblClaimeMaster.DoesNotExist:
                emp_data = None
                emp_data_1 = None

            if not emp_data:
                message = 'No Records Found'
                return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'message': message, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})
            
            return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'emp_data': emp_data, 'emp_data_1': emp_data_1, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})

    return render(request, 'va_templates/fbp_resubDashboard.html', {'data': data, 'all_verifier':all_verifier, 'hold_emp_data':hold_emp_data, 'hold_emp_data_1':hold_emp_data_1})

def fbp_resub_verify(request, claim_no):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)
    emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

    emp_id = emp_data.empid
    
    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_id)
        Car_dec_last = Car_dec.last()
        if Car_dec_last.clc:
            remaining_fuel = int(36000);
        elif Car_dec_last.own_car:
            if Car_dec_last.cc == 'More than 1600 CC':
                remaining_fuel = int(28800);
            else:
                remaining_fuel = int(21600);
        else:
            remaining_fuel = None
    except:
        Car_dec = None
        Car_dec_last = None
        remaining_fuel = None
    
    try:
        tbl_claim = tblClaimeMaster.objects.filter(empid = emp_id, Status = 'Approved').exclude(verL2Date=None)        
    except:
        tbl_claim = None
        
    if remaining_fuel:
        if tbl_claim:
            for i in tbl_claim:
                try:
                    app_fuel = tblFuel.objects.filter(empid = emp_id, ClaimNo = i.ClaimNo)
                    for j in app_fuel:
                        remaining_fuel = int(remaining_fuel) - int(j.AppAmt)      
                except:
                    app_fuel = None


    save_number_new = None


    try:
        fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)  
        fuel_tb_1 = [(index + 1, file) for index, file in enumerate(fuel_tb)]
        fuel_tb_last = fuel_tb.last()               
    except:
        fuel_tb = None
        fuel_tb_1 = None    
        fuel_tb_last = None 

    if fuel_tb_last:
        save_number_new = fuel_tb_last.save_number      
    
    try:
        road_tb = tblRoad.objects.filter(ClaimNo=claim_no)   
        road_tb_1 = [(index + 1, file) for index, file in enumerate(road_tb)]     
        road_tb_last = road_tb.last()  
    except:
        road_tb = None
        road_tb_1 = None
        road_tb_last = None 
    
    if road_tb_last:
        save_number_new = road_tb_last.save_number
    
    try:
        lta_tb = tblLTA.objects.filter(ClaimNo=claim_no) 
        lta_tb_1 = [(index + 1, file) for index, file in enumerate(lta_tb)] 
        lta_tb_last = lta_tb.last()        
    except:
        lta_tb = None
        lta_tb_1 = None
        lta_tb_last = None 
    
    if lta_tb_last:
        save_number_new = lta_tb_last.save_number

    try:
        driver_tb = Drive.objects.filter(ClaimNo=claim_no)  
        driver_tb_1 = [(index + 1, file) for index, file in enumerate(driver_tb)]     
        driver_tb_last = driver_tb.last()   
    except:
        driver_tb = None
        driver_tb_1 = None 
        driver_tb_last = None  

    if driver_tb_last:
        save_number_new = driver_tb_last.save_number      
    
      

    empl_no = emp_data.empid

    try:
        fbp_files = fbp_claim_file.objects.filter(empid = empl_no)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(fbp_files)]
    except:
        fbp_files = None
        enumerated_filenames = None
    
    if save_number_new:
        try:
            dec_files = fbp_claim_file.objects.filter(empid = empl_no, save_number = save_number_new)
        except:
            dec_files = None  
    
    try:
        fbp_files_rs = fbp_claim_file.objects.filter(empid = empl_no, ClaimNo = claim_no)
        enumerated_filenames_rs = [(index + 1, file) for index, file in enumerate(fbp_files_rs)]
    except:
        fbp_files_rs = None
        enumerated_filenames_rs = None

    

    return render(request, 'va_templates/fbp_resub_verify.html', {'data':data, 'emp_data':emp_data, 'fbp_files':fbp_files, 'enumerated_filenames':enumerated_filenames,
                                                                'fuel_tb':fuel_tb, 'road_tb':road_tb, 'lta_tb':lta_tb, 'driver_tb':driver_tb, 'remaining_fuel':remaining_fuel,
                                                                'fuel_tb_1':fuel_tb_1, 'road_tb_1':road_tb_1, 'lta_tb_1':lta_tb_1, 'driver_tb_1':driver_tb_1,
                                                                'fbp_files_rs':fbp_files_rs, 'enumerated_filenames_rs':enumerated_filenames_rs, 'dec_files':dec_files})

def fbp_resub_submit(request):

    username = request.session.get('username', None)
    if not username:
        return redirect('user_login')

    data = CustomUser.objects.get(username=username)    

    if request.method == 'POST':

        claim_no = request.POST.get('claim_no')

        emp_data = tblClaimeMaster.objects.get(ClaimNo=claim_no)

        t_fuel = 0
        t_road = 0
        t_lta = 0
        t_driver = 0

        try:
            fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)  
            for i in fuel_tb:
                t_fuel = t_fuel + i.AmtClaimed              
        except:
            fuel_tb = None            
        
        try:
            road_tb = tblRoad.objects.filter(ClaimNo=claim_no)  
            for i in road_tb:
                t_road = t_road + i.AmtClaimed               
        except:
            road_tb = None            
        
        try:
            lta_tb = tblLTA.objects.filter(ClaimNo=claim_no)   
            for i in lta_tb:
                t_lta = t_lta + i.AmtClaimed            
        except:
            lta_tb = None            

        try:
            driver_tb = Drive.objects.filter(ClaimNo=claim_no) 
            for i in driver_tb:
                t_driver = t_driver + i.DriveSal               
        except:
            driver_tb = None        

        total_cliamed = t_fuel + t_road + t_lta + t_driver

        customRemarks = request.POST.get('customRemarks', '')
        Status = request.POST.get('Status', '')   
        
        if Status != 'Reject':

            if fuel_tb:
                for index, i in enumerate(fuel_tb):            
                    fuel_allowed_value = request.POST.get(f'fuel_allowed_value_{index+1}', '')
                    fuel_remark = request.POST.get(f'fuel_remark_{index+1}', '')
                
                    fuel_allowed_value = int(fuel_allowed_value)

                    i.AppAmt = fuel_allowed_value
                    i.remarks = fuel_remark
                    i.save()
            
            if road_tb:
                for index, i in enumerate(road_tb):            
                    road_allowed_value = request.POST.get(f'road_allowed_value_{index+1}', '')
                    road_remark = request.POST.get(f'road_remark_{index+1}', '')
                
                    road_allowed_value = int(road_allowed_value)

                    i.AppAmt = road_allowed_value
                    i.remarks = road_remark
                    i.save()
                
            if lta_tb:
                for index, i in enumerate(lta_tb):            
                    lta_allowed_value = request.POST.get(f'lta_allowed_value_{index+1}', '')
                    lta_remark = request.POST.get(f'lta_remark_{index+1}', '')
                
                    lta_allowed_value = int(lta_allowed_value)

                    i.AppAmt = lta_allowed_value
                    i.remarks = lta_remark
                    i.save()

            if driver_tb:
                for index, i in enumerate(driver_tb):            
                    driver_allowed_value = request.POST.get(f'driver_allowed_value_{index+1}', '')
                    driver_remark = request.POST.get(f'driver_remark_{index+1}', '')
                
                    driver_allowed_value = int(driver_allowed_value)

                    i.AppAmt = driver_allowed_value
                    i.remarks = driver_remark
                    i.save()

        else:
            if fuel_tb:
                for index, i in enumerate(fuel_tb):                                                
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()
            if road_tb:
                for index, i in enumerate(road_tb):            
                    
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()
                
            if lta_tb:
                for index, i in enumerate(lta_tb):                                

                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()

            if driver_tb:
                for index, i in enumerate(driver_tb):            
                   
                    i.AppAmt = int(0)
                    i.remarks = None
                    i.save()

            

        emp_data.Status = Status
        emp_data.Remarks = customRemarks
        emp_data.ver2date = timezone.now() + timedelta(hours=5, minutes=30)
        emp_data.ver2user = data.user_id
        emp_data.save()

        mail_master_tb = tblClaimeMaster.objects.get(ClaimNo=claim_no)

        try:
            mail_fuel_tb = tblFuel.objects.filter(ClaimNo=claim_no)              
        except:
            mail_fuel_tb = None            
        
        try:
            mail_road_tb = tblRoad.objects.filter(ClaimNo=claim_no)               
        except:
            mail_road_tb = None            
        
        try:
            mail_lta_tb = tblLTA.objects.filter(ClaimNo=claim_no)             
        except:
            mail_lta_tb = None            

        try:
            mail_driver_tb = Drive.objects.filter(ClaimNo=claim_no)              
        except:
            mail_driver_tb = None 

        total_fuel = 0
        total_road = 0
        total_lta = 0
        total_driver = 0
    
        if Status == 'Reject':
            total_fuel = 0
            total_road = 0
            total_lta = 0
            total_driver = 0
        else:
            if mail_fuel_tb:
                for i in mail_fuel_tb:
                    total_fuel = total_fuel + i.AppAmt
            if mail_road_tb:
                for i in mail_road_tb:
                    total_road = total_road + i.AppAmt
            if mail_lta_tb:
                for i in mail_lta_tb:
                    total_lta = total_lta + i.AppAmt
            if mail_driver_tb:
                for i in mail_driver_tb:
                    total_driver = total_driver + i.AppAmt

        total_approved = total_fuel + total_road + total_lta + total_driver

        data_1 = EmployeeDetail.objects.get(empid=mail_master_tb.empid)

        if Status == 'Approved' and total_cliamed > total_approved:
            manual_status = 'Partially Approved'
        else:
            manual_status = mail_master_tb.Status

        context = {
        'mail_master_tb':mail_master_tb,
        'mail_fuel_tb':mail_fuel_tb, 'mail_road_tb':mail_road_tb,
        'mail_lta_tb':mail_lta_tb, 'mail_driver_tb':mail_driver_tb,
        'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver,
        'total_cliamed':total_cliamed, 'total_approved':total_approved, 'manual_status':manual_status      
        }

        # rendered_html = render_to_string('it_proof_sub_mail.html', context)
        rendered_html = render_to_string('va_templates/fbp_checker_mail.html', context)
        result = BytesIO()
            
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        email_body = f'''
            <p>Dear {data_1.empname} ({data_1.empid}),</p>
            <p>Thanks for submitting Claim details.</p>

            <ul style="color: red;">
                <li>Please do not reply to this e-mail. This mail id is not monitored.</li>
                <li>Please do not send soft copies of proofs to us by email OR hard copies through post or courier.</li>
                <li>*Note: Please note that Kitty concept has been discontinued in {data_1.Company_Name} effective April 2019. Hence there will be no separate deduction or reimbursement for approved amount of FBP claims.</li>
                <li>You will see a tax exemption directly in your Monthly payslip under Other Exemptions section in the upcoming payroll of the approved FBP claim amount.</li>
            </ul>

            <p>Below is the details of your Verified Claims.</p>
            <h4>Status: <strong>{manual_status}</strong></h4>             
            '''
    
        if mail_master_tb.Remarks:
            email_body += f'''
            <p>Remarks:<p style="color: red;"> {mail_master_tb.Remarks} </p></p>
            '''        
        pdf_filename = f"{data_1.empid}.pdf"
        if not pdf.err:
            email = EmailMessage(
                subject='FBP Claim Verification',
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[data_1.empemail],
            )
            email.content_subtype = 'html'
            email.attach(pdf_filename, result.getvalue(), 'application/pdf')
            email.send(fail_silently=False)

        else:
            print("Error during PDF generation:", pdf.err)

        message = 'submitted successfully.'
        return render(request, 'va_templates/fbp_resub_verify.html', {'data': data, 'message': message})    



                              
          