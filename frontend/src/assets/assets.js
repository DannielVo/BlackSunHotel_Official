import logo from "./Logo_2.png";
import bed1 from "./Bed1.jpg";
import bed2 from "./Bed2.jpg";
import bed3 from "./Bed3.avif";
import extraBed from "./Extra_Bed.jpg";
import slide1 from "./Slide1.jpg";
import slide2 from "./Slide2.jpg";
import slide3 from "./Slide3.jpg";
import slide4 from "./Slide4.avif";

import qrMomo from "./Black Sun Hotel_QR_MOMO.png";
import qrBanking from "./Black Sun Hotel_QR_Bank.png";
import visaMasterCard from "./visa-mastercard.png";

export const assets = {
  logo,
  bed1,
  bed2,
  bed3,
  extraBed,
  slide1,
  slide2,
  slide3,
  slide4,
  qrMomo,
  qrBanking,
  visaMasterCard,
};

export const SLIDES = [slide1, slide2, slide3, slide4];

export const EXTRA_BED = {
  title: "Extra Bed",
  type: "For 1 additional guest",
  description: "For 1 additional guest",
  img: extraBed,
  price: 500000,
};

export const ROOM_LIST = [
  {
    id: 0,
    title: "Economy Room",
    type: "CITY VIEW | 1 DOUBLE BED | 41 M²",
    typeId: "economy",
    description:
      "Comfortable and spacious room with views over the city featuring a double bed or 2 single beds, LCD TV, minibar, safe, and a range of quality amenities and excellent services.",
    shortDescription: "Comfortable room with city view and modern amenities.",
    img: bed1,
    price: 1800000,
    features: [
      { name: "maxOccupancy", detail: "2 Guests" },
      { name: "bedConfig", detail: "1 Double Bed" },
      { name: "roomSize", detail: "41 m²" },
      { name: "bathrooms", detail: "1 Bathroom" },
      { name: "roomView", detail: "City View" },
      { name: "roomBalcony", detail: "Balcony" },
    ],
    amenities: [
      "Internet Access",
      "Shower",
      "Air conditioner",
      "Bath",
      "Hairdryer",
      "Large TV",
      "Desk",
      "Mini Fridge",
    ],
  },
  {
    id: 1,
    title: "Deluxe Room",
    type: "RIVER VIEW | 2 DOUBLE BEDS | 45 M²",
    typeId: "deluxe",
    description:
      "Step into luxury and enjoy the views of the river from your room. Perfect for families or business travellers who appreciate space and luxurious design, offering a spacious lounge with a comfortable sofa and a separate bedroom.",
    shortDescription: "Spacious room perfect for families.",
    img: bed2,
    price: 2500000,
    features: [
      { name: "maxOccupancy", detail: "4 Guests" },
      { name: "bedConfig", detail: "2 Double Bed" },
      { name: "roomSize", detail: "45 m²" },
      { name: "bathrooms", detail: "2 Bathroom" },
      { name: "roomView", detail: "River View" },
      { name: "roomBalcony", detail: "Balcony" },
    ],
    amenities: [
      "Internet Access",
      "Shower",
      "Air conditioner",
      "Bath",
      "Bathrobes Provided",
      "Hairdryer",
      "Large TV",
      "Desk",
      "Mini Fridge",
      "Mini Bar",
    ],
  },
  {
    id: 2,
    title: "Premium Room",
    type: "CITY VIEW | 1 KING-SIZE BED | 55 M²",
    typeId: "premium",
    description:
      "Our most lavish rooms offer a spacious king-size bed and large windows with city views. The separate lounge has a sofa and a dining table for up to 4 people. Enjoy magnificent city views from all of the spaces in this suite.",
    shortDescription: "Spacious room perfect for families.",
    price: 3000000,
    img: bed3,
    features: [
      { name: "maxOccupancy", detail: "2 Guests" },
      { name: "bedConfig", detail: "1 King-size Bed" },
      { name: "roomSize", detail: "55 m²" },
      { name: "bathrooms", detail: "2 Bathroom" },
      { name: "roomView", detail: "City View" },
      { name: "roomBalcony", detail: "Balcony" },
    ],
    amenities: [
      "Internet Access",
      "Shower",
      "Air conditioner",
      "Bath",
      "Bathrobes Provided",
      "Hairdryer",
      "Large TV",
      "Desk",
      "Mini Fridge",
      "Mini Bar",
      "Ceiling Fans",
      "Telephone",
    ],
  },
];

