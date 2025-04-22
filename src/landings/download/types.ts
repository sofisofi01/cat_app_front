export interface DownloadItem {
  readonly id: string;
  readonly title: string;
  readonly text: string;
}

export interface DownloadPageProps {
  readonly title: string;
  readonly caption: string;
  readonly items: readonly DownloadItem[];
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
}
