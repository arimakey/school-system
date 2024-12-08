import React, { createContext, useContext, useState, useEffect } from "react";
import { deleteUser, getUsers, postUser } from "~/api/users";
import { useAuth } from "~/context/auth-context";
import { User } from "~/interfaces/user.interface";

interface UserContextProps {
  users: User[];
  addUser: (user: User) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  isDeleteDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  selectedUserId: string;
  toggleDeleteDialog: (userId?: string) => void;
  toggleDetailDialog: (userId?: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [users, setUsersState] = useState<User[]>([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const fetchedUsers: User[] = await getUsers(token);
          setUsersState(fetchedUsers);
        } catch (error: any) {
          console.error("Error al cargar los usuarios:", error.message);
        }
      }
    };

    fetchUsers();
  }, [token]);

  const addUser = async (user: User) => {
    try {
      if (!token) throw new Error("Token no encontrado");
      await postUser(user, token).then((newUser)=>{
          setUsersState((prevUsers) => [...prevUsers, newUser]);
      })
    } catch (error: any) {
      throw error
    }
  };

  const removeUser = async (userId: string) => {
    try {
      if (!token) throw new Error("Token no encontrado");
      await deleteUser(userId, token);
      setUsersState((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error: any) {
      throw error;
    }
  };

  const toggleDeleteDialog = (userId?: string) => {
    setSelectedUserId(userId || "");
    setDeleteDialogOpen((prev) => !prev);
  };

  const toggleDetailDialog = (userId?: string) => {
    setSelectedUserId(userId || "");
    setDetailDialogOpen((prev) => !prev);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        removeUser,
        isDeleteDialogOpen,
        isDetailDialogOpen,
        selectedUserId,
        toggleDeleteDialog,
        toggleDetailDialog,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers debe ser usado dentro de un UserProvider");
  }
  return context;
};
