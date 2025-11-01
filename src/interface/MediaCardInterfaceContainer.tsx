export interface MediaCardInterfaceContainer {
  subtitle: string
  imageUrl: string
  activeImage: string
  toggleActiveImage: (imgUrl: string, ref?: HTMLDivElement | null) => void;
  mediaType?: 'image' | 'video';
}