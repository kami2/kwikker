from django.urls import path
from .views import UserDetail, UnLikeThisKwik, LikeThisKwik, UnFollowProfile, FollowProfile, AddComment, KwikList, KwikDetail, CustomUserCreate, BlacklistTokenUpdateView, KwikDetailFilter, KwikListAll, DeleteKwik,  CreateKwik

app_name='kwikapp'


urlpatterns = [
    path('user/', KwikList.as_view(), name='kwik'),

    path('profile/<int:pk>/', UserDetail.as_view(), name='profile'),
    path('profile/<int:pk>/follow', FollowProfile.as_view(), name='profile_follow'),
    path('profile/<int:pk>/unfollow', UnFollowProfile.as_view(), name='profile_unfollow'),

    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('search/', KwikDetailFilter.as_view(), name='kwik_search'),

    path('', KwikListAll.as_view(), name='kwik_all'),
    path('kwik/<int:pk>/', KwikDetail.as_view(), name='detail_kwik'),
    path('kwik/create/', CreateKwik.as_view(), name='kwik_create'),
    path('kwik/<int:pk>/like/', LikeThisKwik.as_view(), name="kwik_like"),
    path('kwik/<int:pk>/unlike/', UnLikeThisKwik.as_view(), name="kwik_like"),
    path('kwik/create/comment/', AddComment.as_view(), name='kwik_create'),
    path('kwik/delete/<int:pk>/', DeleteKwik.as_view(), name='kwik_delete'),

]
