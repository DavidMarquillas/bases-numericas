/** el 0 en hexa no toma los 4 digitos si no 1 */
$(document).ready(function() {

    var boton = document.querySelector("#boton");
    var numero1 = document.querySelector("#numero1");
    var convertido = document.querySelector("#num");
    var bases2 = document.querySelector("#bases2");
    var bases1 = document.querySelector("#bases1");
    var error = document.querySelector("#error");

    


    /* Evento click para convertir numero */
    $(boton).click(function(){

        $(numero1).val($(numero1).val().toUpperCase()); 
        
        //de decimal a cualquier base menos 16
        if($(bases1).val() == 10 && $(bases2).val() != 16){
            var numero = parseInt($(numero1).val());
            var otraBase = decimalABase (numero, $(bases2).val());
            $(convertido).text(otraBase + " en base " + $(bases2).val());
            $(error).text("");
            console.log(typeof(numero));
        }
        
        //de cualquier base menos 16 a decimal
        if($(bases1).val() != 10 && $(bases1).val() != 16 && $(bases2).val() != 16 && $(bases2).val() == 10){
            var numero = parseInt($(numero1).val());
            var decimal = baseADecimal (numero, $(bases1).val());
            
            if(decimal != -1){
                $(convertido).text(decimal + " en base " + $(bases2).val());
                $(error).text("");

            }else{
                $(error).text("Numero erroneo, repita");
                $(numero1).val('');
            }
        }

        //de cualquier base a cualquier base, menos 16 
        if($(bases1).val() != 10 && $(bases1).val() != 16 && $(bases2).val() != 10 && $(bases2).val() != 16){
            var numero = parseInt($(numero1).val());
            var restoDeBases = basesRestantes (numero, $(bases2).val(), $(bases1).val());
            if(restoDeBases != -1){
                $(convertido).text(restoDeBases + " en base " + $(bases2).val());
                $(error).text("");

            }else{
                $(error).text("Numero erroneo, repita");
                $(numero1).val('');
            }
        }

        //de cualquier base a hexadecimal
        if($(bases2).val() == 16){
            var hexa = aHexadecimal($(numero1).val(), $(bases1).val());
            if(hexa != -1){
                
                $(convertido).text(hexa + " en base " + $(bases2).val());
                $(error).text('');
            
            }else{
                $(error).text("Numero erroneo, repita");
                $(numero1).val('');
            }
        }

        //de hexadecimal a cualquier
        if($(bases1).val() == 16){
           var hexaABase =  hexadecimalABase($(numero1).val(), $(bases2).val());
            
           if(hexaABase != -1){
                $(convertido).text(hexaABase + " en base " + $(bases2).val());
                $(error).text("");
                       
           }else{
                $(error).text("Numero erroneo, repita");
                $(numero1).val('');
            }

        }

    });
    
});

/* Metodos */

//Convierte un numero decimal a otra base
function decimalABase(numero, baseAConvertir){
    var res=0, dig, e=0;
	
	while(numero != 0){
        dig = numero % baseAConvertir;
        //console.log(dig);
		res = res + Math.pow(10, e) * dig;
		numero = Math.trunc(numero / baseAConvertir);
		e++;
	}
	return res;
}

//Convierte un numero de base x a decimal
function baseADecimal(numero, baseNumero){
	var res = 0, dig, e=0;
	
	while(numero != 0){
        dig  = numero % 10;
        //console.log(dig);
        
        if(dig < baseNumero && numero > 0){
            res = res + dig * Math.pow(baseNumero, e);
            numero = Math.trunc(numero / 10);
            e++;

        }else{
            return -1;
        }
	}
	
	return res;
}

//Convierte un numero de base x a otro de base y
function basesRestantes(numero, baseAConvertir, baseNumero){
    var decimal, res;

    decimal = baseADecimal(numero, baseNumero);
    //console.log("resto de bases");
    res = decimalABase(decimal, baseAConvertir);

    return res;
}

function aHexadecimal(numero, baseNumero){

    var resultado, binario, hexa="",dig;

    console.log("Binario: " + basesRestantes(numero, 2, baseNumero));
    binario = basesRestantes(numero, 2, baseNumero);
    
    if(binario == -1){
        return -1;
    }

    while(binario != 0){
        dig = binario % 10000;
		binario = Math.trunc(binario / 10000);
       // console.log("resto: " + dig);
        
        switch(dig){
            
            case 1010: hexa = hexa + "A"; break;
            case 1011: hexa = hexa + "B"; break;
            case 1100: hexa = hexa + "C"; break;
            case 1101: hexa = hexa + "D"; break;
            case 1110: hexa = hexa + "E"; break;
            case 1111: hexa = hexa + "F"; break;
            default: var digH = baseADecimal(dig, 2);
                    digH = digH.toString();
                    hexa = hexa + digH;
            
        }

        
        //var digH = baseADecimal(binario )
        

    }  

    return invertirCadena(hexa);

}


//de hexa a cualquier base
function hexadecimalABase(numero, baseAConvertir){
    
    var x = numero.length -1, numHexa="", numBase=0;
    while (x>=0) {
        var letra = numero.charAt(x);
        
        if(letra=="A" || letra=="B" || letra=="C" || letra=="D" || letra=="E" || letra=="F" || parseInt(letra)>= 0){
            switch(letra){ 
                case "0": numHexa = numHexa + "0000"; break;
                case "1": numHexa = numHexa + "0001"; break;
                case "2": numHexa = numHexa + "0010"; break;
                case "3": numHexa = numHexa + "0011"; break;
                case "4": numHexa = numHexa + "0100"; break;
                case "5": numHexa = numHexa + "0101"; break;
                case "6": numHexa = numHexa + "0110"; break;
                case "7": numHexa = numHexa + "0111"; break;
                case "8": numHexa = numHexa + "1000"; break;
                case "9": numHexa = numHexa + "1010"; break;
                case "B": numHexa = numHexa + "1011"; break;
                case "C": numHexa = numHexa + "1100"; break;
                case "D": numHexa = numHexa + "1101"; break;
                case "E": numHexa = numHexa + "1110"; break;
                case "F": numHexa = numHexa + "1111"; break;
                default:
            }
            numHexa = invertirCadena(numHexa);
        }else{
            return -1;
        }
    
      console.log(x + letra);
      x--;
    }
    
    numBase = parseInt(numHexa);
    
    //console.log("num base "+numBase);

    if(baseAConvertir == 10){
        //console.log("entro " + numBase);
        numBase = baseADecimal(numBase, 2);
        
        
    }else if(baseAConvertir != 2){
        //console.log("entro 2 " + numBase);
        numBase = basesRestantes(numBase, baseAConvertir, 2);
       
    }

    if(baseAConvertir == 2){
        return numHexa;
    }
    
    //console.log(numBase);
    
    return numBase;    
}

//invertir cadena
function invertirCadena(cadena) {
    var x = cadena.length;
    var cadenaInvertida = "";
  
    while (x>=0) {
      cadenaInvertida = cadenaInvertida + cadena.charAt(x);
      x--;
    }
    return cadenaInvertida;
}

//inverir numero
function invertirDigitos(numero)
{ 
  var invertido = 0
  var resto = numero
  do {
    invertido = invertido * 10 + (resto % 10)
    resto = Math.floor(resto / 10)
  } while ( resto > 0 )
  return invertido
}
