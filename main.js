//Заменим наш бекенд на NodeJS на аngular-mocks - сервис, который будет отдавать нам данные вместо бекенда. 
//Это позволит нам разрабатывать фронтенд полностью без бекенда.

//Возьмем код из урока 18  у нас есть get и post запросы получающие и отправляющие данные  через сервер node и работающие с backend.js
//В этот раз не бум запускать node
// откроем браузер и посмотрим консоль
// там будет ошибка - поскольку наш сервер не запущен и обмена данными происходить не будет

// Как работать с Angular-mocks?
// для начала надо подключить angular-mocks через скрипт в html
//<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-mocks.js"></script>
// далее при инициализации надо во второй параметр-массив добавить var app = angular.module('app', ['ngMockE2E']);
// потом напишем 
// app.run(function(){
    // console.log('RUN APP');
// });
//Что такое run - это функция которая позволяет делать какие-то вещи сразу после инициализации приложения
// в данном случае мы хотим объявить какие параметры бекэнда мы хотим перехватить для работы работы нашего приложения
// создадим в этой функции массив books так же как мы делали на backend.js
    // var books = [
  // {
    // name: 'AngularJS'
  // },
  // {
    // name: 'EmberJS'
  // },
  // {
    // name: 'ReactJS'
  // }
// ];

// Заиджектим в run такой сервис как $httpBackend  - возможность заиджектить этот сервис дает подключенный при инициализации параметр ['ngMockE2E']
// далее пишем $httpBackend.whenGET('http://localhost:3001/books').respond(200, books)
// в написаной строке мы говорим что через службе $httpBackend мы хотим перехватить запрос с помощью функции whenGET посланный на адрес http://localhost:3001/books
// и получить ответ 200 при получении books

// теперь запустим браузер и посмотрим в консоль
// в браузере у нас вывелись три книги
// в консоли мы видим полученные объекты все работает
// Если же посмотрим в network all то увидим что никакие запросы get на бэкэнд не ушли и что angular-mocks эти запросы перехватил

// теперь усложним задачу и напишем запросы post
//$httpBackend.whenPOST('http://localhost:3001/books').respond(function(method, url, data){
    // console.log('method', method);
    // console.log('url', url);
    // console.log('data', data);
// });
//запустим браузер введем в инпут строку и нажмем кнопку
// в консоли мы увидим информацию о method - POST, url - http://localhost:3001/books, data - строка введенная в инпут 

// теперь нам надо что-то вернуть
// var result = JSON.parse(data);
// т.е. возвращаем в JSON при помощи parse data - инфу введенную в инпут
// теперь пишем следующую строку
// books.push(result);  - т.е. пушим в наш result
// и дальше возвращаем мы массив return [200, result]; т.е. все успешно 200 и возвращаем массив result

// теперь у нас добавляется книга и все проходит без ошибок

// И так мы можем пользовать $httpBackend всегда когда не хотим париться с бекэндом 
// мы можем использовать любые типы запросов 
// мы можем использовать не только строку с адресом http://localhost:3001/books но и РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ОБ ЭТОМ МОЖНО БОЛЬШЕ ПРОЧИТАТЬ В ДОКУМЕНТАЦИИ




var app = angular.module('app', ['ngMockE2E']);

app.run(function($httpBackend){
    console.log('RUN APP');
  
    var books = [
  {
    name: 'AngularJS'
  },
  {
    name: 'EmberJS'
  },
  {
    name: 'ReactJS'
  }
];

$httpBackend.whenGET('http://localhost:3001/books').respond(200, books);

$httpBackend.whenPOST('http://localhost:3001/books').respond(function(method, url, data){
    console.log('method', method);
    console.log('url', url);
    console.log('data', data);
    
    var result = JSON.parse(data);
    return [200, result];

});

});

app.controller ('mainCtrl', function($http, $scope){

   
   $http.get('http://localhost:3001/books')
   .success(function(result){
       console.log('!', result);
       $scope.books = result;
    
       
   })
   .error(function(result) {
      console.log('error');
   });
   
   $scope.addBook = function(book){
    console.log(book);
    $http.post('http://localhost:3001/books', book)
    .success(function(result){
        console.log('Book successfully saved to backend');
        $scope.books.push(book);
        $scope.book = null;
    })
    .error(function(result) {
        console.log('Error in back post');
     });
   }; 
});










