DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    entry_date INT NOT NULL,
    entry_body VARCHAR NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO entries (title, entry_date, entry_body)
VALUES 
    ('My secret crush hehe', 05112026, 'Theo is so hot I just cant even'),
    ('He rejected me ;(', 06112026, 'My love theo already has a girlfriend, why does the good girl always come last');
