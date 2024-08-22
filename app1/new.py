

def ITDeclarations(request):
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    bandlist = ['8', '9', '10', 'A', 'B', 'C', 'D']

    band = data.Band

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    if TaxRegime1:
        data1 = TaxRegime1.last()
    else:
        data1 = ''

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    if TaxDeclaration1:
        data3 = TaxDeclaration1.last()
    else:
        data3 = ''

    CarDeclaration1 = CarDeclaration.objects.filter(empid=emp_user)
    if CarDeclaration1:
        form1 = CarDeclaration1.last()
    else:
        form1 = ''

    temp_carDeclarationsForm1 = temp_carDeclarationsForm.objects.filter(
        empid=emp_user)

    lendername = LoanlendersDetails.objects.all()

    if temp_carDeclarationsForm1:
        temp_form1 = temp_carDeclarationsForm1.last()

    else:
        temp_form1 = None

    temp_houserentDB1 = temp_houserentDB.objects.filter(empid=emp_user)

    if temp_houserentDB1:
        temp_form2 = temp_houserentDB1.last()

    else:
        temp_form2 = None

    temp_80CDB1 = temp_80CDB.objects.filter(empid=emp_user)

    if temp_80CDB1:
        temp_form5 = temp_80CDB1.last()
    else:
        temp_form5 = None

    temp_incomeLossProperty1 = temp_incomeLossProperty.objects.filter(
        empid=emp_user)

    if temp_incomeLossProperty1:
        temp_form3 = temp_incomeLossProperty1.last()
    else:
        temp_form3 = None

    temp_OtherDeductions1 = temp_OtherDeductions.objects.filter(empid=emp_user)

    if temp_OtherDeductions1:
        temp_form4 = temp_OtherDeductions1.last()
    else:
        temp_form4 = None

    houserentDB1 = houserentDB.objects.filter(empid=emp_user)

    if houserentDB1:
        form2 = houserentDB1.last()
    else:
        form2 = None

    return render(request, 'ITDeclarations.html', {'bandlist': bandlist, 'band': band, 'data': data, 'data1': data1, 'data3': data3, 'lendername': lendername,
                                                   'temp_form1': temp_form1, 'form2': form2, 'form1': form1, 'temp_form2': temp_form2, 'temp_form3': temp_form3, 'temp_form4': temp_form4, 'temp_form5': temp_form5})


