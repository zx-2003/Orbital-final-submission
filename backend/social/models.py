from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    image = models.ImageField(upload_to="post_images/", blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True) # display if present
    place_id = models.CharField(max_length=255, blank=True, null=True) # dont display, backend purpose only
    rating = models.IntegerField(blank=True, null=True) # limit this from 1 to 5, display if present

    def __str__(self):
        return self.title
    
    @property
    def is_review(self): #only a review if location and rating is filled
        return self.location is not None and self.rating is not None

# new Like model that will be associated with each post and user
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    # by setting it up this way, each Post object can have multiple Like objects associated with it. 
    # later on we need to filter by likes so we use the related name "likes" 
    # use Count. to count the number of likes

    created_at = models.DateTimeField(auto_now_add=True)

    # this will prevent the same user from liking the same post in the database. Could cause conflicting ID.
    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.username} liked {self.post.title}"
    
# new Saved post model that will be associated with each post and user
class SavedPosts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_by_user")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="saved_post")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.username} saved {self.post.title}"