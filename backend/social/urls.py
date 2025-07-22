from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("explore_posts/", views.PostListCreateExplore.as_view(), name = "post-list-explore"),

    # new path for to see the posts of the users we are following
    # new addition includes the ability to filter like the explore posts as well
    path("following_posts/", views.FollowingListExplore.as_view(), name = "following-list-explore"),
    
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="delete-post"),
    path("userPublicPosts/<int:user_id>/", views.PublicPostListCreate.as_view(), name="public-posts"),

    # new path for liking post to send data to our backend
    path("posts/<int:post_id>/like/", views.ToggleLike.as_view(), name="toggle-like"),

    # new path for saving post to send data to the backend
    path("posts/<int:post_id>/save/", views.ToggleSavePost.as_view(), name="toggle-save"),
    path("saved_posts/", views.PostListSaved.as_view(), name="post-saved"),
]