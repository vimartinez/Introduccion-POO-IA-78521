"""
Clase que representa una Caja de Ahorro
Hereda de CuentaBancaria
Las cajas de ahorro están diseñadas para acumular dinero a largo plazo
"""

from cuenta_bancaria import CuentaBancaria


class CajaDeAhorro(CuentaBancaria):
    """
    Clase que representa una Caja de Ahorro.
    Hereda de CuentaBancaria e implementa funcionalidades específicas de ahorro.
    """
    
    def __init__(self, id_cuenta=0, usuario="", moneda="ARS", activa=True, 
                 saldo=0.0, tasa_interes=0.05):
        """
        Constructor de la clase CajaDeAhorro
        
        Args:
            id_cuenta (int): Identificador único de la cuenta
            usuario (str): Nombre del titular de la cuenta
            moneda (str): Moneda de la cuenta
            activa (bool): Estado de la cuenta
            saldo (float): Saldo actual de la cuenta
            tasa_interes (float): Tasa de interés anual (0.05 = 5%)
        """
        # Llamar al constructor de la clase padre
        super().__init__(id_cuenta, usuario, moneda, activa)
        self._saldo = max(0.0, saldo)  # No permite saldo negativo
        self._tasa_interes = max(0.0, min(1.0, tasa_interes))  # Entre 0 y 1
    
    # Propiedades específicas (getters)
    @property
    def saldo(self):
        """Obtiene el saldo actual de la cuenta"""
        return self._saldo
    
    @property
    def tasa_interes(self):
        """Obtiene la tasa de interés anual"""
        return self._tasa_interes
    
    # Setters específicos con validaciones
    @saldo.setter
    def saldo(self, valor):
        """Establece el saldo con validación (no puede ser negativo)"""
        if isinstance(valor, (int, float)) and valor >= 0:
            self._saldo = float(valor)
        else:
            print("Error: El saldo no puede ser negativo")
    
    @tasa_interes.setter
    def tasa_interes(self, valor):
        """Establece la tasa de interés con validación (entre 0 y 1)"""
        if isinstance(valor, (int, float)) and 0 <= valor <= 1:
            self._tasa_interes = float(valor)
        else:
            print("Error: La tasa de interés debe estar entre 0 y 1")
    
    def depositar(self, monto):
        """
        Deposita dinero en la caja de ahorro
        
        Args:
            monto (float): Cantidad a depositar
        """
        if monto > 0 and self._activa:
            self._saldo += monto
            print(f"Depósito exitoso. Nuevo saldo: {self._saldo:.2f} {self._moneda}")
        elif not self._activa:
            print("Error: La cuenta está inactiva")
        else:
            print("Error: El monto debe ser mayor a 0")
    
    def extraer(self, monto):
        """
        Extrae dinero de la caja de ahorro
        
        Args:
            monto (float): Cantidad a extraer
        """
        if monto > 0 and monto <= self._saldo and self._activa:
            self._saldo -= monto
            print(f"Extracción exitosa. Nuevo saldo: {self._saldo:.2f} {self._moneda}")
        elif not self._activa:
            print("Error: La cuenta está inactiva")
        elif monto > self._saldo:
            print("Error: Saldo insuficiente")
        else:
            print("Error: El monto debe ser mayor a 0")
    
    def aplicar_intereses(self):
        """
        Calcula y aplica los intereses a la cuenta
        """
        if self._activa and self._saldo > 0:
            intereses = self._saldo * self._tasa_interes
            self._saldo += intereses
            print(f"Intereses aplicados: {intereses:.2f} {self._moneda}")
            print(f"Nuevo saldo: {self._saldo:.2f} {self._moneda}")
        elif not self._activa:
            print("Error: La cuenta está inactiva")
        else:
            print("No hay saldo para aplicar intereses")
    
    def mostrar_informacion(self):
        """
        Muestra la información completa de la caja de ahorro
        Sobrescribe el método de la clase padre
        """
        # Llamar al método de la clase padre
        super().mostrar_informacion()
        print("=== Información de Caja de Ahorro ===")
        print(f"Saldo: {self._saldo:.2f} {self._moneda}")
        print(f"Tasa de Interés: {self._tasa_interes * 100:.1f}%")
    
    def __str__(self):
        """Representación en string de la caja de ahorro"""
        return (f"CajaDeAhorro(id={self._id}, usuario='{self._usuario}', "
                f"moneda='{self._moneda}', activa={self._activa}, "
                f"saldo={self._saldo:.2f}, tasa_interes={self._tasa_interes})")
    
    def __repr__(self):
        """Representación técnica de la caja de ahorro"""
        return self.__str__()


# Ejemplo de uso (se ejecuta solo si se llama directamente)
if __name__ == "__main__":
    # Crear una caja de ahorro de prueba
    caja = CajaDeAhorro(1001, "Juan Pérez", "ARS", True, 50000.0, 0.06)
    caja.mostrar_informacion()
    
    print("\n--- Probando operaciones ---")
    caja.depositar(10000.0)
    caja.extraer(5000.0)
    caja.aplicar_intereses()
    
    print(f"\nRepresentación: {caja}")

