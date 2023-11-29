from rest_framework import serializers
from server.models import UserDetailsModel

class UserDetailsSerializer(serializers.ModelSerializer):
  class Meta:
    model=UserDetailsModel
    # fields=('id','name','age','city','country') instant fields="__all__"
    fields="__all__"