import React, { createContext, useContext, useState, useEffect } from "react";
import { deleteUser, getUsers, postUser, recoverPassword } from "~/api/users";
import { useAuth } from "~/context/auth.context";
import { User } from "~/interfaces/user.interface";

interface UserContextProps {
  users: User[];
  addUser: (user: User) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  recoverUserPassword: (email: string) => Promise<void>;
  isDeleteDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  isRecoverDialogOpen: boolean;
  selectedUserId: string;
  toggleDeleteDialog: (userId?: string) => void;
  toggleDetailDialog: (userId?: string) => void;
  toggleRecoverDialog: (email?: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  const [users, setUsersState] = useState<User[]>([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [isRecoverDialogOpen, setRecoverDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const fetchedUsers = await getUsers(token);
        setUsersState(fetchedUsers);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const addUser = async (user: User) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const newUser = await postUser(user, token);
      setUsersState((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      throw error;
    }
  };

  const removeUser = async (userId: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      await deleteUser(userId, token);
      setUsersState((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  };

  const recoverUserPassword = async (email: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      await recoverPassword(email, token);
    } catch (error) {
      console.error("Error al recuperar contraseña:", error);
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

  const toggleRecoverDialog = (email?: string) => {
    setSelectedUserId(email || "");
    setRecoverDialogOpen((prev) => !prev);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        removeUser,
        recoverUserPassword,
        isDeleteDialogOpen,
        isDetailDialogOpen,
        isRecoverDialogOpen,
        selectedUserId,
        toggleDeleteDialog,
        toggleDetailDialog,
        toggleRecoverDialog
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
