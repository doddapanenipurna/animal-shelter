from django.urls import path
from animals.views import (
    AddAnimal, Index, GenerateAnimalId, AllAnimals, UpdateAnimalState, GetAnimal, UpdateAnimal, CreatePaperwork,
)

urlpatterns = [
    path('',Index.as_view()),
    path('add/',AddAnimal.as_view()),
    path('generateid/', GenerateAnimalId.as_view()),
    path('all_animals/', AllAnimals.as_view()),
    path('update/<str:shelter_id>/', UpdateAnimalState.as_view()),
    path('update_all/<str:shelter_id>/', UpdateAnimal.as_view()),
    path('animal/<str:shelter_id>/', GetAnimal.as_view()),
    path('createpaperwork/<str:shelter_id>/', CreatePaperwork.as_view()),
]