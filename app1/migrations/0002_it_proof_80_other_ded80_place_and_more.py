# Generated by Django 5.0.1 on 2024-08-12 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='it_proof_80_other',
            name='ded80_place',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='it_proof_80_other',
            name='eeb80_place',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='it_proof_80c_contribution',
            name='c80_place',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='it_proof_income_loss',
            name='other_place',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='it_proof_income_loss',
            name='tta80_place',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
    ]
