package concesionaria;

public abstract class Vehiculo {
    private String marca;
    private String modelo;
    private String placa;
    private int anio;
    private int precio;
    private String nroMotor;

    public Vehiculo(String marca, String modelo, String placa, int anio, int precio, String nroMotor) {
        this.marca = marca;
        this.modelo = modelo;
        this.placa = placa;
        this.anio = anio;
        this.precio = precio;
        this.nroMotor = nroMotor;
    }

    public abstract int calcularPrecio();

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getNroMotor() {
        return nroMotor;
    }

    public void setNroMotor(String nroMotor) {
        this.nroMotor = nroMotor;
    }
}
