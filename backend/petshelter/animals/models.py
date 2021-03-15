from django.db import models
import datetime
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

    # Allow for all fields to be blank. Shelter may not always input each and every piece of information
    # at time of creation.
    shelter_id = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    intake_date = models.DateTimeField(auto_now_add=True)
    species = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    breed = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    gender = models.CharField(
        max_length=255, default=None, blank=True, null=True, choices=ANIMAL_GENDERS)
    age_years = models.IntegerField(default=None, blank=True, null=True)
    age_months = models.IntegerField(default=None, blank=True, null=True)
    age_weeks = models.IntegerField(default=None, blank=True, null=True)
    age_days = models.IntegerField(default=None, blank=True, null=True)
    dob_estimate = models.DateTimeField(default=None, null=True)
    location = models.CharField(
        max_length=255, default="Shelter", blank=True, null=True)
    fee = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(default=None, blank=True, null=True)
    color = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    notes = models.TextField(default=None, blank=True, null=True)
    name = models.CharField(
        max_length=255, default=None, blank=True, null=True)
