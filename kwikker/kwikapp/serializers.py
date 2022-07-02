from rest_framework import serializers
from kwikapp.models import Kwik, NewUser, CommentKwik, UserFollowing, LikeKwik
from django.conf import settings


class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ['id', 'user_name', 'about']

class UserDetailSerializer(serializers.ModelSerializer):
    isfollowed = serializers.SerializerMethodField('followed')
    start_date = serializers.DateTimeField(format="%B %d, %Y %H:%M")

    def followed(self, profile):
        loggeduser = self.context['request'].user.id
        return profile.isFollowing(loggeduser)

    class Meta:
        model = NewUser
        fields = ['id', 'user_name', 'avatar', 'about', 'isfollowed', 'start_date']


class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ['id', 'user_name', 'avatar']

class CreateKwikSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')

    class Meta:
        model = Kwik
        fields = ('id', 'user', 'user_name', 'content', 'kwik_date')
        extra_kwargs = {'user': {'required': True}}


class LikeKwikSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeKwik
        fields = ('kwik', 'user')


class KwikSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')
    kwik_date = serializers.DateTimeField(format="%B %d, %Y %H:%M")
    avatar = serializers.ReadOnlyField(source='user.avatar')
    is_liked = serializers.SerializerMethodField("liked")
    countedlikes = serializers.SerializerMethodField("counted_likes")
    countedcomments = serializers.SerializerMethodField("counted_comments")

    def counted_likes(self, kwik):
        return kwik.countLikes()

    def counted_comments(self, kwik):
        return kwik.countComments()

    def liked(self, kwik):
        loggeduser = self.context['request'].user.id
        return kwik.isLiked(loggeduser)

    class Meta:
        model = Kwik
        fields = ('id', 'user', 'avatar', 'user_name', 'content', 'kwik_date', 'is_liked', 'countedlikes', 'countedcomments')


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')
    comment_date = serializers.DateTimeField(format="%B %d, %Y", read_only=True)
    avatar = serializers.ReadOnlyField(source='user.avatar')

    class Meta:
        model = CommentKwik
        fields = ['id', 'kwik', 'user', 'avatar', 'user_name', 'comment', 'comment_date']


class DetailKwikSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.user_name')
    avatar = serializers.ReadOnlyField(source='user.avatar')
    comment = CommentSerializer(many=True, read_only=True)
    kwik_date = serializers.DateTimeField(format="%B %d, %Y %H:%M")
    is_liked = serializers.SerializerMethodField("liked")
    countedlikes = serializers.SerializerMethodField("counted_likes")
    countedcomments = serializers.SerializerMethodField("counted_comments")

    def counted_likes(self, kwik):
        return kwik.countLikes()

    def counted_comments(self, kwik):
        return kwik.countComments()

    def liked(self, kwik):
        loggeduser = self.context['request'].user.id
        return kwik.isLiked(loggeduser)

    class Meta:
        model = Kwik
        fields = ('id', 'user', 'avatar', 'user_name', 'kwik_date', 'content', 'comment', 'is_liked', 'countedlikes', 'countedcomments')


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
        fields = ('email', 'user_name')
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
