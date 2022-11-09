import JSZip from 'jszip'

export default async function unzip(blob, file) {
  const zip = new JSZip()
  const zipped = await zip.loadAsync(blob)
  try {
    let assets = await zipped.file(file).async('string')
    assets = JSON.parse(assets)
    return assets
  } catch (e) {
    console.error(e)
  }
}
