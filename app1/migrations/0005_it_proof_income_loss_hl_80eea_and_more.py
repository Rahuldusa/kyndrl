# Generated by Django 5.0.1 on 2024-08-14 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0004_it_proof_income_loss_place_80ee_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='it_proof_income_loss',
            name='hl_80eea',
            field=models.BigIntegerField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='it_proof_income_loss',
            name='loc_80ee',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='it_proof_income_loss',
            name='loc_80eea',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
    ]