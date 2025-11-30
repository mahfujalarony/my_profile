export interface Profile {
  name?: string;
  bio: string;
  profileimage?: string;
  view?: number;
  blobName?: string;
}

export interface ProfileBak {
  _id: string;
  name?: string;
  bio: string;
  profileimage?: string;
  view?: number;
  blobName?: string;
}