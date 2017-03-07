var app=angular.module('dynamicForm',[]);

app.controller('homePage',function($scope,$http,$q){
    
    /* Fetching input JSON file using $http service */
    $http.get('data/app.json').then(function(response){$scope.jsonData = response.data;},function(data,stCode,status){});
    
    /* Function to manipulate the input JSON & adding dynamic DOM elements */
    $scope.show = function(){
        var form = document.createElement("form");
        document.getElementById("dForm").appendChild(form);

        /* main loop to iterate through all the elements */
        for(var key in $scope.jsonData){
            if(typeof $scope.jsonData[key] == "object"){
                if($scope.jsonData[key].hasOwnProperty("element")){
                    if($scope.jsonData[key].element == "input"){
                        var div = document.createElement("div");
                        div.classList.add("form-group");
                        form.appendChild(div);
                    }
                    var item = document.createElement(""+$scope.jsonData[key].element);

                    /* Element loop : to fetch element details */
                    for(var prop in $scope.jsonData[key]){
                        if(prop != "element"){
                            if($scope.jsonData[key].element == "input" && prop == "name"){
                                var elem = document.createElement("label");
                                console.log($scope.jsonData[key][prop]);
                                elem.innerText = ""+$scope.jsonData[key][prop];
                                div.appendChild(elem);
                            }
                            else {

                                /* Attributes Loop : to fetch all attributes of an element */
                                for(var attr in $scope.jsonData[key][prop]){
                                    if(attr != "text"){
                                        item.setAttribute(attr,$scope.jsonData[key][prop][attr]);
                                    }
                                    else
                                    item.textContent = $scope.jsonData[key][prop][attr];
                                }
                            }
                        }
                        if($scope.jsonData[key].element == "input"){
                            div.appendChild(item);
                        }
                        else {
                            form.appendChild(item);
                        }
                    }
                }
            }
        }
    }

});
