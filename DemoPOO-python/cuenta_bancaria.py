"""
Clase base que representa una cuenta bancaria genérica
Implementa encapsulamiento con atributos privados usando convenciones de Python
"""


class CuentaBancaria:
    """
    Clase base para representar una cuenta bancaria genérica.
    Implementa encapsulamiento usando convenciones de Python (atributos con _)
    """
    
    def __init__(self, id_cuenta=0, usuario="", moneda="ARS", activa=True):
        """
        Constructor de la clase CuentaBancaria
        
        Args:
            id_cuenta (int): Identificador único de la cuenta
            usuario (str): Nombre del titular de la cuenta
            moneda (str): Moneda de la cuenta (ARS por defecto)
            activa (bool): Estado de la cuenta (True = activa, False = inactiva)
        """
        self._id = id_cuenta
        self._usuario = usuario
        self._moneda = moneda.upper() if moneda else "ARS"
        self._activa = activa
    
    # Propiedades (getters) - Encapsulamiento
    @property
    def id(self):
        """Obtiene el ID de la cuenta"""
        return self._id
    
    @property
    def usuario(self):
        """Obtiene el nombre del usuario"""
        return self._usuario
    
    @property
    def moneda(self):
        """Obtiene la moneda de la cuenta"""
        return self._moneda
    
    @property
    def activa(self):
        """Obtiene el estado de la cuenta"""
        return self._activa
    
    # Setters con validaciones - Encapsulamiento
    @id.setter
    def id(self, valor):
        """Establece el ID de la cuenta con validación"""
        if isinstance(valor, int) and valor > 0:
            self._id = valor
        else:
            print("Error: El ID debe ser un entero mayor a 0")
    
    @usuario.setter
    def usuario(self, valor):
        """Establece el usuario con validación"""
        if valor and valor.strip():
            self._usuario = valor.strip()
        else:
            print("Error: El usuario no puede estar vacío")
    
    @moneda.setter
    def moneda(self, valor):
        """Establece la moneda con validación"""
        if valor and valor.strip():
            self._moneda = valor.strip().upper()
        else:
            print("Error: La moneda no puede estar vacía")
    
    @activa.setter
    def activa(self, valor):
        """Establece el estado de la cuenta"""
        self._activa = bool(valor)
    
    def mostrar_informacion(self):
        """Muestra la información básica de la cuenta"""
        print("=== Información de la Cuenta ===")
        print(f"ID: {self._id}")
        print(f"Usuario: {self._usuario}")
        print(f"Moneda: {self._moneda}")
        print(f"Estado: {'Activa' if self._activa else 'Inactiva'}")
    
    def activar(self):
        """Activa la cuenta"""
        self._activa = True
        print("Cuenta activada correctamente")
    
    def desactivar(self):
        """Desactiva la cuenta"""
        self._activa = False
        print("Cuenta desactivada correctamente")
    
    def __str__(self):
        """Representación en string de la cuenta"""
        return (f"CuentaBancaria(id={self._id}, usuario='{self._usuario}', "
                f"moneda='{self._moneda}', activa={self._activa})")
    
    def __repr__(self):
        """Representación técnica de la cuenta"""
        return self.__str__()


# Ejemplo de uso (se ejecuta solo si se llama directamente)
if __name__ == "__main__":
    # Crear una cuenta bancaria de prueba
    cuenta = CuentaBancaria(1001, "Usuario de Prueba", "ARS", True)
    cuenta.mostrar_informacion()
    
    # Probar encapsulamiento
    print("\n--- Probando Encapsulamiento ---")
    cuenta.id = -5  # Esto debería mostrar un error
    cuenta.usuario = ""  # Esto debería mostrar un error
    cuenta.moneda = "usd"  # Esto debería funcionar y convertir a mayúsculas
    
    print(f"\nUsuario actualizado: {cuenta.usuario}")
    print(f"Moneda actualizada: {cuenta.moneda}")
