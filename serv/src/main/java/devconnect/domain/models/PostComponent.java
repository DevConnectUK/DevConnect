package devconnect.domain.models;

import java.time.LocalDateTime;
import java.util.ArrayList;

public abstract class PostComponent extends Base {

    protected int id;

    protected User author;
    protected String content;
    protected PostComponent parentComponent;

    protected ArrayList<Comment> replies = new ArrayList<>();
    protected ArrayList<User> likes = new ArrayList<>();

    public PostComponent(User author, String content, PostComponent parentComponent) {
        super();
        this.author = author;
        this.content = content;
        this.parentComponent = parentComponent;
    }

    public int getId() {
        return id;
    }

    public User getAuthor() {
        return author;
    }

    public String getContent() {
        return content;
    }

    public PostComponent getParentComponent() {
        return parentComponent;
    }

    public ArrayList<Comment> getReplies() {
        return replies;
    }

    public ArrayList<User> getLikes() {
        return likes;
    }

    public void addReply(Comment comment) {
        replies.add(comment);
    }

    public void addLike(User user) {
        likes.add(user);
    }

    public void setContent(String content) {
        this.content = content;
        setUpdatedAt(LocalDateTime.now());
    }

    public void deleteReply(Comment comment) {
        replies.remove(comment);
    }

    public void removeLike(User user) {
        likes.remove(user);
    }

    public boolean isLikedBy(User user) {
        return likes.contains(user);
    }

    public boolean isAuthoredBy(User user) {
        return author.equals(user);
    }

    public void deleteReplies() {
        for (Comment comment : replies) {
            comment.deleteReplies();
        }
        replies.clear();
    }

    public abstract void delete();

}
