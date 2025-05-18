import { createContext, useContext, useState } from "react";

const HotelContext = createContext();
export function HotelContextProvider({ children }) {
  const [roomsBarCount, setRoomsBarCount] = useState(0);
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const [roomCounts, setRoomCounts] = useState({
    economy: 0,
    deluxe: 0,
    premium: 0,
  });
  const [extraBedCount, setExtraBedCount] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const [checkResponseData, setCheckResponseData] = useState(null);
  const [result, setResult] = useState(null);

  const [tabData, setTabData] = useState({
    users: null,
    rooms: null,
    bookings: null,
    reviews: null,
    roomservice: null,
    parkingservice: null,
  });

  const login = (response = null, tokenData = null, userData = null) => {
    if (response) {
      setIsLoggedIn(true);
      const user = response.data.user;
      const token = response.token;
      setCurrentUser(user);
      setToken(token);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } else {
      setIsLoggedIn(true);
      const user = JSON.parse(userData);
      setCurrentUser(user);
      const token = tokenData;
      setToken(token);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const roomPrices = {
    economy: 1800000,
    deluxe: 2500000,
    premium: 3000000,
    extraBed: 500000,
  };

  const updateTotalPrice = () => {
    let total = 0;

    Object.keys(roomCounts).forEach((roomType) => {
      const count = roomCounts[roomType];
      if (roomPrices[roomType]) {
        total += count * roomPrices[roomType];
      }
    });

    total += extraBedCount * roomPrices.extraBed;

    setTotalPrice(total);
  };

  const processRooms = (roomGroups) => {
    const roomTypeSet = new Set();
    const availableMap = {};
    const initMap = {};

    // Lấy initResult từ group đầu tiên
    const firstGroup = roomGroups[0] || [];

    firstGroup.forEach((room) => {
      const type = room.roomType.roomTypeName;
      roomTypeSet.add(type);

      if (!initMap[type]) {
        initMap[type] = 1;
      } else {
        initMap[type]++;
      }
    });

    // Lặp toàn bộ dữ liệu để lấy maxAvailable
    roomGroups.forEach((group) => {
      group.forEach((room) => {
        const type = room.roomType.roomTypeName;
        roomTypeSet.add(type);

        if (room.roomStatus === "available") {
          if (!availableMap[type]) {
            availableMap[type] = {
              roomTypeName: type,
              availableCount: 1,
              roomIds: [room.roomId],
            };
          } else {
            availableMap[type].availableCount += 1;
            availableMap[type].roomIds.push(room.roomId);
          }
        }
      });
    });

    // Tạo danh sách đầy đủ cho initResult và maxAvailable
    const initResult = Array.from(roomTypeSet).map((type) => ({
      roomTypeName: type,
      count: initMap[type] || 0,
    }));

    const maxAvailable = Array.from(roomTypeSet).map((type) => ({
      roomTypeName: type,
      availableCount: availableMap[type]?.availableCount || 0,
      roomIds: availableMap[type]?.roomIds || [],
    }));

    return {
      initResult,
      maxAvailable,
    };
  };

  const value = {
    roomsBarCount,
    setRoomsBarCount,
    adultsCount,
    setAdultsCount,
    childrenCount,
    setChildrenCount,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    totalPrice,
    setTotalPrice,
    roomPrices,
    updateTotalPrice,
    roomCounts,
    setRoomCounts,
    extraBedCount,
    setExtraBedCount,
    isLoggedIn,
    login,
    logout,
    currentUser,
    checkResponseData,
    setCheckResponseData,
    processRooms,
    result,
    setResult,
    tabData,
    setTabData,
  };

  return (
    <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}
