
CREATE OR ALTER PROCEDURE createCategory(
    @category_id VARCHAR(100),
    @category_name  VARCHAR(200)
)
AS
BEGIN
  
    INSERT INTO categories(category_id, category_name)
    VALUES(@category_id, @category_name)
END