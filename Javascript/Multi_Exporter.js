//MASKING FUNCTION FOR L8
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}

//MASKING FUNCTION FOR L5 AND L7
function cloudMaskL457(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};

//setting variables
var pointA = [12.37558, 45.51725];
var pointB = [12.46914, 45.47393];
var center = [((pointA[0]+pointB[0])/2).toString().replace(".", "-"), ((pointA[1]+pointB[1])/2).toString().replace(".", "-")]

var region = ee.Geometry.Rectangle([pointA[0], pointA[1], pointB[0], pointB[1]]);
var folder = "Test_Folder"
var scale = 30

function exportLandsatImage(year){
  var dataset, image, vis
  if(year<1999){
    dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                  .filterDate(year+'-01-01', year+'-12-31')
                  .map(cloudMaskL457)
                  .filter(ee.Filter.bounds(region))
                  
    image = dataset.select(['B3', 'B2', 'B1']).median();              
    vis = {
      bands: ['B3', 'B2', 'B1'],
      gamma: 1.4,
      max: 3000,
      min: 0
    }
  }else if(year<2013){
    dataset = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                  .filterDate(year+'-01-01', year+'-12-31')
                  .map(cloudMaskL457)
                  .filter(ee.Filter.bounds(region))
                  
    image = dataset.select(['B3', 'B2', 'B1']).median();
    vis = {
      bands: ['B3', 'B2', 'B1'],
      gamma: 1.4,
      max: 3000,
      min: 0
    }
  }else{
    dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(year+'-01-01', year+'-12-31')
                  .map(maskL8sr)
                  .filter(ee.Filter.bounds(region))
                  
    image = dataset.select(['B4', 'B3', 'B2']).median();
    vis = {
      bands: ["B4","B3","B2"],
      gamma: 1.4,
      max: 3000,
      min: 0
    }
  }
  Export.image.toDrive({
    image:image.visualize(vis),
    description: year + '_landsat' + '_' + center[0] + '_' + center[1],
    folder: folder,
    fileNamePrefix: year + '_landsat' + '_' + center[0] + '_' + center[1],
    region: region,
    scale: scale})
}

for(var year=1985;year<2020;year++){
  
  //gets right landset and exports image
  exportLandsatImage(year)
              
  //creates image of water map and exports
  var dataset_water = ee.ImageCollection("JRC/GSW1_2/YearlyHistory")
                  .filterDate(year+'-01-01', year+'-12-31');
                  
  var image_water = dataset_water.select(['waterClass']).median();
  
  Export.image.toDrive({
    image:image_water.visualize(water_vis),
    description: year + '_water' + '_' + center[0] + '_' + center[1],
    folder: folder,
    fileNamePrefix: year + '_water' + '_' + center[0] + '_' + center[1],
    region: region,
    scale: scale})
}

Map.setCenter((pointA[0]+pointB[0])/2, (pointA[1]+pointB[1])/2, 10)

