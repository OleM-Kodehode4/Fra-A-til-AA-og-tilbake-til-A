CREATE TRIGGER LogUpdate
ON Users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Logs (EventType, EventDescription, CreatedAt)
    SELECT 
        'Update',
        CONCAT('User updated: ', i.Email, '. Changes: ', 
               CASE 
                   WHEN i.FirstName <> d.FirstName THEN CONCAT('FirstName: ', d.FirstName, ' -> ', i.FirstName, '; ')
                   ELSE '' 
               END,
               CASE 
                   WHEN i.LastName <> d.LastName THEN CONCAT('LastName: ', d.LastName, ' -> ', i.LastName, '; ')
                   ELSE '' 
               END),
        GETDATE()
    FROM Inserted i
    INNER JOIN Deleted d ON i.UserId = d.UserId;
END;
