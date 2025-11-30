export interface postData {
  _id: string,
  title: string | null,
  description: string | null,
  date: Date | null,
  view: number | null,
  image: string | null,
  video: string | null,
  blobName: string;
  rank: number
}

export interface postDataInput {
  title: string | null,
  description: string | null,
  date: Date | null,
  view: number | null,
  image: string | null,
  video: string | null,
  blobName: string;
  rank: number
}