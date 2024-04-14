package devconnect.domain.models;

import java.time.LocalDateTime;

public abstract class Base {
    protected int id;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Base() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}
