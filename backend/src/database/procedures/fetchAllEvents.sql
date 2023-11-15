CREATE OR ALTER PROCEDURE fetchAllEvents
AS
BEGIN
    SELECT 
        e.*,
        c.category_name
    FROM 
        events e
    INNER JOIN 
        categories c ON e.category_id = c.category_id;
END;
