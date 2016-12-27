$.ajax({
           type: "GET",
           contentType: "application/json; charset=utf-8",
           url: 'api/v1/cities',
           dataType: 'json',
           success: function (data) {
             console.log(data)
               draw(data);
           },
           error: function (result) {
               error();
           }
       });
