export interface UploadItem {
  readonly title: string;
  readonly text: string;
}

export interface UploadPageProps {
  readonly title: string;
  readonly caption: string;
  readonly items: readonly UploadItem[];
}
