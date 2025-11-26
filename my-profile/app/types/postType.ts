export interface postData {
  _id: string,
  title: string,
  description: string,
  date: Date,
  view: number | null,
  image: string | null,
  rank: number
}

export interface postDataInput {
  title: string,
  description: string,
  date: Date,
  view: number | null,
  image: string | null,
  rank: number
}