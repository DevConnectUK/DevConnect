package devconnect.domain.models;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;

import org.junit.Test;
import org.junit.Before;

public class UserTest {

    User user;

    @Before
    public void setUp() {
        user = new User("John", "Doe", "jon.doe@email.com", "Password1-");
    }

    private void sleepForOneSecond() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testFirstNameIsValid() {
        assertTrue(user.isValid());
    }

    @Test
    public void testNullFirstNameIsInvalid() {
        user.setFirstName(null);
        assertFalse(user.isValid());
    }

    @Test
    public void testEmptyFirstNameIsInvalid() {
        user.setFirstName("");
        assertFalse(user.isValid());
    }

    @Test
    public void testShortFirstNameIsInvalid() {
        user.setFirstName("a");
        assertFalse(user.isValid());
    }

    @Test
    public void testLongFirstNameIsInvalid() {
        user.setFirstName("a".repeat(101));
        assertFalse(user.isValid());
    }

    @Test
    public void testFirstNameWithNumbersIsInvalid() {
        user.setFirstName("John1");
        assertFalse(user.isValid());
    }

    @Test
    public void testFirstNameWithSpecialCharactersIsInvalid() {
        user.setFirstName("John@");
        assertFalse(user.isValid());
    }

    @Test
    public void testLastNameIsValid() {
        assertTrue(user.isValid());
    }

    @Test
    public void testNullLastNameIsInvalid() {
        user.setLastName(null);
        assertFalse(user.isValid());
    }

    @Test
    public void testEmptyLastNameIsInvalid() {
        user.setLastName("");
        assertFalse(user.isValid());
    }

    @Test
    public void testShortLastNameIsInvalid() {
        user.setLastName("a");
        assertFalse(user.isValid());
    }

    @Test
    public void testLongLastNameIsInvalid() {
        user.setLastName("a".repeat(101));
        assertFalse(user.isValid());
    }

    @Test
    public void testLastNameWithNumbersIsInvalid() {
        user.setLastName("Doe1");
        assertFalse(user.isValid());
    }

    @Test
    public void testLastNameWithSpecialCharactersIsInvalid() {
        user.setLastName("Doe@");
        assertFalse(user.isValid());
    }

    @Test
    public void testEmailIsValid() {
        assertTrue(user.isValid());
    }

    @Test
    public void testNullEmailIsInvalid() {
        user.setEmail(null);
        assertFalse(user.isValid());
    }

    @Test
    public void testEmptyEmailIsInvalid() {
        user.setEmail("");
        assertFalse(user.isValid());
    }

    @Test
    public void testEmailWithoutAtSymbolIsInvalid() {
        user.setEmail("johndoeemail.com");
        assertFalse(user.isValid());
    }

    @Test
    public void testEmailWithoutDotComIsInvalid() {
        user.setEmail("johndoe@email");
        assertFalse(user.isValid());
    }

    @Test
    public void testEmailWithSpecialCharactersIsInvalid() {
        user.setEmail("john.doe@");
        assertFalse(user.isValid());
    }

    @Test
    public void testPasswordIsValid() {
        assertTrue(user.isValid());
    }

    @Test
    public void testPasswordIsInvalid() {
        user.setPassword("password");
        assertFalse(user.isValid());
    }

    @Test
    public void testNullPasswordIsInvalid() {
        user.setPassword(null);
        assertFalse(user.isValid());
    }

    @Test
    public void testEmptyPasswordIsInvalid() {
        user.setPassword("");
        assertFalse(user.isValid());
    }

    @Test
    public void testShortPasswordIsInvalid() {
        user.setPassword("Pass1-");
        assertFalse(user.isValid());
    }

    @Test
    public void testIdIncreasesAfterMultipleCreation() {
        User user2 = new User("John", "Doe", "jon.doe@email.com", "Password1-");
        assertTrue(user2.getId() > user.getId());
    }

    @Test
    public void testIdOfNewUserIsOneGreaterThanPreviousUser() {
        User user2 = new User("John", "Doe", "jon.doe@email.com", "Password1-");
        assertTrue(user2.getId() == user.getId() + 1);
    }

    @Test
    public void testUpdatedAtIsUpdatedAfterFirstNameChange() {
        LocalDateTime oldUpdatedAt = user.getUpdatedAt();
        sleepForOneSecond();
        user.setFirstName("Jane");
        LocalDateTime newUpdatedAt = user.getUpdatedAt();
        assertNotEquals(oldUpdatedAt, newUpdatedAt);
    }

    @Test
    public void testUpdatedAtIsUpdatedAfterLastNameChange() {
        LocalDateTime oldUpdatedAt = user.getUpdatedAt();
        sleepForOneSecond();
        user.setLastName("Doe");
        LocalDateTime newUpdatedAt = user.getUpdatedAt();
        assertNotEquals(oldUpdatedAt, newUpdatedAt);
    }

    @Test
    public void testUpdatedAtIsUpdatedAfterEmailChange() {
        LocalDateTime oldUpdatedAt = user.getUpdatedAt();
        sleepForOneSecond();
        user.setEmail("");
        LocalDateTime newUpdatedAt = user.getUpdatedAt();
        assertNotEquals(oldUpdatedAt, newUpdatedAt);
    }

