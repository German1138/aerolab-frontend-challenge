export default function customImageUrl(size: string, imageId: string) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
}
//`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`
