create table usuarios(
id int unsigned primary key auto_increment,
nombre varchar(20) not null,
apellido varchar (20) not null,
nombreusuario varchar(30) not null UNIQUE,
contraseña varchar (200) not null,
mail varchar (120) not null UNIQUE,
fechaNacimiento date not null,
imagen varchar(120) not null default "default.jpg",
cantidadDeSeguidores int not null default"0",
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table productos(
id int unsigned primary key auto_increment,
nombre varchar(100) not null,
imagen varchar(120) not null,
descripcion varchar(1000) not null,
usuarios_id int unsigned,
foreign key (usuarios_id) references usuarios(id) on delete cascade,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table comentarios(
id int unsigned primary key auto_increment,
comentario varchar(1000) not null,
usuarios_id int unsigned,
foreign key (usuarios_id) references usuarios(id) on delete cascade,
productos_id int unsigned,
foreign key (productos_id) references productos(id) on delete cascade,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table usersFollowers(
id int unsigned primary key auto_increment,
seguido_id int unsigned,
foreign key (seguido_id) references usuarios(id) on delete cascade,
seguidor_id int unsigned,
foreign key (seguidor_id) references usuarios(id) on delete cascade,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
insert into usuarios(id, nombre, apellido, nombreusuario, contraseña, mail, fechaNacimiento, imagen, cantidadDeSeguidores)
values(default,"Juan","Lopez","JuanLopez","password","juanlopez@gmail.com", "1970/04/10", "fotoJuan.jpg", 1200), 
(default,"Felipe","Gonzalez","felipeGonzalez","password","felipeGonzalez@gmail.com", "1997/10/27", "fotoFelipe.jpg", 500),
(default,"Miguel","Gomez","MiguelGomez","password","miguelGomez@gmail.com", "1990/12/18", "fotoMiguel.jpg", 300), 
(default,"Maia","Sanchez","MaiaSanchez","password","maiaSanchez@gmail.com", "1987/07/29", "fotoMaia.jpg", 125),
(default,"Camila","Pochettino","CamilaPochettino","password","camipochettino@gmail.com", "1998/02/01", "fotoCamila.jpg", 780),
(default,"Veronica","Rizzotti","VeronicaRizzo","password","verorizzotti@gmail.com", "1982/09/15", "fotoVeronica.jpg", 18); 

insert into productos(id, nombre, imagen, descripcion, usuarios_id)
values(default,"Adidas Ozweego", "adidasOzweego.jpeg","Las zapatillas Ozweego se inspiran en los 90 para crear un estilo innovador. Estas zapatillas reinventan la OZWEEGO 3 de 1988 y la adaptan al presente. El resultado es un diseño ligero y cómodo equipado con la tecnología adiPRENE para ofrecer la máxima comodidad.", 1), 
(default,"Converse Chuck 70 Luxe", "converseChuck.jpeg","Simplificadas para el estilo y diseñadas para la comodidad, las zapatillas Chuck 70 Luxe Leather brindan un aspecto limpio y sereno a la silueta favorita de los fanáticos. Detalles cuidadosos como cuero de primera calidad, un forro tonal y múltiples opciones de cordones le dan a este zapato un aspecto y una sensación de lujo.",  4),
(default,"Jordan 1 Retro High", "jordan1Retro.jpeg","Jordan Brand agregó materiales de lujo a una silueta clásica con el lanzamiento de las Jordan 1 Retro High Satin Snake Chicago (W). Esta versión combina el concepto actual Satin 1 de Jumpman con la combinación de colores que lo inició todo.", 3),
(default,"Adidas NMD R1 V2", "adidasNMD.png","Estas zapatillas fueron lanzadas en noviembre de 2018 con un precio de $269 usd y al por menor por $170 usd.", 4),
(default,"Nike blazer mid off", "nikeBlazer.jpeg","Las Nike Blazer Mid recuperan el look clásico de las zapatillas de baloncesto Nike. Los elegantes detalles de ante, el diseño Swoosh retro y la zona del tobillo acolchada crean un básico actual, al tiempo que la parte superior impecable ofrece un look ideal para cualquier conjunto.",  3),
(default,"New Balance 550", "newbalance550.jpeg","Estas zapatillas fueron lanzadas en noviembre de 2018 con un precio de $269 usd y al por menor por $170 usd.",  6),
(default,"Nike Air Force 1 Low", "nikeAirForce1.jpeg","Estas zapatillas fueron lanzadas en agosto de 2020 con un precio de $269 usd y al por menor por $170 usd.",  5),
(default,"Jordan Zoom 92", "jordanZoom.jpeg","Estas zapatillas fueron lanzadas en octubre de 2010 con un precio de $269 usd y al por menor por $170 usd.", 5), 
(default,"Jordan AJ 1 Mid", "Jordan-AJ-1-Mid.png","Estas zapatillas fueron lanzadas en octubre de 2020 con un precio de $115 usd y al por menor por $93 usd.", 6),
(default,"Nike Blazer Mid", "Nike-Blazer-Mid.png","Estas zapatillas fueron lanzadas en noviembre de 1995 con un precio de $85 usd y al por menor por $67 usd.",4), 
(default,"Puma Cruise Rider", "pumaCruise.png","PUMA muestra su amor por la belleza atemporal de los autos antiguos con el último Cruise Rider. La entresuela IMEVA y la suela apilada le dan al zapato un aspecto elevado. Las combinaciones de colores únicas y divertidas son vibrantes y llamativas. El look de caña baja hace que el zapato sea perfecto para las calles. El estilo clásico, los detalles refinados y la comodidad mejorada hacen que el zapato sea imprescindible en tu guardarropa", 2),
(default,"Vans Style 36", "vansStyle.png","La parte superior de cuero de plena flor de primera calidad de las Vans Style 36 viene en una combinación de color blanco que le da un aspecto y tacto lujosos para enfatizar la calidad del material. Su costura de detalle se aplica con un grosor de gran calibre para dar forma y trazar las líneas características del diseño de la silueta. Los colores naturales de las rayas laterales y el forro de gamuza sintética se mezclan con la paleta y los cordones de algodón planos encerados y las etiquetas Vans de piel de cerdo completan la estética general. La plantilla Ultracush se centra en la función y garantiza una comodidad duradera al caminar.",4),
(default,"Nike Air Max 90", "nikeAirMax.png","El Nike Air Max 90 tiene que ver con la comodidad en las calles. La silueta se mantiene fiel a sus raíces deportivas con la icónica suela Waffle, detalles de TPU y superposiciones cosidas. La parte superior de malla garantiza una mayor transpirabilidad y comodidad. Las nuevas combinaciones de colores agregan otra dimensión a la apariencia. La unidad Max Air en el talón proporciona la máxima amortiguación, mientras que el diseño de corte bajo y el tobillo acolchado ofrecen un diseño elegante. Inspírate en los 90, pero luce fresco en las calles con Air Max 90.",5),
(default,"Puma Suede Bloc", "pumaSuede.png","Con un legado que abarca 50 años, el PUMA Suede recibe una actualización de diseño con el Suede Bloc. Reimagina el zapato clásico para una nueva generación de fanáticos de las zapatillas con un perfil bajo, detalles gruesos en el talón y una combinación de colores vibrantes. Explora la jungla urbana con el PUMA Suede Bloc.", 3),
(default,"Adidas Pharrel", "adidasPharrell.png", "adidas y Pharrell Williams colaboran nuevamente para agregar un zapato más a la colección única y popular de NMD Hu. La silueta icónica NMD tiene una parte superior Primeknit que es duradera y transpirable. Una entresuela Boost de largo completo del mismo color que la parte superior ofrece una gran amortiguación y capacidad de respuesta. El exclusivo estilo de encaje envolvente mantiene el ajuste seguro y cerrado. Este par presenta la palabra ´Uluntu´ en la parte superior, que significa ´Raza humana´ en xhosa, un idioma que se habla en Zimbabwe y Sudáfrica. Recuerda lo que significa ser humano con estas zapatillas vibrantes y atrevidas.", 2), 
(default,"Asics Jampan SPf", "asicJapan.png", "ASICS regresa a los 80 con sus últimas zapatillas JAPAN S Pf. El zapato está inspirado en el diseño tradicional, pero viene con tecnología de la nueva era. La entresuela tradicional se reemplaza por una estructura de plataforma. La silueta presenta una combinación de colores neutros para una apariencia limpia. La marca clásica de ASICS de rayas, cuartos de paneles y letras ´ASICS´ emite un aire nostálgico.", 1),
(default,"Nike Air Max Uptempo", "airMax.png","El Air Max Uptempo es uno de los diseños de Nike más atrevidos en la historia de las zapatillas. El Swoosh bordado es un guiño a la herencia clásica de Nike, mientras que la incorporación de Wilson Smith del ´AIR´ de gran tamaño añade una nueva dimensión al diseño. El zapato también cuenta con una parte superior de cuero con las perforaciones distintivas para mayor transpirabilidad y facilidad. ¡Producto del estilo y la innovación, Nike Air Max Uptempo es justo lo que necesitas!", 4),
(default,"Puma Hedra", "pumaHedra.png","Las PUMA Hedra Dark Dreams de temática negra son todo lo que necesitas para mejorar tu juego de zapatillas. Inspirado en varios zapatos para correr de PUMA, este diseño combinado viene con una parte superior ripstop con superposiciones de gamuza y cuero. Las atrevidas envolturas de goma en el antepié y el mediopié aseguran los pies. La entresuela de IMEVA es ligera y garantiza una gran amortiguación. Una cadena de metal dorado a lo largo del talón y la marca PUMA metalizada dorada le dan un toque rico al estilo. Sal de las sombras con estas zapatillas PUMA.",3),
(default,"Adisas Stan Smith", "adidasStan.png","¿Crees que ya tienes lo mejor? adidas acaba de demostrar que estás equivocado con las nuevas y elevadas zapatillas adidas Nizza Platform. La silueta icónica alcanza nuevas alturas con la suela gruesa de plataforma. También redefine el streetwear con su inspirado estilo skate completo con reflejos negros. Consigue la plataforma adidas Nizza y crea tu propio estilo urbano.", 6),
(default,"Adisas Superstar", "superstar.png","Durante más de 40 años, adidas Superstar encarna el alma del deporte. Pero no solo en los deportes, incluso en el tiempo libre, la superestrella de adidas encuentra muchos amigos. Con su diseño casual y atemporal podrás combinarlo a la perfección con cualquiera de tus conjuntos: cool, chic o deportivo. Mientras tanto, está disponible en tantos colores y patrones diferentes que es difícil elegir solo uno. Ya sea clásico en negro o blanco, con rayas de colores, delgadas o gruesas o con parte superior de cuero suave o liso, ¡tú decides! Y una cosa es segura: ¡la adidas Superstar es absolutamente imprescindible para tu guardarropa!", 6),
(default,"Vans Era", "vansEra.png","Vans Era! ¡Un zapato casual de moda con un encanto retro muy especial que simplemente tienes que tener en tu zapatero! Su silueta clásica y profunda y el look skater hacen que las zapatillas Vans sean tan populares y probablemente también te inspirarán. Especialmente ingenioso: mientras tanto, Vans Era viene en tantos colores y patrones diferentes que es difícil decidirse por un solo modelo. El zapato plano de lino se adapta a cualquiera de tus conjuntos, ya sea que lo prefieras deportivo, informal o chic. ¡Pruébalo y combínalo con diferentes estilos y entenderás a qué nos referimos!", 5),
(default,"Jordan MA2", "jordanMa2.png","Lleva algo nuevo a tu juego de zapatillas con las Nike Jordan MA2. Confeccionado con materiales mixtos, el zapato presenta etiquetas poco convencionales, micrográficos técnicos y bordes de espuma cruda para una apariencia atrevida. Su unidad Air Max 200 te mantiene ligero todo el día. Obtén lo mejor de la actitud y la innovación de Jordan con las Jordan MA2.", 4),
(default,"Reebok Club C Legacy", "reebokClub.png","Presenta una sensación de apertura al mundo con estos zapatos Club C Legacy para mujer de Reebok. Vea estas zapatillas por lo que son gracias a la suela y la entresuela translúcidas. Los toques de color en las lengüetas del talón sellan el trato. Basta de charla.", 3),
(default,"Puma Future Rider", "pumaRider.png","En 1980, cuando la tendencia de las zapatillas para correr se trasladó cada vez más del campo deportivo a la calle, ¡las PUMA Fast Rider ya eran un verdadero éxito! E incluso ahora, 40 años después, su sucesor, el PUMA Future Rider, sigue siendo imprescindible y mejor que nunca. Su silueta deportiva y elegante es particularmente evidente a través de los ingeniosos colores y le brinda a usted y a su atuendo un estilo único. El Future Rider también tiene mucho que ofrecer cuando se trata de comodidad. Una mezcla de materiales ligeros y acolchados de tela y cuero, junto con cordones clásicos, refuerzos de cuero y la suela amortiguadora amortiguadora PUMA te permiten disfrutar del PUMA Rider durante todo el día. Pruébalo ahora y convéncete a ti mismo.", 2),
(default,"Jordan Delta", "jordanDelta.png","El calzado de entrenamiento para hombre Jordan Trainer Pro te permite explotar en todas las direcciones. La correa elástica en el mediopié y el riel lateral de goma te mantiene estable y con soporte. Una suela de goma con patrón gráfico de tracción flexible brinda agarre en todos los movimientos.",1),
(default,"Puma Z", "pumaZ.png","El calzado de entrenamiento para hombre Jordan Trainer Pro te permite explotar en todas las direcciones. La correa elástica en el mediopié y el riel lateral de goma te mantiene estable y con soporte. Una suela de goma con patrón gráfico de tracción flexible brinda agarre en todos los movimientos.",1),
(default,"Nike PG4", "nikePG.png","Deportivas, informales, cómodas: las Nike PG 4 son otra zapatilla de la serie exclusiva de Paul George y se caracterizan por una tecnología aún mejor y un diseño más deportivo. El cuello del zapato de corte bajo, la suela de aire liviana y un patrón de tracción circular en la suela le brindan un ajuste seguro, un soporte óptimo y una comodidad de primera clase. La funda de malla con cremallera sobre el cordón es particularmente ingeniosa, lo que garantiza un ajuste aún mejor. Por supuesto, una zapatilla de baloncesto no debe faltar en el diseño adecuado. ¡Es por eso que el PG 4 usa colores sutiles, una suela elevada y cubiertas en forma de malla! ¡Decimos que la Nike PG 4 es una zapatilla que te convierte en la estrella en la cancha y en tu tiempo libre! Pruébelo ahora!", 5);

insert into comentarios(id, comentario, usuarios_id, productos_id)
values(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", 1, 1), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 1),
(default,"No me gustan, estan pasadas de moda", 5, 1),
(default,"¡Muy bonitas!",  6, 1),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", 1, 2), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 2),
(default,"No me gustan, estan pasadas de moda",  5, 2),
(default,"¡Muy bonitas!",  6, 2),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 3), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 3),
(default,"No me gustan, estan pasadas de moda",  5, 3),
(default,"¡Muy bonitas!",  6, 3),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", 1, 4), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 4),
(default,"No me gustan, estan pasadas de moda",  5, 4),
(default,"¡Muy bonitas!",  6, 4),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", 1, 5), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 5),
(default,"No me gustan, estan pasadas de moda", 5, 5),
(default,"¡Muy bonitas!",  6, 5),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 6), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 6),
(default,"No me gustan, estan pasadas de moda",  5, 6),
(default,"¡Muy bonitas!",  6, 6),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", 1, 7), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 7),
(default,"No me gustan, estan pasadas de moda",  5, 7),
(default,"¡Muy bonitas!",  6, 7),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 8), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 8),
(default,"No me gustan, estan pasadas de moda",  5, 8),
(default,"¡Muy bonitas!",  6, 8),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 9), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!", 1, 9),
(default,"No me gustan, estan pasadas de moda",  5, 9),
(default,"¡Muy bonitas!",  6, 9),
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 10), 
(default,"¡¡Este es mi modelo de zapatillas favoritas en el mercado!! les pongo un 10!",  1, 10),
(default,"No me gustan, estan pasadas de moda",  5, 10),
(default,"¡Muy bonitas!", 6, 10); 

insert into  usersFollowers(id, seguido_id, seguidor_id)
values(default, 1,2),
(default, 2,1),
(default, 2,3),
(default, 4,2);
