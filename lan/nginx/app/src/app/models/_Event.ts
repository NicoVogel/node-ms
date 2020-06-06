export interface _Event {
  id?: string;
  title: string;
  description: string;
  registered?: {
    _id: string,
    name: string,
    registrationComplete: boolean
  }[];
}