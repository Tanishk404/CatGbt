import React, { useRef } from "react";
import clsx from "clsx";
import { SidebarContext } from "../../context/SidebarContext";
import MiniDashBoard from "../MiniDashBoard/MiniDashBoard";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Images,
  PanelRightClose,
  PanelRightOpen,
  Search,
  SquarePen,
  Ellipsis,
  Pencil,
  Trash,
  CircleUserRound,
} from "lucide-react";
import { DeleteAndRenameContext } from "@/context/DeleteAndRename";
import { UserCont } from "@/context/UserContext";
import ThemeToggle from "../ThemeComponent";

function MobileBar({ titles, setSearchChat, searchChat, setDashBoard, dashBoard }) {
  const { isOpen, setIsOpen } = useContext(SidebarContext);


 

  const {isUser, setIsUser, Isavatar, setAvatar} = useContext(UserCont)

  const { id: ActiceId } = useParams();


 const avatarUrl =`${import.meta.env.VITE_AVATAR_URL}?name=${Isavatar}&length=1&background=000000&color=ffffff&size=256&rounded=true`;
  
    useEffect(() => {
      isUser?.map((v, i) => {
        return setAvatar(v.username);
      });
    }, [isUser]);

  const {
    Rename,
    setRename,
    RenameValue,
    setRenameValue,
    HandleRename,
    HandleDeleteChat,
    menuId,
    setOpenMenuId,
  } = useContext(DeleteAndRenameContext);

  const [ThreeDot, setThreeDot] = useState(true)

  return (
    <div
      className={clsx(
        "bg-[rgb(235, 232, 232)] h-full sm:hidden lg:hidden md:hidden xl:hidden border-r-2  border-gray-300 overflow-y-auto overflow-x-hidden",
        isOpen
          ? "w-56 absolute z-50 dark:bg-[#1e1e1e] bg-[#EBE8E8] transition-all ease-in dark:border-r-[1px] dark:border-gray-300"
          : "w-0 sm:w-[70px] md:w-[70px] lg:w-[70px] overflow-x-hidden transition ease-in-out dark:border-r-[0px] dark:border-gray-300",
      )}
    >
      <div className=" flex flex-col gap-2 ml-2 sticky top-0 dark:bg-[#1e1e1e] bg-[rgb(235,232,232)]">
        <div
          className="w-full flex justify-end"
          onClick={() => {
            setIsOpen(!isOpen);
            setDashBoard(false)
          }}
        >
          {isOpen ? <PanelRightOpen className="cursor-pointer" /> : <PanelRightClose className="cursor-pointer" />}
        </div>

        <small className={clsx(isOpen ? "block" : "hidden")}>DASHBOARD</small>
        <div className="hover:bg-gray-100 dark:hover:bg-[#2e2e2f] p-1 rounded-lg flex gap-2 items-center">
          <SquarePen className="w-[20px]" />
          <Link to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            Create a new Chat
          </Link>
        </div>

        <div
          className="hover:bg-gray-100 p-1 rounded-lg flex gap-2 items-center dark:hover:bg-[#2e2e2f]"
          onClick={() => {
            setSearchChat(!searchChat);
            setIsOpen(!isOpen);
          }}
        >
          <Search className="w-[20px]" />
          <button to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            {" "}
            Search Chat
          </button>
        </div>

        {/* <div className="flex gap-2 align-middle items-center hover:bg-gray-100 p-1 rounded-lg dark:hover:bg-[#2e2e2f]">
          <Images className="w-[20px]" strokeWidth="2" />
          <Link to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            Images
          </Link>
        </div> */}
      </div>
      <hr className="h-[2px] bg-gray-300 m-2" />

      <div className={clsx(isOpen ? "block" : "hidden")}>
        <small className="ml-2">Chats</small>
        <div className="ml-2 flex-col flex gap-2 h-full  px-2 space-y-3 mb-[100px]">
          
          {
          isUser ?(
          titles?.length > 0 ? (
            titles &&
            titles.map((v, i) => {
              return (
                <>
                  <div
            
         
                    to={`/chat/${v._id}`}
                    key={v._id}
                    className="hover:bg-gray-100 dark:hover:bg-[#2e2e2f] p-1 flex rounded-lg text-start  justify-between "
                  >
                    {/* Rename Input Form */}

                    <input
                      name="title"
                      type="text"
                      value={RenameValue}
                      onChange={(e) => {
                        setRenameValue(e.target.value);
                      }}
                      onBlur={() => HandleRename(v._id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          HandleRename(v._id);
                        }
                      }}
                      className={clsx(
                        "bg-transparent outline-none w-full",
                        Rename === v._id ? "block" : "hidden",
                      )}
                    />

                    {Rename && Rename === v._id ? null : (
                      <Link className=" w-full truncate" to={`/chat/${v._id}`}>
                        <span className="truncate">{v.title}</span>
                      </Link>
                    )}
                    <div
                      className={clsx(
                        "bg-[#ebe8e8] dark:bg-[#2e2e2e] shadow-md h-[100px] pt-4 p-2 flex-col mt-5 rounded-lg w-[120px] z-40 text-start items-start absolute gap-2 right-0",
                        menuId === v._id ? "flex" : "hidden",
                      )}
                    >
                      <small
                        onClick={(e) => {
                          e.preventDefault();
                          setRename(v._id);
                        }}
                        className="flex justify-start dark:hover:bg-[#1e1e1e] items-start hover:bg-white p-[2px] rounded-lg w-full gap-2 text-center cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" /> Rename
                      </small>
                      <small
                        onClick={() => HandleDeleteChat(v._id, ActiceId)}
                        className="flex
                                                        gap-2
                                                        text-red-700 items-center
                                                        dark:hover:bg-[#1e1e1e] 
                                                        text-center cursor-pointer hover:bg-white p-[2px] rounded-lg w-full"
                      >
                        <Trash className="h-4 w-4" />
                        Delete
                      </small>
                    </div>
                    <Ellipsis
                      className={clsx(
                        " text-gray-500 cursor-pointer block",
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMenuId(menuId === v._id ? null : v._id);
                      }}
                    />
                  </div>
                </>
              );
            })
          ) : (
            <p className="mt-40 text-center">No chat history</p>
          )) : (
            <div
                className={
                            "bg-gray-200 dark:bg-black/20 shadow-xl p-2 h-32 w-44 flex  flex-col items-center rounded-lg absolute bottom-24"
                          }
                        >
                          <p>Login to create chat history</p>
                          <Link to={"/user/login"}>Login</Link>
                        </div>
          )


        }
        </div>
      </div>

      {/* <hr className='h-[3px] bg-gray-300 m-2' /> */}
      <div
        className={clsx(
          "fixed  bg-[rgb(235,232,232)] dark:bg-[#1e1e1e] w-52 flex items-center gap-2 p-2 cursor-pointer",
          isOpen ? "bottom-0" : "top-full",
        )}
         onClick={() => setDashBoard(!dashBoard)}
      >
                  {isUser ? (
                    isUser.map((v, i) => {
                      return (
                        <>
                          {/* <p className='ml-2 bg-black h-8 w-8 rounded-full text-white text-center text-lg'>
                              T
                              </p> */}
                              <div className="hover:bg-white dark:hover:bg-[#2e2e2f] flex gap-4 items-center w-full rounded-lg p-1">

                          <img src={v.avatar || avatarUrl} className="h-8 rounded-full w-8" alt="" />
                          <p className={clsx(isOpen ? "block" : "hidden")}>
                            {v.username}
                          </p>

                              </div>
                        </>
                      );
                    })
                  ) : isOpen ? (
                    <div>
                      <ThemeToggle />
                    <Link to={"/user/login"} className="flex gap-2 text-center items-center dark:hover:bg-[#2e2e2f] hover:bg-white w-52 rounded-lg">
                      <CircleUserRound
                        strokeWidth={1}
                        className="w-10 cursor-pointer h-10"
                      />
                      <Link to={"/user/login"}>Login</Link>
                    </Link>

                    </div>
                  ) : (
                    <Link to={"/user/login"}>
                      <CircleUserRound
                        strokeWidth={1}
                        className="w-10 cursor-pointer h-10"
                      />
                    </Link>
                  )}
      </div>
    </div>
  );
}

export default MobileBar;
