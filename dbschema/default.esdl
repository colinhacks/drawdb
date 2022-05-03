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
      default := 20 * random();
    };
  }

  type Square extending Shape {
    required property side_length -> float64 {
      default := 40 * random();
    };
  }

  type Triangle extending Shape {
    required property tri_height -> float64 {
      default := 50 * random();
    };
    
    required property tri_width -> float64 {
      default := 50 * random();
    };
  }
}
