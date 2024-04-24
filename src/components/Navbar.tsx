const Navbar = () => {
  return (
    <header className="w-full absolute z-10 top-0">
      <nav className="bg-gray border-b-2 border-white h-14 max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <h1>Project #</h1>
        <div className=" flex items-center">
          <p>icon</p>
          <div className="mx-2"></div>
          <p>login</p>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
