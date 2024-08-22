from django.db import models
from django.contrib.auth.hashers import make_password


class CustomUser(models.Model):
    Roles = (
        ('verifier1', 'Verifier1'),
        ('verifier2', 'Verifier2'),
        ('td_admin', 'Admin'),
        ('fbp_verifier1', 'FBP_Verifier1'),
        ('fbp_verifier2', 'FBP_Verifier2'),
        ('fbp_resub_verifier', 'FBP_Resub_Verifier'))
    
    user_id = models.CharField(max_length=15, default=None)
    username=models.CharField(max_length=15)
    password=models.CharField(max_length=100)
    roles=models.CharField(max_length=50,choices=Roles)
    company_name = models.CharField(max_length=50, default=None)
    control_num_st = models.IntegerField(null=True, default=None)
    control_num_end = models.IntegerField(null=True, default=None)
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(CustomUser, self).save(*args, **kwargs)

class support_user(models.Model):

    company_name = models.CharField(max_length=50, default=None)
    user_level = models.CharField(max_length=15)
    username = models.CharField(max_length=50)
    email_id = models.EmailField()


class remarks(models.Model):
    section_name = models.CharField(max_length=50) 
    remarks = models.CharField(max_length=250)

    def __str__(self):
        return self.section_name
    