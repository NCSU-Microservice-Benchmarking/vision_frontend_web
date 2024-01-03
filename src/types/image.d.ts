export interface image {
  id: string,
  type: string,
  name: string,
  url: string,
  base64: string
} 

export interface models {
  [x: task]: {
    short_name: string,
    long_name: string,
    description: string,
    models: {
      name: string,
      path: string,
    }[]
  }
}
