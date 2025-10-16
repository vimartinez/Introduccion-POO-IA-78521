/**
 * Clase principal que demuestra el funcionamiento de las clases
 * CuentaBancaria, CajaDeAhorro y CuentaCorriente
 * Implementando encapsulamiento y herencia
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== DEMOSTRACIÓN DE ENCAPSULAMIENTO Y HERENCIA ===\n");
        
        // Crear una Caja de Ahorro
        System.out.println("1. CREANDO CAJA DE AHORRO:");
        CajaDeAhorro cajaAhorro = new CajaDeAhorro(1001, "Juan Pérez", "ARS", true, 50000.0, 0.06);
        cajaAhorro.mostrarInformacion();
        System.out.println();
        
        // Operaciones en Caja de Ahorro
        System.out.println("2. OPERACIONES EN CAJA DE AHORRO:");
        cajaAhorro.depositar(10000.0);
        cajaAhorro.extraer(5000.0);
        cajaAhorro.aplicarIntereses();
        System.out.println();
        
        // Crear una Cuenta Corriente
        System.out.println("3. CREANDO CUENTA CORRIENTE:");
        CuentaCorriente cuentaCorriente = new CuentaCorriente(2001, "María González", "ARS", true, 
                                                             25000.0, 15000.0, 800.0);
        cuentaCorriente.mostrarInformacion();
        System.out.println();
        
        // Operaciones en Cuenta Corriente
        System.out.println("4. OPERACIONES EN CUENTA CORRIENTE:");
        cuentaCorriente.depositar(8000.0);
        cuentaCorriente.extraer(12000.0);
        cuentaCorriente.emitirCheque(5000.0, "Proveedor ABC");
        cuentaCorriente.cobrarComisionMantenimiento();
        System.out.println();
        
        // Demostrar encapsulamiento - intentar acceder a atributos privados
        System.out.println("5. DEMOSTRANDO ENCAPSULAMIENTO:");
        System.out.println("Accediendo a atributos a través de métodos públicos (getters):");
        System.out.println("ID de Caja de Ahorro: " + cajaAhorro.getId());
        System.out.println("Usuario de Cuenta Corriente: " + cuentaCorriente.getUsuario());
        System.out.println("Saldo de Caja de Ahorro: " + cajaAhorro.getSaldo());
        System.out.println("Límite de Descubierto: " + cuentaCorriente.getLimiteDescubierto());
        System.out.println();
        
        // Demostrar validaciones en setters
        System.out.println("6. DEMOSTRANDO VALIDACIONES EN SETTERS:");
        System.out.println("Intentando establecer un ID negativo:");
        cajaAhorro.setId(-5); // Esto mostrará un mensaje de error
        System.out.println("Intentando establecer un usuario vacío:");
        cajaAhorro.setUsuario(""); // Esto mostrará un mensaje de error
        System.out.println("Estableciendo valores válidos:");
        cajaAhorro.setUsuario("Juan Carlos Pérez");
        cajaAhorro.setMoneda("USD");
        System.out.println();
        
        // Demostrar herencia - mostrar información actualizada
        System.out.println("7. INFORMACIÓN ACTUALIZADA DESPUÉS DE LOS CAMBIOS:");
        cajaAhorro.mostrarInformacion();
        System.out.println();
        cuentaCorriente.mostrarInformacion();
        System.out.println();
        
        // Demostrar polimorfismo con toString()
        System.out.println("8. DEMOSTRANDO POLIMORFISMO CON toString():");
        System.out.println("Caja de Ahorro: " + cajaAhorro.toString());
        System.out.println("Cuenta Corriente: " + cuentaCorriente.toString());
        System.out.println();
        
        // Crear cuenta bancaria genérica
        System.out.println("9. CREANDO CUENTA BANCARIA GENÉRICA:");
        CuentaBancaria cuentaGenerica = new CuentaBancaria(3001, "Carlos López", "EUR", true);
        cuentaGenerica.mostrarInformacion();
        System.out.println();
        
        // Demostrar activación/desactivación
        System.out.println("10. DEMOSTRANDO ACTIVACIÓN/DESACTIVACIÓN:");
        System.out.println("Desactivando cuenta corriente:");
        cuentaCorriente.desactivar();
        System.out.println("Intentando extraer dinero de cuenta inactiva:");
        cuentaCorriente.extraer(1000.0); // Esto mostrará un mensaje de error
        System.out.println("Reactivando cuenta:");
        cuentaCorriente.activar();
        cuentaCorriente.extraer(1000.0); // Ahora sí debería funcionar
        System.out.println();
        
        System.out.println("=== FIN DE LA DEMOSTRACIÓN ===");
    }
}

