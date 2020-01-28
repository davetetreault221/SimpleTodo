
$(function() {

    //User Log In
    //*********************************************************************
    $("#loginSub").on("click",async function () {

        console.log('The button to log in was pushed');

        //Get Data
        //*********************************************
        let data = {};
        data.email = $('#loginUser').val();
        data.password = $('#loginPassword').val();

        //*********************************************

        //Ajax Request to Check if User Valid
        //*********************************************
        try
        {
            const result = await $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                async: false,
                url: getName() + '/users/login'
            });

            //After the call if a success redirect
            console.log(result);
            let url = getName()+'/main';
            window.location = url;

        } catch (error)
        {
            console.log(error);
            alert(error);
        }

        //*********************************************
    });
    //*********************************************************************


    //Create a User
    //*********************************************************************
    $('#createAccount').on('click', ()=>
    {
        //Get Values
        //**********************************************
        let data = {};

        data.password = $('#newPassword').val();
        data.name = $('#newName').val();
        data.email = $('#newEmail').val();
        data.age = $('#newAge').val();
        //**********************************************

        //Ajax Call to try and Create User
        //**********************************************
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: getName()+'/users'
        }).then(()=>{
            let url = getName() + '/main';
            window.location = url;
        }).catch((error)=>{

            //Ajax Call was a failure
            alert(error)
        })
        //**********************************************

    })
    //*********************************************************************

    function getName()
    {
        //Dev
        //  return 'http://localhost:3000'
        //
        //Prod
        return 'https://task-manager-tetreault.herokuapp.com'
    }

//End of Document Ready Function
});