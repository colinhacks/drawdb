CREATE MIGRATION m1sdlv5ddlz4l4sxywkgxhfrtufbyxzfmtawpscc34mdufhp3kknjq
    ONTO initial
{
  CREATE FUNCTION default::generate_byte() ->  std::str USING (SELECT
      {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'} ORDER BY
          std::random() ASC
  LIMIT
      1
  );
  CREATE FUNCTION default::generate_hex() ->  std::str USING ((((((('#' ++ default::generate_byte()) ++ default::generate_byte()) ++ default::generate_byte()) ++ default::generate_byte()) ++ default::generate_byte()) ++ default::generate_byte()));
  CREATE ABSTRACT TYPE default::Shape {
      CREATE REQUIRED PROPERTY color -> std::str {
          SET default := (default::generate_hex());
      };
      CREATE REQUIRED PROPERTY x -> std::float64;
      CREATE REQUIRED PROPERTY y -> std::float64;
  };
  CREATE TYPE default::Circle EXTENDING default::Shape {
      CREATE REQUIRED PROPERTY radius -> std::float64 {
          SET default := ((5 * std::random()));
      };
  };
  CREATE TYPE default::Ellipse EXTENDING default::Shape {
      CREATE REQUIRED PROPERTY x_radius -> std::float64 {
          SET default := ((5 * std::random()));
      };
      CREATE REQUIRED PROPERTY y_radius -> std::float64 {
          SET default := ((5 * std::random()));
      };
  };
  CREATE TYPE default::Square EXTENDING default::Shape {
      CREATE REQUIRED PROPERTY side_length -> std::float64 {
          SET default := ((10 * std::random()));
      };
  };
};
