CREATE MIGRATION m1inczvxkfdw4lyvrsuawiztfims6cdgi6usygdbqf5rws6oavt6hq
    ONTO m15qmfo6kqrjcrubdzdrripjksxv6omkzw3wk63zzg7f7tgplybmcq
{
  ALTER TYPE default::Circle {
      ALTER PROPERTY radius {
          SET default := ((10 + (20 * std::random())));
      };
  };
  ALTER TYPE default::Square {
      ALTER PROPERTY side_length {
          SET default := ((10 + (20 * std::random())));
      };
  };
  ALTER TYPE default::Triangle {
      ALTER PROPERTY tri_height {
          SET default := ((20 + (20 * std::random())));
      };
  };
  ALTER TYPE default::Triangle {
      ALTER PROPERTY tri_width {
          SET default := ((20 + (20 * std::random())));
      };
  };
};
