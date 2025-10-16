/**
 * Clase que representa una Caja de Ahorro
 * Hereda de CuentaBancaria
 * Las cajas de ahorro están diseñadas para acumular dinero a largo plazo
 */
public class CajaDeAhorro extends CuentaBancaria {
    // Atributo específico de Caja de Ahorro
    private double saldo;
    private double tasaInteres;
    
    // Constructor por defecto
    public CajaDeAhorro() {
        super(); // Llama al constructor de la clase padre
        this.saldo = 0.0;
        this.tasaInteres = 0.05; // 5% anual por defecto
    }
    
    // Constructor con parámetros
    public CajaDeAhorro(int id, String usuario, String moneda, boolean activa, double saldo, double tasaInteres) {
        super(id, usuario, moneda, activa); // Llama al constructor de la clase padre
        this.saldo = saldo;
        this.tasaInteres = tasaInteres;
    }
    
    // Getters específicos
    public double getSaldo() {
        return saldo;
    }
    
    public double getTasaInteres() {
        return tasaInteres;
    }
    
    // Setters específicos
    public void setSaldo(double saldo) {
        if (saldo >= 0) {
            this.saldo = saldo;
        } else {
            System.out.println("Error: El saldo no puede ser negativo");
        }
    }
    
    public void setTasaInteres(double tasaInteres) {
        if (tasaInteres >= 0 && tasaInteres <= 1) {
            this.tasaInteres = tasaInteres;
        } else {
            System.out.println("Error: La tasa de interés debe estar entre 0 y 1");
        }
    }
    
    // Métodos específicos de Caja de Ahorro
    
    /**
     * Método para depositar dinero en la caja de ahorro
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
     * Método para extraer dinero de la caja de ahorro
     */
    public void extraer(double monto) {
        if (monto > 0 && monto <= saldo && isActiva()) {
            saldo -= monto;
            System.out.println("Extracción exitosa. Nuevo saldo: " + saldo + " " + getMoneda());
        } else if (!isActiva()) {
            System.out.println("Error: La cuenta está inactiva");
        } else if (monto > saldo) {
            System.out.println("Error: Saldo insuficiente");
        } else {
            System.out.println("Error: El monto debe ser mayor a 0");
        }
    }
    
    /**
     * Método para calcular y aplicar intereses
     */
    public void aplicarIntereses() {
        if (isActiva() && saldo > 0) {
            double intereses = saldo * tasaInteres;
            saldo += intereses;
            System.out.println("Intereses aplicados: " + intereses + " " + getMoneda());
            System.out.println("Nuevo saldo: " + saldo + " " + getMoneda());
        } else if (!isActiva()) {
            System.out.println("Error: La cuenta está inactiva");
        } else {
            System.out.println("No hay saldo para aplicar intereses");
        }
    }
    
    /**
     * Método para mostrar información específica de Caja de Ahorro
     */
    @Override
    public void mostrarInformacion() {
        super.mostrarInformacion(); // Llama al método de la clase padre
        System.out.println("=== Información de Caja de Ahorro ===");
        System.out.println("Saldo: " + saldo + " " + getMoneda());
        System.out.println("Tasa de Interés: " + (tasaInteres * 100) + "%");
    }
    
    @Override
    public String toString() {
        return "CajaDeAhorro{" +
                "id=" + getId() +
                ", usuario='" + getUsuario() + '\'' +
                ", moneda='" + getMoneda() + '\'' +
                ", activa=" + isActiva() +
                ", saldo=" + saldo +
                ", tasaInteres=" + tasaInteres +
                '}';
    }
}

