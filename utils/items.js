const utils = require('./index.js');
const GenerateMatrixOptionType = utils.GenerateMatrixOptionType;
const GenerateClass = utils.GenerateClass;

CreateMatrixItem = (dear_inventory_item, shopify_retail_items, shopify_wholesale_items) => {
  const key = dear_inventory_item.ProductCode;
  const sri = shopify_retail_items;
  const swi = shopify_wholesale_items;
  const category = sri[key] ? sri[key][`Type`] : swi[key] ? swi[key][`Type`] : dear_inventory_item.Category;
  const option = dear_inventory_item.ProductFamilyOption1Value;
  const option_type = GenerateMatrixOptionType(option);
  const wholesale_product_description = swi[key] ? swi[key][`Body (HTML)`] : ``;
  const retail_product_description = sri[key] ? sri[key][`Body (HTML)`] : ``;
  return {
    [`ExternalID`]: dear_inventory_item.ProductCode,
    [`Item Name/Number`]: dear_inventory_item.ProductCode,
    [`Display Name/Code`]: dear_inventory_item.Name,
    [`Vendor SKU`]: dear_inventory_item.SupplierProductCode,
    [`Subsidiary`]: `Suavecito, Inc.`,
    [`Class`]: GenerateClass(key, dear_inventory_item.Name, category),
    [`Track Landed Cost`]: `TRUE`,
    [`Costing Method `]: `FIFO`,
    [`Cost Category`]: `INVENTORY`,
    [`Use Bins`]: `TRUE`,
    [`Replenishment Method`]: `Time Phased`,
    [`Auto-Calculate Lead Time`]: `TRUE`,
    [`Manufacturer`]: dear_inventory_item.LastSuppliedBy,
    [`MPN`]: dear_inventory_item.SupplierProductCode,
    [`Vendor 1 Name`]: dear_inventory_item.LastSuppliedBy,
    [`Cost Estimate Type`]: `Average Cost`,
    [`Item Weight`]: dear_inventory_item.Weight,
    [`Weight Unit`]: dear_inventory_item.WeightUnits || 'kg',
    [`Tax Schedule`]: `Taxable`,
    [`UPC Code`]: dear_inventory_item.Barcode,
    [`Subitem of`]: dear_inventory_item.ProductFamilySKU,
    [`Matrix Type`]: `Child Matrix Item`,
    [`Matrix Option - Size`]: option_type === 'Size' ? option : '',
    [`Matrix Option - Fragrance`]: option_type === 'Fragrance' ? option : '',
    [`Matrix Option - Color`]: option_type === 'Color' ? option : '',
    [`Matrix Option - Eyelash`]: option_type === 'Eyelash' ? option : '',
    [`Matrix Option - Brush`]: option_type === 'Brush' ? option : '',
    [`Shopify Wholesale Product Handle`]: swi[key] ? swi[key][`Handle`] : ``,
    [`Shopify Wholesale Price`]: swi[key] ? swi[key][`Variant Price`] : ``,
    [`Shopify Wholesale Compare At Price`]: swi[key] ? swi[key][`Variant Compare At Price`] : ``,
    [`Shopify Wholesale Description`]: wholesale_product_description.length > 3998 ? wholesale_product_description.slice(0, 3998) : wholesale_product_description,
    [`Shopify Wholesale Tags`]: swi[key] ? swi[key][`Tags`] : ``,
    [`Shopify Retail Product Handle`]: sri[key] ? sri[key][`Handle`] : ``,
    [`Shopify Retail Price`]: sri[key] ? sri[key][`Variant Price`] : ``,
    [`Shopify Retail Compare At Price`]: sri[key] ? sri[key][`Variant Compare At Price`] : ``,
    [`Shopify Retail Description`]: retail_product_description.length > 3998 ? retail_product_description.slice(0, 3998) : retail_product_description,
    [`Shopify Retail Tags`]: sri[key] ? sri[key][`Tags`] : ``,
    [`Shopify Product Type`]: sri[key] ? sri[key][`Type`] : swi[key] ? swi[key][`Type`] : ``,
    [`Shopify Requires Shipping`]: `TRUE`
  }
};

