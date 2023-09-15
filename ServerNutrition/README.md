# ServerNutrition

### **🖱 BASE DE DATOS**

Se crearon los siguientes tipos de modelos en la base de datos:
Con las siguientes relaciones:
- Un usuario puede tener un nutricionista(1:1)
- Un nutricionista puede tener muchos usuarios (1:N)...

**📍 MODELO 1 | User**

-  id.
-  Name.
-  lastName.
-  email.
-  birthDate.
-  password.
-  phone.
-  image.
-  address.
-  gender.

<br />

**📍 MODELO 2 | Nutrionist**

-  id.
-  name.
-  lastName.
-  image.
-  email.
-  password.
-  colegiatura.
-  specialty.

<br />

**📍 MODELO 3 | Admin**

-  id.
-  name.
-  lastName.
-  image.
-  email.
-  password.

<br />

**📍 MODELO 4 | Citas**

-  id.
-  date.
-  hour.
-  purpose.

<br />

### **🖱 BACK-END**

Para esta parte se contruyo un servidor utilizando **NodeJS** y **Express**. y se conecta con la base de datos mediante **Sequelize**.

### El servidor cuenta con las siguientes rutas:

#### **📍 POST | /users**

-  Esta ruta recibe todos los datos necesarios para crear un usuario y almacenarlo en la base de datos.
-  Toda la información es recibida por body.

#### **📍 DELETE | /users/:id**

-  Esta ruta recibe un id por parametro para eliminar un usuario de la base de datos.

#### **📍 GET | /users**

-  Esta ruta obtiene un arreglo de objetos, donde cada objeto es un usuario con su información.

#### **📍 PUT | /users/:id**

-  Esta ruta recibe todos los datos necesarios para actualizar un usuario.
-  Recibe un id por parametro que indica cual es el usuario a actualizar.