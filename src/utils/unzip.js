import JSZip from 'jszip'

export default async function unzip(blob, file) {
  const new_zip = new JSZip()
  const zipped = await new_zip.loadAsync(blob)
  try {
    let assets = await zipped.file(file).async('string')
    assets = JSON.parse(assets)
    return assets
  } catch (e) {
    console.error(e)
  }
}
