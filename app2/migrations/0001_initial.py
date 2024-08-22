# Generated by Django 5.0.1 on 2024-08-08 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(default=None, max_length=15)),
                ('username', models.CharField(max_length=15)),
                ('password', models.CharField(max_length=100)),
                ('roles', models.CharField(choices=[('verifier1', 'Verifier1'), ('verifier2', 'Verifier2'), ('td_admin', 'Admin'), ('fbp_verifier1', 'FBP_Verifier1'), ('fbp_verifier2', 'FBP_Verifier2'), ('fbp_resub_verifier', 'FBP_Resub_Verifier')], max_length=50)),
                ('company_name', models.CharField(default=None, max_length=50)),
                ('control_num_st', models.IntegerField(default=None, null=True)),
                ('control_num_end', models.IntegerField(default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='remarks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_name', models.CharField(max_length=50)),
                ('remarks', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='support_user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(default=None, max_length=50)),
                ('user_level', models.CharField(max_length=15)),
                ('username', models.CharField(max_length=50)),
                ('email_id', models.EmailField(max_length=254)),
            ],
        ),
    ]
