export type ReservationStatus = 'Available' | 'Limited' | 'Sold Out';

export type SlotStatus = 'Available' | 'Filling Fast' | 'Sold Out';

export interface ReservationSlot {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  status: SlotStatus;
  tablesRemaining: number;
  maxPartySize: number;
  seatingArea: string;
}

export interface CafeOutlet {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  operatingHours: string;
  phone: string;
  specialty: string;
  priceLevel: string;
  todayStatus: ReservationStatus;
  availableSlotsCount: number;
  totalSlotsCount: number;
  reservationNote: string;
  slots: ReservationSlot[];
}
