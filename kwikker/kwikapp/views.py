from kwikapp.models import Kwik, CommentKwik, NewUser, UserFollowing, LikeKwik
from rest_framework import generics, status, filters
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticatedOrReadOnly, IsAuthenticated, \
    AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CreateKwikSerializer, KwikSerializer, CustomUserSerializer, DetailKwikSerializer, CommentSerializer, \
    UserDetailSerializer, FollowingSerializer, LikeKwikSerializer, AllUsersSerializer


class KwikUserWritePermission(BasePermission):
    message = 'Editing kwiks is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user


class KwikListAll(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = KwikSerializer

    def get_queryset(self):
        user = self.request.user
        # return Kwik.objects.filter(user__followers__in=UserFollowing.objects.filter(user_id=user)).order_by('-kwik_date')
        return Kwik.objects.all().order_by('-kwik_date')


class UnLikeThisKwik(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LikeKwik.objects.all()
    serializer_class = LikeKwikSerializer

    def delete(self, request, pk):
        like_to_delete = LikeKwik.objects.filter(kwik_id=pk).filter(user_id=request.user.id)
        like_to_delete.delete()
        return Response({"status": "ok"}, status=status.HTTP_200_OK)


class LatestUsers(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AllUsersSerializer
    queryset = NewUser.objects.all().order_by('-start_date')[:5]



class LikeThisKwik(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = LikeKwik.objects.all()
    serializer_class = LikeKwikSerializer


class AddComment(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CommentKwik.objects.all()
    serializer_class = CommentSerializer


class DeleteComment(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CommentKwik.objects.all()
    serializer_class = CommentSerializer

    def delete(self, request, pk):
        comment_to_delete = CommentKwik.objects.filter(id=pk).filter(user_id=request.user.id)
        comment_to_delete.delete()
        return Response({"status": "ok"}, status=status.HTTP_200_OK)


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserDetailSerializer
    queryset = NewUser.objects.all()


class KwikDetail(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Kwik.objects.all()
    serializer_class = DetailKwikSerializer


class KwikDetailFilter(generics.ListAPIView):
    queryset = Kwik.objects.all()
    serializer_class = KwikSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^content']


class CreateKwik(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Kwik.objects.all()
    serializer_class = CreateKwikSerializer


class DeleteKwik(generics.RetrieveDestroyAPIView):
    permission_classes = [KwikUserWritePermission]
    queryset = Kwik.objects.all()
    serializer_class = KwikSerializer


class FollowProfile(generics.CreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = UserFollowing.objects.all()
    serializer_class = FollowingSerializer


class UnFollowProfile(generics.DestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = UserFollowing.objects.all()
    serializer_class = FollowingSerializer

    def delete(self, request, pk):
        follow_to_delete = UserFollowing.objects.filter(following_user_id=pk).filter(user_id_id=request.user.id)
        follow_to_delete.delete()
        return Response({"status": "ok"}, status=status.HTTP_200_OK)


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.user_name
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
