# Generated by Django 4.0.2 on 2022-07-07 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kwikapp', '0002_remove_newuser_first_name_alter_newuser_about'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='user_name',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
