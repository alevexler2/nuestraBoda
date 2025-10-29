export interface MediaCardInterface {
  subtitle: string
  imageUrl: string
  activeImage: string
  handleClick: () => void
  cardRef: React.RefObject<HTMLDivElement | null>
  mediaType?: 'image' | 'video';
}