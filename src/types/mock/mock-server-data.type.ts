interface CityMock {
  city: string,
  coordinates: number[]
}

interface UserMock {
  username: string,
  password: string
}


export type MockServerData = {
  names: string[],
  descriptions: string[],
  publicationDate: Date,
  cities: CityMock[],
  imagePreview: string[],
  imageы: string[][],
  emails: string[],
  avatars: string[],
  users: UserMock[]
};
