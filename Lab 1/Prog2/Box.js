const box = {
    label: 'My usefull',
    //nested object
    dimensions: {
      width: 20,
      height: 10
    },
    //function
    describe: function() {
      console.log(`This is the '${this.label}' box`);
    }
  };
  
  // Sharing box object
  module.exports = box;