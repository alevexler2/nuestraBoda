export interface MediaCardInterfaceContainer {
  subtitle: string
  imageUrl: string
  mediaType?: 'image' | 'video';
  owner: boolean,
  setRefreshFlag: (value: boolean) => void;
  MediaFileID: string;
}