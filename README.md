# 💰 Digital Money House - Billetera Virtual  

Este proyecto es una **billetera virtual** desarrollada con **Next.js y TypeScript**, que permite a los usuarios **gestionar su dinero, pagar servicios y realizar transacciones**.  

## 🚀 Tecnologías utilizadas  
- **Next.js** (React + SSR)  
- **TypeScript**  
- **Tailwind CSS**  
- **API REST** para operaciones financieras  
- **Jest + React Testing Library** (pruebas automatizadas)  

## 📂 Estructura del Proyecto  
/components - Componentes reutilizables
/pages - Rutas principales de la aplicación
/services - Conexión con la API
/context - Manejo de autenticación y estado global


## 🔧 Instalación y ejecución  

1️⃣ Clona este repositorio  

git clone https://github.com/LiamAndres/digital-money-house.git

2️⃣ Instala dependencias

npm install

3️⃣ Inicia el servidor de desarrollo

npm run dev
La app estará disponible en http://localhost:3000

✅ Funcionalidades
✔️ Registro e inicio de sesión
✔️ Gestión de perfil y medios de pago
✔️ Carga de dinero a la billetera
✔️ Pago de servicios con saldo disponible
✔️ Historial de transacciones y actividad
✔️ Interfaz optimizada para mobile y desktop

## 📦 Deployment
El proyecto está disponible en Vercel:
🔗 https://digital-money-house.vercel.app

## 🧪 Pruebas
✅ Pruebas Unitarias

Para ejecutar las pruebas unitarias con Jest + React Testing Library:

npm run test

✅ Pruebas unitarias (componentes y lógica de negocio)
✔️ Validación del formulario de login (email válido, contraseña obligatoria).
✔️ Prueba del Sidebar en mobile (se renderiza, está oculto por defecto y se muestra al abrir).
✔️ Prueba del Dashboard (se renderiza y muestra el título correctamente).
✔️ Prueba del servicio de transacciones (getAllTransactions) (retorna datos correctos y maneja errores).
✔️ Prueba del servicio getServiceById (verifica que obtiene datos y maneja errores).
✔️ Prueba del servicio makePayment (envía los datos correctamente y maneja errores de API).

✅ Pruebas de integración
✔️ Flujo de pago de servicios: Verificamos que la lógica de pago se ejecuta correctamente desde la selección del servicio hasta la confirmación del pago.

✅ Testing Manual
✔️ Se realizaron pruebas manuales en los diferentes flujos de la aplicación, verificando validaciones de formularios, navegación y respuestas de la API.