export const SERVICES_LIST = [
  {
    id: 0,
    icon: "bx bxs-bowl-hot",
    serviceName: "Cuisine",
  },
  {
    id: 1,
    icon: "bx bx-closet",
    serviceName: "Cleaning services",
  },
  {
    id: 2,
    icon: "bx bx-swim",
    serviceName: "Outdoor swimming pool",
  },
  {
    id: 3,
    icon: "bx bx-spa",
    serviceName: "Spa treatment",
  },
  {
    id: 4,
    icon: "bx bx-child",
    serviceName: "Kids club",
  },
  {
    id: 5,
    icon: "bx bx-dumbbell",
    serviceName: "Fitness center",
  },
  {
    id: 6,
    icon: "bx bxs-bus",
    serviceName: "Airport hotel transfer",
  },
  {
    id: 7,
    icon: "bx bxs-parking",
    serviceName: "Parking",
  },
];

export const SERVICES_DETAILS = [
  {
    icon: "bx bxs-bowl-hot",
    title: "Cuisine",
    items: ["Restaurant", "Pool bar", "Room service"],
  },
  {
    icon: "bx bx-closet",
    title: "Cleaning services",
    items: ["Daily housekeeping"],
  },
  {
    icon: "bx bx-swim",
    title: "Swimming pool",
    items: ["Outdoor swimming pool", "Indoor swimming pool"],
  },
  {
    icon: "bx bx-spa",
    title: "Beauty and wellness",
    items: ["Spa treatment"],
  },
  {
    icon: "bx bx-dumbbell",
    title: "Sport activities",
    items: ["Fitness center", "Gym"],
  },
  {
    icon: "bx bx-child",
    title: "Family and children",
    items: ["Kids club"],
  },
  {
    icon: "bx bxs-bus",
    title: "Transportation",
    items: ["Airport hotel transfer"],
  },
  {
    icon: "bx bx-handicap",
    title: "Accessibility",
    items: ["Ramp at entrance", "Lift"],
  },
  {
    icon: "bx bxs-cat",
    title: "Pets",
    items: ["Pets not allowed"],
  },

  {
    icon: "bx bx-wifi-2",
    title: "Internet",
    items: ["Free wi-fi"],
  },
  {
    icon: "bx bx-help-circle",
    title: "Reception services",
    items: [
      "24 hours reception",
      "Luggage storage service",
      "Early check in available",
      "Late check out available",
    ],
  },
  {
    icon: "bx bx-shield-x",
    title: "Safety security",
    items: [
      "24 hours security",
      "CCTV/Cameras in common areas",
      "Smoke alarms",
      "Fire extinguisher",
    ],
  },
];

