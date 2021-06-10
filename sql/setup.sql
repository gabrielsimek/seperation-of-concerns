DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quantity_of_items INTEGER CHECK (quantity_of_items > 0)
);
