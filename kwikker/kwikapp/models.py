from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Create your models here.

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def isFollowing(self, loginuserid):
        return UserFollowing.objects.filter(user_id_id=loginuserid).filter(following_user_id_id=self.id).count() > 0

    def __str__(self):
        return self.user_name


class Kwik(models.Model):
    user = models.ForeignKey(NewUser, blank=True, null=True, on_delete=models.CASCADE)
    content = models.CharField(max_length=300)
    kwik_date = models.DateTimeField(auto_now=True)
    like = models.ManyToManyField(NewUser, blank=True, related_name='likes')

    def countLikes(self):
        return self.like.count()

    def isLiked(self, loginuserid):
        return Kwik.objects.filter(id=self.id).filter(like=loginuserid).count() > 0

    def __str__(self):
        return self.content


class CommentKwik(models.Model):
    kwik = models.ForeignKey(Kwik, on_delete=models.CASCADE, related_name='comment')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.CharField(max_length=300)
    comment_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.comment)


class UserFollowing(models.Model):
    user_id = models.ForeignKey(NewUser, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(NewUser, related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'following_user_id'], name="unique_followers")
        ]

        ordering = ["-created"]

    def __str__(self):
        return f"ID {self.id} {self.user_id} follows {self.following_user_id}"
