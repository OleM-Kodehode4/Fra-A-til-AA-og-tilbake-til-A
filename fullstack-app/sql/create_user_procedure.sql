CREATE PROCEDURE RegisterUser
    @Email NVARCHAR(255),
    @Password NVARCHAR(255),
    @Salt NVARCHAR(255),
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @ErrorCode INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Sjekk om brukeren allerede finnes
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        SET @ErrorCode = 1; -- Bruker finnes allerede
        RETURN;
    END

    -- Hash passordet med SHA2_512
    DECLARE @HashedPassword NVARCHAR(255);
    SET @HashedPassword = HASHBYTES('SHA2_512', @Password + @Salt);

    -- Sett inn ny bruker
    INSERT INTO Users (Email, PasswordHash, Salt, FirstName, LastName, CreatedAt)
    VALUES (@Email, @HashedPassword, @Salt, @FirstName, @LastName, GETDATE());

    -- Logg hendelsen
    INSERT INTO Logs (EventType, EventDescription, CreatedAt)
    VALUES ('UserCreated', CONCAT('User registered: ', @Email), GETDATE());

    SET @ErrorCode = 0; -- Suksess
END;
