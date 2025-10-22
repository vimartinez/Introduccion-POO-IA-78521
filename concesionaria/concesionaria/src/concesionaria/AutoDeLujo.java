package concesionaria;

public class AutoDeLujo extends Auto{


    public AutoDeLujo(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int cantPasajeros, String traccion) {
        super(marca, modelo, placa, anio, precio, nroMotor, cantPasajeros, traccion);
    }

    @Override
    public int calcularPrecio() {
        int precioCalculado = (int)(getPrecio() * 0.9);
        return precioCalculado < 0 ? 0 : precioCalculado;
    }
}
