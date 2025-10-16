"""
Clase que representa una Cuenta Corriente
Hereda de CuentaBancaria
Las cuentas corrientes permiten girar en descubierto hasta un límite
"""

from cuenta_bancaria import CuentaBancaria


class CuentaCorriente(CuentaBancaria):
    """
    Clase que representa una Cuenta Corriente.
    Hereda de CuentaBancaria e implementa funcionalidades específicas de cuenta corriente.
    """
    
    def __init__(self, id_cuenta=0, usuario="", moneda="ARS", activa=True,
                 saldo=0.0, limite_descubierto=10000.0, comision_mantenimiento=500.0):
        """
        Constructor de la clase CuentaCorriente
        
        Args:
            id_cuenta (int): Identificador único de la cuenta
            usuario (str): Nombre del titular de la cuenta
            moneda (str): Moneda de la cuenta
            activa (bool): Estado de la cuenta
            saldo (float): Saldo actual de la cuenta
            limite_descubierto (float): Límite máximo de descubierto permitido
            comision_mantenimiento (float): Comisión mensual de mantenimiento
        """
        # Llamar al constructor de la clase padre
        super().__init__(id_cuenta, usuario, moneda, activa)
        self._saldo = float(saldo)
        self._limite_descubierto = max(0.0, limite_descubierto)
        self._comision_mantenimiento = max(0.0, comision_mantenimiento)
    
    # Propiedades específicas (getters)
    @property
    def saldo(self):
        """Obtiene el saldo actual de la cuenta"""
        return self._saldo
    
    @property
    def limite_descubierto(self):
        """Obtiene el límite de descubierto"""
        return self._limite_descubierto
    
    @property
    def comision_mantenimiento(self):
        """Obtiene la comisión de mantenimiento"""
        return self._comision_mantenimiento
    
    # Setters específicos con validaciones
    @saldo.setter
    def saldo(self, valor):
        """Establece el saldo (permite negativos hasta el límite)"""
        self._saldo = float(valor)
    
    @limite_descubierto.setter
    def limite_descubierto(self, valor):
        """Establece el límite de descubierto con validación"""
        if isinstance(valor, (int, float)) and valor >= 0:
            self._limite_descubierto = float(valor)
        else:
            print("Error: El límite de descubierto no puede ser negativo")
    
    @comision_mantenimiento.setter
    def comision_mantenimiento(self, valor):
        """Establece la comisión de mantenimiento con validación"""
        if isinstance(valor, (int, float)) and valor >= 0:
            self._comision_mantenimiento = float(valor)
        else:
            print("Error: La comisión de mantenimiento no puede ser negativa")
    
    def depositar(self, monto):
        """
        Deposita dinero en la cuenta corriente
        
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
        Extrae dinero de la cuenta corriente (permite descubierto)
        
        Args:
            monto (float): Cantidad a extraer
        """
        if monto > 0 and self._activa:
            saldo_disponible = self._saldo + self._limite_descubierto
            if monto <= saldo_disponible:
                self._saldo -= monto
                print(f"Extracción exitosa. Nuevo saldo: {self._saldo:.2f} {self._moneda}")
                
                # Verificar si está en descubierto
                if self._saldo < 0:
                    print(f"¡ATENCIÓN! La cuenta está en descubierto por: "
                          f"{abs(self._saldo):.2f} {self._moneda}")
            else:
                print("Error: Excede el límite de descubierto disponible")
                print(f"Saldo disponible: {saldo_disponible:.2f} {self._moneda}")
        elif not self._activa:
            print("Error: La cuenta está inactiva")
        else:
            print("Error: El monto debe ser mayor a 0")
    
    def emitir_cheque(self, monto, beneficiario):
        """
        Emite un cheque
        
        Args:
            monto (float): Cantidad del cheque
            beneficiario (str): Nombre del beneficiario
        """
        if monto > 0 and self._activa:
            print("=== EMISIÓN DE CHEQUE ===")
            print(f"Beneficiario: {beneficiario}")
            print(f"Monto: {monto:.2f} {self._moneda}")
            
            # Verificar si tiene fondos suficientes (incluyendo límite de descubierto)
            saldo_disponible = self._saldo + self._limite_descubierto
            if monto <= saldo_disponible:
                self._saldo -= monto
                print("Cheque emitido exitosamente")
                print(f"Nuevo saldo: {self._saldo:.2f} {self._moneda}")
                
                if self._saldo < 0:
                    print(f"¡ATENCIÓN! La cuenta está en descubierto por: "
                          f"{abs(self._saldo):.2f} {self._moneda}")
            else:
                print("Error: Fondos insuficientes para emitir el cheque")
                print(f"Saldo disponible: {saldo_disponible:.2f} {self._moneda}")
        elif not self._activa:
            print("Error: La cuenta está inactiva")
        else:
            print("Error: El monto debe ser mayor a 0")
    
    def cobrar_comision_mantenimiento(self):
        """
        Cobra la comisión de mantenimiento
        """
        if self._activa:
            self._saldo -= self._comision_mantenimiento
            print(f"Comisión de mantenimiento cobrada: "
                  f"{self._comision_mantenimiento:.2f} {self._moneda}")
            print(f"Nuevo saldo: {self._saldo:.2f} {self._moneda}")
        else:
            print("Error: La cuenta está inactiva")
    
    def esta_en_descubierto(self):
        """
        Verifica si la cuenta está en descubierto
        
        Returns:
            bool: True si está en descubierto, False en caso contrario
        """
        return self._saldo < 0
    
    def mostrar_informacion(self):
        """
        Muestra la información completa de la cuenta corriente
        Sobrescribe el método de la clase padre
        """
        # Llamar al método de la clase padre
        super().mostrar_informacion()
        print("=== Información de Cuenta Corriente ===")
        print(f"Saldo: {self._saldo:.2f} {self._moneda}")
        print(f"Límite de Descubierto: {self._limite_descubierto:.2f} {self._moneda}")
        print(f"Comisión de Mantenimiento: {self._comision_mantenimiento:.2f} {self._moneda}")
        estado = "EN DESCUBIERTO" if self.esta_en_descubierto() else "NORMAL"
        print(f"Estado: {estado}")
    
    def __str__(self):
        """Representación en string de la cuenta corriente"""
        return (f"CuentaCorriente(id={self._id}, usuario='{self._usuario}', "
                f"moneda='{self._moneda}', activa={self._activa}, "
                f"saldo={self._saldo:.2f}, limite_descubierto={self._limite_descubierto:.2f}, "
                f"comision_mantenimiento={self._comision_mantenimiento:.2f})")
    
    def __repr__(self):
        """Representación técnica de la cuenta corriente"""
        return self.__str__()


# Ejemplo de uso (se ejecuta solo si se llama directamente)
if __name__ == "__main__":
    # Crear una cuenta corriente de prueba
    cuenta = CuentaCorriente(2001, "María González", "ARS", True, 
                           25000.0, 15000.0, 800.0)
    cuenta.mostrar_informacion()
    
    print("\n--- Probando operaciones ---")
    cuenta.depositar(8000.0)
    cuenta.extraer(12000.0)
    cuenta.emitir_cheque(5000.0, "Proveedor ABC")
    cuenta.cobrar_comision_mantenimiento()
    
    print(f"\nRepresentación: {cuenta}")

