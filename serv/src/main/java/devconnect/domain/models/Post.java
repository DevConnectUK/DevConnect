package devconnect.domain.models;

public class Post extends PostComponent {
    private static int count = 0;

    public Post(User author, String content) {
        super(author, content, null);
        this.id = ++count;
    }

    @Override
    public void delete() {
        author.delete(this);
    }

}
