import React, { createContext, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
Link;
import clsx from "clsx";
import { SidebarContext } from "../../context/SidebarContext";
import { DeleteAndRenameContext } from "@/context/DeleteAndRename";
import axios from "axios";
import { useEffect } from "react";
import { TitleContext } from "@/context/TitleContextComp";

import {
  Images,
  Search,
  SquarePen,
  Ellipsis,
  Pencil,
  Trash,
  CircleUserRound,
} from "lucide-react";
import { UserCont } from "@/context/UserContext";

function SideBar({
  titles,
  setTitles,
  searchChat,
  setSearchChat,
  dashBoard,
  setDashBoard,
}) {
  const { id: ActiceId } = useParams();

  const { isOpen, setIsOpen } = useContext(SidebarContext);

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

  const { isUser, setIsUser, Isavatar, setAvatar } = useContext(UserCont);

  const [focus, setFocus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/titles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const array = res.data.titles;
        const UserData = res.data.User;

        setIsUser(UserData);
        if(UserData){
            setTitles(array);
        }
      })
      .catch((er) => {
        console.log("Error from Side bar : ", er);
      });
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?name=${Isavatar}&length=1&background=000000&color=ffffff&size=256&rounded=true`;

  useEffect(() => {
    isUser?.map((v, i) => {
      return setAvatar(v.username);
    });
  }, [isUser]);

  return (
    <div
      className={clsx(
        "bg-[rgb(235, 232, 232)] hidden sm:block lg:block md:block xl:block h-full z-50 bg-[#ebe8e8] border-r-2 border-gray-300 overflow-y-auto relative",
        isOpen
          ? "w-80 transition-all ease-out"
          : "w-0 sm:w-[70px] md:w-[70px] lg:w-[70px] overflow-x-hidden transition-all ease-in mt-",
      )}
    >
      <div className=" flex flex-col gap-2 ml-2 sticky top-0 bg-[rgb(235,232,232)]">
        <div className="w-full flex justify-end"></div>

        <small className={clsx(isOpen ? "block" : "hidden")}>DASHBOARD</small>
        <div className="hover:bg-gray-100 p-1 rounded-lg flex gap-2 items-center">
          <Link
            to={"/"}
            className={clsx(
              "flex gap-3 items-center",
              isOpen ? "hidden" : "block",
            )}
          >
            <SquarePen className="w-[20px]" />
          </Link>
          <Link
            to={"/"}
            className={clsx(
              "flex gap-3 items-center",
              isOpen ? "block" : "hidden",
            )}
          >
            <SquarePen className="w-[20px]" />
            Create a new Chat
          </Link>
        </div>

        <button
          onClick={() => {
            setSearchChat(!searchChat);
          }}
          className="hover:bg-gray-100 p-1 rounded-lg flex gap-2 items-center"
        >
          <Search className="w-[20px]" />
          <p className={clsx(isOpen ? "block" : "hidden")}> Search Chat</p>
        </button>

        <div className="flex gap-2 align-middle items-center hover:bg-gray-100 p-1 rounded-lg">
          <Images className="w-[20px]" />
          <Link to={"/"} className={clsx(isOpen ? "block" : "hidden")}>
            Images
          </Link>
        </div>
      </div>
      <hr className="h-[2px] bg-gray-300 m-2" />

      <div className={clsx(isOpen ? "block" : "hidden")}>
        {isUser && <small className="ml-2">Chats</small>}
        <div className="ml-2 flex-col flex h-full px-2 space-y-2 gap-4 mb-[70px]">
          {isUser ? (
            titles?.length > 0 ? (
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
                        onFocus={() => {
                          setFocus(false);
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
                        <Link className={"w-full truncate"} to={`/chat/${v._id}`}>
                          <span className="truncate">{v.title}</span>
                        </Link>
                      )}
                      <div
                        className={clsx(
                          "bg-[#ebe8e8] shadow-md h-[100px] pt-4 p-2 flex-col mt-5 rounded-lg w-[120px] z-40 text-start items-start absolute gap-2 right-0",
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
            )
          ) : (
            <div
              className={
                "bg-gray-200 shadow-xl p-4 h-32 w-44 flex justify-center flex-col items-center rounded-lg left-10 absolute bottom-16"
              }
            >
              <p>Login to create chat history</p>
              <Link to={"/user/login"}>Login</Link>
            </div>
          )}
        </div>
      </div>

      {/* <hr className='h-[3px] bg-gray-300 m-2' /> */}
      <div
        className={clsx(
          "sticky bg-[rgb(235,232,232)] flex items-center gap-2 p-2 cursor-pointer md:overflow-x-hidden  hover:bg-white",
          isOpen && titles.length > 9 ? "bottom-0 " : "top-full",
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
                <img src={avatarUrl} className="h-8 w-8" alt="" />
                <p className={clsx(isOpen ? "block" : "hidden")}>
                  {v.username}
                </p>
              </>
            );
          })
        ) : isOpen ? (
          <div className="flex gap-2 text-center items-center">
            <CircleUserRound
              strokeWidth={1}
              className="w-10 cursor-pointer h-10"
            />
            <Link to={"/user/login"}>Login</Link>
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

export default SideBar;
