from django.db import models
import datetime
# Create your models here.


class Animal(models.Model):

    # Allow for all fields to be blank. Shelter may not always input each and every piece of information
    # at time of creation.
    shelter_id = models.CharField(
        max_length=255, default=None, blank=True, null=True, unique=True)
    intake_date = models.DateTimeField(auto_now_add=True)
    intake_type = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    intake_employee = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    species = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    breed = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    gender = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    age_years = models.IntegerField(default=None, blank=True, null=True)
    age_months = models.IntegerField(default=None, blank=True, null=True)
    age_weeks = models.IntegerField(default=None, blank=True, null=True)
    age_days = models.IntegerField(default=None, blank=True, null=True)
    location = models.CharField(
        max_length=255, default="Shelter", blank=True, null=True)
    fee = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(default=None, blank=True, null=True)
    color = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    medical_notes = models.TextField(default=None, blank=True, null=True)
    other_notes = models.TextField(default=None, blank=True, null=True)
    name = models.CharField(
        max_length=255, default=None, blank=True, null=True)
    neutered_or_spayed = models.BooleanField(
        default = False
    )