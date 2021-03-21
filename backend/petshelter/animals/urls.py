from django.urls import path
from animals.views import (
    AddAnimal, Index, GenerateAnimalId, AllAnimals, UpdateAnimal
)

urlpatterns = [
    path('',Index.as_view()),
    path('add/',AddAnimal.as_view()),
    path('generateid/', GenerateAnimalId.as_view()),
    path('all_animals/', AllAnimals.as_view()),
    path('update/<str:shelter_id>/', UpdateAnimal.as_view()),
]