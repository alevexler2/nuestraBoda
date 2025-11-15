import type { JSX } from "react";

export interface MediaCardInterface {
  subtitle: string
  imageUrl: string
  cardRef: React.RefObject<HTMLDivElement | null>
  commentsRef: React.RefObject<HTMLDivElement | null>
  mediaType?: number;
  owner: boolean;
  onDelete: (e: React.MouseEvent) => void;
  handleDelete: () => void;
  showAlertModal: boolean;
  isLoading: boolean;
  setShowAlertModal: (value: boolean) => void;
  handleLike: (e: React.MouseEvent<HTMLElement>) => void;
  likesCount: number,
  isLikedByUser: boolean,
  viewComments: boolean,
  isLastCommentOwn: boolean,
  handleShowComments: () => void;
  value: string;
  setValue: (value:string) => void;
  handleSendComment: () => void;
  renderComments: (value:any) => JSX.Element[];
  comments: any
}