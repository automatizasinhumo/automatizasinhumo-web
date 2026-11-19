-- 0047: el índice FTS solo guarda la parte de la descripción que describe la ficha.
-- Lo que va desde «## No incluye» (lo que NO incluye, el ejemplo, los campos, el plazo
-- y la plantilla común) no se indexa: hacía que «tienda online» o «que me pidan cita»
-- casaran con fichas que dicen lo contrario o lo citan en un ejemplo.
-- Mismo corte que textoBuscable() en src/features/search/textoBuscable.ts.
--
-- products_fts es de contenido externo: el 'delete' de los triggers debe recibir
-- exactamente lo que se indexó, así que usa la misma expresión. No ejecutar
-- 'rebuild' (volvería a leer la descripción entera de products).

DROP TRIGGER IF EXISTS products_fts_ai;
DROP TRIGGER IF EXISTS products_fts_ad;
DROP TRIGGER IF EXISTS products_fts_au;

INSERT INTO products_fts(products_fts) VALUES ('delete-all');

INSERT INTO products_fts(rowid, name, description)
  SELECT id, name,
    CASE WHEN instr(description, char(10) || '## No incluye') > 0
      THEN substr(description, 1, instr(description, char(10) || '## No incluye') - 1)
      ELSE description END
  FROM products;

CREATE TRIGGER products_fts_ai AFTER INSERT ON products BEGIN
  INSERT INTO products_fts(rowid, name, description)
    VALUES (new.id, new.name,
      CASE WHEN instr(new.description, char(10) || '## No incluye') > 0
        THEN substr(new.description, 1, instr(new.description, char(10) || '## No incluye') - 1)
        ELSE new.description END);
END;

CREATE TRIGGER products_fts_ad AFTER DELETE ON products BEGIN
  INSERT INTO products_fts(products_fts, rowid, name, description)
    VALUES ('delete', old.id, old.name,
      CASE WHEN instr(old.description, char(10) || '## No incluye') > 0
        THEN substr(old.description, 1, instr(old.description, char(10) || '## No incluye') - 1)
        ELSE old.description END);
END;

CREATE TRIGGER products_fts_au AFTER UPDATE ON products BEGIN
  INSERT INTO products_fts(products_fts, rowid, name, description)
    VALUES ('delete', old.id, old.name,
      CASE WHEN instr(old.description, char(10) || '## No incluye') > 0
        THEN substr(old.description, 1, instr(old.description, char(10) || '## No incluye') - 1)
        ELSE old.description END);
  INSERT INTO products_fts(rowid, name, description)
    VALUES (new.id, new.name,
      CASE WHEN instr(new.description, char(10) || '## No incluye') > 0
        THEN substr(new.description, 1, instr(new.description, char(10) || '## No incluye') - 1)
        ELSE new.description END);
END;