CreateMatrixParent = (FamilySKU, FamilyName, Weight, WeightUnits, Category, SKU, ProductName, shopify_retail_items, shopify_wholesale_items) => {
  const sri = shopify_retail_items;
  const swi = shopify_wholesale_items;
  const wholesale_product_description = swi[SKU] && swi[SKU][`Body (HTML)`] ? swi[SKU][`Body (HTML)`] : ``;
  const retail_product_description = sri[SKU] && sri[SKU][`Body (HTML)`] ? sri[SKU][`Body (HTML)`] : ``;
  return {
    [`ExternalID`]: FamilySKU,
    [`Item Name/Number`]: FamilySKU,
    [`Display Name/Code`]: FamilyName,
    [`Vendor SKU`]: '',
    [`Subsidiary`]: `Suavecito, Inc.`,
    [`Class`]: GenerateClass(SKU, ProductName, Category),
    [`Track Landed Cost`]: `TRUE`,
    [`Costing Method `]: `FIFO`,
    [`Cost Category`]: `INVENTORY`,
    [`Use Bins`]: `TRUE`,
    [`Default ATP`]: ``,
    [`Replenishment Method`]: `Time Phased`,
    [`Auto-Calculate Lead Time`]: `TRUE`,
    [`Manufacturer`]: '',
    [`MPN`]: '',
    [`Vendor 1 Name`]: '',
    [`Cost Estimate Type`]: `Average Cost`,
    [`Item Weight`]: Weight,
    [`Weight Unit`]: WeightUnits || 'kg',
    [`Tax Schedule`]: `Taxable`,
    [`UPC Code`]: '',
    [`Subitem of`]: '',
    [`Matrix Type`]: `Parent Matrix Item`,
    [`Matrix Option - Size`]: '',
    [`Matrix Option - Fragrance`]: '',
    [`Matrix Option - Color`]: '',
    [`Matrix Option - Eyelash`]: '',
    [`Matrix Option - Brush`]: '',
    [`Shopify Wholesale Product Handle`]: FamilySKU,
    [`Shopify Wholesale Published Scope`]: '',
    [`Shopify Wholesale Price`]: '',
    [`Shopify Wholesale Compare At Price`]: '',
    [`Shopify Wholesale Description`]: wholesale_product_description.length > 3998 ? wholesale_product_description.slice(0, 3998) : wholesale_product_description,
    [`Shopify Wholesale Tags`]: ``,
    [`Shopify Retail Product Handle`]: ``,
    [`Shopify Retail Published Scope`]: ``,
    [`Shopify Retail Price`]: ``,
    [`Shopify Retail Compare At Price`]: ``,
    [`Shopify Retail Description`]: retail_product_description.length > 3998 ? retail_product_description.slice(0, 3998) : retail_product_description,
    [`Shopify Retail Tags`]: ``,
    [`Shopify Product Type`]: Category,
    [`Shopify Requires Shipping`]: `TRUE`
  }
};