def itdeclarationsubmit(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    houserentDB1 = houserentDB.objects.filter(empid=emp_user)

    if houserentDB1:
        form2 = houserentDB1.last()
    else:
        form2 = None

    success_message = None

    if request.method == 'POST':
        pannum = request.POST.get('pannum')
        startdate = request.POST.get('startdate')
        rent = request.POST.get('rent')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        Paddress = request.POST.get('Paddress')
        Taddress = request.POST.get('Taddress')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        submit_ts = timezone.now() + timedelta(hours=5, minutes=30)

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

        selfloan = request.POST.get('selfloan', None)
        lendername1 = request.POST.get('lendername1')
        lenderpan1 = request.POST.get('lenderpan1')
        annualvalue = request.POST.get('annualvalue')
        municipaltax = request.POST.get('municipaltax')
        Homeinterest = request.POST.get('Homeinterest')
        incomeloss = request.POST.get('incomeloss')
        standerdded = request.POST.get('standerdded')
        lendername2 = request.POST.get('lendername2')
        lenderpan2 = request.POST.get('lenderpan2')
        sanctiondate3 = request.POST.get('sanctiondate3')

        loanammount = request.POST.get('loanammount', None)
        propertyvalue3 = request.POST.get('propertyvalue3')
        hlinterest = request.POST.get('hlinterest')
        lendername3 = request.POST.get('lendername3')
        lenderpan3 = request.POST.get('lenderpan3')
        sanctiondate4 = request.POST.get('sanctiondate4')
        havehouseproperty = request.POST.get('havehouseproperty')
        propertyvalue4 = request.POST.get('propertyvalue4')
        Eligibility = request.POST.get('Eligibility')
        otherincome = request.POST.get('otherincome')
        savinginterest = request.POST.get('savinginterest')

        selfinsurance = request.POST.get('selfinsurance', None)
        parantinsurance1 = request.POST.get('parantinsurance1')
        parantinsurance2 = request.POST.get('parantinsurance2')
        checkup = request.POST.get('checkup')
        medicaltreatmentinput = request.POST.get('medicaltreatmentinput')
        educationinterest = request.POST.get('educationinterest')
        handicaped = request.POST.get('handicaped')
        dependhandicape = request.POST.get('dependhandicape')
        vehicletype = request.POST.get('vehicletype')
        loansanctiondate = request.POST.get('loansanctiondate')
        carinterest = request.POST.get('carinterest', None)
        ccd80 = request.POST.get('ccd80')
        prannumb = request.POST.get('prannumb')

        empsalary = request.POST.get('empsalary')
        professionaltax = request.POST.get('professionaltax')
        providentfund = request.POST.get('providentfund')
        incometax6 = request.POST.get('incometax6')

        if startdate:
            # Check if the date input is not empty
            startdate = datetime.strptime(startdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            startdate = None

        # Convert empty strings to None for fields that should accept null
        rent = int(rent) if rent else None
        contact = int(contact) if contact else None

        lifeInsurance = int(lifeInsurance) if lifeInsurance else None
        timeDeposit = int(timeDeposit) if timeDeposit else None
        ulip = int(ulip) if ulip else None
        savingsCertificate = int(
            savingsCertificate) if savingsCertificate else None
        interestNSC = int(interestNSC) if interestNSC else None
        ppf = int(ppf) if ppf else None
        houseLoan = int(houseLoan) if houseLoan else None
        tuitionFee = int(tuitionFee) if tuitionFee else None
        mutualFund = int(mutualFund) if mutualFund else None
        termDeposit = int(termDeposit) if termDeposit else None
        sukanyaSamriddhi = int(sukanyaSamriddhi) if sukanyaSamriddhi else None

        # Convert empty strings to None for fields that should accept null
        selfloan = int(selfloan) if selfloan else None
        annualvalue = int(annualvalue) if annualvalue else None
        municipaltax = int(municipaltax) if municipaltax else None
        Homeinterest = int(Homeinterest) if Homeinterest else None
        incomeloss = int(incomeloss) if incomeloss else None
        standerdded = int(standerdded) if standerdded else None
        loanammount = int(loanammount) if loanammount else None
        propertyvalue3 = int(propertyvalue3) if propertyvalue3 else None
        hlinterest = int(hlinterest) if hlinterest else None
        propertyvalue4 = int(propertyvalue4) if propertyvalue4 else None
        otherincome = int(otherincome) if otherincome else None
        savinginterest = int(savinginterest) if savinginterest else None

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

        # Convert empty strings to None for fields that should accept null
        selfinsurance = int(selfinsurance) if selfinsurance else None
        parantinsurance1 = int(parantinsurance1) if parantinsurance1 else None
        parantinsurance2 = int(parantinsurance2) if parantinsurance2 else None
        checkup = int(checkup) if checkup else None
        medicaltreatmentinput = int(
            medicaltreatmentinput) if medicaltreatmentinput else None
        educationinterest = int(
            educationinterest) if educationinterest else None
        handicaped = int(handicaped) if handicaped else None
        dependhandicape = int(dependhandicape) if dependhandicape else None
        carinterest = int(carinterest) if carinterest else None
        ccd80 = int(ccd80) if ccd80 else None

        if loansanctiondate:
            # Check if the date input is not empty
            loansanctiondate = datetime.strptime(loansanctiondate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            loansanctiondate = None

        TaxDeclaration_new = TaxDeclaration(
            empid=data.empid,
            empname=data.empname,
            mobno=data.empmobile,
            emailid=data.empemail,
            pan=data.emppan,
            dob=data.empdob,

            itd1=rent,
            itd1stdt=startdate,
            city1=city1, 
            itd13=timeDeposit,
            itd14=lifeInsurance,
            itd15=ulip,
            itd16=savingsCertificate,
            itdintnsc=interestNSC,
            itd17=ppf,
            itd18=houseLoan,
            itd19=tuitionFee,
            itd20=mutualFund,
            itd80ddb=medicaltreatmentinput,
            itd21=itd21,
            itd22=termDeposit,
            itd23=ccc80,

            itd24=selfinsurance,
            itd25=parantinsurance1,
            itd25_1=parantinsurance2,
            itd26=dependhandicape,
            itd27=educationinterest,
            itd28=handicaped,
            itd80TTA=savinginterest,
            itd80ccg=itd80ccg,
            itdoth=otherincome,
            itd29=selfloan,
            itd30=annualvalue,  # tab3 subtab 2
            itd31=municipaltax,
            itd32=Homeinterest,
            itd33=incomeloss,
            itd34=standerdded,
            itdP1=empsalary,
            itdP2=providentfund,
            itdP3=professionaltax,
            itdP4=incometax6,
            remarks=remarks,
            sub1Complete=sub1Complete,
            itd80EE=hlinterest,  # 80EE home interest
            empDeclaration=empDeclaration,
            itdSukSam=sukanyaSamriddhi,
            itdCCD=ccd80,
            itd80CCD1=itd80CCD1,
            rd80ddb=rd80ddb,
            LandlordAddress=Paddress,
            LandLordPan=pannum,
            LoanLenderName=lenderpan1,
            LoanLenderPan=lenderpan1,
            itdInt80ee=itdInt80ee,
            itdloan80ee=loanammount,
            loanDt80ee=sanctiondate3,
            LenderName80ee=lendername3,
            LenderPAN80ee=lenderpan3,
            propertyVal=propertyvalue3,
            LetLenderName=lendername2,
            LetLenderPan=lenderpan2,
            rdRentFullYear=rdRentFullYear,
            rdChangeRent=rdChangeRent,
            landlordName=name,
            LandlordContact=contact,


            #rdNps=rdNps, 
            #rd80D=rd80D,
            saveddate=saveddate, #
            #rd80EE=rd80EE,
            #rdHRA=rdHRA,
            pincode1=pincode1,  # HRA
            #totalRent=totalRent,
            #rdIsMailCorrect=rdIsMailCorrect,
            #rd80c=rd80c,
            #rd80ccd1b=rd80ccd1b,
            #rd80other=rd80other,
            itdPreventive=checkup,
            #rdOtherInc=rdOtherInc,
            itd80eeOtherLender=itd80eeOtherLender, #
            #rdPrevious=rdPrevious,
            #rdself=rdself,
            itdLetOtherLender=itdLetOtherLender, #
            drpLetLender=drpLetLender,
            itdSelfOtherLender=itdSelfOtherLender,
            drpSelfLender=drpSelfLender,
            #rd80tta=rd80tta,
            #rd80u=rd80u,
            #rd80dd=rd80dd,
            sub1Date=sub1Date, #
            PRANno=prannumb,
            #rentedAdd1=rentedAdd1,
            itdInt80eeB=itdInt80eeB, #
            #rd80EEA=rd80EEA,
            timestamp=timestamp, #
            Declaration_no=Declaration_no, #
            Declaration_check=Declaration_check, 
            
            #required fields with none value (will descuss about these later) 
            TS0581=TS0581,
            TS058401S=TS058401S,
            TS058401L=TS058401L,
            TS058402=TS058402,
            TS0584=TS0584,
            TS0585=TS0585,
            TS0586=TS0586,
            TS0580=TS0580,
            FLG0580=FLG0580,
            FLG0581=FLG0581,
            FLG058401S=FLG058401S,
            FLG058401L=FLG058401L,
            FLG058402=FLG058402,
            FLG0584=FLG0584,
            FLG0585=FLG0585,
            FLG0586=FLG0586,
            TSSubmit=submit_ts,
            GENTS0580=GENTS0580,
            GENTS0581=GENTS0581,
            GENTS058401S=GENTS058401S,
            GENTS058401L=GENTS058401L,
            GENTS058402=GENTS058402,
            GENTS0585=GENTS0585,
            GENTS0586=GENTS0586,
            REGENTS0580=REGENTS0580,
            REGENTS0581=REGENTS0http,
            REGENTS058401S=REGENTS058401S,
            REGENTS058401L=REGENTS058401L,
            REGENTS058402=REGENTS058402,
            REGENTS0585=REGENTS0585,
            REGENTS0586=REGENTS0586,
            loanDt80eeA=sanctiondate4,
            propertyVal80eeA=propertyvalue4,




        )
        TaxDeclaration_new.save()

        temp_houserentDB1 = temp_houserentDB.objects.filter(empid=emp_user)
        if temp_houserentDB1:
            temp_houserentDB2 = temp_houserentDB1.last()
            temp_houserentDB2.delete()

        temp_80CDB1 = temp_80CDB.objects.get(empid=emp_user)
        if temp_80CDB1:
            temp_80CDB2 = temp_80CDB1.last()
            temp_80CDB2.delete()

        temp_incomeLossProperty1 = temp_incomeLossProperty.objects.get(
            empid=emp_user)
        if temp_incomeLossProperty1:
            temp_incomeLossProperty2 = temp_incomeLossProperty1.last()
            temp_incomeLossProperty2.delete()

        temp_OtherDeductions1 = temp_OtherDeductions.objects.get(
            empid=emp_user)
        if temp_OtherDeductions1:
            temp_OtherDeductions2 = temp_OtherDeductions1.last()
            temp_OtherDeductions2.delete()

        success_message = "House rent allowances details are submitted successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'form2': form2, 'success_message': success_message, 'data3': data3})


def CarDeclarationsubmit(request):

    success_message = ""

    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    CarDeclaration1 = CarDeclaration.objects.filter(empid=emp_user)

    if CarDeclaration1:
        form1 = CarDeclaration1.last()
    else:
        form1 = None

    if request.method == 'POST':
        havecar = request.POST.get('havecar')
        owncar = request.POST.get('owncar', None)
        enginecp = request.POST.get('enginecp', None)
        carregdate = request.POST.get('carreg_ts', None)
        carregnum = request.POST.get('carregnum', None)
        havedriver = request.POST.get('havedriver', None)

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        submit_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if carregdate:
            # Check if the date input is not empty
            carregdate = datetime.strptime(carregdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            carregdate = None

        if enginecp:
            enginecp = enginecp
        else:
            enginecp = None

        if carregnum:
            carregnum = carregnum
        else:
            carregnum = None
        if havedriver:
            havedriver = havedriver
        else:
            havedriver = None
        
        if havecar:
            if havecar == 'CLC':
                clc = True
                have_car = False
            elif havecar == 'Personal':
                clc = False
                have_car = True
                           
        CarDeclaration_new = CarDeclaration(
            empid=emp_user,
            clc = clc,
            have_car = have_car,
            own_car=owncar,
            cc=enginecp,
            carregdt=carregdate,
            registration=carregnum,
            no_driver=havedriver,
            timestamp=submit_ts
        )

        CarDeclaration_new.save()

        data = temp_carDeclarationsForm.objects.filter(empid=emp_user)
        if data:
            data1 = data.last()
            data1.delete()

    success_message = "Car declaration submitted successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form1': form1, 'success_message': success_message})


def carDeclarations(request):

    success_message = ""

    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    carDeclarationsForm1 = carDeclarationsForm.objects.filter(empid=emp_user)

    if carDeclarationsForm1:
        form1 = carDeclarationsForm1.last()
    else:
        form1 = None

    if request.method == 'POST':
        havecar = request.POST.get('havecar')
        owncar = request.POST.get('owncar', None)
        enginecp = request.POST.get('enginecp', None)
        carregdate = request.POST.get('carreg_ts', None)
        carregnum = request.POST.get('carregnum', None)
        havedriver = request.POST.get('havedriver', None)

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        submit_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if carregdate:
            # Check if the date input is not empty
            carregdate = datetime.strptime(carregdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            carregdate = None

        if enginecp:
            enginecp = enginecp
        else:
            enginecp = None

        if carregnum:
            carregnum = carregnum
        else:
            carregnum = None

        car_declaration = carDeclarationsForm(
            empid=emp_user,
            havecar=havecar,
            owncar=owncar,
            enginecp=enginecp,
            carreg_ts=carregdate,
            carregnum=carregnum,
            havedriver=havedriver,
            save_ts=save_ts,
            submit_ts=submit_ts
        )

        car_declaration.save()

        data = temp_carDeclarationsForm.objects.filter(empid=emp_user)
        if data:
            data1 = data.last()
            data1.delete()

    success_message = "Car declaration submitted successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form1': form1, 'success_message': success_message})


def houserent(request):
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    houserentDB1 = houserentDB.objects.filter(empid=emp_user)

    if houserentDB1:
        form2 = houserentDB1.last()
    else:
        form2 = None

    success_message = None

    if request.method == 'POST':
        pannum = request.POST.get('pannum')
        startdate = request.POST.get('startdate')
        rent = request.POST.get('rent')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        Paddress = request.POST.get('Paddress')
        Taddress = request.POST.get('Taddress')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        submit_ts = timezone.now() + timedelta(hours=5, minutes=30)

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

        selfloan = request.POST.get('selfloan', None)
        lendername1 = request.POST.get('lendername1')
        lenderpan1 = request.POST.get('lenderpan1')
        annualvalue = request.POST.get('annualvalue')
        municipaltax = request.POST.get('municipaltax')
        Homeinterest = request.POST.get('Homeinterest')
        incomeloss = request.POST.get('incomeloss')
        standerdded = request.POST.get('standerdded')
        lendername2 = request.POST.get('lendername2')
        lenderpan2 = request.POST.get('lenderpan2')
        sanctiondate3 = request.POST.get('sanctiondate3')

        loanammount = request.POST.get('loanammount', None)
        propertyvalue3 = request.POST.get('propertyvalue3')
        hlinterest = request.POST.get('hlinterest')
        lendername3 = request.POST.get('lendername3')
        lenderpan3 = request.POST.get('lenderpan3')
        sanctiondate4 = request.POST.get('sanctiondate4')
        havehouseproperty = request.POST.get('havehouseproperty')
        propertyvalue4 = request.POST.get('propertyvalue4')
        Eligibility = request.POST.get('Eligibility')
        otherincome = request.POST.get('otherincome')
        savinginterest = request.POST.get('savinginterest')

        selfinsurance = request.POST.get('selfinsurance', None)
        parantinsurance1 = request.POST.get('parantinsurance1')
        parantinsurance2 = request.POST.get('parantinsurance2')
        checkup = request.POST.get('checkup')
        medicaltreatmentinput = request.POST.get('medicaltreatmentinput')
        educationinterest = request.POST.get('educationinterest')
        handicaped = request.POST.get('handicaped')
        dependhandicape = request.POST.get('dependhandicape')
        vehicletype = request.POST.get('vehicletype')
        loansanctiondate = request.POST.get('loansanctiondate')
        carinterest = request.POST.get('carinterest', None)
        ccd80 = request.POST.get('ccd80')
        prannumb = request.POST.get('prannumb')

        if startdate:
            # Check if the date input is not empty
            startdate = datetime.strptime(startdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            startdate = None

        # Convert empty strings to None for fields that should accept null
        rent = int(rent) if rent else None
        contact = int(contact) if contact else None

        lifeInsurance = int(lifeInsurance) if lifeInsurance else None
        timeDeposit = int(timeDeposit) if timeDeposit else None
        ulip = int(ulip) if ulip else None
        savingsCertificate = int(
            savingsCertificate) if savingsCertificate else None
        interestNSC = int(interestNSC) if interestNSC else None
        ppf = int(ppf) if ppf else None
        houseLoan = int(houseLoan) if houseLoan else None
        tuitionFee = int(tuitionFee) if tuitionFee else None
        mutualFund = int(mutualFund) if mutualFund else None
        termDeposit = int(termDeposit) if termDeposit else None
        sukanyaSamriddhi = int(sukanyaSamriddhi) if sukanyaSamriddhi else None

        # Convert empty strings to None for fields that should accept null
        selfloan = int(selfloan) if selfloan else None
        annualvalue = int(annualvalue) if annualvalue else None
        municipaltax = int(municipaltax) if municipaltax else None
        Homeinterest = int(Homeinterest) if Homeinterest else None
        incomeloss = int(incomeloss) if incomeloss else None
        standerdded = int(standerdded) if standerdded else None
        loanammount = int(loanammount) if loanammount else None
        propertyvalue3 = int(propertyvalue3) if propertyvalue3 else None
        hlinterest = int(hlinterest) if hlinterest else None
        propertyvalue4 = int(propertyvalue4) if propertyvalue4 else None
        otherincome = int(otherincome) if otherincome else None
        savinginterest = int(savinginterest) if savinginterest else None

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

        # Convert empty strings to None for fields that should accept null
        selfinsurance = int(selfinsurance) if selfinsurance else None
        parantinsurance1 = int(parantinsurance1) if parantinsurance1 else None
        parantinsurance2 = int(parantinsurance2) if parantinsurance2 else None
        checkup = int(checkup) if checkup else None
        medicaltreatmentinput = int(
            medicaltreatmentinput) if medicaltreatmentinput else None
        educationinterest = int(
            educationinterest) if educationinterest else None
        handicaped = int(handicaped) if handicaped else None
        dependhandicape = int(dependhandicape) if dependhandicape else None
        carinterest = int(carinterest) if carinterest else None
        ccd80 = int(ccd80) if ccd80 else None

        if loansanctiondate:
            # Check if the date input is not empty
            loansanctiondate = datetime.strptime(loansanctiondate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            loansanctiondate = None

        houserent_new = houserentDB(
            empid=emp_user,
            pannum=pannum,
            startdate=startdate,
            rent=rent,
            name=name,
            contact=contact,
            Paddress=Paddress,
            Taddress=Taddress,

            save_ts=save_ts,
            submit_ts=submit_ts,

            lifeInsurance=lifeInsurance,
            timeDeposit=timeDeposit,
            ulip=ulip,
            savingsCertificate=savingsCertificate,
            interestNSC=interestNSC,
            ppf=ppf,
            houseLoan=houseLoan,
            tuitionFee=tuitionFee,
            mutualFund=mutualFund,
            termDeposit=termDeposit,
            sukanyaSamriddhi=sukanyaSamriddhi,

            selfloan=selfloan,
            lendername1=lendername1,
            lenderpan1=lenderpan1,
            annualvalue=annualvalue,
            municipaltax=municipaltax,
            Homeinterest=Homeinterest,
            incomeloss=incomeloss,
            standerdded=standerdded,
            lendername2=lendername2,
            lenderpan2=lenderpan2,
            sanctiondate3=sanctiondate3,

            loanammount=loanammount,
            propertyvalue3=propertyvalue3,
            hlinterest=hlinterest,
            lendername3=lendername3,
            lenderpan3=lenderpan3,
            sanctiondate4=sanctiondate4,
            havehouseproperty=havehouseproperty,
            propertyvalue4=propertyvalue4,
            Eligibility=Eligibility,
            otherincome=otherincome,
            savinginterest=savinginterest,

            selfinsurance=selfinsurance,
            parantinsurance1=parantinsurance1,
            parantinsurance2=parantinsurance2,
            checkup=checkup,
            medicaltreatmentinput = medicaltreatmentinput,
            educationinterest=educationinterest,
            handicaped=handicaped,
            dependhandicape=dependhandicape,
            vehicletype=vehicletype,

            loansanctiondate=loansanctiondate,
            carinterest=carinterest,
            ccd80=ccd80,
            prannumb=prannumb,

        )
        houserent_new.save()

        temp_houserentDB1 = temp_houserentDB.objects.filter(empid=emp_user)
        if temp_houserentDB1:
            temp_houserentDB2 = temp_houserentDB1.last()
            temp_houserentDB2.delete()

        temp_80CDB1 = temp_80CDB.objects.get(empid=emp_user)
        if temp_80CDB1:
            temp_80CDB2 = temp_80CDB1.last()
            temp_80CDB2.delete()

        temp_incomeLossProperty1 = temp_incomeLossProperty.objects.get(
            empid=emp_user)
        if temp_incomeLossProperty1:
            temp_incomeLossProperty2 = temp_incomeLossProperty1.last()
            temp_incomeLossProperty2.delete()

        temp_OtherDeductions1 = temp_OtherDeductions.objects.get(
            empid=emp_user)
        if temp_OtherDeductions1:
            temp_OtherDeductions2 = temp_OtherDeductions1.last()
            temp_OtherDeductions2.delete()

        success_message = "House rent allowances details are submitted successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'form2': form2, 'success_message': success_message, 'data3': data3})


def temp_carDeclarations(request):
    success_message = ""
    temp_form1 = ""
    form1 = ""
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    try:
        temp_carDeclarationsForm1 = temp_carDeclarationsForm.objects.get(
            empid=emp_user)
        temp_form1 = temp_carDeclarationsForm1

        carDeclarationsForm1 = carDeclarationsForm.objects.filter(
            empid=emp_user)
        if carDeclarationsForm1:
            form1 = carDeclarationsForm1.last()

        else:
            form1 = None

    except:
        temp_carDeclarationsForm1 = None
        carDeclarationsForm1 = None

    if request.method == 'POST':
        havecar = request.POST.get('havecar')
        owncar = request.POST.get('owncar', None)
        enginecp = request.POST.get('enginecp', None)
        carregdate = request.POST.get('carreg_ts', None)
        carregnum = request.POST.get('carregnum', None)
        havedriver = request.POST.get('havedriver', None)

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)
        submit_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if carregdate:
            # Check if the date input is not empty
            carregdate = datetime.strptime(carregdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            carregdate = None

        if temp_carDeclarationsForm1:
            # Update the existing record with new values if provided
            if havecar:
                temp_carDeclarationsForm1.havecar = havecar
            if owncar:
                temp_carDeclarationsForm1.owncar = owncar
            if enginecp:
                temp_carDeclarationsForm1.enginecp = enginecp
            if carregdate:
                temp_carDeclarationsForm1.carreg_ts = carregdate
            if carregnum:
                temp_carDeclarationsForm1.carregnum = carregnum
            if havedriver:
                temp_carDeclarationsForm1.havedriver = havedriver

            temp_carDeclarationsForm1.save()
            success_message = "Data updated successfully"
        else:
            # Create a new record
            car_declaration = temp_carDeclarationsForm(
                empid=emp_user,
                havecar=havecar,
                owncar=owncar,
                enginecp=enginecp,
                carreg_ts=carregdate,
                carregnum=carregnum,
                havedriver=havedriver,
                save_ts=save_ts,
                submit_ts=submit_ts
            )
            car_declaration.save()
            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form1': form1,
                                                   'temp_form1': temp_form1, 'success_message': success_message})


def del_temp_carDeclarations(request, empid):

    data = temp_carDeclarationsForm.objects.get(empid=empid)
    data.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})


def temp_houserent(request):
    success_message = ""
    temp_form2 = ""
    form2 = ""
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    try:
        temp_houserentDB1 = temp_houserentDB.objects.get(empid=emp_user)
        temp_form2 = temp_houserentDB1

        houserentDB1 = houserentDB.objects.filter(empid=emp_user)
        if houserentDB1:
            form2 = houserentDB1.last()
        else:
            form2 = None

    except temp_houserentDB.DoesNotExist:
        temp_houserentDB1 = None
        form2 = None

    if request.method == 'POST':
        pannum = request.POST.get('pannum')
        startdate = request.POST.get('startdate')
        rent = request.POST.get('rent')
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        Paddress = request.POST.get('Paddress')
        Taddress = request.POST.get('Taddress')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        if startdate:
            # Check if the date input is not empty
            startdate = datetime.strptime(startdate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            startdate = None

        # Convert empty strings to None for fields that should accept null
        rent = int(rent) if rent else None
        contact = int(contact) if contact else None

        if temp_houserentDB1:
            # Update the existing record with new values if provided
            if pannum:
                temp_houserentDB1.pannum = pannum
            if startdate:
                temp_houserentDB1.startdate = startdate
            if rent:
                temp_houserentDB1.rent = rent
            if name:
                temp_houserentDB1.name = name
            if contact:
                temp_houserentDB1.contact = contact
            if Paddress:
                temp_houserentDB1.Paddress = Paddress
            if Taddress:
                temp_houserentDB1.Taddress = Taddress

            temp_houserentDB1.save_ts = save_ts

            temp_houserentDB1.save()

            success_message = "Data updated successfully"
        else:
            temp_houserentDB_new = temp_houserentDB(
                empid=emp_user,
                pannum=pannum,
                startdate=startdate,
                rent=rent,
                name=name,
                contact=contact,
                Paddress=Paddress,
                Taddress=Taddress,
                save_ts=save_ts

            )
            temp_houserentDB_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form2': form2,
                                                   'temp_form2': temp_form2, 'success_message': success_message})


def del_temp_houserent(request, empid):

    data = temp_houserentDB.objects.get(empid=empid)
    data.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})


