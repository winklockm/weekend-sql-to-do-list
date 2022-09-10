-- set up database

CREATE TABLE list (
	"id" SERIAL PRIMARY KEY,
    "complete" BOOLEAN NOT NULL,
    "task" VARCHAR(250) NOT NULL);
    
INSERT INTO list (complete, task)
	VALUES
		(true, 'Take dog for a walk'),
		(false, 'Buy hot sauce'),
		(true, 'Schedule dental appointment '),
		(false, 'Plan summer vacation');