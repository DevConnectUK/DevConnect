package devconnect.domain.models;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class User extends Base implements AbstractUser {

    private static int count = 0;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private ArrayList<Post> posts = new ArrayList<>();
    private ArrayList<Comment> comments = new ArrayList<>();

    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_-])(?=\\S+$).{8,}$";
    private static final String NAME_REGEX = "^[a-zA-Z]*$";
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

    public User(String firstName, String lastName, String email, String password) {
        super();
        this.id = ++count;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User [email=" + email + ", firstName=" + firstName + ", id=" + id + ", lastName=" + lastName + "]";
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
        setUpdatedAt(LocalDateTime.now());
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        setUpdatedAt(LocalDateTime.now());
    }

    @Override
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
        setUpdatedAt(LocalDateTime.now());
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
        setUpdatedAt(LocalDateTime.now());
    }

    @Override
    public boolean isValid() {
        return firstNameIsValid() && lastNameIsValid() && emailIsValid() && passwordIsValid();
    }

    private boolean passwordIsValid() {
        return password != null && password.matches(PASSWORD_REGEX);
    }

    private boolean firstNameIsValid() {
        return validateString(firstName, NAME_REGEX, 2, 100);
    }

    private boolean lastNameIsValid() {
        return validateString(lastName, NAME_REGEX, 2, 100);
    }

    private boolean validateString(String name, String REGEX, int minLength, int maxLength) {
        return name != null && !name.isEmpty() && name.matches(
                REGEX) && name.length() <= maxLength
                && name.length() >= minLength;
    }

    private boolean emailIsValid() {
        return validateString(email, EMAIL_REGEX, 5, 150);
    }

    public ArrayList<Post> getPosts() {
        return posts;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void likePost(Post post) {
        post.addLike(this);
    }

    public void unlikePost(Post post) {
        post.removeLike(this);
    }

    public Post createPost(String content) {
        Post post = new Post(this, content);
        posts.add(post);
        return post;
    }

    public Comment createComment(Post post, String content) {
        Comment comment = new Comment(this, content, post);
        post.addReply(comment);
        comments.add(comment);
        return comment;
    }

    public Comment createComment(Comment comment, String content) {
        Comment reply = new Comment(this, content, comment);
        comment.addReply(reply);
        comments.add(reply);
        return reply;
    }

    public void delete(Post post) {
        posts.remove(post);
    }

    public void delete(Comment comment) {
        comment.getParentComponent().deleteReply(comment);
        comments.remove(comment);
    }

    public void deleteAllPosts() {
        posts.clear();
    }

    public void deleteAllComments() {
        for (Comment comment : comments) {
            comment.getParentComponent().deleteReply(comment);
        }
        comments.clear();
    }

}
