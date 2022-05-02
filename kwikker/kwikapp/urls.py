from django.urls import path, include
from .views import UserDetail, AddComment, KwikList, KwikDetail, CustomUserCreate, BlacklistTokenUpdateView, KwikDetailFilter, KwikListAll, DeleteKwik,  CreateKwik

app_name='kwikapp'


urlpatterns = [
    path('kwik/<int:pk>/', KwikDetail.as_view(), name='detail_kwik'),
    path('user/', KwikList.as_view(), name='kwik'),
    path('profile/<int:pk>/', UserDetail.as_view(), name='profile'),

    path('', KwikListAll.as_view(), name='kwik_all'),
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('search/', KwikDetailFilter.as_view(), name='kwik_search'),
    path('kwik/create/', CreateKwik.as_view(), name='kwik_create'),
    path('kwik/create/comment/', AddComment.as_view(), name='kwik_create'),
    path('kwik/delete/<int:pk>/', DeleteKwik.as_view(), name='kwik_delete'),
]
