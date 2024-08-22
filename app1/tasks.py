import threading
import time
from datetime import timedelta
from django.core.mail import EmailMessage
from django.utils import timezone
from django.conf import settings
from .models import *
from django.db.models import Q
from django.core.mail import send_mail
import os 
from io import BytesIO
from django.template.loader import render_to_string
from xhtml2pdf import pisa

def print_every_5_seconds():
    while True:

        all_emp = EmployeeDetail.objects.all()    

        for emp in all_emp:

            all_dt = []

            all_dt_2 = []

            save_number_new = None
            
            try:
                tblFuel_claim = tblFuel.objects.filter(empid = emp.empid, ClaimNo = None)
                fuel_last = tblFuel_claim.last()
            except:
                tblFuel_claim = None
                fuel_last = None
            
            if fuel_last:

                all_dt_2.append(fuel_last.ClaimDt)

                if fuel_last.reminder_dt is None:           
                    all_dt.append(fuel_last.ClaimDt)
                
                    

            for i in tblFuel_claim:
                if i.save_number:
                    save_number_new = i.save_number

            try:
                tblRoad_claim = tblRoad.objects.filter(empid = emp.empid, ClaimNo = None)
                road_last = tblRoad_claim.last()
            except:
                tblRoad_claim = None
                road_last = None
            
            if road_last:
                all_dt_2.append(road_last.ClaimDt)

                if road_last.reminder_dt is None:           
                    all_dt.append(road_last.ClaimDt)
                
                    

            for i in tblRoad_claim:
                if i.save_number:
                    save_number_new = i.save_number
        
            try:
                lta_claim = tblLTA.objects.filter(empid = emp.empid, ClaimNo = None)
                lta_last = lta_claim.last()
            except:
                lta_claim = None
                lta_last = None
            
            if lta_last:
                all_dt_2.append(lta_last.ClaimDt)

                if lta_last.reminder_dt is None:           
                    all_dt.append(lta_last.ClaimDt)                
                    
            
            for i in lta_claim:
                if i.save_number:
                    save_number_new = i.save_number

            try:
                driv_claim = Drive.objects.filter(empid = emp.empid, ClaimNo = None)
                driv_last = driv_claim.last()
            except:
                driv_claim = None
                driv_last = None
            
            if driv_last:
                all_dt_2.append(driv_last.ClaimDt)
                if driv_last.reminder_dt is None:           
                    all_dt.append(driv_last.ClaimDt)
                

            for i in driv_claim:
                if i.save_number:
                    save_number_new = i.save_number

            user_directory = os.path.join('static', 'media', emp.empid)
            
            

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
                    
                    email_body = f'''
Dear {emp.empname} ({emp.empid}),

It has been observed that you have saved the FBP Claims and uploaded few files. However, you have not submitted the claim.  

You need to preview the documents & submit the claim on priority. 
Without submission the claim cannot be processed as the claim would not be available for the verification.

You need to complete this activity within 2 days on receipt of this mail else the claim would be disabled.

Thanks & regards
FBP Processing
'''

                    email = EmailMessage(
                        subject='FBP Claim saved not Submitted',
                        body=email_body,
                        from_email=settings.EMAIL_HOST_USER,
                        to=[emp.empemail],
                    )                
                    email.send(fail_silently=False)                                        
                
            elif all_dt_2:       
                    
                latest_date = max(all_dt_2)        
                current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
                time_difference = current_time - latest_date  

                if time_difference > timedelta(hours=48):
                    
                    if tblFuel_claim:
                        for i in tblFuel_claim:

                            fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = i.RecNumber) 

                            old_file_path = fbp_claim_file_new.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]
                            
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)

                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 
                            
                            fbp_claim_file_new.delete() 

                            i.delete() 


                    if tblRoad_claim:
                        for i in tblRoad_claim:

                            fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = i.RecNumber) 

                            old_file_path = fbp_claim_file_new.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]
                            
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)

                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 
                            
                            fbp_claim_file_new.delete() 
                            
                            i.delete()
                            
                    if lta_claim:
                        for i in lta_claim:

                            fbp_claim_file_new = fbp_claim_file.objects.filter(reciept_no = i.RecNumber) 

                            for file in fbp_claim_file_new:
                                old_file_path = file.file_path
                                parts_old_file_path = old_file_path.split('/')[-1]
                                
                                full_old_file_path = os.path.join(user_directory, parts_old_file_path)

                                if os.path.exists(full_old_file_path):
                                    os.remove(full_old_file_path) 
                            
                                file.delete() 
                            
                            i.delete()

                    if driv_claim:
                        for i in driv_claim:

                            fbp_claim_file_new = fbp_claim_file.objects.get(reciept_no = i.RecNumber) 

                            old_file_path = fbp_claim_file_new.file_path
                            parts_old_file_path = old_file_path.split('/')[-1]
                            
                            full_old_file_path = os.path.join(user_directory, parts_old_file_path)

                            if os.path.exists(full_old_file_path):
                                os.remove(full_old_file_path) 
                            
                            fbp_claim_file_new.delete() 
                            
                            i.delete()
                        
                    
                    if save_number_new:                        
                        try:
                            dec_file = fbp_dec_data.objects.get(empid = emp.empid, save_number = save_number_new)                      
                            dec_file.delete()
                        except:
                            dec_file = None
                        
                        try:
                            old_all_files = fbp_claim_file.objects.filter(empid=emp.empid,  save_number = save_number_new)
                        except:
                            old_all_files = None
                        

                        if old_all_files:
                            for old_file in old_all_files:
                                old_file_path = old_file.file_path
                                parts_old_file_path = old_file_path.split('/')[-1]            

                                old_file.delete()                        
                                full_old_file_path = os.path.join(user_directory, parts_old_file_path)
                        
                                if os.path.exists(full_old_file_path):
                                    os.remove(full_old_file_path)                                          
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

                            claim_no = i.ClaimNo
                            
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

                            manual_status = mail_master_tb.Status

                            context = {
                            'mail_master_tb':mail_master_tb,
                            'mail_fuel_tb':mail_fuel_tb, 'mail_road_tb':mail_road_tb,
                            'mail_lta_tb':mail_lta_tb, 'mail_driver_tb':mail_driver_tb,
                            'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver,
                            'total_approved':total_approved, 'manual_status':manual_status     
                            }

                            # rendered_html = render_to_string('it_proof_sub_mail.html', context)
                            rendered_html = render_to_string('va_templates/fbp_checker_mail.html', context)
                            result = BytesIO()
                                
                            pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

                            

                            email_body = f'''
                                <p>Dear {data_1.empname} ({data_1.empid}),</p>
                                <p>We are writing to remind you that we are still awaiting the required documents to process your Flexible Benefits Plan (FBP) claims. As of today, your claims are on hold due to the missing documentation.</p>
                                <p>Below are the details of your Claims.</p>
                                <h4>Status: <strong>{manual_status}</strong> </h4>
                                ''' 
                            if mail_master_tb.Remarks:
                                email_body += f'''
                                <p>Remarks:<p style="color: red;"> {mail_master_tb.Remarks} </p></p>
                                '''
                            email_body += f'''
                                <strong>Steps to upload documents:</strong>
                                <p>>>>Login to Workday  >>>Click on India Tax Declaration/Tax Benefits & Form16 Accept the terms in Disclaimer  >>>Click on Work Item History Link >>>> Click on  “On Hold” Claims >>>>Upload the required documents & submit the Claim. </p>
                                <strong>Note:</strong>
                                <ul style="color: red;">
                                    <li>Please do not reply to this e-mail. This mail id is not monitored.</li>
                                    <li>The proofs are to be uploaded in the tool only and Soft copies sent over mail will not be considered.</li>                                    
                                </ul>
                                <p>Thanks & Regards</p>
                                <strong>FBP Team</strong>
                            '''
                            
                            pdf_filename = f"{data_1.empid}.pdf"
                            email = EmailMessage(
                                subject=f'Reminder 1: FBP Claim No-{i.ClaimNo} Action Required for On-Hold FBP Claims',
                                body=email_body,
                                from_email=settings.EMAIL_HOST_USER,
                                to=[emp.empemail],
                            )      
                            email.content_subtype = 'html'
                            email.attach(pdf_filename, result.getvalue(), 'application/pdf')       
                            email.send(fail_silently=False)
                        
                    elif i.ResubReminder2 is None:                    
                        
                        current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
                        time_difference = current_time - ver_date           
                        
                        if time_difference > timedelta(hours=120):
                            
                            i.ResubReminder2 = timezone.now() + timedelta(hours=5, minutes=30)                
                            i.save()

                            claim_no = i.ClaimNo
                            
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

                            manual_status = mail_master_tb.Status

                            context = {
                            'mail_master_tb':mail_master_tb,
                            'mail_fuel_tb':mail_fuel_tb, 'mail_road_tb':mail_road_tb,
                            'mail_lta_tb':mail_lta_tb, 'mail_driver_tb':mail_driver_tb,
                            'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver,
                            'total_approved':total_approved, 'manual_status':manual_status       
                            }

                            # rendered_html = render_to_string('it_proof_sub_mail.html', context)
                            rendered_html = render_to_string('va_templates/fbp_checker_mail.html', context)
                            result = BytesIO()
                                
                            pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

                            email_body = f'''
                                <p>Dear {data_1.empname} ({data_1.empid}),</p>
                                <p>This is a follow-up E -mail regarding our previous communication about the pending documentation required for your Flexible Benefits Plan (FBP) claims. As of today, your claim remains on hold due to the missing documents and we have not yet received the necessary information from you.</p>
                                <p>To avoid further delays, we request you to submit the required documents within 2 Days from receipt of this communication.</p>
                                <p>Your prompt action is crucial to ensure that your claims are processed in a timely manner. We appreciate your immediate attention to this.</p>
                                <p>Below are the details of your Claims.</p>
                                <h4>Status: <strong>{manual_status}</strong> </h4>
                                ''' 
                            if mail_master_tb.Remarks:
                                email_body += f'''
                                <p>Remarks:<p style="color: red;"> {mail_master_tb.Remarks} </p></p>
                                '''
                            email_body += f'''
                                <strong>Steps to upload documents:</strong>
                                <p>>>>Login to Workday  >>>Click on India Tax Declaration/Tax Benefits & Form16 Accept the terms in Disclaimer  >>>Click on Work Item History Link >>>> Click on  “On Hold” Claims >>>>Upload the required documents & submit the Claim. </p>
                                <strong>Note:</strong>
                                <ul style="color: red;">
                                    <li>Please do not reply to this e-mail. This mail id is not monitored.</li>
                                    <li>The proofs are to be uploaded in the tool only and Soft copies sent over mail will not be considered.</li>                                    
                                </ul>
                                <p>Thanks & Regards</p>
                                <strong>FBP Team</strong>
                            '''
                            
                            pdf_filename = f"{data_1.empid}.pdf"
                            email = EmailMessage(
                                subject=f'Reminder 2: FBP Claim No-{i.ClaimNo} Action Required for On-Hold FBP Claims',
                                body=email_body,
                                from_email=settings.EMAIL_HOST_USER,
                                to=[emp.empemail],
                            )      
                            email.content_subtype = 'html'
                            email.attach(pdf_filename, result.getvalue(), 'application/pdf')       
                            email.send(fail_silently=False)

                    elif i.ResubReminder3 is None:                    
                        
                        current_time = timezone.now() + timedelta(hours=5, minutes=30)                        
                        time_difference = current_time - ver_date           
                        
                        if time_difference > timedelta(hours=216):
                            
                            i.ResubReminder3 = timezone.now() + timedelta(hours=5, minutes=30)                
                            i.save()

                            claim_no = i.ClaimNo
                            
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

                            manual_status = mail_master_tb.Status

                            context = {
                            'mail_master_tb':mail_master_tb,
                            'mail_fuel_tb':mail_fuel_tb, 'mail_road_tb':mail_road_tb,
                            'mail_lta_tb':mail_lta_tb, 'mail_driver_tb':mail_driver_tb,
                            'total_fuel':total_fuel, 'total_road':total_road, 'total_lta':total_lta, 'total_driver':total_driver,
                            'total_approved':total_approved, 'manual_status':manual_status         
                            }

                            # rendered_html = render_to_string('it_proof_sub_mail.html', context)
                            rendered_html = render_to_string('va_templates/fbp_checker_mail.html', context)
                            result = BytesIO()
                                
                            pdf = pisa.CreatePDF(BytesIO(rendered_html.encode("UTF-8")), dest=result)

                            email_body = f'''
                                <p>Dear {data_1.empname} ({data_1.empid}),</p>
                                <p>This is a final reminder regarding the urgent need for the Pending document to process your Flexible Benefits Plan (FBP) claims. Despite our previous Reminders, we have not yet received the Pending documents to Process your claims, which is still on hold.</p>
                                <p>If the pending document are not uploaded/ submitted in Tool with in 2 days from the receipt of this mail, we will be force to reject this claims as per the policy.</p>
                                <p>Your prompt action is crucial to ensure that your claims are processed in a timely manner. We appreciate your immediate attention to this</p>
                                <p>Below are the details of your Claims.</p>
                                <h4>Status: <strong>{manual_status}</strong> </h4>
                                ''' 
                            if mail_master_tb.Remarks:
                                email_body += f'''
                                <p>Remarks:<p style="color: red;"> {mail_master_tb.Remarks} </p></p>
                                '''
                            email_body += f'''
                                <strong>Steps to upload documents:</strong>
                                <p>>>>Login to Workday  >>>Click on India Tax Declaration/Tax Benefits & Form16 Accept the terms in Disclaimer  >>>Click on Work Item History Link >>>> Click on  “On Hold” Claims >>>>Upload the required documents & submit the Claim. </p>
                                <strong>Note:</strong>
                                <ul style="color: red;">
                                    <li>Please do not reply to this e-mail. This mail id is not monitored.</li>
                                    <li>The proofs are to be uploaded in the tool only and Soft copies sent over mail will not be considered.</li>                                    
                                </ul>
                                <p>Thanks & Regards</p>
                                <strong>FBP Team</strong>
                            '''
                            
                            pdf_filename = f"{data_1.empid}.pdf"
                            email = EmailMessage(
                                subject=f'Final Reminder: FBP Claim No:- {i.ClaimNo} Immediate Action Required for On-Hold FBP claims',
                                body=email_body,
                                from_email=settings.EMAIL_HOST_USER,
                                to=[emp.empemail],
                            )      
                            email.content_subtype = 'html'
                            email.attach(pdf_filename, result.getvalue(), 'application/pdf')       
                            email.send(fail_silently=False)                        
                
        
        time.sleep(1)  


def start_thread():
    printer_thread = threading.Thread(target=print_every_5_seconds)
    printer_thread.daemon = True
    printer_thread.start()