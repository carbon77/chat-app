ALTER TABLE friendships DROP CONSTRAINT friendships_pkey;
ALTER TABLE friendships ADD CONSTRAINT friendships_pkey PRIMARY KEY (user_id, friend_id);