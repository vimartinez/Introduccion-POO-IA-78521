# DemoPOO - Sistema Bancario en Java

## 📋 Descripción

Este proyecto demuestra la implementación de **Programación Orientada a Objetos (POO)** en Java, específicamente los conceptos de **encapsulamiento** y **herencia**. El sistema simula un banco con diferentes tipos de cuentas bancarias.

## 🏗️ Arquitectura del Sistema

### Clases Implementadas

#### 1. **CuentaBancaria** (Clase Base)
- **Atributos**: `id`, `usuario`, `moneda`, `activa`
- **Funcionalidades**: 
  - Gestión básica de cuentas
  - Activación/desactivación
  - Validaciones de datos
  - Información general

#### 2. **CajaDeAhorro** (Hereda de CuentaBancaria)
- **Atributos adicionales**: `saldo`, `tasaInteres`
- **Funcionalidades específicas**:
  - Depósitos y extracciones
  - Aplicación de intereses
  - Control de saldo (no permite negativos)

#### 3. **CuentaCorriente** (Hereda de CuentaBancaria)
- **Atributos adicionales**: `saldo`, `limiteDescubierto`, `comisionMantenimiento`
- **Funcionalidades específicas**:
  - Depósitos y extracciones con límite de descubierto
  - Emisión de cheques
  - Cobro de comisión de mantenimiento
  - Control de descubierto

## 🔒 Principios de POO Implementados

### Encapsulamiento
- Todos los atributos son **privados** (`private`)
- Acceso controlado mediante **getters** y **setters**
- **Validaciones** en los setters para mantener integridad
- Constructores que inicializan objetos correctamente

### Herencia
- `CajaDeAhorro` y `CuentaCorriente` **heredan** de `CuentaBancaria`
- Uso de `super()` para constructores de clase padre
- **Sobrescritura** de métodos (`@Override`)
- Funcionalidades específicas en cada clase hija

## 📁 Estructura del Proyecto

```
DemoPOO-java/
├── CuentaBancaria.java      # Clase base con encapsulamiento
├── CajaDeAhorro.java        # Herencia: Caja de Ahorro
├── CuentaCorriente.java     # Herencia: Cuenta Corriente
├── Main.java               # Clase principal con demostraciones
└── README.md               # Este archivo
```

## 🚀 Cómo Ejecutar la Aplicación

### Prerrequisitos
- **Java Development Kit (JDK)** versión 8 o superior
- Terminal o línea de comandos

### Pasos para Ejecutar

1. **Abrir terminal** en el directorio del proyecto:
   ```bash
   cd /ruta/a/DemoPOO-java
   ```

2. **Compilar** todos los archivos Java:
   ```bash
   javac *.java
   ```

3. **Ejecutar** la aplicación:
   ```bash
   java Main
   ```

### Comandos Alternativos

Si prefieres compilar archivos individuales:
```bash
# Compilar clase base
javac CuentaBancaria.java

# Compilar clases hijas
javac CajaDeAhorro.java
javac CuentaCorriente.java

# Compilar clase principal
javac Main.java

# Ejecutar
java Main
```

## 📊 Funcionalidades Demostradas

La aplicación `Main.java` ejecuta una demostración completa que incluye:

1. **Creación de cuentas** (Caja de Ahorro y Cuenta Corriente)
2. **Operaciones bancarias**:
   - Depósitos y extracciones
   - Aplicación de intereses (Caja de Ahorro)
   - Emisión de cheques (Cuenta Corriente)
   - Cobro de comisiones

3. **Demostración de encapsulamiento**:
   - Acceso a atributos mediante getters
   - Validaciones en setters
   - Control de acceso a datos privados

4. **Demostración de herencia**:
   - Reutilización de código de clase padre
   - Métodos específicos en clases hijas
   - Polimorfismo con `toString()`

5. **Gestión de estados**:
   - Activación/desactivación de cuentas
   - Control de cuentas inactivas

## 💡 Características Destacadas

### Validaciones Implementadas
- **ID**: Debe ser mayor a 0
- **Usuario**: No puede estar vacío
- **Moneda**: Se convierte automáticamente a mayúsculas
- **Saldo**: Control de valores negativos según tipo de cuenta
- **Tasa de Interés**: Debe estar entre 0 y 1 (0% a 100%)

### Funcionalidades Específicas

#### Caja de Ahorro
- ✅ No permite saldo negativo
- ✅ Aplicación automática de intereses
- ✅ Control de estado activo/inactivo

#### Cuenta Corriente
- ✅ Límite de descubierto configurable
- ✅ Emisión de cheques con validación
- ✅ Comisión de mantenimiento
- ✅ Alertas cuando está en descubierto

## 🎯 Objetivos de Aprendizaje

Este proyecto demuestra:

1. **Encapsulamiento**: Protección de datos mediante modificadores de acceso
2. **Herencia**: Reutilización de código y jerarquía de clases
3. **Polimorfismo**: Sobrescritura de métodos
4. **Abstracción**: Separación de funcionalidades específicas
5. **Buenas prácticas**: Validaciones, manejo de errores, documentación

## 🔧 Posibles Extensiones

El proyecto puede extenderse agregando:
- **Interfaz gráfica** (Swing/JavaFX)
- **Base de datos** para persistencia
- **Más tipos de cuentas** (cuenta empresarial, cuenta joven, etc.)
- **Sistema de transacciones** entre cuentas
- **Reportes** y estadísticas
- **Validaciones más robustas**

## 📝 Notas Técnicas

- **Versión de Java**: Compatible con JDK 8+
- **Patrón**: Herencia simple con clase base abstracta
- **Manejo de errores**: Mensajes informativos en consola
- **Documentación**: Javadoc en métodos principales

---

**Desarrollado como demostración de conceptos de POO en Java** 🚀
