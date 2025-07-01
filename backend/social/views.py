from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, filters
from .serializers import UserSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Like
from django.db.models import Count

# generics.blah blah handles 2 kinds of http requests being Post and get
# permission classes determine who can view the info
# queryset determines what the user will see / what info is available to user or what we can work with
# perform create sets the author to whoever wrote the post
# serializer_class = blah blah tells the serializer to handle all the input and output data for this view
# e.g: DRF will use UserSerializer to validate and parse the JSON sent by the client (e.g. during registration).
# e.g: Output (response): DRF will use UserSerializer to convert Python model instances 
# (e.g. a User object) into JSON that the frontend can understand.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# edited for filtering on site
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'like_count']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user) \
            .annotate(like_count=Count('likes'))
    
    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        print("FILES:", self.request.FILES)
        serializer.is_valid(raise_exception=True)
        print("Got image:", self.request.FILES.get("image"))
        print("VALIDATED DATA:", serializer.validated_data)
        post = serializer.save(author=self.request.user)
        print("SAVED POST", post.image)

class PublicPostListCreate(APIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self, request, user_id):
        target_user_posts = Post.objects.filter(author=user_id)
        return target_user_posts

class PostListCreateExplore(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    # new fields to enable filtering of the posts
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'like_count']
    ordering = ['-created_at']

    def get_queryset(self):
        return Post.objects.exclude(author=self.request.user) \
            .annotate(like_count=Count('likes'))
    
    def get_serializer_context(self):
        return {'request': self.request}
    
# now for the people that you are following, to see their posts.
class FollowingListExplore(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    # new fields to enable filtering of the posts
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'like_count']
    ordering = ['-created_at']

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        user = self.request.user
        followed_profiles = user.following.all()
        followed_users = [profile.user for profile in followed_profiles]
        # this will help to return us the posts for users for which our author is following them
        # just in case exclude the author's post, although there is no way the author should be able to follow themselves
        return Post.objects.filter(author__in=followed_users).exclude(author=self.request.user) \
            .annotate(like_count=Count('likes'))


class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
    

# our new API end point to save whether the user has liked something or not
class ToggleLike(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = Post.objects.get(id=post_id)
        user = request.user

        # this is basically saying find an existing like object with these parameters if not create a new like
        # obj that is associated with that post
        like, created = Like.objects.get_or_create(user=user, post=post)

        if not created:
            like.delete()
            return Response({'liked': False, 'like_count': post.likes.count()})
        else:
            return Response({'liked': True, 'like_count': post.likes.count()})
    
