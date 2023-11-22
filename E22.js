// 2.2.4 Algoritmo lineal
function CONGRUENCIAL_LINEAL(Seed,Const_Multiplicativa,Const_Aditiva,Module,Amount) {
	let Xo = Seed;
	let a = Const_Multiplicativa;
	let c = Const_Aditiva;
	let m = Module;
	let Xi, ri;
	let Pseudorandom_Numbers = [];

	for(let i = 0; i < Amount; i++) {
		Xi = (Xo * a + c) % m;
		ri = (Xi / (m - 1));
		Pseudorandom_Numbers.push(Number(ri.toFixed(4)));
		Xo = Xi;
	}

	console.log(`2.2.4 Algortimo lineal \n`);
	console.log(`Numeros Pseudoaleatorios: \n`);
	console.log(`${Pseudorandom_Numbers} \n`);

	return Pseudorandom_Numbers;
}

// 2.2.5 Algorit congruencial multiplicativo
function CONGRUENCIAL_MULTIPLICATIVO(Seed,Const_Multiplicativa,Module,Amount) {
	let Xo = Seed;
	let a = Const_Multiplicativa;
	let m = Module;
	let Xi, ri;
	let Pseudorandom_Numbers = [];

	for(let i = 0; i < Amount; i++) {
		Xi = (Xo * a) % m;
		ri = (Xi / (m - 1));
		Pseudorandom_Numbers.push(Number(ri.toFixed(4)));
		Xo = Xi;
	}

	console.log(`2.2.5 Algortimo congruencial multiplicativo \n`);
	console.log(`Numeros Pseudoaleatorios: \n`);
	console.log(`${Pseudorandom_Numbers} \n`);
	return Pseudorandom_Numbers;
}

function WEIBULL(x,g,b) {
    let Resultado;
    let X = x;
    let Gamma = g;
    let B = b;
    with (Math) {
		if (Gamma<=0) {
			alert("gamma must be positive")
		} else if (B<=0) {
			alert("Scale parameter must be positive")
		} else if (X<=0) {
			weibcdf=0
		} else {
			Z=X/B;
			W=pow(Z,Gamma);
			weibcdf=1-exp(-W);
			weibcdf=round(weibcdf*100000)/100000;
		}
	}
    Resultado = weibcdf;
    console.log(`PEA(${x}): ${Resultado}`);
}

function WEIBULL_THREE_PARAMETER_BOOK(ri,Shape,Scale,Location) {
	let Resultado;
	let r = ri;
	let k = Shape;
	let l = Scale;
	let t = Location;

	// V3
	r10 = l + t;
	r11 = Math.log(1-r);
	r12 = Math.pow(-r11,1/k);// MOD
	//console.log(r10,r11,r12);
	Resultado = r10 * r12;
	//console.log(`V3 -> Weibull(${r}): ${Resultado}`);
	
	return Resultado;
}

