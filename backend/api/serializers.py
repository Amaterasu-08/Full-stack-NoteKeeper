from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}} #this means when we create password we only want it to crete it but nver display it

    # validated data is data checked by serializer are valid
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","content","created_at", "author"]
        # extra_kwargs tells us what extra thing we want to specify with a field
        extra_kwargs = {"author":{"read_only":True}}  # here we want the to only read the author we create the author manually during note creation but we dont want anyone to change it so read_only
        