# DemoPOO - Sistema Bancario en Python

## 📋 Descripción

Este proyecto demuestra la implementación de **Programación Orientada a Objetos (POO)** en Python, específicamente los conceptos de **encapsulamiento** y **herencia**. El sistema simula un banco con diferentes tipos de cuentas bancarias, migrado desde la versión Java original.

## 🏗️ Arquitectura del Sistema

### Clases Implementadas

#### 1. **CuentaBancaria** (Clase Base)
- **Atributos**: `_id`, `_usuario`, `_moneda`, `_activa` (encapsulados con convención `_`)
- **Funcionalidades**: 
  - Gestión básica de cuentas
  - Activación/desactivación
  - Validaciones de datos mediante propiedades (`@property`)
  - Información general

#### 2. **CajaDeAhorro** (Hereda de CuentaBancaria)
- **Atributos adicionales**: `_saldo`, `_tasa_interes`
- **Funcionalidades específicas**:
  - Depósitos y extracciones
  - Aplicación de intereses
  - Control de saldo (no permite negativos)

#### 3. **CuentaCorriente** (Hereda de CuentaBancaria)
- **Atributos adicionales**: `_saldo`, `_limite_descubierto`, `_comision_mantenimiento`
- **Funcionalidades específicas**:
  - Depósitos y extracciones con límite de descubierto
  - Emisión de cheques
  - Cobro de comisión de mantenimiento
  - Control de descubierto

## 🔒 Principios de POO Implementados

### Encapsulamiento en Python
- Atributos **privados** usando convención `_` (guión bajo)
- **Propiedades** (`@property`) para getters automáticos
- **Setters** con decoradores `@atributo.setter` para validaciones
- **Validaciones** en setters para mantener integridad
- Constructores que inicializan objetos correctamente

### Herencia en Python
- `CajaDeAhorro` y `CuentaCorriente` **heredan** de `CuentaBancaria`
- Uso de `super().__init__()` para constructores de clase padre
- **Sobrescritura** de métodos (`mostrar_informacion()`, `__str__()`)
- Funcionalidades específicas en cada clase hija

## 📁 Estructura del Proyecto

```
DemoPOO-python/
├── cuenta_bancaria.py       # Clase base con encapsulamiento
├── caja_de_ahorro.py        # Herencia: Caja de Ahorro
├── cuenta_corriente.py      # Herencia: Cuenta Corriente
├── main.py                  # Script principal con demostraciones
└── README.md               # Este archivo
```

## 🚀 Cómo Ejecutar la Aplicación

### Prerrequisitos
- **Python** versión 3.7 o superior
- Terminal o línea de comandos

### Pasos para Ejecutar

1. **Abrir terminal** en el directorio del proyecto:
   ```bash
   cd /ruta/a/DemoPOO-python
   ```

2. **Ejecutar** la aplicación principal:
   ```bash
   python main.py
   ```

### Ejecutar Archivos Individuales

También puedes ejecutar cada módulo por separado:

```bash
# Probar clase base
python cuenta_bancaria.py

# Probar caja de ahorro
python caja_de_ahorro.py

# Probar cuenta corriente
python cuenta_corriente.py
```

### Comandos Alternativos

Si tienes Python 3 específicamente instalado:
```bash
python3 main.py
```

## 🐍 Características Específicas de Python

### Encapsulamiento Pythonico
- **Convención de nombres**: Atributos privados con `_` (guión bajo)
- **Propiedades**: Uso de `@property` para getters automáticos
- **Setters decorados**: `@atributo.setter` para validaciones
- **Docstrings**: Documentación integrada con triple comillas

### Herencia Pythonica
- **`super()`**: Llamada al constructor padre
- **`isinstance()`**: Verificación de tipos en tiempo de ejecución
- **Polimorfismo**: Métodos `__str__()` y `__repr__()` personalizados
- **Módulos**: Separación en archivos independientes