def temp_80C(request):
    success_message = ""
    temp_form5 = ""
    form2 = ""
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    try:
        temp_80CDB2 = temp_80CDB.objects.filter(empid=emp_user)
        temp_80CDB1 = temp_80CDB2.last()
        temp_form5 = temp_80CDB2.last()

        houserentDB1 = houserentDB.objects.filter(empid=emp_user)
        if houserentDB1:
            form2 = houserentDB1.last()
        else:
            form2 = None

    except temp_houserentDB.DoesNotExist:
        temp_80CDB1 = None
        form2 = None

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
        lifeInsurance = int(lifeInsurance) if lifeInsurance else None
        timeDeposit = int(timeDeposit) if timeDeposit else None
        ulip = int(ulip) if ulip else None
        savingsCertificate = int(
            savingsCertificate) if savingsCertificate else None
        interestNSC = int(interestNSC) if interestNSC else None
        ppf = int(ppf) if ppf else None
        houseLoan = int(houseLoan) if houseLoan else None
        tuitionFee = int(tuitionFee) if tuitionFee else None
        mutualFund = int(mutualFund) if mutualFund else None
        termDeposit = int(termDeposit) if termDeposit else None
        sukanyaSamriddhi = int(sukanyaSamriddhi) if sukanyaSamriddhi else None

        if temp_80CDB1:
            # Update the existing record with new values if provided
            if lifeInsurance:
                temp_80CDB1.lifeInsurance = lifeInsurance
            if timeDeposit:
                temp_80CDB1.timeDeposit = timeDeposit
            if ulip:
                temp_80CDB1.ulip = ulip
            if savingsCertificate:
                temp_80CDB1.savingsCertificate = savingsCertificate
            if interestNSC:
                temp_80CDB1.interestNSC = interestNSC
            if ppf:
                temp_80CDB1.ppf = ppf
            if houseLoan:
                temp_80CDB1.houseLoan = houseLoan
            if tuitionFee:
                temp_80CDB1.tuitionFee = tuitionFee
            if mutualFund:
                temp_80CDB1.mutualFund = mutualFund
            if termDeposit:
                temp_80CDB1.termDeposit = termDeposit
            if sukanyaSamriddhi:
                temp_80CDB1.sukanyaSamriddhi = sukanyaSamriddhi

            temp_80CDB1.save_ts = save_ts

            temp_80CDB1.save()

            success_message = "Data updated successfully"
        else:
            temp_80CDB_new = temp_80CDB(
                empid=emp_user,
                lifeInsurance=lifeInsurance,
                timeDeposit=timeDeposit,
                ulip=ulip,
                savingsCertificate=savingsCertificate,
                interestNSC=interestNSC,
                ppf=ppf,
                houseLoan=houseLoan,

                tuitionFee=tuitionFee,
                mutualFund=mutualFund,
                termDeposit=termDeposit,
                sukanyaSamriddhi=sukanyaSamriddhi,

                save_ts=save_ts,


            )
            temp_80CDB_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form2': form2,
                                                   'temp_form5': temp_form5, 'success_message': success_message})


