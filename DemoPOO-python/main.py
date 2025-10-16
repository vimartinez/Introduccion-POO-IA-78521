"""
Script principal que demuestra el funcionamiento de las clases
CuentaBancaria, CajaDeAhorro y CuentaCorriente
Implementando encapsulamiento y herencia en Python
"""

from cuenta_bancaria import CuentaBancaria
from caja_de_ahorro import CajaDeAhorro
from cuenta_corriente import CuentaCorriente


def main():
    """Función principal que ejecuta todas las demostraciones"""
    print("=== DEMOSTRACIÓN DE ENCAPSULAMIENTO Y HERENCIA EN PYTHON ===\n")
    
    # Crear una Caja de Ahorro
    print("1. CREANDO CAJA DE AHORRO:")
    caja_ahorro = CajaDeAhorro(1001, "Juan Pérez", "ARS", True, 50000.0, 0.06)
    caja_ahorro.mostrar_informacion()
    print()
    
    # Operaciones en Caja de Ahorro
    print("2. OPERACIONES EN CAJA DE AHORRO:")
    caja_ahorro.depositar(10000.0)
    caja_ahorro.extraer(5000.0)
    caja_ahorro.aplicar_intereses()
    print()
    
    # Crear una Cuenta Corriente
    print("3. CREANDO CUENTA CORRIENTE:")
    cuenta_corriente = CuentaCorriente(2001, "María González", "ARS", True, 
                                     25000.0, 15000.0, 800.0)
    cuenta_corriente.mostrar_informacion()
    print()
    
    # Operaciones en Cuenta Corriente
    print("4. OPERACIONES EN CUENTA CORRIENTE:")
    cuenta_corriente.depositar(8000.0)
    cuenta_corriente.extraer(12000.0)
    cuenta_corriente.emitir_cheque(5000.0, "Proveedor ABC")
    cuenta_corriente.cobrar_comision_mantenimiento()
    print()
    
    # Demostrar encapsulamiento - acceder a atributos a través de propiedades
    print("5. DEMOSTRANDO ENCAPSULAMIENTO:")
    print("Accediendo a atributos a través de propiedades (getters):")
    print(f"ID de Caja de Ahorro: {caja_ahorro.id}")
    print(f"Usuario de Cuenta Corriente: {cuenta_corriente.usuario}")
    print(f"Saldo de Caja de Ahorro: {caja_ahorro.saldo:.2f}")
    print(f"Límite de Descubierto: {cuenta_corriente.limite_descubierto:.2f}")
    print()
    
    # Demostrar validaciones en setters
    print("6. DEMOSTRANDO VALIDACIONES EN SETTERS:")
    print("Intentando establecer un ID negativo:")
    caja_ahorro.id = -5  # Esto mostrará un mensaje de error
    print("Intentando establecer un usuario vacío:")
    caja_ahorro.usuario = ""  # Esto mostrará un mensaje de error
    print("Estableciendo valores válidos:")
    caja_ahorro.usuario = "Juan Carlos Pérez"
    caja_ahorro.moneda = "USD"
    print()
    
    # Demostrar herencia - mostrar información actualizada
    print("7. INFORMACIÓN ACTUALIZADA DESPUÉS DE LOS CAMBIOS:")
    caja_ahorro.mostrar_informacion()
    print()
    cuenta_corriente.mostrar_informacion()
    print()
    
    # Demostrar polimorfismo con __str__()
    print("8. DEMOSTRANDO POLIMORFISMO CON __str__():")
    print(f"Caja de Ahorro: {caja_ahorro}")
    print(f"Cuenta Corriente: {cuenta_corriente}")
    print()
    
    # Crear cuenta bancaria genérica
    print("9. CREANDO CUENTA BANCARIA GENÉRICA:")
    cuenta_generica = CuentaBancaria(3001, "Carlos López", "EUR", True)
    cuenta_generica.mostrar_informacion()
    print()
    
    # Demostrar activación/desactivación
    print("10. DEMOSTRANDO ACTIVACIÓN/DESACTIVACIÓN:")
    print("Desactivando cuenta corriente:")
    cuenta_corriente.desactivar()
    print("Intentando extraer dinero de cuenta inactiva:")
    cuenta_corriente.extraer(1000.0)  # Esto mostrará un mensaje de error
    print("Reactivando cuenta:")
    cuenta_corriente.activar()
    cuenta_corriente.extraer(1000.0)  # Ahora sí debería funcionar
    print()
    
    # Demostrar características específicas de Python
    print("11. CARACTERÍSTICAS ESPECÍFICAS DE PYTHON:")
    print("Verificando tipos de objetos:")
    print(f"caja_ahorro es instancia de CajaDeAhorro: {isinstance(caja_ahorro, CajaDeAhorro)}")
    print(f"caja_ahorro es instancia de CuentaBancaria: {isinstance(caja_ahorro, CuentaBancaria)}")
    print(f"cuenta_corriente es instancia de CuentaCorriente: {isinstance(cuenta_corriente, CuentaCorriente)}")
    print(f"cuenta_corriente es instancia de CuentaBancaria: {isinstance(cuenta_corriente, CuentaBancaria)}")
    
    # Demostrar uso de propiedades avanzadas
    print("\nProbando propiedades avanzadas:")
    print(f"Saldo actual de caja de ahorro: {caja_ahorro.saldo:.2f}")
    caja_ahorro.saldo = 75000.0  # Usando el setter
    print(f"Nuevo saldo: {caja_ahorro.saldo:.2f}")
    
    # Intentar establecer saldo negativo (debería fallar)
    print("Intentando establecer saldo negativo:")
    caja_ahorro.saldo = -1000.0  # Esto debería mostrar un error
    print()
    
    # Demostrar diferencias entre tipos de cuenta
    print("12. COMPARANDO TIPOS DE CUENTA:")
    print("--- Caja de Ahorro ---")
    print(f"Permite saldo negativo: No")
    print(f"Tiene límite de descubierto: No")
    print(f"Aplica intereses: Sí")
    print(f"Tasa de interés: {caja_ahorro.tasa_interes * 100:.1f}%")
    
    print("\n--- Cuenta Corriente ---")
    print(f"Permite saldo negativo: Sí (hasta límite)")
    print(f"Límite de descubierto: {cuenta_corriente.limite_descubierto:.2f}")
    print(f"Aplica intereses: No")
    print(f"Comisión de mantenimiento: {cuenta_corriente.comision_mantenimiento:.2f}")
    print()
    
    print("=== FIN DE LA DEMOSTRACIÓN ===")


