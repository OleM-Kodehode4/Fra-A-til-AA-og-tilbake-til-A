CREATE TRIGGER trg_LogUserInsert
ON Users
AFTER INSERT
AS
BEGIN
    INSERT INTO UserLogs (UserId, Action, ActionDate)
    SELECT inserted.Id, 'Inserted', GETDATE()
    FROM inserted;
END;

CREATE TRIGGER trg_LogUserUpdate
ON Users
AFTER UPDATE
AS
BEGIN
    INSERT INTO UserLogs (UserId, Action, ActionDate)
    SELECT inserted.Id, 'Updated', GETDATE()
    FROM inserted;
END;