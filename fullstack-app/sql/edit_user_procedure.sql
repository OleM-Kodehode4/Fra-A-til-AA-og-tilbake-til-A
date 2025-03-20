CREATE PROCEDURE EditUser
    @Token NVARCHAR(255),
    @FirstName NVARCHAR(100) = NULL,
    @LastName NVARCHAR(100) = NULL,
    @ErrorCode INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Sjekk om token er gyldig
    DECLARE @UserId INT;
    SELECT @UserId = UserId
    FROM Tokens
    WHERE Token = @Token AND ExpiryDate > GETDATE();

    IF @UserId IS NULL
    BEGIN
        SET @ErrorCode = 1; -- Ugyldig token
        RETURN;
    END

    -- Oppdater brukerdata
    UPDATE Users
    SET 
        FirstName = ISNULL(@FirstName, FirstName),
        LastName = ISNULL(@LastName, LastName),
        UpdatedAt = GETDATE()
    WHERE UserId = @UserId;

    -- Forny tokenets utløpstid
    UPDATE Tokens
    SET ExpiryDate = DATEADD(HOUR, 1, GETDATE())
    WHERE Token = @Token;

    -- Logg endringen
    INSERT INTO Logs (EventType, EventDescription, CreatedAt)
    VALUES ('UserUpdated', CONCAT('User updated: ', @UserId), GETDATE());

    SET @ErrorCode = 0; -- Suksess
END;
