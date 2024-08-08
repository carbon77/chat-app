CREATE TABLE IF NOT EXISTS friendships (
    friend1_id UUID NOT NULL,
    friend2_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(friend1_id, friend2_id)
);