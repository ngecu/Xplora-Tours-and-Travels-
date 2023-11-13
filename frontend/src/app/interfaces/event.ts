export interface Event {
    event_id?: string; // Optional if the ID is generated by the server
    destination: string;
    duration: number;
    start_date: string; // You might want to use a Date type if applicable
    price: number;
    category_id: string;
  }
  