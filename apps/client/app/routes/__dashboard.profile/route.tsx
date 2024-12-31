import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useAuth } from "~/context/auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import toast from "react-hot-toast";

const UserDetailCard = () => {
  const { user, token, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "",
    image: user?.image || "",
  });

  useEffect(() => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      role: user?.role || "",
      image: user?.image || "",
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:3000/api/upload/image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }

        const { url } = await response.json();
        setFormData((prev) => ({ ...prev, image: url }));

        toast.success("Imagen subida correctamente");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        toast.error("Error al subir la imagen");
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email) {
      toast.error("El nombre de usuario y el correo electrónico son obligatorios.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5173/api/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          image: formData.image,
        }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);

      toast.success("Datos actualizados correctamente");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      toast.error("Error al guardar los cambios");
    }
  };

  return (
    <div className="w-full flex items-center h-full justify-center">
      <Card className="max-w-md shadow-lg">
        <CardHeader className="flex items-center flex-col">
          <Avatar className="h-40 w-40 flex items-center justify-center">
            <AvatarImage src={formData.image || ""} alt={formData.username} />
            <AvatarFallback className="text-4xl">
              {formData.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-xl font-semibold">
            {isEditing ? (
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Nombre de usuario"
              />
            ) : (
              formData.username
            )}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {isEditing ? (
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
              />
            ) : (
              formData.email
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between gap-12">
            <span className="font-semibold">Rol:</span>
            <div>{formData.role || "Sin asignar"}</div>
          </div>
          <div className="flex justify-between gap-12">
            <span className="font-semibold">ID de Usuario:</span>
            <span>{user?._id}</span>
          </div>
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subir Imagen
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                className="w-full"
                onClick={handleSubmit}
              >
                Guardar Cambios
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEditing(true)}
            >
              Editar Usuario
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetailCard;
