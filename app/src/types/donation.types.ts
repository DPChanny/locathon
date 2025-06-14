export interface Donor {
  id: number;
  name: string;
  category: string;
  donationCount: number;
  gallery: any[];
  description: string;
  address: string;
  phone: string;
  openHours: string;
}

export type DonationHistoryItem = {
  id: number;
  timestamp: number;
  status: '기부완료' | '대기중';
  image: any;
  title: string;
  quantity: number;
};
