import {
    Avatar,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    DropdownDivider,
    Navbar,
  } from "flowbite-react";
  import { useSelector, useDispatch } from "react-redux";
  import { signoutSuccess } from "../redux/userSlice";
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom";
  import { toast } from "react-toastify";
  
  const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
  
    const logout = async () => {
      dispatch(signoutSuccess());
      toast.success("Issiloginote sekmingai");
      navigate("");
    };
    return (
      <Navbar className="border-b-2  py-4 w-full max-w-7xl mx-auto bg-white text-slate-900 dark:text-white dark:bg-slate-950">
        <Link
          to="/home"
          className="self-center whitespace-nowrap text-xl font-semibold"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-amber-500 via-purple-500 to-lime-500 rounded-lg">
            Skelbimu
          </span>
          Lenta
        </Link>
        <div className="flex gap-2 md:order-2">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.data.profilePicture}
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{currentUser.data.email}</span>
                <span className="block text-sm font-medium truncate"></span>
              </DropdownHeader>
              {currentUser.data.role === "admin" && (
                <Link to="/admin">
                  <DropdownItem>Admino puslapis</DropdownItem>
                </Link>
              )}
              <Link to="/user">
                  <DropdownItem>Kurti skelbima</DropdownItem>
                </Link>
              <DropdownDivider />
              <DropdownItem onClick={logout}>Atsijungti</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/">
              <button className="p-2 border-2 rounded-xl">Prisijungti</button>
            </Link>
          )}
        </div>
      </Navbar>
    );
  };
  
  export default Header;