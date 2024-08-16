ALTER TABLE chats ADD COLUMN last_message_id UUID;
ALTER TABLE chats ADD FOREIGN KEY (last_message_id) REFERENCES messages(message_id);