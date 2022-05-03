CREATE MIGRATION m1vmqudbjsdea2eghzpz3u4b3zpab3mt7pmyldvhijxevhogx4rc7a
    ONTO m1inczvxkfdw4lyvrsuawiztfims6cdgi6usygdbqf5rws6oavt6hq
{
  ALTER TYPE default::Circle {
      ALTER PROPERTY radius {
          SET default := ((20 * std::random()));
      };
  };
  ALTER TYPE default::Square {
      ALTER PROPERTY side_length {
          SET default := ((40 * std::random()));
      };
  };
  ALTER TYPE default::Triangle {
      ALTER PROPERTY tri_height {
          SET default := ((50 * std::random()));
      };
  };
  ALTER TYPE default::Triangle {
      ALTER PROPERTY tri_width {
          SET default := ((50 * std::random()));
      };
  };
};
