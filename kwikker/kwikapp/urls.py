from django.urls import path
from .views import UserDetail, UnLikeThisKwik, LikeThisKwik, UnFollowProfile,\
    FollowProfile, AddComment, KwikDetail, CustomUserCreate, BlacklistTokenUpdateView,\
    KwikDetailFilter, KwikListAll, DeleteKwik,  CreateKwik, DeleteComment, LatestUsers, ProfilesToFollowList, EditProfile, OnlyThisProfileKwiks,\
    FollowingList, FollowersList


app_name='kwikapp'


urlpatterns = [
    path('profile/<int:pk>/', UserDetail.as_view(), name='profile'),
    path('profile/<int:pk>/follow', FollowProfile.as_view(), name='profile_follow'),
    path('profile/<int:pk>/unfollow', UnFollowProfile.as_view(), name='profile_unfollow'),
    path('profile/edit/<int:pk>', EditProfile.as_view(), name='profile_edit'),
    path('profile/<int:pk>/kwiks', OnlyThisProfileKwiks.as_view(), name='profile_kwiks'),
    path('profile/<int:pk>/following', FollowingList.as_view(), name='profile_following'),
    path('profile/<int:pk>/followers', FollowersList.as_view(), name='profile_followers'),

    path('users/latest', LatestUsers.as_view(), name='latest_users'),
    path('users/tofollow', ProfilesToFollowList.as_view(), name='users_to_follow'),

    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('search/', KwikDetailFilter.as_view(), name='kwik_search'),

    path('', KwikListAll.as_view(), name='kwik_all'),
    path('kwik/<int:pk>/', KwikDetail.as_view(), name='detail_kwik'),

    path('kwik/<int:pk>/like/', LikeThisKwik.as_view(), name="kwik_like"),
    path('kwik/<int:pk>/unlike/', UnLikeThisKwik.as_view(), name="kwik_like"),

    path('kwik/delete/comment/<int:pk>/', DeleteComment.as_view(), name='kwik_delete_comment'),
    path('kwik/create/comment/', AddComment.as_view(), name='kwik_create_comment'),

    path('kwik/create/', CreateKwik.as_view(), name='kwik_create'),
    path('kwik/delete/<int:pk>/', DeleteKwik.as_view(), name='kwik_delete'),

]
