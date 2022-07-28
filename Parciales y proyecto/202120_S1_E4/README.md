# 202120_S1_E4

## Links
[GitInspector](https://isis3710-uniandes.github.io/202120_S1_E4/reports)

Integrantes:
*Andrés Felipe Rincón Pinzón
*Kevin Camilo Becerra Walteros
*Esteban Emmanuel Ortiz Morales
*Felipe Gustavo Guzmán Avendaño
*Juan Fernando Castañeda Gutierrez

1. Descripción del proyecto: Se propone una aplicación centrada completamente en el área de nutrición que integre las mejores características de otras alternativas en el mercado como las aplicaciones basadas en arreglos de consultas médicas en general y las aplicaciones que permiten a sus usuarios informarse sobre los contenidos nutricionales de distintas comidas y que permiten crear una dieta basada en sus preferencias y necesidades. Se pretende brindar una experiencia más completa para el usuario, dándole la posibilidad de adjuntar citas con su nutricionista de preferencia, expresar sus dudas sobre alimentación en un foro que responderán profesionales capacitados, crear y guardar un plan de dieta semanal y poder compartirlo con otros usuarios. En este caso se integran las funcionalidades que se propusieron en la anterior entrega: El usuario entra a la aplicación por medio del banner, este banner explica las tres principales ideas en las que se basa Nutrispecialist por medio de tres imagenes acompañadas de una pequeña descripción: Comer bien, ponerse metas y contactar con un especialista. En el banner el usuario tiene la opción de registrarse o de iniciar sesión. Una vez creada una cuenta o ingresado con credenciales ya existentes, el usuario podrá navegar por las principales pestañas del menú principal de la aplicación. El usuario podra ver su balance nutricional, sus dietas y crear alimentos, asimismo contará con una pestaña de especialista por la cual podrá calificar a los nutricionistas y mirar que otros nutricionistas hay en la aplicación. Finalmente el usuario podrá visitar un foro en el que podrá hacer las preguntas o post de nutricion que desee. Para la aplicación se eligió una paleta de colores naranja/rojiza combinada con blanco, esta escogencia se hizo teniendo en cuenta las recomendaciones de Adobe Color. De igual forma para el front se usó el framework React. 

Adicionalmente en la implementación se diseñó una aplicación progresiva, con diseño minimalista y bien cuidado, usable, accesible, segura, internacionalizable y con visualización de datos.

2. Live demo de la aplicación: https://create-react-nutrispeci-heroku.herokuapp.com/

3. Instrucciones de uso: 

Clonar el repositorio, pararse en la carpeta back, hacer NPM install y NPM start. Abrir otra consola, pararse en la carpeta front react hacer NPM install y NPM start.

Luego de que la aplicación ya esté corriendo, darle click al boton login de la parte superior derecha y en el login de auth0 poner las siguientes credenciales: 
Usuario: pedro@paramo.com 
Constraseña: Password1 
(Este es el usuario que tiene datos poblados en la base de datos y se utilizará para ver las funcionalidades)

En la aplicación se podrá navegar por las diferentes pestañas. 

En balance nutricional el usuario podrá ver su estado en el balance de nutrición durante los últimos meses medinate una gráfica en D3
En nutricionistas el usuario podrá buscar los nutricionistas que se encuentran en la aplicación mediante diferentes filtros y además podrá revisar el historial de nutricionistas con los que ha tenido citas y calificarlos.

En alimento el usuario podrá ver los distintos alimentos ya creados en la aplicación y podrá crear sus propios alimentos con valores nutricionales especificos

En foro el usuario podrá ver las diferentes entradas del foro ya existentes y crear sus propias entradas.

Por medio del botón de logout el usuario podrá cerrar sesión en la aplicación.

Finalmente el usuaro podrá hacer uso de la funcionalidad de chat que se encuentra en la parte de abajo a la izquierda para comunicarse con un asesor de la aplicación.

Para revisar los patrones de diseño implementados visitar el siguiente link: https://docs.google.com/document/d/1qycgceVwEGT0ro1bhGUOODm4PmmgJe2e5PlhRlh28bw

4. URL del video en el que se demuestre la funcionalidad la aplicación: https://www.loom.com/share/3778971a28954dc1a66f1a34eb34aca2
