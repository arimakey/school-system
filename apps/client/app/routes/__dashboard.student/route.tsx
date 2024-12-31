import { useEffect, useState } from 'react'
import { findRegistersByGuardianEmail } from '~/api/student'
import { useAuth } from '~/context/auth.context'
import { Student } from '~/interfaces/students.interface'

function Route() {
  const { user, token } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.email && token) {
      // Llamar a la función para obtener los estudiantes por el email del guardián
      const fetchStudents = async () => {
        try {
          setLoading(true)
          const result = await findRegistersByGuardianEmail(user.email, token)
          setStudents(result) // Asignar los estudiantes obtenidos
        } catch (err) {
          setError('Error al obtener los estudiantes.')
        } finally {
          setLoading(false)
        }
      }

      fetchStudents()
    }
  }, [user?.email, token])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Estudiantes del padre {user?.email}</h1>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <strong>{student.name} {student.last_name}</strong>
              <div>Código: {student.code}</div>
              <div>DNI: {student.dni}</div>
              <div>Fecha de nacimiento: {new Date(student.birthdate).toLocaleDateString()}</div>
              <div>Dirección: {student.address}</div>
              <div>Teléfono: {student.phoneNumber}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron estudiantes para este padre.</p>
      )}
    </div>
  )
}

export default Route