/* EJERCICIO 22 */
function Desarrollo_E22() { 
	// GENERAR NÚMEROS PSEUDOALEATORIOS
	let Pseudonumbers = [];
	let Rest = [];
	//Pseudonumbers = CONGRUENCIAL_MULTIPLICATIVO(11,10,1024,20);
	//Pseudonumbers = CONGRUENCIAL_MULTIPLICATIVO(11,17,9999,60);
	Pseudonumbers = CONGRUENCIAL_MULTIPLICATIVO(5,25,999,60);

	// WEIBULL
	for ( let i = 0; i < 60; i++) {
		Rest.push(WEIBULL_THREE_PARAMETER_BOOK(Pseudonumbers[i],2,40,210));	
	}

	console.log(`LA FE LA FE \n ${Rest}`);

	/* EJERCICIO 22 */
	let MATRIX_RESULTANTE = [];
	let Numero_Sacos = [];
	var Desviacion_Estandar = 0;
	var Media = 0;


	for ( let i = 0; i < 60; i++) {
		P1 = i + 1;
		P2 = Math.round(Rest[i]);
		if ( 1000 % P2 == 0) {
			P3 = 1000 / P2;
		} else {
			P3 = Math.floor(1000 / P2);
		}
		Media = Media + P3;
		Numero_Sacos[i] = P3;
		MATRIX_RESULTANTE.push([P1 , P3 , P2]);
	} 

	// DOM 
	var Contenedor = document.getElementById("Resolucion");

	// TITULO - DOM 
	var Contenedor_Titulo = document.createElement("div");
    Contenedor_Titulo.className = "Contenedor_Media";
    
	var Etiqueta_Titulo = document.createElement("h3");
    Etiqueta_Titulo.className = "Etiqueta_Paso_M";
    Etiqueta_Titulo.textContent = "RESOLUCIÓN";
    
	Contenedor_Titulo.appendChild(Etiqueta_Titulo);

	Contenedor.appendChild(Contenedor_Titulo);

	// TABLA - DOM
	var Contenedor_Tabla = document.createElement("div");
	var Tabla = document.createElement("table");
	Tabla.id = "Tabla_E22";

	// PRIMERA FILA (CABECERA) - DOM 
	var Tabla_Fila_A = document.createElement("tr");
	Tabla_Fila_A.id = "Fila_Head";
	Tabla_Fila_A.className = "Fila";

	var Fila_Celda_A = document.createElement("th");
	Fila_Celda_A.className = "Celda_Head";
	Fila_Celda_A.textContent = "Día";
	Tabla_Fila_A.appendChild(Fila_Celda_A);
	// PRIMERA FILA (DATOS) - DOM
	for (let i = 0; i < 60; i++ ) {
		var Fila_Celda = document.createElement("td");
		Fila_Celda.className = "Celda_Date";
		Fila_Celda.textContent = `${MATRIX_RESULTANTE[i][0]}`; 
		Tabla_Fila_A.appendChild(Fila_Celda);
	}

	Tabla.appendChild(Tabla_Fila_A);

	// SEGUNDA FILA (CABECERA) - DOM
	var Tabla_Fila_B = document.createElement("tr");
	Tabla_Fila_B.id = "Fila_Head";
	Tabla_Fila_B.className = "Fila";

	var Fila_Celda_B = document.createElement("th");
	Fila_Celda_B.className = "Celda_Head";
	Fila_Celda_B.textContent = "Número de Sacos";
	Tabla_Fila_B.appendChild(Fila_Celda_B);
	
	for (let i = 0; i < 60; i++ ) {
		var Fila_Celda = document.createElement("td");
		Fila_Celda.className = "Celda_Date";
		Fila_Celda.textContent = `${MATRIX_RESULTANTE[i][1]}`; 
		Tabla_Fila_B.appendChild(Fila_Celda);
	}

	Tabla.appendChild(Tabla_Fila_B);

	// TERCERA FILA (CABECERA) - DOM
	var Tabla_Fila_C = document.createElement("tr");
	Tabla_Fila_C.id = "Fila_Head";
	Tabla_Fila_C.className = "Fila";

	var Fila_Celda_C = document.createElement("th");
	Fila_Celda_C.className = "Celda_Head";
	Fila_Celda_C.textContent = "Peso de cada Saco";
	Tabla_Fila_C.appendChild(Fila_Celda_C);

	for (let i = 0; i < 60; i++ ) {
		var Fila_Celda = document.createElement("td");
		Fila_Celda.className = "Celda_Date";
		Fila_Celda.textContent = `${MATRIX_RESULTANTE[i][2]}`; 
		Tabla_Fila_C.appendChild(Fila_Celda);
	}
	
	Tabla.appendChild(Tabla_Fila_C);

	Contenedor_Tabla.appendChild(Tabla);
	Contenedor.appendChild(Contenedor_Tabla);

	// MEDIA Y DESVIACIÓN ESTANDAR
	Media = Number((Media / 60).toFixed(2));

	for (let i = 0; i < 60; i++) {
		Desviacion_Estandar = Desviacion_Estandar + Math.pow(Numero_Sacos[i] - Media, 2);
	}

	Desviacion_Estandar = Number(Math.sqrt(Desviacion_Estandar/ 60 - 1).toFixed(2));
	
	// MEDIA - DOM
	var Contenedor_Media = document.createElement("div");
    Contenedor_Media.className = "Contenedor_Media";
    
	var Etiqueta_Media = document.createElement("h3");
    Etiqueta_Media.className = "Etiqueta_Paso_M";
    Etiqueta_Media.textContent = "Media muestral"
    
	var Media_Resultado = document.createElement("h3");
    Media_Resultado.className = "Resultado_Paso_M";
    Media_Resultado.textContent = `${Media}`;
    
	Contenedor_Media.appendChild(Etiqueta_Media);
    Contenedor_Media.appendChild(Media_Resultado);

	Contenedor.appendChild(Contenedor_Media);

	// DESVIACIÓN ESTANDAR - DOM
	var Contenedor_Desviacion = document.createElement("div");
    Contenedor_Desviacion.className = "Contenedor_Desviacion";
    
	var Etiqueta_Desviacion = document.createElement("h3");
    Etiqueta_Desviacion.className = "Etiqueta_Paso_M";
    Etiqueta_Desviacion.textContent = "Media muestral"
    
	var Desviacion_Resultado = document.createElement("h3");
    Desviacion_Resultado.className = "Resultado_Paso_M";
    Desviacion_Resultado.textContent = `${Desviacion_Estandar}`;
    
	Contenedor_Desviacion.appendChild(Etiqueta_Desviacion);
    Contenedor_Desviacion.appendChild(Desviacion_Resultado);

	Contenedor.appendChild(Contenedor_Desviacion);

	console.log("Viajes - Numero de sacos - Peso de cada saco \n");
	console.log(MATRIX_RESULTANTE);
	console.log(`Media: ${Media}`);
	console.log(`Desviación estandar: ${Desviacion_Estandar}`);
}

Desarrollo_E22();