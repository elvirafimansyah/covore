import Logo from "./logo";
import NavigationBar from "./navigation-bar";

const Navbar  = () => {
  return ( 
    <div className="border-b">
      <div className="flex justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 xl:px-0 max-w-6xl ">
        <Logo />
        <NavigationBar />
      </div>
    </div>
  );
}

export default Navbar ;