def demostrar_herencia_multiple():
    """Función adicional para demostrar conceptos avanzados de herencia"""
    print("\n=== DEMOSTRACIÓN AVANZADA DE HERENCIA ===")
    
    # Crear lista de cuentas (polimorfismo)
    cuentas = [
        CajaDeAhorro(4001, "Ana García", "USD", True, 10000.0, 0.04),
        CuentaCorriente(4002, "Pedro López", "EUR", True, 5000.0, 2000.0, 100.0),
        CuentaBancaria(4003, "Laura Martín", "ARS", True)
    ]
    
    print("Procesando diferentes tipos de cuentas:")
    for i, cuenta in enumerate(cuentas, 1):
        print(f"\n--- Cuenta {i} ---")
        print(f"Tipo: {type(cuenta).__name__}")
        cuenta.mostrar_informacion()
        
        # Operaciones específicas según el tipo
        if isinstance(cuenta, CajaDeAhorro):
            cuenta.depositar(1000.0)
            cuenta.aplicar_intereses()
        elif isinstance(cuenta, CuentaCorriente):
            cuenta.depositar(500.0)
            cuenta.emitir_cheque(200.0, "Beneficiario Test")
        else:
            print("Cuenta genérica - sin operaciones específicas")


if __name__ == "__main__":
    # Ejecutar demostración principal
    main()
    
    # Ejecutar demostración avanzada
    demostrar_herencia_multiple()