def del_temp_80C(request, empid):

    data = temp_80CDB.objects.get(empid=empid)
    data.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})


def temp_incomeLoss(request):
    success_message = ""
    temp_form3 = ""
    form2 = ""
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    try:
        temp_incomeLossProperty1 = temp_incomeLossProperty.objects.filter(
            empid=emp_user)
        temp_incomeLossProperty2 = temp_incomeLossProperty1.last()
        temp_form3 = temp_incomeLossProperty1.last()

        houserentDB1 = houserentDB.objects.filter(empid=emp_user)
        if houserentDB1:
            form2 = houserentDB1.last()
        else:
            form2 = None

    except temp_incomeLossProperty.DoesNotExist:
        temp_incomeLossProperty2 = None

    if request.method == 'POST':
        selfloan = request.POST.get('selfloan', None)
        lendername1 = request.POST.get('lendername1')
        lenderpan1 = request.POST.get('lenderpan1')
        annualvalue = request.POST.get('annualvalue')
        municipaltax = request.POST.get('municipaltax')
        Homeinterest = request.POST.get('Homeinterest')
        incomeloss = request.POST.get('incomeloss')
        standerdded = request.POST.get('standerdded')
        lendername2 = request.POST.get('lendername2')
        lenderpan2 = request.POST.get('lenderpan2')
        sanctiondate3 = request.POST.get('sanctiondate3')

        loanammount = request.POST.get('loanammount', None)
        propertyvalue3 = request.POST.get('propertyvalue3')
        hlinterest = request.POST.get('hlinterest')
        lendername3 = request.POST.get('lendername3')
        lenderpan3 = request.POST.get('lenderpan3')
        sanctiondate4 = request.POST.get('sanctiondate4')
        havehouseproperty = request.POST.get('havehouseproperty')
        propertyvalue4 = request.POST.get('propertyvalue4')
        Eligibility = request.POST.get('Eligibility')
        otherincome = request.POST.get('otherincome')
        savinginterest = request.POST.get('savinginterest')

        save_ts = timezone.now() + timedelta(hours=5, minutes=30)

        # Convert empty strings to None for fields that should accept null
        selfloan = int(selfloan) if selfloan else None
        annualvalue = int(annualvalue) if annualvalue else None
        municipaltax = int(municipaltax) if municipaltax else None
        Homeinterest = int(Homeinterest) if Homeinterest else None
        incomeloss = int(incomeloss) if incomeloss else None
        standerdded = int(standerdded) if standerdded else None
        loanammount = int(loanammount) if loanammount else None
        propertyvalue3 = int(propertyvalue3) if propertyvalue3 else None
        hlinterest = int(hlinterest) if hlinterest else None
        propertyvalue4 = int(propertyvalue4) if propertyvalue4 else None
        otherincome = int(otherincome) if otherincome else None
        savinginterest = int(savinginterest) if savinginterest else None

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

        if temp_incomeLossProperty2:
            # Update the existing record with new values if provided
            if selfloan:
                temp_incomeLossProperty2.selfloan = selfloan
            if lendername1:
                temp_incomeLossProperty2.lendername1 = lendername1
            if lenderpan1:
                temp_incomeLossProperty2.lenderpan1 = lenderpan1
            if annualvalue:
                temp_incomeLossProperty2.annualvalue = annualvalue
            if municipaltax:
                temp_incomeLossProperty2.municipaltax = municipaltax
            if Homeinterest:
                temp_incomeLossProperty2.Homeinterest = Homeinterest
            if incomeloss:
                temp_incomeLossProperty2.incomeloss = incomeloss
            if standerdded:
                temp_incomeLossProperty2.standerdded = standerdded
            if lendername2:
                temp_incomeLossProperty2.lendername2 = lendername2
            if lenderpan2:
                temp_incomeLossProperty2.lenderpan2 = lenderpan2
            if sanctiondate3:
                temp_incomeLossProperty2.sanctiondate3 = sanctiondate3

            if loanammount:
                temp_incomeLossProperty2.loanammount = loanammount
            if propertyvalue3:
                temp_incomeLossProperty2.propertyvalue3 = propertyvalue3
            if hlinterest:
                temp_incomeLossProperty2.hlinterest = hlinterest
            if lendername3:
                temp_incomeLossProperty2.lendername3 = lendername3
            if lenderpan3:
                temp_incomeLossProperty2.lenderpan3 = lenderpan3
            if sanctiondate4:
                temp_incomeLossProperty2.sanctiondate4 = sanctiondate4
            if havehouseproperty:
                temp_incomeLossProperty2.havehouseproperty = havehouseproperty
            if propertyvalue4:
                temp_incomeLossProperty2.propertyvalue4 = propertyvalue4
            if Eligibility:
                temp_incomeLossProperty2.Eligibility = Eligibility
            if otherincome:
                temp_incomeLossProperty2.otherincome = otherincome
            if savinginterest:
                temp_incomeLossProperty2.savinginterest = savinginterest
            temp_incomeLossProperty2.save_ts = save_ts

            temp_incomeLossProperty2.save()

            success_message = "Data updated successfully"
        else:
            temp_incomeLossProperty_new = temp_incomeLossProperty(
                empid=emp_user,
                selfloan=selfloan,
                lendername1=lendername1,
                lenderpan1=lenderpan1,
                annualvalue=annualvalue,
                municipaltax=municipaltax,
                Homeinterest=Homeinterest,
                incomeloss=incomeloss,
                standerdded=standerdded,
                lendername2=lendername2,
                lenderpan2=lenderpan2,
                sanctiondate3=sanctiondate3,

                loanammount=loanammount,
                propertyvalue3=propertyvalue3,
                hlinterest=hlinterest,
                lendername3=lendername3,
                lenderpan3=lenderpan3,
                sanctiondate4=sanctiondate4,
                havehouseproperty=havehouseproperty,
                propertyvalue4=propertyvalue4,
                Eligibility=Eligibility,
                otherincome=otherincome,
                savinginterest=savinginterest,

                save_ts=save_ts,


            )
            temp_incomeLossProperty_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form2': form2,
                                                   'temp_form3': temp_form3, 'success_message': success_message})


