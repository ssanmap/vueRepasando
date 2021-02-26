var app = new Vue({
    el:"#app",
    data:{
        clave:'',
        titulo:'',
        descripcion:'',
        lista:[],
        txtBuscar:''
     },
    computed:{
        listaFiltrada: function(){
            var arreglo = this.lista;
            var consulta = this.txtBuscar;
    
            if(consulta!==""){
                arreglo = arreglo.filter(function(obj){
                    return(
                        obj.titulo.toLowerCase() + ' ' + obj.descripcion.toLowerCase()
                    ).indexOf(consulta.toLowerCase()) > -1
                });
            }
    
            return arreglo;
        }
    
    },
    
     methods:{
         agregar:function(clave,titulo,descripcion){
            var item = {
                clave: clave,
                titulo:titulo,
                descripcion: descripcion
            }
            app.lista.push(item);
            firebase.database().ref("pasatiempos/"+clave).set(item);
         },
    
         eliminar:function(clave){
            var index = app.lista.map(function(obj){
                return obj.clave;
            }).indexOf(clave);
    
            app.lista.splice(index,1);
    
            firebase.database().ref("pasatiempos/"+clave).remove();
         },
    
         listarElementos: function(){
    
            var datos = firebase.database().ref("pasatiempos");
            datos.on("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    app.lista.push(childData);
                });
            });
         }
        },
    
        created: function()
        {
           this.listarElementos();
        }
    });