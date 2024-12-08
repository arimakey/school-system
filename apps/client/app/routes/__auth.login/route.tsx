import { Link, redirect, useNavigate } from "@remix-run/react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { login } from "~/api/auth";

import toast, { Toaster } from 'react-hot-toast';

export default function FormularioInicioSesion() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await toast.promise(
        login(user),
        {
          loading: 'Saving...',
          success: <b>Inicio de sesion exitoso!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      
      navigate('/')
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };
  

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-gray-600">
            Ingresa tu correo y contraseña para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                required
                className="mt-1 w-full"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                className="mt-1 w-full"
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" className="w-full py-2 text-md">
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registro"
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
