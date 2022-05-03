module default {
  function generate_byte() -> str using (
    select {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'} order by random() limit 1
  );

  function generate_hex() -> str using (
    '#' ++ generate_byte() ++ generate_byte() ++ generate_byte() ++ generate_byte() ++ generate_byte() ++ generate_byte()
  );

  abstract type Shape {
    required property x -> float64;
    required property y -> float64;
    required property color -> str {
      default := generate_hex();
    }
  }

  type Circle extending Shape {
    required property radius -> float64 {
      default := 5 * random();
    };
  }

  type Square extending Shape {
    required property side_length -> float64 {
      default := 10 * random();
    };
  }

  type Ellipse extending Shape {
    required property x_radius -> float64 {
      default := 5 * random();
    };
    
    required property y_radius -> float64 {
      default := 5 * random();
    };
  }
}
