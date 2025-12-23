import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "../services/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  zalo: string;
  gmail: string;
}

interface UserContextType {
  userData: UserData | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  refreshUserData: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setIsLoading(false);
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await apiClient.me();
      if (response.success && response.user) {
        setUserData(response.user);
        setIsLoggedIn(true);
      } else {
        // Token không hợp lệ, xóa và logout
        console.warn("Token không hợp lệ hoặc không có user data");
        localStorage.removeItem("auth_token");
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);

      // Chỉ logout nếu là lỗi 401 (Unauthorized)
      // Không logout nếu là lỗi network hoặc server error
      if (error.message?.includes("401")) {
        console.warn("Token hết hạn, đăng xuất user");
        localStorage.removeItem("auth_token");
        setUserData(null);
        setIsLoggedIn(false);
      } else {
        // Lỗi network hoặc server, giữ nguyên trạng thái đăng nhập
        console.warn("Lỗi kết nối, giữ nguyên trạng thái đăng nhập");
        setIsLoggedIn(true); // Giữ trạng thái đăng nhập
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async () => {
    setIsLoading(true);
    await fetchUserData();
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUserData(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        isLoggedIn,
        refreshUserData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
