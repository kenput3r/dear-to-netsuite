const csv = require('csvtojson');
const utils = require('./utils');
const headers = require('./utils/headers');
const items = require('./utils/items');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

(async () => {
  const products = await csv().fromFile(`./files/Dear.csv`);
  const bom = await csv().fromFile(`./files/BOM.csv`);
  const shopify_wholesale_file = await csv().fromFile(`./files/ShopifyWholesale.csv`);
  const shopify_retail_file = await csv().fromFile(`./files/ShopifyRetail.csv`);
  const shopify_retail_items = utils.FormatShopifyObject(shopify_retail_file);
  const shopify_wholesale_items = utils.FormatShopifyObject(shopify_wholesale_file);

  //Matrix items that have a BOM
  const matrix_assembly_items = items.GetMatrixAssemblyItems(products, bom, shopify_retail_items, shopify_wholesale_items);
  const matrixAssemblyItemWriter = createCsvWriter({
    path: './files/output/MatrixAssemblyItems.csv',
    header: headers.MatrixAssemblyItem
  });
  const matrix_assembly_array = Object.values(matrix_assembly_items);
  matrixAssemblyItemWriter.writeRecords(matrix_assembly_array);

  //Matrix items that do not have a BOM
  const matrix_items = items.GetMatrixItems(products, bom, shopify_retail_items, shopify_wholesale_items);
  const matrixItemWriter = createCsvWriter({
    path: './files/output/MatrixItems.csv',
    header: headers.MatrixItem
  });
  const matrix_items_array = Object.values(matrix_items);
  matrixItemWriter.writeRecords(matrix_items_array);

  //Assembly items that are not a kit and not a child of a Matrix
  const assembly_items = items.GetAssemblyItems(products, bom, shopify_retail_items, shopify_wholesale_items);
  const assemblyItemWriter = createCsvWriter({
    path: './files/output/AssemblyItems.csv',
    header: headers.AssemblyItem
  });
  const assembly_items_array = Object.values(assembly_items);
  assemblyItemWriter.writeRecords(assembly_items_array);

  //Assembly items that ARE a kit and not a child of a Matrix
  const kit_items = items.GetKitItems(products, bom, shopify_retail_items, shopify_wholesale_items);
  const kitItemWriter = createCsvWriter({
    path: './files/output/KitItems.csv',
    header: headers.AssemblyItem
  });
  const kit_items_array = Object.values(kit_items);
  kitItemWriter.writeRecords(kit_items_array);

  //Inventory items that are not a subitem and do not have a BOM
  const inventory_items = items.GetInventoryItems(products, shopify_retail_items, shopify_wholesale_items);
  const inventoryItemWriter = createCsvWriter({
    path: './files/output/InventoryItems.csv',
    header: headers.InventoryItem
  });
  const inventory_items_array = Object.values(inventory_items);
  inventoryItemWriter.writeRecords(inventory_items_array);

  //Service Items
  const service_items = items.GetServiceItems(products);
  const serviceItemWriter = createCsvWriter({
    path: './files/output/ServiceItems.csv',
    header: headers.ServiceItem
  });
  const service_items_array = Object.values(service_items);
  serviceItemWriter.writeRecords(service_items_array);
})();