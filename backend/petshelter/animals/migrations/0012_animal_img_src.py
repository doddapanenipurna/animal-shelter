# Generated by Django 3.1.1 on 2021-03-22 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0011_auto_20210322_1648'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='img_src',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='animals/'),
        ),
    ]