    @Test
    public void testUpdatedAtIsUpdatedAfterPasswordChange() {
        LocalDateTime oldUpdatedAt = user.getUpdatedAt();
        sleepForOneSecond();
        user.setPassword("Password1-");
        LocalDateTime newUpdatedAt = user.getUpdatedAt();
        assertNotEquals(oldUpdatedAt, newUpdatedAt);
    }

    @Test
    public void testCreatedAtIsNotUpdatedAfterFirstNameChange() {
        LocalDateTime oldCreatedAt = user.getCreatedAt();
        sleepForOneSecond();
        user.setFirstName("Jane");
        LocalDateTime newCreatedAt = user.getCreatedAt();
        assertEquals(oldCreatedAt, newCreatedAt);
    }

    @Test
    public void testCreatedAtIsNotUpdatedAfterLastNameChange() {
        LocalDateTime oldCreatedAt = user.getCreatedAt();
        sleepForOneSecond();
        user.setLastName("Doe");
        LocalDateTime newCreatedAt = user.getCreatedAt();
        assertEquals(oldCreatedAt, newCreatedAt);
    }

    @Test
    public void testCreatedAtIsNotUpdatedAfterEmailChange() {
        LocalDateTime oldCreatedAt = user.getCreatedAt();
        sleepForOneSecond();
        user.setEmail("");
        LocalDateTime newCreatedAt = user.getCreatedAt();
        assertEquals(oldCreatedAt, newCreatedAt);
    }

    @Test
    public void testCreatedAtIsNotUpdatedAfterPasswordChange() {
        LocalDateTime oldCreatedAt = user.getCreatedAt();
        sleepForOneSecond();
        user.setPassword("Password1-");
        LocalDateTime newCreatedAt = user.getCreatedAt();
        assertEquals(oldCreatedAt, newCreatedAt);
    }

    @Test
    public void testpostsIsEmptyAfterCreation() {
        assertTrue(user.getPosts().isEmpty());
    }

    @Test
    public void testpostsIsNotEmptyAfterAddingPost() {
        user.createPost("Content");
        assertFalse(user.getPosts().isEmpty());
    }

    @Test
    public void testpostsIsEmptyAfterDeletingPost() {
        Post post = user.createPost("Content");
        user.delete(post);
        assertTrue(user.getPosts().isEmpty());
    }

    @Test
    public void testpostsIsEmptyAfterDeletingAllPosts() {
        user.createPost("Content");
        user.createPost("Content");
        user.deleteAllPosts();
        assertTrue(user.getPosts().isEmpty());
    }

    @Test
    public void testLikePost() {
        Post post = user.createPost("Content");
        user.likePost(post);
        assertTrue(post.isLikedBy(user));
    }

    @Test
    public void testUnlikePost() {
        Post post = user.createPost("Content");
        user.likePost(post);
        user.unlikePost(post);
        assertFalse(post.isLikedBy(user));
    }

    @Test
    public void testDeletePost() {
        Post post = user.createPost("Content");
        user.delete(post);
        assertTrue(user.getPosts().isEmpty());
    }

    @Test
    public void testCommentsIsEmptyAfterCreation() {
        assertTrue(user.getComments().isEmpty());
    }

    @Test
    public void testCommentsIsNotEmptyAfterAddingComment() {
        Post post = user.createPost("Content");
        user.createComment(post, "Content");
        assertFalse(user.getComments().isEmpty());
    }

    @Test
    public void testCommentsIsEmptyAfterDeletingComment() {
        Post post = user.createPost("Content");
        Comment comment = user.createComment(post, "Content");
        user.delete(comment);
        assertTrue(user.getComments().isEmpty());
    }

    @Test
    public void testCommentsIsEmptyAfterDeletingAllComments() {
        Post post = user.createPost("Content");
        user.createComment(post, "Content");
        user.createComment(post, "Content");
        user.deleteAllComments();
        assertTrue(user.getComments().isEmpty());
        assertTrue(post.getReplies().isEmpty());
    }

    @Test
    public void testCreateComment() {
        Post post = user.createPost("Content");
        Comment comment = user.createComment(post, "Content");
        assertEquals(user, comment.getAuthor());
    }

    @Test
    public void testCreateReply() {
        Post post = user.createPost("Content");
        Comment comment = user.createComment(post, "Content");
        Comment reply = user.createComment(comment, "Content");
        assertEquals(user, reply.getAuthor());
    }

    @Test
    public void testDeleteComment() {
        Post post = user.createPost("Content");
        Comment comment = user.createComment(post, "Content");
        user.delete(comment);
        assertTrue(user.getComments().isEmpty());
        assertTrue(post.getReplies().isEmpty());
    }

    @Test
    public void testDeleteReply() {
        Post post = user.createPost("Content");
        Comment comment = user.createComment(post, "Content");
        Comment reply = user.createComment(comment, "Content");
        user.delete(reply);
        assertTrue(comment.getReplies().isEmpty());
    }

    @Test
    public void testDeleteReplies() {
        Post post = user.createPost("Content");
        Comment comment = user.createComment(post, "Content");
        Comment reply = user.createComment(comment, "Content");
        user.createComment(reply, "Content");
        user.deleteAllComments();
        assertTrue(user.getComments().isEmpty());
        assertTrue(post.getReplies().isEmpty());
        assertTrue(comment.getReplies().isEmpty());
        assertTrue(reply.getReplies().isEmpty());
    }

}