export const POLICY = [
  {
    name: "Information We Collect",
    items: [
      `We may collect personal information when you make a reservation,
                check in, or use our services. This may include your name,
                address, email, phone number, payment details, and other
                information you voluntarily provide.`,
      ` When you visit our website, we may collect technical data such
                as your IP address, browser type, operating system, referring
                URLs, and usage patterns. This information helps us analyze
                trends and improve the performance of our services.`,
    ],
  },

  {
    name: "How We Use Your Information",
    items: [
      `Your information is used to process bookings, personalize your
                experience, respond to your requests, and provide updates about
                our hotel and amenities.`,
      ` With your consent, we may send you promotional offers,
                newsletters, or event updates. You can opt out at any time via
                the unsubscribe link or by contacting us.`,
      `We may use or disclose your information to comply with legal
                obligations or protect the rights, property, or safety of Black
                Sun, our guests, or others.`,
    ],
  },

  {
    name: "Data Security",
    items: [
      ` We apply appropriate technical and organizational measures to
                safeguard your personal data. However, please note that no
                internet-based system can be guaranteed 100% secure.`,
    ],
  },

  {
    name: "Your Choices",
    items: [
      `You may request to access, update, or correct your personal
                information by contacting us.`,
      `You can unsubscribe from promotional communications at any time
                via the provided links or by reaching out to us.`,
    ],
  },

  {
    name: "Children’s Privacy",
    items: [
      `Our services are not intended for children under 16. We do not
                knowingly collect data from anyone under this age. If you
                believe a child has provided us with personal information,
                please contact us immediately.`,
    ],
  },
];

export const BOOKING_CANCEL = [
  {
    name: "Check-in & Check-out",
    items: [
      "Check-in time: from 13:30",
      "Check-out time: before 12:00",
      `Early check-in and late check-out are subject to availability.
                Please contact the reception directly to arrange.`,
    ],
  },
  {
    name: "Children & Extra Beds",
    items: [
      `Children aged 5 to 11 using existing bedding: 200,000 VND per
              child per night`,
      {
        name: `Children aged 5 to 11 sharing a room with parents require an extra
              bed, charged at:`,
        items: [
          `710,000 VND per night (Sunday to Friday)`,
          `1,150,000 VND per night (Saturday and Holidays)`,
        ],
      },
      {
        name: `Third person aged 12 and above (includes breakfast & extra bed):`,
        items: [
          `710,000 VND per night (Sunday to Friday)`,
          `1,150,000 VND per night (Saturday and Holidays)`,
        ],
      },
    ],
  },
  {
    name: "Room Rates",
    items: [`All prices include VAT and a 5% service charge.`],
  },
  {
    name: "Cancellation Policy",
    items: [
      `Cancellation and prepayment policies vary depending on the room
                type and rate plan. Please check the specific conditions when
                selecting your accommodation.`,
    ],
  },
];

export const DASHBOARD_TABS = [
  {
    key: "users",
    icon: "bx-user",
    label: "Users",
  },
  {
    key: "rooms",
    icon: "bx-bed",
    label: "Rooms",
  },
  {
    key: "bookings",
    icon: "bx-calendar",
    label: "Bookings",
  },
  {
    key: "reviews",
    icon: "bx-star",
    label: "Reviews",
    settingBtnTitle: "",
  },
  {
    key: "roomService",
    icon: "bx-restaurant",
    label: "Room Service",
    settingBtnTitle: "Add Service",
  },
  {
    key: "parkingService",
    icon: "bx-car",
    label: "Parking Service",
    settingBtnTitle: "Add Parking",
  },
];

export const USERS_TAB_KEY = "users";
export const ROOMS_TAB_KEY = "rooms";
export const BOOKINGS_TAB_KEY = "bookings";
export const REVIEWS_TAB_KEY = "reviews";
export const RSERVICES_TAB_KEY = "roomService";
export const PARKING_TAB_KEY = "parkingService";

export const DASHBOARD_USER_FIELD_MODAL = {
  id: "addUserForm",
  title: "Add User",
  settingBtnTitle: "Edit User",
  fieldItems: [
    {
      id: "addUserId",
      name: "id",
      label: "User ID",
      type: "text",
      required: true,
      readOnly: true,
      value: "",
    },
    {
      id: "addFullName",
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "addEmail",
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "addPhone",
      name: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "addPassword",
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "addRole",
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      readOnly: false,
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Staff", label: "Staff" },
        { value: "Customer", label: "Customer" },
      ],
      value: "Customer",
    },
  ],
};

