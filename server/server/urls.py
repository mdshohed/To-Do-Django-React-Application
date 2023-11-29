
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/',views.UserDetailsTable.as_view()),
    path('api/users/<int:pk>/',views.UserDetailsTable.as_view())
]
