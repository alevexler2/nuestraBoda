export interface MediaCardInterfaceContainer {
  subtitle: string
  streamUrl?: string
  imageUrl: string
  mediaType?: number;
  owner: boolean,
  setRefreshFlag: (value: boolean) => void;
  MediaFileID: string;
}