export const DASHBOARD_ROOM_FIELD_MODAL = {
  id: "addRoomForm",
  title: "Add Room",
  settingBtnTitle: "Edit Room",
  fieldItems: [
    {
      id: "roomId",
      name: "id",
      label: "Room Id",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "roomName",
      name: "name",
      label: "Room Name",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "roomType",
      name: "type",
      label: "Room Type",
      type: "select",
      required: true,
      readOnly: false,
      options: [
        { value: "Economy", label: "Economy" },
        { value: "Deluxe", label: "Deluxe" },
        { value: "Premium", label: "Premium" },
      ],
      value: "Economy",
    },
    {
      id: "roomFeatures",
      name: "features",
      label: "Room Features",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "roomPrice",
      name: "price",
      label: "Room Price",
      type: "number",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "roomStatus",
      name: "status",
      label: "Room Status",
      type: "select",
      required: true,
      readOnly: false,
      options: [
        { value: "Available", label: "Available" },
        { value: "Booked", label: "Booked" },
        { value: "Pending", label: "Pending" },
      ],
      value: "Available",
    },
  ],
};

export const DASHBOARD_BOOKING_FIELD_MODAL = {
  id: "addBookingForm",
  title: "Add Booking",
  settingBtnTitle: "Edit Booking",
  fieldItems: [
    {
      id: "bookingId",
      name: "id",
      label: "Booking ID",
      type: "text",
      required: true,
      readOnly: true,
      value: "",
    },
    {
      id: "userId",
      name: "userId",
      label: "User ID",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "bookingRoom",
      name: "room",
      label: "Rooms",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "guestName",
      name: "guest",
      label: "Guest Name",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "guestPhone",
      name: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "checkIn",
      name: "checkIn",
      label: "Check In",
      type: "date",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "checkOut",
      name: "checkOut",
      label: "Check Out",
      type: "date",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "totalPrice",
      name: "totalPrice",
      label: "Total Price",
      type: "number",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "paymentStatus",
      name: "status",
      label: "Payment Status",
      type: "select",
      required: true,
      readOnly: false,
      options: [
        { value: "Paid", label: "Paid" },
        { value: "Pending", label: "Pending" },
        { value: "Cancelled", label: "Cancelled" },
      ],
      value: "Pending",
    },
  ],
};

export const DASHBOARD_ROOM_SERVICE_FIELD_MODAL = {
  id: "addRoomServiceForm",
  title: "Add Room Service",
  settingBtnTitle: "Edit Room Service",
  fieldItems: [
    {
      id: "roomServiceId",
      name: "id", //liên kết với mockData
      label: "ID",
      type: "text",
      required: true,
      readOnly: true,
      value: "",
    },
    {
      id: "roomNumber",
      name: "roomNumber", //liên kết với mockData
      label: "Room Number",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "serviceDate",
      name: "date", //liên kết với mockData
      label: "Date",
      type: "date",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "serviceStatus",
      name: "status", //liên kết với mockData
      label: "Status",
      type: "select",
      required: true,
      readOnly: false,
      options: [
        { value: "Pending", label: "Pending" },
        { value: "Progress", label: "In Progress" },
        { value: "Completed", label: "Completed" },
      ],
      value: "Pending",
    },
  ],
};

