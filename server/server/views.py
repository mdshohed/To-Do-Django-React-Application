from server.models import UserDetailsModel
from server.serializers import UserDetailsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http.response import JsonResponse
from django.http.response import Http404

class UserDetailsTable(APIView):
  # user set function
  def post(self,request):
    data=request.data
    serializer=UserDetailsSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse("Data Created Successfully", safe=False)
    return JsonResponse( "Failed to Add Data", safe=False)
  
  # single user details function
  def get_user(self,pk):
    try:
      data=UserDetailsModel.objects.get(id=pk)
      return data
    except UserDetailsModel.DoesNotExist():
      return "Server error"
    
  # All user get function
  def get(self, request, pk=None):
    if pk:
      data=self.get_user(pk)
      SerializeObj=UserDetailsSerializer(data) 
    else:
      data=UserDetailsModel.objects.all()
      SerializeObj=UserDetailsSerializer(data,many=True)
    return Response(SerializeObj.data)
  
  # User Details update function 
  def put(self,request,pk=None):
    updates=UserDetailsModel.objects.get(id=pk)
    print(updates)
    serializer=UserDetailsSerializer(instance=updates,data=request.data,partial=True)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse("Updated Successfully", safe=False)
    return JsonResponse("Failed to Updated Data")
  
  # User delete function 
  def delete(self, request, pk=None):
    data=UserDetailsModel.objects.get(id=pk)
    data.delete()
    return JsonResponse("Deleted Successfully", safe=False)
    
    