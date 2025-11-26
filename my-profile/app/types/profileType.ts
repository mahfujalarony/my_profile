// types/profileType.ts
export interface Profile {
  name?: string;
  bio: string;
  profileimage?: string;
  view?: number;
}

export interface ProfileBak {
  _id: string;
  name?: string;
  bio: string;
  profileimage?: string;
  view?: number;
}