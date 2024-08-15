ALTER TABLE IF EXISTS user_chats RENAME TO chat_memberships;

ALTER TABLE IF EXISTS chat_memberships
ADD COLUMN user_full_name varchar(255),
ADD COLUMN chat_role varchar(255),
ADD COLUMN last_visited timestamp,
ADD COLUMN is_active boolean,
ADD COLUMN joined_at timestamp NOT NULL DEFAULT current_timestamp,
ADD COLUMN left_at timestamp;