CreateInventoryItem = (dear_inventory_item, shopify_retail_items, shopify_wholesale_items) => {
  const key = dear_inventory_item.ProductCode;
  const sri = shopify_retail_items;
  const swi = shopify_wholesale_items;
  const category = sri[key] ? sri[key][`Type`] : swi[key] ? swi[key][`Type`] : dear_inventory_item.Category;
  const wholesale_product_description = swi[key] ? swi[key][`Body (HTML)`] : ``;
  const retail_product_description = sri[key] ? sri[key][`Body (HTML)`] : ``;
  return {
    [`ExternalID`]: dear_inventory_item.ProductCode,
    [`Item Name/Number`]: dear_inventory_item.ProductCode,
    [`Display Name/Code`]: dear_inventory_item.Name,
    [`Vendor SKU`]: dear_inventory_item.SupplierProductCode,
    [`Subsidiary`]: `Suavecito, Inc.`,
    [`Class`]: GenerateClass(key, dear_inventory_item.Name, category),
    [`Track Landed Cost`]: `TRUE`,
    [`Costing Method `]: `FIFO`,
    [`Cost Category`]: `INVENTORY`,
    [`Use Bins`]: `TRUE`,
    [`Replenishment Method`]: `Time Phased`,
    [`Auto-Calculate Lead Time`]: `TRUE`,
    [`Manufacturer`]: dear_inventory_item.LastSuppliedBy,
    [`MPN`]: dear_inventory_item.SupplierProductCode,
    [`Vendor 1 Name`]: dear_inventory_item.LastSuppliedBy,
    [`Cost Estimate Type`]: `Average Cost`,
    [`Item Weight`]: dear_inventory_item.Weight,
    [`Weight Unit`]: dear_inventory_item.WeightUnits || 'kg',
    [`Tax Schedule`]: `Taxable`,
    [`UPC Code`]: dear_inventory_item.Barcode,
    [`Subitem of`]: dear_inventory_item.ProductFamilySKU,
    [`Matrix Option - Sizes`]: dear_inventory_item.ProductFamilyOption1Value,
    [`Shopify Wholesale Product Handle`]: swi[key] ? swi[key][`Handle`] : ``,
    [`Shopify Wholesale Price`]: swi[key] ? swi[key][`Variant Price`] : ``,
    [`Shopify Wholesale Compare At Price`]: swi[key] ? swi[key][`Variant Compare At Price`] : ``,
    [`Shopify Wholesale Description`]: wholesale_product_description.length > 3998 ? wholesale_product_description.slice(0, 3998) : wholesale_product_description,
    [`Shopify Wholesale Tags`]: swi[key] ? swi[key][`Tags`] : ``,
    [`Shopify Retail Product Handle`]: sri[key] ? sri[key][`Handle`] : ``,
    [`Shopify Retail Price`]: sri[key] ? sri[key][`Variant Price`] : ``,
    [`Shopify Retail Compare At Price`]: sri[key] ? sri[key][`Variant Compare At Price`] : ``,
    [`Shopify Retail Description`]: retail_product_description.length > 3998 ? retail_product_description.slice(0, 3998) : retail_product_description,
    [`Shopify Retail Tags`]: sri[key] ? sri[key][`Tags`] : ``,
    [`Shopify Product Type`]: sri[key] ? sri[key][`Type`] : swi[key] ? swi[key][`Type`] : ``,
    [`Shopify Requires Shipping`]: `TRUE`
  }
};

exports.GetMatrixAssemblyItems = (products, bom, shopify_retail_items, shopify_wholesale_items) => {
  const records = {};
  for(const product of products) {
    //If the item is a Subitem (belongs to a family) and has a BOM and is not Auto Assemble
    if(product[`ProductFamilySKU`] && product[`BillOfMaterial`] === 'Yes' && product[`AutoAssemble`] === 'No') {
      //If the item Parent isn't in records yet
      if(!records[product[`ProductFamilySKU`]]) {
        const FamilySKU = product[`ProductFamilySKU`];
        const FamilyName = product[`ProductFamilyName`];
        const Weight = product[`Weight`];
        const WeightUnits = product[`WeightUnits`];
        const Category = product[`Category`];
        const SKU = product[`ProductCode`];
        const ProductName = product[`Name`];
        records[product[`ProductFamilySKU`]] = CreateMatrixParent(FamilySKU, FamilyName, Weight, WeightUnits, Category, SKU, ProductName, shopify_retail_items, shopify_wholesale_items);
      }
      //Create the Subitem
      records[product[`ProductCode`]] = CreateMatrixItem(product, shopify_retail_items, shopify_wholesale_items);
      //Add the components
      for(const bom_item of bom) {
        if(product[`ProductCode`] === bom_item[`ProductSKU`]) {
          if(records[product[`ProductCode`]]) {
            for(let y = 1; y <= 30; y++) {
              if(!records[product[`ProductCode`]][`Component ${y} - Item`]) {
                records[product[`ProductCode`]][`Component ${y} - Item`] = bom_item.ComponentSKU;
                records[product[`ProductCode`]][`Component ${y} - Quantity`] = bom_item.Quantity;
                break;
              }
            }
          }
        }
      }
    }
  }
  return records;
};

