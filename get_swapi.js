var req = new XMLHttpRequest();
var URLhost = 'https://swapi.co/api/planets/';

req.open('GET', URLhost, true);
req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for (var k = 0; k < response.results.length; k++) {
            (function(y) {

                var separarator = response.results[y].population;
                var number_string = separarator.replace(/[^,\d]/g, '').toString(),
                split   		= number_string.split(','),
                sisa     		= split[0].length % 3,
                rupiah     		= split[0].substr(0, sisa),
                ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

                if(ribuan){
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }
                rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

                var show = document.getElementById("show");                    
                show.insertAdjacentHTML('beforebegin',
                `<tr>
                    <td>`+(k+1)+`</td>
                    <td>`+response.results[y].name+`</td>
                    <td>`+response.results[y].rotation_period+`</td>
                    <td>`+response.results[y].orbital_period+`</td>
                    <td>`+response.results[y].diameter+`</td>
                    <td>`+response.results[y].climate+`</td>
                    <td>`+response.results[y].gravity+`</td>
                    <td>`+response.results[y].terrain+`</td>
                    <td>`+response.results[y].surface_water+`</td>
                    <td>`+rupiah+`</td>
                </tr>`);
            })(k);
        }
    } else {
        console.log('Error in network request: ' + req.statusText);
    }});

req.send(null);

    