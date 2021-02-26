$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "slide",
        //enableAllSteps: true,
        transitionEffectSpeed: 500,
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex === 1 ) {
                $('.steps ul').addClass('step-2');
            } else {
                $('.steps ul').removeClass('step-2');
            }
            if ( newIndex === 2 ) {
                $('.steps ul').addClass('step-3');
            } else {
                $('.steps ul').removeClass('step-3');
            }

            if ( newIndex === 3 ) {
                $('.steps ul').addClass('step-4');
                $('.actions ul').addClass('step-last');
            } else {
                $('.steps ul').removeClass('step-4');
                $('.actions ul').removeClass('step-last');
            }
            var form = document.getElementById("formulario");
            //form.validate().settings.ignore = ":disabled,:hidden";
            
            //permite voltar sem validar form
              if (currentIndex === 1 && newIndex===0) return true;
              if (currentIndex === 2 && newIndex===1) return true;

            if (currentIndex === 0) {
                var tam = document.forms["formulario"]["nome"].value.length;
                if (tam < 1 ) {
                    document.getElementById("idMsgErroNome").className = "msgShowErro";
                    document.getElementById("idMsgAvisoNome").className = "msgHideErro";
                    return false;
                } else if ( tam > 30) {
                    document.getElementById("idMsgErroNome").className = "msgHideErro";
                    document.getElementById("idMsgAvisoNome").className = "msgShowErro";                    
                }
                else {
                    document.getElementById("idMsgErroNome").className = "msgHideErro";
                    document.getElementById("idMsgAvisoNome").className = "msgHideErro";
                }
                var f = document.forms["formulario"];
                if (f["EI"].checked || f["A1"].checked || f["A2"].checked || f["A3"].checked || f["A4"].checked || f["OUTROS"].checked) {
                    document.getElementById("idMsgAvisoSerie").className = "msgHideErro";
                    return true;
                } else {
                    document.getElementById("idMsgAvisoSerie").className = "msgShowErro";
                    return false;
                }
            }
            if (currentIndex === 1) {
                var f = document.forms["formulario"];
                if (f["RPU"].checked || f["RPR"].checked || f["ROUTROS"].checked) {
                    document.getElementById("idMsgAvisoRede").className = "msgHideErro";
                } else {
                    document.getElementById("idMsgAvisoRede").className = "msgShowErro";
                    return false;
                }

                var tam = document.forms["formulario"]["email"].value.length;
                if (tam<5) {
                    document.getElementById("idMsgErroEmail").className = "msgShowErro";
                    return false;
                }
                else {
                    document.getElementById("idMsgErroEmail").className = "msgHideErro";
                }
                tam = document.forms["formulario"]["whats"].value.length;
                if (tam<5) {
                    document.getElementById("idMsgErroWhats").className = "msgShowErro";
                    return false;
                }
                else {
                    document.getElementById("idMsgErroWhats").className = "msgHideErro";
                }
                var f =$("form");
                var query =  f.serialize();
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () { console.log(this); }

                xhttp.open("GET", "https://southamerica-east1-instant-vent-304716.cloudfunctions.net/reserva?" + query);
                xhttp.send();

                document.getElementById("p2Email").innerHTML = document.getElementById("email").value;
                
                return true; 
            }
            if (currentIndex === 2) {
                return true;
            }

        },
        onFinished: function (event, currentIndex) {
            window.location.href = "/?concluido=";
        },
        labels: {
            finish: "Terminar",
            next: "",
            previous: "Anterior"
        }
    });
    // Custom Steps Jquery Steps
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
        alert("previous");
    })
    // Checkbox
    $('.checkbox-circle label').click(function(){
        $('.checkbox-circle label').removeClass('active');
        $(this).addClass('active');
    })
})
function desligaErroNome() {
    document.getElementById("idMsgErroNome").className = "msgHideErro";
    document.getElementById("idMsgAvisoNome").className = "msgHideErro";
}
function onKeyUpNome() {
    /* Era do código anterior
    var nome = document.forms["formulario"]["nome"].value;
    if (nome.length > 0) {
      document.getElementById("nomeDele").innerHTML = nome;
      document.getElementById("nomeDela").innerHTML = nome;

      if (document.getElementById("dele"))  {
        document.getElementById("p1-artigo1").innerHTML = "O";
        document.getElementById("p2-artigo1").innerHTML = "o";
      }
      else {
        document.getElementById("p1-artigo1").innerHTML = "A";
        document.getElementById("p2-artigo1").innerHTML = "a";
      }
      document.getElementById("p1-nome1").innerHTML = nome;
      document.getElementById("p2-nome1").innerHTML = nome;
    }
    else {
        document.getElementById("nomeDele").innerHTML = "...";
        document.getElementById("nomeDela").innerHTML = "...";
    }
    */
}
function onDele() {
    /* codigo anterior
    document.getElementById("p1-artigo1").innerHTML = "O";
    document.getElementById("p2-artigo1").innerHTML = "o";
    */
}

function onDela() {
    /* codigo anteior
    document.getElementById("p1-artigo1").innerHTML = "A";
    document.getElementById("p2-artigo1").innerHTML = "a";
    */
}

function desligaErroEmail() {
    document.getElementById("idMsgErroEmail").className = "msgHideErro";
}

function desligaErroWhats() {
    document.getElementById("idMsgErroWhats").className = "msgHideErro";
}