class NoLocationResult {
  constructor() {
    document.addEventListener("onLocationFound", this.reset);
    document.addEventListener("onNoLocationFound", this.updateUser);
  }

  reset = () => {
    console.log("reset updateUser");
  };

  updateUser = () => {
    console.log("updateUser");
  };
}
