-- set up database

CREATE TABLE list (
	"id" SERIAL PRIMARY KEY,
    "complete" BOOLEAN NOT NULL,
    "urgent" BOOLEAN NOT NULL,
    "important" BOOLEAN NOT NULL,
    "task" VARCHAR(250) NOT NULL);
    
INSERT INTO list (complete, urgent, important, task)
	VALUES
		(true, false, true, 'Take dog for a walk'),
		(false, false, false, 'Buy hot sauce'),
		(true, true, true, 'Schedule dental appointment '),
		(false, true, false, 'Plan summer vacation');