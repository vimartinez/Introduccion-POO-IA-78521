/**
 * Clase base que representa una cuenta bancaria genérica
 * Implementa encapsulamiento con atributos privados
 */
public class CuentaBancaria {
    // Atributos privados (encapsulamiento)
    private int id;
    private String usuario;
    private String moneda;
    private boolean activa;
    
    // Constructor por defecto
    public CuentaBancaria() {
        this.id = 0;
        this.usuario = "";
        this.moneda = "ARS"; // Peso argentino por defecto
        this.activa = true;
    }
    
    // Constructor con parámetros
    public CuentaBancaria(int id, String usuario, String moneda, boolean activa) {
        this.id = id;
        this.usuario = usuario;
        this.moneda = moneda;
        this.activa = activa;
    }
    
    // Getters (métodos de acceso)
    public int getId() {
        return id;
    }
    
    public String getUsuario() {
        return usuario;
    }
    
    public String getMoneda() {
        return moneda;
    }
    
    public boolean isActiva() {
        return activa;
    }
    
    // Setters (métodos de modificación)
    public void setId(int id) {
        if (id > 0) {
            this.id = id;
        } else {
            System.out.println("Error: El ID debe ser mayor a 0");
        }
    }
    
    public void setUsuario(String usuario) {
        if (usuario != null && !usuario.trim().isEmpty()) {
            this.usuario = usuario;
        } else {
            System.out.println("Error: El usuario no puede estar vacío");
        }
    }
    
    public void setMoneda(String moneda) {
        if (moneda != null && !moneda.trim().isEmpty()) {
            this.moneda = moneda.toUpperCase();
        } else {
            System.out.println("Error: La moneda no puede estar vacía");
        }
    }
    
    public void setActiva(boolean activa) {
        this.activa = activa;
    }
    
    // Método para mostrar información de la cuenta
    public void mostrarInformacion() {
        System.out.println("=== Información de la Cuenta ===");
        System.out.println("ID: " + id);
        System.out.println("Usuario: " + usuario);
        System.out.println("Moneda: " + moneda);
        System.out.println("Estado: " + (activa ? "Activa" : "Inactiva"));
    }
    
    // Método para activar la cuenta
    public void activar() {
        this.activa = true;
        System.out.println("Cuenta activada correctamente");
    }
    
    // Método para desactivar la cuenta
    public void desactivar() {
        this.activa = false;
        System.out.println("Cuenta desactivada correctamente");
    }
    
    @Override
    public String toString() {
        return "CuentaBancaria{" +
                "id=" + id +
                ", usuario='" + usuario + '\'' +
                ", moneda='" + moneda + '\'' +
                ", activa=" + activa +
                '}';
    }
}

