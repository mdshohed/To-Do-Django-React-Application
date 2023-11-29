from django.contrib import admin
from server.models import UserDetailsModel

class UserDetailsAdmin(admin.ModelAdmin):
  pass

admin.site.register(UserDetailsModel, UserDetailsAdmin)