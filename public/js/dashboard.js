

$(function() {

    //After the Page has loaded

    let taskID = "";
    var totalNumTask = 0;


    $(".main-message").css('visibility','visible');
    $(".main-table").css('visibility','visible');



    $(".main-message").hide().fadeIn(4500, () => {

        //Animation Completed
    });

    loadTaskTable();



    //Adding a new Task
    //*******************************************************
    $("#addTask").on("click", function (clickEvent) {


        $('.firstTask').css('visibility','hidden');


        const newDescription = $('#newTask').val()

        if(newDescription) {
            //Need to make ajax call to add a new task
            const data = {description: newDescription};

            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: getName() +'/tasks'
            }).then((result) => {

                totalNumTask++;

                //Append task to the end of the table
                $('#table tr:last').before('' +
                    '<tr>' +
                    '<th scope="row">'+(totalNumTask)+'</th>' +
                    '<td>'+ newDescription + '</td>' +
                    '<td>' +
                    '<div class="form-check">\n' +
                    '<input id="check'+(totalNumTask)+'"class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">\n' +
                    '</div>' +
                    '</td>' +
                    '<td><button type="button" data-toggle="modal" data-target="#deleteModal" class="delete-btn" id="deleteBtn'+(totalNumTask)+'">' +
                    '<i class="fa fa-trash-o" aria-hidden="true"></i></td>' +
                    '</button>' +
                    '</tr>'
                );


                $('#taskIds').append('<input type="hidden" id="taskID'+(totalNumTask)+'" name="custId" value="'+result._id+'">');
                $('#newTask').val('');

                watchButtons();


            }).catch((e) => {
                console.log("There was an error adding a task: " + e)
            });
        }
        else
        {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();

            alert('You left the task description empty!');
        }
    })
    //*******************************************************


    //Function to load the table
    //************************************************************************
    function loadTaskTable() {

        //Calling to get all of the task associated to a user
        //*******************************************************
        try {
            $.ajax({
                type: 'GET',
                // data: JSON.stringify(data),
                contentType: 'application/json',
                url: getName()+'/tasks',
                success: function (results) {

                    if(results.length > 0)
                    {
                        $('.firstTask').css('visibility','hidden');
                    }

                    totalNumTask = results.length;
                    //Loading the table
                    //******************************************
                    for (let i = 0; i < results.length; i++) {
                        $('#table tr:last').before('' +
                            '<tr>' +
                            '<th scope="row">'+(i+1)+'</th>' +
                            '<td>'+ results[i].description + '</td>' +
                            '<td>' +
                            '<div class="form-check">\n' +
                            '<input id="check'+(i+1)+'"class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">\n' +
                            '</div>' +
                            '</td>' +
                            '<td><button type="button" data-toggle="modal" data-target="#deleteModal" class="delete-btn" id="deleteBtn'+(i+1)+'">' +
                            '<i class="fa fa-trash-o" aria-hidden="true"></i></td>' +
                            '</button>' +
                            '</tr>');


                        if(results[i].completed === true)
                        {
                            $('#check'+(i+1)).attr('checked','true');
                        }

                        $('#taskIds').append('<input type="hidden" id="taskID'+(i+1)+'" name="custId" value="'+results[i]._id+'">');


                    }
                    //******************************************

                    watchButtons();
                }
            });

        } catch (error)
        {
            alert("invalid email/password");
            console.log('There was an error');
        }
        //*******************************************************
    }
    //************************************************************************



    //Making table Slide in
    //************************************************************************
    let left = $('#tableDiv').offset().left;
    left = left +1000;
    $("#tableDiv").css({left:left}).animate({"left":"0px"}, 4000);
    //************************************************************************



    //Delete BTN
    //************************************************************************
    //
    function watchButtons()
    {
        $('.delete-btn').on('click', function () {

                //Get ID and remove words
                let btnID = $(this).attr('id');
                btnID = btnID.replace('deleteBtn', '');
                taskID = $('#taskID' + btnID).attr('value');

                console.log(taskID);
        });
   }

   function addClickEvent(buttonID) {


       $('#' + buttonID).on('click', function () {

           //Get ID and remove words
           let btnID = $(this).attr('id');
           btnID = btnID.replace('deleteBtn', '');
           taskID = $('#taskID' + btnID).attr('value');

           console.log(taskID);
       });

   }

    //Function to add the headers
    function addHeaders()
    {
        //Add the headers to the table

        $('#table thead').append('<tr>\n' +
            '                        <th scope="col">#</th>\n' +
            '                        <th scope="col">Description</th>\n' +
            '                        <th scope="col">Done?</th>\n' +
            '                           </tr>');
    }

    $('#deleteTask').on('click', ()=>{

        $.ajax({
            type: 'DELETE',
            // data: JSON.stringify(data),
            contentType: 'application/json',
            url: getName()+'/tasks/' + taskID,
        }).then(() => {

            //Reset the table
            //*************************************************
            //Empty the associated Task ID
            $('#taskIds').empty();
            //Empty the table except the last 'Add Task button'
            $("#table").find('tr:not(:last)').remove();
            //Add the table headers
            addHeaders();
            //Reload the table
            loadTaskTable()
            //*************************************************

        }).catch((e) => {

            console.log('There was an error deleting' + e);

        })
    })

    $('#logoutBtn').on('click', ()=>{

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: getName() +'/users/logout'
        }).then(()=>{

            console.log('User was Logged Out')
            let url = getName();
            window.location = url;

        }).catch((error)=>{

            console.log('There was an error');
        })
    })


    //************************************************************************

    function getName()
    {
        //Dev
        return 'http://localhost:3000'

        //Prod
        // return 'https://task-manager-tetreault.herokuapp.com'
    }

//End of the Document Ready JQuery Function
});
