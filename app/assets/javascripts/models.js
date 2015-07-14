
$(function () {
    $(".product").draggable({
        helper: 'clone'
    });
    // DISPALY THE SELECTED MODEL
    $('#show_model').on('click', function(e){
      e.preventDefault();
      var model_id = $( "#model_select" ).val();
      $.ajax({
          url: "/models/" + model_id,
          cache: false,
          success: function(html){
            $("#model_content").html(html);

            // drag & drop image(id image start with container)
            $('div[id^="container"]').droppable({
                 accept: '.product',
                 drop: function(event, ui) {

                     if ( $(this, "img").length == 1) {
                           $(this).html("");
                      }
                     $(this).append($(ui.draggable).clone());
                     $(this,".product").addClass("item");
                     $(".item").removeClass("ui-draggable product");
                 }
            });

            // BUTTON COLOR(id button start with btn_)
            $('button[id^="btn_"]').on('click', function(e){
                  button = $(this);
                 var background = $(this).css("background-color");
                 var text_color = $(this).css('color');
                 document.getElementById('color_backgroung').color.fromString("DDDDDD");
                 document.getElementById('color_text').color.fromString("333358");
                
                $( "#target" ).click();
               
               // CHANGE BACKGROUND COLOR BUTTON WHEN CHANGE PICKER
               $("#color_backgroung").change(function() {
                  button.css('background', "#" + this.color); 
               });

               // CHANGE TEXT COLOR BUTTON WHEN CHANGE PICKER
               $("#color_text").change(function() {
                  button.css('color', "#" + this.color); 
               });
                
                // CANCEL CHANGE COLOR BUTTON
                $('#cancel').on('click', function(e){
                  button.css('background',  background);
                  button.css('color', text_color);
                });
                
                // MODAL SAVE CHANGE COLOR BUTTON
                $('#save').on('click', function(e){
                  
                  button.css('background', "#" + document.getElementById('color_backgroung').value);

                  button.css('color', "#" + document.getElementById('color_text').value)
                });
                
            });
            
            // EDIT TEXT
            $('div[id^="text_edit_"]').attr('contenteditable','true');
            

          }
      });
    });  

    // SET DEFAULT MODEL
    $("#default_model").on('click', function(e){
        var model_id = $( "#model_select_default" ).val();
        var model_ = $( "#model_select_default option:selected" ).text();
        $.ajax({
          url: "/models/" + model_id ,
          data: { _method:'PUT', model: {id: model_id, basic: true}},
          type: "POST",
          success: function(data) {
          $('.alert').html( model_ + " est le modèle de mise en page par défaut");
            $(".alert").show();
            $(".alert").delay(1000).slideUp(200, function() {
             $(this).hide();
            });  
                
          },
          failure: function() {
            alert("Unsuccessful update");
          }
        });  
  
    });


});