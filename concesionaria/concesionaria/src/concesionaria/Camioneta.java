package concesionaria;

public class Camioneta extends VehiculoUtiliario{

    private boolean esDobleCabina;
    private int cantPasajeros;

    public Camioneta(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int capacidadDeCargaKg, boolean esDobleCabina, int cantPasajeros) {
        super(marca, modelo, placa, anio, precio, nroMotor, capacidadDeCargaKg);
        this.esDobleCabina = esDobleCabina;
        this.cantPasajeros = cantPasajeros;
    }

    @Override
    public int calcularPrecio() {
        return getPrecio();
    }

    public boolean isEsDobleCabina() {
        return esDobleCabina;
    }

    public void setEsDobleCabina(boolean esDobleCabina) {
        this.esDobleCabina = esDobleCabina;
    }

    public int getCantPasajeros() {
        return cantPasajeros;
    }

    public void setCantPasajeros(int cantPasajeros) {}
}
