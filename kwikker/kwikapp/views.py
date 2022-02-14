from rest_framework import generics, status, viewsets, filters
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from kwikapp.models import Kwik
from .serializers import KwikSerializer, CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions, IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny



class KwikUserWritePermission(BasePermission):
    message = 'Editing kwiks is restricted to the author only.'


    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user



class KwikList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Kwik.objects.all()
    serializer_class = KwikSerializer



class KwikDetail(generics.RetrieveUpdateDestroyAPIView, KwikUserWritePermission):
    permission_classes = [KwikUserWritePermission]
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