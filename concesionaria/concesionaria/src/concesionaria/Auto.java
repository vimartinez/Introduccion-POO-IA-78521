package concesionaria;

public abstract class Auto extends Vehiculo{

    private int cantPasajeros;
    private String traccion;

    public Auto(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int cantPasajeros, String traccion) {
        super(marca, modelo, placa, anio, precio, nroMotor);
        this.cantPasajeros = cantPasajeros;
        this.traccion = traccion;
    }

    public int getCantPasajeros() {
        return cantPasajeros;
    }

    public void setCantPasajeros(int cantPasajeros) {
        this.cantPasajeros = cantPasajeros;
    }

    public String getTraccion() {
        return traccion;
    }

    public void setTraccion(String traccion) {
        this.traccion = traccion;
    }

    @Override
    public int calcularPrecio() {
        return getPrecio();
    }

}
