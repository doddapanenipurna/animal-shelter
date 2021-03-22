# Generated by Django 3.1.1 on 2021-03-22 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0010_auto_20210322_0555'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animal',
            name='intake_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='animal',
            name='weight',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]
