var FILTER_TYPES = ['All',
                    'Schedule',
                    'Active', 
                    'Done',
                    'Deleted'
                   ].map( function( filter ) {
  return {
    key : filter,
    name: filter.toLowerCase()
  };
});

//model
var model= {
    modelList : [],
    name:'',
    className: FILTER_TYPES[0]
     };

var controller={
  init:function(){
    var that = this,
    app = angular.module('app', []);
  
    app.controller('MainCtrl',function($scope) {
  
      $scope.model= model;
      $scope.FILTER_TYPES = FILTER_TYPES;
      $scope.checkIfEnterKeyWasPressed= that.checkIfEnterKeyWasPressed.bind($scope);
      //$scope.listItems = that.listItems.bind( $scope );
      $scope.onListClick = that.onListClick;
      $scope.onFilterClick = that.onFilterClick.bind( $scope ); 
      $scope.getTodoList = that.getTodoList.bind( $scope );
      
});
  
},
  
  /*listItems:function(){
    var $scope = this;
    return $scope.model.modelList;
  },*/
  
  checkIfEnterKeyWasPressed :function($event){
      var $scope = this;
      if($event.keyCode == 13){
     
      $scope.model.modelList.push({ 
       name : $scope.input,
       filterType: 1
      });
     $scope.input="";
    }
  },
  
  onFilterClick: function( filterType ) {
      var $scope = this;
      $scope.model.className = filterType;
    },
  
  onListClick: function( listItem ) {
      listItem.filterType = listItem.filterType + 1 === FILTER_TYPES.length ? 
        listItem.filterType : listItem.filterType + 1;
    },
  
  getTodoList: function() {
       var model = this.model,
       currentFilterKey = model.className.key;
      return currentFilterKey === 'All' ? model.modelList 
      : model.modelList.filter( function( listItem ) {
       return FILTER_TYPES[listItem.filterType].key === currentFilterKey;
      } );
    },
    
  
  
};

controller.init();