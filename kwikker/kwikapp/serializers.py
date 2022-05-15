from rest_framework import serializers
from kwikapp.models import Kwik, NewUser, CommentKwik, UserFollowing
from django.conf import settings


class UserDetailSerializer(serializers.ModelSerializer):
    isfollowed = serializers.SerializerMethodField('followed')
    start_date = serializers.DateTimeField(format="%B %d, %Y %H:%M")

    def followed(self, profile):
        loggeduser = self.context['request'].user.id
        return profile.isFollowing(loggeduser)

    class Meta:
        model = NewUser
        fields = ['id', 'user_name', 'first_name', 'about', 'isfollowed', 'start_date']


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')

    class Meta:
        model = CommentKwik
        fields = ['id', 'kwik', 'user', 'user_name', 'comment', 'comment_date']


class DetailKwikSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')
    comment = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Kwik
        fields = ('id', 'user', 'user_name', 'content', 'comment')


class KwikSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')
    kwik_date = serializers.DateTimeField(format="%B %d, %Y %H:%M")

    class Meta:
        model = Kwik
        fields = ('id', 'user', 'user_name', 'content', 'kwik_date')


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("id", "user_id", "following_user_id", "created")


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validate_data):
        password = validate_data.pop('password', None)
        instance = self.Meta.model(**validate_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
