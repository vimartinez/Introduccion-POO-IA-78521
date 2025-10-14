/**
 * Clase que representa una Cuenta Corriente
 * Hereda de CuentaBancaria
 * Las cuentas corrientes permiten girar en descubierto hasta un límite
 */
public class CuentaCorriente extends CuentaBancaria {
    // Atributos específicos de Cuenta Corriente
    private double saldo;
    private double limiteDescubierto;
    private double comisionMantenimiento;
    
    // Constructor por defecto
    public CuentaCorriente() {
        super(); // Llama al constructor de la clase padre
        this.saldo = 0.0;
        this.limiteDescubierto = 10000.0; // $10,000 por defecto
        this.comisionMantenimiento = 500.0; // $500 por defecto
    }
    
    // Constructor con parámetros
    public CuentaCorriente(int id, String usuario, String moneda, boolean activa, 
                          double saldo, double limiteDescubierto, double comisionMantenimiento) {
        super(id, usuario, moneda, activa); // Llama al constructor de la clase padre
        this.saldo = saldo;
        this.limiteDescubierto = limiteDescubierto;
        this.comisionMantenimiento = comisionMantenimiento;
    }
    
    // Getters específicos
    public double getSaldo() {
        return saldo;
    }
    
    public double getLimiteDescubierto() {
        return limiteDescubierto;
    }
    
    public double getComisionMantenimiento() {
        return comisionMantenimiento;
    }
    
    // Setters específicos
    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }
    
    public void setLimiteDescubierto(double limiteDescubierto) {
        if (limiteDescubierto >= 0) {
            this.limiteDescubierto = limiteDescubierto;
        } else {
            System.out.println("Error: El límite de descubierto no puede ser negativo");
        }
    }
    
    public void setComisionMantenimiento(double comisionMantenimiento) {
        if (comisionMantenimiento >= 0) {
            this.comisionMantenimiento = comisionMantenimiento;
        } else {
            System.out.println("Error: La comisión de mantenimiento no puede ser negativa");
        }
    }
    
    // Métodos específicos de Cuenta Corriente
    
    /**
     * Método para depositar dinero en la cuenta corriente
     */
    public void depositar(double monto) {
        if (monto > 0 && isActiva()) {
            saldo += monto;
            System.out.println("Depósito exitoso. Nuevo saldo: " + saldo + " " + getMoneda());
        } else if (!isActiva()) {
            System.out.println("Error: La cuenta está inactiva");
        } else {
            System.out.println("Error: El monto debe ser mayor a 0");
        }
    }
    
    /**
     * Método para extraer dinero de la cuenta corriente (permite descubierto)
     */
    public void extraer(double monto) {
        if (monto > 0 && isActiva()) {
            double saldoDisponible = saldo + limiteDescubierto;
            if (monto <= saldoDisponible) {
                saldo -= monto;
                System.out.println("Extracción exitosa. Nuevo saldo: " + saldo + " " + getMoneda());
                
                // Verificar si está en descubierto
                if (saldo < 0) {
                    System.out.println("¡ATENCIÓN! La cuenta está en descubierto por: " + 
                                     Math.abs(saldo) + " " + getMoneda());
                }
            } else {
                System.out.println("Error: Excede el límite de descubierto disponible");
                System.out.println("Saldo disponible: " + saldoDisponible + " " + getMoneda());
            }
        } else if (!isActiva()) {
            System.out.println("Error: La cuenta está inactiva");
        } else {
            System.out.println("Error: El monto debe ser mayor a 0");
        }
    }
    
    /**
     * Método para emitir un cheque
     */
    public void emitirCheque(double monto, String beneficiario) {
        if (monto > 0 && isActiva()) {
            System.out.println("=== EMISIÓN DE CHEQUE ===");
            System.out.println("Beneficiario: " + beneficiario);
            System.out.println("Monto: " + monto + " " + getMoneda());
            
            // Verificar si tiene fondos suficientes (incluyendo límite de descubierto)
            double saldoDisponible = saldo + limiteDescubierto;
            if (monto <= saldoDisponible) {
                saldo -= monto;
                System.out.println("Cheque emitido exitosamente");
                System.out.println("Nuevo saldo: " + saldo + " " + getMoneda());
                
                if (saldo < 0) {
                    System.out.println("¡ATENCIÓN! La cuenta está en descubierto por: " + 
                                     Math.abs(saldo) + " " + getMoneda());
                }
            } else {
                System.out.println("Error: Fondos insuficientes para emitir el cheque");
                System.out.println("Saldo disponible: " + saldoDisponible + " " + getMoneda());
            }
        } else if (!isActiva()) {
            System.out.println("Error: La cuenta está inactiva");
        } else {
            System.out.println("Error: El monto debe ser mayor a 0");
        }
    }
    
    /**
     * Método para cobrar comisión de mantenimiento
     */
    public void cobrarComisionMantenimiento() {
        if (isActiva()) {
            saldo -= comisionMantenimiento;
            System.out.println("Comisión de mantenimiento cobrada: " + comisionMantenimiento + " " + getMoneda());
            System.out.println("Nuevo saldo: " + saldo + " " + getMoneda());
        } else {
            System.out.println("Error: La cuenta está inactiva");
        }
    }
    
    /**
     * Método para verificar si la cuenta está en descubierto
     */
    public boolean estaEnDescubierto() {
        return saldo < 0;
    }
    
    /**
     * Método para mostrar información específica de Cuenta Corriente
     */
    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion(); // Llama al método de la clase padre
        System.out.println("=== Información de Cuenta Corriente ===");
        System.out.println("Saldo: " + saldo + " " + getMoneda());
        System.out.println("Límite de Descubierto: " + limiteDescubierto + " " + getMoneda());
        System.out.println("Comisión de Mantenimiento: " + comisionMantenimiento + " " + getMoneda());
        System.out.println("Estado: " + (estaEnDescubierto() ? "EN DESCUBIERTO" : "NORMAL"));
    }
    
    @Override
    public String toString() {
        return "CuentaCorriente{" +
                "id=" + getId() +
                ", usuario='" + getUsuario() + '\'' +
                ", moneda='" + getMoneda() + '\'' +
                ", activa=" + isActiva() +
                ", saldo=" + saldo +
                ", limiteDescubierto=" + limiteDescubierto +
                ", comisionMantenimiento=" + comisionMantenimiento +
                '}';
    }
}
