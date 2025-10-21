package concesionaria;

public class AutoDeLujo extends Auto{


    public AutoDeLujo(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int cantPasajeros, String traccion) {
        super(marca, modelo, placa, anio, precio, nroMotor, cantPasajeros, traccion);
    }

    @Override
    public int calcularPrecio() {
        return (int)(getPrecio() * 0.9);
    }
}
