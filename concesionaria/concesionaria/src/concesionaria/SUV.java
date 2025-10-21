package concesionaria;

public class SUV extends Vehiculo{

    private int autonomiaEnKm;

    public SUV(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int autonomiaEnKm) {
        super(marca, modelo, placa, anio, precio, nroMotor);
        this.autonomiaEnKm = autonomiaEnKm;
    }

    @Override
    public int calcularPrecio() {
        return getPrecio();
    }
}
