CREATE TABLE IF NOT EXISTS chats (
    chat_id UUID PRIMARY KEY,
    chat_name VARCHAR(255),
    is_group BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS user_chats (
    chat_id UUID REFERENCES chats(chat_id),
    user_id UUID,
    PRIMARY KEY(chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    message_id UUID PRIMARY KEY,
    chat_id UUID REFERENCES chats(chat_id),
    sender_id UUID,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT current_timestamp,
    is_read BOOLEAN DEFAULT FALSE
);