### Validaciones Inteligentes
- **Verificación de tipos**: `isinstance(valor, (int, float))`
- **Rangos automáticos**: `max(0.0, min(1.0, valor))`
- **Conversiones seguras**: `float(valor)` con manejo de errores
- **Mensajes informativos**: Errores descriptivos en español

## 📊 Funcionalidades Demostradas

La aplicación `main.py` ejecuta una demostración completa que incluye:

1. **Creación de cuentas** (Caja de Ahorro y Cuenta Corriente)
2. **Operaciones bancarias**:
   - Depósitos y extracciones
   - Aplicación de intereses (Caja de Ahorro)
   - Emisión de cheques (Cuenta Corriente)
   - Cobro de comisiones

3. **Demostración de encapsulamiento**:
   - Acceso a atributos mediante propiedades
   - Validaciones en setters
   - Control de acceso a datos privados

4. **Demostración de herencia**:
   - Reutilización de código de clase padre
   - Métodos específicos en clases hijas
   - Polimorfismo con `__str__()` y `isinstance()`

5. **Características avanzadas de Python**:
   - Verificación de tipos en tiempo de ejecución
   - Polimorfismo con listas heterogéneas
   - Uso de propiedades decoradas

## 💡 Diferencias con la Versión Java

| Aspecto | Java | Python |
|---------|------|--------|
| **Encapsulamiento** | `private` | Convención `_` |
| **Getters/Setters** | Métodos explícitos | `@property` decorators |
| **Herencia** | `extends` | Herencia directa |
| **Constructor padre** | `super()` | `super().__init__()` |
| **Validaciones** | `if` statements | `isinstance()` + validaciones |
| **Documentación** | Javadoc | Docstrings |

## 🎯 Objetivos de Aprendizaje

Este proyecto demuestra:

1. **Encapsulamiento Pythonico**: Uso de convenciones y propiedades
2. **Herencia en Python**: Sintaxis y mejores prácticas
3. **Polimorfismo**: Sobrescritura de métodos y `isinstance()`
4. **Abstracción**: Separación de funcionalidades específicas
5. **Buenas prácticas Python**: PEP 8, docstrings, type hints implícitos

## 🔧 Posibles Extensiones

El proyecto puede extenderse agregando:
- **Type hints** explícitos (`typing` module)
- **Interfaz gráfica** (tkinter, PyQt, Kivy)
- **Base de datos** (SQLite, PostgreSQL con SQLAlchemy)
- **Más tipos de cuentas** usando herencia múltiple
- **Sistema de transacciones** con decoradores
- **Logging** avanzado con el módulo `logging`
- **Testing** con `unittest` o `pytest`

## 📝 Notas Técnicas

- **Versión de Python**: Compatible con Python 3.7+
- **Patrón**: Herencia simple con clase base
- **Manejo de errores**: Mensajes informativos en consola
- **Documentación**: Docstrings en formato Google/PEP 257
- **Convenciones**: PEP 8 para nombres de archivos y variables

## 🔍 Ejemplos de Uso Avanzado

### Crear una Caja de Ahorro
```python
from caja_de_ahorro import CajaDeAhorro

caja = CajaDeAhorro(1001, "Juan Pérez", "USD", True, 10000.0, 0.05)
caja.depositar(5000.0)
caja.aplicar_intereses()
print(f"Saldo final: {caja.saldo:.2f}")
```

### Crear una Cuenta Corriente
```python
from cuenta_corriente import CuentaCorriente

cuenta = CuentaCorriente(2001, "María López", "EUR", True, 
                       5000.0, 2000.0, 100.0)
cuenta.emitir_cheque(1000.0, "Proveedor XYZ")
print(f"¿En descubierto? {cuenta.esta_en_descubierto()}")
```

### Verificar Tipos
```python
cuentas = [caja, cuenta]

for cuenta in cuentas:
    if isinstance(cuenta, CajaDeAhorro):
        print("Es una caja de ahorro")
    elif isinstance(cuenta, CuentaCorriente):
        print("Es una cuenta corriente")
```

---

**Migrado desde Java - Demostración de POO en Python** 🐍🚀
