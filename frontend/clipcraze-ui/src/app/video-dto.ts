export interface VideoDTO {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  videoURL: string;
  videoStatus: string;
  thumbnailUrl: string;
}