export const DASHBOARD_PARKING_SERVICE_FIELD_MODAL = {
  id: "addParkingForm",
  title: "Add Parking Service",
  settingBtnTitle: "Edit Parking Service",
  fieldItems: [
    {
      id: "parkingId",
      name: "id", //liên kết với mockData
      label: "ID",
      type: "text",
      required: true,
      readOnly: true,
      value: "",
    },
    {
      id: "bookingIdParking",
      name: "bookingId", //liên kết với mockData
      label: "Booking ID",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
    {
      id: "plateNumber",
      name: "parkingPlateNo", //liên kết với mockData
      label: "Parking Plate Number",
      type: "text",
      required: true,
      readOnly: false,
      value: "",
    },
  ],
};

export let MOCK_USERS = {
  title: "Users",
  mockData: [
    // {
    //   id: 1,
    //   name: "Jone Pit",
    //   email: "jone123@gmail.com",
    //   phone: "+84 123 456 789",
    //   password: "",
    //   role: "Customer",
    // },
    // {
    //   id: 2,
    //   name: "Jenny Dillow",
    //   email: "jennydillow@gmail.com",
    //   phone: "+84 987 654 321",
    //   password: "",
    //   role: "Staff",
    // },
    // {
    //   id: 3,
    //   name: "Alice Brown",
    //   email: "aliceB@gmail.com",
    //   phone: "+84 123 456 788",
    //   password: "",
    //   role: "Admin",
    // },
  ],
};

export let MOCK_ROOMS = {
  title: "Rooms",
  type: [],
  mockData: [
    // {
    //   name: "Room 101",
    //   type: "Economy",
    //   features: "King bed, Sea view, Balcony",
    //   price: "150",
    //   status: "Available",
    // },
    // {
    //   name: "Room 102",
    //   type: "Deluxe",
    //   features: "Queen bed, City view",
    //   price: "100",
    //   status: "Booked",
    // },
    // {
    //   name: "Room 103",
    //   type: "Premium",
    //   features: "King bed, Living room, Jacuzzi",
    //   price: "250",
    //   status: "Pending",
    // },
  ],
};

export let MOCK_BOOKINGS = {
  title: "Bookings",
  roomData: [],
  mockData: [
    // {
    //   id: 1,
    //   room: "101",
    //   userId: "",
    //   guest: "Alice",
    //   phone: "+84 123 456 789",
    //   checkIn: "2023-01-01",
    //   checkOut: "2023-01-02",
    //   totalPrice: "100",
    //   status: "Cancelled",
    // },
    // {
    //   id: 2,
    //   room: "102, 103",
    //   userId: "",
    //   guest: "Sarah Johnson",
    //   phone: "+84 987 654 321",
    //   checkIn: "2023-06-08",
    //   checkOut: "2023-06-22",
    //   totalPrice: "500",
    //   status: "Pending",
    // },
    // {
    //   id: 3,
    //   room: "204",
    //   userId: "",
    //   guest: "Michael Brown",
    //   phone: "+84 555 123 456",
    //   checkIn: "2023-06-20",
    //   checkOut: "2023-06-25",
    //   totalPrice: "1100",
    //   status: "Paid",
    // },
  ],
};

export let MOCK_REVIEWS = {
  title: "Reviews",
  mockData: [
    // {
    //   id: 1,
    //   bookingId: 1,
    //   rooms: "101",
    //   content: "Great experience, would stay again!",
    //   rating: 4,
    // },
    // {
    //   id: 2,
    //   bookingId: 2,
    //   rooms: "102, 103",
    //   content: "Clean room but noisy at night",
    //   rating: 3,
    // },
    // {
    //   id: 3,
    //   bookingId: 3,
    //   rooms: "204",
    //   content: "Perfect for our family vacation, excellent service!",
    //   rating: 5,
    // },
  ],
};

export let MOCK_ROOM_SERVICES = {
  title: "Room Service",
  mockData: [
    // {
    //   id: 1,
    //   roomNumber: "101",
    //   date: "2023-01-02",
    //   status: "Completed",
    // },
    // {
    //   id: 2,
    //   roomNumber: "102",
    //   date: "2023-05-15",
    //   status: "Pending",
    // },
    // {
    //   id: 3,
    //   roomNumber: "103",
    //   date: "2023-05-15",
    //   status: "Progress",
    // },
  ],
};

export let MOCK_PARKING_SERVICES = {
  title: "Parking Service",
  mockData: [
    // {
    //   id: 1,
    //   bookingId: 1,
    //   parkingPlateNo: "51A-12345",
    // },
    // {
    //   id: 2,
    //   bookingId: 2,
    //   parkingPlateNo: "30B-67890",
    // },
    // {
    //   id: 1,
    //   bookingId: 3,
    //   parkingPlateNo: "29A-54321",
    // },
  ],
};

export const API_URL = "http://localhost:5039/api";
