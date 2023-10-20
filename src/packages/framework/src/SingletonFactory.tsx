import RestClientBlock from "./Blocks/RestApiClientBlock";

var SingletonFactory = (function () {
  let restBlockInstance: any;

  return {
    getRestBlockInstance: function () {
      if (!restBlockInstance) {
        restBlockInstance = RestClientBlock.getInstance();
        restBlockInstance.constructor = null;
      }
      return restBlockInstance;
    },
  };
})();

export default SingletonFactory;
