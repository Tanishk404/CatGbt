import React from "react";
import clsx from "clsx";
import { SidebarContext } from "../../context/SidebarContext";

import { useContext, useState } from "react";
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

function MobileBar({ titles, setSearchChat, searchChat }) {
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  const {isUser, setIsUser} = useContext(UserCont)

  const { id: ActiceId } = useParams();

  const {
    ThreeDot,
    setThreeDot,
    Rename,
    setRename,
    RenameValue,
    setRenameValue,
    HandleRename,
    HandleDeleteChat,
    menuId,
    setOpenMenuId,
  } = useContext(DeleteAndRenameContext);

  return (
    <div
      className={clsx(
        "bg-[rgb(235, 232, 232)] h-full sm:hidden lg:hidden md:hidden xl:hidden border-r-2 border-gray-300 overflow-y-auto",
        isOpen
          ? "w-56 absolute z-50 bg-[#EBE8E8] transition-all ease-in"
          : "w-0 sm:w-[70px] md:w-[70px] lg:w-[70px] overflow-x-hidden transition ease-in-out",
      )}
    >
      <div className=" flex flex-col gap-2 ml-2 sticky top-0 bg-[rgb(235,232,232)]">
        <div
          className="w-full flex justify-end"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
        </div>

        <small className={clsx(isOpen ? "block" : "hidden")}>DASHBOARD</small>
        <div className="hover:bg-gray-100 p-1 rounded-lg flex gap-2 items-center">
          <SquarePen className="w-[20px]" />
          <Link to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            Create a new Chat
          </Link>
        </div>

        <div
          className="hover:bg-gray-100 p-1 rounded-lg flex gap-2 items-center"
          onClick={() => {
            setSearchChat(!searchChat);
            setIsOpen(!isOpen);
          }}
        >
          <Search className="w-[20px]" />
          <Link to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            {" "}
            Search Chat
          </Link>
        </div>

        <div className="flex gap-2 align-middle items-center hover:bg-gray-100 p-1 rounded-lg">
          <Images className="w-[20px]" strokeWidth="2" />
          <Link to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            Images
          </Link>
        </div>
      </div>
      <hr className="h-[2px] bg-gray-300 m-2" />

      <div className={clsx(isOpen ? "block" : "hidden")}>
        <small className="ml-2">Chats</small>
        <div className="ml-2 flex-col flex gap-2 h-full  px-2 space-y-3 mb-4">
          {titles?.length > 0 ? (
            titles &&
            titles.map((v, i) => {
              return (
                <>
                  <div
                    onMouseEnter={() => {
                      setThreeDot(v._id);
                    }}
                    onMouseLeave={() => {
                      setThreeDot(null);
                    }}
                    to={`/chat/${v._id}`}
                    key={v._id}
                    className="hover:bg-gray-100 p-1 flex rounded-lg text-start  justify-between "
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
                      <Link className=" w-full" to={`/chat/${v._id}`}>
                        <span className="truncate">{v.title}</span>
                      </Link>
                    )}
                    <div
                      className={clsx(
                        "bg-[#ebe8e8] shadow-md h-[100px] pt-4 p-2 flex-col mt-5 rounded-lg w-[120px]  text-start items-start absolute gap-2 right-0",
                        menuId === v._id ? "flex" : "hidden",
                      )}
                    >
                      <small
                        onClick={(e) => {
                          e.preventDefault();
                          setRename(v._id);
                        }}
                        className="flex justify-start items-start  gap-2 text-center cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" /> Rename
                      </small>
                      <small
                        onClick={() => HandleDeleteChat(v._id, ActiceId)}
                        className="flex
                                                        gap-2
                                                        text-red-700 items-center text-center cursor-pointer"
                      >
                        <Trash className="h-4 w-4" />
                        Delete
                      </small>
                    </div>
                    <Ellipsis
                      className={clsx(
                        " text-gray-500 cursor-pointer",
                        ThreeDot == v._id ? "block" : "hidden",
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
          )}
        </div>
      </div>

      {/* <hr className='h-[3px] bg-gray-300 m-2' /> */}
      <div
        className={clsx(
          "fixed  bg-[rgb(235,232,232)] flex items-center gap-2 p-2",
          isOpen ? "bottom-0" : "top-full",
        )}
      >
        { isUser === true ? (
                        <>
                            <p className='ml-2 bg-black h-8 w-8 rounded-full text-white text-center text-lg'>
                            T
                            </p>
                            <p className={clsx(isOpen ? "block": "hidden")}>Tanishk Rajput</p> 
                        </>
                    )
        
                    :
       
                           isOpen ? (
                           
                               <div className='flex gap-2 text-center items-center'>
                               <CircleUserRound strokeWidth={1} className='w-10 cursor-pointer h-10' />
                               <Link to={"/user/login"} >Login</Link>
                           </div>
                       
                       ) :  <Link to={"/user/login"}>
                       <CircleUserRound strokeWidth={1} className='w-10 cursor-pointer h-10' /></Link>
                       }
      </div>
    </div>
  );
}

export default MobileBar;
