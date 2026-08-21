export type UserRole = 'GUEST' | 'HOST' | 'RESTAURANT' | 'ADMIN';

export type ServiceType = 'ROOM' | 'FOOD';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  profilePic?: string;
  rating?: number;
  totalBookings?: number;
  walletBalance?: number;
  savedProperties?: string[];
  savedFoods?: string[];
  createdAt: string;
}

export interface Listing {
  id: string;
  title: string;
  city: string;
  address: string;
  pricePerNight: number;
  hostId: string;
  hostName: string;
  hostAvatar?: string;
  hostRating?: number;
  foodAvailable: boolean;
  images: string[];
  category: 'deluxe' | 'suite' | 'villa' | 'penthouse' | 'studio';
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  amenities: string[];
  description: string;
  isActive: boolean;
  rating: number;
  totalReviews: number;
  keyFeatures: string[];
  availableCount?: number;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  landmark: string;
  pinCode: string;
  state: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  city: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  roomsCount: number;
  foodOption: boolean;
  status: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  paymentMode: 'ONLINE' | 'OFFLINE';
  paymentMethod?: 'UPI' | 'CARD' | 'NET_BANKING' | 'OFFLINE_CASH';
  paymentStatus: 'PENDING_OFFLINE' | 'PAID_OFFLINE' | 'PENDING_ONLINE' | 'PAID_ONLINE' | 'DISPUTED';
  createdAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  area: string;
  address: string;
  rating: number;
  reviewsCount: number;
  isOpen: boolean;
  deliveryTime: string;
  cuisines: string[];
  logoUrl: string;
  bannerUrl: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  itemName: string;
  category: 'Biryani' | 'Momos' | 'Burger' | 'Indian Thali' | 'Fast Food' | 'Desserts' | 'Beverages';
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  available: boolean;
  rating: number;
  prepTime: string;
  createdAt: string;
}

export interface CartFoodItem extends MenuItem {
  qty: number;
}

export interface FoodOrder {
  id: string;
  orderId: string;
  guestId: string;
  guestName: string;
  restaurantId: string;
  restaurantName: string;
  hostId?: string;
  items: {
    itemId: string;
    itemName: string;
    price: number;
    qty: number;
    image: string;
  }[];
  deliveryAddress: string;
  status: 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'PICKED' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  paymentMode: 'ONLINE' | 'OFFLINE';
  paymentMethod?: 'UPI' | 'CARD' | 'NET_BANKING' | 'OFFLINE_CASH';
  totalAmount: number;
  estimatedTime: string;
  orderPlacedAt: string;
  statusUpdatedAt?: string;
  deliveredAt?: string;
  riderName?: string;
  riderPhone?: string;
}

export interface Payment {
  id: string;
  billId: string;
  orderId?: string;
  bookingId?: string;
  itemTitle: string;
  mode: 'ONLINE' | 'OFFLINE';
  method: 'UPI' | 'CARD' | 'NET_BANKING' | 'OFFLINE_CASH';
  amount: number;
  status: 'PENDING_OFFLINE' | 'PAID_OFFLINE' | 'PENDING_ONLINE' | 'PAID_ONLINE' | 'FAILED';
  paidBy: string;
  paidTo: string;
  dateTime: string;
  transactionRef?: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number; // e.g. 20 (for 20%) or 1000 (for ₹1000 flat)
  minBookingAmount: number;
  maxDiscountAmount?: number;
  validTill: string;
  hostId: string;
  hostName: string;
  propertyId?: string; // If specific property or 'ALL'
  propertyTitle?: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'ORDER' | 'PAYMENT' | 'SYSTEM';
  isRead: boolean;
  createdAt: string;
}
