CREATE MIGRATION m15qmfo6kqrjcrubdzdrripjksxv6omkzw3wk63zzg7f7tgplybmcq
    ONTO m1sdlv5ddlz4l4sxywkgxhfrtufbyxzfmtawpscc34mdufhp3kknjq
{
  ALTER TYPE default::Circle {
      ALTER PROPERTY radius {
          SET default := ((2.5 + (5 * std::random())));
      };
  };
  ALTER TYPE default::Ellipse RENAME TO default::Triangle;
  ALTER TYPE default::Square {
      ALTER PROPERTY side_length {
          SET default := ((5 + (10 * std::random())));
      };
  };
  ALTER TYPE default::Triangle {
      ALTER PROPERTY x_radius {
          SET default := ((5 + (5 * std::random())));
          RENAME TO tri_height;
      };
  };
  ALTER TYPE default::Triangle {
      ALTER PROPERTY y_radius {
          SET default := ((5 + (5 * std::random())));
          RENAME TO tri_width;
      };
  };
};
