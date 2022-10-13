import JSZip from "jszip";

export default async function unzip(blob) {
  const new_zip = new JSZip();
  const zipped = await new_zip.loadAsync(blob);
  let assets = await zipped.file("assets.json").async("string");
  assets = JSON.parse(assets);
  return assets;
}
