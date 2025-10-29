export interface MediaCardInterfaceContainer {
  subtitle: string
  imageUrl: string
  activeImage: string
  toggleActiveImage: (imgUrl: string) => void
  mediaType?: 'image' | 'video';
}