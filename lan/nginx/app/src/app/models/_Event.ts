export interface _Event {
  id?: string;
  title: string;
  description: string;
  price: string;
  registered?: {
    _id: string,
    name: string,
    registrationComplete: boolean
  }[];
}