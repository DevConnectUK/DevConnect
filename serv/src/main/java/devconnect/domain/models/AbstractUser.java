package devconnect.domain.models;

public interface AbstractUser {
    boolean isValid();

    String getFirstName();

    String getLastName();

    String getPassword();

    String getEmail();

    String toString();
}