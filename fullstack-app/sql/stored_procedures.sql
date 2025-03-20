-- Stored Procedure for User Registration
CREATE PROCEDURE sp_RegisterUser
    @Username NVARCHAR(50),
    @Password NVARCHAR(255),
    @Email NVARCHAR(100)
AS
BEGIN
    INSERT INTO Users (Username, Password, Email)
    VALUES (@Username, @Password);
END
GO

-- Stored Procedure for User Login
CREATE PROCEDURE sp_LoginUser
    @Username NVARCHAR(50),
    @Password NVARCHAR(255)
AS
BEGIN
    SELECT * FROM Users
    WHERE Username = @Username AND Password = @Password;
END
GO

-- Stored Procedure for Editing User Profile
CREATE PROCEDURE sp_EditUserProfile
    @UserId INT,
    @Username NVARCHAR(50),
    @Email NVARCHAR(100)
AS
BEGIN
    UPDATE Users
    SET Username = @Username, Email = @Email
    WHERE Id = @UserId;
END
GO

-- Stored Procedure for Retrieving User Profile
CREATE PROCEDURE sp_GetUserProfile
    @UserId INT
AS
BEGIN
    SELECT * FROM Users
    WHERE Id = @UserId;
END
GO