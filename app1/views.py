
from django.shortcuts import render, HttpResponse, redirect
from .models import *
from app2.models import *
from django.core.mail import send_mail
from smtplib import SMTPException
from django.conf import settings
from datetime import datetime, date
from django.utils import timezone
from datetime import timedelta
from django.shortcuts import get_object_or_404
from django.contrib import messages

from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from io import BytesIO
from django.core.mail import EmailMessage
from reportlab.lib.styles import getSampleStyleSheet
from jinja2 import Environment, FileSystemLoader


from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent

from django.template.loader import render_to_string
from xhtml2pdf import pisa
from dateutil.relativedelta import relativedelta
from django.core.files.storage import FileSystemStorage
from django.templatetags.static import static
import os
import random
import string
from django.db.models import Q

from django.utils.html import mark_safe


def split_word(word):
    return mark_safe(word.replace(",", ",<br>"))

def calculate_financial_year(current_date):
    current_year = current_date.year
    current_month = current_date.month

    if current_month >= 4:
        financial_year_start = date(current_year, 4, 1)
        financial_year_end = date(current_year + 1, 3, 31)
    else:
        financial_year_start = date(current_year - 1, 4, 1)
        financial_year_end = date(current_year, 3, 31)

    return financial_year_start, financial_year_end



def Emp_login(request):
    # Retrieve the username from the session
    emp_user = request.session.get('emp_user', None)
    if emp_user:
        if EmployeeDetail.objects.filter(empid=emp_user).exists():
            # Assuming 'Emppage' is the name of the URL pattern for the employee page
            return redirect('Emppage')

    try:
        # Use get method with a default value to avoid MultiValueDictKeyError
        empid = request.GET.get('username', None)

        if empid is None:
            return HttpResponse('No user logged in')

        try:
            emp_user = EmployeeDetail.objects.get(empid=empid)
        except EmployeeDetail.DoesNotExist:
            return HttpResponse(f"You are not authorized: {empid}")

        # Assuming 'Emppage' is the name of the URL pattern for the employee page
        request.session['emp_user'] = empid
        return redirect('Emppage')

    except Exception as e:
        # Handle other exceptions if needed
        return HttpResponse(f"Error: {str(e)}")


from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def Emp_logout(request):
    emp_user = request.session.get('emp_user', None)
    if not emp_user:
        return HttpResponse('No User logged in')
    if emp_user:
        request.session.clear()
        response = HttpResponse('No User logged in')        
        if 'currentForm' in request.COOKIES:            
            response.delete_cookie('currentForm')    
        return response    


    

def Emppage(request):
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    return render(request, 'Emppage.html', {'data': data, 'data1': data1})

#currentForm

def Tax_Regime(request):
    success_message = ''
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    

    if request.method == 'POST':
        # Handle form submission
        tax_regime = request.POST.get('taxRegime')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')

        Claim_no = f'R{data.empid}{formatted_save_ts}'

        TaxRegime.objects.create(empid=emp_user,
                                 Regime=tax_regime,
                                 TSSave=save_ts,
                                 TSSubmit=save_ts,
                                 Claimno = Claim_no )

        send_mail(
            subject='Tax Regime',
            message=f"You have created a Tax Regime with {tax_regime} Regime",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[data.empemail],
            fail_silently=False,
            auth_user=settings.EMAIL_HOST_USER,
            auth_password=settings.EMAIL_HOST_PASSWORD,
        )

        # Redirect to a success page or any other appropriate view
        success_message = "Regime updated successfully"

        # Delete the 'currentForm' cookie if it exists
        if 'currentForm' in request.COOKIES:
            response = render(request, 'Tax_Regime.html', {'data': data, 'data1': data1, 'success_message': success_message})
            response.delete_cookie('currentForm')
            return response

    return render(request, 'Tax_Regime.html', {'data': data, 'data1': data1, 'success_message': success_message})


def formpage(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    return render(request, 'form16.html', {'data': data})


def ITDeclarations(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    bandlist1 = ['07', '7', '7B', '08', '8',
                 '09', '9', '10', 'A', 'B', 'C', 'D']

    bandlist2 = ['08', '8', '09', '9', '10', 'A', 'B', 'C', 'D']

    band = data.Band

    lendername = LoanlendersDetails.objects.all()

    illnesses = illnesstypes.objects.all()

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    Temp_CarDeclaration1 = Temp_CarDeclaration.objects.filter(empid=emp_user)
    if Temp_CarDeclaration1:
        tempcar = Temp_CarDeclaration1.last()
    else:
        tempcar = None

    CarDeclaration1 = CarDeclaration.objects.filter(empid=emp_user)
    if CarDeclaration1:
        prevcar = CarDeclaration1.last()
    else:
        prevcar = None

    Temp_HRA1 = Temp_HRA.objects.filter(empid=emp_user)
    if Temp_HRA1:
        temphra = Temp_HRA1.last()
    else:
        temphra = None

    Temp_Income1 = Temp_Income.objects.filter(empid=emp_user)
    if Temp_Income1:
        tempincom = Temp_Income1.last()
    else:
        tempincom = None

    Temp_80Other1 = Temp_80Other.objects.filter(empid=emp_user)
    if Temp_80Other1:
        temp80other = Temp_80Other1.last()
    else:
        temp80other = None

    Temp_80DDed1 = Temp_80DDed.objects.filter(empid=emp_user)
    if Temp_80DDed1:
        temp80d = Temp_80DDed1.last()
    else:
        temp80d = None

    Temp_Prev1 = Temp_Prev.objects.filter(empid=emp_user)
    if Temp_Prev1:
        tempprev = Temp_Prev1.last()
    else:
        tempprev = None

    

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        prevtax = TaxDeclaration1.last()
    else:
        prevtax = None
    

    current_date = date.today()

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

    emp_doj = data.empdoj

    if emp_doj > financial_year_start:
        doj_ = True
    elif emp_doj <= financial_year_start:
        doj_ = False

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'tempcar': tempcar, 'doj_':doj_, 'emp_doj':emp_doj,
                                                   'prevcar': prevcar, 'temphra': temphra, 'tempincom': tempincom,
                                                   'temp80other': temp80other, 'temp80d': temp80d,
                                                   'tempprev': tempprev,  'prevtax': prevtax,
                                                   'bandlist1': bandlist1, 'bandlist2': bandlist2, 'band': band,
                                                   'lendername': lendername, 'illnesses':illnesses,
                                                   'financial_year_start':financial_year_start, 'financial_year_end':financial_year_end})


def temp_carDeclarations(request):
    success_message = ""

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    Temp_CarDeclaration1 = Temp_CarDeclaration.objects.filter(empid=emp_user)
    if Temp_CarDeclaration1:
        tempcar = Temp_CarDeclaration1.last()
    else:
        tempcar = None

    CarDeclaration1 = CarDeclaration.objects.filter(empid=emp_user)
    if CarDeclaration1:
        prevcar = CarDeclaration1.last()
    else:
        prevcar = None

    if request.method == 'POST':
        havecar = request.POST.get('havecar')
        owncar = request.POST.get('owncar', None)
        enginecp = request.POST.get('enginecp', None)
        carregdate = request.POST.get('carreg_ts', None)
        carregnum = request.POST.get('carregnum', None)
        havedriver = request.POST.get('havedriver', None)

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if carregdate:
            # Check if the date input is not empty
            carregdate = datetime.strptime(carregdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            carregdate = None

        own_car_value = None
        cls_new = False
        have_car_new = False

        if havecar:
            if havecar == 'CLC':
                cls_new = True
                have_car_new = False
                own_car_value = None
            else: 
                have_car_new = True
                cls_new = False
                if owncar == 'Yes':
                    own_car_value = True
                elif owncar == 'No':
                    own_car_value = False

        if tempcar:
            # Update the existing record with new values if provided
            if havecar:
                if havecar == 'CLC':
                    tempcar.clc = True
                    tempcar.have_car = False
                    tempcar.own_car = own_car_value
                    if enginecp:
                        tempcar.cc = enginecp
                    if carregdate:
                        tempcar.carregdt = carregdate
                    if carregnum:
                        tempcar.registration = carregnum
                    if havedriver:
                        tempcar.no_driver = havedriver 
                else: 
                    tempcar.have_car = True
                    tempcar.clc = False
                    if owncar:
                        tempcar.own_car = own_car_value
                        if own_car_value == True:
                            if enginecp:
                                tempcar.cc = enginecp
                            if carregdate:
                                tempcar.carregdt = carregdate
                            if carregnum:
                                tempcar.registration = carregnum
                            if havedriver:
                                tempcar.no_driver = havedriver

                        else:
                            tempcar.cc =None
                            tempcar.carregdt =None
                            tempcar.registration =None
                            tempcar.no_driver =None           

            tempcar.timestamp = save_ts

            tempcar.save()
            success_message = "Data updated successfully"
        else:
            # Create a new record
            car_declaration = Temp_CarDeclaration(
                empid=emp_user,
                clc=cls_new,
                have_car=have_car_new,                        
                own_car=own_car_value,
                cc=enginecp,
                carregdt=carregdate,
                registration=carregnum,
                no_driver=havedriver,
                timestamp=save_ts,
            )
            car_declaration.save()
            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'tempcar': tempcar,
                                                   'prevcar': prevcar, 'success_message': success_message})


def del_temp_carDeclarations(request, empid):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    Temp_CarDeclaration1 = Temp_CarDeclaration.objects.filter(empid=empid)
    tempcar = Temp_CarDeclaration1.last()
   
    tempcar.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})


def car_declarations_submit(request):
    success_message = ""

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    bandlist1 = ['07', '7', '7B', '08', '8',
                 '09', '9', '10', 'A', 'B', 'C', 'D']

    bandlist2 = ['08', '8', '09', '9', '10', 'A', 'B', 'C', 'D']

    band = data.Band

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    Temp_CarDeclaration1 = Temp_CarDeclaration.objects.filter(empid=emp_user)
    if Temp_CarDeclaration1:
        tempcar = Temp_CarDeclaration1.last()
    else:
        tempcar = None

    CarDeclaration1 = CarDeclaration.objects.filter(empid=emp_user)
    if CarDeclaration1:
        prevcar = CarDeclaration1.last()
    else:
        prevcar = None

    if request.method == 'POST':
        havecar = request.POST.get('havecar')
        owncar = request.POST.get('owncar', None)
        enginecp = request.POST.get('enginecp', None)
        carregdate = request.POST.get('carreg_ts', None)
        carregnum = request.POST.get('carregnum', None)
        havedriver = request.POST.get('havedriver', None)

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if carregdate:
            # Check if the date input is not empty
            carregdate = datetime.strptime(carregdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            carregdate = None

        own_car_value = None
        cls_new = False
        have_car_new = False

        if havecar:
            if havecar == 'CLC':
                cls_new = True
                have_car_new = False
                own_car_value = None
            else: 
                have_car_new = True
                cls_new = False
                if owncar == 'Yes':
                    own_car_value = True
                elif owncar == 'No':
                    own_car_value = False

        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')

        Declaration_No = f'C{data.empid}{formatted_save_ts}'

        # Create a new record
        car_declaration = CarDeclaration(
            empid=emp_user,
            clc=cls_new,
            have_car=have_car_new,                        
            own_car=own_car_value,
            cc=enginecp,
            carregdt=carregdate,
            registration=carregnum,
            no_driver=havedriver,
            timestamp=save_ts,
            DeclarationNo = Declaration_No
        )
        car_declaration.save()

        context = {
                'empname': data.empname,
                'empid': data.empid,

                'bandlist1': bandlist1, 
                'bandlist2': bandlist2, 
                'band': band,

                'havecar': havecar,
                'owncar': owncar,
                'enginecp': enginecp,
                'carregdate': carregdate,
                'carregnum': carregnum,
                'havedriver': havedriver
        }

        rendered_html = render_to_string('table_car_pdf.html', context)
        result = BytesIO()
            
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
        pdf_filename = f"{data.empid}.pdf"
        
        email_body = f'''
        <p>Dear <strong>{data.empname} ({data.empid})</strong>,</p>
        <p>Thanks for submitting the Declaration</p>
        
        <p>Below are the details of your submission.</p>
        <p>Thanks & Regards</p>
        <p><strong>FBP Team</strong></p>
        '''

        if not pdf.err:
            email = EmailMessage(
                subject='Car Declaration update',
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[data.empemail],
            )
            email.content_subtype = 'html'
            email.attach(pdf_filename, result.getvalue(), 'application/pdf')
            email.send(fail_silently=False)
        else:
            print("Error during PDF generation:", pdf.err)


        if tempcar:
            tempcar.delete()
        success_message = "Data submitted successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'tempcar': tempcar,
                                                   'prevcar': prevcar, 'success_message': success_message, 'bandlist1': bandlist1, 'bandlist2': bandlist2, 'band': band,})





def temp_houserent(request):
    success_message = ""
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        prevtax = TaxDeclaration1.last()
    else:
        prevtax = None

    Temp_HRA1 = Temp_HRA.objects.filter(empid=emp_user)
    if Temp_HRA1:
        temphra = Temp_HRA1.last()
    else:
        temphra = None
    

    if request.method == 'POST':
        pannum = request.POST.get('pannum')
        startdate = request.POST.get('startdate')
        rent = request.POST.get('rent')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        citytype = request.POST.get('citytype')
        Paddress = request.POST.get('Paddress')
        Taddress = request.POST.get('Taddress')
        pincode = request.POST.get('pincode')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if startdate:
            # Check if the date input is not empty
            startdate = datetime.strptime(startdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            startdate = None

        # Convert empty strings to None for fields that should accept null
        rent = int(rent) if rent else int(0)
        contact = int(contact) if contact else int(0)
        pincode = int(pincode) if pincode else int(0)

        pannum_upper = ''

        if pannum:
            pannum_upper = ''.join(char.upper() if char.isalpha() else char for char in pannum)

        if temphra:
            # Update the existing record with new values if provided
            
            if pannum:
                temphra.d_landlordspannum = pannum_upper
            if startdate:
                temphra.d_houserentstartdt = startdate
            if rent:
                temphra.d_rentpermonth = rent
            if name:
                temphra.d_landlordsname = name
            if contact:
                temphra.d_landlordscontact = contact
            if citytype:
                temphra.d_citytype = citytype
            if Paddress:
                temphra.d_landlordsaddress = Paddress
            if Taddress:
                temphra.d_rentaddress = Taddress
            if pincode:
                temphra.d_pincode = pincode
            temphra.empname = data.empname
            temphra.saveddate = save_ts

            temphra.save()

            success_message = "Data updated successfully"
        else:
            temp_houserentDB_new = Temp_HRA(
                empid=emp_user,
                empname = data.empname,
                d_landlordspannum=pannum_upper,
                d_houserentstartdt=startdate,
                d_rentpermonth=rent,
                d_landlordsname=name,
                d_landlordscontact=contact,
                d_citytype=citytype,
                d_landlordsaddress=Paddress,
                d_rentaddress=Taddress,
                d_pincode=pincode,
                saveddate=save_ts

            )
            temp_houserentDB_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'temphra': temphra,
                                                   'prevtax': prevtax, 'success_message': success_message})

def del_temp_houserent(request, empid):

    Temp_HRA1 = Temp_HRA.objects.filter(empid=empid)
    temphra = Temp_HRA1.last()
    temphra.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})



def temp_incomeLoss(request):
    success_message = ""
    
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        prevtax = TaxDeclaration1.last()
    else:
        prevtax = None

    Temp_Income1 = Temp_Income.objects.filter(empid=emp_user)
    if Temp_Income1:
        tempincom = Temp_Income1.last()
    else:
        tempincom = None

    
    if request.method == 'POST':

        self_loan_dt = request.POST.get('self_loan_dt')
        selfloan = request.POST.get('selfloan')
        lendername1 = request.POST.get('lendername1')
        lenderpan1 = request.POST.get('lenderpan1')
        
        otherlendername1 = request.POST.get('otherlendername1')
        otherlenderpan1 = request.POST.get('otherlenderpan1')

        annualvalue = request.POST.get('annualvalue')
        municipaltax = request.POST.get('municipaltax')
        Homeinterest = request.POST.get('Homeinterest')
        incomeloss = request.POST.get('incomeloss')
        standerdded = request.POST.get('standerdded')
        lendername2 = request.POST.get('lendername2')
        lenderpan2 = request.POST.get('lenderpan2')

        otherlendername2 = request.POST.get('otherlendername2')
        otherlenderpan2 = request.POST.get('otherlenderpan2')

        sanctiondate3 = request.POST.get('sanctiondate3')
        loanammount = request.POST.get('loanammount')
        propertyvalue3 = request.POST.get('propertyvalue3')
        hlinterest = request.POST.get('hlinterest')
        lendername3 = request.POST.get('lendername3')
        lenderpan3 = request.POST.get('lenderpan3')

        otherlendername3 = request.POST.get('otherlendername3')
        otherlenderpan3 = request.POST.get('otherlenderpan3')

        sanctiondate4 = request.POST.get('sanctiondate4')
        havehouseproperty = request.POST.get('havehouseproperty')
        propertyvalue4 = request.POST.get('propertyvalue4')
        Eligibility = request.POST.get('Eligibility')
        otherincome = request.POST.get('otherincome')
        savinginterest = request.POST.get('savinginterest')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        # Convert empty strings to None for fields that should accept null
        selfloan = int(selfloan) if selfloan else int(0)
        annualvalue = int(annualvalue) if annualvalue else int(0)
        municipaltax = int(municipaltax) if municipaltax else int(0)
        Homeinterest = int(Homeinterest) if Homeinterest else int(0)
        incomeloss = int(incomeloss) if incomeloss else int(0)
        standerdded = int(standerdded) if standerdded else int(0)
        loanammount = int(loanammount) if loanammount else int(0)
        propertyvalue3 = int(propertyvalue3) if propertyvalue3 else int(0)
        hlinterest = int(hlinterest) if hlinterest else int(0)
        havehouseproperty = str(havehouseproperty) if havehouseproperty else ''
        propertyvalue4 = int(propertyvalue4) if propertyvalue4 else int(0)
        Eligibility = str(Eligibility).lower() if Eligibility else ''
        otherincome = int(otherincome) if otherincome else int(0)
        savinginterest = int(savinginterest) if savinginterest else int(0)

        

        if self_loan_dt:            
            self_loan_dt = datetime.strptime(self_loan_dt, "%Y-%m-%d")
        else:            
            self_loan_dt = None

        if sanctiondate3:
            # Check if the date input is not empty
            sanctiondate3 = datetime.strptime(sanctiondate3, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            sanctiondate3 = None
        if sanctiondate4:
            # Check if the date input is not empty
            sanctiondate4 = datetime.strptime(sanctiondate4, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            sanctiondate4 = None

        if loanammount == 0:
            sanctiondate3 = None

        if otherincome == 0:
            sanctiondate4 = None

        lenderpan1_upper=''
        lenderpan2_upper=''
        lenderpan3_upper=''
        otherlenderpan1_upper = ''
        otherlenderpan2_upper = ''
        otherlenderpan3_upper = ''

        
        if lenderpan1:
            lenderpan1_upper = ''.join(char.upper() if char.isalpha() else char for char in lenderpan1)
        if lenderpan2:
            lenderpan2_upper = ''.join(char.upper() if char.isalpha() else char for char in lenderpan2)
        if lenderpan3:
            lenderpan3_upper = ''.join(char.upper() if char.isalpha() else char for char in lenderpan3)
        if otherlenderpan1:
            otherlenderpan1_upper = ''.join(char.upper() if char.isalpha() else char for char in otherlenderpan1)
        if otherlenderpan2:
            otherlenderpan2_upper = ''.join(char.upper() if char.isalpha() else char for char in otherlenderpan2)
        if otherlenderpan3:
            otherlenderpan3_upper = ''.join(char.upper() if char.isalpha() else char for char in otherlenderpan3)

        

        if tempincom:
            # Update the existing record with new values if provided

            if self_loan_dt:
               tempincom.d_selfloan_dt = self_loan_dt

            if selfloan:
                tempincom.d_selfoccupiedloanint = selfloan

            if lendername1:
                tempincom.d_selflendername = lendername1

                if lendername1 == 'other':
                    tempincom.d_selflenderpannum = ''
                    if otherlendername1:
                        tempincom.d_selfotherlendername = otherlendername1
                    if otherlenderpan1:
                        tempincom.d_selfotherlenderpannum = otherlenderpan1_upper                    
                else:
                    tempincom.d_selfotherlendername = ''
                    tempincom.d_selfotherlenderpannum = ''
                    if lenderpan1:
                        tempincom.d_selflenderpannum = lenderpan1_upper

            if annualvalue:
                tempincom.d_letannuallettable = annualvalue
            if municipaltax:
                tempincom.d_letmunicipalprotax = municipaltax
            if Homeinterest:
                tempincom.d_lethomeloaninterest = Homeinterest
            if incomeloss:
                tempincom.d_letincomeloss = incomeloss
            if standerdded:
                tempincom.d_letstanderedded = standerdded
            
            if lendername2:
                tempincom.d_letlendername = lendername2

                if lendername2 == 'other':
                    tempincom.d_letlenderpannum = ''

                    if otherlendername2:
                        tempincom.d_letotherlendername = otherlendername2
                    if otherlenderpan2:
                        tempincom.d_letotherlenderpannum = otherlenderpan2_upper                   
                else:
                    tempincom.d_letotherlendername = ''
                    tempincom.d_letotherlenderpannum = ''

                    if lenderpan2:
                        tempincom.d_letlenderpannum = lenderpan2_upper

            

            

            if sanctiondate3:
                tempincom.d_80eeloadsanctiondt = sanctiondate3

            if loanammount:
                tempincom.d_80eeloanammount = loanammount
            if propertyvalue3:
                tempincom.d_80eepropertyvalue = propertyvalue3
            if hlinterest:
                tempincom.d_80eehomeloanint = hlinterest


            if lendername3:
                tempincom.d_80eelendername = lendername3

                if lendername3 == 'other':
                    tempincom.d_80eelenderpannum = ''

                    if otherlendername3:
                        tempincom.d_80eeotherlendername = otherlendername3
                    if otherlenderpan3:
                        tempincom.d_80eeotherlenderpannum = otherlenderpan3_upper                   
                else:
                    tempincom.d_80eeotherlendername = ''
                    tempincom.d_80eeotherlenderpannum = ''

                    if lenderpan3:
                        tempincom.d_80eelenderpannum = lenderpan3_upper

            if sanctiondate4:
                tempincom.d_80eealoadsanctiondt = sanctiondate4
            if havehouseproperty:
                tempincom.d_80eeahaveproperty = havehouseproperty
            if propertyvalue4:
                tempincom.d_80eeaprpertyvalue = propertyvalue4
            if Eligibility:
                tempincom.d_80eeaeligibility = Eligibility
            if otherincome:
                tempincom.d_80ttaotherincome = otherincome
            if savinginterest:
                tempincom.d_80ttasavinginterest = savinginterest
            tempincom.empname = data.empname
            tempincom.saveddate = save_ts

            tempincom.save()

            success_message = "Data updated successfully"
        else:
            temp_incomeLossProperty_new = Temp_Income (
                empid=emp_user,
                empname = data.empname,

                d_selfloan_dt = self_loan_dt,
                d_selfoccupiedloanint=selfloan,
                d_selflendername=lendername1,
                d_selflenderpannum=lenderpan1_upper,            
                d_selfotherlendername=otherlendername1,
                d_selfotherlenderpannum=otherlenderpan1_upper,

                d_letannuallettable=annualvalue,
                d_letmunicipalprotax=municipaltax,
                d_lethomeloaninterest=Homeinterest,
                d_letincomeloss=incomeloss,
                d_letstanderedded=standerdded,
                d_letlendername=lendername2,
                d_letlenderpannum=lenderpan2_upper,
                d_letotherlendername=otherlendername2,
                d_letotherlenderpannum=otherlenderpan2_upper,

                d_80eeloadsanctiondt=sanctiondate3,
                d_80eeloanammount=loanammount,
                d_80eepropertyvalue=propertyvalue3,
                d_80eehomeloanint=hlinterest,
                d_80eelendername=lendername3,
                d_80eelenderpannum=lenderpan3_upper,
                d_80eeotherlendername=otherlendername3,
                d_80eeotherlenderpannum=otherlenderpan3_upper,

                d_80eealoadsanctiondt=sanctiondate4,
                d_80eeahaveproperty=havehouseproperty,
                d_80eeaprpertyvalue=propertyvalue4,
                d_80eeaeligibility=Eligibility,
                d_80ttaotherincome=otherincome,
                d_80ttasavinginterest=savinginterest,

                saveddate=save_ts
            )
            temp_incomeLossProperty_new.save()

            


            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'tempincom': tempincom,
                                                   'prevtax': prevtax, 'success_message': success_message})



def del_temp_incomeLoss(request, empid):

    Temp_Income1 = Temp_Income.objects.filter(empid=empid)
    tempincom = Temp_Income1.last()
    tempincom.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})


def temp_incomeLoss2(request):
    success_message = ""
    
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        prevtax = TaxDeclaration1.last()
    else:
        prevtax = None

    Temp_Income1 = Temp_Income.objects.filter(empid=emp_user)
    if Temp_Income1:
        tempincom = Temp_Income1.last()
    else:
        tempincom = None

    
    if request.method == 'POST':
        
        otherincome = request.POST.get('unspecified_income')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        # Convert empty strings to None for fields that should accept null
        
        otherincome = int(otherincome) if otherincome else int(0)
        
        if tempincom:
            if otherincome:
                tempincom.d_80ttaotherincome = otherincome
            
            tempincom.empname = data.empname
            tempincom.saveddate = save_ts

            tempincom.save()

            success_message = "Data updated successfully"
        else:
            temp_incomeLossProperty_new = Temp_Income (
                empid=emp_user,
                empname = data.empname,                
                d_80ttaotherincome=otherincome,
                saveddate=save_ts
            )
            temp_incomeLossProperty_new.save()
            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'tempincom': tempincom,
                                                   'prevtax': prevtax, 'success_message': success_message})



def temp_Other(request):
    success_message = ""
    
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        prevtax = TaxDeclaration1.last()
    else:
        prevtax = None

    Temp_80Other1 = Temp_80Other.objects.filter(empid=emp_user)
    if Temp_80Other1:
        temp80other = Temp_80Other1.last()
    else:
        temp80other = None
    
    if request.method == 'POST':
        selfinsurance = request.POST.get('selfinsurance', None)
        parantinsurance1 = request.POST.get('parantinsurance1')
        parantinsurance2 = request.POST.get('parantinsurance2')
        checkup = request.POST.get('checkup')
        illnesstype = request.POST.get('illnesstype')
        medicaltreatment = request.POST.get('medicaltreatment')
        medicaltreatmentinput = request.POST.get('medicaltreatmentvalue')
        education_loan_dt = request.POST.get('education_loan_dt')
        educationinterest = request.POST.get('educationinterest')
        handicaped = request.POST.get('handicaped')
        dependhandicape = request.POST.get('dependhandicape')
        vehicletype = request.POST.get('vehicletype')
        loansanctiondate = request.POST.get('loansanctiondate')
        carinterest = request.POST.get('carinterest', None)
        ccd80 = request.POST.get('ccd80')
        prannumb = request.POST.get('prannumb')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        # Convert empty strings to None for fields that should accept null
        selfinsurance = int(selfinsurance) if selfinsurance else int(0)
        parantinsurance1 = int(parantinsurance1) if parantinsurance1 else int(0)
        parantinsurance2 = int(parantinsurance2) if parantinsurance2 else int(0)
        checkup = int(checkup) if checkup else int(0)
        medicaltreatmentinput = int(medicaltreatmentinput) if medicaltreatmentinput else int(0)
        educationinterest = int(educationinterest) if educationinterest else int(0)
        handicaped = int(handicaped) if handicaped else int(0)
        dependhandicape = int(dependhandicape) if dependhandicape else int(0)
        carinterest = int(carinterest) if carinterest else int(0)
        ccd80 = int(ccd80) if ccd80 else int(0)
        prannumb = int(prannumb) if prannumb else int(0)

        

        if education_loan_dt:            
            education_loan_dt = datetime.strptime(education_loan_dt, "%Y-%m-%d")
        else:            
            education_loan_dt = None

        if loansanctiondate:
            # Check if the date input is not empty
            loansanctiondate = datetime.strptime(loansanctiondate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            loansanctiondate = None

        if temp80other:
            # Update the existing record with new values if provided
            if selfinsurance:
                temp80other.d_80dselfinsurance = selfinsurance
            if parantinsurance1:
                temp80other.d_80dnonseniorinsurance = parantinsurance1
            if parantinsurance2:
                temp80other.d_80dseniorinsurance = parantinsurance2
            if checkup:
                temp80other.d_80dpreventivecheckup = checkup
            if illnesstype:
                temp80other.d_80dillnesstype = illnesstype
            if medicaltreatment:
                temp80other.d_80ddbmedicalfield = medicaltreatment
            if medicaltreatmentinput:
                temp80other.d_80ddbmedicaltreatment = medicaltreatmentinput
            if education_loan_dt:
                temp80other.d_80eeducation_dt = education_loan_dt
            if educationinterest:
                temp80other.d_80eeducationint = educationinterest
            if handicaped:
                temp80other.d_80uselfdisable = handicaped
            if dependhandicape:
                temp80other.d_80dddependdisable = dependhandicape
            if vehicletype:
                temp80other.d_80eebvehicltype = vehicletype

            if loansanctiondate:
                temp80other.d_80eebloansactiondt = loansanctiondate
            if carinterest:
                temp80other.d_80eebcarint = carinterest
            if ccd80:
                temp80other.d_80ccbselfcontrib = ccd80
            if prannumb:
                temp80other.d_80ccbprannum = prannumb

            temp80other.empname = data.empname
            temp80other.saveddate = save_ts

            temp80other.save()

            success_message = "Data updated successfully"
        else:
            temp_OtherDeductions_new = Temp_80Other(
                empid=emp_user,
                empname= data.empname,

                d_80dselfinsurance=selfinsurance,
                d_80dnonseniorinsurance=parantinsurance1,
                d_80dseniorinsurance=parantinsurance2,
                d_80dpreventivecheckup=checkup,
                d_80dillnesstype = illnesstype,
                d_80ddbmedicalfield = medicaltreatment,
                d_80ddbmedicaltreatment=medicaltreatmentinput,
                d_80eeducation_dt = education_loan_dt,
                d_80eeducationint=educationinterest,
                d_80uselfdisable=handicaped,
                d_80dddependdisable=dependhandicape,
                d_80eebvehicltype=vehicletype,
                d_80eebloansactiondt=loansanctiondate,
                d_80eebcarint=carinterest,
                d_80ccbselfcontrib=ccd80,
                d_80ccbprannum=prannumb,
                saveddate=save_ts,


            )
            temp_OtherDeductions_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'temp80other': temp80other,
                                                   'prevtax': prevtax, 'success_message': success_message})

def del_temp_Other(request, empid):

    Temp_80Other1 = Temp_80Other.objects.filter(empid=empid)
    temp80other = Temp_80Other1.last()
    temp80other.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})



def temp_80C(request):
    success_message = ""
    
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        prevtax = TaxDeclaration1.last()
    else:
        prevtax = None

    Temp_80DDed1 = Temp_80DDed.objects.filter(empid=emp_user)
    if Temp_80DDed1:
        temp80d = Temp_80DDed1.last()
    else:
        temp80d = None
    

    if request.method == 'POST':
        lifeInsurance = request.POST.get('lifeInsurance', None)
        timeDeposit = request.POST.get('timeDeposit')
        ulip = request.POST.get('ulip')
        savingsCertificate = request.POST.get('savingsCertificate')
        interestNSC = request.POST.get('interestNSC')
        ppf = request.POST.get('ppf')
        houseLoan = request.POST.get('houseLoan')
        tuitionFee = request.POST.get('tuitionFee')
        mutualFund = request.POST.get('mutualFund')
        termDeposit = request.POST.get('termDeposit')
        sukanyaSamriddhi = request.POST.get('sukanyaSamriddhi')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        # Convert empty strings to None for fields that should accept null
        lifeInsurance = int(lifeInsurance) if lifeInsurance else int(0)
        timeDeposit = int(timeDeposit) if timeDeposit else int(0)
        ulip = int(ulip) if ulip else int(0)
        savingsCertificate = int(savingsCertificate) if savingsCertificate else int(0)
        interestNSC = int(interestNSC) if interestNSC else int(0)
        ppf = int(ppf) if ppf else int(0)
        houseLoan = int(houseLoan) if houseLoan else int(0)
        tuitionFee = int(tuitionFee) if tuitionFee else int(0)
        mutualFund = int(mutualFund) if mutualFund else int(0)
        termDeposit = int(termDeposit) if termDeposit else int(0)
        sukanyaSamriddhi = int(sukanyaSamriddhi) if sukanyaSamriddhi else int(0)

        if temp80d:
            # Update the existing record with new values if provided
            if lifeInsurance:
                temp80d.d_80clifeinsurance = lifeInsurance
            if timeDeposit:
                temp80d.d_80c5yrtimedeposit = timeDeposit
            if ulip:
                temp80d.d_80culip = ulip
            if savingsCertificate:
                temp80d.d_80cnscsubscription = savingsCertificate
            if interestNSC:
                temp80d.d_80cnscint = interestNSC
            if ppf:
                temp80d.d_80cpublicpfund = ppf
            if houseLoan:
                temp80d.d_80chouseloan = houseLoan
            if tuitionFee:
                temp80d.d_80ctuitionfee = tuitionFee
            if mutualFund:
                temp80d.d_80cmutualfund = mutualFund
            if termDeposit:
                temp80d.d_80ctermdposite = termDeposit
            if sukanyaSamriddhi:
                temp80d.d_80csuksam = sukanyaSamriddhi

            temp80d.empname = data.empname
            temp80d.saveddate = save_ts

            temp80d.save()

            success_message = "Data updated successfully"
        else:
            temp_80CDB_new = Temp_80DDed(
                empid=emp_user,
                empname = data.empname,
                
                d_80clifeinsurance=lifeInsurance,
                d_80c5yrtimedeposit=timeDeposit,
                d_80culip=ulip,
                d_80cnscsubscription=savingsCertificate,
                d_80cnscint=interestNSC,
                d_80cpublicpfund=ppf,
                d_80chouseloan=houseLoan,

                d_80ctuitionfee=tuitionFee,
                d_80cmutualfund=mutualFund,
                d_80ctermdposite=termDeposit,
                d_80csuksam=sukanyaSamriddhi,

                saveddate=save_ts,


            )
            temp_80CDB_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime, 'temp80d': temp80d,
                                                   'prevtax': prevtax, 'success_message': success_message})

def del_temp_80C(request, empid):

    Temp_80DDed1 = Temp_80DDed.objects.filter(empid=empid)
    temp80d = Temp_80DDed1.last()    
    temp80d.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})




def temp_prevemp(request):
    success_message = ""
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    tax_regime = TaxRegime.objects.filter(empid=emp_user).last()
    prev_tax = TaxDeclaration.objects.filter(empid=emp_user).last()
    temp_prev_record = Temp_Prev.objects.filter(empid=emp_user).last()

    if request.method == 'POST':
        empsalary = request.POST.get('empsalary')
        professionaltax = request.POST.get('professionaltax')
        providentfund = request.POST.get('providentfund')
        incometax6 = request.POST.get('incometax6')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        empsalary = int(empsalary) if empsalary else int(0)
        professionaltax = int(professionaltax) if professionaltax else int(0)
        providentfund = int(providentfund) if providentfund else int(0)
        incometax6 = int(incometax6) if incometax6 else int(0)

        if temp_prev_record:
            if empsalary:
                temp_prev_record.d_prevsalary = empsalary
            if professionaltax:
                temp_prev_record.d_prevprofessionaltax = professionaltax
            if providentfund:
                temp_prev_record.d_prevprofund = providentfund
            if incometax6:
                temp_prev_record.d_previncometax = incometax6

            temp_prev_record.empname = data.empname
            temp_prev_record.saveddate = save_ts
            temp_prev_record.save()

            success_message = "Data updated successfully"
        else:
            temp_prev_record = Temp_Prev(
                empid=emp_user,
                empname=data.empname,
                d_prevsalary=empsalary,
                d_prevprofessionaltax=professionaltax,
                d_prevprofund=providentfund,
                d_previncometax=incometax6,
                saveddate=save_ts
            )
            temp_prev_record.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': tax_regime, 'tempprev': temp_prev_record,
                                                   'prevtax': prev_tax, 'success_message': success_message})


def del_temp_prevemp(request, empid):

    Temp_Prev1 = Temp_Prev.objects.filter(empid=empid)
    tempprev = Temp_Prev1.last()
    tempprev.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})




def temp_prevemp2(request):
    success_message = ""
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    tax_regime = TaxRegime.objects.filter(empid=emp_user).last()
    prev_tax = TaxDeclaration.objects.filter(empid=emp_user).last()
    temp_prev_record = Temp_Prev.objects.filter(empid=emp_user).last()

    if request.method == 'POST':
        empsalary = request.POST.get('empsalary2')
        professionaltax = request.POST.get('professionaltax2')
        providentfund = request.POST.get('providentfund2')
        incometax6 = request.POST.get('incometax62')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        empsalary = int(empsalary) if empsalary else int(0)
        professionaltax = int(professionaltax) if professionaltax else int(0)
        providentfund = int(providentfund) if providentfund else int(0)
        incometax6 = int(incometax6) if incometax6 else int(0)

        if temp_prev_record:
            if empsalary:
                temp_prev_record.d_prevsalary = empsalary
            if professionaltax:
                temp_prev_record.d_prevprofessionaltax = professionaltax
            if providentfund:
                temp_prev_record.d_prevprofund = providentfund
            if incometax6:
                temp_prev_record.d_previncometax = incometax6

            temp_prev_record.empname = data.empname
            temp_prev_record.saveddate = save_ts
            temp_prev_record.save()

            success_message = "Data updated successfully"
        else:
            temp_prev_record = Temp_Prev(
                empid=emp_user,
                empname=data.empname,
                d_prevsalary=empsalary,
                d_prevprofessionaltax=professionaltax,
                d_prevprofund=providentfund,
                d_previncometax=incometax6,
                saveddate=save_ts
            )
            temp_prev_record.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': tax_regime, 'tempprev': temp_prev_record,
                                                   'prevtax': prev_tax, 'success_message': success_message})




def upload_Self_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('self_file'):
        selfOccupiedHouseProperty_files = request.FILES.getlist('self_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'ITDeclarations.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'ITDeclarations.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='Dec_Self_Occupied') 
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+filename_parts[2]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+filename_parts[2]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_Decl_hli_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Decl_hli_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='Dec_Self_Occupied',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'ITDeclarations.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')


def upload_education_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('education_file'):
        selfOccupiedHouseProperty_files = request.FILES.getlist('education_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'ITDeclarations.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'ITDeclarations.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='Dec_Education') 
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+filename_parts[2]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+filename_parts[2]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_Decl_80e_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Decl_80e_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='Dec_Education',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'ITDeclarations.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')


def TaxDeclaration_submit(request):

    success_message = ''

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)


    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None


    Temp_HRA1 = Temp_HRA.objects.filter(empid=emp_user)
    if Temp_HRA1:
        temphra = Temp_HRA1.last()
    else:
        temphra = None

    Temp_Income1 = Temp_Income.objects.filter(empid=emp_user)
    if Temp_Income1:
        tempincom = Temp_Income1.last()
    else:
        tempincom = None

    Temp_80Other1 = Temp_80Other.objects.filter(empid=emp_user)
    if Temp_80Other1:
        temp80other = Temp_80Other1.last()
    else:
        temp80other = None

    Temp_80DDed1 = Temp_80DDed.objects.filter(empid=emp_user)
    if Temp_80DDed1:
        temp80d = Temp_80DDed1.last()
    else:
        temp80d = None

    Temp_Prev1 = Temp_Prev.objects.filter(empid=emp_user)
    if Temp_Prev1:
        tempprev = Temp_Prev1.last()
    else:
        tempprev = None

    
    current_date = date.today()

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

    if request.method == 'POST':
        pannum = request.POST.get('pannum')
        startdate = request.POST.get('startdate')
        rent = request.POST.get('rent')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        citytype = request.POST.get('citytype')
        Paddress = request.POST.get('Paddress')
        Taddress = request.POST.get('Taddress')
        pincode = request.POST.get('pincode')
        
        self_loan_dt = request.POST.get('self_loan_dt')
        selfloan = request.POST.get('selfloan')
        lendername1 = request.POST.get('lendername1')
        lenderpan1 = request.POST.get('lenderpan1')
        
        otherlendername1 = request.POST.get('otherlendername1')
        otherlenderpan1 = request.POST.get('otherlenderpan1')

        annualvalue = request.POST.get('annualvalue')
        municipaltax = request.POST.get('municipaltax')
        Homeinterest = request.POST.get('Homeinterest')
        incomeloss = request.POST.get('incomeloss')
        standerdded = request.POST.get('standerdded')
        lendername2 = request.POST.get('lendername2')
        lenderpan2 = request.POST.get('lenderpan2')

        otherlendername2 = request.POST.get('otherlendername2')
        otherlenderpan2 = request.POST.get('otherlenderpan2')

        sanctiondate3 = request.POST.get('sanctiondate3')
        loanammount = request.POST.get('loanammount')
        propertyvalue3 = request.POST.get('propertyvalue3')
        hlinterest = request.POST.get('hlinterest')
        lendername3 = request.POST.get('lendername3')
        lenderpan3 = request.POST.get('lenderpan3')

        otherlendername3 = request.POST.get('otherlendername3')
        otherlenderpan3 = request.POST.get('otherlenderpan3')

        sanctiondate4 = request.POST.get('sanctiondate4')
        havehouseproperty = request.POST.get('havehouseproperty')
        propertyvalue4 = request.POST.get('propertyvalue4')
        Eligibility = request.POST.get('Eligibility')
        otherincome = request.POST.get('otherincome')
        savinginterest = request.POST.get('savinginterest')



        selfinsurance = request.POST.get('selfinsurance')
        parantinsurance1 = request.POST.get('parantinsurance1')
        parantinsurance2 = request.POST.get('parantinsurance2')
        checkup = request.POST.get('checkup')
        illnesstype = request.POST.get('illnesstype')
        medicaltreatment = request.POST.get('medicaltreatment')
        medicaltreatmentinput = request.POST.get('medicaltreatmentvalue')
        education_loan_dt = request.POST.get('education_loan_dt')
        educationinterest = request.POST.get('educationinterest')
        handicaped = request.POST.get('handicaped')
        dependhandicape = request.POST.get('dependhandicape')
        vehicletype = request.POST.get('vehicletype')
        loansanctiondate = request.POST.get('loansanctiondate')
        carinterest = request.POST.get('carinterest')
        ccd80 = request.POST.get('ccd80')
        prannumb = request.POST.get('prannumb')


        lifeInsurance = request.POST.get('lifeInsurance')
        timeDeposit = request.POST.get('timeDeposit')
        ulip = request.POST.get('ulip')
        savingsCertificate = request.POST.get('savingsCertificate')
        interestNSC = request.POST.get('interestNSC')
        ppf = request.POST.get('ppf')
        houseLoan = request.POST.get('houseLoan')
        tuitionFee = request.POST.get('tuitionFee')
        mutualFund = request.POST.get('mutualFund')
        termDeposit = request.POST.get('termDeposit')
        sukanyaSamriddhi = request.POST.get('sukanyaSamriddhi')


        empsalary = request.POST.get('empsalary')
        professionaltax = request.POST.get('professionaltax')
        providentfund = request.POST.get('providentfund')
        incometax6 = request.POST.get('incometax6')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)


        if startdate:
            # Check if the date input is not empty
            startdate = datetime.strptime(startdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            startdate = None

        # Convert empty strings to None for fields that should accept null
        rent = int(rent) if rent else int(0)
        contact = int(contact) if contact else int(0)
        pincode = int(pincode) if pincode else int(0)

        pannum_upper = ''

        if pannum:
            pannum_upper = ''.join(char.upper() if char.isalpha() else char for char in pannum)

        # Convert empty strings to None for fields that should accept null
        selfloan = int(selfloan) if selfloan else int(0)
        annualvalue = int(annualvalue) if annualvalue else int(0)
        municipaltax = int(municipaltax) if municipaltax else int(0)
        Homeinterest = int(Homeinterest) if Homeinterest else int(0)
        incomeloss = int(incomeloss) if incomeloss else int(0)
        standerdded = int(standerdded) if standerdded else int(0)
        loanammount = int(loanammount) if loanammount else int(0)
        propertyvalue3 = int(propertyvalue3) if propertyvalue3 else int(0)
        hlinterest = int(hlinterest) if hlinterest else int(0)
        havehouseproperty = str(havehouseproperty) if havehouseproperty else ''
        propertyvalue4 = int(propertyvalue4) if propertyvalue4 else int(0)
        Eligibility = str(Eligibility).lower() if Eligibility else ''
        otherincome = int(otherincome) if otherincome else int(0)
        savinginterest = int(savinginterest) if savinginterest else int(0)


        if self_loan_dt:            
            self_loan_dt = datetime.strptime(self_loan_dt, "%Y-%m-%d")
        else:            
            self_loan_dt = None

        if sanctiondate3:
            # Check if the date input is not empty
            sanctiondate3 = datetime.strptime(sanctiondate3, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            sanctiondate3 = None
        if sanctiondate4:
            # Check if the date input is not empty
            sanctiondate4 = datetime.strptime(sanctiondate4, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            sanctiondate4 = None
        
        if loanammount == 0:
            sanctiondate3 = None

        if otherincome == 0:
            sanctiondate4 = None

        lenderpan1_upper=''
        lenderpan2_upper=''
        lenderpan3_upper=''
        otherlenderpan1_upper = ''
        otherlenderpan2_upper = ''
        otherlenderpan3_upper = ''


        if lenderpan1:
            lenderpan1_upper = ''.join(char.upper() if char.isalpha() else char for char in lenderpan1)
        if lenderpan2:
            lenderpan2_upper = ''.join(char.upper() if char.isalpha() else char for char in lenderpan2)
        if lenderpan3:
            lenderpan3_upper = ''.join(char.upper() if char.isalpha() else char for char in lenderpan3)
        if otherlenderpan1:
            otherlenderpan1_upper = ''.join(char.upper() if char.isalpha() else char for char in otherlenderpan1)
        if otherlenderpan2:
            otherlenderpan2_upper = ''.join(char.upper() if char.isalpha() else char for char in otherlenderpan2)
        if otherlenderpan3:
            otherlenderpan3_upper = ''.join(char.upper() if char.isalpha() else char for char in otherlenderpan3)

        
        
        # Convert empty strings to None for fields that should accept null
        selfinsurance = int(selfinsurance) if selfinsurance else int(0)
        parantinsurance1 = int(parantinsurance1) if parantinsurance1 else int(0)
        parantinsurance2 = int(parantinsurance2) if parantinsurance2 else int(0)
        checkup = int(checkup) if checkup else int(0)
        medicaltreatmentinput = int(medicaltreatmentinput) if medicaltreatmentinput else int(0)
        educationinterest = int(educationinterest) if educationinterest else int(0)
        handicaped = int(handicaped) if handicaped else int(0)
        dependhandicape = int(dependhandicape) if dependhandicape else int(0)
        carinterest = int(carinterest) if carinterest else int(0)
        ccd80 = int(ccd80) if ccd80 else int(0)
        prannumb = int(prannumb) if prannumb else int(0)

        if education_loan_dt:            
            education_loan_dt = datetime.strptime(education_loan_dt, "%Y-%m-%d")
        else:            
            education_loan_dt = None

        if loansanctiondate:
            # Check if the date input is not empty
            loansanctiondate = datetime.strptime(loansanctiondate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            loansanctiondate = None

        # Convert empty strings to None for fields that should accept null
        lifeInsurance = int(lifeInsurance) if lifeInsurance else int(0)
        timeDeposit = int(timeDeposit) if timeDeposit else int(0)
        ulip = int(ulip) if ulip else int(0)
        savingsCertificate = int(savingsCertificate) if savingsCertificate else int(0)
        interestNSC = int(interestNSC) if interestNSC else int(0)
        ppf = int(ppf) if ppf else int(0)
        houseLoan = int(houseLoan) if houseLoan else int(0)
        tuitionFee = int(tuitionFee) if tuitionFee else int(0)
        mutualFund = int(mutualFund) if mutualFund else int(0)
        termDeposit = int(termDeposit) if termDeposit else int(0)
        sukanyaSamriddhi = int(sukanyaSamriddhi) if sukanyaSamriddhi else int(0)


        
        # Convert empty strings to None for fields that should accept null
        empsalary = int(empsalary) if empsalary else int(0)
        professionaltax = int(professionaltax) if professionaltax else int(0)
        providentfund = int(providentfund) if providentfund else int(0)
        incometax6 = int(incometax6) if incometax6 else int(0)


       
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')

        Declaration_no = f'D{data.empid}{formatted_save_ts}'

        

        TaxDeclaration_new = TaxDeclaration(
                empid=emp_user,
                empname = data.empname,
                mobno  = data.empmobile,
                emailid = data.empemail,
                pan  = data.emppan,
                dob = data.empdob,

                d_landlordspannum=pannum_upper,
                d_houserentstartdt=startdate,
                d_rentpermonth=rent,
                d_landlordsname=name,
                d_landlordscontact=contact,
                d_citytype=citytype,
                d_landlordsaddress=Paddress,
                d_rentaddress=Taddress,
                d_pincode=pincode,

                d_selfloan_dt = self_loan_dt,
                d_selfoccupiedloanint=selfloan,
                d_selflendername=lendername1,
                d_selflenderpannum=lenderpan1_upper,            
                d_selfotherlendername=otherlendername1,
                d_selfotherlenderpannum=otherlenderpan1_upper,

                d_letannuallettable=annualvalue,
                d_letmunicipalprotax=municipaltax,
                d_lethomeloaninterest=Homeinterest,
                d_letincomeloss=incomeloss,
                d_letstanderedded=standerdded,
                d_letlendername=lendername2,
                d_letlenderpannum=lenderpan2_upper,
                d_letotherlendername=otherlendername2,
                d_letotherlenderpannum=otherlenderpan2_upper,

                d_80eeloadsanctiondt=sanctiondate3,
                d_80eeloanammount=loanammount,
                d_80eepropertyvalue=propertyvalue3,
                d_80eehomeloanint=hlinterest,
                d_80eelendername=lendername3,
                d_80eelenderpannum=lenderpan3_upper,
                d_80eeotherlendername=otherlendername3,
                d_80eeotherlenderpannum=otherlenderpan3_upper,

                d_80eealoadsanctiondt=sanctiondate4,
                d_80eeahaveproperty=havehouseproperty,
                d_80eeaprpertyvalue=propertyvalue4,
                d_80eeaeligibility=Eligibility,
                d_80ttaotherincome=otherincome,
                d_80ttasavinginterest=savinginterest,



                d_80dselfinsurance=selfinsurance,
                d_80dnonseniorinsurance=parantinsurance1,
                d_80dseniorinsurance=parantinsurance2,
                d_80dpreventivecheckup=checkup,

                d_80dillnesstype = illnesstype,
                d_80ddbmedicalfield = medicaltreatment,
                d_80ddbmedicaltreatment=medicaltreatmentinput,
                d_80eeducation_dt = education_loan_dt,
                d_80eeducationint=educationinterest,
                d_80uselfdisable=handicaped,
                d_80dddependdisable=dependhandicape,
                d_80eebvehicltype=vehicletype,
                d_80eebloansactiondt=loansanctiondate,
                d_80eebcarint=carinterest,
                d_80ccbselfcontrib=ccd80,
                d_80ccbprannum=prannumb,


                d_80clifeinsurance=lifeInsurance,
                d_80c5yrtimedeposit=timeDeposit,
                d_80culip=ulip,
                d_80cnscsubscription=savingsCertificate,
                d_80cnscint=interestNSC,
                d_80cpublicpfund=ppf,
                d_80chouseloan=houseLoan,
                d_80ctuitionfee=tuitionFee,
                d_80cmutualfund=mutualFund,
                d_80ctermdposite=termDeposit,
                d_80csuksam=sukanyaSamriddhi,
                

                d_prevsalary=empsalary,
                d_prevprofessionaltax=professionaltax,
                d_prevprofund=providentfund,
                d_previncometax=incometax6,

                saveddate=save_ts,
                sub1Date = save_ts,

                Declaration_no = Declaration_no

        )
        

        context = {
                'empname': data.empname,
                'empid': data.empid,
                'joindate':data.empdoj,
                'pannum_upper': pannum_upper,
                'startdate': startdate,
                'rent': rent,
                'name': name,
                'contact': contact,
                'citytype': citytype,
                'Paddress': Paddress,
                'Taddress': Taddress,
                'pincode': pincode,

                'financial_year_start':financial_year_start,
                'current_time_date':current_time_date, 
                'financial_year_end':financial_year_end,
                
            
                'selfloan': selfloan,
                'lendername1': lendername1,
                'lenderpan1_upper': lenderpan1_upper,
                'otherlendername1': otherlendername1,
                'otherlenderpan1_upper': otherlenderpan1_upper,
                'annualvalue': annualvalue,
                'municipaltax': municipaltax,
                'Homeinterest': Homeinterest,
                'incomeloss': incomeloss,
                'standerdded': standerdded,
                'lendername2': lendername2,
                'lenderpan2_upper': lenderpan2_upper,
                'otherlendername2': otherlendername2,
                'otherlenderpan2_upper': otherlenderpan2_upper,
                'sanctiondate3': sanctiondate3,
                'loanammount': loanammount,
                'propertyvalue3': propertyvalue3,
                'hlinterest': hlinterest,
                'lendername3': lendername3,
                'lenderpan3_upper': lenderpan3_upper,
                'otherlendername3': otherlendername3,
                'otherlenderpan3_upper': otherlenderpan3_upper,
                'sanctiondate4': sanctiondate4,
                'havehouseproperty': havehouseproperty,
                'propertyvalue4': propertyvalue4,
                'Eligibility': Eligibility,
                'otherincome': otherincome,
        
                
                'savinginterest': savinginterest,
                'selfinsurance': selfinsurance,
                'parantinsurance1': parantinsurance1,
                'parantinsurance2': parantinsurance2,
                'checkup': checkup,
                'illnesstype':illnesstype,
                'medicaltreatment' : medicaltreatment,
                'medicaltreatmentinput': medicaltreatmentinput,
                'educationinterest': educationinterest,
                'handicaped': handicaped,
                'dependhandicape': dependhandicape,
                'vehicletype': vehicletype,
                'loansanctiondate': loansanctiondate,
                'carinterest': carinterest,
                'ccd80': ccd80,
                'prannumb': prannumb,
                
                'lifeInsurance': lifeInsurance,
                'timeDeposit': timeDeposit,
                'ulip': ulip,
                'savingsCertificate': savingsCertificate,
                'interestNSC': interestNSC,
                'ppf': ppf,
                'houseLoan': houseLoan,
                'tuitionFee': tuitionFee,
                'mutualFund': mutualFund,
                'termDeposit': termDeposit,
                'sukanyaSamriddhi': sukanyaSamriddhi,
                
                'empsalary': empsalary,
                'professionaltax': professionaltax,
                'providentfund': providentfund,
                'incometax6': incometax6,
    
            }

        rendered_html = render_to_string('table_pdf.html', context)
        result = BytesIO()
            
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
        pdf_filename = f"{data.empid}.pdf"

        email_body = f'''
        <p>Dear <strong>{data.empname} ({data.empid})</strong>,</p>
        <p>Thanks for submitting the Declaration.</p>
        
        <p>Below are the details of your submission of Income Tax Declaration.</p>
        <p>Thanks & Regards,</p>
        <p><strong>Income Tax Declaration</strong></p>
        '''

        if not pdf.err:
            email = EmailMessage(
                subject='Tax Declaration Details - 2024-2025',
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[data.empemail],
            )
            email.content_subtype = 'html'
            email.attach(pdf_filename, result.getvalue(), 'application/pdf')
            email.send(fail_silently=False)
        else:
            print("Error during PDF generation:", pdf.err)

        if temphra:
            temphra.delete()
        if tempincom:
            tempincom.delete()
        if temp80other:
            temp80other.delete()
        if temp80d:
            temp80d.delete()
        if tempprev:
            tempprev.delete()

        TaxDeclaration_new.save()

        
        success_message = 'Your IT declaration is submitted successfully.'

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime,
                                                    'success_message': success_message,
                                                    'financial_year_start':financial_year_start,
                                                    'current_time_date':current_time_date, 'financial_year_end':financial_year_end})   
    



def TaxDeclaration_submit2(request):

    success_message = ''

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)


    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None


    Temp_HRA1 = Temp_HRA.objects.filter(empid=emp_user)
    if Temp_HRA1:
        temphra = Temp_HRA1.last()
    else:
        temphra = None

    Temp_Income1 = Temp_Income.objects.filter(empid=emp_user)
    if Temp_Income1:
        tempincom = Temp_Income1.last()
    else:
        tempincom = None

    Temp_80Other1 = Temp_80Other.objects.filter(empid=emp_user)
    if Temp_80Other1:
        temp80other = Temp_80Other1.last()
    else:
        temp80other = None

    Temp_80DDed1 = Temp_80DDed.objects.filter(empid=emp_user)
    if Temp_80DDed1:
        temp80d = Temp_80DDed1.last()
    else:
        temp80d = None

    Temp_Prev1 = Temp_Prev.objects.filter(empid=emp_user)
    if Temp_Prev1:
        tempprev = Temp_Prev1.last()
    else:
        tempprev = None


    current_date = date.today()

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

    
    if request.method == 'POST':
        
        otherincome = request.POST.get('unspecified_income')
    
        empsalary = request.POST.get('empsalary2')
        professionaltax = request.POST.get('professionaltax2')
        providentfund = request.POST.get('providentfund2')
        incometax6 = request.POST.get('incometax62')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)


        otherincome = int(otherincome) if otherincome else int(0)
        
        # Convert empty strings to None for fields that should accept null
        empsalary = int(empsalary) if empsalary else int(0)
        professionaltax = int(professionaltax) if professionaltax else int(0)
        providentfund = int(providentfund) if providentfund else int(0)
        incometax6 = int(incometax6) if incometax6 else int(0)

        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')

        Declaration_no = f'D{data.empid}{formatted_save_ts}'

    

        TaxDeclaration_new = TaxDeclaration(
                empid=emp_user,
                empname = data.empname,
                mobno  = data.empmobile,
                emailid = data.empemail,
                pan  = data.emppan,
                dob = data.empdob,

                
                d_80ttaotherincome=otherincome,
                
                d_prevsalary=empsalary,
                d_prevprofessionaltax=professionaltax,
                d_prevprofund=providentfund,
                d_previncometax=incometax6,

                saveddate=save_ts,
                sub1Date = save_ts,

                Declaration_no = Declaration_no

        )
        
        context = {
                'empname': data.empname,
                'empid': data.empid,
                'joindate':data.empdoj,

                'financial_year_start':financial_year_start,
                'current_time_date':current_time_date, 
                'financial_year_end':financial_year_end,

                
                'otherincome': otherincome,

                'empsalary': empsalary,
                'professionaltax': professionaltax,
                'providentfund': providentfund,
                'incometax6': incometax6,
    
            }

        rendered_html = render_to_string('table_pdf2.html', context)
        result = BytesIO()
            
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
        pdf_filename = f"{data.empid}.pdf"

        email_body = f'''
        <p>Dear <strong>{data.empname} ({data.empid})</strong>,</p>
        <p>Thanks for submitting the Declaration.</p>
        
        <p>Below are the details of your submission of Income Tax Declaration.</p>
        <p>Thanks & Regards,</p>
        <p><strong>Income Tax Declaration</strong></p>
        '''

        if not pdf.err:
            email = EmailMessage(
                subject='Tax Declaration Details - 2024-2025',
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[data.empemail],
            )
            email.content_subtype = 'html'
            email.attach(pdf_filename, result.getvalue(), 'application/pdf')
            email.send(fail_silently=False)
        else:
            print("Error during PDF generation:", pdf.err)

        if temphra:
            temphra.delete()
        if tempincom:
            tempincom.delete()
        if temp80other:
            temp80other.delete()
        if temp80d:
            temp80d.delete()
        if tempprev:
            tempprev.delete()

        TaxDeclaration_new.save()

        
        success_message = 'Your IT declaration is submitted successfully.'

    return render(request, 'ITDeclarations.html', {'data': data, 'regime': regime,
                                                    'success_message': success_message,
                                                    'financial_year_start':financial_year_start,
                                                    'current_time_date':current_time_date, 'financial_year_end':financial_year_end})   
    



def workhistory(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    cardec = CarDeclaration.objects.filter(empid = emp_user)
    itdec = TaxDeclaration.objects.filter(empid = emp_user)

    fbp_dec = tblClaimeMaster.objects.filter(empid = emp_user)

    regime = TaxRegime.objects.filter(empid = emp_user)


    bandlist1 = ['07', '7', '7B', '08', '8',
                 '09', '9', '10', 'A', 'B', 'C', 'D']

    bandlist2 = ['08', '8', '09', '9', '10', 'A', 'B', 'C', 'D']

    band = data.Band

    return render(request, 'workhistory.html', {'data': data, 'cardec':cardec, 'itdec':itdec,
                                                'bandlist1':bandlist1, 'bandlist2':bandlist2,
                                                'band':band, 'fbp_dec':fbp_dec, 'regime':regime})


def cardeclaration_view(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    DeclarationNo = request.GET.get('DeclarationNo')

    cardec = CarDeclaration.objects.filter(empid = emp_user)

    cardec1 = CarDeclaration.objects.get(DeclarationNo = DeclarationNo)
    
    bandlist1 = ['07', '7', '7B', '08', '8',
                 '09', '9', '10', 'A', 'B', 'C', 'D']

    bandlist2 = ['08', '8', '09', '9', '10', 'A', 'B', 'C', 'D']

    band = data.Band

    return render(request, 'cardeclaration_view.html', {'data': data, 'cardec':cardec, 
                                                        'DeclarationNo':DeclarationNo, 'cardec1':cardec1,
                                                        'bandlist1':bandlist1, 'bandlist2':bandlist2,
                                                        'band':band})



def iddeclaration_view(request):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    Declaration_no = request.GET.get('Declaration_no')

    taxdec = TaxDeclaration.objects.filter(empid = emp_user)

    taxdec1 = TaxDeclaration.objects.get(Declaration_no = Declaration_no)


    return render(request, 'iddeclaration_view.html', {'data': data, 'Declaration_no':Declaration_no,
                                                       'taxdec':taxdec, 'taxdec1':taxdec1 })


def regime_declaration_view(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    claim_no = request.GET.get('claim_no')

    emp_regime = TaxRegime.objects.get(empid = emp_user, Claimno = claim_no)

    return render(request, 'regime_declaration_view.html', {'data':data, 'emp_regime':emp_regime })




def form16_files(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    return render(request, 'form16_files.html', {'data': data})


def itproof_sub(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')


    data = EmployeeDetail.objects.get(empid=emp_user)

    filenames = itprooffiles.objects.filter(empid=emp_user)
    
    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        taxdec =TaxDeclaration1.last()
    else:
        taxdec = None        
    
    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None
    
    try:
        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    except:
        saved_basic = None

    return render(request, 'itproof_sub.html', {'data': data, 'taxdec':taxdec, 'filenames':filenames, 'regime':regime, 'saved_basic':saved_basic})



def itproofsubmissions(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    empdoj_date = data.empdoj
    previous_day = empdoj_date - timedelta(days=1)
    
    try:
        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    except:
        saved_basic = None
    try:
        saved_hra = it_proof_hra.objects.get(empid=emp_user)        
    except:
        saved_hra = None
    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=emp_user)        
    except:
        saved_previous_emp = None

    
    Annual_Value = None
    totaldeduction = None
    income_loss_new = None
    if saved_Ilhp:
        if saved_Ilhp.annualLettableValue:
            Annual_Value = int(saved_Ilhp.annualLettableValue)-int(saved_Ilhp.municipalPropertyTax)
            totaldeduction = int(saved_Ilhp.standardDeduction)+int(saved_Ilhp.incomeLossOnHouseProperty)
            income_loss_new = int(Annual_Value)-int(totaldeduction)
    
    try:
        edit_48_hrs= saved_basic.submit_DT + timedelta(hours=48, minutes=00)        
    except:
        edit_48_hrs =None   
    try:
        filenames = itprooffiles.objects.filter(empid=emp_user)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
    except:
        filenames = None
        enumerated_filenames = None

    try:
        rent_section = itprooffiles.objects.filter(empid=emp_user, section = 'Rent', file_status = 'submit')
    except:
        rent_section = None
    try:
        pan_section = itprooffiles.objects.filter(empid=emp_user, section = 'PAN', file_status = 'submit')
    except:  
        pan_section = None
    try:
        SelfOccupied_file = itprooffiles.objects.filter(empid=emp_user, section = 'SelfOccupied', file_status = 'submit')
    except:
        SelfOccupied_file = None
    try:
        Letout_file = itprooffiles.objects.filter(empid=emp_user, section = 'Letout', file_status = 'submit')
    except:  
        Letout_file = None
    try:
        file_80EE = itprooffiles.objects.filter(empid=emp_user, section = '80EE', file_status = 'submit')
    except:
        file_80EE = None
    #
    try:
        file_80EEA = itprooffiles.objects.filter(empid=emp_user, section = '80EEA', file_status = 'submit')
    except:  
        file_80EEA = None
    try:
        OTHER_file = itprooffiles.objects.filter(empid=emp_user, section = 'OTHER', file_status = 'submit')
    except:
        OTHER_file = None
    # try:
    #     file_80TTA = itprooffiles.objects.filter(empid=emp_user, section = '80TTA', file_status = 'submit')
    # except:  
    #     file_80TTA = None  
    try:
        file_80D = itprooffiles.objects.filter(empid=emp_user, section = '80D', file_status = 'submit')
    except:
        file_80D = None
    
    try:
        file_80DDB = itprooffiles.objects.filter(empid=emp_user, section = '80DDB', file_status = 'submit')
    except:  
        file_80DDB = None
    try:
        file_80E = itprooffiles.objects.filter(empid=emp_user, section = '80E', file_status = 'submit')
    except:
        file_80E = None
    try:
        file_80U = itprooffiles.objects.filter(empid=emp_user, section = '80U', file_status = 'submit')
    except:  
        file_80U = None
    try:
        file_80DD = itprooffiles.objects.filter(empid=emp_user, section = '80DD', file_status = 'submit')
    except:
        file_80DD = None
    
    
    try:
        file_80EEB = itprooffiles.objects.filter(empid=emp_user, section = '80EEB', file_status = 'submit')
    except:  
        file_80EEB = None 
    try:
        file_80CCD = itprooffiles.objects.filter(empid=emp_user, section = '80CCD', file_status = 'submit')
    except:
        file_80CCD = None
    try:
        file_80C_LIC = itprooffiles.objects.filter(empid=emp_user, section = '80C_LIC', file_status = 'submit')
    except:  
        file_80C_LIC = None
    try:
        file_80C_PODT= itprooffiles.objects.filter(empid=emp_user, section = '80C_PODT', file_status = 'submit')
    except:
        file_80C_PODT = None
    

    try:
        file_80C_ULIP = itprooffiles.objects.filter(empid=emp_user, section = '80C_ULIP', file_status = 'submit')
    except:  
        file_80C_ULIP = None
    try:
        file_80C_NSC = itprooffiles.objects.filter(empid=emp_user, section = '80C_NSC', file_status = 'submit')
    except:
        file_80C_NSC = None
    try:
        file_80C_NSC_INT = itprooffiles.objects.filter(empid=emp_user, section = '80C_NSC_INT', file_status = 'submit')
    except:  
        file_80C_NSC_INT = None    
    try:
        file_80C_PPF = itprooffiles.objects.filter(empid=emp_user, section = '80C_PPF', file_status = 'submit')
    except:
        file_80C_PPF = None
    
    

    try:
        file_80C_principal = itprooffiles.objects.filter(empid=emp_user, section = '80C_principal', file_status = 'submit')
    except:  
        file_80C_principal = None
    try:
        file_80C_Tution = itprooffiles.objects.filter(empid=emp_user, section = '80C_Tution', file_status = 'submit')
    except:
        file_80C_Tution = None
    try:
        file_80C_MF = itprooffiles.objects.filter(empid=emp_user, section = '80C_MF', file_status = 'submit')
    except:  
        file_80C_MF = None
    try:
        file_80C_FD = itprooffiles.objects.filter(empid=emp_user, section = '80C_FD', file_status = 'submit')
    except:
        file_80C_FD = None
    
    
    try:
        file_80CCC = itprooffiles.objects.filter(empid=emp_user, section = '80CCC', file_status = 'submit')
    except:  
        file_80CCC = None 
    try:
        file_80C_Sukanya = itprooffiles.objects.filter(empid=emp_user, section = '80C_Sukanya', file_status = 'submit')
    except:
        file_80C_Sukanya = None
    try:
        PreviousEmpl_file = itprooffiles.objects.filter(empid=emp_user, section = 'PreviousEmployment', file_status = 'submit')
    except:  
        PreviousEmpl_file = None 


    try:
        hra_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'hra_declaration' )
    except:  
        hra_declaration_file = None 
    try:
        ilhp_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_declaration' )
    except:  
        ilhp_declaration_file = None 

    try:
        ilhp_self_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_self_declaration' )
    except:  
        ilhp_self_declaration_file = None  

    try:
        ilhp_let_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_let_declaration' )
    except:  
        ilhp_let_declaration_file = None

    try:
        EEB80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'EEB80_declaration' )
    except:  
        EEB80_declaration_file = None 
    try:
        other_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'other_declaration' )
    except:  
        other_declaration_file = None
    try:
        TTA80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'TTA80_declaration' )
    except:  
        TTA80_declaration_file = None 
    try:
        C80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'C80_declaration' )
    except:  
        C80_declaration_file = None 

    try:
        Ded80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'Ded80_declaration' )
    except:  
        Ded80_declaration_file = None 

    try:
        hra_hl_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'hra_hl_declaration' )
    except:  
        hra_hl_declaration_file = None 
    
    

    try:
        dec_files = declaration_files.objects.filter(empid=emp_user)
        enum_dec_files = [(index + 1, file) for index, file in enumerate(dec_files)]
    except:
        dec_files = None
        enum_dec_files = None
    
    CarDeclaration1 = CarDeclaration.objects.filter(empid=emp_user)
    if CarDeclaration1:
        prevcar = CarDeclaration1.last()
    else:
        prevcar = None

    


    current_date = date.today()
    

    lendername = LoanlendersDetails.objects.all()

    illnesses = illnesstypes.objects.all()

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        taxdec =TaxDeclaration1.last()
    else:
        taxdec = None
    
    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

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

    if saved_hra:
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


    total_80c = 0
    if saved_80C_deduction:
        value_0 = 0
        value_1 = 0
        value_2 = 0
        value_3 = 0

        if saved_80C_deduction.paymentLifeInsurance:
            value_0 =saved_80C_deduction.paymentLifeInsurance

        if saved_80C_deduction.ppfContribution:
            value_1 =saved_80C_deduction.ppfContribution

        if saved_80C_deduction.tuitionFee:
            value_2 = saved_80C_deduction.tuitionFee

        if saved_80C_deduction.sukanyaSamriddhi:
            value_3 = saved_80C_deduction.sukanyaSamriddhi
            
        total_80c = value_0 + value_1 + value_2 + value_3
        

    total_80_other = 0
    parents_total = 0
    if saved_other80:
        
        medical_insurance = int(saved_other80.medical_insurance_self_mip) if saved_other80.medical_insurance_self_mip else int(0)
        medical_insurance_parents_mip = int(saved_other80.medical_insurance_parents_mip) if saved_other80.medical_insurance_parents_mip else int(0)
        medical_insurance_Senior_Citizen = int(saved_other80.medical_insurance_Senior_Citizen) if saved_other80.medical_insurance_Senior_Citizen else int(0)
        paymentDependent = int(saved_other80.paymentDependentDisability) if saved_other80.paymentDependentDisability else int(0)
        paymentSelf = int(saved_other80.paymentSelfDisability) if saved_other80.paymentSelfDisability else int(0) 
        treatment_ = int(saved_other80.treatment_value) if saved_other80.treatment_value else int(0) 
        interest_ = int(saved_other80.interest_education) if saved_other80.interest_education else int(0)

        parents_total = medical_insurance_parents_mip + medical_insurance_Senior_Citizen

        total_80_other = medical_insurance + medical_insurance_parents_mip + medical_insurance_Senior_Citizen + paymentDependent + paymentSelf + treatment_ + interest_
    
    return render(request, 'itproofsubmissions.html', {'data': data, 'total_rent':total_rent, 'taxdec':taxdec, 'filenames':filenames, 'enumerated_filenames':enumerated_filenames,
    'financial_year_start':financial_year_start, 'financial_year_end':financial_year_end, 'saved_basic':saved_basic, 'saved_hra':saved_hra,
    'current_time_date':current_time_date, 'edit_48_hrs':edit_48_hrs, 'lendername':lendername,  'illnesses':illnesses, 'regime':regime,
    'saved_Ilhp':saved_Ilhp, 'saved_other80':saved_other80, 'saved_80C_deduction':saved_80C_deduction, 'saved_previous_emp':saved_previous_emp,
    
    'rent_section':rent_section, 'pan_section':pan_section, 'SelfOccupied_file':SelfOccupied_file, 'Letout_file':Letout_file, 'file_80EE':file_80EE,
    'file_80EEA':file_80EEA, 'OTHER_file':OTHER_file, 'file_80D':file_80D, 'file_80DDB':file_80DDB, 'file_80E':file_80E,
    'file_80U':file_80U, 'file_80DD':file_80DD, 'file_80EEB':file_80EEB,  'file_80CCD':file_80CCD, 'file_80C_LIC':file_80C_LIC, 'file_80C_PODT':file_80C_PODT, 'file_80C_ULIP':file_80C_ULIP,
    'file_80C_NSC':file_80C_NSC, 'file_80C_NSC_INT':file_80C_NSC_INT, 'file_80C_PPF':file_80C_PPF, 'file_80C_principal':file_80C_principal, 'file_80C_Tution':file_80C_Tution,
    'file_80C_MF':file_80C_MF, 'file_80C_FD':file_80C_FD, 'file_80CCC':file_80CCC, 'file_80C_Sukanya':file_80C_Sukanya, 'PreviousEmpl_file':PreviousEmpl_file, 'current_date':current_date,
    'total_80c':total_80c, 'total_80_other':total_80_other, 'parents_total':parents_total, 'dec_files':dec_files, 'enum_dec_files':enum_dec_files, 'prevcar':prevcar, 'Annual_Value':Annual_Value, 'totaldeduction':totaldeduction,
    'income_loss_new':income_loss_new, 'hra_declaration_file':hra_declaration_file, 'ilhp_declaration_file':ilhp_declaration_file, 'ilhp_self_declaration_file':ilhp_self_declaration_file, 'ilhp_let_declaration_file':ilhp_let_declaration_file, 'EEB80_declaration_file':EEB80_declaration_file, 'other_declaration_file':other_declaration_file,
    'TTA80_declaration_file':TTA80_declaration_file, 'C80_declaration_file':C80_declaration_file, 'Ded80_declaration_file':Ded80_declaration_file, 'hra_hl_declaration_file':hra_hl_declaration_file, 'previous_day':previous_day.strftime('%d %b %Y')
    })


def itproofdisplay(request):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    empdoj_date = data.empdoj
    previous_day = empdoj_date - timedelta(days=1)
    
    try:
        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    except:
        saved_basic = None


    try:
        saved_hra = it_proof_hra.objects.get(empid=emp_user)               
    except:
        saved_hra = None
    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=emp_user)        
    except:
        saved_previous_emp = None

    
    # try:
    #     filenames = itprooffiles.objects.filter(empid=emp_user, file_status = 'submit').exclude(Q(section__startswith='resub1') | Q(section__startswith='resub2'))
    #     enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
    # except:
    #     filenames = None
    #     enumerated_filenames = None

    try:
        filenames = itprooffiles.objects.filter(empid=emp_user, file_status = 'submit')
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]
    except:
        filenames = None
        enumerated_filenames = None

    
            
    try:
        resub1_filenames = itprooffiles.objects.filter(empid=emp_user, file_status = 'submit', section__startswith='resub1_')
        enumerated_filenames_1 = [(index + 1, file) for index, file in enumerate(resub1_filenames)]
    except:
        resub1_filenames = None
        enumerated_filenames_1 = None
    
    try:
        resub2_filenames = itprooffiles.objects.filter(empid=emp_user, file_status = 'submit', section__startswith='resub2_')
        enumerated_filenames_2 = [(index + 1, file) for index, file in enumerate(resub2_filenames)]
    except:
        resub2_filenames = None
        enumerated_filenames_2 = None

    try:
        dec_files = declaration_files.objects.filter(empid=emp_user)
        enum_dec_files = [(index + 1, file) for index, file in enumerate(dec_files)]
    except:
        dec_files = None
        enum_dec_files = None
    
    resub_1_6_d = None
    if saved_basic.verL2Date:
        resub_1_6_d= saved_basic.verL2Date + timedelta(hours=144, minutes=00)


    resub_2_6_d = None
    if saved_basic.ver2Date:
        resub_2_6_d= saved_basic.ver2Date + timedelta(hours=144, minutes=00)

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)    
    
    total_rent_1 = 0
    total_rent_2 = 0
    total_rent_3 = 0
    total_rent_4 = 0
    total_rent_5 = 0

    # ILHP:
    self_occupied = 0
    let_out = 0
    municipa_total = 0
    let_home_total = 0 
    let_income_total = 0
    standard_total = 0

    ee80_loan = 0
    ee80_property = 0
    ee80_home = 0
    eea80_total = 0

    other_income_total = 0
    tta80_total = 0



    # 80 other
    total_80ded_1 = 0 
    total_80ded_2 = 0 
    total_80ded_3 = 0 
    total_80ded_4 = 0  

    
    treatment_total = 0
    total_education = 0
    depend_total = 0
    self_dis_total = 0
    vehicle_total = 0
    total_80ccd = 0

    # 80C 

    c80_1 = 0
    c80_2 = 0
    c80_3 = 0
    c80_4 = 0
    c80_5 = 0
    c80_6 = 0
    c80_7 = 0
    c80_8 = 0
    c80_9 = 0
    c80_10 = 0
    c80_11 = 0
    c80_12 = 0

    # Previous

    prev_1 = 0
    prev_2 = 0
    prev_3 = 0
    prev_4 = 0


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
    
    if saved_hra:
        if saved_hra.itd1:      
            ita1 = saved_hra.ita1 if saved_hra.ita1 else int(0)
            ita1_2 = saved_hra.ita1_2 if saved_hra.ita1_2 else int(0)
            ita1_3 = saved_hra.ita1_3 if saved_hra.ita1_3 else int(0)

            total_rent_1 = ita1 + ita1_2 + ita1_3

            start_date = None
            end_date = None

            if saved_hra.ita1stdt:
                start_date = saved_hra.ita1stdt
                end_date = saved_hra.ita1enddt

            if start_date and end_date:
                date_difference = end_date - start_date
                line1_count = date_difference.days
                line1_count_result = (line1_count * total_rent_1)/30            
        
        if saved_hra.itd2:                

            ita2 = saved_hra.ita2 if saved_hra.ita2 else int(0)
            ita2_2 = saved_hra.ita2_2 if saved_hra.ita2_2 else int(0)
            ita2_3 = saved_hra.ita2_3 if saved_hra.ita2_3 else int(0)

            total_rent_2 = ita2 + ita2_2 + ita2_3

            start_date = None
            end_date = None

            if saved_hra.ita2stdt:
                start_date = saved_hra.ita2stdt
                end_date = saved_hra.ita2enddt
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line2_count = date_difference.days
                line2_count_result = (line2_count * total_rent_2)/30                              
            
        if saved_hra.itd3:                

            ita3 = saved_hra.ita3 if saved_hra.ita3 else int(0)
            ita3_2 = saved_hra.ita3_2 if saved_hra.ita3_2 else int(0)
            ita3_3 = saved_hra.ita3_3 if saved_hra.ita3_3 else int(0)


            total_rent_3 = ita3 + ita3_2 + ita3_3
            
            start_date = None
            end_date = None

            if saved_hra.ita3stdt:
                start_date = saved_hra.ita3stdt
                end_date = saved_hra.ita3enddt
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line3_count = date_difference.days
                line3_count_result = (line3_count * total_rent_3)/30               
        
        if saved_hra.itd4:                

            ita4 = saved_hra.ita4 if saved_hra.ita4 else int(0)
            ita4_2 = saved_hra.ita4_2 if saved_hra.ita4_2 else int(0)
            ita4_3 = saved_hra.ita4_3 if saved_hra.ita4_3 else int(0)


            total_rent_4 = ita4 + ita4_2 + ita4_3

            start_date = None
            end_date = None

            if saved_hra.ita4stdt:
                start_date = saved_hra.ita4stdt
                end_date = saved_hra.ita4enddt
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line4_count = date_difference.days
                line4_count_result = (line4_count * total_rent_4)/30    
            
        if saved_hra.itd5:                

            ita5 = saved_hra.ita5 if saved_hra.ita5 else int(0)
            ita5_2 = saved_hra.ita5_2 if saved_hra.ita5_2 else int(0)
            ita5_3 = saved_hra.ita5_3 if saved_hra.ita5_3 else int(0)

            total_rent_5 = ita5 + ita5_2 + ita5_3

            start_date = None
            end_date = None

            if saved_hra.ita5stdt:
                start_date = saved_hra.ita5stdt
                end_date = saved_hra.ita5enddt
                
            if start_date and end_date:
                date_difference = end_date - start_date
                line5_count = date_difference.days
                line5_count_result = (line5_count * total_rent_5)/30             
        
    total_rent = line1_count_result + line2_count_result + line3_count_result + line4_count_result + line5_count_result

    total_rent = round(total_rent) 

            
    if saved_Ilhp:
        if saved_Ilhp.selfOccupiedHouseProperty:

            allowed_self = saved_Ilhp.allowed_self if saved_Ilhp.allowed_self else int(0)
            allowed_self_2 = saved_Ilhp.allowed_self_2 if saved_Ilhp.allowed_self_2 else int(0)
            allowed_self_3 = saved_Ilhp.allowed_self_3 if saved_Ilhp.allowed_self_3 else int(0)

            self_occupied = allowed_self + allowed_self_2 + allowed_self_3
        
        if saved_Ilhp.annualLettableValue:      

            allowed_annualLettableValue = saved_Ilhp.allowed_annualLettableValue if saved_Ilhp.allowed_annualLettableValue else int(0)
            allowed_annualLettableValue_2 = saved_Ilhp.allowed_annualLettableValue_2 if saved_Ilhp.allowed_annualLettableValue_2 else int(0)
            allowed_annualLettableValue_3 = saved_Ilhp.allowed_annualLettableValue_3 if saved_Ilhp.allowed_annualLettableValue_3 else int(0)

            let_out =allowed_annualLettableValue + allowed_annualLettableValue_2 + allowed_annualLettableValue_3                
            
            allowed_municipalPropertyTax = saved_Ilhp.allowed_municipalPropertyTax if saved_Ilhp.allowed_municipalPropertyTax else int(0)
            allowed_municipalPropertyTax_2 = saved_Ilhp.allowed_municipalPropertyTax_2 if saved_Ilhp.allowed_municipalPropertyTax_2 else int(0)
            allowed_municipalPropertyTax_3 = saved_Ilhp.allowed_municipalPropertyTax_3 if saved_Ilhp.allowed_municipalPropertyTax_3 else int(0)

            municipa_total = allowed_municipalPropertyTax + allowed_municipalPropertyTax_2 + allowed_municipalPropertyTax_3

            allowed_homeLoanInterest = saved_Ilhp.allowed_homeLoanInterest if saved_Ilhp.allowed_homeLoanInterest else int(0)
            allowed_homeLoanInterest_2 = saved_Ilhp.allowed_homeLoanInterest_2 if saved_Ilhp.allowed_homeLoanInterest_2 else int(0)
            allowed_homeLoanInterest_3 = saved_Ilhp.allowed_homeLoanInterest_3 if saved_Ilhp.allowed_homeLoanInterest_3 else int(0)

            
            let_home_total = allowed_homeLoanInterest + allowed_homeLoanInterest_2 + allowed_homeLoanInterest_3

            allowed_incomeLossOnHouseProperty = saved_Ilhp.allowed_incomeLossOnHouseProperty if saved_Ilhp.allowed_incomeLossOnHouseProperty else int(0)
            allowed_incomeLossOnHouseProperty_2 = saved_Ilhp.allowed_incomeLossOnHouseProperty_2 if saved_Ilhp.allowed_incomeLossOnHouseProperty_2 else int(0)
            allowed_incomeLossOnHouseProperty_3 = saved_Ilhp.allowed_incomeLossOnHouseProperty_3 if saved_Ilhp.allowed_incomeLossOnHouseProperty_3 else int(0)
            
            let_income_total = allowed_incomeLossOnHouseProperty + allowed_incomeLossOnHouseProperty_2 + allowed_incomeLossOnHouseProperty_3
            

            allowed_standardDeduction = saved_Ilhp.allowed_standardDeduction if saved_Ilhp.allowed_standardDeduction else int(0)
            allowed_standardDeduction_2 = saved_Ilhp.allowed_standardDeduction_2 if saved_Ilhp.allowed_standardDeduction_2 else int(0)
            allowed_standardDeduction_3 = saved_Ilhp.allowed_standardDeduction_3 if saved_Ilhp.allowed_standardDeduction_3 else int(0)

            standard_total = allowed_standardDeduction + allowed_standardDeduction_2 + allowed_standardDeduction_3

        if saved_Ilhp.loan_amount:

            allowed_loan_amount = saved_Ilhp.allowed_loan_amount if saved_Ilhp.allowed_loan_amount else int(0)
            allowed_loan_amount_2 = saved_Ilhp.allowed_loan_amount_2 if saved_Ilhp.allowed_loan_amount_2 else int(0)
            allowed_loan_amount_3 = saved_Ilhp.allowed_loan_amount_3 if saved_Ilhp.allowed_loan_amount_3 else int(0)


            ee80_loan = allowed_loan_amount + allowed_loan_amount_2 + allowed_loan_amount_3

            allowed_property_value = saved_Ilhp.allowed_property_value if saved_Ilhp.allowed_property_value else int(0)
            allowed_property_value_2 = saved_Ilhp.allowed_property_value_2 if saved_Ilhp.allowed_property_value_2 else int(0)
            allowed_property_value_3 = saved_Ilhp.allowed_property_value_3 if saved_Ilhp.allowed_property_value_3 else int(0)
           
            ee80_property =  allowed_property_value + allowed_property_value_2 + allowed_property_value_3

            allowed_home_loan = saved_Ilhp.allowed_home_loan if saved_Ilhp.allowed_home_loan else int(0)
            allowed_home_loan_2 = saved_Ilhp.allowed_home_loan_2 if saved_Ilhp.allowed_home_loan_2 else int(0)
            allowed_home_loan_3 = saved_Ilhp.allowed_home_loan_3 if saved_Ilhp.allowed_home_loan_3 else int(0)
           
            ee80_home =  allowed_home_loan + allowed_home_loan_2 + allowed_home_loan_3
        
        if saved_Ilhp.property_value_other:

            allowed_property_value_other = saved_Ilhp.allowed_property_value_other if saved_Ilhp.allowed_property_value_other else int(0)
            allowed_property_value_other_2 = saved_Ilhp.allowed_property_value_other_2 if saved_Ilhp.allowed_property_value_other_2 else int(0)
            allowed_property_value_other_3 = saved_Ilhp.allowed_property_value_other_3 if saved_Ilhp.allowed_property_value_other_3 else int(0)

            eea80_total = allowed_property_value_other + allowed_property_value_other_2 + allowed_property_value_other_3
        
        if saved_Ilhp.other_income_oi:

            allowed_other_income_oi = saved_Ilhp.allowed_other_income_oi if saved_Ilhp.allowed_other_income_oi else int(0)
            allowed_other_income_oi_2 = saved_Ilhp.allowed_other_income_oi_2 if saved_Ilhp.allowed_other_income_oi_2 else int(0)
            allowed_other_income_oi_3 = saved_Ilhp.allowed_other_income_oi_3 if saved_Ilhp.allowed_other_income_oi_3 else int(0)

            other_income_total = allowed_other_income_oi + allowed_other_income_oi_2 + allowed_other_income_oi_3
        
        if saved_Ilhp.interest_80tta:

            allowed_interest_80tta = saved_Ilhp.allowed_interest_80tta if saved_Ilhp.allowed_interest_80tta else int(0)
            allowed_interest_80tta_2 = saved_Ilhp.allowed_interest_80tta_2 if saved_Ilhp.allowed_interest_80tta_2 else int(0)
            allowed_interest_80tta_3 = saved_Ilhp.allowed_interest_80tta_3 if saved_Ilhp.allowed_interest_80tta_3 else int(0)


            tta80_total = allowed_interest_80tta + allowed_interest_80tta_2 + allowed_interest_80tta_3

    if saved_other80:
        if saved_other80.medical_insurance_self_mip:

            allowed_medical_insurance = saved_other80.allowed_medical_insurance if saved_other80.allowed_medical_insurance else int(0)
            allowed_medical_insurance_2 = saved_other80.allowed_medical_insurance_2 if saved_other80.allowed_medical_insurance_2 else int(0)
            allowed_medical_insurance_3 = saved_other80.allowed_medical_insurance_3 if saved_other80.allowed_medical_insurance_3 else int(0)

            total_80ded_1 = allowed_medical_insurance + allowed_medical_insurance_2 + allowed_medical_insurance_3
        
        if saved_other80.medical_insurance_parents_mip:

            allowed_parents_mip_nsn = saved_other80.allowed_parents_mip_nsn if saved_other80.allowed_parents_mip_nsn else int(0)
            allowed_parents_mip_nsn_2 = saved_other80.allowed_parents_mip_nsn_2 if saved_other80.allowed_parents_mip_nsn_2 else int(0)
            allowed_parents_mip_nsn_3 = saved_other80.allowed_parents_mip_nsn_3 if saved_other80.allowed_parents_mip_nsn_3 else int(0)


            total_80ded_2 = allowed_parents_mip_nsn + allowed_parents_mip_nsn_2 + allowed_parents_mip_nsn_3

        if saved_other80.medical_insurance_Senior_Citizen:

            allowed_parents_mip_sn = saved_other80.allowed_parents_mip_sn if saved_other80.allowed_parents_mip_sn else int(0)
            allowed_parents_mip_sn_2 = saved_other80.allowed_parents_mip_sn_2 if saved_other80.allowed_parents_mip_sn_2 else int(0)
            allowed_parents_mip_sn_3 = saved_other80.allowed_parents_mip_sn_3 if saved_other80.allowed_parents_mip_sn_3 else int(0)


            total_80ded_3 = allowed_parents_mip_sn + allowed_parents_mip_sn_2 + allowed_parents_mip_sn_3
        
        if saved_other80.preventive_health_checkup_mip:

            allowed_health_checkup = saved_other80.allowed_health_checkup if saved_other80.allowed_health_checkup else int(0)
            allowed_health_checkup_2 = saved_other80.allowed_health_checkup_2 if saved_other80.allowed_health_checkup_2 else int(0)
            allowed_health_checkup_3 = saved_other80.allowed_health_checkup_3 if saved_other80.allowed_health_checkup_3 else int(0)

            total_80ded_4 = allowed_health_checkup + allowed_health_checkup_2 + allowed_health_checkup_3

        if saved_other80.treatment_value:

            allowed_treatment_value = saved_other80.allowed_treatment_value if saved_other80.allowed_treatment_value else int(0)
            allowed_treatment_value_2 = saved_other80.allowed_treatment_value_2 if saved_other80.allowed_treatment_value_2 else int(0)
            allowed_treatment_value_3 = saved_other80.allowed_treatment_value_3 if saved_other80.allowed_treatment_value_3 else int(0)

            treatment_total = allowed_treatment_value + allowed_treatment_value_2 + allowed_treatment_value_3

        if saved_other80.interest_education:

            allowed_interest_education = saved_other80.allowed_interest_education if saved_other80.allowed_interest_education else int(0)
            allowed_interest_education_2 = saved_other80.allowed_interest_education_2 if saved_other80.allowed_interest_education_2 else int(0)
            allowed_interest_education_3 = saved_other80.allowed_interest_education_3 if saved_other80.allowed_interest_education_3 else int(0)

            total_education = allowed_interest_education + allowed_interest_education_2 + allowed_interest_education_3

        if saved_other80.paymentDependentDisability:

            allowed_Dependent_dis = saved_other80.allowed_Dependent_dis if saved_other80.allowed_Dependent_dis else int(0)
            allowed_Dependent_dis_2 = saved_other80.allowed_Dependent_dis_2 if saved_other80.allowed_Dependent_dis_2 else int(0)
            allowed_Dependent_dis_3 = saved_other80.allowed_Dependent_dis_3 if saved_other80.allowed_Dependent_dis_3 else int(0)


            depend_total = allowed_Dependent_dis + allowed_Dependent_dis_2 + allowed_Dependent_dis_3
        
        if saved_other80.paymentSelfDisability:

            allowed_self_dis = saved_other80.allowed_self_dis if saved_other80.allowed_self_dis else int(0)
            allowed_self_dis_2 = saved_other80.allowed_self_dis_2 if saved_other80.allowed_self_dis_2 else int(0)
            allowed_self_dis_3 = saved_other80.allowed_self_dis_3 if saved_other80.allowed_self_dis_3 else int(0)


            self_dis_total = allowed_self_dis + allowed_self_dis_2 + allowed_self_dis_3
        
        if saved_other80.vehicle_loan_80eeb:

            allowed_vehicle_value = saved_other80.allowed_vehicle_value if saved_other80.allowed_vehicle_value else int(0)
            allowed_vehicle_value_2 = saved_other80.allowed_vehicle_value_2 if saved_other80.allowed_vehicle_value_2 else int(0)
            allowed_vehicle_value_3 = saved_other80.allowed_vehicle_value_3 if saved_other80.allowed_vehicle_value_3 else int(0)

            vehicle_total = allowed_vehicle_value + allowed_vehicle_value_2 + allowed_vehicle_value_3
        
        if saved_other80.nps_80ccd1b:

            allowed_nps_80ccd1b = saved_other80.allowed_nps_80ccd1b if saved_other80.allowed_nps_80ccd1b else int(0)
            allowed_nps_80ccd1b_2 = saved_other80.allowed_nps_80ccd1b_2 if saved_other80.allowed_nps_80ccd1b_2 else int(0)
            allowed_nps_80ccd1b_3 = saved_other80.allowed_nps_80ccd1b_3 if saved_other80.allowed_nps_80ccd1b_3 else int(0)


            total_80ccd = allowed_nps_80ccd1b + allowed_nps_80ccd1b_2 + allowed_nps_80ccd1b_3

    if saved_80C_deduction:

        if saved_80C_deduction.paymentLifeInsurance:

            allowed_paymentLifeInsurance = saved_80C_deduction.allowed_paymentLifeInsurance if saved_80C_deduction.allowed_paymentLifeInsurance else int(0)
            allowed_paymentLifeInsurance_2 = saved_80C_deduction.allowed_paymentLifeInsurance_2 if saved_80C_deduction.allowed_paymentLifeInsurance_2 else int(0)
            allowed_paymentLifeInsurance_3 = saved_80C_deduction.allowed_paymentLifeInsurance_3 if saved_80C_deduction.allowed_paymentLifeInsurance_3 else int(0)


            c80_1 = allowed_paymentLifeInsurance + allowed_paymentLifeInsurance_2 + allowed_paymentLifeInsurance_3

        if saved_80C_deduction.timeDeposit:

            allowed_timeDeposit = saved_80C_deduction.allowed_timeDeposit if saved_80C_deduction.allowed_timeDeposit else int(0)
            allowed_timeDeposit_2 = saved_80C_deduction.allowed_timeDeposit_2 if saved_80C_deduction.allowed_timeDeposit_2 else int(0)
            allowed_timeDeposit_3 = saved_80C_deduction.allowed_timeDeposit_3 if saved_80C_deduction.allowed_timeDeposit_3 else int(0)

            c80_2 = allowed_timeDeposit + allowed_timeDeposit_2 + allowed_timeDeposit_3

        if saved_80C_deduction.ulipContribution:

            allowed_ulipContribution = saved_80C_deduction.allowed_ulipContribution if saved_80C_deduction.allowed_ulipContribution else int(0)
            allowed_ulipContribution_2 = saved_80C_deduction.allowed_ulipContribution_2 if saved_80C_deduction.allowed_ulipContribution_2 else int(0)
            allowed_ulipContribution_3 = saved_80C_deduction.allowed_ulipContribution_3 if saved_80C_deduction.allowed_ulipContribution_3 else int(0)


            c80_3 = allowed_ulipContribution + allowed_ulipContribution_2 + allowed_ulipContribution_3

        if saved_80C_deduction.nscSubscription:

            allowed_nscSubscription = saved_80C_deduction.allowed_nscSubscription if saved_80C_deduction.allowed_nscSubscription else int(0)
            allowed_nscSubscription_2 = saved_80C_deduction.allowed_nscSubscription_2 if saved_80C_deduction.allowed_nscSubscription_2 else int(0)
            allowed_nscSubscription_3 = saved_80C_deduction.allowed_nscSubscription_3 if saved_80C_deduction.allowed_nscSubscription_3 else int(0)


            c80_4 = allowed_nscSubscription + allowed_nscSubscription_2 + allowed_nscSubscription_3

        if saved_80C_deduction.nscInterest:

            allowed_nscInterest = saved_80C_deduction.allowed_nscInterest if saved_80C_deduction.allowed_nscInterest else int(0)
            allowed_nscInterest_2 = saved_80C_deduction.allowed_nscInterest_2 if saved_80C_deduction.allowed_nscInterest_2 else int(0)
            allowed_nscInterest_3 = saved_80C_deduction.allowed_nscInterest_3 if saved_80C_deduction.allowed_nscInterest_3 else int(0)


            c80_5 = allowed_nscInterest + allowed_nscInterest_2 + allowed_nscInterest_3

        if saved_80C_deduction.ppfContribution:

            allowed_ppfContribution = saved_80C_deduction.allowed_ppfContribution if saved_80C_deduction.allowed_ppfContribution else int(0)
            allowed_ppfContribution_2 = saved_80C_deduction.allowed_ppfContribution_2 if saved_80C_deduction.allowed_ppfContribution_2 else int(0)
            allowed_ppfContribution_3 = saved_80C_deduction.allowed_ppfContribution_3 if saved_80C_deduction.allowed_ppfContribution_3 else int(0)


            c80_6 = allowed_ppfContribution + allowed_ppfContribution_2 + allowed_ppfContribution_3

        if saved_80C_deduction.houseLoan:

            allowed_houseLoan = saved_80C_deduction.allowed_houseLoan if saved_80C_deduction.allowed_houseLoan else int(0)
            allowed_houseLoan_2 = saved_80C_deduction.allowed_houseLoan_2 if saved_80C_deduction.allowed_houseLoan_2 else int(0)
            allowed_houseLoan_3 = saved_80C_deduction.allowed_houseLoan_3 if saved_80C_deduction.allowed_houseLoan_3 else int(0)


            c80_7 = allowed_houseLoan + allowed_houseLoan_2 + allowed_houseLoan_3

        if saved_80C_deduction.tuitionFee:

            allowed_tuitionFee = saved_80C_deduction.allowed_tuitionFee if saved_80C_deduction.allowed_tuitionFee else int(0)
            allowed_tuitionFee_2 = saved_80C_deduction.allowed_tuitionFee_2 if saved_80C_deduction.allowed_tuitionFee_2 else int(0)
            allowed_tuitionFee_3 = saved_80C_deduction.allowed_tuitionFee_3 if saved_80C_deduction.allowed_tuitionFee_3 else int(0)


            c80_8 = allowed_tuitionFee + allowed_tuitionFee_2 + allowed_tuitionFee_3

        if saved_80C_deduction.mutualFundSubscription:

            allowed_mutualFundSubscription = saved_80C_deduction.allowed_mutualFundSubscription if saved_80C_deduction.allowed_mutualFundSubscription else int(0)
            allowed_mutualFundSubscription_2 = saved_80C_deduction.allowed_mutualFundSubscription_2 if saved_80C_deduction.allowed_mutualFundSubscription_2 else int(0)
            allowed_mutualFundSubscription_3 = saved_80C_deduction.allowed_mutualFundSubscription_3 if saved_80C_deduction.allowed_mutualFundSubscription_3 else int(0)


            c80_9 = allowed_mutualFundSubscription + allowed_mutualFundSubscription_2 + allowed_mutualFundSubscription_3

        if saved_80C_deduction.termDeposits:

            allowed_termDeposits = saved_80C_deduction.allowed_termDeposits if saved_80C_deduction.allowed_termDeposits else int(0)
            allowed_termDeposits_2 = saved_80C_deduction.allowed_termDeposits_2 if saved_80C_deduction.allowed_termDeposits_2 else int(0)
            allowed_termDeposits_3 = saved_80C_deduction.allowed_termDeposits_3 if saved_80C_deduction.allowed_termDeposits_3 else int(0)


            c80_10 = allowed_termDeposits + allowed_termDeposits_2 + allowed_termDeposits_3

        if saved_80C_deduction.pensionContribution:

            allowed_pensionContribution = saved_80C_deduction.allowed_pensionContribution if saved_80C_deduction.allowed_pensionContribution else int(0)
            allowed_pensionContribution_2 = saved_80C_deduction.allowed_pensionContribution_2 if saved_80C_deduction.allowed_pensionContribution_2 else int(0)
            allowed_pensionContribution_3 = saved_80C_deduction.allowed_pensionContribution_3 if saved_80C_deduction.allowed_pensionContribution_3 else int(0)


            c80_11 = allowed_pensionContribution + allowed_pensionContribution_2 + allowed_pensionContribution_3

        if saved_80C_deduction.sukanyaSamriddhi:

            allowed_sukanyaSamriddhi = saved_80C_deduction.allowed_sukanyaSamriddhi if saved_80C_deduction.allowed_sukanyaSamriddhi else int(0)
            allowed_sukanyaSamriddhi_2 = saved_80C_deduction.allowed_sukanyaSamriddhi_2 if saved_80C_deduction.allowed_sukanyaSamriddhi_2 else int(0)
            allowed_sukanyaSamriddhi_3 = saved_80C_deduction.allowed_sukanyaSamriddhi_3 if saved_80C_deduction.allowed_sukanyaSamriddhi_3 else int(0)

            c80_12 = allowed_sukanyaSamriddhi + allowed_sukanyaSamriddhi_2 + allowed_sukanyaSamriddhi_3

    if saved_previous_emp:

        if saved_previous_emp.salary_previousemp:

            if saved_previous_emp.allowed_salary_previousemp_3:
                prev_1 = saved_previous_emp.allowed_salary_previousemp_3
            elif saved_previous_emp.allowed_salary_previousemp_2:
                prev_1 = saved_previous_emp.allowed_salary_previousemp_2
            else:
                prev_1 = saved_previous_emp.allowed_salary_previousemp

        if saved_previous_emp.professional_tax:


            if saved_previous_emp.allowed_professional_tax_3:
                prev_2 = saved_previous_emp.allowed_professional_tax_3
            elif saved_previous_emp.allowed_professional_tax_2:
                prev_2 = saved_previous_emp.allowed_professional_tax_2
            else:
                prev_2 = saved_previous_emp.allowed_professional_tax


        if saved_previous_emp.provident_fund:

            if saved_previous_emp.allowed_provident_fund_3:
                prev_3 = saved_previous_emp.allowed_provident_fund_3
            elif saved_previous_emp.allowed_provident_fund_2:
                prev_3 = saved_previous_emp.allowed_provident_fund_2
            else:
                prev_3 = saved_previous_emp.allowed_provident_fund

        
        
        if saved_previous_emp.income_tax:

            if saved_previous_emp.allowed_income_tax_3:
                prev_4 = saved_previous_emp.allowed_income_tax_3
            elif saved_previous_emp.allowed_income_tax_2:
                prev_4 = saved_previous_emp.allowed_income_tax_2
            else:
                prev_4 = saved_previous_emp.allowed_income_tax


    return render(request, 'itproofdisplay.html', { 'data':data, 'previous_day':previous_day, 'saved_basic':saved_basic, 'saved_hra':saved_hra, 'saved_Ilhp':saved_Ilhp,
                                                   'saved_other80':saved_other80, 'saved_80C_deduction':saved_80C_deduction, 'saved_80C_deduction':saved_80C_deduction,
                                                   'saved_previous_emp':saved_previous_emp, 'filenames':filenames, 'enumerated_filenames':enumerated_filenames, 'resub1_filenames':resub1_filenames, 'enumerated_filenames_1':enumerated_filenames_1,
                                                   'resub2_filenames':resub2_filenames, 'enumerated_filenames_2':enumerated_filenames_2,
                                                   'dec_files':dec_files, 'enum_dec_files':enum_dec_files,
                                                   'total_rent_1':total_rent_1, 'total_rent_2':total_rent_2, 'total_rent_3':total_rent_3, 'total_rent_4':total_rent_4, 'total_rent_5':total_rent_5,
                                                   'self_occupied':self_occupied, 'let_out':let_out, 'municipa_total':municipa_total, 'let_home_total':let_home_total, 'let_income_total':let_income_total, 'standard_total':standard_total,
                                                   'ee80_loan':ee80_loan, 'ee80_property':ee80_property, 'ee80_home':ee80_home, 'eea80_total':eea80_total, 'other_income_total':other_income_total, 'tta80_total':tta80_total,
                                                   'total_80ded_1':total_80ded_1, 'total_80ded_2':total_80ded_2, 'total_80ded_3':total_80ded_3, 'total_80ded_4':total_80ded_4, 'treatment_total':treatment_total, 
                                                   'total_education':total_education, 'depend_total':depend_total, 'self_dis_total':self_dis_total, 'vehicle_total':vehicle_total, 'total_80ccd':total_80ccd,
                                                   'c80_1':c80_1, 'c80_2':c80_2, 'c80_3':c80_3, 'c80_4':c80_4, 'c80_5':c80_5, 'c80_6':c80_6,
                                                   'c80_7':c80_7, 'c80_8':c80_8, 'c80_9':c80_9, 'c80_10':c80_10, 'c80_11':c80_11, 'c80_12':c80_12,
                                                   'prev_1':prev_1, 'prev_2':prev_2, 'prev_3':prev_3, 'prev_4':prev_4,
                                                   'resub_1_6_d':resub_1_6_d, 'resub_2_6_d':resub_2_6_d, 'current_time_date':current_time_date, 
                                                   
                                                   'total_rent':total_rent})


def upload_rent_file(request):    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('rent_file'):
        rent_files = request.FILES.getlist('rent_file')

        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, rent_file in enumerate(rent_files, start=1):
            if rent_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(rent_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, rent_file in enumerate(rent_files, start=1):
            file_name, file_extension = os.path.splitext(rent_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(rent_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, rent_file in enumerate(rent_files, start=1):
            file_extension = rent_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='Rent')
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = rent_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_Rent_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Rent_1.{file_extension}"
            fs.save(original_filename1, rent_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
        
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='Rent',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )
        
        

        success_message = 'Files for Rent uploaded Successfully.'        
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')


def upload_pan_file(request):    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    # user_directory = os.path.join(settings.MEDIA_ROOT, emp_user)

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('pan_file'):
        pan_files = request.FILES.getlist('pan_file')
        fs = FileSystemStorage(location=user_directory)

        files_lst = []

        for index, pan_file in enumerate(pan_files, start=1):
            if pan_file.size > 4 * 1024 * 1024:  # 4MB in bytes
                files_lst.append(pan_file.name)

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, pan_file in enumerate(pan_files, start=1):
            file_name, file_extension = os.path.splitext(pan_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(pan_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, pan_file in enumerate(pan_files, start=1):
            file_extension = pan_file.name.split('.')[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='PAN')
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = pan_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_PAN_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}PAN_1.{file_extension}"
            fs.save(original_filename1, pan_file)

            name_parts = original_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]

            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section ='PAN',
                filename = original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
                
            )

        success_message = 'Files for PAN uploaded Successfully.'
        
        
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def file_table_display(request):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)

    filenames = itprooffiles.objects.filter(empid=emp_user)

    enumerated_filenames = [(index + 1, file) for index, file in enumerate(filenames)]

    return render(request, 'file_table_display.html', {'data':data, 'filenames':filenames, 'enumerated_filenames':enumerated_filenames})

def change_table_data(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    
    filenames = itprooffiles.objects.filter(empid=emp_user)

    if request.method == 'POST':

        for i in filenames:
            status_value = request.POST[i.filename]
            new_record = filenames.get(filename = i.filename)
            new_record.file_status = status_value
            new_record.save()

    return redirect('file_table_display')



def emp_12bb(request):    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    try:
        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    except:
        saved_basic = None
    try:
        saved_hra = it_proof_hra.objects.get(empid=emp_user)        
    except:
        saved_hra = None
    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=emp_user)        
    except:
        saved_previous_emp = None

    filenames = itprooffiles.objects.filter(empid=emp_user)

    current_date = date.today()

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

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

    context={'data':data,
             'saved_basic':saved_basic,
             'saved_hra':saved_hra,
             'saved_Ilhp':saved_Ilhp, 
             'saved_other80':saved_other80, 
             'saved_80C_deduction':saved_80C_deduction, 
             'saved_previous_emp':saved_previous_emp,
             'filenames':filenames,
             'financial_year_start':financial_year_start,
             'financial_year_end':financial_year_end,
             'total_rent':total_rent, 'line1_count_result':line1_count_result, 'line2_count_result':line2_count_result,
             'line3_count_result':line3_count_result, 'line4_count_result':line4_count_result, 'line5_count_result':line5_count_result }
    
    rendered_html = render_to_string('emp_12bb.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
    pdf_filename = f"{data.empid}.pdf"

    if not pdf.err:        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{pdf_filename}"'
        response.write(result.getvalue())
        return response
    else:
        # PDF generation failed, return error response
        return HttpResponse('Error generating PDF')
    

# 80c Deduction

def upload_80c_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    # user_directory = os.path.join(settings.MEDIA_ROOT, emp_user)

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)


    

    # Get the value of 'name' from the query parameters
    form_name = request.GET.get('name')
    

    if request.method == 'POST' and request.FILES.getlist('{}'.format(form_name)):        
        new80c_files = request.FILES.getlist('{}'.format(form_name))
        fs = FileSystemStorage(location=user_directory)
        
        sectionvalue = None

        if form_name == 'lifeInsurance_file':
            sectionvalue = '80C_LIC'

        elif form_name == 'postOfficeDeposit_file':
            sectionvalue = '80C_PODT'
        
        elif form_name == 'ulip_file':
            sectionvalue = '80C_ULIP'

        elif form_name == 'nscSubscription_file':
            sectionvalue = '80C_NSC'

        
        elif form_name == 'ppf_file':
            sectionvalue = '80C_PPF'

        elif form_name == 'houseLoan_file':
            sectionvalue = '80C_principal'

        elif form_name == 'tuitionFee_file':
            sectionvalue = '80C_Tution'
        
        elif form_name == 'mutualFund_file':
            sectionvalue = '80C_MF'

        elif form_name == 'termDeposit_file':
            sectionvalue = '80C_FD'
    
        elif form_name == 'sukanyaSamriddhi_file':
            sectionvalue = '80C_Sukanya'
            
        

        

        files_lst = []

        for index, new80c_file in enumerate(new80c_files, start=1): 
            if new80c_file.size > 4 * 1024 * 1024:  # 4MB in bytes
                files_lst.append(new80c_file.name)

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, new80c_file in enumerate(new80c_files, start=1):
            file_name, file_extension = os.path.splitext(new80c_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(new80c_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, new80c_file in enumerate(new80c_files, start=1):
            file_extension = new80c_file.name.split('.')[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')

                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = new80c_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+filename_parts[2]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+random_chars+filename_parts[1]+'_'+filename_parts[2]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_{sectionvalue}_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}{sectionvalue}_1.{file_extension}"
                
            fs.save(original_filename1, new80c_file)

            name_parts = original_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]

            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section =sectionvalue,
                filename = original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
                
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def upload_80c_file_r1(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    user_directory = os.path.join('static', 'media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    form_name = request.GET.get('name')

    if request.method == 'POST' and request.FILES.getlist('file_input'):
        new80c_files = request.FILES.getlist('file_input')
        fs = FileSystemStorage(location=user_directory)

        if form_name == 'lifeInsurance_file':
            sectionvalue = 'resub1_80C_LIC'

        elif form_name == 'postOfficeDeposit_file':
            sectionvalue = 'resub1_80C_PODT'
        
        elif form_name == 'ulip_file':
            sectionvalue = 'resub1_80C_ULIP'

        elif form_name == 'nscSubscription_file':
            sectionvalue = 'resub1_80C_NSC'
            
        elif form_name == 'ppf_file':
            sectionvalue = 'resub1_80C_PPF'

        elif form_name == 'houseLoan_file':
            sectionvalue = 'resub1_80C_principal'

        elif form_name == 'tuitionFee_file':
            sectionvalue = 'resub1_80C_Tution'
        
        elif form_name == 'mutualFund_file':
            sectionvalue = 'resub1_80C_MF'

        elif form_name == 'termDeposit_file':
            sectionvalue = 'resub1_80C_FD'
    
        elif form_name == 'sukanyaSamriddhi_file':
            sectionvalue = 'resub1_80C_Sukanya'
            
        
        files_lst = [f.name for f in new80c_files if f.size > 4 * 1024 * 1024]

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        extension_files_lst = [f.name for f in new80c_files if os.path.splitext(f.name)[-1].lower() not in ['.pdf', '.png', '.jpg']]

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        for new80c_file in new80c_files:
            file_extension = os.path.splitext(new80c_file.name)[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')                
                increasenumber = int(filename_parts[-1].split('.')[0]) + 1
                original_filename = f'{filename_parts[0]}_{filename_parts[1]}_{filename_parts[2]}_{filename_parts[3]}_{increasenumber}{file_extension}'
                original_filename1 = f'{filename_parts[0]}_{filename_parts[1]}{random_chars}_{filename_parts[2]}_{filename_parts[3]}_{increasenumber}{file_extension}'
            else:
                sectionvalue_parts = sectionvalue.split('_')
                original_filename = f"resub1_{emp_user}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_1{file_extension}"
                original_filename1 = f"resub1_{emp_user}{random_chars}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_1{file_extension}"

            fs.save(original_filename1, new80c_file)
            

            itprooffiles.objects.create(
                empid=emp_user,
                emppan=data.emppan,
                section=sectionvalue,
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                file_status="submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

def upload_80c_nsc_int_file_r1(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    user_directory = os.path.join('static', 'media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    form_name = request.GET.get('name')

    if request.method == 'POST' and request.FILES.getlist('file_input'):
        new80c_files = request.FILES.getlist('file_input')
        fs = FileSystemStorage(location=user_directory)
        
        sectionvalue = 'resub1_80C_NSC_INT'            
        
        files_lst = [f.name for f in new80c_files if f.size > 4 * 1024 * 1024]

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        extension_files_lst = [f.name for f in new80c_files if os.path.splitext(f.name)[-1].lower() not in ['.pdf', '.png', '.jpg']]

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        for new80c_file in new80c_files:
            file_extension = os.path.splitext(new80c_file.name)[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')            
                increasenumber = int(filename_parts[-1].split('.')[0]) + 1
                original_filename = f'{filename_parts[0]}_{filename_parts[1]}_{filename_parts[2]}_{filename_parts[3]}_{filename_parts[4]}_{increasenumber}{file_extension}'
                original_filename1 = f'{filename_parts[0]}_{filename_parts[1]}{random_chars}_{filename_parts[2]}_{filename_parts[3]}_{filename_parts[4]}_{increasenumber}{file_extension}'
            else:
                sectionvalue_parts = sectionvalue.split('_')
                original_filename = f"resub1_{emp_user}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_{sectionvalue_parts[3]}_1{file_extension}"
                original_filename1 = f"resub1_{emp_user}{random_chars}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_{sectionvalue_parts[3]}_1{file_extension}"

            fs.save(original_filename1, new80c_file)
            

            itprooffiles.objects.create(
                empid=emp_user,
                emppan=data.emppan,
                section=sectionvalue,
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                file_status="submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

def upload_all_file_r1(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    user_directory = os.path.join('static', 'media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    form_name = request.GET.get('name')

    if request.method == 'POST' and request.FILES.getlist('file_input'):
        new80c_files = request.FILES.getlist('file_input')
        fs = FileSystemStorage(location=user_directory)

        if form_name == 'rent_file':
            sectionvalue = 'resub1_Rent'

        elif form_name == 'pan_file':
            sectionvalue = 'resub1_PAN'
        
        elif form_name == 'selfOccupiedHouseProperty_file':
            sectionvalue = 'resub1_SelfOccupied'

        elif form_name == 'letOutProperty_file':
            sectionvalue = 'resub1_Letout'
            
        elif form_name == 'upload_80ee_file':
            sectionvalue = 'resub1_80EE'

        elif form_name == 'upload_80eea_file':
            sectionvalue = 'resub1_80EEA'

        elif form_name == 'annualLettableValue_oi_file':
            sectionvalue = 'resub1_OTHER'
        
        elif form_name == 'section80d_file':
            sectionvalue = 'resub1_80D'

        elif form_name == '_80ddb_file':
            sectionvalue = 'resub1_80DDB'
    
        elif form_name == '_80E_file':
            sectionvalue = 'resub1_80E'

        elif form_name == 'dependentDisability_fileUpload':
            sectionvalue = 'resub1_80DD'
        
        elif form_name == 'selfDisability_fileUpload':
            sectionvalue = 'resub1_80U'

        elif form_name == 'file_80eeb':
            sectionvalue = 'resub1_80EEB'
    
        elif form_name == 'nps_80ccd1b_file':
            sectionvalue = 'resub1_80CCD'

        elif form_name == 'pensionFunds_file':
            sectionvalue = 'resub1_80CCC'
    
        elif form_name == 'prev_emp_file':
            sectionvalue = 'resub1_PreviousEmployment'
            
        
        files_lst = [f.name for f in new80c_files if f.size > 4 * 1024 * 1024]

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        extension_files_lst = [f.name for f in new80c_files if os.path.splitext(f.name)[-1].lower() not in ['.pdf', '.png', '.jpg']]

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        for new80c_file in new80c_files:
            file_extension = os.path.splitext(new80c_file.name)[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')                
                increasenumber = int(filename_parts[-1].split('.')[0]) + 1
                original_filename = f'{filename_parts[0]}_{filename_parts[1]}_{filename_parts[2]}_{increasenumber}{file_extension}'
                original_filename1 = f'{filename_parts[0]}_{filename_parts[1]}{random_chars}_{filename_parts[2]}_{increasenumber}{file_extension}'
            else:
                sectionvalue_parts = sectionvalue.split('_')
                original_filename = f"resub1_{emp_user}_{sectionvalue_parts[1]}_1{file_extension}"
                original_filename1 = f"resub1_{emp_user}{random_chars}_{sectionvalue_parts[1]}_1{file_extension}"

            fs.save(original_filename1, new80c_file)
            

            itprooffiles.objects.create(
                empid=emp_user,
                emppan=data.emppan,
                section=sectionvalue,
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                file_status="submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def upload_80c_file_r2(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    user_directory = os.path.join('static', 'media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    form_name = request.GET.get('name')

    if request.method == 'POST' and request.FILES.getlist('file_input'):
        new80c_files = request.FILES.getlist('file_input')
        fs = FileSystemStorage(location=user_directory)

        if form_name == 'lifeInsurance_file':
            sectionvalue = 'resub2_80C_LIC'

        elif form_name == 'postOfficeDeposit_file':
            sectionvalue = 'resub2_80C_PODT'
        
        elif form_name == 'ulip_file':
            sectionvalue = 'resub2_80C_ULIP'

        elif form_name == 'nscSubscription_file':
            sectionvalue = 'resub2_80C_NSC'
            
        elif form_name == 'ppf_file':
            sectionvalue = 'resub2_80C_PPF'

        elif form_name == 'houseLoan_file':
            sectionvalue = 'resub2_80C_principal'

        elif form_name == 'tuitionFee_file':
            sectionvalue = 'resub2_80C_Tution'
        
        elif form_name == 'mutualFund_file':
            sectionvalue = 'resub2_80C_MF'

        elif form_name == 'termDeposit_file':
            sectionvalue = 'resub2_80C_FD'
    
        elif form_name == 'sukanyaSamriddhi_file':
            sectionvalue = 'resub2_80C_Sukanya'
            
        
        files_lst = [f.name for f in new80c_files if f.size > 4 * 1024 * 1024]

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        extension_files_lst = [f.name for f in new80c_files if os.path.splitext(f.name)[-1].lower() not in ['.pdf', '.png', '.jpg']]

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        for new80c_file in new80c_files:
            file_extension = os.path.splitext(new80c_file.name)[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')                
                increasenumber = int(filename_parts[-1].split('.')[0]) + 1
                original_filename = f'{filename_parts[0]}_{filename_parts[1]}_{filename_parts[2]}_{filename_parts[3]}_{increasenumber}{file_extension}'
                original_filename1 = f'{filename_parts[0]}_{filename_parts[1]}{random_chars}_{filename_parts[2]}_{filename_parts[3]}_{increasenumber}{file_extension}'
            else:
                sectionvalue_parts = sectionvalue.split('_')
                original_filename = f"resub2_{emp_user}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_1{file_extension}"
                original_filename1 = f"resub2_{emp_user}{random_chars}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_1{file_extension}"

            fs.save(original_filename1, new80c_file)
            

            itprooffiles.objects.create(
                empid=emp_user,
                emppan=data.emppan,
                section=sectionvalue,
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                file_status="submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

def upload_80c_nsc_int_file_r2(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    user_directory = os.path.join('static', 'media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    form_name = request.GET.get('name')

    if request.method == 'POST' and request.FILES.getlist('file_input'):
        new80c_files = request.FILES.getlist('file_input')
        fs = FileSystemStorage(location=user_directory)
        
        sectionvalue = 'resub2_80C_NSC_INT'            
        
        files_lst = [f.name for f in new80c_files if f.size > 4 * 1024 * 1024]

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        extension_files_lst = [f.name for f in new80c_files if os.path.splitext(f.name)[-1].lower() not in ['.pdf', '.png', '.jpg']]

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        for new80c_file in new80c_files:
            file_extension = os.path.splitext(new80c_file.name)[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')
                
                increasenumber = int(filename_parts[-1].split('.')[0]) + 1
                original_filename = f'{filename_parts[0]}_{filename_parts[1]}_{filename_parts[2]}_{filename_parts[3]}_{filename_parts[4]}_{increasenumber}{file_extension}'
                original_filename1 = f'{filename_parts[0]}_{filename_parts[1]}{random_chars}_{filename_parts[2]}_{filename_parts[3]}_{filename_parts[4]}_{increasenumber}{file_extension}'
            else:
                sectionvalue_parts = sectionvalue.split('_')
                original_filename = f"resub2_{emp_user}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_{sectionvalue_parts[3]}_1{file_extension}"
                original_filename1 = f"resub2_{emp_user}{random_chars}_{sectionvalue_parts[1]}_{sectionvalue_parts[2]}_{sectionvalue_parts[3]}_1{file_extension}"

            fs.save(original_filename1, new80c_file)
            

            itprooffiles.objects.create(
                empid=emp_user,
                emppan=data.emppan,
                section=sectionvalue,
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                file_status="submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

def upload_all_file_r2(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)
    user_directory = os.path.join('static', 'media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    form_name = request.GET.get('name')

    if request.method == 'POST' and request.FILES.getlist('file_input'):
        new80c_files = request.FILES.getlist('file_input')
        fs = FileSystemStorage(location=user_directory)

        if form_name == 'rent_file':
            sectionvalue = 'resub2_Rent'

        elif form_name == 'pan_file':
            sectionvalue = 'resub2_PAN'
        
        elif form_name == 'selfOccupiedHouseProperty_file':
            sectionvalue = 'resub2_SelfOccupied'

        elif form_name == 'letOutProperty_file':
            sectionvalue = 'resub2_Letout'
            
        elif form_name == 'upload_80ee_file':
            sectionvalue = 'resub2_80EE'

        elif form_name == 'upload_80eea_file':
            sectionvalue = 'resub2_80EEA'

        elif form_name == 'annualLettableValue_oi_file':
            sectionvalue = 'resub2_OTHER'
        
        elif form_name == 'section80d_file':
            sectionvalue = 'resub2_80D'

        elif form_name == '_80ddb_file':
            sectionvalue = 'resub2_80DDB'
    
        elif form_name == '_80E_file':
            sectionvalue = 'resub2_80E'

        elif form_name == 'dependentDisability_fileUpload':
            sectionvalue = 'resub2_80DD'
        
        elif form_name == 'selfDisability_fileUpload':
            sectionvalue = 'resub2_80U'

        elif form_name == 'file_80eeb':
            sectionvalue = 'resub2_80EEB'
    
        elif form_name == 'nps_80ccd1b_file':
            sectionvalue = 'resub2_80CCD'

        elif form_name == 'pensionFunds_file':
            sectionvalue = 'resub2_80CCC'
    
        elif form_name == 'prev_emp_file':
            sectionvalue = 'resub2_PreviousEmployment'
            
        
        files_lst = [f.name for f in new80c_files if f.size > 4 * 1024 * 1024]

        if files_lst:
            success_message = "File {} size is above 4MB".format(files_lst)
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        extension_files_lst = [f.name for f in new80c_files if os.path.splitext(f.name)[-1].lower() not in ['.pdf', '.png', '.jpg']]

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

        for new80c_file in new80c_files:
            file_extension = os.path.splitext(new80c_file.name)[-1].lower()

            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section=sectionvalue)
            if filenames:
                last_file_name = filenames.last().filename

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))

            if last_file_name:
                filename_parts = last_file_name.split('_')
                
                increasenumber = int(filename_parts[-1].split('.')[0]) + 1
                original_filename = f'{filename_parts[0]}_{filename_parts[1]}_{filename_parts[2]}_{increasenumber}{file_extension}'
                original_filename1 = f'{filename_parts[0]}_{filename_parts[1]}{random_chars}_{filename_parts[2]}_{increasenumber}{file_extension}'
            else:
                sectionvalue_parts = sectionvalue.split('_')
                original_filename = f"resub2_{emp_user}_{sectionvalue_parts[1]}_1{file_extension}"
                original_filename1 = f"resub2_{emp_user}{random_chars}_{sectionvalue_parts[1]}_1{file_extension}"

            fs.save(original_filename1, new80c_file)
            

            itprooffiles.objects.create(
                empid=emp_user,
                emppan=data.emppan,
                section=sectionvalue,
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                file_status="submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofdisplay.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def resub_1(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)

    saved_basic.sub2Date = timezone.now() + timedelta(hours=5, minutes=30)
    saved_basic.save()
    
    success_message = 'You have successfully submitted.'        
    return render(request, 'itproofdisplay.html', {'success_message':success_message})


def resub_2(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)

    saved_basic.sub3Date = timezone.now() + timedelta(hours=5, minutes=30)
    saved_basic.save()
    
    success_message = 'You have successfully submitted.'        
    return render(request, 'itproofdisplay.html', {'success_message':success_message})




def upload_80c_nsc_int_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('nscInterest_file'):
        nscInterest_files = request.FILES.getlist('nscInterest_file')

        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nscInterestfile in enumerate(nscInterest_files, start=1):
            if nscInterestfile.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nscInterestfile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nscInterestfile in enumerate(nscInterest_files, start=1):
            file_name, file_extension = os.path.splitext(nscInterestfile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nscInterestfile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nscInterestfile in enumerate(nscInterest_files, start=1):
            file_extension = nscInterestfile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80C_NSC_INT')
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
                                
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nscInterestfile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+filename_parts[2]+'_'+filename_parts[3]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+filename_parts[2]+'_'+filename_parts[3]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80C_NSC_INT_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80C_NSC_INT_1.{file_extension}"
            fs.save(original_filename1, nscInterestfile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80C_NSC_INT',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def upload_80ccc_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('pensionFunds_file'):
        pensionFunds_files = request.FILES.getlist('pensionFunds_file')

        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, pensionFundsfile in enumerate(pensionFunds_files, start=1):
            if pensionFundsfile.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(pensionFundsfile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, pensionFundsfile in enumerate(pensionFunds_files, start=1):
            file_name, file_extension = os.path.splitext(pensionFundsfile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(pensionFundsfile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, pensionFundsfile in enumerate(pensionFunds_files, start=1):
            file_extension = pensionFundsfile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80CCC')
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = pensionFundsfile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80CCC_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80CCC_1.{file_extension}"
            fs.save(original_filename1, pensionFundsfile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80CCC',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')





# 80ccd1b 
def upload_80ccd1b_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('nps_80ccd1b_file'):
        nps_80ccd1b_files = request.FILES.getlist('nps_80ccd1b_file')

        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(nps_80ccd1b_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(nps_80ccd1b_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(nps_80ccd1b_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80CCD')
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80CCD_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80CCD_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80CCD',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')





#income/loss from house property 

def upload_Self_occupied_file(request):

    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('selfOccupiedHouseProperty_file'):
        selfOccupiedHouseProperty_files = request.FILES.getlist('selfOccupiedHouseProperty_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(selfOccupiedHouseProperty_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='SelfOccupied') 
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_SelfOccupied_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}SelfOccupied_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='SelfOccupied',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )        

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

'''
try:
            saved_basic = it_proof_basic.objects.get(empid=emp_user)    
        except:
            saved_basic = None        
        try:
            saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
        except:
            saved_Ilhp = None

        fathername = request.POST.get('fathername')
        isyourpan = request.POST.get('isyourpan')
        

        if isyourpan == 'yes':
            isyourpan1 = True
        else:
            isyourpan1 = False

        
        if saved_basic:              
            saved_basic.fathername = fathername            
            saved_basic.isValidPAN = isyourpan1                              
            saved_basic.current_page = 2                            
            saved_basic.save()            
        else:            
            it_proof_basic_new = it_proof_basic(
                empid = emp_user,                
                userid = emp_user,                
                fathername = fathername,           
                isValidPAN = isyourpan1,  
                current_page = 2                
            )
            it_proof_basic_new.save()        

        self_date = request.POST.get('self_date')
        selfOccupiedHouseProperty = request.POST.get('selfOccupiedHouseProperty')
        selfHomeLoanLenderName = request.POST.get('selfHomeLoanLenderName')
        selfHomeLoanLenderPAN = request.POST.get('selfHomeLoanLenderPAN')
        otherselfHomeLoanLenderName = request.POST.get('otherselfHomeLoanLenderName')
        otherselfHomeLoanLenderPAN = request.POST.get('otherselfHomeLoanLenderPAN')

        if self_date:    
            self_date = datetime.strptime(self_date, "%Y-%m-%d")            
        else:        
            self_date = None   
        selfOccupiedHouseProperty = int(selfOccupiedHouseProperty) if selfOccupiedHouseProperty else int(0)   

        if saved_Ilhp:            
            saved_Ilhp.self_date = self_date
            saved_Ilhp.selfOccupiedHouseProperty = selfOccupiedHouseProperty
            saved_Ilhp.selfHomeLoanLenderName = selfHomeLoanLenderName
            saved_Ilhp.selfHomeLoanLenderPAN = selfHomeLoanLenderPAN
            saved_Ilhp.otherselfHomeLoanLenderName = otherselfHomeLoanLenderName
            saved_Ilhp.otherselfHomeLoanLenderPAN = otherselfHomeLoanLenderPAN
            saved_Ilhp.save()
        else:            
            it_proof_income_loss_new = it_proof_income_loss(                                    
                empid=emp_user,                
                self_date = self_date,
                selfOccupiedHouseProperty = selfOccupiedHouseProperty,
                selfHomeLoanLenderName = selfHomeLoanLenderName,
                selfHomeLoanLenderPAN = selfHomeLoanLenderPAN,
                otherselfHomeLoanLenderName = otherselfHomeLoanLenderName,
                otherselfHomeLoanLenderPAN = otherselfHomeLoanLenderPAN
            )
            it_proof_income_loss_new.save()
'''






def upload_letout_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('letOutProperty_file'):
        letOutProperty_files = request.FILES.getlist('letOutProperty_file')

        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(letOutProperty_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(letOutProperty_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(letOutProperty_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='Letout') 
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_Letout_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Letout_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='Letout',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

def upload_80EE_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    if request.method == 'POST' and request.FILES.getlist('upload_80ee_file'):
        upload_80ee_files = request.FILES.getlist('upload_80ee_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(upload_80ee_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes

                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(upload_80ee_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(upload_80ee_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80EE') 
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80EE_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80EE_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80EE',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')

def upload_80EEA_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('upload_80eea_file'):
        upload_80eea_files = request.FILES.getlist('upload_80eea_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(upload_80eea_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(upload_80eea_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(upload_80eea_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80EEA') 
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80EEA_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80EEA_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80EEA',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def upload_other_income_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('annualLettableValue_oi_file'):
        annualLettableValue_oi_files = request.FILES.getlist('annualLettableValue_oi_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, nps_80ccd1b_file in enumerate(annualLettableValue_oi_files, start=1):
            if nps_80ccd1b_file.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(nps_80ccd1b_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, nps_80ccd1b_file in enumerate(annualLettableValue_oi_files, start=1):
            file_name, file_extension = os.path.splitext(nps_80ccd1b_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(nps_80ccd1b_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, nps_80ccd1b_file in enumerate(annualLettableValue_oi_files, start=1):
            file_extension = nps_80ccd1b_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='OTHER')  
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = nps_80ccd1b_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_OTHER_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}OTHER_1.{file_extension}"
            fs.save(original_filename1, nps_80ccd1b_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='OTHER',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')


# def upload_80tta_file(request):
#     
#     emp_user = request.session.get('emp_user', None)

#     if not emp_user:
#         return HttpResponse('No User logged in')

#     data = EmployeeDetail.objects.get(empid=emp_user)

#     #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

#     user_directory = os.path.join('static','media', emp_user)

#     if not os.path.exists(user_directory):
#         os.makedirs(user_directory)
    
#     if request.method == 'POST' and request.FILES.getlist('_80tta_file'):
#         _80tta_files = request.FILES.getlist('_80tta_file')
            
#         fs = FileSystemStorage(location=user_directory)

#         large_files_lst = []

#         for index, _80ttafile in enumerate(_80tta_files, start=1):
#             if _80ttafile.size > 4 * 1024 * 1024:  # 4MB in bytes
#                 large_files_lst.append(_80ttafile.name)


#         if large_files_lst:

#             success_message = "File {} size is above 4MB".format(large_files_lst)
#             return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

#         extension_files_lst = []

#         for index, _80ttafile in enumerate(_80tta_files, start=1):
#             file_name, file_extension = os.path.splitext(_80ttafile.name)
#             file_extension = file_extension.lower()

#             # Check if file extension is allowed
#             if file_extension not in ['.pdf', '.png', '.jpg']:
#                 extension_files_lst.append(_80ttafile.name)

#         if extension_files_lst:
#             success_message = "Accept only .pdf, .png and .jpg formats."
#             return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

#         for index, _80ttafile in enumerate(_80tta_files, start=1):
#             file_extension = _80ttafile.name.split('.')[-1].lower()
#             last_file_name = None
#             filenames = itprooffiles.objects.filter(empid=emp_user, section='80TTA')   
#             if filenames:
#                 last_file_name = filenames.last().filename

            
#             random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
#             if last_file_name:
#                 filename_parts = last_file_name.split('_')
        
#                 filenumbers= filename_parts[-1].split('.')
#                 increasenumber = int(filenumbers[0])+1
#                 newfilename_parts = _80ttafile.name.split('.')
#                 original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
#                 original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
#             else:
#                 original_filename = f"{emp_user}_80TTA_1.{file_extension}"
#                 original_filename1 = f"{emp_user}{random_chars}80TTA_1.{file_extension}"
#             fs.save(original_filename1, _80ttafile)

#             name_parts = original_filename.split('_', 1)
#             new_name = name_parts[0]+random_chars+name_parts[-1]
            
#             itprooffiles.objects.create(
#                 empid=emp_user,
#                 emppan = data.emppan,
#                 section='80TTA',
#                 filename=original_filename,
#                 file_path = "~/media/" + emp_user + "/" + new_name,
#                 file_status = "submit",
#                 uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
#             )

#         success_message = 'File uploaded Successfully.'
#         return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

#     return HttpResponse('No files uploaded')




def upload_80d_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('section80d_file'):        
        section80d_files = request.FILES.getlist('section80d_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, section80dfile in enumerate(section80d_files, start=1):

            if section80dfile.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(section80dfile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, section80dfile in enumerate(section80d_files, start=1):
            file_name, file_extension = os.path.splitext(section80dfile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(section80dfile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, section80dfile in enumerate(section80d_files, start=1):
            
            file_extension = section80dfile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80D')   
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = section80dfile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80D_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80D_1.{file_extension}"
            fs.save(original_filename1, section80dfile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80D',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')


def upload_80ddb_file(request):    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('_80ddb_file'):        
        _80ddb_files = request.FILES.getlist('_80ddb_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, _80ddbfile in enumerate(_80ddb_files, start=1):

            if _80ddbfile.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(_80ddbfile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, _80ddbfile in enumerate(_80ddb_files, start=1):
            file_name, file_extension = os.path.splitext(_80ddbfile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(_80ddbfile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, _80ddbfile in enumerate(_80ddb_files, start=1):
            
            file_extension = _80ddbfile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80DDB')   
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = _80ddbfile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80DDB_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80DDB_1.{file_extension}"
            fs.save(original_filename1, _80ddbfile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80DDB',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')


def upload_80E_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('_80E_file'):
        
        _80E_files = request.FILES.getlist('_80E_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, _80Efile in enumerate(_80E_files, start=1):

            if _80Efile.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(_80Efile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, _80Efile in enumerate(_80E_files, start=1):
            file_name, file_extension = os.path.splitext(_80Efile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(_80Efile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, _80Efile in enumerate(_80E_files, start=1):
            
            file_extension = _80Efile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80E')   
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = _80Efile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80E_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80E_1.{file_extension}"
            fs.save(original_filename1, _80Efile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80E',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def upload_80DD_file(request):     
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('dependentDisability_fileUpload'):
        
        dependent_files = request.FILES.getlist('dependentDisability_fileUpload')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, dependentfile in enumerate(dependent_files, start=1):

            if dependentfile.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(dependentfile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, dependentfile in enumerate(dependent_files, start=1):
            file_name, file_extension = os.path.splitext(dependentfile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(dependentfile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, dependentfile in enumerate(dependent_files, start=1):
            
            file_extension = dependentfile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80DD')    
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = dependentfile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80DD_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80DD_1.{file_extension}"
            fs.save(original_filename1, dependentfile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80DD',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')



def upload_80eeb_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('file_80eeb'):
        
        file_80eeb_files = request.FILES.getlist('file_80eeb')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, file_80eeb_file in enumerate(file_80eeb_files, start=1):

            if file_80eeb_file.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(file_80eeb_file.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, file_80eeb_file in enumerate(file_80eeb_files, start=1):
            file_name, file_extension = os.path.splitext(file_80eeb_file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(file_80eeb_file.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, file_80eeb_file in enumerate(file_80eeb_files, start=1):
            
            file_extension = file_80eeb_file.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80EEB')     
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = file_80eeb_file.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80EEB_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80EEB_1.{file_extension}"
            fs.save(original_filename1, file_80eeb_file)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80EEB',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')




def upload_80U_file(request):    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('selfDisability_fileUpload'):        
        self_files = request.FILES.getlist('selfDisability_fileUpload')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, selffiles in enumerate(self_files, start=1):

            if selffiles.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(selffiles.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, selffiles in enumerate(self_files, start=1):
            file_name, file_extension = os.path.splitext(selffiles.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(selffiles.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, selffiles in enumerate(self_files, start=1):
            
            file_extension = selffiles.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='80U')    
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = selffiles.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_80U_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}80U_1.{file_extension}"
            fs.save(original_filename1, selffiles)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='80U',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')




def upload_prev_emp_file(request):
    
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    #user_directory = os.path.join(settings.MEDIA_ROOT, emp_user) 

    user_directory = os.path.join('static','media', emp_user)

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    
    if request.method == 'POST' and request.FILES.getlist('prev_emp_file'):
        
        prev_emp_files = request.FILES.getlist('prev_emp_file')
            
        fs = FileSystemStorage(location=user_directory)

        large_files_lst = []

        for index, prev_empfile in enumerate(prev_emp_files, start=1):

            if prev_empfile.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(prev_empfile.name)


        if large_files_lst:

            success_message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        extension_files_lst = []

        for index, prev_empfile in enumerate(prev_emp_files, start=1):
            file_name, file_extension = os.path.splitext(prev_empfile.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(prev_empfile.name)

        if extension_files_lst:
            success_message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

        for index, prev_empfile in enumerate(prev_emp_files, start=1):
            
            file_extension = prev_empfile.name.split('.')[-1].lower()
            last_file_name = None
            filenames = itprooffiles.objects.filter(empid=emp_user, section='PreviousEmployment')   
            if filenames:
                last_file_name = filenames.last().filename

            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
            if last_file_name:
                filename_parts = last_file_name.split('_')
        
                filenumbers= filename_parts[-1].split('.')
                increasenumber = int(filenumbers[0])+1
                newfilename_parts = prev_empfile.name.split('.')
                original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
                original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            else:
                original_filename = f"{emp_user}_PreviousEmployment_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}PreviousEmployment_1.{file_extension}"
            fs.save(original_filename1, prev_empfile)

            name_parts = original_filename.split('_', 1)
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            itprooffiles.objects.create(
                empid=emp_user,
                emppan = data.emppan,
                section='PreviousEmployment',
                filename=original_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                file_status = "submit",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30)
            )

        success_message = 'File uploaded Successfully.'
        return render(request, 'itproofsubmissions.html', {'data': data, 'success_message': success_message})

    return HttpResponse('No files uploaded')




def save_it_proof(request):

    
    
    success_message = ''
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    
    try:
        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    except:
        saved_basic = None
    try:
        saved_hra = it_proof_hra.objects.get(empid=emp_user)        
    except:
        saved_hra = None
    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=emp_user)        
    except:
        saved_previous_emp = None



    try:
        filenames = itprooffiles.objects.filter(empid=emp_user)
    except:
        filenames = None

    try:
        rent_section = itprooffiles.objects.filter(empid=emp_user, section = 'Rent', file_status = 'submit')
    except:
        rent_section = None
    try:
        pan_section = itprooffiles.objects.filter(empid=emp_user, section = 'PAN', file_status = 'submit')
    except:  
        pan_section = None

    
 
    try:
        rent_section_ignore = itprooffiles.objects.filter(empid=emp_user, section = 'Rent', file_status = 'ignore')
    except:
        rent_section_ignore = None
    try:
        pan_section_ignore = itprooffiles.objects.filter(empid=emp_user, section = 'PAN', file_status = 'ignore')
    except:  
        pan_section_ignore = None

    
    try:
        SelfOccupied_file = itprooffiles.objects.filter(empid=emp_user, section = 'SelfOccupied', file_status = 'submit')
    except:
        SelfOccupied_file = None

    try:
        SelfOccupied_file_ignore = itprooffiles.objects.filter(empid=emp_user, section = 'SelfOccupied', file_status = 'ignore')
    except:
        SelfOccupied_file_ignore = None

    try:
        Letout_file = itprooffiles.objects.filter(empid=emp_user, section = 'Letout', file_status = 'submit')
    except:  
        Letout_file = None

    try:
        Letout_file_ignore = itprooffiles.objects.filter(empid=emp_user, section = 'Letout', file_status = 'ignore')
    except:  
        Letout_file_ignore = None

    try:
        file_80EE = itprooffiles.objects.filter(empid=emp_user, section = '80EE', file_status = 'submit')
    except:
        file_80EE = None

    try:
        file_80EE_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80EE', file_status = 'ignore')
    except:
        file_80EE_ignore = None


    try:
        file_80EEA = itprooffiles.objects.filter(empid=emp_user, section = '80EEA', file_status = 'submit')
    except:  
        file_80EEA = None


    try:
        file_80EEA_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80EEA', file_status = 'ignore')
    except:  
        file_80EEA_ignore = None

    try:
        OTHER_file = itprooffiles.objects.filter(empid=emp_user, section = 'OTHER', file_status = 'submit')
    except:
        OTHER_file = None
    try:
        OTHER_file_ignore = itprooffiles.objects.filter(empid=emp_user, section = 'OTHER', file_status = 'ignore')
    except:
        OTHER_file_ignore = None


    
    # try:
    #     file_80TTA = itprooffiles.objects.filter(empid=emp_user, section = '80TTA', file_status = 'submit')
    # except:  
    #     file_80TTA = None 

    # try:
    #     file_80TTA_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80TTA', file_status = 'ignore')
    # except:  
    #     file_80TTA_ignore = None 

    try:
        file_80D = itprooffiles.objects.filter(empid=emp_user, section = '80D', file_status = 'submit')
    except:
        file_80D = None
    
    
    try:
        file_80D_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80D', file_status = 'ignore')
    except:
        file_80D_ignore = None

    

    try:
        file_80DDB = itprooffiles.objects.filter(empid=emp_user, section = '80DDB', file_status = 'submit')
    except:  
        file_80DDB = None


    try:
        file_80DDB_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80DDB', file_status = 'ignore')
    except:  
        file_80DDB_ignore = None

    try:
        file_80E = itprooffiles.objects.filter(empid=emp_user, section = '80E', file_status = 'submit')
    except:
        file_80E = None
    
    
    try:
        file_80E_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80E', file_status = 'ignore')
    except:
        file_80E_ignore = None

    try:
        file_80DD = itprooffiles.objects.filter(empid=emp_user, section = '80DD', file_status = 'submit')
    except:
        file_80DD = None


    try:
        file_80DD_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80DD', file_status = 'ignore')
    except:
        file_80DD_ignore = None

    try:
        file_80U = itprooffiles.objects.filter(empid=emp_user, section = '80U', file_status = 'submit')
    except:  
        file_80U = None
        
    try:
        file_80U_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80U', file_status = 'ignore')
    except:  
        file_80U_ignore = None
    
    try:
        file_80EEB = itprooffiles.objects.filter(empid=emp_user, section = '80EEB', file_status = 'submit')
    except:  
        file_80EEB = None 
    
    try:
        file_80EEB_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80EEB', file_status = 'ignore')
    except:  
        file_80EEB_ignore = None 

    try:
        file_80CCD = itprooffiles.objects.filter(empid=emp_user, section = '80CCD', file_status = 'submit')
    except:
        file_80CCD = None
    try:
        file_80CCD_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80CCD', file_status = 'ignore')
    except:
        file_80CCD_ignore = None


    try:
        file_80C_LIC = itprooffiles.objects.filter(empid=emp_user, section = '80C_LIC', file_status = 'submit')
    except:  
        file_80C_LIC = None
    try:
        file_80C_LIC_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_LIC', file_status = 'ignore')
    except:  
        file_80C_LIC_ignore = None


    try:
        file_80C_PODT= itprooffiles.objects.filter(empid=emp_user, section = '80C_PODT', file_status = 'submit')
    except:
        file_80C_PODT = None

    try:
        file_80C_PODT_ignore= itprooffiles.objects.filter(empid=emp_user, section = '80C_PODT', file_status = 'ignore')
    except:
        file_80C_PODT_ignore = None

    try:
        file_80C_ULIP = itprooffiles.objects.filter(empid=emp_user, section = '80C_ULIP', file_status = 'submit')
    except:  
        file_80C_ULIP = None
    
    try:
        file_80C_ULIP_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_ULIP', file_status = 'ignore')
    except:  
        file_80C_ULIP_ignore = None

    try:
        file_80C_NSC = itprooffiles.objects.filter(empid=emp_user, section = '80C_NSC', file_status = 'submit')
    except:
        file_80C_NSC = None
    
    try:
        file_80C_NSC_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_NSC', file_status = 'ignore')
    except:
        file_80C_NSC_ignore = None


    try:
        file_80C_NSC_INT = itprooffiles.objects.filter(empid=emp_user, section = '80C_NSC_INT', file_status = 'submit')
    except:  
        file_80C_NSC_INT = None    
    
    try:
        file_80C_NSC_INT_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_NSC_INT', file_status = 'ignore')
    except:  
        file_80C_NSC_INT_ignore = None    

    try:
        file_80C_PPF = itprooffiles.objects.filter(empid=emp_user, section = '80C_PPF', file_status = 'submit')
    except:
        file_80C_PPF = None
    
    try:
        file_80C_PPF_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_PPF', file_status = 'ignore')
    except:
        file_80C_PPF_ignore = None

    try:
        file_80C_principal = itprooffiles.objects.filter(empid=emp_user, section = '80C_principal', file_status = 'submit')
    except:  
        file_80C_principal = None
    
    try:
        file_80C_principal_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_principal', file_status = 'ignore')
    except:  
        file_80C_principal_ignore = None
        
    try:
        file_80C_Tution = itprooffiles.objects.filter(empid=emp_user, section = '80C_Tution', file_status = 'submit')
    except:
        file_80C_Tution = None
    
    try:
        file_80C_Tution_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_Tution', file_status = 'ignore')
    except:
        file_80C_Tution_ignore = None

    try:
        file_80C_MF = itprooffiles.objects.filter(empid=emp_user, section = '80C_MF', file_status = 'submit')
    except:  
        file_80C_MF = None
    try:
        file_80C_MF_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_MF', file_status = 'ignore')
    except:  
        file_80C_MF_ignore = None

    try:
        file_80C_FD = itprooffiles.objects.filter(empid=emp_user, section = '80C_FD', file_status = 'submit')
    except:
        file_80C_FD = None
    
    try:
        file_80C_FD_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_FD', file_status = 'ignore')
    except:
        file_80C_FD_ignore = None

    try:
        file_80CCC = itprooffiles.objects.filter(empid=emp_user, section = '80CCC', file_status = 'submit')
    except:  
        file_80CCC = None 
    try:
        file_80CCC_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80CCC', file_status = 'ignore')
    except:  
        file_80CCC_ignore = None 

    try:
        file_80C_Sukanya = itprooffiles.objects.filter(empid=emp_user, section = '80C_Sukanya', file_status = 'submit')
    except:
        file_80C_Sukanya = None
    try:
        file_80C_Sukanya_ignore = itprooffiles.objects.filter(empid=emp_user, section = '80C_Sukanya', file_status = 'ignore')
    except:
        file_80C_Sukanya_ignore = None

    try:
        PreviousEmpl_file = itprooffiles.objects.filter(empid=emp_user, section = 'PreviousEmployment', file_status = 'submit') 
    except:  
        PreviousEmpl_file = None

    try:
        PreviousEmpl_file_ignore = itprooffiles.objects.filter(empid=emp_user, section = 'PreviousEmployment', file_status = 'ignore') 
    except:  
        PreviousEmpl_file_ignore = None  

    
    try:
        hra_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'hra_declaration' )
    except:  
        hra_declaration_file = None 
    try:
        ilhp_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_declaration' )
    except:  
        ilhp_declaration_file = None
    try:
        ilhp_self_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_self_declaration' )
    except:  
        ilhp_self_declaration_file = None 
    try:
        ilhp_let_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_let_declaration' )
    except:  
        ilhp_let_declaration_file = None 
    try:
        EEB80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'EEB80_declaration' )
    except:  
        EEB80_declaration_file = None 
    try:
        other_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'other_declaration' )
    except:  
        other_declaration_file = None    
    try:
        ee80_declaration_file = declaration_files.objects.get(empid=emp_user, section = '80ee_declaration' )
    except:  
        ee80_declaration_file = None
    try:
        eea80_declaration_file = declaration_files.objects.get(empid=emp_user, section = '80eea_declaration' )
    except:  
        eea80_declaration_file = None

    try:
        TTA80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'TTA80_declaration' )
    except:  
        TTA80_declaration_file = None 
    try:
        C80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'C80_declaration' )
    except:  
        C80_declaration_file = None 
    
    try:
        Ded80_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'Ded80_declaration' )
    except:  
        Ded80_declaration_file = None 

    try:
        hra_hl_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'hra_hl_declaration' )
    except:  
        hra_hl_declaration_file = None 

    empdoj = data.empdoj
    current_date = date.today()

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)

    if request.method == 'POST':
        
        empid = request.POST.get('empid')
        empname = request.POST.get('empname')
        empemail = request.POST.get('empemail')
        fathername = request.POST.get('fathername')
        emppan = request.POST.get('emppan')
        isyourpan = request.POST.get('isyourpan')

         # Additional details
        place = request.POST.get('place')
        itproofcheck = request.POST.get('itproofcheck')


        if itproofcheck:
            if itproofcheck == 'true':
                itproofcheck = True
            else:
                itproofcheck = False
        else:
            itproofcheck = False

        if isyourpan == 'yes':
            isyourpan1 = True
        else:
            isyourpan1 = False

        
        change_files = False

        if filenames:
            for i in filenames:
                status_value = request.POST[i.filename.replace('.', '')] 
                new_record = filenames.get(filename = i.filename)
                # if new_record.file_status == 'submit':
                
                #     if status_value == 'ignore':
                #         change_files = True
                new_record.file_status = status_value
                
                new_record.save()
        
        

        if saved_basic:           
            saved_basic.fathername = fathername            
            saved_basic.isValidPAN = isyourpan1
            saved_basic.gender = data.gender
            saved_basic.CompanyName = data.Company_Name
            saved_basic.status = data.Status
            saved_basic.Place = place
            saved_basic.confirm_check = itproofcheck
            saved_basic.saveddate  = timezone.now() + timedelta(hours=5, minutes=30)
            saved_basic.current_page = None                            
            saved_basic.save()            
        else:
            it_proof_basic_new = it_proof_basic(
                empid = empid,
                userid = empid,
                empname = empname,
                mobno = data.empmobile, 
                emailid = empemail,
                fathername = fathername,
                pan = emppan,
                dob = data.empdob,
                doj = data.empdoj,
                isValidPAN = isyourpan1,
                gender = data.gender,
                CompanyName = data.Company_Name,
                status = data.Status,
                Place = place,
                confirm_check = itproofcheck,
                saveddate  = timezone.now() + timedelta(hours=5, minutes=30),
                current_page = None                            
            )
            it_proof_basic_new.save()

        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
        emp_basic_instance = it_proof_basic.objects.get(empid=empid)
  
        payingrent = request.POST.get('payingrent')
        ilhp = request.POST.get('ilhp')
        section80oi = request.POST.get('section80oi')
        section80tta = request.POST.get('section80tta')


        

        if payingrent == 'yes':            
    
            claimingHRA = request.POST.get('claimingHRA')
            changeHRA = request.POST.get('changeHRA')

            # Details for the first rented property
            LandlordPAN1 = request.POST.get('LandlordPAN1')
            StartDate1 = request.POST.get('StartDate1')
            EndDate1 = request.POST.get('EndDate1')
            MonthRent1 = request.POST.get('MonthRent1')

            Pincode1 = request.POST.get('Pincode1')
            cityType1 = request.POST.get('cityType1')
            lanlordName1 = request.POST.get('lanlordName1')
            landlordContact1 = request.POST.get('landlordContact1')
            landlordAddress1 = request.POST.get('landlordAddress1')
            rentedAddress1 = request.POST.get('rentedAddress1')

            # Details for the second rented property
            LandlordPAN2 = request.POST.get('LandlordPAN2')
            StartDate2 = request.POST.get('StartDate2')
            EndDate2 = request.POST.get('EndDate2')
            MonthRent2 = request.POST.get('MonthRent2')
            Pincode2 = request.POST.get('Pincode2')
            cityType2 = request.POST.get('cityType2')
            lanlordName2 = request.POST.get('lanlordName2')
            landlordContact2 = request.POST.get('landlordContact2')
            landlordAddress2 = request.POST.get('landlordAddress2')
            rentedAddress2 = request.POST.get('rentedAddress2')


            # Details for the third rented property
            LandlordPAN3 = request.POST.get('LandlordPAN3')
            StartDate3 = request.POST.get('StartDate3')
            EndDate3 = request.POST.get('EndDate3')
            MonthRent3 = request.POST.get('MonthRent3')
            Pincode3 = request.POST.get('Pincode3')
            cityType3 = request.POST.get('cityType3')
            lanlordName3 = request.POST.get('lanlordName3')
            landlordContact3 = request.POST.get('landlordContact3')
            landlordAddress3 = request.POST.get('landlordAddress3')
            rentedAddress3 = request.POST.get('rentedAddress3')

            # Details for the fourth rented property
            LandlordPAN4 = request.POST.get('LandlordPAN4')
            StartDate4 = request.POST.get('StartDate4')
            EndDate4 = request.POST.get('EndDate4')
            MonthRent4 = request.POST.get('MonthRent4')
            Pincode4 = request.POST.get('Pincode4')
            cityType4 = request.POST.get('cityType4')
            lanlordName4 = request.POST.get('lanlordName4')
            landlordContact4 = request.POST.get('landlordContact4')
            landlordAddress4 = request.POST.get('landlordAddress4')
            rentedAddress4 = request.POST.get('rentedAddress4')

            # Details for the fifth rented property
            LandlordPAN5 = request.POST.get('LandlordPAN5')
            StartDate5 = request.POST.get('StartDate5')
            EndDate5 = request.POST.get('EndDate5')
            MonthRent5 = request.POST.get('MonthRent5')
            Pincode5 = request.POST.get('Pincode5')
            cityType5 = request.POST.get('cityType5')
            lanlordName5 = request.POST.get('lanlordName5')
            landlordContact5 = request.POST.get('landlordContact5')
            landlordAddress5 = request.POST.get('landlordAddress5')
            rentedAddress5 = request.POST.get('rentedAddress5')

     
            if StartDate1:    
                StartDate1 = datetime.strptime(StartDate1, "%Y-%m-%d")            
            else:        
                StartDate1 = None
            if StartDate2:    
                StartDate2 = datetime.strptime(StartDate2, "%Y-%m-%d")            
            else:        
                StartDate2 = None
            if StartDate3:    
                StartDate3 = datetime.strptime(StartDate3, "%Y-%m-%d")    
            else:        
                StartDate3 = None
            if StartDate4:    
                StartDate4 = datetime.strptime(StartDate4, "%Y-%m-%d")          
            else:        
                StartDate4 = None
            if StartDate5:    
                StartDate5 = datetime.strptime(StartDate5, "%Y-%m-%d")            
            else:        
                StartDate5 = None    


            MonthRent1 = int(MonthRent1) if MonthRent1 else int(0)
            Pincode1 = int(Pincode1) if Pincode1 else None
            landlordContact1 = int(landlordContact1) if landlordContact1 else None

            MonthRent2 = int(MonthRent2) if MonthRent2 else int(0)
            Pincode2 = int(Pincode2) if Pincode2 else None
            landlordContact2 = int(landlordContact2) if landlordContact2 else None

            MonthRent3 = int(MonthRent3) if MonthRent3 else int(0)
            Pincode3 = int(Pincode3) if Pincode3 else None
            landlordContact3 = int(landlordContact3) if landlordContact3 else None

            MonthRent4 = int(MonthRent4) if MonthRent4 else int(0)
            Pincode4 = int(Pincode4) if Pincode4 else None
            landlordContact4 = int(landlordContact4) if landlordContact4 else None

            MonthRent5 = int(MonthRent5) if MonthRent5 else int(0)
            Pincode5 = int(Pincode5) if Pincode5 else None
            landlordContact5 = int(landlordContact5) if landlordContact5 else None


            if EndDate1:    
                EndDate1 = datetime.strptime(EndDate1, "%Y-%m-%d")
            else:        
                EndDate1 = None
            if EndDate2:    
                EndDate2 = datetime.strptime(EndDate2, "%Y-%m-%d")
            else:        
                EndDate2 = None
            if EndDate3:    
                EndDate3 = datetime.strptime(EndDate3, "%Y-%m-%d")
            else:        
                EndDate3 = None
            if EndDate4:    
                EndDate4 = datetime.strptime(EndDate4, "%Y-%m-%d")
            else:        
                EndDate4 = None            
            if EndDate5:    
                EndDate5 = datetime.strptime(EndDate5, "%Y-%m-%d")
            else:        
                EndDate5 = None

            if LandlordPAN1:
                LandlordPAN1 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN1)
            if LandlordPAN2:
                LandlordPAN2 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN2)
            if LandlordPAN3:
                LandlordPAN3 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN3)
            if LandlordPAN4:
                LandlordPAN4 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN4)
            if LandlordPAN5:
                LandlordPAN5 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN5)
            
            
            if saved_hra:               
                saved_hra.claimingHRA = claimingHRA
                saved_hra.changeHRA = changeHRA

                saved_hra.LandLordPan = LandlordPAN1
                saved_hra.itd1stdt = StartDate1
                saved_hra.itd1enddt = EndDate1
                saved_hra.itd1 = MonthRent1
                saved_hra.pincode1 = Pincode1
                saved_hra.city1 = cityType1
                saved_hra.landlordName = lanlordName1
                saved_hra.LandlordContact = landlordContact1
                saved_hra.LandlordAddress = landlordAddress1
                saved_hra.rentedAdd1 = rentedAddress1

                saved_hra.LandlordPan2 = LandlordPAN2
                saved_hra.itd2stdt = StartDate2
                saved_hra.itd2enddt = EndDate2
                saved_hra.itd2 = MonthRent2
                saved_hra.pincode2 = Pincode2
                saved_hra.city2 = cityType2
                saved_hra.LandlordName2 = lanlordName2
                saved_hra.LandlordContact2 = landlordContact2
                saved_hra.LandlordAdd2 = landlordAddress2
                saved_hra.rentedAdd2 = rentedAddress2

                saved_hra.LandlordPan3 = LandlordPAN3
                saved_hra.itd3stdt = StartDate3
                saved_hra.itd3enddt = EndDate3
                saved_hra.itd3 = MonthRent3
                saved_hra.pincode3 = Pincode3
                saved_hra.city3 = cityType3
                saved_hra.LandlordName3 = lanlordName3
                saved_hra.LandlordContact3 = landlordContact3
                saved_hra.LandlordAdd3 = landlordAddress3
                saved_hra.rentedAdd3 = rentedAddress3

                saved_hra.LandlordPan4 = LandlordPAN4
                saved_hra.itd4stdt = StartDate4
                saved_hra.itd4enddt = EndDate4
                saved_hra.itd4 = MonthRent4
                saved_hra.pincode4 = Pincode4
                saved_hra.city4 = cityType4
                saved_hra.LandlordName4 = lanlordName4
                saved_hra.LandlordContact4 = landlordContact4
                saved_hra.LandlordAdd4 = landlordAddress4
                saved_hra.rentedAdd4 = rentedAddress4

                saved_hra.LandlordPan5 = LandlordPAN5
                saved_hra.itd5stdt = StartDate5
                saved_hra.itd5enddt = EndDate5
                saved_hra.itd5 = MonthRent5
                saved_hra.pincode5 = Pincode5
                saved_hra.city5 = cityType5
                saved_hra.LandlordName5 = lanlordName5
                saved_hra.LandlordContact5 = landlordContact5
                saved_hra.LandlordAdd5 = landlordAddress5
                saved_hra.rentedAdd5 = rentedAddress5

                saved_hra.save()        
            else:
                it_proof_hra_new = it_proof_hra(
                    claimingHRA = claimingHRA,
                    changeHRA = changeHRA,

                    empid=emp_basic_instance,
                    LandLordPan = LandlordPAN1,
                    itd1stdt = StartDate1,
                    itd1enddt = EndDate1,
                    itd1 = MonthRent1,
                    pincode1 = Pincode1,
                    city1 = cityType1,
                    landlordName = lanlordName1,
                    LandlordContact = landlordContact1,
                    LandlordAddress = landlordAddress1,
                    rentedAdd1 = rentedAddress1,

                    LandlordPan2 = LandlordPAN2,
                    itd2stdt = StartDate2,
                    itd2enddt = EndDate2,
                    itd2 = MonthRent2,
                    pincode2 = Pincode2,
                    city2 = cityType2,
                    LandlordName2 = lanlordName2,
                    LandlordContact2 = landlordContact2,
                    LandlordAdd2 = landlordAddress2,
                    rentedAdd2 = rentedAddress2,    

                    LandlordPan3 = LandlordPAN3,
                    itd3stdt = StartDate3,
                    itd3enddt = EndDate3,
                    itd3 = MonthRent3,
                    pincode3 = Pincode3,
                    city3 = cityType3,
                    LandlordName3 = lanlordName3,
                    LandlordContact3 = landlordContact3,
                    LandlordAdd3 = landlordAddress3,
                    rentedAdd3 = rentedAddress3,

                    LandlordPan4 = LandlordPAN4,
                    itd4stdt = StartDate4,
                    itd4enddt = EndDate4,
                    itd4 = MonthRent4,
                    pincode4 = Pincode4,
                    city4 = cityType4,
                    LandlordName4 = lanlordName4,
                    LandlordContact4 = landlordContact4,
                    LandlordAdd4 = landlordAddress4,
                    rentedAdd4 = rentedAddress4,

                    LandlordPan5 = LandlordPAN5,
                    itd5stdt = StartDate5,
                    itd5enddt = EndDate5,
                    itd5 = MonthRent5,
                    pincode5 = Pincode5,
                    city5 = cityType5,
                    LandlordName5 = lanlordName5,
                    LandlordContact5 = landlordContact5,
                    LandlordAdd5 = landlordAddress5,
                    rentedAdd5 = rentedAddress5,

                    )
                it_proof_hra_new.save()

            
            if saved_hra:
                if pan_section_ignore and rent_section_ignore and not rent_section.exists() and not pan_section.exists():

                    payingrent = 'no'                                        
                    saved_hra.delete() 
                    saved_hra = None 
                    
                    if hra_declaration_file:                        
                        old_file_path = hra_declaration_file.file_path
                        parts_old_file_path = old_file_path.split('/')[-1]            
                        hra_declaration_file.delete()                        
                        full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                        if os.path.exists(full_old_file_path):
                            os.remove(full_old_file_path)

                    if hra_hl_declaration_file:                        
                        old_file_path = hra_hl_declaration_file.file_path
                        parts_old_file_path = old_file_path.split('/')[-1]            
                        hra_hl_declaration_file.delete()                        
                        full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                        if os.path.exists(full_old_file_path):
                            os.remove(full_old_file_path)

        else:
            if saved_hra:
                saved_hra.delete()

            # if rent_section:
            #     for i in rent_section:                
            #         old_file_path = i.file_path
            #         parts_old_file_path = old_file_path.split('/')[-1]            
            #         i.delete()                        
            #         full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            #         if os.path.exists(full_old_file_path):
            #             os.remove(full_old_file_path)
            # if rent_section_ignore:
            #     for i in rent_section_ignore:                
            #         old_file_path = i.file_path
            #         parts_old_file_path = old_file_path.split('/')[-1]            
            #         i.delete()                        
            #         full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            #         if os.path.exists(full_old_file_path):
            #             os.remove(full_old_file_path)
            # if pan_section:
            #     for i in pan_section:                
            #         old_file_path = i.file_path
            #         parts_old_file_path = old_file_path.split('/')[-1]            
            #         i.delete()                        
            #         full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            #         if os.path.exists(full_old_file_path):
            #             os.remove(full_old_file_path)
            # if pan_section_ignore:
            #     for i in pan_section_ignore:                
            #         old_file_path = i.file_path
            #         parts_old_file_path = old_file_path.split('/')[-1]            
            #         i.delete()                        
            #         full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            #         if os.path.exists(full_old_file_path):
            #             os.remove(full_old_file_path)                   
            # if hra_declaration_file:                        
            #     old_file_path = hra_declaration_file.file_path
            #     parts_old_file_path = old_file_path.split('/')[-1]            
            #     hra_declaration_file.delete()                        
            #     full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            #     if os.path.exists(full_old_file_path):
            #         os.remove(full_old_file_path)                
        
        
        

        other_income_oi_1 = None
        interest_80tta_1 = None
        
        self_date_1 = None
        selfOccupiedHouseProperty_1 = None 
        selfHomeLoanLenderName_1 = None
        selfHomeLoanLenderPAN_1 = None 
        otherselfHomeLoanLenderName_1 = None
        otherselfHomeLoanLenderPAN_1 = None

        annualLettableValue_1  = None
        municipalPropertyTax_1   = None
        homeLoanInterest_1 = None
        incomeLossOnHouseProperty_1 = None
        standardDeduction_1 = None
        loanLenderName_1 = None
        loanLenderPAN_1 = None
        otherloanLenderName_1 = None
        otherloanLenderPAN_1 = None

        loan_sanctioned_date_1 = None
        loan_amount_1 = None
        property_value_1  = None
        home_loan_1 = None
        loan_lender_1 = None
        otherloan_lender_1 = None
        lender_pan_1 = None
        otherlender_pan_1 = None
        loan_sanctioned_date_ee_1 = None
        op80eea_other_property_1  = None
        op80eea_other_property_new_1 = None
        property_value_other_1 = None
        op80eea_1 = None




        if section80oi == 'yes':
            other_income_oi = request.POST.get('other_income_oi')
            other_income_oi_1 = int(other_income_oi) if other_income_oi else int(0)
        
        if section80tta == 'yes':            
            interest_80tta = request.POST.get('interest_80tta')
            interest_80tta_1 = int(interest_80tta) if interest_80tta else int(0)


        
        if ilhp == 'yes':                       
            # Self-occupied house property details
            self_date = request.POST.get('self_date')
            selfOccupiedHouseProperty = request.POST.get('selfOccupiedHouseProperty')
            selfHomeLoanLenderName = request.POST.get('selfHomeLoanLenderName')
            selfHomeLoanLenderPAN = request.POST.get('selfHomeLoanLenderPAN')
            otherselfHomeLoanLenderName = request.POST.get('otherselfHomeLoanLenderName')
            otherselfHomeLoanLenderPAN = request.POST.get('otherselfHomeLoanLenderPAN')

            # Other house property details
            annualLettableValue = request.POST.get('annualLettableValue')
            municipalPropertyTax = request.POST.get('municipalPropertyTax')
            homeLoanInterest = request.POST.get('homeLoanInterest')
            incomeLossOnHouseProperty = request.POST.get('incomeLossOnHouseProperty')
            standardDeduction = request.POST.get('standardDeduction')
            loanLenderName = request.POST.get('loanLenderName')
            loanLenderPAN = request.POST.get('loanLenderPAN')
            otherloanLenderName = request.POST.get('otherloanLenderName')
            otherloanLenderPAN = request.POST.get('otherloanLenderPAN')

            # Loan details
            loan_sanctioned_date = request.POST.get('loan_sanctioned_date')
            loan_amount = request.POST.get('loan_amount')
            property_value = request.POST.get('property_value')
            home_loan = request.POST.get('home_loan')
            loan_lender = request.POST.get('loan_lender')
            lender_pan = request.POST.get('lender_pan')
            otherloan_lender = request.POST.get('otherloan_lender')
            otherlender_pan = request.POST.get('otherlender_pan')
                        
                    
                    
            # Additional loan details
            loan_sanctioned_date_ee = request.POST.get('loan_sanctioned_date_ee')
            op80eea_other_property = request.POST.get('op80eea_other_property')
            property_value_other = request.POST.get('property_value_other')
            op80eea = request.POST.get('op80eea')
            op80eea_other_property_new = request.POST.get('op80eea_other_property_new')
                     
            if self_date:    
                self_date = datetime.strptime(self_date, "%Y-%m-%d")            
            else:        
                self_date = None   
            selfOccupiedHouseProperty = int(selfOccupiedHouseProperty) if selfOccupiedHouseProperty else int(0)                
            annualLettableValue = int(annualLettableValue) if annualLettableValue else int(0)
            municipalPropertyTax = int(municipalPropertyTax) if municipalPropertyTax else int(0)
            homeLoanInterest = int(homeLoanInterest) if homeLoanInterest else int(0)
            incomeLossOnHouseProperty = int(incomeLossOnHouseProperty) if incomeLossOnHouseProperty else int(0)
            standardDeduction = int(standardDeduction) if standardDeduction else int(0)

            if loan_sanctioned_date:    
                loan_sanctioned_date = datetime.strptime(loan_sanctioned_date, "%Y-%m-%d")            
            else:        
                loan_sanctioned_date = None            
            loan_amount = int(loan_amount) if loan_amount else int(0)
            property_value = int(property_value) if property_value else int(0)
            home_loan = int(home_loan) if home_loan else int(0)

            if loan_amount == 0 and property_value == 0 and home_loan == 0:
                loan_sanctioned_date = None
                
            if loan_sanctioned_date_ee:    
                loan_sanctioned_date_ee = datetime.strptime(loan_sanctioned_date_ee, "%Y-%m-%d")            
            else:        
                loan_sanctioned_date_ee = None            

            
            if op80eea_other_property=='yes':
                op80eea_other_property = True
            elif op80eea_other_property=='no':
                op80eea_other_property = False
            else:
                op80eea_other_property = None
            
            

            property_value_other = int(property_value_other) if property_value_other else int(0)

            if property_value_other == 0:
                loan_sanctioned_date_ee = None 

            op80eea = True if op80eea=='yes' else False

            self_date_1 = self_date
            selfOccupiedHouseProperty_1 = selfOccupiedHouseProperty 
            selfHomeLoanLenderName_1 = selfHomeLoanLenderName
            selfHomeLoanLenderPAN_1 = selfHomeLoanLenderPAN 
            otherselfHomeLoanLenderName_1 = otherselfHomeLoanLenderName
            otherselfHomeLoanLenderPAN_1 = otherselfHomeLoanLenderPAN

            
            annualLettableValue_1 = annualLettableValue
            municipalPropertyTax_1 = municipalPropertyTax
            homeLoanInterest_1 = homeLoanInterest
            incomeLossOnHouseProperty_1 = incomeLossOnHouseProperty
            standardDeduction_1 = standardDeduction
            loanLenderName_1 = loanLenderName
            loanLenderPAN_1 = loanLenderPAN
            otherloanLenderName_1 = otherloanLenderName
            otherloanLenderPAN_1 = otherloanLenderPAN

            loan_sanctioned_date_1 = loan_sanctioned_date
            loan_amount_1 = loan_amount
            property_value_1 = property_value
            home_loan_1 = home_loan
            loan_lender_1 = loan_lender
            lender_pan_1 = lender_pan
            otherloan_lender_1 = otherloan_lender
            otherlender_pan_1 = otherlender_pan

            loan_sanctioned_date_ee_1 = loan_sanctioned_date_ee
            op80eea_other_property_1 = op80eea_other_property
            property_value_other_1 = property_value_other
            op80eea_1 = op80eea
        
            op80eea_other_property_new_1 = op80eea_other_property_new
           
            
            
            
            

        #New_tasks

        

    

        if section80oi == 'yes':
            if saved_Ilhp:
                if saved_Ilhp.other_income_oi:
                    if OTHER_file_ignore and not OTHER_file.exists():
                        other_income_oi_1 = None
                        section80oi = 'no'
                        interest_80tta_1 = None
                        section80tta = 'no'

                        # if file_80TTA.exists():
                        #     for i in file_80TTA:
                        #         i.file_status = 'ignore'
                        #         i.save()                            

                        if other_declaration_file:
                            old_file_path = other_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            other_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                        if TTA80_declaration_file:
                            old_file_path = TTA80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            TTA80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

        # if section80tta == 'yes':
        #     if saved_Ilhp:
        #         if saved_Ilhp.interest_80tta:
        #             if file_80TTA_ignore and not file_80TTA.exists():
        #                 interest_80tta_1 = None
        #                 section80tta = 'no'

        #                 if TTA80_declaration_file:
        #                     old_file_path = TTA80_declaration_file.file_path
        #                     parts_old_file_path = old_file_path.split('/')[-1]            
        #                     TTA80_declaration_file.delete()                        
        #                     full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
        #                     if os.path.exists(full_old_file_path):
        #                         os.remove(full_old_file_path)

        if ilhp == 'yes':
            if saved_Ilhp:
                if saved_Ilhp.selfOccupiedHouseProperty and saved_Ilhp.annualLettableValue == 0 :                    
                    if SelfOccupied_file_ignore and not SelfOccupied_file.exists():
                        self_date_1 = None
                        selfOccupiedHouseProperty_1 = None
                        selfHomeLoanLenderName_1 = None
                        selfHomeLoanLenderPAN_1 = None
                        otherselfHomeLoanLenderName_1 = None
                        otherselfHomeLoanLenderPAN_1= None

                        if ilhp_self_declaration_file:
                            saved_Ilhp.sole_join_owner_self = None
                            saved_Ilhp.name_joint_owner_slef = None
                            saved_Ilhp.relationship_self = None
                            saved_Ilhp.extent_income_tax_self = None
                            saved_Ilhp.is_house_self = None
                            saved_Ilhp.principal_loan_tax_self = None
                            saved_Ilhp.property_address_self = None
                            saved_Ilhp.barrow_date_self = None
                            saved_Ilhp.possession_date_self = None
                            saved_Ilhp.save()

                            old_file_path = ilhp_self_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            ilhp_self_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)
                            
                        if hra_hl_declaration_file:                        
                            old_file_path = hra_hl_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            hra_hl_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                elif saved_Ilhp.annualLettableValue and saved_Ilhp.selfOccupiedHouseProperty == 0:                    
                    if Letout_file_ignore and not Letout_file.exists():
                        annualLettableValue_1 = None
                        municipalPropertyTax_1 = None
                        homeLoanInterest_1 = None
                        incomeLossOnHouseProperty_1 = None
                        standardDeduction_1= None

                        loanLenderName_1 = None
                        loanLenderName_1 = None
                        loanLenderPAN_1 = None
                        otherloanLenderName_1 = None
                        otherloanLenderPAN_1= None
                                                
                        if ilhp_let_declaration_file:

                            saved_Ilhp.sole_join_owner_let = None
                            saved_Ilhp.name_joint_owner_let = None
                            saved_Ilhp.relationship_let = None
                            saved_Ilhp.extent_income_tax_let = None
                            saved_Ilhp.is_house_self = None
                            saved_Ilhp.principal_loan_tax_let = None
                            saved_Ilhp.property_address_let = None
                            saved_Ilhp.barrow_date_let = None
                            saved_Ilhp.possession_date_let = None
                            saved_Ilhp.save()

                            old_file_path = ilhp_let_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            ilhp_let_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)
                
                elif saved_Ilhp.selfOccupiedHouseProperty and saved_Ilhp.annualLettableValue:                    
                    if Letout_file_ignore and not Letout_file.exists():                        
                        annualLettableValue_1 = None
                        municipalPropertyTax_1 = None
                        homeLoanInterest_1 = None
                        incomeLossOnHouseProperty_1 = None
                        standardDeduction_1= None

                        loanLenderName_1 = None
                        loanLenderName_1 = None
                        loanLenderPAN_1 = None
                        otherloanLenderName_1 = None
                        otherloanLenderPAN_1= None

                        if ilhp_declaration_file:
                            saved_Ilhp.sole_join_owner_self = None
                            saved_Ilhp.name_joint_owner_slef = None
                            saved_Ilhp.relationship_self = None
                            saved_Ilhp.extent_income_tax_self = None
                            saved_Ilhp.is_house_self = None
                            saved_Ilhp.principal_loan_tax_self = None
                            saved_Ilhp.property_address_self = None
                            saved_Ilhp.barrow_date_self = None
                            saved_Ilhp.possession_date_self = None

                            saved_Ilhp.sole_join_owner_let = None
                            saved_Ilhp.name_joint_owner_let = None
                            saved_Ilhp.relationship_let = None
                            saved_Ilhp.extent_income_tax_let = None                            
                            saved_Ilhp.principal_loan_tax_let = None
                            saved_Ilhp.property_address_let = None
                            saved_Ilhp.barrow_date_let = None
                            saved_Ilhp.possession_date_let = None

                            saved_Ilhp.save()

                            old_file_path = ilhp_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            ilhp_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                            if saved_basic:
                                saved_basic.current_page = 2
                                saved_basic.save()

                    if SelfOccupied_file_ignore and not SelfOccupied_file.exists():  
                        self_date_1 = None                      
                        selfOccupiedHouseProperty_1 = None
                        selfHomeLoanLenderName_1 = None
                        selfHomeLoanLenderPAN_1 = None
                        otherselfHomeLoanLenderName_1 = None
                        otherselfHomeLoanLenderPAN_1= None

                        if ilhp_declaration_file:
                            saved_Ilhp.sole_join_owner_self = None
                            saved_Ilhp.name_joint_owner_slef = None
                            saved_Ilhp.relationship_self = None
                            saved_Ilhp.extent_income_tax_self = None
                            saved_Ilhp.is_house_self = None
                            saved_Ilhp.principal_loan_tax_self = None
                            saved_Ilhp.property_address_self = None
                            saved_Ilhp.barrow_date_self = None
                            saved_Ilhp.possession_date_self = None

                            saved_Ilhp.sole_join_owner_let = None
                            saved_Ilhp.name_joint_owner_let = None
                            saved_Ilhp.relationship_let = None
                            saved_Ilhp.extent_income_tax_let = None                            
                            saved_Ilhp.principal_loan_tax_let = None
                            saved_Ilhp.property_address_let = None
                            saved_Ilhp.barrow_date_let = None
                            saved_Ilhp.possession_date_let = None

                            saved_Ilhp.save()

                            old_file_path = ilhp_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            ilhp_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                            if saved_basic:
                                saved_basic.current_page = 2
                                saved_basic.save()

                if saved_Ilhp.loan_sanctioned_date:                                                             
                    if file_80EE_ignore and not file_80EE.exists():
                        loan_sanctioned_date_1 = None
                        loan_amount_1 = None
                        property_value_1 = None
                        home_loan_1 = None
                        loan_lender_1= None

                        lender_pan_1 = None
                        otherloan_lender_1 = None
                        otherlender_pan_1 = None   

                if saved_Ilhp.loan_sanctioned_date_ee:                                                             
                    if file_80EEA_ignore and not file_80EEA.exists():
                        loan_sanctioned_date_ee_1 = None
                        op80eea_other_property_1 = None
                        op80eea_other_property_new_1 = None
                        property_value_other_1 = None
                        op80eea_1 = None 
                
                
                if selfOccupiedHouseProperty_1 is None and annualLettableValue_1 is None and loan_sanctioned_date_1 is None and loan_sanctioned_date_ee_1 is None:
                    saved_Ilhp.delete()



        if section80oi == 'yes' or section80tta == 'yes' or ilhp == 'yes':
            if saved_Ilhp:   
                saved_Ilhp.self_date = self_date_1             
                saved_Ilhp.selfOccupiedHouseProperty = selfOccupiedHouseProperty_1
                saved_Ilhp.selfHomeLoanLenderName = selfHomeLoanLenderName_1
                saved_Ilhp.selfHomeLoanLenderPAN = selfHomeLoanLenderPAN_1
                saved_Ilhp.otherselfHomeLoanLenderName = otherselfHomeLoanLenderName_1
                saved_Ilhp.otherselfHomeLoanLenderPAN = otherselfHomeLoanLenderPAN_1

                saved_Ilhp.annualLettableValue = annualLettableValue_1
                saved_Ilhp.municipalPropertyTax = municipalPropertyTax_1
                saved_Ilhp.homeLoanInterest = homeLoanInterest_1
                saved_Ilhp.incomeLossOnHouseProperty = incomeLossOnHouseProperty_1
                saved_Ilhp.standardDeduction = standardDeduction_1
                saved_Ilhp.loanLenderName = loanLenderName_1
                saved_Ilhp.loanLenderPAN = loanLenderPAN_1
                saved_Ilhp.otherloanLenderName = otherloanLenderName_1
                saved_Ilhp.otherloanLenderPAN = otherloanLenderPAN_1


                saved_Ilhp.loan_sanctioned_date = loan_sanctioned_date_1
                saved_Ilhp.loan_amount = loan_amount_1
                saved_Ilhp.property_value = property_value_1
                saved_Ilhp.home_loan = home_loan_1
                saved_Ilhp.loan_lender = loan_lender_1
                saved_Ilhp.lender_pan = lender_pan_1
                saved_Ilhp.otherloan_lender = otherloan_lender_1
                saved_Ilhp.otherlender_pan = otherlender_pan_1

                saved_Ilhp.loan_sanctioned_date_ee = loan_sanctioned_date_ee_1
                saved_Ilhp.op80eea_other_property = op80eea_other_property_1
                saved_Ilhp.op80eea_other_property_new = op80eea_other_property_new_1
                saved_Ilhp.property_value_other = property_value_other_1
                saved_Ilhp.op80eea = op80eea_1

                saved_Ilhp.other_income_oi = other_income_oi_1
                saved_Ilhp.interest_80tta = interest_80tta_1
                
                saved_Ilhp.save()

            else:
                it_proof_income_loss_new = it_proof_income_loss(                                    
                    empid=emp_basic_instance,
                    
                    self_date = self_date_1,
                    selfOccupiedHouseProperty = selfOccupiedHouseProperty_1,
                    selfHomeLoanLenderName = selfHomeLoanLenderName_1,
                    selfHomeLoanLenderPAN = selfHomeLoanLenderPAN_1,
                    otherselfHomeLoanLenderName = otherselfHomeLoanLenderName_1,
                    otherselfHomeLoanLenderPAN = otherselfHomeLoanLenderPAN_1,
                
                    annualLettableValue = annualLettableValue_1,
                    municipalPropertyTax = municipalPropertyTax_1,
                    homeLoanInterest = homeLoanInterest_1,
                    incomeLossOnHouseProperty = incomeLossOnHouseProperty_1,
                    standardDeduction = standardDeduction_1,
                    loanLenderName = loanLenderName_1, 
                    loanLenderPAN = loanLenderPAN_1,
                    otherloanLenderName = otherloanLenderName_1,
                    otherloanLenderPAN = otherloanLenderPAN_1,

                    loan_sanctioned_date = loan_sanctioned_date_1,
                    loan_amount = loan_amount_1,
                    property_value = property_value_1,
                    home_loan = home_loan_1,
                    loan_lender = loan_lender_1, 
                    lender_pan = lender_pan_1,
                    otherloan_lender = otherloan_lender_1,
                    otherlender_pan = otherlender_pan_1,

                    loan_sanctioned_date_ee = loan_sanctioned_date_ee_1, 
                    op80eea_other_property = op80eea_other_property_1,
                    property_value_other = property_value_other_1,
                    op80eea = op80eea_1,
                    op80eea_other_property_new = op80eea_other_property_new_1,

                    other_income_oi = other_income_oi_1,
                    interest_80tta = interest_80tta_1

                    )
                it_proof_income_loss_new.save()
        else:
            if saved_Ilhp:
                saved_Ilhp.delete()

        
        selected_illness_1  = None
        citizenship_status_1  = None
        treatment_value_1 = None
        interest_education_1 = None

        medical_insurance_self_mip_1 = None
        medical_insurance_parents_mip_1 = None
        medical_insurance_Senior_Citizen_1 = None
        preventive_health_checkup_mip_1 = None

        paymentDependentDisability_1 = None
        paymentSelfDisability_1 = None

        loan_sanctioned_date_80eeb_1 = None
        vehicle_loan_80eeb_1 = None
        loan_lender_80eeb_1 = None
        lender_pan_80eeb_1 = None
        other80eebLender_1 = None
        other80eebPAN_1 = None
        section80ccdcontribution_1 = None
        nps_80ccd1b_1 = None
        prannumber_1 = None

        
        section80d = request.POST.get('section80d')
        if section80d == 'yes':
            
            selected_illness = request.POST.get('selected_illness')
            citizenship_status = request.POST.get('citizenship_status')
            treatment_value = request.POST.get('treatment_value')
            interest_education = request.POST.get('interest_education')


            selected_illness_1 = selected_illness
            citizenship_status_1 = citizenship_status                   
            treatment_value_1 = int(treatment_value) if treatment_value else int(0)
            
            interest_education_1 = int(interest_education) if interest_education else int(0)



            section80d_mip = request.POST['section80d_mip']
            if section80d_mip == 'yes':
                
                medical_insurance_self_mip = request.POST.get('medical_insurance_self_mip')
                medical_insurance_parents_mip = request.POST.get('medical_insurance_parents_mip')
                medical_insurance_Senior_Citizen = request.POST.get('medical_insurance_Senior_Citizen')
                preventive_health_checkup_mip = request.POST.get('preventive_health_checkup_mip')
                           
                medical_insurance_self_mip_1 = int(medical_insurance_self_mip) if medical_insurance_self_mip else int(0)
                medical_insurance_parents_mip_1 = int(medical_insurance_parents_mip) if medical_insurance_parents_mip else int(0)
                medical_insurance_Senior_Citizen_1 = int(medical_insurance_Senior_Citizen) if medical_insurance_Senior_Citizen else int(0)
                preventive_health_checkup_mip_1 = int(preventive_health_checkup_mip) if preventive_health_checkup_mip else int(0)


        
        section80udd = request.POST.get('section80udd')
        if section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both':
            
            paymentDependentDisability = request.POST.get('paymentDependentDisability')
            paymentSelfDisability = request.POST.get('paymentSelfDisability')

            paymentDependentDisability_1 = int(paymentDependentDisability) if paymentDependentDisability else None
            paymentSelfDisability_1 = int(paymentSelfDisability) if paymentSelfDisability else None

        
        section80ee_80eeb = request.POST.get('section80ee_80eeb')
        if section80ee_80eeb == 'yes':            
            
            loan_sanctioned_date_80eeb = request.POST.get('loan_sanctioned_date_80eeb')
            vehicle_loan_80eeb = request.POST.get('vehicle_loan_80eeb')    
            loan_lender_80eeb = request.POST.get('loan_lender_80eeb')
            lender_pan_80eeb = request.POST.get('lender_pan_80eeb')
            other80eebLender = request.POST.get('other80eebLender')
            other80eebPAN = request.POST.get('other80eebPAN')

            if loan_sanctioned_date_80eeb:    
                loan_sanctioned_date_80eeb_1 = datetime.strptime(loan_sanctioned_date_80eeb, "%Y-%m-%d")            
            else:        
                loan_sanctioned_date_80eeb_1 = None  

            vehicle_loan_80eeb_1 = int(vehicle_loan_80eeb) if vehicle_loan_80eeb else int(0)
            loan_lender_80eeb_1 = loan_lender_80eeb
            lender_pan_80eeb_1 = lender_pan_80eeb
            other80eebLender_1 = other80eebLender
            other80eebPAN_1 = other80eebPAN


        
        section80ccd = request.POST.get('section80ccd')
        if section80ccd == 'yes':
            
            section80ccdcontribution = request.POST.get('section80ccdcontribution')
            nps_80ccd1b = request.POST.get('nps_80ccd1b')
            prannumber = request.POST.get('prannumber')

            section80ccdcontribution_1 = section80ccdcontribution
            nps_80ccd1b_1 = int(nps_80ccd1b) if nps_80ccd1b else int(0)
            prannumber_1 = int(prannumber) if prannumber else int(0)
            

        if section80d == 'yes':
            if saved_other80:
                if section80d_mip == 'yes':
                    if saved_other80.medical_insurance_self_mip or saved_other80.medical_insurance_parents_mip or saved_other80.preventive_health_checkup_mip:
                        
                        if file_80D_ignore and not file_80D.exists():
                            medical_insurance_self_mip_1 = None                          
                            medical_insurance_parents_mip_1 = None
                            medical_insurance_Senior_Citizen_1 = None
                            preventive_health_checkup_mip_1 = None
                            saved_other80.mip_for = None
                            saved_other80.save()
                            section80d_mip = 'no'

                            if Ded80_declaration_file:
                                

                                old_file_path = Ded80_declaration_file.file_path
                                parts_old_file_path = old_file_path.split('/')[-1]            
                                Ded80_declaration_file.delete()                        
                                full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                                if os.path.exists(full_old_file_path):
                                    os.remove(full_old_file_path)

 
                if saved_other80.selected_illness:                        
                    if file_80DDB_ignore and not file_80DDB.exists():
                          
                        selected_illness_1 = None                          
                        citizenship_status_1 = None
                        treatment_value_1 = None  

                        saved_other80.critical_illness_for = None
                        saved_other80.save()                      

                        if Ded80_declaration_file:
                            

                            old_file_path = Ded80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            Ded80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 

 
                if saved_other80.interest_education:                        
                    if file_80E_ignore and not file_80E.exists():
                          
                        interest_education_1 = None 
                        saved_other80.education_loan_for = None
                        saved_other80.save()                                                                          

                        if Ded80_declaration_file:
                            

                            old_file_path = Ded80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            Ded80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 

            if medical_insurance_self_mip_1 is None and medical_insurance_parents_mip_1 is None and medical_insurance_Senior_Citizen_1 is None and preventive_health_checkup_mip_1 is None and selected_illness_1 is None and interest_education_1 is None:
                section80d = 'no'
        
        if section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both':
            if saved_other80:
                if saved_other80.paymentDependentDisability:
                     
                    if file_80DD_ignore and not file_80DD.exists():
                          
                        paymentDependentDisability_1 = None  

                        saved_other80.dependent_dis_for = None
                        saved_other80.save()                                                                       

                        if Ded80_declaration_file:
                            

                            old_file_path = Ded80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            Ded80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 

                if saved_other80.paymentSelfDisability:
                      
                    if file_80U_ignore and not file_80U.exists():
                          
                        paymentSelfDisability_1 = None                                                                         

                        if Ded80_declaration_file:
                            

                            old_file_path = Ded80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            Ded80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 
                if paymentDependentDisability_1 is None and paymentSelfDisability_1 is None:
                    section80udd = 'no'


        if section80ee_80eeb == 'yes':
            if saved_other80:
                if saved_other80.loan_sanctioned_date_80eeb:
                     
                    if file_80EEB_ignore and not file_80EEB.exists():                          
                       
                        loan_sanctioned_date_80eeb_1 = None
                        vehicle_loan_80eeb_1  = None
                        loan_lender_80eeb_1 = None
                        lender_pan_80eeb_1 = None
                        other80eebLender_1 = None
                        other80eebPAN_1 = None  

                        section80ee_80eeb = 'no'                      

                        if EEB80_declaration_file:
                            saved_basic.veh_reg_num = None
                            saved_basic.save()

                            old_file_path = EEB80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            EEB80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)
        
        if section80ccd == 'yes':
            if saved_other80:
                if saved_other80.section80ccdcontribution:
                      
                    if file_80CCD_ignore and not file_80CCD.exists():                          
                       
                        section80ccdcontribution_1 = None
                        nps_80ccd1b_1  = None
                        prannumber_1 = None
                        
                        section80ccd = 'no'                                                                      

        if section80d == 'yes' or section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both' or section80ee_80eeb == 'yes' or section80ccd == 'yes':
            if saved_other80:
                saved_other80.medical_insurance_self_mip = medical_insurance_self_mip_1
                saved_other80.medical_insurance_parents_mip = medical_insurance_parents_mip_1
                saved_other80.medical_insurance_Senior_Citizen = medical_insurance_Senior_Citizen_1
                saved_other80.preventive_health_checkup_mip = preventive_health_checkup_mip_1
                saved_other80.selected_illness = selected_illness_1
                saved_other80.citizenship_status = citizenship_status_1
                saved_other80.treatment_value = treatment_value_1
                saved_other80.interest_education = interest_education_1
                saved_other80.paymentDependentDisability = paymentDependentDisability_1
                
                saved_other80.paymentSelfDisability = paymentSelfDisability_1
                saved_other80.loan_sanctioned_date_80eeb = loan_sanctioned_date_80eeb_1
                saved_other80.vehicle_loan_80eeb = vehicle_loan_80eeb_1
                saved_other80.loan_lender_80eeb = loan_lender_80eeb_1
                saved_other80.lender_pan_80eeb = lender_pan_80eeb_1
                saved_other80.other80eebLender = other80eebLender_1
                saved_other80.other80eebPAN = other80eebPAN_1
                saved_other80.section80ccdcontribution = section80ccdcontribution_1
                saved_other80.nps_80ccd1b = nps_80ccd1b_1
                saved_other80.prannumber = prannumber_1
                saved_other80.save()
            else:
                it_proof_80_other_new = it_proof_80_other(
                    empid=emp_basic_instance,
                    medical_insurance_self_mip = medical_insurance_self_mip_1,
                    medical_insurance_parents_mip = medical_insurance_parents_mip_1,
                    medical_insurance_Senior_Citizen = medical_insurance_Senior_Citizen_1,
                    preventive_health_checkup_mip = preventive_health_checkup_mip_1,
                    selected_illness = selected_illness_1,
                    citizenship_status = citizenship_status_1,
                    treatment_value = treatment_value_1,
                    interest_education = interest_education_1,
                    paymentDependentDisability = paymentDependentDisability_1,
                    paymentSelfDisability = paymentSelfDisability_1,
                    loan_sanctioned_date_80eeb = loan_sanctioned_date_80eeb_1,
                    vehicle_loan_80eeb = vehicle_loan_80eeb_1,
                    loan_lender_80eeb = loan_lender_80eeb_1,
                    lender_pan_80eeb = lender_pan_80eeb_1,
                    other80eebLender = other80eebLender_1,
                    other80eebPAN = other80eebPAN_1,
                    section80ccdcontribution = section80ccdcontribution_1,
                    nps_80ccd1b = nps_80ccd1b_1,
                    prannumber = prannumber_1,
                )  


                it_proof_80_other_new.save()

        else:
            if saved_other80:
                saved_other80.delete()


        paymentLifeInsurance_1 = None
        timeDeposit_1 = None
        ulipContribution_1 = None
        nscSubscription_1 = None
        nscInterest_1 = None
        ppfContribution_1 = None
        houseLoan_1 = None
        tuitionFee_1 = None
        mutualFundSubscription_1 = None
        termDeposits_1 = None
        pensionContribution_1 = None
        sukanyaSamriddhi_1 = None


        
        section80C = request.POST.get('section80C')
        if section80C == 'yes':
        
            paymentLifeInsurance = request.POST.get('paymentLifeInsurance')
            timeDeposit = request.POST.get('timeDeposit')
            ulipContribution = request.POST.get('ulipContribution')
            nscSubscription = request.POST.get('nscSubscription')
            nscInterest = request.POST.get('nscInterest')
            ppfContribution = request.POST.get('ppfContribution')
            houseLoan = request.POST.get('houseLoan')
            tuitionFee = request.POST.get('tuitionFee')
            mutualFundSubscription = request.POST.get('mutualFundSubscription')
            termDeposits = request.POST.get('termDeposits')
            pensionContribution = request.POST.get('pensionContribution')
            sukanyaSamriddhi = request.POST.get('sukanyaSamriddhi')

            paymentLifeInsurance_1 = int(paymentLifeInsurance) if paymentLifeInsurance else None
            timeDeposit_1 = int(timeDeposit) if timeDeposit else None
            ulipContribution_1 = int(ulipContribution) if ulipContribution else None
            nscSubscription_1 = int(nscSubscription) if nscSubscription else None
            nscInterest_1 = int(nscInterest) if nscInterest else None
            ppfContribution_1 = int(ppfContribution) if ppfContribution else None
            houseLoan_1 = int(houseLoan) if houseLoan else None
            tuitionFee_1 = int(tuitionFee) if tuitionFee else None
            mutualFundSubscription_1 = int(mutualFundSubscription) if mutualFundSubscription else None
            termDeposits_1 = int(termDeposits) if termDeposits else None
            pensionContribution_1 = int(pensionContribution) if pensionContribution else None
            sukanyaSamriddhi_1 = int(sukanyaSamriddhi) if sukanyaSamriddhi else None

        if section80C == 'yes':
            if saved_80C_deduction:                
                if saved_80C_deduction.paymentLifeInsurance:                                                        
                    if file_80C_LIC_ignore and not file_80C_LIC.exists():  
                        paymentLifeInsurance_1 = None                      
                        saved_80C_deduction.paymentLifeInsurance = None
                        saved_80C_deduction.lic_for = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 

                
                if saved_80C_deduction.timeDeposit:                                                        
                    if file_80C_PODT_ignore and not file_80C_PODT.exists():  
                        timeDeposit_1 = None                      
                        saved_80C_deduction.timeDeposit = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.ulipContribution:                                                        
                    if file_80C_ULIP_ignore and not file_80C_ULIP.exists():  
                        ulipContribution_1 = None                      
                        saved_80C_deduction.ulipContribution = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.nscSubscription:                                                        
                    if file_80C_NSC_ignore and not file_80C_NSC.exists():  
                        nscSubscription_1 = None                      
                        saved_80C_deduction.nscSubscription = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                           

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)


                if saved_80C_deduction.nscInterest:                                                        
                    if file_80C_NSC_INT_ignore and not file_80C_NSC_INT.exists():  
                        nscInterest_1 = None                      
                        saved_80C_deduction.nscInterest = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.ppfContribution:                                                        
                    if file_80C_PPF_ignore and not file_80C_PPF.exists():  
                        ppfContribution_1 = None                      
                        saved_80C_deduction.ppfContribution = None
                        saved_80C_deduction.ppf_for = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            
                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.houseLoan:                                                        
                    if file_80C_principal_ignore and not file_80C_principal.exists():  
                        houseLoan_1 = None                      
                        saved_80C_deduction.houseLoan = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 
                
                if saved_80C_deduction.tuitionFee:                                                        
                    if file_80C_Tution_ignore and not file_80C_Tution.exists():  
                        tuitionFee_1 = None                      
                        saved_80C_deduction.tuitionFee = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.mutualFundSubscription:                                                        
                    if file_80C_MF_ignore and not file_80C_MF.exists():  
                        mutualFundSubscription_1 = None                      
                        saved_80C_deduction.mutualFundSubscription = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                           

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.termDeposits:                                                        
                    if file_80C_FD_ignore and not file_80C_FD.exists():  
                        termDeposits_1 = None                      
                        saved_80C_deduction.termDeposits = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            
                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.pensionContribution:                                                        
                    if file_80CCC_ignore and not file_80CCC.exists():  
                        pensionContribution_1 = None                      
                        saved_80C_deduction.pensionContribution = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path)

                if saved_80C_deduction.sukanyaSamriddhi:                                                        
                    if file_80C_Sukanya_ignore and not file_80C_Sukanya.exists():  
                        sukanyaSamriddhi_1 = None                      
                        saved_80C_deduction.sukanyaSamriddhi = None
                        saved_80C_deduction.save()

                        if C80_declaration_file:
                            

                            old_file_path = C80_declaration_file.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]            
                            C80_declaration_file.delete()                        
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 

                if paymentLifeInsurance_1 is None and timeDeposit_1 is None and ulipContribution_1 is None and nscSubscription_1 is None and nscInterest_1 is None and ppfContribution_1 is None and houseLoan_1 is None and tuitionFee_1 is None and mutualFundSubscription_1 is None and termDeposits_1 is None and pensionContribution_1 is None and sukanyaSamriddhi_1 is None :
                    section80C = 'no'


        if section80C == 'yes':
            if saved_80C_deduction:
                saved_80C_deduction.paymentLifeInsurance = paymentLifeInsurance_1
                saved_80C_deduction.timeDeposit = timeDeposit_1
                saved_80C_deduction.ulipContribution = ulipContribution_1
                saved_80C_deduction.nscSubscription = nscSubscription_1
                saved_80C_deduction.nscInterest = nscInterest_1
                saved_80C_deduction.ppfContribution = ppfContribution_1
                saved_80C_deduction.houseLoan = houseLoan_1
                saved_80C_deduction.tuitionFee = tuitionFee_1
                saved_80C_deduction.mutualFundSubscription = mutualFundSubscription_1
                saved_80C_deduction.termDeposits = termDeposits_1
                saved_80C_deduction.pensionContribution = pensionContribution_1
                saved_80C_deduction.sukanyaSamriddhi = sukanyaSamriddhi_1
                saved_80C_deduction.save()
            else:
                it_proof_80C_Contribution_new = it_proof_80C_Contribution(
                    empid=emp_basic_instance,
                    paymentLifeInsurance = paymentLifeInsurance_1,
                    timeDeposit = timeDeposit_1,
                    ulipContribution = ulipContribution_1,
                    nscSubscription = nscSubscription_1,
                    nscInterest = nscInterest_1,
                    ppfContribution = ppfContribution_1,
                    houseLoan = houseLoan_1,
                    tuitionFee = tuitionFee_1,
                    mutualFundSubscription = mutualFundSubscription_1,
                    termDeposits = termDeposits_1,
                    pensionContribution = pensionContribution_1,
                    sukanyaSamriddhi = sukanyaSamriddhi_1
                )
                it_proof_80C_Contribution_new.save()                        
        else:
            if saved_80C_deduction:
                saved_80C_deduction.delete()

            
        
        if financial_year_start <= empdoj <= financial_year_end:    

            salary_previousemp_1 = None
            provident_fund_1 = None
            professional_tax_1 = None
            income_tax_1 = None

            section_previousemp = request.POST.get('section_previousemp')
            if section_previousemp == 'yes':                

                salary_previousemp = request.POST.get('salary_previousemp')
                provident_fund = request.POST.get('provident_fund')
                professional_tax = request.POST.get('professional_tax')
                income_tax = request.POST.get('income_tax')

                salary_previousemp_1 = int(salary_previousemp) if salary_previousemp else int(0)
                provident_fund_1 = int(provident_fund) if provident_fund else int(0)
                professional_tax_1 = int(professional_tax) if professional_tax else int(0)
                income_tax_1 = int(income_tax) if income_tax else int(0)

            
            if section_previousemp == 'yes':
                if saved_previous_emp:
                    if saved_previous_emp.salary_previousemp:                                                                          
                        if PreviousEmpl_file_ignore and not PreviousEmpl_file.exists():  
                            salary_previousemp_1 = None
                            provident_fund_1 = None
                            professional_tax_1 = None
                            income_tax_1 = None  
                            section_previousemp = 'no'                                                
                            saved_previous_emp.delete()

            if section_previousemp == 'yes':
                if saved_previous_emp:
                    saved_previous_emp.salary_previousemp = salary_previousemp_1
                    saved_previous_emp.provident_fund = provident_fund_1
                    saved_previous_emp.professional_tax = professional_tax_1
                    saved_previous_emp.income_tax = income_tax_1
                    saved_previous_emp.save()
                else:
                    it_proof_previousemp_new = it_proof_previousemp(
                        empid=emp_basic_instance,
                        salary_previousemp = salary_previousemp_1,
                        provident_fund = provident_fund_1,
                        professional_tax = professional_tax_1,
                        income_tax = income_tax_1
                    )
                    it_proof_previousemp_new.save()

            else:
                if saved_previous_emp:
                    saved_previous_emp.delete()

        

        # if (change_files):
                

        # if not filenames.exists():
        #     success_message = 'Please upload supporting documents.'
        #     return render(request, 'itproofsubmissions.html', {'success_message':success_message})

        if payingrent == 'yes':                      
            if not rent_section.exists():
                if saved_basic:
                    saved_basic.current_page = 1
                    saved_basic.save()
                success_message = 'You have declared HRA but have not uploaded the rent documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            elif not pan_section.exists():
                if saved_basic:
                    saved_basic.current_page = 1
                    saved_basic.save()
                success_message = 'You have declared HRA but have not uploaded the PAN documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            elif hra_declaration_file is None:
                if saved_basic:
                    saved_basic.current_page = 1
                    saved_basic.save()
                success_message = 'You have declared HRA but have not uploaded the declaration file for HRA.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
        
        if ilhp == 'yes':            
            if selfOccupiedHouseProperty_1 and not SelfOccupied_file.exists():
                if saved_basic:
                    saved_basic.current_page = 2
                    saved_basic.save()
                success_message = 'You have declared Self-occupied house property but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})

            if selfOccupiedHouseProperty_1 and annualLettableValue == 0 :
                if ilhp_self_declaration_file is None:
                    if saved_basic:
                        saved_basic.current_page = 2
                        saved_basic.save()
                    success_message = 'You have declared Self-occupied from house property but have not uploaded the declaration file.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
    
            
            if annualLettableValue_1 and not Letout_file.exists():
                if saved_basic:
                    saved_basic.current_page = 2
                    saved_basic.save()
                success_message = 'You have declared Let out house property but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})

            if annualLettableValue_1 and selfOccupiedHouseProperty == 0:
                if ilhp_let_declaration_file is None:
                    if saved_basic:
                        saved_basic.current_page = 2
                        saved_basic.save()
                    success_message = 'You have declared income/loss from house property but have not uploaded the declaration file.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
            if loan_sanctioned_date_1  and not file_80EE.exists():
                if saved_basic:
                    saved_basic.current_page = 2
                    saved_basic.save()
                success_message = 'You have declared 80EE but have not uploaded the supporting documents. Please upload.'                    
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            if loan_sanctioned_date_ee_1 and not file_80EEA.exists():
                if saved_basic:
                    saved_basic.current_page = 2
                    saved_basic.save()
                success_message = ' You have declared 80EEA but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            if selfOccupiedHouseProperty_1 and annualLettableValue_1:
                if ilhp_declaration_file is None:
                    if saved_basic:
                        saved_basic.current_page = 2
                        saved_basic.save()
                    success_message = 'You have declared Income/Loss from house property but not uploaded declaration file.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
            if loan_amount_1:
                if ee80_declaration_file is None:
                    if saved_basic:
                        saved_basic.current_page = 2
                        saved_basic.save()
                    success_message = 'You have declared 80EE from house property but have not uploaded the declaration file.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
            if property_value_other_1:
                if eea80_declaration_file is None:
                    if saved_basic:
                        saved_basic.current_page = 2
                        saved_basic.save()
                    success_message = 'You have declared 80EEA from house property but have not uploaded the declaration file.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
        if section80oi == 'yes':
            if other_income_oi_1:
                if not OTHER_file.exists():
                    if regime.Regime == 'Old':
                        if saved_basic:
                            saved_basic.current_page = 2
                            saved_basic.save()
                    else:
                        if saved_basic:
                            saved_basic.current_page = 1
                            saved_basic.save()
                    success_message = 'You have declared Other income but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                elif other_declaration_file is None:
                    if regime.Regime == 'Old':
                        if saved_basic:
                            saved_basic.current_page = 2
                            saved_basic.save()
                    else:
                        if saved_basic: 
                            saved_basic.current_page = 1
                            saved_basic.save()
                    success_message = 'You have declared Other income but have not uploaded the declaration file. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
        if section80tta == 'yes':
            # if not file_80TTA.exists():
            #     success_message = 'You have declared Interest from savings bank 80TTA but not uploaded supporting documents. Please upload.'
            #     return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            if saved_Ilhp.interest_80tta and TTA80_declaration_file is None:
                if saved_basic:
                    saved_basic.current_page = 2
                    saved_basic.save()
                success_message = 'You have declared Interest from savings bank 80TTA but have not uploaded the declaration file. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
        if section80d == 'yes':
            if section80d_mip == 'yes':
                if medical_insurance_self_mip_1 or medical_insurance_parents_mip_1 or medical_insurance_Senior_Citizen_1 or preventive_health_checkup_mip_1:
                    if not file_80D.exists():
                        if saved_basic:
                            saved_basic.current_page = 3
                            saved_basic.save()
                        success_message = 'You have declared 80D but have not uploaded the supporting documents. Please upload.'
                        return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            if selected_illness_1  and not file_80DDB.exists():
                    if saved_basic:
                        saved_basic.current_page = 3
                        saved_basic.save()
                    success_message = 'You have declared 80DDB but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            if interest_education_1 and not file_80E.exists():
                    if saved_basic:
                        saved_basic.current_page = 3
                        saved_basic.save()
                    success_message = 'You have declared 80E but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
        if section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both':             
            if paymentDependentDisability_1 and not file_80DD.exists():
                    if saved_basic:                
                        saved_basic.current_page = 3
                        saved_basic.save()
                    success_message = 'You have declared 80DD but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            elif paymentSelfDisability_1 and not file_80U.exists():
                    if saved_basic:
                        saved_basic.current_page = 3
                        saved_basic.save()
                    success_message = 'You have declared 80U but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
        if section80ee_80eeb == 'yes':
            if loan_sanctioned_date_80eeb_1 and not file_80EEB.exists():
                if saved_basic:
                    saved_basic.current_page = 3
                    saved_basic.save()
                success_message = 'You have declared 80EEB but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            elif EEB80_declaration_file is None:
                if saved_basic:
                    saved_basic.current_page = 3
                    saved_basic.save()
                success_message = 'You have declared 80EEB but have not uploaded the declaration file. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
        if section80ccd == 'yes':
            if section80ccdcontribution_1 == 'self' and not file_80CCD.exists():
                    if saved_basic:
                        saved_basic.current_page = 3
                        saved_basic.save()
                    success_message = 'You have declared 80CCD but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
        
        
        if financial_year_start <= empdoj <= financial_year_end:
            if payingrent == 'no' and section80oi == 'no' and section80tta == 'no' and ilhp == 'no' and section80d == 'no' and section80udd == 'no' and section80ee_80eeb == 'no' and section80ccd == 'no' and section80C == 'no' and section_previousemp  == 'no':
                if saved_basic:
                    saved_basic.delete()
        elif payingrent == 'no' and section80oi == 'no' and section80tta == 'no' and ilhp == 'no' and section80d == 'no' and section80udd == 'no' and section80ee_80eeb == 'no' and section80ccd == 'no' and section80C == 'no':
            if saved_basic:
                saved_basic.delete()
        
        
        if payingrent == 'yes' and ilhp == 'yes' and selfOccupiedHouseProperty_1:
            if hra_hl_declaration_file is None:
                if saved_basic:
                    saved_basic.current_page = 2
                    saved_basic.save()
                success_message = 'You have declared HRA and Self-Occupied House Property but have not uploaded the declaration file. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            

        if section80C == 'yes':
            if paymentLifeInsurance_1 and not file_80C_LIC:                
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Payment towards Life Insurance Policy but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
            if timeDeposit_1 and not file_80C_PODT:   
                if saved_basic:      
                    saved_basic.current_page = 4
                    saved_basic.save()                          
                success_message = 'You have declared 5 year time deposit but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
            if ulipContribution_1 and not file_80C_ULIP:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Contribution to ULIP but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
            if nscSubscription_1 and not file_80C_NSC:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Subscription to notified Central Govt Savings certificate  but not uploaded supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
            if nscInterest_1 and not file_80C_NSC_INT:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = ' You have declared Interest on NSC but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})                     
                
            if ppfContribution_1 and not file_80C_PPF:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Contribution to Public Provident Fund but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
 
            if houseLoan_1 and not file_80C_principal:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared House loan principal but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
            if tuitionFee_1 and not file_80C_Tution:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Tuition fee but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
            if mutualFundSubscription_1 and not file_80C_MF:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = ' You have declared Subscription to notified Mutual Fund but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
            if termDeposits_1 and not file_80C_FD:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared 5 Year Term fixed Deposit but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
                
            if pensionContribution_1 and not file_80CCC:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Contribution to certain Pension Funds but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})                     
                
            if sukanyaSamriddhi_1 and not file_80C_Sukanya:
                if saved_basic:
                    saved_basic.current_page = 4
                    saved_basic.save()
                success_message = 'You have declared Sukanya Samriddhi but have not uploaded the supporting documents. Please upload.'
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
            if paymentLifeInsurance_1 or ppfContribution_1 or tuitionFee_1 or sukanyaSamriddhi_1:
                if C80_declaration_file is None:
                    success_message = 'You have declared 80C Contributions but have not uploaded the declaration file.'                
                    if saved_basic:
                        saved_basic.current_page = 4
                        saved_basic.save()                  
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})
        
        if section80d == 'yes' or section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both':
            if Ded80_declaration_file is None:
                success_message = 'You have declared 80 other deduction but have not uploaded the declaration file.'                    
                if saved_basic:
                    saved_basic.current_page = 3
                    saved_basic.save()
                return render(request, 'itproofsubmissions.html', {'success_message':success_message})

       
            

        if financial_year_start <= empdoj <= financial_year_end:
            if section_previousemp == 'yes':
                if salary_previousemp_1 and not PreviousEmpl_file.exists():
                    if regime.Regime == 'Old':
                        if saved_basic:
                            saved_basic.current_page = 5
                            saved_basic.save()
                    else:
                        if saved_basic:
                            saved_basic.current_page = 2
                            saved_basic.save()
                    success_message = 'You have declared Previous Employement but have not uploaded the supporting documents. Please upload.'
                    return render(request, 'itproofsubmissions.html', {'success_message':success_message})

        success_message = 'You have successfully saved.'
        return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})



def Submit_it_proof(request):

    success_message = ''
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    except:
        saved_basic = None

    try:
        saved_hra = it_proof_hra.objects.get(empid=emp_user)        
    except:
        saved_hra = None

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None

    try:
        saved_previous_emp = it_proof_previousemp.objects.get(empid=emp_user)        
    except:
        saved_previous_emp = None

    try:
        filenames = itprooffiles.objects.filter(empid=emp_user)
    except:
        filenames = None

    

    empdoj = data.empdoj
    current_date = date.today()

    current_time_date = timezone.now() + timedelta(hours=5, minutes=30)

    financial_year_start, financial_year_end = calculate_financial_year(current_date)


    if request.method == 'POST':
        
        empid = request.POST.get('empid')
        empname = request.POST.get('empname')
        empemail = request.POST.get('empemail')
        fathername = request.POST.get('fathername')
        emppan = request.POST.get('emppan')
        isyourpan = request.POST.get('isyourpan')

         # Additional details
        place = request.POST.get('place')
        itproofcheck = request.POST.get('itproofcheck')


        if itproofcheck:
            if itproofcheck == 'true':
                itproofcheck = True
            else:
                itproofcheck = False
        else:
            itproofcheck = False

        if isyourpan == 'yes':
            isyourpan1 = True
        else:
            isyourpan1 = False

        if filenames:
            for i in filenames:
                status_value = request.POST[i.filename.replace('.', '')] 
                new_record = filenames.get(filename = i.filename)
                new_record.file_status = status_value
                new_record.save()

        if saved_basic:           
            saved_basic.fathername = fathername            
            saved_basic.isValidPAN = isyourpan1
            saved_basic.gender = data.gender
            saved_basic.CompanyName = data.Company_Name
            saved_basic.status = data.Status
            saved_basic.Place = place
            saved_basic.confirm_check = itproofcheck            
            saved_basic.submit_DT  = timezone.now() + timedelta(hours=5, minutes=30)
            saved_basic.current_page = None
            saved_basic.save()
            
        else:
            it_proof_basic_new = it_proof_basic(
                empid = empid,
                userid = empid,
                empname = empname,
                mobno = data.empmobile, 
                emailid = empemail,
                fathername = fathername,
                pan = emppan,
                dob = data.empdob,
                doj = data.empdoj,
                isValidPAN = isyourpan1,
                gender = data.gender,
                CompanyName = data.Company_Name,
                status = data.Status,
                Place = place,
                confirm_check = itproofcheck,
                submit_DT  = timezone.now() + timedelta(hours=5, minutes=30),
                current_page = None
            )
            it_proof_basic_new.save()

        emp_basic_instance = it_proof_basic.objects.get(empid=empid)
  
        payingrent = request.POST.get('payingrent')
        ilhp = request.POST.get('ilhp')
        section80oi = request.POST.get('section80oi')
        section80tta = request.POST.get('section80tta')

        if payingrent == 'yes':

            claimingHRA = request.POST.get('claimingHRA')
            changeHRA = request.POST.get('changeHRA')

            # Details for the first rented property
            LandlordPAN1 = request.POST.get('LandlordPAN1')
            StartDate1 = request.POST.get('StartDate1')
            EndDate1 = request.POST.get('EndDate1')
            MonthRent1 = request.POST.get('MonthRent1')
            Pincode1 = request.POST.get('Pincode1')
            cityType1 = request.POST.get('cityType1')
            lanlordName1 = request.POST.get('lanlordName1')
            landlordContact1 = request.POST.get('landlordContact1')
            landlordAddress1 = request.POST.get('landlordAddress1')
            rentedAddress1 = request.POST.get('rentedAddress1')

            # Details for the second rented property
            LandlordPAN2 = request.POST.get('LandlordPAN2')
            StartDate2 = request.POST.get('StartDate2')
            EndDate2 = request.POST.get('EndDate2')
            MonthRent2 = request.POST.get('MonthRent2')
            Pincode2 = request.POST.get('Pincode2')
            cityType2 = request.POST.get('cityType2')
            lanlordName2 = request.POST.get('lanlordName2')
            landlordContact2 = request.POST.get('landlordContact2')
            landlordAddress2 = request.POST.get('landlordAddress2')
            rentedAddress2 = request.POST.get('rentedAddress2')


            # Details for the third rented property
            LandlordPAN3 = request.POST.get('LandlordPAN3')
            StartDate3 = request.POST.get('StartDate3')
            EndDate3 = request.POST.get('EndDate3')
            MonthRent3 = request.POST.get('MonthRent3')
            Pincode3 = request.POST.get('Pincode3')
            cityType3 = request.POST.get('cityType3')
            lanlordName3 = request.POST.get('lanlordName3')
            landlordContact3 = request.POST.get('landlordContact3')
            landlordAddress3 = request.POST.get('landlordAddress3')
            rentedAddress3 = request.POST.get('rentedAddress3')

            # Details for the fourth rented property
            LandlordPAN4 = request.POST.get('LandlordPAN4')
            StartDate4 = request.POST.get('StartDate4')
            EndDate4 = request.POST.get('EndDate4')
            MonthRent4 = request.POST.get('MonthRent4')
            Pincode4 = request.POST.get('Pincode4')
            cityType4 = request.POST.get('cityType4')
            lanlordName4 = request.POST.get('lanlordName4')
            landlordContact4 = request.POST.get('landlordContact4')
            landlordAddress4 = request.POST.get('landlordAddress4')
            rentedAddress4 = request.POST.get('rentedAddress4')

            # Details for the fifth rented property
            LandlordPAN5 = request.POST.get('LandlordPAN5')
            StartDate5 = request.POST.get('StartDate5')
            EndDate5 = request.POST.get('EndDate5')
            MonthRent5 = request.POST.get('MonthRent5')
            Pincode5 = request.POST.get('Pincode5')
            cityType5 = request.POST.get('cityType5')
            lanlordName5 = request.POST.get('lanlordName5')
            landlordContact5 = request.POST.get('landlordContact5')
            landlordAddress5 = request.POST.get('landlordAddress5')
            rentedAddress5 = request.POST.get('rentedAddress5')

     
            if StartDate1:    
                StartDate1 = datetime.strptime(StartDate1, "%Y-%m-%d")            
            else:        
                StartDate1 = None
            if StartDate2:    
                StartDate2 = datetime.strptime(StartDate2, "%Y-%m-%d")            
            else:        
                StartDate2 = None
            if StartDate3:    
                StartDate3 = datetime.strptime(StartDate3, "%Y-%m-%d")    
            else:        
                StartDate3 = None
            if StartDate4:    
                StartDate4 = datetime.strptime(StartDate4, "%Y-%m-%d")          
            else:        
                StartDate4 = None
            if StartDate5:    
                StartDate5 = datetime.strptime(StartDate5, "%Y-%m-%d")            
            else:        
                StartDate5 = None    


            MonthRent1 = int(MonthRent1) if MonthRent1 else int(0)
            Pincode1 = int(Pincode1) if Pincode1 else None
            landlordContact1 = int(landlordContact1) if landlordContact1 else None

            MonthRent2 = int(MonthRent2) if MonthRent2 else int(0)
            Pincode2 = int(Pincode2) if Pincode2 else None
            landlordContact2 = int(landlordContact2) if landlordContact2 else None

            MonthRent3 = int(MonthRent3) if MonthRent3 else int(0)
            Pincode3 = int(Pincode3) if Pincode3 else None
            landlordContact3 = int(landlordContact3) if landlordContact3 else None

            MonthRent4 = int(MonthRent4) if MonthRent4 else int(0)
            Pincode4 = int(Pincode4) if Pincode4 else None
            landlordContact4 = int(landlordContact4) if landlordContact4 else None

            MonthRent5 = int(MonthRent5) if MonthRent5 else int(0)
            Pincode5 = int(Pincode5) if Pincode5 else None
            landlordContact5 = int(landlordContact5) if landlordContact5 else None


            if EndDate1:    
                EndDate1 = datetime.strptime(EndDate1, "%Y-%m-%d")
            else:        
                EndDate1 = None
            if EndDate2:    
                EndDate2 = datetime.strptime(EndDate2, "%Y-%m-%d")
            else:        
                EndDate2 = None
            if EndDate3:    
                EndDate3 = datetime.strptime(EndDate3, "%Y-%m-%d")
            else:        
                EndDate3 = None
            if EndDate4:    
                EndDate4 = datetime.strptime(EndDate4, "%Y-%m-%d")
            else:        
                EndDate4 = None            
            if EndDate5:    
                EndDate5 = datetime.strptime(EndDate5, "%Y-%m-%d")
            else:        
                EndDate5 = None

            if LandlordPAN1:
                LandlordPAN1 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN1)
            if LandlordPAN2:
                LandlordPAN2 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN2)
            if LandlordPAN3:
                LandlordPAN3 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN3)
            if LandlordPAN4:
                LandlordPAN4 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN4)
            if LandlordPAN5:
                LandlordPAN5 = ''.join(char.upper() if char.isalpha() else char for char in LandlordPAN5)
            
            
            if saved_hra:               
                saved_hra.claimingHRA = claimingHRA
                saved_hra.changeHRA = changeHRA

                saved_hra.LandLordPan = LandlordPAN1
                saved_hra.itd1stdt = StartDate1
                saved_hra.itd1enddt = EndDate1
                saved_hra.itd1 = MonthRent1
                saved_hra.pincode1 = Pincode1
                saved_hra.city1 = cityType1
                saved_hra.landlordName = lanlordName1
                saved_hra.LandlordContact = landlordContact1
                saved_hra.LandlordAddress = landlordAddress1
                saved_hra.rentedAdd1 = rentedAddress1

                saved_hra.LandlordPan2 = LandlordPAN2
                saved_hra.itd2stdt = StartDate2
                saved_hra.itd2enddt = EndDate2
                saved_hra.itd2 = MonthRent2
                saved_hra.pincode2 = Pincode2
                saved_hra.city2 = cityType2
                saved_hra.LandlordName2 = lanlordName2
                saved_hra.LandlordContact2 = landlordContact2
                saved_hra.LandlordAdd2 = landlordAddress2
                saved_hra.rentedAdd2 = rentedAddress2

                saved_hra.LandlordPan3 = LandlordPAN3
                saved_hra.itd3stdt = StartDate3
                saved_hra.itd3enddt = EndDate3
                saved_hra.itd3 = MonthRent3
                saved_hra.pincode3 = Pincode3
                saved_hra.city3 = cityType3
                saved_hra.LandlordName3 = lanlordName3
                saved_hra.LandlordContact3 = landlordContact3
                saved_hra.LandlordAdd3 = landlordAddress3
                saved_hra.rentedAdd3 = rentedAddress3

                saved_hra.LandlordPan4 = LandlordPAN4
                saved_hra.itd4stdt = StartDate4
                saved_hra.itd4enddt = EndDate4
                saved_hra.itd4 = MonthRent4
                saved_hra.pincode4 = Pincode4
                saved_hra.city4 = cityType4
                saved_hra.LandlordName4 = lanlordName4
                saved_hra.LandlordContact4 = landlordContact4
                saved_hra.LandlordAdd4 = landlordAddress4
                saved_hra.rentedAdd4 = rentedAddress4

                saved_hra.LandlordPan5 = LandlordPAN5
                saved_hra.itd5stdt = StartDate5
                saved_hra.itd5enddt = EndDate5
                saved_hra.itd5 = MonthRent5
                saved_hra.pincode5 = Pincode5
                saved_hra.city5 = cityType5
                saved_hra.LandlordName5 = lanlordName5
                saved_hra.LandlordContact5 = landlordContact5
                saved_hra.LandlordAdd5 = landlordAddress5
                saved_hra.rentedAdd5 = rentedAddress5

                saved_hra.save()        
            else:
                it_proof_hra_new = it_proof_hra(
                    claimingHRA = claimingHRA,
                    changeHRA = changeHRA,

                    empid=emp_basic_instance,
                    LandLordPan = LandlordPAN1,
                    itd1stdt = StartDate1,
                    itd1enddt = EndDate1,
                    itd1 = MonthRent1,
                    pincode1 = Pincode1,
                    city1 = cityType1,
                    landlordName = lanlordName1,
                    LandlordContact = landlordContact1,
                    LandlordAddress = landlordAddress1,
                    rentedAdd1 = rentedAddress1,

                    LandlordPan2 = LandlordPAN2,
                    itd2stdt = StartDate2,
                    itd2enddt = EndDate2,
                    itd2 = MonthRent2,
                    pincode2 = Pincode2,
                    city2 = cityType2,
                    LandlordName2 = lanlordName2,
                    LandlordContact2 = landlordContact2,
                    LandlordAdd2 = landlordAddress2,
                    rentedAdd2 = rentedAddress2,    

                    LandlordPan3 = LandlordPAN3,
                    itd3stdt = StartDate3,
                    itd3enddt = EndDate3,
                    itd3 = MonthRent3,
                    pincode3 = Pincode3,
                    city3 = cityType3,
                    LandlordName3 = lanlordName3,
                    LandlordContact3 = landlordContact3,
                    LandlordAdd3 = landlordAddress3,
                    rentedAdd3 = rentedAddress3,

                    LandlordPan4 = LandlordPAN4,
                    itd4stdt = StartDate4,
                    itd4enddt = EndDate4,
                    itd4 = MonthRent4,
                    pincode4 = Pincode4,
                    city4 = cityType4,
                    LandlordName4 = lanlordName4,
                    LandlordContact4 = landlordContact4,
                    LandlordAdd4 = landlordAddress4,
                    rentedAdd4 = rentedAddress4,

                    LandlordPan5 = LandlordPAN5,
                    itd5stdt = StartDate5,
                    itd5enddt = EndDate5,
                    itd5 = MonthRent5,
                    pincode5 = Pincode5,
                    city5 = cityType5,
                    LandlordName5 = lanlordName5,
                    LandlordContact5 = landlordContact5,
                    LandlordAdd5 = landlordAddress5,
                    rentedAdd5 = rentedAddress5,

                    )
                it_proof_hra_new.save()

        else:
            if saved_hra:
                saved_hra.delete()
        
        other_income_oi_1 = None
        interest_80tta_1 = None
        
        self_date_1 = None
        selfOccupiedHouseProperty_1 = None 
        selfHomeLoanLenderName_1 = None
        selfHomeLoanLenderPAN_1 = None 
        otherselfHomeLoanLenderName_1 = None
        otherselfHomeLoanLenderPAN_1 = None

        annualLettableValue_1  = None
        municipalPropertyTax_1   = None
        homeLoanInterest_1 = None
        incomeLossOnHouseProperty_1 = None
        standardDeduction_1 = None
        loanLenderName_1 = None
        loanLenderPAN_1 = None
        otherloanLenderName_1 = None
        otherloanLenderPAN_1 = None

        loan_sanctioned_date_1 = None
        loan_amount_1 = None
        property_value_1  = None
        home_loan_1 = None
        loan_lender_1 = None
        otherloan_lender_1 = None
        lender_pan_1 = None
        otherlender_pan_1 = None
        loan_sanctioned_date_ee_1 = None
        op80eea_other_property_1  = None
        property_value_other_1 = None
        op80eea_1 = None

        if section80oi == 'yes':
            other_income_oi = request.POST.get('other_income_oi')
            other_income_oi_1 = int(other_income_oi) if other_income_oi else int(0)
        
        if section80tta == 'yes':            
            interest_80tta = request.POST.get('interest_80tta')
            interest_80tta_1 = int(interest_80tta) if interest_80tta else int(0)

        
        if ilhp == 'yes':                       
            # Self-occupied house property details
            self_date = request.POST.get('self_date')
            selfOccupiedHouseProperty = request.POST.get('selfOccupiedHouseProperty')
            selfHomeLoanLenderName = request.POST.get('selfHomeLoanLenderName')
            selfHomeLoanLenderPAN = request.POST.get('selfHomeLoanLenderPAN')
            otherselfHomeLoanLenderName = request.POST.get('otherselfHomeLoanLenderName')
            otherselfHomeLoanLenderPAN = request.POST.get('otherselfHomeLoanLenderPAN')

            # Other house property details
            annualLettableValue = request.POST.get('annualLettableValue')
            municipalPropertyTax = request.POST.get('municipalPropertyTax')
            homeLoanInterest = request.POST.get('homeLoanInterest')
            incomeLossOnHouseProperty = request.POST.get('incomeLossOnHouseProperty')
            standardDeduction = request.POST.get('standardDeduction')
            loanLenderName = request.POST.get('loanLenderName')
            loanLenderPAN = request.POST.get('loanLenderPAN')
            otherloanLenderName = request.POST.get('otherloanLenderName')
            otherloanLenderPAN = request.POST.get('otherloanLenderPAN')

            # Loan details
            loan_sanctioned_date = request.POST.get('loan_sanctioned_date')
            loan_amount = request.POST.get('loan_amount')
            property_value = request.POST.get('property_value')
            home_loan = request.POST.get('home_loan')
            loan_lender = request.POST.get('loan_lender')
            lender_pan = request.POST.get('lender_pan')
            otherloan_lender = request.POST.get('otherloan_lender')
            otherlender_pan = request.POST.get('otherlender_pan')
                        
                    
                    
            # Additional loan details
            loan_sanctioned_date_ee = request.POST.get('loan_sanctioned_date_ee')
            op80eea_other_property = request.POST.get('op80eea_other_property')
            property_value_other = request.POST.get('property_value_other')
            op80eea = request.POST.get('op80eea')
            

            

            if self_date:    
                self_date = datetime.strptime(self_date, "%Y-%m-%d")            
            else:        
                self_date = None

            selfOccupiedHouseProperty = int(selfOccupiedHouseProperty) if selfOccupiedHouseProperty else int(0)                
            annualLettableValue = int(annualLettableValue) if annualLettableValue else int(0)
            municipalPropertyTax = int(municipalPropertyTax) if municipalPropertyTax else int(0)
            homeLoanInterest = int(homeLoanInterest) if homeLoanInterest else int(0)
            incomeLossOnHouseProperty = int(incomeLossOnHouseProperty) if incomeLossOnHouseProperty else int(0)
            standardDeduction = int(standardDeduction) if standardDeduction else int(0)

            if loan_sanctioned_date:    
                loan_sanctioned_date = datetime.strptime(loan_sanctioned_date, "%Y-%m-%d")            
            else:        
                loan_sanctioned_date = None            
            loan_amount = int(loan_amount) if loan_amount else int(0)
            property_value = int(property_value) if property_value else int(0)
            home_loan = int(home_loan) if home_loan else int(0)

            if loan_amount == 0 and property_value == 0 and home_loan == 0:
                loan_sanctioned_date = None
                
            if loan_sanctioned_date_ee:    
                loan_sanctioned_date_ee = datetime.strptime(loan_sanctioned_date_ee, "%Y-%m-%d")            
            else:        
                loan_sanctioned_date_ee = None

            

            if op80eea_other_property=='yes':
                op80eea_other_property = True
            elif op80eea_other_property=='no':
                op80eea_other_property = False
            else:
                op80eea_other_property = None


            property_value_other = int(property_value_other) if property_value_other else int(0)

            if property_value_other == 0:
                loan_sanctioned_date_ee = None 
                
            op80eea = True if op80eea=='yes' else False

            self_date_1 = self_date
            selfOccupiedHouseProperty_1 = selfOccupiedHouseProperty 
            selfHomeLoanLenderName_1 = selfHomeLoanLenderName
            selfHomeLoanLenderPAN_1 = selfHomeLoanLenderPAN 
            otherselfHomeLoanLenderName_1 = otherselfHomeLoanLenderName
            otherselfHomeLoanLenderPAN_1 = otherselfHomeLoanLenderPAN

            
            annualLettableValue_1 = annualLettableValue
            municipalPropertyTax_1 = municipalPropertyTax
            homeLoanInterest_1 = homeLoanInterest
            incomeLossOnHouseProperty_1 = incomeLossOnHouseProperty
            standardDeduction_1 = standardDeduction
            loanLenderName_1 = loanLenderName
            loanLenderPAN_1 = loanLenderPAN
            otherloanLenderName_1 = otherloanLenderName
            otherloanLenderPAN_1 = otherloanLenderPAN

            loan_sanctioned_date_1 = loan_sanctioned_date
            loan_amount_1 = loan_amount
            property_value_1 = property_value
            home_loan_1 = home_loan
            loan_lender_1 = loan_lender
            lender_pan_1 = lender_pan
            otherloan_lender_1 = otherloan_lender
            otherlender_pan_1 = otherlender_pan
            loan_sanctioned_date_ee_1 = loan_sanctioned_date_ee
            op80eea_other_property_1 = op80eea_other_property
            property_value_other_1 = property_value_other
            op80eea_1 = op80eea

        if section80oi == 'yes' or section80tta == 'yes' or ilhp == 'yes':
            if saved_Ilhp:
                
                saved_Ilhp.self_date = self_date_1
                saved_Ilhp.selfOccupiedHouseProperty = selfOccupiedHouseProperty_1
                saved_Ilhp.selfHomeLoanLenderName = selfHomeLoanLenderName_1
                saved_Ilhp.selfHomeLoanLenderPAN = selfHomeLoanLenderPAN_1
                saved_Ilhp.otherselfHomeLoanLenderName = otherselfHomeLoanLenderName_1
                saved_Ilhp.otherselfHomeLoanLenderPAN = otherselfHomeLoanLenderPAN_1

                saved_Ilhp.annualLettableValue = annualLettableValue_1
                saved_Ilhp.municipalPropertyTax = municipalPropertyTax_1
                saved_Ilhp.homeLoanInterest = homeLoanInterest_1
                saved_Ilhp.incomeLossOnHouseProperty = incomeLossOnHouseProperty_1
                saved_Ilhp.standardDeduction = standardDeduction_1
                saved_Ilhp.loanLenderName = loanLenderName_1
                saved_Ilhp.loanLenderPAN = loanLenderPAN_1
                saved_Ilhp.otherloanLenderName = otherloanLenderName_1
                saved_Ilhp.otherloanLenderPAN = otherloanLenderPAN_1


                saved_Ilhp.loan_sanctioned_date = loan_sanctioned_date_1
                saved_Ilhp.loan_amount = loan_amount_1
                saved_Ilhp.property_value = property_value_1
                saved_Ilhp.home_loan = home_loan_1
                saved_Ilhp.loan_lender = loan_lender_1
                saved_Ilhp.lender_pan = lender_pan_1
                saved_Ilhp.otherloan_lender = otherloan_lender_1
                saved_Ilhp.otherlender_pan = otherlender_pan_1

                saved_Ilhp.loan_sanctioned_date_ee = loan_sanctioned_date_ee_1
                saved_Ilhp.op80eea_other_property = op80eea_other_property_1
                saved_Ilhp.property_value_other = property_value_other_1
                saved_Ilhp.op80eea = op80eea_1

                saved_Ilhp.other_income_oi = other_income_oi_1
                saved_Ilhp.interest_80tta = interest_80tta_1
                
                saved_Ilhp.save()

            else:
                it_proof_income_loss_new = it_proof_income_loss(                                    
                    empid=emp_basic_instance,
                    
                    self_date = self_date_1,
                    selfOccupiedHouseProperty = selfOccupiedHouseProperty_1,
                    selfHomeLoanLenderName = selfHomeLoanLenderName_1,
                    selfHomeLoanLenderPAN = selfHomeLoanLenderPAN_1,
                    otherselfHomeLoanLenderName = otherselfHomeLoanLenderName_1,
                    otherselfHomeLoanLenderPAN = otherselfHomeLoanLenderPAN_1,
                
                    annualLettableValue = annualLettableValue_1,
                    municipalPropertyTax = municipalPropertyTax_1,
                    homeLoanInterest = homeLoanInterest_1,
                    incomeLossOnHouseProperty = incomeLossOnHouseProperty_1,
                    standardDeduction = standardDeduction_1,
                    loanLenderName = loanLenderName_1, 
                    loanLenderPAN = loanLenderPAN_1,
                    otherloanLenderName = otherloanLenderName_1,
                    otherloanLenderPAN = otherloanLenderPAN_1,

                    loan_sanctioned_date = loan_sanctioned_date_1,
                    loan_amount = loan_amount_1,
                    property_value = property_value_1,
                    home_loan = home_loan_1,
                    loan_lender = loan_lender_1, 
                    lender_pan = lender_pan_1,
                    otherloan_lender = otherloan_lender_1,
                    otherlender_pan = otherlender_pan_1,

                    loan_sanctioned_date_ee = loan_sanctioned_date_ee_1, 
                    op80eea_other_property = op80eea_other_property_1,
                    property_value_other = property_value_other_1,
                    op80eea = op80eea_1,

                    other_income_oi = other_income_oi_1,
                    interest_80tta = interest_80tta_1

                    )
                it_proof_income_loss_new.save()
        else:
            if saved_Ilhp:
                saved_Ilhp.delete()

        selected_illness_1  = None
        citizenship_status_1  = None
        treatment_value_1 = None
        interest_education_1 = None

        medical_insurance_self_mip_1 = None
        medical_insurance_parents_mip_1 = None
        medical_insurance_Senior_Citizen_1 = None
        preventive_health_checkup_mip_1 = None

        paymentDependentDisability_1 = None
        paymentSelfDisability_1 = None

        loan_sanctioned_date_80eeb_1 = None
        vehicle_loan_80eeb_1 = None
        loan_lender_80eeb_1 = None
        lender_pan_80eeb_1 = None
        other80eebLender_1 = None
        other80eebPAN_1 = None
        section80ccdcontribution_1 = None
        nps_80ccd1b_1 = None
        prannumber_1 = None
        
        section80d = request.POST.get('section80d')
        if section80d == 'yes':
            
            selected_illness = request.POST.get('selected_illness')
            citizenship_status = request.POST.get('citizenship_status')
            treatment_value = request.POST.get('treatment_value')
            interest_education = request.POST.get('interest_education')


            selected_illness_1 = selected_illness
            citizenship_status_1 = citizenship_status                   
            treatment_value_1 = int(treatment_value) if treatment_value else int(0)
            interest_education_1 = int(interest_education) if interest_education else int(0)

            section80d_mip = request.POST['section80d_mip']
            if section80d_mip == 'yes':
                
                medical_insurance_self_mip = request.POST.get('medical_insurance_self_mip')
                medical_insurance_parents_mip = request.POST.get('medical_insurance_parents_mip')
                medical_insurance_Senior_Citizen = request.POST.get('medical_insurance_Senior_Citizen')
                preventive_health_checkup_mip = request.POST.get('preventive_health_checkup_mip')
                           
                medical_insurance_self_mip_1 = int(medical_insurance_self_mip) if medical_insurance_self_mip else int(0)
                medical_insurance_parents_mip_1 = int(medical_insurance_parents_mip) if medical_insurance_parents_mip else int(0)
                medical_insurance_Senior_Citizen_1 = int(medical_insurance_Senior_Citizen) if medical_insurance_Senior_Citizen else int(0)
                preventive_health_checkup_mip_1 = int(preventive_health_checkup_mip) if preventive_health_checkup_mip else int(0)

        section80udd = request.POST.get('section80udd')
        if section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both':
            
            paymentDependentDisability = request.POST.get('paymentDependentDisability')
            paymentSelfDisability = request.POST.get('paymentSelfDisability')
            
            paymentDependentDisability_1 = int(paymentDependentDisability) if paymentDependentDisability else None
            paymentSelfDisability_1 = int(paymentSelfDisability) if paymentSelfDisability else None

        
        section80ee_80eeb = request.POST.get('section80ee_80eeb')
        if section80ee_80eeb == 'yes':            
            
            loan_sanctioned_date_80eeb = request.POST.get('loan_sanctioned_date_80eeb')
            vehicle_loan_80eeb = request.POST.get('vehicle_loan_80eeb')    
            loan_lender_80eeb = request.POST.get('loan_lender_80eeb')
            lender_pan_80eeb = request.POST.get('lender_pan_80eeb')
            other80eebLender = request.POST.get('other80eebLender')
            other80eebPAN = request.POST.get('other80eebPAN')

            if loan_sanctioned_date_80eeb:    
                loan_sanctioned_date_80eeb_1 = datetime.strptime(loan_sanctioned_date_80eeb, "%Y-%m-%d")            
            else:        
                loan_sanctioned_date_80eeb_1 = None            
            vehicle_loan_80eeb_1 = int(vehicle_loan_80eeb) if vehicle_loan_80eeb else int(0)
            loan_lender_80eeb_1 = loan_lender_80eeb
            lender_pan_80eeb_1 = lender_pan_80eeb
            other80eebLender_1 = other80eebLender
            other80eebPAN_1 = other80eebPAN

        section80ccd = request.POST.get('section80ccd')
        if section80ccd == 'yes':
            
            section80ccdcontribution = request.POST.get('section80ccdcontribution')
            nps_80ccd1b = request.POST.get('nps_80ccd1b')
            prannumber = request.POST.get('prannumber')

            section80ccdcontribution_1 = section80ccdcontribution
            nps_80ccd1b_1 = int(nps_80ccd1b) if nps_80ccd1b else int(0)
            prannumber_1 = int(prannumber) if prannumber else int(0)

        
        if section80d == 'yes' or section80udd == 'self' or section80udd == 'dependent' or section80udd == 'both' or section80ee_80eeb == 'yes' or section80ccd == 'yes':
            if saved_other80:
                saved_other80.medical_insurance_self_mip = medical_insurance_self_mip_1
                saved_other80.medical_insurance_parents_mip = medical_insurance_parents_mip_1
                saved_other80.medical_insurance_Senior_Citizen = medical_insurance_Senior_Citizen_1
                saved_other80.preventive_health_checkup_mip = preventive_health_checkup_mip_1
                saved_other80.selected_illness = selected_illness_1
                saved_other80.citizenship_status = citizenship_status_1
                saved_other80.treatment_value = treatment_value_1
                saved_other80.interest_education = interest_education_1
                saved_other80.paymentDependentDisability = paymentDependentDisability_1
                saved_other80.paymentSelfDisability = paymentSelfDisability_1
                saved_other80.loan_sanctioned_date_80eeb = loan_sanctioned_date_80eeb_1
                saved_other80.vehicle_loan_80eeb = vehicle_loan_80eeb_1
                saved_other80.loan_lender_80eeb = loan_lender_80eeb_1
                saved_other80.lender_pan_80eeb = lender_pan_80eeb_1
                saved_other80.other80eebLender = other80eebLender_1
                saved_other80.other80eebPAN = other80eebPAN_1
                saved_other80.section80ccdcontribution = section80ccdcontribution_1
                saved_other80.nps_80ccd1b = nps_80ccd1b_1
                saved_other80.prannumber = prannumber_1
                saved_other80.save()
            else:
                it_proof_80_other_new = it_proof_80_other(
                    empid=emp_basic_instance,
                    medical_insurance_self_mip = medical_insurance_self_mip_1,
                    medical_insurance_parents_mip = medical_insurance_parents_mip_1,
                    medical_insurance_Senior_Citizen = medical_insurance_Senior_Citizen_1,
                    preventive_health_checkup_mip = preventive_health_checkup_mip_1,
                    selected_illness = selected_illness_1,
                    citizenship_status = citizenship_status_1,
                    treatment_value = treatment_value_1,
                    interest_education = interest_education_1,
                    paymentDependentDisability = paymentDependentDisability_1,
                    paymentSelfDisability = paymentSelfDisability_1,
                    loan_sanctioned_date_80eeb = loan_sanctioned_date_80eeb_1,
                    vehicle_loan_80eeb = vehicle_loan_80eeb_1,
                    loan_lender_80eeb = loan_lender_80eeb_1,
                    lender_pan_80eeb = lender_pan_80eeb_1,
                    other80eebLender = other80eebLender_1,
                    other80eebPAN = other80eebPAN_1,
                    section80ccdcontribution = section80ccdcontribution_1,
                    nps_80ccd1b = nps_80ccd1b_1,
                    prannumber = prannumber_1,
                )  

                it_proof_80_other_new.save()

        else:
            if saved_other80:
                saved_other80.delete()

        section80C = request.POST.get('section80C')
        if section80C == 'yes':
        
            paymentLifeInsurance = request.POST.get('paymentLifeInsurance')
            timeDeposit = request.POST.get('timeDeposit')
            ulipContribution = request.POST.get('ulipContribution')
            nscSubscription = request.POST.get('nscSubscription')
            nscInterest = request.POST.get('nscInterest')
            ppfContribution = request.POST.get('ppfContribution')
            houseLoan = request.POST.get('houseLoan')
            tuitionFee = request.POST.get('tuitionFee')
            mutualFundSubscription = request.POST.get('mutualFundSubscription')
            termDeposits = request.POST.get('termDeposits')
            pensionContribution = request.POST.get('pensionContribution')
            sukanyaSamriddhi = request.POST.get('sukanyaSamriddhi')

            paymentLifeInsurance = int(paymentLifeInsurance) if paymentLifeInsurance else int(0)
            timeDeposit = int(timeDeposit) if timeDeposit else int(0)
            ulipContribution = int(ulipContribution) if ulipContribution else int(0)
            nscSubscription = int(nscSubscription) if nscSubscription else int(0)
            nscInterest = int(nscInterest) if nscInterest else int(0)
            ppfContribution = int(ppfContribution) if ppfContribution else int(0)
            houseLoan = int(houseLoan) if houseLoan else int(0)
            tuitionFee = int(tuitionFee) if tuitionFee else int(0)
            mutualFundSubscription = int(mutualFundSubscription) if mutualFundSubscription else int(0)
            termDeposits = int(termDeposits) if termDeposits else int(0)
            pensionContribution = int(pensionContribution) if pensionContribution else int(0)
            sukanyaSamriddhi = int(sukanyaSamriddhi) if sukanyaSamriddhi else int(0)

            if saved_80C_deduction:
                saved_80C_deduction.paymentLifeInsurance = paymentLifeInsurance
                saved_80C_deduction.timeDeposit = timeDeposit
                saved_80C_deduction.ulipContribution = ulipContribution
                saved_80C_deduction.nscSubscription = nscSubscription
                saved_80C_deduction.nscInterest = nscInterest
                saved_80C_deduction.ppfContribution = ppfContribution
                saved_80C_deduction.houseLoan = houseLoan
                saved_80C_deduction.tuitionFee = tuitionFee
                saved_80C_deduction.mutualFundSubscription = mutualFundSubscription
                saved_80C_deduction.termDeposits = termDeposits
                saved_80C_deduction.pensionContribution = pensionContribution
                saved_80C_deduction.sukanyaSamriddhi = sukanyaSamriddhi
                saved_80C_deduction.save()
            else:
                it_proof_80C_Contribution_new = it_proof_80C_Contribution(
                    empid=emp_basic_instance,
                    paymentLifeInsurance = paymentLifeInsurance,
                    timeDeposit = timeDeposit,
                    ulipContribution = ulipContribution,
                    nscSubscription = nscSubscription,
                    nscInterest = nscInterest,
                    ppfContribution = ppfContribution,
                    houseLoan = houseLoan,
                    tuitionFee = tuitionFee,
                    mutualFundSubscription = mutualFundSubscription,
                    termDeposits = termDeposits,
                    pensionContribution = pensionContribution,
                    sukanyaSamriddhi = sukanyaSamriddhi
                )
                it_proof_80C_Contribution_new.save()

        else:
            if saved_80C_deduction:
                saved_80C_deduction.delete()


        
        if financial_year_start <= empdoj <= financial_year_end:            
            section_previousemp = request.POST.get('section_previousemp')
            if section_previousemp == 'yes':                

                salary_previousemp = request.POST.get('salary_previousemp')
                provident_fund = request.POST.get('provident_fund')
                professional_tax = request.POST.get('professional_tax')
                income_tax = request.POST.get('income_tax')

                salary_previousemp = int(salary_previousemp) if salary_previousemp else int(0)
                provident_fund = int(provident_fund) if provident_fund else int(0)
                professional_tax = int(professional_tax) if professional_tax else int(0)
                income_tax = int(income_tax) if income_tax else int(0)


                if saved_previous_emp:
                    saved_previous_emp.salary_previousemp = salary_previousemp
                    saved_previous_emp.provident_fund = provident_fund
                    saved_previous_emp.professional_tax = professional_tax
                    saved_previous_emp.income_tax = income_tax
                    saved_previous_emp.save()
                else:
                    it_proof_previousemp_new = it_proof_previousemp(
                        empid=emp_basic_instance,
                        salary_previousemp = salary_previousemp,
                        provident_fund = provident_fund,
                        professional_tax = professional_tax,
                        income_tax = income_tax
                    )
                    it_proof_previousemp_new.save()

            else:
                if saved_previous_emp:
                    saved_previous_emp.delete()

        filenames = itprooffiles.objects.filter(empid=emp_user)

        current_date = date.today()

        financial_year_start, financial_year_end = calculate_financial_year(current_date)

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

        
        context = {
           'saved_basic':saved_basic,
           'saved_hra':saved_hra,
           'saved_Ilhp':saved_Ilhp,
           'saved_other80':saved_other80,
           'saved_80C_deduction':saved_80C_deduction,
           'saved_previous_emp':saved_previous_emp,

           
           'filenames':filenames,
           'financial_year_start':financial_year_start,
           'financial_year_end':financial_year_end,
           'total_rent':total_rent, 'line1_count_result':line1_count_result, 'line2_count_result':line2_count_result,
           'line3_count_result':line3_count_result, 'line4_count_result':line4_count_result, 'line5_count_result':line5_count_result
        }

        # rendered_html = render_to_string('it_proof_sub_mail.html', context)
        rendered_html = render_to_string('emp_12bb.html', context)
        result = BytesIO()
            
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)
        
        pdf_filename = f"{data.empid}.pdf"

        email_body = f'''
        <p>Dear <strong>{data.empname} ({data.empid})</strong>,</p>
        <p>Thanks for submitting your Income Tax Proof Details.</p>
        
        <p>Below is the status on your IT proof submission .</p>        
        '''

        if data.Company_Name == 'Kyndryl':
            support_user_1 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-1') 
            support_user_2 = support_user.objects.get(company_name = 'Kyndryl', user_level = 'level-2') 

            email_body += f'''
                <p><strong>Escalation Matrix:</strong></p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>
                <p>Thanks & Regards,</p>
                <p><strong>Income Tax Proof Verification Team</strong></p>
            '''
        elif data.Company_Name == 'IBM':
            support_user_1 = support_user.objects.get(company_name = 'IBM', user_level = 'level-1') 
            support_user_2 = support_user.objects.get(company_name = 'IBM', user_level = 'level-2') 

            email_body += f'''
                <p><strong>Escalation Matrix:</strong></p>
                <p>Level 1:</p>
                <p>+ {support_user_1.username} ( {support_user_1.email_id} )</p>
                <p>Level 2:</p>
                <p>+ {support_user_2.username} ( {support_user_2.email_id} )</p>
                <p>Thanks & Regards,</p>
                <p><strong>Income Tax Proof Verification Team</strong></p>
            '''

        if not pdf.err:
            email = EmailMessage(
                subject='IT proof submission status FY 2024-2025.',
                body=email_body,
                from_email=settings.EMAIL_HOST_USER,
                to=[data.empemail],
            )
            email.content_subtype = 'html'
            email.attach(pdf_filename, result.getvalue(), 'application/pdf')
            email.send(fail_silently=False)
        else:
            print("Error during PDF generation:", pdf.err)


        success_message = 'You have successfully submitted.'
        return render(request, 'itproofsubmissions.html', {'success_message':success_message})
            
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})


def viewhraform(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_hra = it_proof_hra.objects.get(empid=emp_user)

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

    if request.method == 'POST':             
        mode_of_pay = request.POST.get('mode_of_pay')        
        saved_hra.mode_of_pay = mode_of_pay
        saved_hra.save()


    context={"saved_hra":saved_hra,'data':data,'total_rent':total_rent}
    
    rendered_html = render_to_string('pdfs/viewhraform.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_hra_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'hra_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'hra_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})

def view_80C_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    saved_basic = it_proof_basic.objects.get(empid=emp_user)    

    current_date = date.today()

    if request.method == 'POST':                     
        lic_for = request.POST.get('lic_for')
        ppf_for = request.POST.get('ppf_for')  
        c80_place = request.POST.get('c80_place')   

        
         
        saved_80C_deduction.lic_for = lic_for
        saved_80C_deduction.ppf_for = ppf_for
        saved_80C_deduction.c80_place = c80_place
        saved_80C_deduction.save()


    total_80c = 0
    if saved_80C_deduction:
        value_0 = 0
        value_1 = 0
        value_2 = 0
        value_3 = 0

        if saved_80C_deduction.paymentLifeInsurance:
            value_0 = saved_80C_deduction.paymentLifeInsurance       

        if saved_80C_deduction.ppfContribution:
            value_1 =saved_80C_deduction.ppfContribution

        if saved_80C_deduction.tuitionFee:
            value_2 = saved_80C_deduction.tuitionFee

        if saved_80C_deduction.sukanyaSamriddhi:
            value_3 = saved_80C_deduction.sukanyaSamriddhi
            
        total_80c = value_0 + value_1 + value_2 + value_3

    

    context={"saved_other80":saved_other80, 'current_date':current_date, 'saved_basic':saved_basic, 'saved_80C_deduction':saved_80C_deduction, 'data':data, 'total_80c':total_80c}
    
    rendered_html = render_to_string('pdfs/view80c_80other.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_80C_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'C80_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'C80_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})






def view_80Ded_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)       
    except:
        saved_other80 = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    saved_basic = it_proof_basic.objects.get(empid=emp_user)    

    current_date = date.today() 

    if request.method == 'POST':             
        mip_for = request.POST.get('mip_for')
        critical_illness_for = request.POST.get('critical_illness_for')
        dependent_dis_for = request.POST.get('dependent_dis_for')
        education_loan_for = request.POST.get('education_loan_for')  
        ded80_place = request.POST.get('ded80_place')     

             

        saved_other80.mip_for = mip_for
        saved_other80.critical_illness_for = critical_illness_for
        saved_other80.dependent_dis_for = dependent_dis_for
        saved_other80.education_loan_for = education_loan_for
        saved_other80.ded80_place = ded80_place
        saved_other80.save()

    total_80_other = 0
    parents_total = 0
    if saved_other80:
        
        medical_insurance = int(saved_other80.medical_insurance_self_mip) if saved_other80.medical_insurance_self_mip else int(0)
        medical_insurance_parents_mip = int(saved_other80.medical_insurance_parents_mip) if saved_other80.medical_insurance_parents_mip else int(0)
        medical_insurance_Senior_Citizen = int(saved_other80.medical_insurance_Senior_Citizen) if saved_other80.medical_insurance_Senior_Citizen else int(0)
        paymentDependent = int(saved_other80.paymentDependentDisability) if saved_other80.paymentDependentDisability else int(0)
        paymentSelf = int(saved_other80.paymentSelfDisability) if saved_other80.paymentSelfDisability else int(0) 
        treatment_ = int(saved_other80.treatment_value) if saved_other80.treatment_value else int(0) 
        interest_ = int(saved_other80.interest_education) if saved_other80.interest_education else int(0)

        parents_total = medical_insurance_parents_mip + medical_insurance_Senior_Citizen

        total_80_other = medical_insurance + medical_insurance_parents_mip + medical_insurance_Senior_Citizen + paymentDependent + paymentSelf + treatment_ + interest_
    

    context={'saved_other80':saved_other80, 'saved_basic':saved_basic, 'saved_80C_deduction':saved_80C_deduction, 'data':data, 'total_80_other':total_80_other, 'parents_total':parents_total, 'current_date':current_date }
    
    rendered_html = render_to_string('pdfs/view_80Ded.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_80Ded_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'Ded80_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'Ded80_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})



def view_80EEB_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)  
    try:
        saved_other80 = it_proof_80_other.objects.get(empid=emp_user)        
    except:
        saved_other80 = None

    current_date = date.today()

    if request.method == 'POST':
        veh_reg_num = request.POST.get('veh_reg_num') 
        eeb80_place = request.POST.get('eeb80_place') 

        

        saved_other80.veh_reg_num = veh_reg_num
        saved_other80.eeb80_place = eeb80_place
        saved_other80.save()
    
    
    context={'data':data, 'saved_other80':saved_other80, 'saved_basic':saved_basic, 'current_date':current_date}
    
    rendered_html = render_to_string('pdfs/view_80EEB_form.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_80EEB_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'EEB80_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'EEB80_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})

def view_80TTA_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None

    current_date = date.today()
    
    if request.method == 'POST':
        tta80_place = request.POST.get('tta80_place') 
    
        context={'data':data, 'saved_Ilhp':saved_Ilhp, 'tta80_place':tta80_place, 'current_date':current_date}
        
        rendered_html = render_to_string('pdfs/view_80TTA_form.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        
        if not pdf.err:    
            result.seek(0)
            
            pdf_filename = f"{data.empid}_signed_80TTA_declaration.pdf"
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)


            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            name_parts = pdf_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = declaration_files.objects.get(empid=emp_user, section = 'TTA80_declaration')
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]
                

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path) 


            declaration_files_new = declaration_files(
                empid = emp_user, 
                section = 'TTA80_declaration',
                filename = pdf_filename, 
                file_path =  "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
            )
            declaration_files_new.save()
        
        saved_Ilhp.tta80_place = tta80_place
        saved_Ilhp.save()

        success_message = 'PDF Generated and Uploaded successfully.'
        return render(request, 'itproofsubmissions.html', {'success_message':success_message})



def view_80ee_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    
    current_date = date.today()

    if request.method == 'POST':
        place_80ee = request.POST.get('place_80ee') 
        loc_80ee = request.POST.get('loc_80ee') 

        

    
        context={'data':data, 'saved_Ilhp':saved_Ilhp, 'place_80ee':place_80ee, 'loc_80ee':loc_80ee, 'current_date':current_date}
        
        rendered_html = render_to_string('pdfs/view_80ee_form.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        
        if not pdf.err:    
            result.seek(0)
            
            pdf_filename = f"{data.empid}_signed_80ee_declaration.pdf"
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)


            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            name_parts = pdf_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = declaration_files.objects.get(empid=emp_user, section = '80ee_declaration')
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]
                

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path) 


            declaration_files_new = declaration_files(
                empid = emp_user, 
                section = '80ee_declaration',
                filename = pdf_filename, 
                file_path =  "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
            )
            declaration_files_new.save()
        
        saved_Ilhp.place_80ee = place_80ee
        saved_Ilhp.save()

        success_message = 'PDF Generated and Uploaded successfully.'
        return render(request, 'itproofsubmissions.html', {'success_message':success_message})


def view_80eea_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    
    current_date = date.today()

    if request.method == 'POST':
        place_80eea = request.POST.get('place_80eea')
        hl_80eea = request.POST.get('hl_80eea')
        loc_80eea = request.POST.get('loc_80eea')         
    
        context={'data':data, 'saved_Ilhp':saved_Ilhp, 'place_80eea':place_80eea, 'hl_80eea':hl_80eea, 'loc_80eea':loc_80eea,  'current_date':current_date}
        
        rendered_html = render_to_string('pdfs/view_80eea_form.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        
        if not pdf.err:    
            result.seek(0)
            
            pdf_filename = f"{data.empid}_signed_80eea_declaration.pdf"
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)


            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            name_parts = pdf_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = declaration_files.objects.get(empid=emp_user, section = '80eea_declaration')
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]
                

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path) 


            declaration_files_new = declaration_files(
                empid = emp_user, 
                section = '80eea_declaration',
                filename = pdf_filename, 
                file_path =  "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
            )
            declaration_files_new.save()
        
        saved_Ilhp.place_80eea = place_80eea
        saved_Ilhp.save()

        success_message = 'PDF Generated and Uploaded successfully.'
        return render(request, 'itproofsubmissions.html', {'success_message':success_message})





def view_other_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    
    current_date = date.today()

    if request.method == 'POST':
        other_place = request.POST.get('other_place') 

    
        context={'data':data, 'saved_Ilhp':saved_Ilhp, 'other_place':other_place, 'current_date':current_date}
        
        rendered_html = render_to_string('pdfs/view_other_form.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        
        if not pdf.err:    
            result.seek(0)
            
            pdf_filename = f"{data.empid}_signed_other_declaration.pdf"
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)


            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            name_parts = pdf_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]
            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = declaration_files.objects.get(empid=emp_user, section = 'other_declaration')
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]
                

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path) 


            declaration_files_new = declaration_files(
                empid = emp_user, 
                section = 'other_declaration',
                filename = pdf_filename, 
                file_path =  "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
            )
            declaration_files_new.save()
        
        saved_Ilhp.other_place = other_place
        saved_Ilhp.save()

        success_message = 'PDF Generated and Uploaded successfully.'
        return render(request, 'itproofsubmissions.html', {'success_message':success_message})


def view_ilhp_form_both(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)  

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None
    
    try:
        ilhp_self_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_self_declaration' )
    except:  
        ilhp_self_declaration_file = None 

    try:
        ilhp_let_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_let_declaration' )
    except:  
        ilhp_let_declaration_file = None

    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)
    
    current_date = date.today()

    if request.method == 'POST':
        sole_join_owner_self = request.POST.get('sole_join_owner_self') 
        name_joint_owner_slef = request.POST.get('name_joint_owner_slef') 
        relationship_self = request.POST.get('relationship_self')
        extent_income_tax_self = request.POST.get('extent_income_tax_self') 
        is_house_self = request.POST.get('is_house_self') 
        principal_loan_tax_self = request.POST.get('principal_loan_tax_self') 
        property_address_self = request.POST.get('property_address_self')        
        barrow_date_self = request.POST.get('barrow_date_self') 
        possession_date_self = request.POST.get('possession_date_self') 

        sole_join_owner_let = request.POST.get('sole_join_owner_let') 
        name_joint_owner_let = request.POST.get('name_joint_owner_let') 
        relationship_let = request.POST.get('relationship_let')
        extent_income_tax_let = request.POST.get('extent_income_tax_let') 
        is_house_self = request.POST.get('is_house_self') 
        principal_loan_tax_let = request.POST.get('principal_loan_tax_let') 
        property_address_let = request.POST.get('property_address_let')        
        barrow_date_let = request.POST.get('barrow_date_let') 
        possession_date_let = request.POST.get('possession_date_let') 

        extent_income_tax_let = int(extent_income_tax_let) if extent_income_tax_let else int(0)
        principal_loan_tax_let = int(principal_loan_tax_let) if principal_loan_tax_let else int(0)
                
        if barrow_date_let:    
            barrow_date_let = datetime.strptime(barrow_date_let, "%Y-%m-%d")            
        else:        
            barrow_date_let = None

        if possession_date_let:    
            possession_date_let = datetime.strptime(possession_date_let, "%Y-%m-%d")            
        else:        
            possession_date_let = None

    
        extent_income_tax_self = int(extent_income_tax_self) if extent_income_tax_self else int(0)
        principal_loan_tax_self = int(principal_loan_tax_self) if principal_loan_tax_self else int(0)
                
        if barrow_date_self:    
            barrow_date_self = datetime.strptime(barrow_date_self, "%Y-%m-%d")            
        else:        
            barrow_date_self = None

        if possession_date_self:    
            possession_date_self = datetime.strptime(possession_date_self, "%Y-%m-%d")            
        else:        
            possession_date_self = None

        saved_Ilhp.sole_join_owner_self = sole_join_owner_self
        saved_Ilhp.name_joint_owner_slef = name_joint_owner_slef
        saved_Ilhp.relationship_self = relationship_self
        saved_Ilhp.extent_income_tax_self = extent_income_tax_self        
        saved_Ilhp.is_house_self = is_house_self
        saved_Ilhp.principal_loan_tax_self = principal_loan_tax_self
        saved_Ilhp.property_address_self = property_address_self
        saved_Ilhp.barrow_date_self = barrow_date_self
        saved_Ilhp.possession_date_self = possession_date_self

        saved_Ilhp.sole_join_owner_let = sole_join_owner_let
        saved_Ilhp.name_joint_owner_let = name_joint_owner_let
        saved_Ilhp.relationship_let = relationship_let
        saved_Ilhp.extent_income_tax_let = extent_income_tax_let        
        saved_Ilhp.is_house_self = is_house_self
        saved_Ilhp.principal_loan_tax_let = principal_loan_tax_let
        saved_Ilhp.property_address_let = property_address_let
        saved_Ilhp.barrow_date_let = barrow_date_let
        saved_Ilhp.possession_date_let = possession_date_let
        
        saved_Ilhp.save()

        if ilhp_self_declaration_file:
            
            old_file_path = ilhp_self_declaration_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            
            ilhp_self_declaration_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)
        
        if ilhp_let_declaration_file:

            old_file_path = ilhp_let_declaration_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            
            ilhp_let_declaration_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)



    Annual_Value = None
    totaldeduction = None
    income_loss_new = None
    if saved_Ilhp:
        if saved_Ilhp.annualLettableValue:
            Annual_Value = int(saved_Ilhp.annualLettableValue)-int(saved_Ilhp.municipalPropertyTax)
            totaldeduction = int(saved_Ilhp.standardDeduction)+int(saved_Ilhp.incomeLossOnHouseProperty)
            income_loss_new = int(Annual_Value)-int(totaldeduction)


    context={'data':data, 'saved_Ilhp':saved_Ilhp, 'saved_80C_deduction':saved_80C_deduction, 'saved_basic':saved_basic,
             'Annual_Value':Annual_Value, 'totaldeduction':totaldeduction, 'income_loss_new':income_loss_new, 'current_date':current_date }
    
    rendered_html = render_to_string('pdfs/view_ilhp_both.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_ilhp_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]
            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'ilhp_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})



def view_ilhp_form_self(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)  

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None

    try:
        ilhp_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_declaration' )
    except:  
        ilhp_declaration_file = None 

    try:
        ilhp_let_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_let_declaration' )
    except:  
        ilhp_let_declaration_file = None
    
    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)

    current_date = date.today()

    if request.method == 'POST':
        sole_join_owner_self = request.POST.get('sole_join_owner_self') 
        name_joint_owner_slef = request.POST.get('name_joint_owner_slef') 
        relationship_self = request.POST.get('relationship_self')
        extent_income_tax_self = request.POST.get('extent_income_tax_self') 
        is_house_self = request.POST.get('is_house_self') 
        principal_loan_tax_self = request.POST.get('principal_loan_tax_self') 
        property_address_self = request.POST.get('property_address_self')        
        barrow_date_self = request.POST.get('barrow_date_self') 
        possession_date_self = request.POST.get('possession_date_self') 

        extent_income_tax_self = int(extent_income_tax_self) if extent_income_tax_self else int(0)
        principal_loan_tax_self = int(principal_loan_tax_self) if principal_loan_tax_self else int(0)
                
        if barrow_date_self:    
            barrow_date_self = datetime.strptime(barrow_date_self, "%Y-%m-%d")            
        else:        
            barrow_date_self = None

        if possession_date_self:    
            possession_date_self = datetime.strptime(possession_date_self, "%Y-%m-%d")            
        else:        
            possession_date_self = None

        saved_Ilhp.sole_join_owner_self = sole_join_owner_self
        saved_Ilhp.name_joint_owner_slef = name_joint_owner_slef
        saved_Ilhp.relationship_self = relationship_self
        saved_Ilhp.extent_income_tax_self = extent_income_tax_self        
        saved_Ilhp.is_house_self = is_house_self
        saved_Ilhp.principal_loan_tax_self = principal_loan_tax_self
        saved_Ilhp.property_address_self = property_address_self
        saved_Ilhp.barrow_date_self = barrow_date_self
        saved_Ilhp.possession_date_self = possession_date_self
        saved_Ilhp.save()

        
        if ilhp_let_declaration_file:

            old_file_path = ilhp_let_declaration_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            
            ilhp_let_declaration_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)
        
        if ilhp_declaration_file:
            saved_Ilhp.sole_join_owner_let = None
            saved_Ilhp.name_joint_owner_let = None
            saved_Ilhp.relationship_let = None
            saved_Ilhp.extent_income_tax_let = None                            
            saved_Ilhp.principal_loan_tax_let = None
            saved_Ilhp.property_address_let = None
            saved_Ilhp.barrow_date_let = None
            saved_Ilhp.possession_date_let = None

            saved_Ilhp.save()

            old_file_path = ilhp_declaration_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            
            ilhp_declaration_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)

    Annual_Value = None
    totaldeduction = None
    income_loss_new = None
    if saved_Ilhp:
        if saved_Ilhp.annualLettableValue:
            Annual_Value = int(saved_Ilhp.annualLettableValue)-int(saved_Ilhp.municipalPropertyTax)
            totaldeduction = int(saved_Ilhp.standardDeduction)+int(saved_Ilhp.incomeLossOnHouseProperty)
            income_loss_new = int(Annual_Value)-int(totaldeduction)


    context={'data':data, 'saved_Ilhp':saved_Ilhp, 'saved_80C_deduction':saved_80C_deduction, 'saved_basic':saved_basic,
             'Annual_Value':Annual_Value, 'totaldeduction':totaldeduction, 'income_loss_new':income_loss_new, 'current_date':current_date }
    
    rendered_html = render_to_string('pdfs/view_ilhp_self.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_ilhp_self_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_self_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]
            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'ilhp_self_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})


def view_ilhp_form_let(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)  

    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None

    

    try:
        saved_80C_deduction = it_proof_80C_Contribution.objects.get(empid=emp_user)        
    except:
        saved_80C_deduction = None

    try:
        ilhp_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_declaration' )
    except:  
        ilhp_declaration_file = None 
    
    try:
        ilhp_self_declaration_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_self_declaration' )
    except:  
        ilhp_self_declaration_file = None 

    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)

    current_date = date.today()

    if request.method == 'POST':
        sole_join_owner_let = request.POST.get('sole_join_owner_let') 
        name_joint_owner_let = request.POST.get('name_joint_owner_let') 
        relationship_let = request.POST.get('relationship_let')
        extent_income_tax_let = request.POST.get('extent_income_tax_let') 
        is_house_self = request.POST.get('is_house_self') 
        principal_loan_tax_let = request.POST.get('principal_loan_tax_let') 
        property_address_let = request.POST.get('property_address_let')        
        barrow_date_let = request.POST.get('barrow_date_let') 
        possession_date_let = request.POST.get('possession_date_let') 

        extent_income_tax_let = int(extent_income_tax_let) if extent_income_tax_let else int(0)
        principal_loan_tax_let = int(principal_loan_tax_let) if principal_loan_tax_let else int(0)
                
        if barrow_date_let:    
            barrow_date_let = datetime.strptime(barrow_date_let, "%Y-%m-%d")            
        else:        
            barrow_date_let = None

        if possession_date_let:    
            possession_date_let = datetime.strptime(possession_date_let, "%Y-%m-%d")            
        else:        
            possession_date_let = None

        saved_Ilhp.sole_join_owner_let = sole_join_owner_let
        saved_Ilhp.name_joint_owner_let = name_joint_owner_let
        saved_Ilhp.relationship_let = relationship_let
        saved_Ilhp.extent_income_tax_let = extent_income_tax_let        
        saved_Ilhp.is_house_self = is_house_self
        saved_Ilhp.principal_loan_tax_let = principal_loan_tax_let
        saved_Ilhp.property_address_let = property_address_let
        saved_Ilhp.barrow_date_let = barrow_date_let
        saved_Ilhp.possession_date_let = possession_date_let
        saved_Ilhp.save()

        if ilhp_self_declaration_file:
            
            old_file_path = ilhp_self_declaration_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            
            ilhp_self_declaration_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)
        
        if ilhp_declaration_file:

            saved_Ilhp.sole_join_owner_self = None
            saved_Ilhp.name_joint_owner_slef = None
            saved_Ilhp.relationship_self = None
            saved_Ilhp.extent_income_tax_self = None
            saved_Ilhp.is_house_self = None
            saved_Ilhp.principal_loan_tax_self = None
            saved_Ilhp.property_address_self = None
            saved_Ilhp.barrow_date_self = None
            saved_Ilhp.possession_date_self = None
           
            saved_Ilhp.save()

            old_file_path = ilhp_declaration_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            
            ilhp_declaration_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)

    Annual_Value = None
    totaldeduction = None
    income_loss_new = None
    if saved_Ilhp:
        if saved_Ilhp.annualLettableValue:
            Annual_Value = int(saved_Ilhp.annualLettableValue)-int(saved_Ilhp.municipalPropertyTax)
            totaldeduction = int(saved_Ilhp.standardDeduction)+int(saved_Ilhp.incomeLossOnHouseProperty)
            income_loss_new = int(Annual_Value)-int(totaldeduction)


    context={'data':data, 'saved_Ilhp':saved_Ilhp, 'saved_80C_deduction':saved_80C_deduction, 'saved_basic':saved_basic,
             'Annual_Value':Annual_Value, 'totaldeduction':totaldeduction, 'income_loss_new':income_loss_new, 'current_date':current_date }
    
    rendered_html = render_to_string('pdfs/view_ilhp_letout.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_ilhp_let_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'ilhp_let_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]
            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'ilhp_let_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})



def view_hra_hl_form(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    data = EmployeeDetail.objects.get(empid=emp_user)
    saved_basic = it_proof_basic.objects.get(empid=emp_user)    
    try:
        saved_Ilhp = it_proof_income_loss.objects.get(empid=emp_user)        
    except:
        saved_Ilhp = None
    try:
        saved_hra = it_proof_hra.objects.get(empid=emp_user)        
    except:
        saved_hra = None

    if request.method == 'POST':

        hra_hl_startdt = request.POST.get('hra_hl_startdt')   
        hra_hl_enddt = request.POST.get('hra_hl_enddt')   
               
        if hra_hl_startdt:    
            hra_hl_startdt = datetime.strptime(hra_hl_startdt, "%Y-%m-%d")            
        else:        
            hra_hl_startdt = None
        if hra_hl_enddt:    
            hra_hl_enddt = datetime.strptime(hra_hl_enddt, "%Y-%m-%d")            
        else:        
            hra_hl_enddt = None

        saved_Ilhp.hra_hl_startdt = hra_hl_startdt
        saved_Ilhp.hra_hl_enddt = hra_hl_enddt
        saved_Ilhp.save()

    
    context={'data':data, 'saved_Ilhp':saved_Ilhp, 'saved_hra':saved_hra, 'saved_basic':saved_basic}
    
    rendered_html = render_to_string('pdfs/view_hra_hl_form.html', context)
    result = BytesIO()
            
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    
    if not pdf.err:    
        result.seek(0)
        
        pdf_filename = f"{data.empid}_signed_hra_hl_declaration.pdf"
        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)


        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        name_parts = pdf_filename.split('_', 1)            
        new_name = name_parts[0]+random_chars+name_parts[-1]
        
        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(result.read())
        
        try:
            old_file = declaration_files.objects.get(empid=emp_user, section = 'hra_hl_declaration')
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]
            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path) 


        declaration_files_new = declaration_files(
            empid = emp_user, 
            section = 'hra_hl_declaration',
            filename = pdf_filename, 
            file_path =  "~/media/" + emp_user + "/" + new_name,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        )
        declaration_files_new.save()

    success_message = 'PDF Generated and Uploaded successfully.'
    return render(request, 'itproofsubmissions.html', {'success_message':success_message})



def fbpclaim(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    return render(request, 'fbpclaim.html', {'data': data, 'regime':regime, 'Car_dec_last':Car_dec_last })

def emp_fbp_claim(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    bandlist1 = ['07', '7', '7B', '08', '8',
                 '09', '9', '10', 'A', 'B', 'C', 'D']

    bandlist2 = ['08', '8', '09', '9', '10', 'A', 'B', 'C', 'D']

    data = EmployeeDetail.objects.get(empid=emp_user)

    band = data.Band

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        regime = TaxRegime1.last()
    else:
        regime = None

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
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
        tbl_claim = tblClaimeMaster.objects.filter(empid = emp_user, Status = 'Approved').exclude(verL2Date=None)        
    except:
        tbl_claim = None
        
    if remaining_fuel:
        if tbl_claim:
            for i in tbl_claim:
                try:
                    app_fuel = tblFuel.objects.filter(empid = emp_user, ClaimNo = i.ClaimNo)
                    for j in app_fuel:
                        remaining_fuel = int(remaining_fuel) - int(j.AppAmt)      
                except:
                    app_fuel = None

    
    
    try:
        fbp_files = fbp_claim_file.objects.filter(empid = emp_user)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(fbp_files)]        
    except:
        fbp_files = None
        enumerated_filenames = None


    
    save_number_new = 1

    save_num_value = None
    
    try:
        fuel_tb = tblFuel.objects.filter(empid = emp_user, ClaimNo = None)  
        fuel_tb_1 = [(index + 1, file) for index, file in enumerate(fuel_tb)]   
        save_num_value = fuel_tb.last().save_number   
    except:
        fuel_tb = None
        fuel_tb_1 = None

    if fuel_tb:
        for i in fuel_tb:
            if i.save_number is None:
                save_number_new = None
    

    total_fuel = 0

    if fuel_tb:
        for i in fuel_tb:
            total_fuel = total_fuel + i.AmtClaimed

    try:
        road_tb = tblRoad.objects.filter(empid = emp_user, ClaimNo = None)   
        road_tb_1 = [(index + 1, file) for index, file in enumerate(road_tb)]   
        save_num_value = road_tb.last().save_number       
    except:
        road_tb = None
        road_tb_1 = None

    if road_tb:
        for i in road_tb:
            if i.save_number is None:                
                save_number_new = None

    total_road = 0

    if road_tb:
        for i in road_tb:
            total_road = total_road + i.AmtClaimed

    try:
        lta_tb = tblLTA.objects.filter(empid = emp_user, ClaimNo = None) 
        lta_tb_1 = [(index + 1, file) for index, file in enumerate(lta_tb)]  
        first_record = lta_tb.first()
        last_record = lta_tb.last()         
        save_num_value = lta_tb.last().save_number         
    except:
        lta_tb = None
        lta_tb_1 = None
        first_record = None
        last_record = None

    

    if lta_tb:
        for i in lta_tb:
            if i.save_number is None:                
                save_number_new = None

    total_lta = 0

    if lta_tb:
        for i in lta_tb:
            total_lta = total_lta + i.AmtClaimed

    try:
        driver_tb = Drive.objects.filter(empid = emp_user, ClaimNo = None)  
        driver_tb_1 = [(index + 1, file) for index, file in enumerate(driver_tb)]  
        save_num_value = driver_tb.last().save_number         
    except:
        driver_tb = None
        driver_tb_1 = None    
    
    if driver_tb:
        for i in driver_tb:
            if i.save_number is None:                
                save_number_new = None
    
    total_driver = 0

    if driver_tb:
        for i in driver_tb:
            total_driver = total_driver + i.DriveSal
    
    if remaining_fuel:
        rem_12_ = int(remaining_fuel)/12
        rem_12_ = round(rem_12_)
    else:
        rem_12_ = None
    
    current_date = date.today()
        
    if save_num_value:
        try:
            dec_data = fbp_dec_data.objects.get(empid = emp_user, save_number = save_num_value)
        except:
            dec_data = None
    else:
        dec_data = None

    return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec, 'Car_dec_last':Car_dec_last, 'bandlist1':bandlist1, 'bandlist2':bandlist2,
                                                   'fbp_files':fbp_files, 'enumerated_filenames':enumerated_filenames, 'regime':regime, 'band':band,
                                                    'fuel_tb':fuel_tb, 'road_tb':road_tb, 'lta_tb':lta_tb, 'driver_tb':driver_tb, 'remaining_fuel':remaining_fuel, 'rem_12_':rem_12_,
                                                     'fuel_tb_1':fuel_tb_1, 'road_tb_1':road_tb_1, 'lta_tb_1':lta_tb_1, 'driver_tb_1':driver_tb_1,
                                                      'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver, 'current_date':current_date,
                                                       'save_number_new':save_number_new, 'first_record':first_record, 'last_record':last_record, 'dec_data':dec_data })


def emp_fuel_submit(request):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        tblFuel_old = tblFuel.objects.filter(empid = emp_user)         
    except:
        tblFuel_old = None  

    try:
        tblFuel_current = tblFuel.objects.filter(empid = emp_user, ClaimNo = None)         
    except:
        tblFuel_current = None    

    
    if request.method == 'POST':
        
        f_expenseDate = request.POST.get('f_expenseDate')   
        f_claimedAmount = request.POST.get('f_claimedAmount') 
        f_receiptNo = request.POST.get('f_receiptNo')   
        f_VehNumber = request.POST.get('f_VehNumber') 

        f_upload_file = request.FILES.get('f_upload_file')

    
        if f_expenseDate:    
            f_expenseDate = datetime.strptime(f_expenseDate, "%Y-%m-%d")            
        else:        
            f_expenseDate = None   

        f_claimedAmount = int(f_claimedAmount) if f_claimedAmount else int(0)

        if tblFuel_current:
            if tblFuel_current.count() >= 10:
                message = "You've reached the limit of 10 submissions."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})

        if tblFuel_old:
            for i in tblFuel_old:
                if i.RecNumber == f_receiptNo:
                    message = "This receipt number {} has already been used.".format(f_receiptNo)
                    return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
            


        user_directory = os.path.join('static','media', emp_user)
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)
        fs = FileSystemStorage(location=user_directory)
        
        if f_upload_file.size > 4 * 1024 * 1024:
            message = "File size should not exceed 4 MB."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if not f_upload_file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
            message = "Only PDF, JPG, JPEG, and GIF files are allowed."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        filenames = fbp_claim_file.objects.filter(empid=emp_user, section='Fuel')
        if filenames:
            last_file_name = filenames.last().filename
        else:
            last_file_name = None
        
        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
        file_extension = f_upload_file.name.split('.')[-1].lower()

        if last_file_name:
            filename_parts = last_file_name.split('_')
            filenumbers= filename_parts[-1].split('.')
            
            increasenumber = int(filenumbers[0])+1

            newfilename_parts = f_upload_file.name.split('.')

            original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
        else:
            original_filename = f"{emp_user}_Fuel_1.{file_extension}"
            original_filename1 = f"{emp_user}{random_chars}Fuel_1.{file_extension}"
        
        fs.save(original_filename1, f_upload_file)

        fbp_claim_file_new = fbp_claim_file(
            empid = emp_user,
            section = 'Fuel',
            filename = original_filename,
            file_path = "~/media/" + emp_user + "/" + original_filename1,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
            reciept_no = f_receiptNo
        )
        fbp_claim_file_new.save()

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'


        tblFuel_new = tblFuel(
            empid = emp_user,
            ExpenseDt = f_expenseDate,
            AmtClaimed = f_claimedAmount,
            RecNumber = f_receiptNo,
            VehNumber = f_VehNumber,  
            ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)                              
        )
        tblFuel_new.save()        

        message = "Fuel Claim successfully saved."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})

def emp_road_submit(request):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        tblRoad_old = tblRoad.objects.filter(empid = emp_user)         
    except:
        tblRoad_old = None 

    try:
        tblRoad_current = tblRoad.objects.filter(empid = emp_user, ClaimNo = None)         
    except:
        tblRoad_current = None     


    try:
        last_cl = tblClaimeMaster.objects.filter(empid=emp_user).filter(Q(Status=None) | Q(Status='On Hold'))
        last_rd = tblRoad.objects.get(empid = emp_user, ClaimNo = last_cl.last().ClaimNo)
    except: 
        last_cl = None 
        last_rd = None

          

    if request.method == 'POST':
        
        r_expenseDate = request.POST.get('r_expenseDate')   
        r_claimedAmount = request.POST.get('r_claimedAmount') 
        r_receiptNo = request.POST.get('r_receiptNo')   
        r_VehNumber = request.POST.get('r_VehNumber') 

        r_upload_file = request.FILES.get('r_upload_file')

        if r_expenseDate:    
            r_expenseDate = datetime.strptime(r_expenseDate, "%Y-%m-%d")            
        else:        
            r_expenseDate = None   

        r_claimedAmount = int(r_claimedAmount) if r_claimedAmount else int(0)

        if last_rd:
            message = "Your last Claim Not yet verified. Please try after verification is done."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})

        if tblRoad_current:
            if tblRoad_current.count() >= 10:
                message = "You've reached the limit of 10 submissions."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})

        if tblRoad_old:
            for i in tblRoad_old:
                if i.RecNumber == r_receiptNo:
                    message = "This receipt number {} has already been used.".format(r_receiptNo)
                    return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
            


        user_directory = os.path.join('static','media', emp_user)
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)
        fs = FileSystemStorage(location=user_directory)
        
        if r_upload_file.size > 4 * 1024 * 1024:
            message = "File size should not exceed 4 MB."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if not r_upload_file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
            message = "Only PDF, JPG, JPEG, and GIF files are allowed."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        filenames = fbp_claim_file.objects.filter(empid=emp_user, section='Road')
        if filenames:
            last_file_name = filenames.last().filename
        else:
            last_file_name = None
        
        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
        file_extension = r_upload_file.name.split('.')[-1].lower()

        if last_file_name:
            filename_parts = last_file_name.split('_')
            filenumbers= filename_parts[-1].split('.')
            
            increasenumber = int(filenumbers[0])+1

            newfilename_parts = r_upload_file.name.split('.')

            original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
        else:
            original_filename = f"{emp_user}_Road_1.{file_extension}"
            original_filename1 = f"{emp_user}{random_chars}Road_1.{file_extension}"
        
        fs.save(original_filename1, r_upload_file)

        fbp_claim_file_new = fbp_claim_file(
            empid = emp_user,
            section = 'Road',
            filename = original_filename,
            file_path = "~/media/" + emp_user + "/" + original_filename1,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
            reciept_no = r_receiptNo
        )
        fbp_claim_file_new.save()




        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'

        tblRoad_new = tblRoad(
            empid = emp_user,
            ExpenseDt = r_expenseDate,
            AmtClaimed = r_claimedAmount,
            RecNumber = r_receiptNo,
            VehNumber = r_VehNumber,  
            ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)                     
        )
        tblRoad_new.save()

        message = "Road Claim successfully saved."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})

def emp_lta_submit(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid=emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        tblLTA_old = tblLTA.objects.filter(empid=emp_user)
    except:
        tblLTA_old = None
    
    try:
        tblLTA_current = tblLTA.objects.filter(empid=emp_user, ClaimNo = None)
    except:
        tblLTA_current = None
    
    try:
        last_cl = tblClaimeMaster.objects.filter(empid=emp_user).filter(Q(Status=None) | Q(Status='On Hold'))
        last_lta = tblLTA.objects.get(empid = emp_user, ClaimNo = last_cl.last().ClaimNo)
    except: 
        last_cl = None 
        last_lta = None

    if request.method == 'POST':
        ExpenseDt = request.POST.get('ExpenseDt')
        StDt = request.POST.get('StDt')
        EndDt = request.POST.get('EndDt')
        AmtClaimed = request.POST.get('AmtClaimed')
        RecNumber = request.POST.get('RecNumber')
        Origin = request.POST.get('Origin')
        PlaceTravel = request.POST.get('PlaceTravel')
        FamDec = request.POST.getlist('FamDec[]') 
        LastClaim = request.POST.get('LastClaim')
        lta_upload_file = request.FILES.getlist('lta_upload_file')

        if ExpenseDt:
            ExpenseDt = datetime.strptime(ExpenseDt, "%Y-%m-%d")
        else:
            ExpenseDt = None

        if StDt:
            StDt = datetime.strptime(StDt, "%Y-%m-%d")
        else:
            StDt = None

        if EndDt:
            EndDt = datetime.strptime(EndDt, "%Y-%m-%d")
        else:
            EndDt = None

        AmtClaimed = int(AmtClaimed) if AmtClaimed else 0
        
        FamDec_str = ','.join(FamDec)  # Join the list into a single string

        if last_lta:
            message = "Your last Claim Not yet verified. Please try after verification is done."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if tblLTA_current:
            if tblLTA_current.count() >= 10:
                message = "You've reached the limit of 10 submissions."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if tblLTA_old:
            for i in tblLTA_old:
                if i.RecNumber == RecNumber:
                    message = f"This receipt number {RecNumber} has already been used."
                    return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        user_directory = os.path.join('static', 'media', emp_user)
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)
        fs = FileSystemStorage(location=user_directory)


        large_files_lst = []

        for index, file in enumerate(lta_upload_file, start=1):

            if file.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(file.name)


        if large_files_lst:

            message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        extension_files_lst = []

        for index, file in enumerate(lta_upload_file, start=1):
            file_name, file_extension = os.path.splitext(file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(file.name)

        if extension_files_lst:
            message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})


        filenames = fbp_claim_file.objects.filter(empid=emp_user, section='LTA')
        if filenames:
            last_file_name = filenames.last().filename
        else:
            last_file_name = None        

        if last_file_name:            
            filename_parts = last_file_name.split('_')                       
            increasenumber = int(filename_parts[2]) + 1
                
        for index, file in enumerate(lta_upload_file, start=1):

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            file_extension = file.name.split('.')[-1].lower()

            if last_file_name:        
                newfilename_parts = file.name.split('.')
                original_filename = f"{filename_parts[0]}_{filename_parts[1]}_{str(increasenumber)}_{index}.{newfilename_parts[-1]}"
                original_filename1 = f"{filename_parts[0]}{random_chars}{filename_parts[1]}_{str(increasenumber)}_{index}.{newfilename_parts[-1]}"
            else:
                original_filename = f"{emp_user}_LTA_1_{index}.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}LTA_1_{index}.{file_extension}"

            fs.save(original_filename1, file)

            fbp_claim_file_new = fbp_claim_file(
                empid=emp_user,
                section='LTA',
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30),
                reciept_no=RecNumber
            )
            fbp_claim_file_new.save()

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'

        tblLTA_new = tblLTA(
            empid=emp_user,
            ExpenseDt=ExpenseDt,
            AmtClaimed=AmtClaimed,
            RecNumber=RecNumber,
            StDt=StDt,
            EndDt=EndDt,
            Origin=Origin,
            PlaceTravel=PlaceTravel,
            FamDec=FamDec_str,
            LastClaim=LastClaim,
            ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)     
        )
        tblLTA_new.save()

        message = "LTA Claim successfully saved."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

def emp_driver_submit(request):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        Driver_old = Drive.objects.filter(empid = emp_user)         
    except:
        Driver_old = None  

    try:
        Driver_current = Drive.objects.filter(empid = emp_user, ClaimNo = None)         
    except:
        Driver_current = None             

    if request.method == 'POST':
        
        d_ExpenseDt = request.POST.get('d_ExpenseDt')        
        d_RecNumber = request.POST.get('d_RecNumber')   
        d_DriveSal = request.POST.get('d_DriveSal')
        d_SalaryMonth = request.POST.get('d_SalaryMonth') 

        driver_file = request.FILES.get('driver_file')

        if d_ExpenseDt:    
            d_ExpenseDt = datetime.strptime(d_ExpenseDt, "%Y-%m-%d")            
        else:        
            d_ExpenseDt = None   

        d_DriveSal = int(d_DriveSal) if d_DriveSal else int(0)       


        if Driver_current:
            if Driver_current.count() >= 10:
                message = "You've reached the limit of 10 submissions."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})

        if Driver_old:
            for i in Driver_old:
                if i.RecNumber == d_RecNumber:
                    message = "This receipt number {} has already been used.".format(d_RecNumber)
                    return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
            


        user_directory = os.path.join('static','media', emp_user)
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)
        fs = FileSystemStorage(location=user_directory)
        
        if driver_file.size > 4 * 1024 * 1024:
            message = "File size should not exceed 4 MB."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if not driver_file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
            message = "Only PDF, JPG, JPEG, and GIF files are allowed."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        filenames = fbp_claim_file.objects.filter(empid=emp_user, section='Driver')
        if filenames:
            last_file_name = filenames.last().filename
        else:
            last_file_name = None
        
        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        
        file_extension = driver_file.name.split('.')[-1].lower()

        if last_file_name:
            filename_parts = last_file_name.split('_')
            filenumbers= filename_parts[-1].split('.')
            
            increasenumber = int(filenumbers[0])+1

            newfilename_parts = driver_file.name.split('.')

            original_filename= filename_parts[0]+'_'+filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
            original_filename1= filename_parts[0]+ random_chars +filename_parts[1]+'_'+str(increasenumber)+'.'+newfilename_parts[-1]
        else:
            original_filename = f"{emp_user}_Driver_1.{file_extension}"
            original_filename1 = f"{emp_user}{random_chars}Driver_1.{file_extension}"
        
        fs.save(original_filename1, driver_file)

        fbp_claim_file_new = fbp_claim_file(
            empid = emp_user,
            section = 'Driver',
            filename = original_filename,
            file_path = "~/media/" + emp_user + "/" + original_filename1,
            uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
            reciept_no = d_RecNumber
        )
        fbp_claim_file_new.save()




        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'

        Drive_new = Drive(
            empid = emp_user,
            ExpenseDt = d_ExpenseDt,            
            RecNumber = d_RecNumber,
            DriveSal = d_DriveSal,
            SalaryMonth = d_SalaryMonth,
            ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)                       
        )
        Drive_new.save()

        message = "Road Claim successfully saved."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
        


def delete_fbp_fuel(request, reciept):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    
    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)
    
    tblFuel_new = tblFuel.objects.get(RecNumber=reciept)
    tblFuel_new.delete()

    fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = reciept) 

    old_file_path = fbp_claim_file_new.file_path
    parts_old_file_path = old_file_path.split('/')[-1]
    
    full_old_file_path = os.path.join(user_directory, parts_old_file_path)

    if os.path.exists(full_old_file_path):
        os.remove(full_old_file_path) 
    
    fbp_claim_file_new.delete()  

    message = "The Claim is deleted successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def delete_fbp_road(request, reciept):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    
    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)
    
    tblRoad_new = tblRoad.objects.get(RecNumber=reciept)
    tblRoad_new.delete()

    fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = reciept) 

    old_file_path = fbp_claim_file_new.file_path
    parts_old_file_path = old_file_path.split('/')[-1]
    
    full_old_file_path = os.path.join(user_directory, parts_old_file_path)

    if os.path.exists(full_old_file_path):
        os.remove(full_old_file_path) 
    
    fbp_claim_file_new.delete()  

    message = "The Claim is deleted successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})
                                              
def delete_fbp_lta(request, reciept):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    
    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)
    
    tblLTA_new = tblLTA.objects.get(RecNumber=reciept)
    tblLTA_new.delete()

    fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = reciept) 

    old_file_path = fbp_claim_file_new.file_path
    parts_old_file_path = old_file_path.split('/')[-1]
    
    full_old_file_path = os.path.join(user_directory, parts_old_file_path)

    if os.path.exists(full_old_file_path):
        os.remove(full_old_file_path) 
    
    fbp_claim_file_new.delete()  

    message = "The Claim is deleted successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def delete_fbp_driver(request, reciept):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    
    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)
    
    Drive_new = Drive.objects.get(RecNumber=reciept)
    Drive_new.delete()

    fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = reciept) 

    old_file_path = fbp_claim_file_new.file_path
    parts_old_file_path = old_file_path.split('/')[-1]
    
    full_old_file_path = os.path.join(user_directory, parts_old_file_path)

    if os.path.exists(full_old_file_path):
        os.remove(full_old_file_path) 
    
    fbp_claim_file_new.delete()  

    message = "The Claim is deleted successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})


  
def update_fuel(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        tblFuel_old = tblFuel.objects.filter(empid = emp_user)         
    except:
        tblFuel_old = None    

    
    if request.method == 'POST':
        
        fuel_id_no = request.POST.get('fuel_id_no')  
        f_expenseDate_edit = request.POST.get('f_expenseDate_edit')   
        f_claimedAmount_edit = request.POST.get('f_claimedAmount_edit') 
        f_receiptNo_edit = request.POST.get('f_receiptNo_edit')   
        f_VehNumber_edit = request.POST.get('f_VehNumber_edit') 

        f_upload_file_edit = request.FILES.get('f_upload_file_edit')


        fuel_current = tblFuel.objects.get(id = fuel_id_no)   

        current_file = fbp_claim_file.objects.get(reciept_no = fuel_current.RecNumber)   

        if f_expenseDate_edit:    
            f_expenseDate_edit = datetime.strptime(f_expenseDate_edit, "%Y-%m-%d")            
        else:        
            f_expenseDate_edit = None   

        f_claimedAmount_edit = int(f_claimedAmount_edit) if f_claimedAmount_edit else int(0)


        if tblFuel_old:
            for i in tblFuel_old:
                if int(i.id) != int(fuel_id_no):
                    if i.RecNumber == f_receiptNo_edit:
                        message = "This receipt number {} has already been used.".format(f_receiptNo_edit)
                        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
        

        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)

        fs = FileSystemStorage(location=user_directory)
        
        old_file_path = current_file.file_path
        parts_old_file_path = old_file_path.split('/')[-1]
        
        full_old_file_path = os.path.join(user_directory, parts_old_file_path)

        if os.path.exists(full_old_file_path):
            os.remove(full_old_file_path)
        
        if f_upload_file_edit.size > 4 * 1024 * 1024:
            message = "File size should not exceed 4 MB."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if not f_upload_file_edit.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
            message = "Only PDF, JPG, JPEG, and GIF files are allowed."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        fs.save(parts_old_file_path, f_upload_file_edit)
                    
        current_file.uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        current_file.reciept_no = f_receiptNo_edit
        current_file.save()

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'


        fuel_current.ExpenseDt = f_expenseDate_edit
        fuel_current.AmtClaimed = f_claimedAmount_edit
        fuel_current.RecNumber = f_receiptNo_edit
        fuel_current.VehNumber = f_VehNumber_edit 
        fuel_current.ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)        
        fuel_current.save()


        message = "The Claim is updated successfully."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def update_road(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        tblRoad_old = tblRoad.objects.filter(empid = emp_user)         
    except:
        tblRoad_old = None    

    
    if request.method == 'POST':
        
        road_id_no = request.POST.get('road_id_no')  
        r_expenseDate_edit = request.POST.get('r_expenseDate_edit')   
        r_claimedAmount_edit = request.POST.get('r_claimedAmount_edit') 
        r_receiptNo_edit = request.POST.get('r_receiptNo_edit')   
        r_VehNumber_edit = request.POST.get('r_VehNumber_edit') 

        r_upload_file_edit = request.FILES.get('r_upload_file_edit')


        road_current = tblRoad.objects.get(id = road_id_no)   

        current_file = fbp_claim_file.objects.get(reciept_no = road_current.RecNumber)   

        if r_expenseDate_edit:    
            r_expenseDate_edit = datetime.strptime(r_expenseDate_edit, "%Y-%m-%d")            
        else:        
            r_expenseDate_edit = None   

        r_claimedAmount_edit = int(r_claimedAmount_edit) if r_claimedAmount_edit else int(0)


        if tblRoad_old:
            for i in tblRoad_old:
                if int(i.id) != int(road_id_no):
                    if i.RecNumber == r_receiptNo_edit:
                        message = "This receipt number {} has already been used.".format(r_receiptNo_edit)
                        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
        

        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)

        fs = FileSystemStorage(location=user_directory)
        
        old_file_path = current_file.file_path
        parts_old_file_path = old_file_path.split('/')[-1]
        
        full_old_file_path = os.path.join(user_directory, parts_old_file_path)

        if os.path.exists(full_old_file_path):
            os.remove(full_old_file_path)
        
        if r_upload_file_edit.size > 4 * 1024 * 1024:
            message = "File size should not exceed 4 MB."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if not r_upload_file_edit.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
            message = "Only PDF, JPG, JPEG, and GIF files are allowed."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        fs.save(parts_old_file_path, r_upload_file_edit)
                    
        current_file.uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        current_file.reciept_no = r_receiptNo_edit
        current_file.save()

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'


        road_current.ExpenseDt = r_expenseDate_edit
        road_current.AmtClaimed = r_claimedAmount_edit
        road_current.RecNumber = r_receiptNo_edit
        road_current.VehNumber = r_VehNumber_edit
        road_current.ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)                
        road_current.save()


        message = "The Claim is updated successfully."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def update_lta(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        tblLTA_old = tblLTA.objects.filter(empid = emp_user)         
    except:
        tblLTA_old = None    

    
    if request.method == 'POST':
        
        lta_id_no = request.POST.get('lta_id_no')  

        ExpenseDt_edit = request.POST.get('ExpenseDt_edit')
        StDt_edit = request.POST.get('StDt_edit')
        EndDt_edit = request.POST.get('EndDt_edit')
        AmtClaimed_edit = request.POST.get('AmtClaimed_edit')
        RecNumber_edit = request.POST.get('RecNumber_edit')
        Origin_edit = request.POST.get('Origin_edit')
        PlaceTravel_edit = request.POST.get('PlaceTravel_edit')
        FamDec_edit = request.POST.getlist('FamDec_edit[]') 
        LastClaim_edit = request.POST.get('LastClaim_edit')        
        lta_upload_file_edit = request.FILES.getlist('lta_upload_file_edit')
        
        lta_current = tblLTA.objects.get(id = lta_id_no)   

        current_files = fbp_claim_file.objects.filter(reciept_no = lta_current.RecNumber)   

        if ExpenseDt_edit:
            ExpenseDt_edit = datetime.strptime(ExpenseDt_edit, "%Y-%m-%d")
        else:
            ExpenseDt_edit = None

        if StDt_edit:
            StDt_edit = datetime.strptime(StDt_edit, "%Y-%m-%d")
        else:
            StDt_edit = None

        if EndDt_edit:
            EndDt_edit = datetime.strptime(EndDt_edit, "%Y-%m-%d")
        else:
            EndDt_edit = None

        AmtClaimed_edit = int(AmtClaimed_edit) if AmtClaimed_edit else 0
        
        FamDec_str_edit = ','.join(FamDec_edit)  # Join the list into a single string

        if tblLTA_old:
            for i in tblLTA_old:
                if int(i.id) != int(lta_id_no):                    
                    if i.RecNumber == RecNumber_edit:
                        message = "This receipt number {} has already been used.".format(RecNumber_edit)
                        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
        

        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)

        fs = FileSystemStorage(location=user_directory)

        for file in current_files:    
            old_file_path = file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]

            full_old_file_path = os.path.join(user_directory, parts_old_file_path)

            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)

            file.delete()
        
        large_files_lst = []

        for index, file in enumerate(lta_upload_file_edit, start=1):

            if file.size > 4 * 1024 * 1024:  # 4MB in bytes
                large_files_lst.append(file.name)


        if large_files_lst:

            message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        extension_files_lst = []

        for index, file in enumerate(lta_upload_file_edit, start=1):
            file_name, file_extension = os.path.splitext(file.name)
            file_extension = file_extension.lower()

            # Check if file extension is allowed
            if file_extension not in ['.pdf', '.png', '.jpg']:
                extension_files_lst.append(file.name)

        if extension_files_lst:
            message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})


        filenames = fbp_claim_file.objects.filter(empid=emp_user, section='LTA')
        if filenames:
            last_file_name = filenames.last().filename
        else:
            last_file_name = None        

        if last_file_name:            
            filename_parts = last_file_name.split('_')               
            increasenumber = int(filename_parts[2]) + 1
                
        for index, file in enumerate(lta_upload_file_edit, start=1):

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            file_extension = file.name.split('.')[-1].lower()

            if last_file_name:        
                newfilename_parts = file.name.split('.')
                original_filename = f"{filename_parts[0]}_{filename_parts[1]}_{str(increasenumber)}_{index}.{newfilename_parts[-1]}"
                original_filename1 = f"{filename_parts[0]}{random_chars}{filename_parts[1]}_{str(increasenumber)}_{index}.{newfilename_parts[-1]}"
            else:
                original_filename = f"{emp_user}_LTA_1_{index}.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}LTA_1_{index}.{file_extension}"

            fs.save(original_filename1, file)

            fbp_claim_file_new = fbp_claim_file(
                empid=emp_user,
                section='LTA',
                filename=original_filename,
                file_path=f"~/media/{emp_user}/{original_filename1}",
                uploaddt=timezone.now() + timedelta(hours=5, minutes=30),
                reciept_no=RecNumber_edit
            )
            fbp_claim_file_new.save()

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'


        lta_current.ExpenseDt = ExpenseDt_edit
        lta_current.AmtClaimed = AmtClaimed_edit
        lta_current.RecNumber = RecNumber_edit
        lta_current.StDt = StDt_edit
        lta_current.EndDt = EndDt_edit

        lta_current.Origin = Origin_edit
        lta_current.PlaceTravel = PlaceTravel_edit
        lta_current.FamDec = FamDec_str_edit
        lta_current.LastClaim = LastClaim_edit 
        lta_current.ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)            
        lta_current.save()


        message = "The Claim is updated successfully."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def update_driver(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    try:
        Drive_old = Drive.objects.filter(empid = emp_user)         
    except:
        Drive_old = None    

    
    if request.method == 'POST':
        
        driver_id_no = request.POST.get('driver_id_no')  
        d_ExpenseDt_edit = request.POST.get('d_ExpenseDt_edit')   
        d_DriveSal_edit = request.POST.get('d_DriveSal_edit') 
        d_RecNumber_edit = request.POST.get('d_RecNumber_edit')   
        d_SalaryMonth_edit = request.POST.get('d_SalaryMonth_edit') 

        driver_file_edit = request.FILES.get('driver_file_edit')


        driver_current = Drive.objects.get(id = driver_id_no)   

        current_file = fbp_claim_file.objects.get(reciept_no = driver_current.RecNumber)   

        if d_ExpenseDt_edit:    
            d_ExpenseDt_edit = datetime.strptime(d_ExpenseDt_edit, "%Y-%m-%d")            
        else:        
            d_ExpenseDt_edit = None   

        d_DriveSal_edit = int(d_DriveSal_edit) if d_DriveSal_edit else int(0)


        if Drive_old:
            for i in Drive_old:
                if int(i.id) != int(driver_id_no):
                    if i.RecNumber == d_RecNumber_edit:
                        message = "This receipt number {} has already been used.".format(d_RecNumber_edit)
                        return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec':Car_dec,  'Car_dec_last':Car_dec_last, 'message':message})
        

        user_directory = os.path.join('static', 'media', emp_user)
        os.makedirs(user_directory, exist_ok=True)

        fs = FileSystemStorage(location=user_directory)
        
        old_file_path = current_file.file_path
        parts_old_file_path = old_file_path.split('/')[-1]
        
        full_old_file_path = os.path.join(user_directory, parts_old_file_path)

        if os.path.exists(full_old_file_path):
            os.remove(full_old_file_path)
        
        if driver_file_edit.size > 4 * 1024 * 1024:
            message = "File size should not exceed 4 MB."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        if not driver_file_edit.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
            message = "Only PDF, JPG, JPEG, and GIF files are allowed."
            return render(request, 'emp_fbp_claim.html', {'data': data, 'Car_dec': Car_dec, 'Car_dec_last': Car_dec_last, 'message': message})

        fs.save(parts_old_file_path, driver_file_edit)
                    
        current_file.uploaddt = timezone.now() + timedelta(hours=5, minutes=30)
        current_file.reciept_no = d_RecNumber_edit
        current_file.save()

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
        ClaimNo = f'F{data.empid}{formatted_save_ts}'


        driver_current.ExpenseDt = d_ExpenseDt_edit
        driver_current.DriveSal = d_DriveSal_edit
        driver_current.RecNumber = d_RecNumber_edit
        driver_current.SalaryMonth = d_SalaryMonth_edit
        driver_current.ClaimDt = timezone.now() + timedelta(hours=5, minutes=30)                
        driver_current.save()


        message = "The Claim is updated successfully."
        return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})


def fbp_submit(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)

    save_old_number = None

    try:
        fuel_tb = tblFuel.objects.filter(empid = emp_user, ClaimNo = None)  
        Fuel = True    
        for i in fuel_tb:
            save_old_number = i.save_number    
    except:
        fuel_tb = None        
        Fuel = False
    
    try:
        road_tb = tblRoad.objects.filter(empid = emp_user, ClaimNo = None)   
        Road = True  
        for i in road_tb:
            save_old_number = i.save_number           
    except:
        road_tb = None
        Road = False        
    
    try:
        lta_tb = tblLTA.objects.filter(empid = emp_user, ClaimNo = None)  
        LTA = True 
        for i in lta_tb:
            save_old_number = i.save_number           
    except:
        lta_tb = None        
        LTA = False

    try:
        driver_tb = Drive.objects.filter(empid = emp_user, ClaimNo = None) 
        Driver = True  
        for i in driver_tb:
            save_old_number = i.save_number              
    except:
        driver_tb = None
        Driver = False   

    if save_old_number:
        if road_tb:
            try:
                road_dec_file = fbp_claim_file.objects.get(empid=emp_user, section = 'road_dec', save_number = save_old_number)
            except:
                road_dec_file = None

        if lta_tb:
            try:
                lta_dec_file = fbp_claim_file.objects.get(empid=emp_user, section = 'lta_dec', save_number = save_old_number)
            except:
                lta_dec_file = None
        
        if driver_tb:
            try:
                driv_dec_file = fbp_claim_file.objects.get(empid=emp_user, section = 'drive_dec', save_number = save_old_number)
            except:
                driv_dec_file = None
            
    if save_old_number:
        if road_tb:
            if road_dec_file is None:
                message = "You have declared road claims but have not uploaded the signed declaration. Please upload it and try again."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})
        if lta_tb:
            if lta_dec_file is None:
                message = "You have declared LTA claims but have not uploaded the signed declaration. Please upload it and try again."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})
        if driver_tb:
            if driv_dec_file is None:
                message = "You have declared driver salary claims but have not uploaded the signed declaration. Please upload it and try again."
                return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})
    

    save_ts = timezone.now() + timedelta(hours=5, minutes=30)
    formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
    ClaimNo = f'F{data.empid}{formatted_save_ts}'
    

    if fuel_tb:
        for i in fuel_tb:            
            i.ClaimNo = ClaimNo
            i.save()
        
    
    if road_tb:
        for i in road_tb:            
            i.ClaimNo = ClaimNo
            i.save()
        

    if lta_tb:
        for i in lta_tb:            
            i.ClaimNo = ClaimNo
            i.save()
    
    if driver_tb:
        for i in driver_tb:            
            i.ClaimNo = ClaimNo
            i.save()

        
    
    tblClaimeMaster_new = tblClaimeMaster(
        empid = emp_user,
        emp_name = data.empname,
        ClaimNo = ClaimNo,
        Fuel = Fuel, 
        Road = Road, 
        LTA = LTA, 
        Driver = Driver,
        SubDate = timezone.now() + timedelta(hours=5, minutes=30)                
    )
    tblClaimeMaster_new.save()


    
    mail_master_tb = tblClaimeMaster.objects.get(empid = emp_user, ClaimNo = ClaimNo) 

    
    total_fuel = 0
    if fuel_tb:
        mail_fuel_tb = tblFuel.objects.filter(empid = emp_user, ClaimNo = ClaimNo)                 
        for i in mail_fuel_tb:
            total_fuel = total_fuel + i.AmtClaimed            
    else:
        mail_fuel_tb = None
    

    total_road = 0

    if road_tb:
        mail_road_tb = tblRoad.objects.filter(empid = emp_user, ClaimNo = ClaimNo) 
        for i in mail_road_tb:
            total_road = total_road + i.AmtClaimed
    else:
        mail_road_tb = None
    
    total_lta = 0

    if lta_tb:
        mail_lta_tb = tblLTA.objects.filter(empid = emp_user, ClaimNo = ClaimNo) 
        for i in mail_lta_tb:
            total_lta = total_lta + i.AmtClaimed
            i.FamDec = split_word(i.FamDec)
    else:
        mail_lta_tb = None
    
    
    
    total_driver = 0

    if driver_tb:
        mail_driver_tb = Drive.objects.filter(empid = emp_user, ClaimNo = ClaimNo) 
        for i in mail_driver_tb:
            total_driver = total_driver + i.DriveSal
    else:
        mail_driver_tb = None

    

    context = {
        'mail_master_tb':mail_master_tb,
        'mail_fuel_tb':mail_fuel_tb, 'mail_road_tb':mail_road_tb,
        'mail_lta_tb':mail_lta_tb, 'mail_driver_tb':mail_driver_tb,
        'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver     
    }

    # rendered_html = render_to_string('it_proof_sub_mail.html', context)
    rendered_html = render_to_string('fbp_emp_mail.html', context)
    result = BytesIO()
        
    pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

    email_body = f'''
        <p>Dear <strong>{data.empname} ({data.empid})</strong>,</p>
        <p>Thanks for submitting Claim details.</p>

        <ul style="color: red;">
            <li>Please do not reply to this e-mail. This mail id is not monitored.</li>
            <li>Please do not send soft copies of proofs to us by email OR hard copies through post or courier.</li>
            <li>*Note: Please note that Kitty concept has been discontinued in {data.Company_Name} effective April 2019. Hence there will be no separate deduction or reimbursement for approved amount of FBP claims.</li>
            <li>You will see a tax exemption directly in your Monthly payslip under Other Exemptions section in the upcoming payroll of the approved FBP claim amount.</li>
        </ul>

        <p>Below is the details of your Claims.</p>
        '''

    email_subject = f'FBP Claim Submission Status Claim_No:{ClaimNo}'
    
    pdf_filename = f"{data.empid}.pdf"
    if not pdf.err:
        email = EmailMessage(
            subject=email_subject,
            body=email_body,
            from_email=settings.EMAIL_HOST_USER,
            to=[data.empemail],
        )
        email.content_subtype = 'html'
        email.attach(pdf_filename, result.getvalue(), 'application/pdf')
        email.send(fail_silently=False)

    else:
        print("Error during PDF generation:", pdf.err)
        
    message = "FBP Claim successfully submitted."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})
    
def fbp_history(request, claim_no):

    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)

    fbp_claim = tblClaimeMaster.objects.get(empid=emp_user, ClaimNo = claim_no)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
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
        tbl_claim = tblClaimeMaster.objects.filter(empid = emp_user, Status = 'Approved').exclude(verL2Date=None)        
    except:
        tbl_claim = None    
        
    if remaining_fuel:
        if tbl_claim:
            for i in tbl_claim:
                try:
                    app_fuel = tblFuel.objects.filter(empid = emp_user, ClaimNo = i.ClaimNo)
                    for j in app_fuel:
                        remaining_fuel = int(remaining_fuel) - int(j.AppAmt)      
                except:
                    app_fuel = None
    
    try:
        fbp_files = fbp_claim_file.objects.filter(empid = emp_user)
        enumerated_filenames = [(index + 1, file) for index, file in enumerate(fbp_files)]
    except:
        fbp_files = None
        enumerated_filenames = None
    
    try:
        fuel_tb = tblFuel.objects.filter(empid = emp_user, ClaimNo = claim_no)  
        fuel_tb_1 = [(index + 1, file) for index, file in enumerate(fuel_tb)]      
    except:
        fuel_tb = None
        fuel_tb_1 = None

    total_fuel = 0

    if fuel_tb:
        for i in fuel_tb:
            total_fuel = total_fuel + i.AmtClaimed

    try:
        road_tb = tblRoad.objects.filter(empid = emp_user, ClaimNo = claim_no)   
        road_tb_1 = [(index + 1, file) for index, file in enumerate(road_tb)]       
    except:
        road_tb = None
        road_tb_1 = None

    total_road = 0

    if road_tb:
        for i in road_tb:
            total_road = total_road + i.AmtClaimed

    try:
        lta_tb = tblLTA.objects.filter(empid = emp_user, ClaimNo = claim_no) 
        lta_tb_1 = [(index + 1, file) for index, file in enumerate(lta_tb)]         
    except:
        lta_tb = None
        lta_tb_1 = None

    total_lta = 0

    if lta_tb:
        for i in lta_tb:
            total_lta = total_lta + i.AmtClaimed

    try:
        driver_tb = Drive.objects.filter(empid = emp_user, ClaimNo = claim_no)  
        driver_tb_1 = [(index + 1, file) for index, file in enumerate(driver_tb)]        
    except:
        driver_tb = None
        driver_tb_1 = None        
    
    total_driver = 0

    if driver_tb:
        for i in driver_tb:
            total_driver = total_driver + i.DriveSal
        
    try:
        fbp_files_rs = fbp_claim_file.objects.filter(empid = emp_user, ClaimNo = claim_no)
        enumerated_filenames_rs = [(index + 1, file) for index, file in enumerate(fbp_files_rs)]
    except:
        fbp_files_rs = None
        enumerated_filenames_rs = None

    total_app_fuel = 0
    total_app_road = 0
    total_app_lta = 0
    total_app_driver = 0

    
    
    if fbp_claim.Status == 'Approved' and fbp_claim.verL2Date:    
        if fuel_tb:
            for i in fuel_tb:
                total_app_fuel = total_app_fuel + i.AppAmt
        
        if road_tb:
            for i in road_tb:
                total_app_road = total_app_road + i.AppAmt
        
        if lta_tb:
            for i in lta_tb:
                total_app_lta = total_app_lta + i.AppAmt
        
        if driver_tb:
            for i in driver_tb:
                total_app_driver = total_app_driver + i.AppAmt


    user_directory = os.path.join('static','media', emp_user)
    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    fs = FileSystemStorage(location=user_directory)

    if request.method == 'POST':
        f_upload_file = request.FILES.get('f_upload_file')
        r_upload_file = request.FILES.get('r_upload_file')
        lta_upload_file = request.FILES.getlist('lta_upload_file')
        driver_file = request.FILES.get('driver_file')    


        large_files_lst = []

        extension_files_lst = []


        if f_upload_file:
            if f_upload_file.size > 4 * 1024 * 1024:
                large_files_lst.append(f_upload_file.name)

            if not f_upload_file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
                extension_files_lst.append(f_upload_file.name)
        
        if r_upload_file:
            if r_upload_file.size > 4 * 1024 * 1024:
                large_files_lst.append(r_upload_file.name)

            if not r_upload_file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
                extension_files_lst.append(r_upload_file.name)
            
        if lta_upload_file:
            for index, file in enumerate(lta_upload_file, start=1):
                if file.size > 4 * 1024 * 1024:  
                    large_files_lst.append(file.name)

                if not file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
                    extension_files_lst.append(file.name)                    

        if driver_file:
            if driver_file.size > 4 * 1024 * 1024:
                large_files_lst.append(driver_file.name)

            if not driver_file.name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.gif')):
                extension_files_lst.append(driver_file.name)


        if large_files_lst:
            message = "File {} size is above 4MB".format(large_files_lst)
            return render(request, 'fbp_history.html', {'data': data, 'fbp_claim':fbp_claim, 'message': message})
        
        if extension_files_lst:
            message = "Accept only .pdf, .png and .jpg formats."
            return render(request, 'fbp_history.html', {'data': data, 'fbp_claim':fbp_claim, 'message': message})

        try:
            old_f_resub = fbp_claim_file.objects.filter(empid = emp_user, section = 'Fuel_Resub')   
            old_f_re_last = old_f_resub.last()      
        except:
            old_f_resub = None 
            old_f_re_last = None           

        if f_upload_file:            
                        
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))            
            file_extension = f_upload_file.name.split('.')[-1].lower()            

            if old_f_re_last:
                old_file_name = old_f_re_last.filename                
                old_fil_parts = old_file_name.split('.')
                old_file_num = int(old_fil_parts[0].split('_')[-1])
                new_num = old_file_num + 1
                
                original_filename = f"{emp_user}_Fuel_Resub_{new_num}.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Fuel_Resub_{new_num}.{file_extension}" 

            else:
                original_filename = f"{emp_user}_Fuel_Resub_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Fuel_Resub_1.{file_extension}"  


            fs.save(original_filename1, f_upload_file)

            fbp_claim_file_new = fbp_claim_file(
                empid = emp_user,
                section = 'Fuel_Resub',
                filename = original_filename,
                file_path = "~/media/" + emp_user + "/" + original_filename1,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
                ClaimNo = claim_no
            )
            fbp_claim_file_new.save()

        
        try:
            old_r_resub = fbp_claim_file.objects.filter(empid = emp_user, section = 'Road_Resub')   
            old_r_re_last = old_r_resub.last()      
        except:
            old_r_resub = None 
            old_r_re_last = None  
        
        if r_upload_file:            
            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))            
            file_extension = r_upload_file.name.split('.')[-1].lower()

            if old_r_re_last:
                old_file_name = old_r_re_last.filename                
                old_fil_parts = old_file_name.split('.')
                old_file_num = int(old_fil_parts[0].split('_')[-1])
                new_num = old_file_num + 1
                
                original_filename = f"{emp_user}_Road_Resub_{new_num}.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Road_Resub_{new_num}.{file_extension}"

            else:
                original_filename = f"{emp_user}_Road_Resub_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Road_Resub_1.{file_extension}"
            
            fs.save(original_filename1, r_upload_file)

            fbp_claim_file_new = fbp_claim_file(
                empid = emp_user,
                section = 'Road_Resub',
                filename = original_filename,
                file_path = "~/media/" + emp_user + "/" + original_filename1,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
                ClaimNo = claim_no
            )
            fbp_claim_file_new.save()
            

        try:
            old_l_resub = fbp_claim_file.objects.filter(empid = emp_user, section = 'LTA_Resub')   
            old_l_re_last = old_l_resub.last()      
        except:
            old_l_resub = None 
            old_l_re_last = None 

        if old_l_re_last:            
            filename_parts = old_l_re_last.split('_')                       
            increasenumber = int(filename_parts[2]) + 1
       
        if lta_upload_file:
            for index, file in enumerate(lta_upload_file, start=1):

                random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
                file_extension = file.name.split('.')[-1].lower()
                
                if old_l_re_last:
                    original_filename = f"{emp_user}_LTA_Resub_{increasenumber}_{index}.{file_extension}"
                    original_filename1 = f"{emp_user}{random_chars}LTA_Resub_{increasenumber}_{index}.{file_extension}"
                else:
                    original_filename = f"{emp_user}_LTA_Resub_1_{index}.{file_extension}"
                    original_filename1 = f"{emp_user}{random_chars}LTA_Resub_1_{index}.{file_extension}"

                fs.save(original_filename1, file)

                fbp_claim_file_new = fbp_claim_file(
                    empid=emp_user,
                    section='LTA_Resub',
                    filename=original_filename,
                    file_path=f"~/media/{emp_user}/{original_filename1}",
                    uploaddt=timezone.now() + timedelta(hours=5, minutes=30),
                    ClaimNo = claim_no
                )
                fbp_claim_file_new.save()


        try:
            old_d_resub = fbp_claim_file.objects.filter(empid = emp_user, section = 'Driver_Resub')   
            old_d_re_last = old_d_resub.last()      
        except:
            old_d_resub = None 
            old_d_re_last = None 

        if driver_file:            
            
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))            
            file_extension = driver_file.name.split('.')[-1].lower()

            if old_d_re_last:
                old_file_name = old_d_re_last.filename                
                old_fil_parts = old_file_name.split('.')
                old_file_num = int(old_fil_parts[0].split('_')[-1])
                new_num = old_file_num + 1
                
                original_filename = f"{emp_user}_Driver_Resub_{new_num}.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Driver_Resub_{new_num}.{file_extension}"

            else:            
                original_filename = f"{emp_user}_Driver_Resub_1.{file_extension}"
                original_filename1 = f"{emp_user}{random_chars}Driver_Resub_1.{file_extension}"
            
            fs.save(original_filename1, driver_file)

            fbp_claim_file_new = fbp_claim_file(
                empid = emp_user,
                section = 'Driver_Resub',
                filename = original_filename,
                file_path = "~/media/" + emp_user + "/" + original_filename1,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
                ClaimNo = claim_no
            )
            fbp_claim_file_new.save()


        fbp_claim.Sub2date = timezone.now() + timedelta(hours=5, minutes=30)
        fbp_claim.save()

        message = "File uploaded successfully."
        return render(request, 'fbp_history.html', {'data': data, 'fbp_claim':fbp_claim, 'message': message})
        
    return render(request, 'fbp_history.html', {'data':data, 'fbp_claim':fbp_claim, 'remaining_fuel':remaining_fuel,
                                                'fbp_files':fbp_files, 'enumerated_filenames':enumerated_filenames,
                                                'fuel_tb':fuel_tb, 'road_tb':road_tb, 'lta_tb':lta_tb, 'driver_tb':driver_tb,
                                                'fuel_tb_1':fuel_tb_1, 'road_tb_1':road_tb_1, 'lta_tb_1':lta_tb_1, 'driver_tb_1':driver_tb_1,
                                                'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver,
                                                'fbp_files_rs':fbp_files_rs, 'enumerated_filenames_rs':enumerated_filenames_rs,
                                                'total_app_fuel':total_app_fuel, 'total_app_road':total_app_road, 'total_app_lta':total_app_lta, 'total_app_driver':total_app_driver })
    
def save_fbp_claims(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)


    save_old_number = None    

    try:
        fuel_tb = tblFuel.objects.filter(empid = emp_user, ClaimNo = None)  
        Fuel = True   
        for i in fuel_tb:
            if i.save_number:            
                save_old_number = i.save_number
         
    except:
        fuel_tb = None        
        Fuel = False
    
    try:
        road_tb = tblRoad.objects.filter(empid = emp_user, ClaimNo = None)   
        Road = True 
        for i in road_tb:
            if i.save_number:
                save_old_number = i.save_number           
    except:
        road_tb = None
        Road = False              
    
    try:
        lta_tb = tblLTA.objects.filter(empid = emp_user, ClaimNo = None)  
        LTA = True   
        for i in lta_tb:
            if i.save_number:
                save_old_number = i.save_number        
    except:
        lta_tb = None        
        LTA = False        

    try:
        driver_tb = Drive.objects.filter(empid = emp_user, ClaimNo = None) 
        Driver = True   
        for i in driver_tb:
            if i.save_number:
                save_old_number = i.save_number            
    except:
        driver_tb = None
        Driver = False  

    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)      

    if save_old_number:        
        try:
            old_dec_files = fbp_claim_file.objects.filter(empid = emp_user, save_number = save_old_number)
        except:
            old_dec_files = None

        if old_dec_files:
            for i in old_dec_files:
                old_file_path = i.file_path
                parts_old_file_path = old_file_path.split('/')[-1]            

                i.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path)
        
        try:
            old_dec_data = fbp_dec_data.objects.filter(empid = emp_user, save_number = save_old_number)
        except:
            old_dec_data = None
        
        for i in old_dec_data:
            i.delete()

    save_ts = timezone.now() + timedelta(hours=5, minutes=30)
    formatted_save_ts = save_ts.strftime('%d%m%Y%H%M%S')
    save_number = f'F{data.empid}{formatted_save_ts}'
    

    if fuel_tb:
        for i in fuel_tb:            
            i.save_number = save_number
            i.save()
        
    
    if road_tb:
        for i in road_tb:            
            i.save_number = save_number
            i.save()
        

    if lta_tb:
        for i in lta_tb:            
            i.save_number = save_number
            i.save()
    
    if driver_tb:
        for i in driver_tb:            
            i.save_number = save_number
            i.save()

    message = "FBP Claim successfully Saved."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})
        
def road_dec_file (request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')
    
    data = EmployeeDetail.objects.get(empid=emp_user)
    
    
    
    road_tb = tblRoad.objects.filter(empid = emp_user, ClaimNo = None)   
    road_tb_last = road_tb.last()

    try:
        dec_file = fbp_dec_data.objects.get(empid = emp_user, save_number = road_tb_last.save_number)                      
    except:
        dec_file = None        


    if request.method == 'POST':        
        road_check_1 = request.POST.get('road_check_1') 
        road_check_2 = request.POST.get('road_check_2') 
        road_check_3 = request.POST.get('road_check_3')  

        context={'data':data, 'road_check_1':road_check_1, 'road_check_2':road_check_2, 'road_check_3':road_check_3}
    
        rendered_html = render_to_string('pdfs/road_dec_file.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        try:
            prev_dec_file = fbp_claim_file.objects.filter(empid=emp_user, section = 'road_dec').exclude(Q(save_number = road_tb_last.save_number))
            prev_dec_file_last = prev_dec_file.last()
        except:
            prev_dec_file = None
            prev_dec_file_last = None
            

        if prev_dec_file_last:
            last_name = prev_dec_file_last.filename
            
            last_name_parts = last_name.split('.')
            last_name_parts_new = last_name_parts[0].split('_')
            last_num = last_name_parts_new[-1]
            increase_num = int(last_num) + 1
       
        if not pdf.err:    
            result.seek(0)
        
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            if prev_dec_file_last:
                pdf_filename = last_name_parts_new[0]+'_signed_road_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
                new_name = last_name_parts_new[0]+random_chars+'_signed_road_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
            else:    
                pdf_filename = f"{data.empid}_signed_road_declaration_1.pdf"            
                name_parts = pdf_filename.split('_', 1)            
                new_name = name_parts[0]+random_chars+name_parts[-1]


            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = fbp_claim_file.objects.get(empid=emp_user, section = 'road_dec', save_number = road_tb_last.save_number)
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]            

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path)   

                    
            print()

            fbp_claim_file_new = fbp_claim_file(
                empid = emp_user,
                section = 'road_dec',
                filename = pdf_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
                save_number = road_tb_last.save_number                
            )
            fbp_claim_file_new.save()

            
            if dec_file:
                dec_file.road_check_1 = road_check_1
                dec_file.road_check_2 = road_check_2
                dec_file.road_check_3 = road_check_3
                dec_file.save()
            else:
                fbp_dec_data_new = fbp_dec_data(
                    empid = emp_user,
                    save_number = road_tb_last.save_number,
                    road_check_1 = road_check_1,
                    road_check_2 = road_check_2,
                    road_check_3 = road_check_3
                )
                fbp_dec_data_new.save()


    
    message = "Declaration File Uploaded successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def lta_dec_file (request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)


    lta_tb = tblLTA.objects.filter(empid = emp_user, ClaimNo = None)   
    lta_tb_last = lta_tb.last()

    try:
        dec_file = fbp_dec_data.objects.get(empid = emp_user, save_number = lta_tb_last.save_number)                      
    except:
        dec_file = None        

    current_date = date.today()

    financial_year_start, financial_year_end = calculate_financial_year(current_date)

    if request.method == 'POST': 

        st_point = request.POST.get('st_point') 
        end_point = request.POST.get('end_point') 
        tra_mode = request.POST.get('tra_mode')  
        tot_fare = request.POST.get('tot_fare') #num

        st_dt = request.POST.get('st_dt') # date
        end_dt = request.POST.get('end_dt') # date
        
        fm_1 = request.POST.get('fm_1')
        fm_2 = request.POST.get('fm_2')
        fm_3 = request.POST.get('fm_3')
        fm_4 = request.POST.get('fm_4')
        fm_5 = request.POST.get('fm_5')
        fm_6 = request.POST.get('fm_6')
        fm_7 = request.POST.get('fm_7')
        fm_8 = request.POST.get('fm_8')

        rel_1 = request.POST.get('rel_1')
        rel_2 = request.POST.get('rel_2')
        rel_3 = request.POST.get('rel_3')
        rel_4 = request.POST.get('rel_4')
        rel_5 = request.POST.get('rel_5')
        rel_6 = request.POST.get('rel_6')
        rel_7 = request.POST.get('rel_7')
        rel_8 = request.POST.get('rel_8')

        fm_place = request.POST.get('fm_place')

        if st_dt:    
            st_dt = datetime.strptime(st_dt, "%Y-%m-%d")            
        else:        
            st_dt = None

        if end_dt:    
            end_dt = datetime.strptime(end_dt, "%Y-%m-%d")            
        else:        
            end_dt = None   

        tot_fare = int(tot_fare) if tot_fare else int(0)
        


        context={'data':data, 'st_point':st_point, 'end_point':end_point, 'tra_mode':tra_mode, 'tot_fare':tot_fare, 'st_dt':st_dt, 'end_dt':end_dt,
                 'fm_1':fm_1, 'fm_2':fm_2, 'fm_3':fm_3, 'fm_4':fm_4, 'fm_5':fm_5, 'fm_6':fm_6, 'fm_7':fm_7, 'fm_8':fm_8,
                 'rel_1':rel_1, 'rel_2':rel_2, 'rel_3':rel_3, 'rel_4':rel_4, 'rel_5':rel_5, 'rel_6':rel_6, 'rel_7':rel_7, 'rel_8':rel_8, 'fm_place':fm_place,
                 'current_date':current_date, 'financial_year_start':financial_year_start, 'financial_year_end':financial_year_end}
    
        rendered_html = render_to_string('pdfs/lta_dec_file.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

        try:
            prev_dec_file = fbp_claim_file.objects.filter(empid=emp_user, section = 'lta_dec').exclude(Q(save_number = lta_tb_last.save_number))
            prev_dec_file_last = prev_dec_file.last()
        except:
            prev_dec_file = None
            prev_dec_file_last = None

        if prev_dec_file_last:
            last_name = prev_dec_file_last.filename
            
            last_name_parts = last_name.split('.')
            last_name_parts_new = last_name_parts[0].split('_')
            last_num = last_name_parts_new[-1]
            increase_num = int(last_num) + 1
        
        
        if not pdf.err:    
            result.seek(0)
                        
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)
        

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            if prev_dec_file_last:
                pdf_filename = last_name_parts_new[0]+'_signed_lta_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
                new_name = last_name_parts_new[0]+random_chars+'_signed_lta_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
            else:    
                pdf_filename = f"{data.empid}_signed_lta_declaration_1.pdf"            
                name_parts = pdf_filename.split('_', 1)            
                new_name = name_parts[0]+random_chars+name_parts[-1]
            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = fbp_claim_file.objects.get(empid=emp_user, section = 'lta_dec', save_number = lta_tb_last.save_number)
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]            

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path)   

                    

            fbp_claim_file_new = fbp_claim_file(
                empid = emp_user,
                section = 'lta_dec',
                filename = pdf_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
                save_number = lta_tb_last.save_number                
            )
            fbp_claim_file_new.save()

            
            if dec_file:
                dec_file.st_point = st_point
                dec_file.end_point = end_point
                dec_file.tra_mode = tra_mode

                dec_file.tot_fare = tot_fare
                dec_file.st_dt = st_dt
                dec_file.end_dt = end_dt

                dec_file.fm_1 = fm_1
                dec_file.fm_2 = fm_2
                dec_file.fm_3 = fm_3
                dec_file.fm_4 = fm_4
                dec_file.fm_5 = fm_5
                dec_file.fm_6 = fm_6
                dec_file.fm_7 = fm_7
                dec_file.fm_8 = fm_8

                dec_file.rel_1 = rel_1
                dec_file.rel_2 = rel_2
                dec_file.rel_3 = rel_3
                dec_file.rel_4 = rel_4
                dec_file.rel_5 = rel_5
                dec_file.rel_6 = rel_6
                dec_file.rel_7 = rel_7
                dec_file.rel_8 = rel_8
                
                dec_file.fm_place = fm_place
                dec_file.save()            
            else:
                fbp_dec_data_new = fbp_dec_data(
                    empid = emp_user,
                    save_number = lta_tb_last.save_number,
                    
                    st_point = st_point,
                    end_point = end_point,
                    tra_mode = tra_mode,

                    tot_fare = tot_fare,
                    st_dt = st_dt,
                    end_dt = end_dt,

                    fm_1 = fm_1,
                    fm_2 = fm_2,
                    fm_3 = fm_3,
                    fm_4 = fm_4,
                    fm_5 = fm_5,
                    fm_6 = fm_6,
                    fm_7 = fm_7,
                    fm_8 = fm_8,

                    rel_1 = rel_1,
                    rel_2 = rel_2,
                    rel_3 = rel_3,
                    rel_4 = rel_4,
                    rel_5 = rel_5,
                    rel_6 = rel_6,
                    rel_7 = rel_7,
                    rel_8 = rel_8,
                    
                    fm_place = fm_place
                )
                fbp_dec_data_new.save()



    message = "Declaration File Uploaded successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})

def drive_dec_file (request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid = emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    drive_tb = Drive.objects.filter(empid = emp_user, ClaimNo = None)   
    driver_tb_1 = [(index + 1, file) for index, file in enumerate(drive_tb)]        
    drive_tb_last = drive_tb.last()

    total_driver = 0

    if drive_tb:
        for i in drive_tb:
            total_driver = total_driver + i.DriveSal

    try:
        dec_file = fbp_dec_data.objects.get(empid = emp_user, save_number = drive_tb_last.save_number)                      
    except:
        dec_file = None        

    current_date = date.today()

    if request.method == 'POST':                
        name_dr = request.POST.get('name_dr') 
        driv_name = request.POST.get('driv_name')         
        
        

        context={'data':data, 'Car_dec_last':Car_dec_last, 'drive_tb':drive_tb, 'driver_tb_1':driver_tb_1, 'total_driver':total_driver, 'name_dr':name_dr, 'driv_name':driv_name, 'current_date':current_date}
    
        rendered_html = render_to_string('pdfs/drive_dec_file.html', context)
        result = BytesIO()
                
        pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

   
        try:
            prev_dec_file = fbp_claim_file.objects.filter(empid=emp_user, section = 'drive_dec').exclude(Q(save_number = drive_tb_last.save_number))
            prev_dec_file_last = prev_dec_file.last()
        except:
            prev_dec_file = None
            prev_dec_file_last = None

        if prev_dec_file_last:
            last_name = prev_dec_file_last.filename
            
            last_name_parts = last_name.split('.')
            last_name_parts_new = last_name_parts[0].split('_')
            last_num = last_name_parts_new[-1]
            increase_num = int(last_num) + 1


        if not pdf.err:    
            result.seek(0)
            
         
            user_directory = os.path.join('static', 'media', emp_user)
            os.makedirs(user_directory, exist_ok=True)

            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
            if prev_dec_file_last:
                pdf_filename = last_name_parts_new[0]+'_signed_drive_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
                new_name = last_name_parts_new[0]+random_chars+'_signed_drive_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
            else:    
                pdf_filename = f"{data.empid}_signed_drive_declaration_1.pdf"            
                name_parts = pdf_filename.split('_', 1)            
                new_name = name_parts[0]+random_chars+name_parts[-1]


            
            pdf_path = os.path.join(user_directory, new_name)
            with open(pdf_path, 'wb') as f:
                f.write(result.read())
            
            try:
                old_file = fbp_claim_file.objects.get(empid=emp_user, section = 'drive_dec', save_number = drive_tb_last.save_number)
            except:
                old_file = None
            
            if old_file:
                old_file_path = old_file.file_path
                parts_old_file_path = old_file_path.split('/')[-1]            

                old_file.delete()                        
                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
        
                if os.path.exists(full_old_file_path):
                    os.remove(full_old_file_path)   

                    

            fbp_claim_file_new = fbp_claim_file(
                empid = emp_user,
                section = 'drive_dec',
                filename = pdf_filename,
                file_path = "~/media/" + emp_user + "/" + new_name,
                uploaddt = timezone.now() + timedelta(hours=5, minutes=30),
                save_number = drive_tb_last.save_number                
            )
            fbp_claim_file_new.save()

            
            if dec_file:                
                dec_file.name_dr = name_dr
                dec_file.driv_name = driv_name             
                dec_file.save()            
            else:
                fbp_dec_data_new = fbp_dec_data(
                    empid = emp_user,
                    save_number = drive_tb_last.save_number,                   
                    name_dr = name_dr,
                    driv_name = driv_name                 
                )
                fbp_dec_data_new.save()
    

    message = "Declaration File Uploaded successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message':message})



from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER
from django.http import HttpResponse
import os
from django.conf import settings


def render_pdf_view(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    try:
        Car_dec = CarDeclaration.objects.filter(empid=emp_user)
        Car_dec_last = Car_dec.last()
    except:
        Car_dec = None
        Car_dec_last = None

    drive_tb = Drive.objects.filter(empid=emp_user, ClaimNo=None)   
    drive_tb_last = drive_tb.last()
    total_driver = sum(i.DriveSal for i in drive_tb)

    try:
        dec_file = fbp_dec_data.objects.get(empid=emp_user, save_number=drive_tb_last.save_number)                      
    except:
        dec_file = None        

    user_directory = os.path.join('static', 'media', emp_user)
    os.makedirs(user_directory, exist_ok=True)

    if request.method == 'POST':                
        name_dr = request.POST.get('name_dr') 
        driv_name = request.POST.get('driv_name')

        try:
            prev_dec_file = fbp_claim_file.objects.filter(empid=emp_user, section='drive_dec').exclude(Q(save_number=drive_tb_last.save_number))
            prev_dec_file_last = prev_dec_file.last()
        except:
            prev_dec_file = None
            prev_dec_file_last = None

        if prev_dec_file_last:
            last_name = prev_dec_file_last.filename
            
            last_name_parts = last_name.split('.')
            last_name_parts_new = last_name_parts[0].split('_')
            last_num = last_name_parts_new[-1]
            increase_num = int(last_num) + 1
        
        random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=12))
        if prev_dec_file_last:
            pdf_filename = last_name_parts_new[0]+'_signed_drive_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
            new_name = last_name_parts_new[0]+random_chars+'_signed_drive_declaration_'+str(increase_num)+'.'+last_name_parts[-1]
        else:    
            pdf_filename = f"{data.empid}_signed_drive_declaration_1.pdf"            
            name_parts = pdf_filename.split('_', 1)            
            new_name = name_parts[0]+random_chars+name_parts[-1]        

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{pdf_filename}"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        styles = getSampleStyleSheet()

        # Title styling
        title = "Driver Salary Receipt"
        title_style = ParagraphStyle(
            name='CustomTitleStyle',
            parent=styles['Title'],
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
            fontSize=18,
            textColor=colors.white,
        )

        title_table_data = [[Paragraph(title, title_style)]]
        title_table = Table(title_table_data, colWidths=[doc.width])
        title_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#d68b7a")),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
            ('TOPPADDING', (0, 0), (-1, -1), 7),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('HEIGHT', (0, 0), (-1, -1), 40),
        ]))

        story = []
        story.append(title_table)
        story.append(Spacer(1, 0.25 * inch))

        emp_details = f"""
        <strong>Employee Name:</strong> {data.empname}<br/><br/>
        <strong>Employee ID:</strong> {data.empid}<br/><br/>
        <strong>Vehicle Number:</strong> {Car_dec_last.registration if Car_dec_last else 'N/A'}<br/><br/>
        """
        story.append(Paragraph(emp_details, styles['Normal']))
        story.append(Spacer(1, 0.25 * inch))

        table_data = [['Amount Paid', 'Salary Month']]
        for i in drive_tb:
            table_data.append([i.DriveSal, i.SalaryMonth])

        table = Table(table_data, colWidths=[0.38 * 0.76 * letter[0], 0.38 * 0.76 * letter[0]])
        table.hAlign = 'LEFT'
        table.leftIndent = 90

        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#F8EDE3")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.white),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('LEFTPADDING', (0, 0), (-1, -1), 5),
            ('RIGHTPADDING', (0, 0), (-1, -1), 5),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))
        
        story.append(table)
        story.append(Spacer(1, 0.25 * inch))

        received_from = f"""
        <strong>Received From:</strong><br/><br/>
        Mr./Ms <strong>{data.empname}</strong> Rs. <strong>{total_driver}</strong> to Driver <strong>{name_dr}</strong> towards salary of the month of July<br/>
        """
        story.append(Paragraph(received_from, styles['Normal']))
        story.append(Spacer(1, 0.25 * inch))

        driver_details = f"<strong>Driver Name:</strong> {name_dr}<br/>"
        story.append(Paragraph(driver_details, styles['Normal']))
        story.append(Spacer(1, 0.25 * inch))

        image_path = os.path.join(settings.BASE_DIR, 'static', 'images', 'Revenue Stamp.jpg')
        image = Image(image_path, width=110, height=115)
        image.hAlign = 'LEFT'
        story.append(image)
        story.append(Spacer(1, 0.25 * inch))

        doc.build(story)

        pdf_path = os.path.join(user_directory, new_name)
        with open(pdf_path, 'wb') as f:
            f.write(response.content)

        try:
            old_file = fbp_claim_file.objects.get(empid=emp_user, section='drive_dec', save_number=drive_tb_last.save_number)
        except:
            old_file = None
        
        if old_file:
            old_file_path = old_file.file_path
            parts_old_file_path = old_file_path.split('/')[-1]            

            old_file.delete()                        
            full_old_file_path = os.path.join(user_directory, parts_old_file_path)
    
            if os.path.exists(full_old_file_path):
                os.remove(full_old_file_path)

        fbp_claim_file_new = fbp_claim_file(
            empid=emp_user,
            section='drive_dec',
            filename=pdf_filename,
            file_path="~/media/" + emp_user + "/" + new_name,
            uploaddt=timezone.now() + timedelta(hours=5, minutes=30),
            save_number=drive_tb_last.save_number                
        )
        fbp_claim_file_new.save()

        if dec_file:                
            dec_file.name_dr = name_dr
            dec_file.driv_name = driv_name             
            dec_file.save()
        else:
            fbp_dec_data_new = fbp_dec_data(
                empid=emp_user,
                save_number=drive_tb_last.save_number,                   
                name_dr=name_dr,
                driv_name=driv_name                 
            )
            fbp_dec_data_new.save()

    message = "Declaration File Uploaded successfully."
    return render(request, 'emp_fbp_claim.html', {'data': data, 'message': message})

    
def reminder_mail(request):

    all_emp = EmployeeDetail.objects.all()    

    for emp in all_emp:

        all_dt = []
        
        all_dt_2 = []

        try:
            tblFuel_claim = tblFuel.objects.filter(empid = emp.empid, ClaimNo = None)
            fuel_last = tblFuel_claim.last()
        except:
            tblFuel_claim = None
            fuel_last = None
        
        if fuel_last:
            if fuel_last.reminder_dt is None:           
                all_dt.append(fuel_last.ClaimDt)
            else:
                all_dt_2.append(fuel_last.ClaimDt)

        try:
            tblRoad_claim = tblRoad.objects.filter(empid = emp.empid, ClaimNo = None)
            road_last = tblRoad_claim.last()
        except:
            tblRoad_claim = None
            road_last = None
        
        if road_last:
            if road_last.reminder_dt is None:           
                all_dt.append(road_last.ClaimDt)
            else:
                all_dt_2.append(road_last.ClaimDt)
    
        try:
            lta_claim = tblLTA.objects.filter(empid = emp.empid, ClaimNo = None)
            lta_last = lta_claim.last()
        except:
            lta_claim = None
            lta_last = None
        
        if lta_last:
            if lta_last.reminder_dt is None:           
                all_dt.append(lta_last.ClaimDt)
            else:
                all_dt_2.append(lta_last.ClaimDt)

        try:
            driv_claim = Drive.objects.filter(empid = emp.empid, ClaimNo = None)
            driv_last = driv_claim.last()
        except:
            driv_claim = None
            driv_last = None
        
        if driv_last:
            if driv_last.reminder_dt is None:           
                all_dt.append(driv_last.ClaimDt)
            else:
                all_dt_2.append(driv_last.ClaimDt)

        if all_dt:

            latest_date = max(all_dt)        
            current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
            time_difference = current_time - latest_date  

            if time_difference > timedelta(hours=24):
                
                if fuel_last:
                    fuel_last.reminder_dt = timezone.now() + timedelta(hours=5, minutes=30)                
                    fuel_last.save()
            
                if road_last:
                    road_last.reminder_dt = timezone.now() + timedelta(hours=5, minutes=30)                
                    road_last.save()

                if lta_last:
                    lta_last.reminder_dt = timezone.now() + timedelta(hours=5, minutes=30)                
                    lta_last.save()

                if driv_last:
                    driv_last.reminder_dt = timezone.now() + timedelta(hours=5, minutes=30)                
                    driv_last.save()
                
                email = EmailMessage(
                    subject='FBP Claim Reminder',
                    body='You have Delared FBP Claims But not yet submitted. Please Submit FBP Claims',
                    from_email=settings.EMAIL_HOST_USER,
                    to=[emp.empemail],
                )                
                email.send(fail_silently=False)    
            
                return HttpResponse('reminder_mail')

        elif all_dt_2:
            
            latest_date = max(all_dt_2)        
            current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
            time_difference = current_time - latest_date  

            if time_difference > timedelta(hours=48):
                for i in tblFuel_claim:
                    i.delete()
                for i in tblRoad_claim:
                    i.delete()
                for i in tblLTA:
                    i.delete()
                for i in Drive:
                    i.delete()


        try:
            fbp_claim = tblClaimeMaster.objects.filter(empid = emp.empid, Status = 'On Hold', Sub2date=None).exclude(Q(verL1Date=None) | Q(verL2Date=None))
        except:
            fbp_claim = None
        
        if fbp_claim:
            for i in fbp_claim:
                ver_date = i.verL2Date

                if i.ResubReminder1 is None:                    
                    
                    current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
                    time_difference = current_time - ver_date                            
                    
                    if time_difference > timedelta(hours=48):
                        
                        i.ResubReminder1 = timezone.now() + timedelta(hours=5, minutes=30)                
                        i.save()

                        email_body = f'''
Dear ({emp.empname}),
Your claim ({i.ClaimNo}) is 'On Hold' because the files aren't re-uploaded yet. Please upload and submit them. Thanks!
                            '''
                        

                        email = EmailMessage(
                            subject='FBP Claim Resubmission Reminder-1',
                            body=email_body,
                            from_email=settings.EMAIL_HOST_USER,
                            to=[emp.empemail],
                        )      
                        email.content_subtype = 'plain'       
                        email.send(fail_silently=False)
                    
                elif i.ResubReminder2 is None:                    
                    
                    current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
                    time_difference = current_time - ver_date           
                    
                    if time_difference > timedelta(hours=120):
                        
                        i.ResubReminder2 = timezone.now() + timedelta(hours=5, minutes=30)                
                        i.save()

                        email_body = f'''
Dear ({emp.empname}),
Your claim ({i.ClaimNo}) is 'On Hold' because the files aren't re-uploaded yet. Please upload and submit them. Thanks!
                            '''

                        email = EmailMessage(
                            subject='FBP Claim Resubmission Reminder-2',
                            body=email_body,
                            from_email=settings.EMAIL_HOST_USER,
                            to=[emp.empemail],
                        )    
                        email.content_subtype = 'plain'           
                        email.send(fail_silently=False)                      
                elif i.ResubReminder3 is None:                    
                    
                    current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
                    time_difference = current_time - ver_date           
                    
                    if time_difference > timedelta(hours=216):
                        
                        i.ResubReminder3 = timezone.now() + timedelta(hours=5, minutes=30)                
                        i.save()

                        email_body = f'''
Dear ({emp.empname}),
Your claim ({i.ClaimNo}) is 'On Hold' because the files aren't re-uploaded yet. Please upload and submit them. Thanks!
                            '''

                        email = EmailMessage(
                            subject='FBP Claim Resubmission Reminder-3',
                            body=email_body,
                            from_email=settings.EMAIL_HOST_USER,
                            to=[emp.empemail],
                        )      
                        email.content_subtype = 'plain'         
                        email.send(fail_silently=False)                        
                return HttpResponse('reminder_mail')

        return HttpResponse('reminder_mail123')



