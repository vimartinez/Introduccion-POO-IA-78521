package concesionaria;

public class Camion extends VehiculoUtiliario{

    private int cantDeEjes;
    private boolean soportaAcoplado;

    public Camion(String marca, String modelo, String placa, int anio, int precio, String nroMotor, int capacidadDeCargaKg, int cantDeEjes, boolean soportaAcoplado) {
        super(marca, modelo, placa, anio, precio, nroMotor, capacidadDeCargaKg);
        this.cantDeEjes = cantDeEjes;
        this.soportaAcoplado = soportaAcoplado;
    }

    @Override
    public int calcularPrecio() {
        return getPrecio();
    }

    public int getCantDeEjes() {
        return cantDeEjes;
    }

    public void setCantDeEjes(int cantDeEjes) {
        this.cantDeEjes = cantDeEjes;
    }

    public boolean isSoportaAcoplado() {
        return soportaAcoplado;
    }

    public void setSoportaAcoplado(boolean soportaAcoplado) {
        this.soportaAcoplado = soportaAcoplado;
    }

    @Override
    public String toString() {
        return "Camion{" +
                "cantDeEjes=" + cantDeEjes +
                ", soportaAcoplado=" + soportaAcoplado +
                '}';
    }
}
