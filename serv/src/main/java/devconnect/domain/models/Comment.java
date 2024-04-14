package devconnect.domain.models;

public class Comment extends PostComponent {
    private static int count = 0;

    public Comment(User author, String content, PostComponent parentComponent) {
        super(author, content, parentComponent);
        this.id = ++count;
    }

    @Override
    public void delete() {
        author.delete(this);
    }

}
