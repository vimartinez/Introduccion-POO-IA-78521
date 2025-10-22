package test.concesionaria;

import concesionaria.AutoDeLujo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;
import static org.junit.jupiter.api.Assertions.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AutoDeLujoTest {

    @Test
    public void testCalcularPrecioConPrecioPositivo() {
        AutoDeLujo auto = new AutoDeLujo("BMW", "X5", "ABC123", 2023, 100000, "MOT001", 5, "AWD");
        int precioCalculado = auto.calcularPrecio();
        assertEquals(90000, precioCalculado);
    }

    @Test
    public void testCalcularPrecioConPrecioCero() {
        AutoDeLujo auto = new AutoDeLujo("Mercedes", "C-Class", "DEF456", 2022, 0, "MOT002", 4, "FWD");
        int precioCalculado = auto.calcularPrecio();
        assertEquals(0, precioCalculado);
    }

    @Test
    public void testCalcularPrecioConPrecioAlto() {
        AutoDeLujo auto = new AutoDeLujo("Porsche", "911", "GHI789", 2024, 200000, "MOT003", 2, "RWD");
        int precioCalculado = auto.calcularPrecio();
        assertEquals(180000, precioCalculado);
    }

    @Test
    public void testCalcularPrecioConPrecioBajo() {
        AutoDeLujo auto = new AutoDeLujo("Audi", "A3", "JKL012", 2021, 50000, "MOT004", 5, "FWD");
        int precioCalculado = auto.calcularPrecio();
        assertEquals(45000, precioCalculado);
    }

    @Test
    public void testCalcularPrecioConPrecioImpar() {
        AutoDeLujo auto = new AutoDeLujo("Lexus", "RX", "MNO345", 2023, 75000, "MOT005", 7, "AWD");
        int precioCalculado = auto.calcularPrecio();
        assertEquals(67500, precioCalculado);
    }

    @Test
    public void testCalcularPrecioConPrecioNegativo() {
        AutoDeLujo auto = new AutoDeLujo("Tesla", "Model S", "PQR678", 2023, -50000, "MOT006", 5, "AWD");
        int precioCalculado = auto.calcularPrecio();
        assertEquals(0, precioCalculado);
    }
}