def del_temp_incomeLoss(request, empid):

    data = temp_incomeLossProperty.objects.get(empid=empid)
    data.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})


def temp_Other(request):
    success_message = ""
    temp_form4 = ""
    form2 = ""
    # Retrieve the loginid from the session
    emp_user = request.session.get('emp_user', None)

    if not emp_user:
        # No user is logged in, return a specific HTTP response
        return HttpResponse('No User logged in')

    data = EmployeeDetail.objects.get(empid=emp_user)

    TaxRegime1 = TaxRegime.objects.filter(empid=emp_user)
    data1 = TaxRegime1.last()

    TaxDeclaration1 = TaxDeclaration.objects.filter(empid=emp_user)
    data3 = TaxDeclaration1.last()

    try:
        temp_OtherDeductions1 = temp_OtherDeductions.objects.filter(
            empid=emp_user)
        temp_OtherDeductions2 = temp_OtherDeductions1.last()
        temp_form4 = temp_OtherDeductions1.last()

        houserentDB1 = houserentDB.objects.filter(empid=emp_user)
        if houserentDB1:
            form2 = houserentDB1.last()
        else:
            form2 = None

    except temp_OtherDeductions.DoesNotExist:
        temp_OtherDeductions2 = None

    if request.method == 'POST':
        selfinsurance = request.POST.get('selfinsurance', None)
        parantinsurance1 = request.POST.get('parantinsurance1')
        parantinsurance2 = request.POST.get('parantinsurance2')
        checkup = request.POST.get('checkup')
        medicaltreatmentinput = request.POST.get('medicaltreatmentinput')
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
        selfinsurance = int(selfinsurance) if selfinsurance else None
        parantinsurance1 = int(parantinsurance1) if parantinsurance1 else None
        parantinsurance2 = int(parantinsurance2) if parantinsurance2 else None
        checkup = int(checkup) if checkup else None
        medicaltreatmentinput = int(
            medicaltreatmentinput) if medicaltreatmentinput else None
        educationinterest = int(
            educationinterest) if educationinterest else None
        handicaped = int(handicaped) if handicaped else None
        dependhandicape = int(dependhandicape) if dependhandicape else None
        carinterest = int(carinterest) if carinterest else None
        ccd80 = int(ccd80) if ccd80 else None

        if loansanctiondate:
            # Check if the date input is not empty
            loansanctiondate = datetime.strptime(loansanctiondate, "%Y-%m-%d")
        else:
            # If the date input is empty, set carregdate to None
            loansanctiondate = None

        if temp_OtherDeductions2:
            # Update the existing record with new values if provided
            if selfinsurance:
                temp_OtherDeductions2.selfinsurance = selfinsurance
            if parantinsurance1:
                temp_OtherDeductions2.parantinsurance1 = parantinsurance1
            if parantinsurance2:
                temp_OtherDeductions2.parantinsurance2 = parantinsurance2
            if checkup:
                temp_OtherDeductions2.checkup = checkup
            if medicaltreatmentinput:
                temp_OtherDeductions2.medicaltreatmentinput = medicaltreatmentinput
            if educationinterest:
                temp_OtherDeductions2.educationinterest = educationinterest
            if handicaped:
                temp_OtherDeductions2.handicaped = handicaped
            if dependhandicape:
                temp_OtherDeductions2.dependhandicape = dependhandicape
            if vehicletype:
                temp_OtherDeductions2.vehicletype = vehicletype

            if loansanctiondate:
                temp_OtherDeductions2.loansanctiondate = loansanctiondate
            if carinterest:
                temp_OtherDeductions2.carinterest = carinterest
            if ccd80:
                temp_OtherDeductions2.ccd80 = ccd80
            if prannumb:
                temp_OtherDeductions2.prannumb = prannumb

            temp_OtherDeductions2.save_ts = save_ts

            temp_OtherDeductions2.save()

            success_message = "Data updated successfully"
        else:
            temp_OtherDeductions_new = temp_OtherDeductions(
                empid=emp_user,
                selfinsurance=selfinsurance,
                parantinsurance1=parantinsurance1,
                parantinsurance2=parantinsurance2,
                checkup=checkup,
                medicaltreatmentinput=medicaltreatmentinput,
                educationinterest=educationinterest,
                handicaped=handicaped,
                dependhandicape=dependhandicape,
                vehicletype=vehicletype,

                loansanctiondate=loansanctiondate,
                carinterest=carinterest,
                ccd80=ccd80,
                prannumb=prannumb,
                save_ts=save_ts,


            )
            temp_OtherDeductions_new.save()

            success_message = "Data saved successfully"

    return render(request, 'ITDeclarations.html', {'data': data, 'data1': data1, 'data3': data3, 'form2': form2,
                                                   'temp_form4': temp_form4, 'success_message': success_message})


def del_temp_Other(request, empid):

    data = temp_OtherDeductions.objects.get(empid=empid)
    data.delete()
    success_message = "Saved Data is deleted"

    return render(request, 'ITDeclarations.html', {'success_message': success_message})
