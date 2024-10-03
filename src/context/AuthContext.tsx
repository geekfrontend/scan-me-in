import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
