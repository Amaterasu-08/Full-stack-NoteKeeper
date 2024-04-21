from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

# handle createing new user or object via generics.CreateAPIViews
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# create and display all notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)  #get all the notes written by a perticular user
    
    # the above operation can create a note but we want a custom create
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user) # we add the author here by manually checking of all the parameter of the serializr is valid or not
        else:
            print(serializer.errors)
    


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)