exports.GetMatrixItems = (products, shopify_retail_items, shopify_wholesale_items) => {
  const records = {};
  for(const product of products) {
    //If the item is a Subitem (belongs to a family)
    if(product[`ProductFamilySKU`] && product[`BillOfMaterial`] === 'No') {
      //If the item Parent isn't in records yet
      if(!records[product[`ProductFamilySKU`]]) {
        const FamilySKU = product[`ProductFamilySKU`];
        const FamilyName = product[`ProductFamilyName`];
        const Weight = product[`Weight`];
        const WeightUnits = product[`WeightUnits`];
        const Category = product[`Category`];
        const SKU = product[`ProductCode`];
        const ProductName = product[`Name`];
        records[product[`ProductFamilySKU`]] = CreateMatrixParent(FamilySKU, FamilyName, Weight, WeightUnits, Category, SKU, ProductName, shopify_retail_items, shopify_wholesale_items);
      }
      //Create the Subitem
      records[product[`ProductCode`]] = CreateMatrixItem(product, shopify_retail_items, shopify_wholesale_items);
    }
  }
  return records;
};

exports.GetAssemblyItems = (products, bom, shopify_retail_items, shopify_wholesale_items) => {
  const records = {};
  for(const product of products) {
    //If the item is not a Subitem (does not belongs to a family) and has a BOM and is not Auto Assemble
    if(!product[`ProductFamilySKU`] && product[`BillOfMaterial`] === 'Yes' && product[`AutoAssemble`] === 'No') {
      for(const bom_item of bom) {
        if(product[`ProductCode`] === bom_item[`ProductSKU`]) {
          //Add the component if the item is in records
          if(records[product[`ProductCode`]]) {
            for(let y = 1; y <= 30; y++) {
              if(!records[product[`ProductCode`]][`Component ${y} - Item`]) {
                records[product[`ProductCode`]][`Component ${y} - Item`] = bom_item.ComponentSKU;
                records[product[`ProductCode`]][`Component ${y} - Quantity`] = bom_item.Quantity;
                break;
              }
            }
          //Add the item to the records if the item isn't in records yet
          }else{
            records[product.ProductCode] = CreateInventoryItem(product, shopify_retail_items, shopify_wholesale_items);
            records[product.ProductCode][`Component 1 - Item`] = bom_item.ComponentSKU;
            records[product.ProductCode][`Component 1 - Quantity`] = bom_item.Quantity;
          }
        }
      }
    }
  }
  return records;
};

exports.GetKitItems = (products, bom, shopify_retail_items, shopify_wholesale_items) => {
  const records = {};
  for(const product of products) {
    //If the item is not a Subitem (does not belongs to a family) and has a BOM and is not Auto Assemble
    if(!product[`ProductFamilySKU`] && product[`BillOfMaterial`] === 'Yes' && product[`AutoAssemble`] === 'Yes') {
      for(const bom_item of bom) {
        if(product[`ProductCode`] === bom_item[`ProductSKU`]) {
          //Add the component if the item is in records
          if(records[product[`ProductCode`]]) {
            for(let y = 1; y <= 30; y++) {
              if(!records[product[`ProductCode`]][`Component ${y} - Item`]) {
                records[product[`ProductCode`]][`Component ${y} - Item`] = bom_item.ComponentSKU;
                records[product[`ProductCode`]][`Component ${y} - Quantity`] = bom_item.Quantity;
                break;
              }
            }
          //Add the item to the records if the item isn't in records yet
          }else{
            records[product.ProductCode] = CreateInventoryItem(product, shopify_retail_items, shopify_wholesale_items);
            records[product.ProductCode][`Component 1 - Item`] = bom_item.ComponentSKU;
            records[product.ProductCode][`Component 1 - Quantity`] = bom_item.Quantity;
          }
        }
      }
    }
  }
  return records;
};

exports.GetInventoryItems = (products, shopify_retail_items, shopify_wholesale_items) => {
  const records = {};
  for(const product of products) {
    //If the item is not a Subitem (does not belongs to a family and has a BOM)
    if(!product[`ProductFamilySKU`] && product[`BillOfMaterial`] === 'No') {
      records[product.ProductCode] = CreateInventoryItem(product, shopify_retail_items, shopify_wholesale_items);
    }
  }
  return records;
};