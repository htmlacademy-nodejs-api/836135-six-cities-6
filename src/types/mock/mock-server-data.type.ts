interface CityMock {
  city: string,
  coordinates: number[]
}

interface UserMock {
  username: string,
  password: string
}


export type MockServerData = {
  comforts: string[],
  names: string[],
  descriptions: string[],
  publicationDate: Date,
  cities: CityMock[],
  imagePreview: string[],
  images: string[][],
  emails: string[],
  avatars: string[],
  users: UserMock[]
};
