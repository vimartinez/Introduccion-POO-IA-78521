import concesionaria.*;

public class Main {
    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.println("Intro POO - ej Concesionaria");

        // Vehiculo vehiculo1 = new Vehiculo();

        SUV suv1 = new SUV("Ford", "Territory", "ABC123", 2018, 1000000, "123456789", 500);

        System.out.println("El vehiculo es:" + suv1.getMarca() + " " + suv1.getModelo() + " " + suv1.getAnio());
        System.out.println("Precio: " + suv1.calcularPrecio());

        Camion camion1 = new Camion("Mercedes Benz", "1114", "DEF456", 2015, 2000000, "987654321", 7000, 4, true);
        System.out.println("El vehiculo es:" + camion1.getMarca() + " " + camion1.getModelo() + " " + camion1.getAnio());
        System.out.println("Precio: " + camion1.calcularPrecio());

        Camioneta camioneta1 = new Camioneta("Toyota", "Hilux", "GHI789", 2020, 1500000, "192837465", 1000, true, 5);
        System.out.println("El vehiculo es:" + camioneta1.getMarca() + " " + camioneta1.getModelo() + " " + camioneta1.getAnio());
        System.out.println("Precio: " + camioneta1.calcularPrecio());

        Auto auto1 = new AutoDeLujo("Ferrari","F40", "AA-198-FF", 2018, 5000000,"ERRE8799788EE",4,"Trasera");
        System.out.println("El vehiculo es:" + auto1.getMarca() + " " + auto1.getModelo() + " Precio Cargado: " + auto1.getPrecio());
        System.out.println("Precio con descuento: " + auto1.calcularPrecio());
    }

}