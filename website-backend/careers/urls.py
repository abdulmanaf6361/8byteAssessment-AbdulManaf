from django.urls import path
from .views import CareerListAPIView, CareerApplicationAPIView

urlpatterns = [
    path('list/', CareerListAPIView.as_view(), name='career-list'),
    path('apply/', CareerApplicationAPIView.as_view(), name='career-apply'),
]
