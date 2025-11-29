export interface EventInterface {
  ID: string;
  EventName: string;
  title: string;
  Subtitle: string;
  EventDate: string; 
  OwnerEmail1: string;
  OwnerEmail2?: string | null;
  createdAt: string; 
  updatedAt: string;
  Theme: {
    background: string;
    backgroundSecondary: string;
    font: string;
    fontSecondary: string; 
  }
}