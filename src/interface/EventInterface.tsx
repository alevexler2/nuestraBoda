export interface EventInterface {
  ID: string;
  EventName: string;
  Subtitle: string;
  EventDate: string; 
  OwnerEmail1: string;
  OwnerEmail2?: string | null;
  createdAt: string; 
  updatedAt: string;
}