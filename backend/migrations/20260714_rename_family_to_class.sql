-- Migration: Rename ge10_family_links to ge10_class_links safely, handling pre-existence
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ge10_family_links') THEN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ge10_class_links') THEN
      -- If both exist, and ge10_class_links has no rows, drop it to let ge10_family_links be renamed
      IF (SELECT COUNT(*) FROM ge10_class_links) = 0 THEN
        DROP TABLE ge10_class_links CASCADE;
        EXECUTE 'ALTER TABLE ge10_family_links RENAME TO ge10_class_links';
      ELSE
        -- If both tables contain data, copy rows from family to class then drop family
        EXECUTE 'INSERT INTO ge10_class_links SELECT * FROM ge10_family_links ON CONFLICT DO NOTHING';
        DROP TABLE ge10_family_links CASCADE;
      END IF;
    ELSE
      EXECUTE 'ALTER TABLE ge10_family_links RENAME TO ge10_class_links';
    END IF;
  END IF;
END $$;
