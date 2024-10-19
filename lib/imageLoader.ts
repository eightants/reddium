export default function imageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('/')) {
    return src
  }
  
  if (src.includes('redditmedia.com')) {
    return `/api/imageproxy?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
  }
  
  return src
}