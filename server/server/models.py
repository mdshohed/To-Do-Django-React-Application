from django.db import models

class UserDetailsModel(models.Model):
  id=models.AutoField(primary_key=True)
  name=models.CharField(max_length=100)
  email=models.CharField(max_length=100)
  address=models.CharField(max_length=100)
  number=models.CharField(max_length=100)
  def __str__(self):
    return self.name or ''