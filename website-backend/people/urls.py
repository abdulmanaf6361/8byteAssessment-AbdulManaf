from django.urls import path
from .views import PeopleListAPIView

urlpatterns = [
    path('list/', PeopleListAPIView.as_view(), name='people-list'),
]
