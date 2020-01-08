exports.FormatShopifyObject = (file) => {
  const object = {};
  for(let i = 0; i < file.length; i++) {
    object[file[i][`Variant SKU`]] = file[i];
  }
  return object;
};

exports.GenerateClass = (sku, name, category) => {
  //Components
  if(sku.charAt(0) === 'J' || sku.charAt(0) === 'F' || sku.charAt(0) === 'L') {
    const classes = [
      {string: 'Label', subClass: 'Label'},
      {string: 'Jar', subClass: 'Jar'},
      {string: 'Lid', subClass: 'Lid'},
      {string: 'Bottle', subClass: 'Bottle'},
      {string: 'Cap', subClass: 'Cap'},
      {string: 'Box', subClass: 'Box'},
      {string: 'Unboxed', subClass: 'Unboxed'},
      {string: 'Unlabeled', subClass: 'Unlabeled'},
      {string: 'Dropper', subClass: 'Dropper'},
      {string: 'Sprayer', subClass: 'Sprayer'},
      {string: 'Pump', subClass: 'Pump'},
      {string: 'Orifice', subClass: 'Orifice'},
      {string: 'Tube', subClass: 'Tube'},
      {string: 'Liner', subClass: 'Liner'},
      {string: 'Blister', subClass: 'Blister'},
      {string: 'Bag', subClass: 'Bag'},
      {string: 'Reducer', subClass: 'Reducer'},
      {string: 'Comb', subClass: 'Comb'},
      {string: 'Flask', subClass: 'Flask'},
      {string: 'Fill', subClass: 'Fill'}
    ];
    for(let i = 0; i < classes.length; i++) {
      const object = classes[i];
      if(name.includes(object.string)) {
        return 'Components : ' + object.subClass;
      }else if(i === classes.length - 1) {
        return 'Components : Other'
      }
    }
  }
  //Merchandise
  else if(sku.charAt(0) === 'M' || sku.charAt(0) === 'C') {
    const classes = [
      {string: 'Mug', subClass: 'Cups & Mugs'},
      {string: 'Pint Glass', subClass: 'Cups & Mugs'},
      {string: 'Sticker', subClass: 'Stickers'},
      {string: 'Key Chain', subClass: 'Accessories'},
      {string: 'Pin', subClass: 'Pins & Patches'},
      {string: 'Patch', subClass: 'Pins & Patches'},
      {string: 'Switchblade', subClass: 'Novelty & Toys'},
      {string: 'Doll', subClass: 'Novelty & Toys'},
      {string: 'Bobble', subClass: 'Novelty & Toys'},
      {string: 'Pillow', subClass: 'Novelty & Toys'},
      {string: 'Lanyard', subClass: 'Accessories'},
      {string: 'Sunglasses', subClass: 'Accessories'},
      {string: 'Wallet', subClass: 'Accessories'},
      {string: 'Brush', subClass: 'Combs & Brushes'},
      {string: 'Comb', subClass: 'Combs & Brushes'},
      {string: 'Cape', subClass: 'Capes'},
      {string: 'Apron', subClass: 'Accessories', class: 'Apparel'},
      {string: 'License Plate', subClass: 'Novelty & Toys'},
      {string: 'Belt', subClass: 'Accessories', class: 'Apparel'}
    ];
    for(let i = 0; i < classes.length; i++) {
      const object = classes[i];
      if(name.includes(object.string)) {
        const obj_class = object.class ? object.class : 'Merchandise'
        return `${obj_class} : ${object.subClass}`;
      }else if(i === classes.length - 1) {
        return 'Merchandise : Other'
      }
    }
  }
  //Apparel
  else if(sku.charAt(0) === 'S' || sku.charAt(0) === 'H') {
    const classes = [
      {string: 'Tee', subClass: 'Shirts'},
      {string: 'Shirt', subClass: 'Shirts'},
      {string: 'Tank', subClass: 'Shirts'},
      {string: 'Tank', subClass: 'Jersey'},
      {string: 'Hat', subClass: 'Hats & Beanies'},
      {string: 'Beanie', subClass: 'Hats & Beanies'},
      {string: 'Jacket', subClass: 'Jackets & Sweaters'},
      {string: 'Sweater', subClass: 'Jackets & Sweaters'},
      {string: 'Hoodie', subClass: 'Jackets & Sweaters'},
      {string: 'Hooded', subClass: 'Jackets & Sweaters'},
      {string: 'Crewneck', subClass: 'Jackets & Sweaters'},
      {string: 'Windbreaker', subClass: 'Jackets & Sweaters'},
      {string: 'Polo', subClass: 'Shirts'},
      {string: 'Cap', subClass: 'Hats & Beanies'}
    ]
    for(let i = 0; i < classes.length; i++) {
      const object = classes[i];
      if(name.includes(object.string)) {
        return 'Apparel : ' + object.subClass;
      }else if(i === classes.length - 1) {
        return 'Apparel : Other'
      }
    }
  }
  //Beauty
  else if(sku.charAt(0) === 'P' || sku.charAt(0) === 'K') {
    const classes = [
      {string: 'Brow Pomade', subClass: 'Cosmetics'},
      {string: 'Pomade Pencil', subClass: 'Hair'},
      {string: 'Pomade', subClass: 'Hair'},
      {string: 'Hair', subClass: 'Hair'},
      {string: 'Silkening Serum', subClass: 'Hair'},
      {string: 'Spray', subClass: 'Hair'},
      {string: 'spray', subClass: 'Hair'},
      {string: 'Shampoo', subClass: 'Hair'},
      {string: 'Conditioner', subClass: 'Hair'},
      {string: 'Blowout', subClass: 'Hair'},
      {string: 'Wet Set', subClass: 'Hair'},
      {string: 'Lip', subClass: 'Cosmetics'},
      {string: 'Brow Gel', subClass: 'Cosmetics'},
      {string: 'Eyeliner', subClass: 'Cosmetics'},
      {string: 'Beard', subClass: 'Beard'},
      {string: 'Shave', subClass: 'Shaving'},
      {string: 'Shaving', subClass: 'Shaving'},
      {string: 'Mustache', subClass: 'Beard'}
    ]
    const parent_class = category === 'Beauty' ? 'Beauty' : `Men's Grooming`;
    for(let i = 0; i < classes.length; i++) {
      const object = classes[i];
      if(name.includes(object.string)) {
        return `${parent_class} : ${object.subClass}`;
      }else if(i === classes.length - 1) {
        return `${parent_class} : Other`;
      }
    }
  }
  //Gunthers Items
  else if(sku.charAt(0).toLowerCase() === 'g' && sku.charAt(1).toLowerCase() === 'u') {
    return 'Other Brands : Gunthers';
  }
  //Tres Noir Items
  else if(sku.charAt(0).toLowerCase() == 't' && sku.charAt(1).toLowerCase() == 'n') {
    return 'Other Brands : Tres Noir';
  }
}

