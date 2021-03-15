from django.db import models

# Create your models here.


class Animal(models.Model):

    # Defining choices for a field follows code samples as given by Django's official Documentation
    # https://docs.djangoproject.com/en/3.1/ref/models/fields/#choices

    MALE = 'MALE'
    FEMALE = 'FEMALE'
    OTHER = 'OTHER'

    ANIMAL_GENDERS = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other')
    ]

    shelter_id = models.CharField(default=None, blank=True, null=True)
    intake_date = models.DateTimeField(default=datetime.now)
    species = models.CharField(default=None, blank=True)
    breed = models.CharField(default=None, blank=True)
    gender = models.CharField(default=None, blank=True, choices=ANIMAL_GENDERS)
    age_years = models.IntegerField(default=None, blank=True)
    age_months = models.IntegerField(default=None, blank=True)
    age_weeks = models.IntegerField(default=None, blank=True)
    age_days = models.IntegerField(default=None, blank=True)
    # do some calcuations here to deteremine it from the age parameters provided
    dob_estimate = models.DateTimeField(deafult=None)
    location = models.CharField(default="Shelter", blank=True, null=True)
    fee = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(default=None, blank=True, null=True)
    color = models.CharField(default=None, blank=True, null=True)
    notes = models.TextField(default=None, blank=True,null=True )
