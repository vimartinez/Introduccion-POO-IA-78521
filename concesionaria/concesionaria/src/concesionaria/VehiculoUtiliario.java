package concesionaria;

public abstract class VehiculoUtiliario extends Vehiculo{

    private int capacidadDeCargaKg;

    public VehiculoUtiliario(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int capacidadDeCargaKg) {
        super(marca, modelo, placa, anio, precio, nroMotor);
        this.capacidadDeCargaKg = capacidadDeCargaKg;
    }

    public int getCapacidadDeCargaKg() {
        return capacidadDeCargaKg;
    }

    public void setCapacidadDeCargaKg(int capacidadDeCargaKg) {
        this.capacidadDeCargaKg = capacidadDeCargaKg;
    }


}