exports.GenerateMatrixOptionType = (option) => {
  const colors = ['Black', 'Blue', 'Gold', 'Red', 'Silver', 'Grey', 'White', 'Ash Brown', 'Dark Brown', 'Medium Brown', 'Warm Medium Brown', 'Amber', 'Green', 'Yellow', 'Glow in the Dark', 'Antique Brown', 'Natural Leather', 'Tenacity', 'Valor', 'Dauntless', 'Fortitude', 'Reina', `Cupid's Bow`, 'Devoted', 'Bruja', 'Amethyst', 'Trance', 'Amulet', 'Foxy', 'Le Freak', 'Dancing Queen', 'Cita', 'Cosmos', 'Frenchy', 'Luna', 'Mirror, Mirror', 'Sirena', 'Victory', 'Afterglow', 'Daybreak', 'Dusk', 'Paradise', 'Santa Ana', 'Slay', 'Soma', 'Strut', 'Coffee', 'Brown', 'Black Ivory', 'Cobalt', 'Greenstone', 'Pearl', 'Quartyz', 'Blue Agave', 'Eclipse', 'Honeydew', 'Mantra', 'Muse', 'Nebula', 'Paradox', 'Poppy', 'Rosebud', 'Whirlwind', 'Winsteria', 'Woodland', 'Black - OG', 'Blue - Edgar', 'Light Blue - Jaime', 'Gold - Justin', 'Green - Soz', 'Black w/ Green Wood - OG', 'Cherry Wood', 'Natural Wood', 'Knucklehead Gloss', 'Knucklehead Matte', 'Snake Bite', 'Strung Out', 'Suavecita Tortoise Shell Skate', 'Suavecito OG Script Gloss', 'Suavecito Tortoise Shell Skate', 'The Club', 'Wipeout Gloss', 'Wipeout Tortoise', 'Burgundy', 'Pink', 'Suavecito OG - Gold', 'Suavecito OG - Silver', 'Suavecito Esse - Gold', 'Suavecito Esse - Silver', 'Suavecita OG Logo - Gold', 'Suavecita OG Logo - Silver', 'Suavecita Esse - Gold', 'Suavecita Esse - Silver', 'Neon Matte', 'Quartz', 'Gray', 'Navy', 'Racer', 'Mirror Mirror', 'Suavecita Tortoise Shell', 'Tortoise Shell Skate', 'Gloss Skate', 'OG Script Matte', 'Wisteria'];
  const fragrances = ['Unscented', 'Bay Rum', 'Black Amber', 'Eucalyptus and Tea Tree', 'Ivory Bergamot', 'Lavender', 'Saffron', 'Sandalwood', 'Whiskey Bar', 'Havana Nights', 'Coastal Citrus', 'Havana Tobacco', 'Mar Azul', 'Original', 'Eucalyptus', 'Whiskey bar', 'Dark Clove', 'Firme Warm Clove', 'OG Warm Clove'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '2XL', 'XXXL','3XL', 'XXXXL', '4XL', 'XXXXXL', '5XL', '4 oz', '16 oz', '32 oz', '3M', '6M', '12M', '10 inches', '14 inches', '18 inches', '4 in', '6 in', '8 in', '10 in', '12 in', 'Single', '3 Pack', '5 Pack', '10 Pack', '5 pack', '10 pack', '2T', '3T', '4T', 'YS', 'YM', 'YL', 'YXL', 'XS', 'Plus Size 1', 'Plus Size 2', 'Plus Size 3', 'Plus Size 4', '32 oz Tub', 'xs', '2Xl', '5Xl', '18M', 'Goalie', 'iPhone 4', 'iPhone 5', 'iPhone 6', '16oz'];
  const eyelashes = ['Bombon', 'Chica Fresa', 'De La Rosa', 'Gumdrop', 'Licorice', 'Pan Dulce', 'Sugar Plum', 'Tootsie', 'Tres Leches'];
  const brushes = ['Fluffy Face Brush', 'Flat Top Face Brush', 'Blush Brush', 'Medium Angle Brush', 'Flat Powder Brush', 'Cut Crease Brush', 'Angled Blending Brush', 'Small Angle Brush', 'Stippling Face Brush', 'Angled Face Brush', 'Packing Brush', 'Blending Brush'];

  if (colors.includes(option)) return 'Color';
  else if (fragrances.includes(option)) return 'Fragrance';
  else if (sizes.includes(option)) return 'Size';
  else if (eyelashes.includes(option)) return 'Eyelash';
  else if (brushes.includes(option)) return 'Brush';
  else return 'Error';
}