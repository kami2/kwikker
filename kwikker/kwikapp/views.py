from rest_framework import generics, status, viewsets, filters
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from kwikapp.models import Kwik, CommentKwik
from .serializers import KwikSerializer, CustomUserSerializer, DetailKwikSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions, IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny


class KwikUserWritePermission(BasePermission):
    message = 'Editing kwiks is restricted to the author only.'


    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user



class KwikListAll(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = KwikSerializer
    queryset = Kwik.objects.all().order_by('-kwik_date')



class KwikList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = KwikSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        return Kwik.objects.filter(user=user)



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
    serializer_class = KwikSerializer



class DeleteKwik(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Kwik.objects.all()
    serializer_class = KwikSerializer



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



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



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

