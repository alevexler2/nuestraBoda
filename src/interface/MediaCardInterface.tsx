export interface MediaCardInterface {
  subtitle: string
  imageUrl: string
  cardRef: React.RefObject<HTMLDivElement | null>
  mediaType?: 'image' | 'video';
  owner: boolean;
  onDelete: (e: React.MouseEvent) => void;
  handleDelete: () => void;
  showAlertModal: boolean;
  isLoading: boolean;
  setShowAlertModal: (value: boolean) => void;
  handleLike: () => void;
  likesCount: number,
  isLikedByUser: boolean,
}