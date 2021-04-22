create table usuarios(
id int primary key auto_increment,
nombre varchar(20) not null,
apellido varchar (20) not null,
nombreusuario varchar(30) not null,
contraseña varchar (20) not null,
mail varchar (120) not null,
fechaNacimiento date not null,
imagen varchar(120) not null,
cantidadDeSeguidores int not null
);

create table productos(
id int primary key auto_increment,
nombre varchar(100) not null,
imagen varchar(120) not null,
descripcion varchar(1000) not null,
fechaCreacion date not null,
usuario_id int,
foreign key (usuario_id) references usuario(id)
);

create table comentarios(
id int primary key auto_increment,
comentario varchar(1000) not null,
fechaCreacion date not null,
usuario_id int,
foreign key (usuario_id) references usuario(id),
productos_id int,
foreign key (productos_id) references productos(id)
);


insert into usuario(id, nombre, apellido, nombreusuario, contraseña, mail, fechaNacimiento, imagen, cantidadDeSeguidores)
values(default,"Juan","Lopez","JuanLopez","password","juanlopez@gmail.com", "1970/04/10", "/images/usuarios/fotoJuan.jpg", 1200), 
(default,"Felipe","Gonzalez","felipeGonzalez","password","felipeGonzalez@gmail.com", "1997/10/27", "/images/usuarios/fotoFelipe.jpg", 500),
(default,"Miguel","Gomez","MiguelGomez","password","miguelGomez@gmail.com", "1990/12/18", "/images/usuarios/fotoMiguel.jpg", 300), 
(default,"Maia","Sanchez","MaiaSanchez","password","maiaSanchez@gmail.com", "1987/07/29", "/images/usuarios/fotoMaia.jpg", 125),
(default,"Camila","Pochettino","CamilaPochettino","password","camipochettino@gmail.com", "1998/02/01", "/images/usuarios/fotoCamila.jpg", 780),
(default,"Veronica","Rizzotti","VeronicaRizzo","password","verorizzotti@gmail.com", "1982/09/15", "/images/usuarios/fotoVeronica.jpg", 18); 


insert into productos(id, nombre, imagen, descripcion, fechaCreacion, usuario_id)
values(default,"Adidas Ozweego", "adidasOzweego.jpeg","Estas zapatillas fueron lanzadas en agosto de 2020 con un precio de $269 usd y al por menor por $170 usd.", "2021/05/01", 1), 
(default,"Converse Chuck 70 Luxe", "converseChuck.jpeg","Estas zapatillas fueron lanzadas en septiembre de 2018 con un precio de $269 usd y al por menor por $170 usd.", "2019/02/25", 4),
(default,"Jordan 1 Retro High Satin Snake Chicago", "jordan1Retro.jpeg","Estas zapatillas fueron lanzadas en agosto de 2017 con un precio de $269 usd y al por menor por $170 usd.", "2019/10/05", 3),
(default,"Adidas NMD R1 V2", "adidasNMD.png","Estas zapatillas fueron lanzadas en noviembre de 2018 con un precio de $269 usd y al por menor por $170 usd.", "2019/10/31", 4),
(default,"Nike blazer mid off-white", "nikeBlazer.jpeg","Estas zapatillas fueron lanzadas en agosto de 2020 con un precio de $269 usd y al por menor por $170 usd.", "2020/12/01", 3),
(default,"New Balance 550 Aime Leon Dore", "newbalance550.jpeg","Estas zapatillas fueron lanzadas en noviembre de 2018 con un precio de $269 usd y al por menor por $170 usd.", "2019/01/12", 6),
(default,"Nike Air Force 1 Low Supreme", "nikeAirForce1.jpeg","Estas zapatillas fueron lanzadas en agosto de 2020 con un precio de $269 usd y al por menor por $170 usd.", "2021/01/01", 5),
(default,"Jordan Zoom 92", "jordanZoom.jpeg","Estas zapatillas fueron lanzadas en octubre de 2010 con un precio de $269 usd y al por menor por $170 usd.","2016/06/21" , 5), 
(default,"Jordan AJ 1 Mid", "Jordan-AJ-1-Mid.png","Estas zapatillas fueron lanzadas en octubre de 2020 con un precio de $115 usd y al por menor por $93 usd.", "2020/02/04", 6),
(default,"Nike Blazer Mid", "Nike-Blazer-Mid.png","Estas zapatillas fueron lanzadas en noviembre de 1995 con un precio de $85 usd y al por menor por $67 usd.","1995/10/31" , 4); 

insert into comentarios(id, comentario, fechaCreacion, usuario_id, productos_id)
values(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 1), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 1),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 1),
(default,"¡Muy bonitas!", "2020/02/01", 6, 1),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 2), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 2),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 2),
(default,"¡Muy bonitas!", "2020/02/01", 6, 2),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 3), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 3),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 3),
(default,"¡Muy bonitas!", "2020/02/01", 6, 3),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 4), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 4),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 4),
(default,"¡Muy bonitas!", "2020/02/01", 6, 4),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 5), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 5),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 5),
(default,"¡Muy bonitas!", "2020/02/01", 6, 5),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 6), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 6),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 6),
(default,"¡Muy bonitas!", "2020/02/01", 6, 6),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 7), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 7),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 7),
(default,"¡Muy bonitas!", "2020/02/01", 6, 7),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 8), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 8),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 8),
(default,"¡Muy bonitas!", "2020/02/01", 6, 8),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 9), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 9),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 9),
(default,"¡Muy bonitas!", "2020/02/01", 6, 9),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 10), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", "2020/02/01", 1, 10),
(default,"No me gustan, estan pasadas de moda", "2020/02/01", 5, 10),
(default,"¡Muy bonitas!", "2020/02/01", 6, 10); 

