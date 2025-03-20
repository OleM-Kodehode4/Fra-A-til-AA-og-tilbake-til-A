CREATE TRIGGER LogInsert
ON Users
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Logs (EventType, EventDescription, CreatedAt)
    SELECT 
        'Insert',
        CONCAT('New user inserted: ', Email),
        GETDATE()
    FROM Inserted;
END;
