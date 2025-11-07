export interface MediaCardInterfaceContainer {
  subtitle: string
  imageUrl: string
  mediaType?: number;
  owner: boolean,
  setRefreshFlag: (value: boolean) => void;
  MediaFileID: string;
}