/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import ServicesPages from "../elements/ServicesPages";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
const handleReadAllPages = require('./../../handlers/handleReadAllPages');
import Sidebar from "./Sidebar";
import useTranslation from "next-translate/useTranslation";
import ReactHtmlParser from 'react-html-parser';

//Table Socket Requirments
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Header = ({headerStyle }) => {
    const router = useRouter();
    let {t} = useTranslation();
    const [scroll, setScroll] = useState(0)
    const [logged , setLogged] = useState(false);
    const [servicePages , setServicePages] = useState([]);
    const [openClass, setOpenClass] = useState('');
    // Messages States
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [chatUsers , setChatUsers] = useState([]);
    const [neededChatBox , setNeededChatBox] = useState('');
    const previousFiles = [];
    const [activeRoom , setActiveRoom] = useState('');
    const handleRemove = () => {
        if (openClass === "sidebar-visible") {
            setOpenClass("")
            document.body.classList.remove("mobile-menu-active");
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
        sessionStorage.setItem('files','');
        sessionStorage.setItem('attachedFiles','');
        checkIfLoggedIn()
            .then((result) => {
                if(result){
                    setLogged(true);
                    console.log('Loggedin');
                }else{
                    setLogged(false);
                    console.log('Not Loggedin');
                }
            })
    })
    useEffect(() => {
        handleReadAllPages().
            then((result) => {
                if(result?.pages){
                    setServicePages(result);
                }
            });
    },[])
    const handleLogout = () => {
        sessionStorage.removeItem('loginData');
        router.push({ pathname: '/page-login' })
    }
    const handleCheckUserAndGetChatView = async () => {
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        const prepareRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/chat/prepareChat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        });
        let content = await prepareRequest.json();
        setChatUsers(content.allUsers);
        (content.userCreds.includes('super-admin') || content.userCreds.includes('live-chat')) ? setNeededChatBox('adminChat') : setNeededChatBox('userChat'); 
    }

    const getChatMsgs = async (activeRoomData) => {
        //Here Get Chat Msgs from server and add it into Join room & send msg
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        const getChatMsgsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/chat/readByField', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify({
            for_u_id: activeRoomData
            })
        });
    
        const content = await getChatMsgsRequest.json();
        if(content.success){
            setMessagesReceived(content.chatsData);
        }else{
            return content;
        }
        
    }

  const joinRoom = (userId) => {
    if (userId !== "") {
        setActiveRoom(userId);
        setNeededChatBox('chatRoom');
        socket.emit("join_room", userId);
        getChatMsgs(userId);
    }
  };
  useEffect(() => {
    if(neededChatBox == 'userChat'){
        const userId = JSON.parse(sessionStorage.getItem('loginData')).data.id;
        setActiveRoom(userId);
        socket.emit("join_room", userId);
        getChatMsgs(userId);
    }
  }, [neededChatBox]);

  const sendMessage = () => {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    let message = document.getElementById('msg').value;
    socket.emit("send_message", { message, activeRoom, accessToken });
    document.getElementById('msg').value = '';
    getChatMsgs(activeRoom);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived(data.chats);
    });
  }, [socket]);

  useEffect(() => {
    let objDiv = document.getElementById("chatMsgs");
    if(objDiv){objDiv.scrollTop = objDiv.scrollHeight;}
  }, [messagesReceived]);



  useEffect(() => {
    if(activeRoom !== ""){
        getChatMsgs(activeRoom);
    }
  }, [activeRoom]);
    const AdminChat = ({usersList}) => {
        let UsersData;
        if(usersList.length > 0){
            UsersData = usersList.map((userData) => {
                if(userData.name){
                    return (
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 userData" onClick={() => {joinRoom(userData._id)}}>
                            <p className="userName">{userData.name}</p>
                            <p>{userData.email}</p>
                            <p>{userData.mobile}</p>
                        </div>
                    )
                }
            })
        }
        return(
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 chatBox">
                <div className="chatTitle">
                    <span><i className="fi fi-rr-comment"></i> </span>
                    Admin Chat
                    <span className="close" onClick={() => {setNeededChatBox('')}}>X</span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 usersBox">
                    {UsersData}
                </div>
            </div>
        )
    }

    const ReloadChat = ({messagesReceivedData}) => {
        let cuurentUid = JSON.parse(sessionStorage.getItem('loginData')).data.id;
        let allChat = messagesReceivedData.map((messageReceivedData) => {
            return (
                <div key={messageReceivedData._id} className={(messageReceivedData.u_id == cuurentUid) ? "fromMe" : "fromOther" }>
                    <span>{(messageReceivedData.message.search('--uploaded--') === 0) ? <a href={'/api/download/?fileName='+messageReceivedData.message.split('--uploaded--')[1]}>{messageReceivedData.message.split('--uploaded--')[1]}</a> : messageReceivedData.message}</span>
                    {messageReceivedData.created_at+' By '+messageReceivedData.name}
                </div>
            )
        })
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start chatMsgs" style={{padding:'20px'}} id="chatMsgs">
                {allChat}
            </div>
        )
    }
    const handleUploaderHead = async () => {
        const file = document.getElementById('fileUploadDataHead');
        const load = document.getElementById('loadHead');
        load.classList.remove('hidden');
        file.classList.add('hidden');
        var data = new FormData()
        data.append('file', file.files[0])
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
      
        const fileRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/uploader/upload', {
          method: 'POST',
          headers: {
            'Authorization': accessToken
          },
          body: data
        })
        const content = await fileRequest.json();
        console.log(content);
        
          if(content.success) {
              file.classList.remove('hidden');
              load.classList.add('hidden');
              document.getElementById('fileUploadDataHead').value = null;
              document.getElementById('msg').value = '--uploaded--'+content.filename;
              sendMessage();
          }else{
              load.classList.add('hidden');
              file.classList.remove('hidden');
              document.querySelector(".alert-data").innerHTML = 'Something went wrong, please try again later.';
              content.error.map((err) => {
                document.querySelector(".alert-data").innerHTML = document.querySelector(".alert-data").innerHTML+err;
              });
              document.getElementById('fileUploadDataHead').value = null;
          }
    }

    const ChatRoom = ({activeRoomData, usersList}) => {
        let userI = usersList.findIndex((element) => element._id == activeRoomData);
        return(
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 chatBox">
                <div className="chatTitle">
                    <span><i className="fi fi-rr-comment"></i> </span>
                    {usersList[userI].name}
                    <span className="close" onClick={() => {setNeededChatBox('')}}>X</span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 usersBox">

                <ReloadChat messagesReceivedData={messagesReceived} />

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sendMsg">
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 float-start send" onClick={sendMessage}>
                                <Image id="loadHead" width="50px" height="50px" className="hidden" src="/assets/imgs/template/load.gif" />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 float-start">
                                <textarea id="msg" placeholder="Type your message here"></textarea>
                                <input type="file" name="fileHead" accept=".png, .jpeg, .jpg, .pdf" onChange={handleUploaderHead} id="fileUploadDataHead" />
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 float-start send" onClick={sendMessage}>
                                <Image width="50px" height="50px" src="/assets/imgs/template/send.svg" />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
    const UserChat = () => {
        let cuurentUid = JSON.parse(sessionStorage.getItem('loginData')).data.id;
        return(
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 chatBox">
                <div className="chatTitle">
                    <span><i className="fi fi-rr-comment"></i> </span>
                    Customer Service
                    <span className="close" onClick={() => {setNeededChatBox('')}}>X</span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 usersBox">

                <ReloadChat messagesReceivedData={messagesReceived} />

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sendMsg">
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 float-start">
                                <textarea id="msg" placeholder="Type your message here"></textarea>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 float-start send" onClick={sendMessage}>
                                <Image width="50px" height="50px" src="/assets/imgs/template/send.svg" />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
    const ChatBox = () => {
        return(
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 chatBox" onClick={handleCheckUserAndGetChatView}>
                <div className="chatTitle">
                    <span><i className="fi fi-rr-comment"></i> </span>
                    {t("common:chat")} ({t("common:free")})
                </div>
            </div>
        )
    }
    return (
        <>
            <div className={openClass && "body-overlay-1"} onClick={handleRemove} />
            <header className={scroll ? `${headerStyle} header sticky-bar stick ` : `${headerStyle} header sticky-bar`}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                        <ul className={'main-menu-'+t("common:dir")}>
                            <li className="has-children">
                                <Link href="#"><a>{t("common:lang")}</a></Link>
                                <ul className="sub-menu">
                                    {
                                    router.locales.map((locale) => (
                                    <li key={locale}>
                                        <a href={'/'+((locale != 'en') ? locale : '')} locale={locale}>{(locale === 'ar') ? 'عربي' : locale.toUpperCase() }</a>
                                    </li>
                                    ))
                                    }
                                </ul>
                            </li>
                        </ul>
                            <div className="header-logo">
                                <Link href="/">
                                    <a className="d-flex">
                                        {headerStyle ? <Image width="200px" height="136px" alt="Madarshamel" src="/assets/imgs/template/logo-white.png" /> : <Image width="200px" height="136px" alt="Agon" src="/assets/imgs/template/logo.png" />}

                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className={'main-menu-'+t("common:dir")}>
                                        <li>
                                            <Link href="/"><a className="active">{t("common:home")}</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/price-request"><a>{t("common:pricing")}</a></Link>
                                        </li>
                                        
                                        {/*<li className="has-children">
                                            <Link href="#"><a>Pages</a></Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/page-career-detail"><a><i className="fi fi-rr-list" />Career Detail</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-reset"><a><i className="fi fi-rr-settings" />Reset Password</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/404"><a><i className="fi fi-rr-exclamation" />Error 404</a></Link>
                                                </li>
                                            </ul>
                                        </li>*/}
                                        <li className="has-children">
                                            <Link href="#"><a>{t("common:services")}</a></Link>
                                            <ServicesPages content={servicePages} />
                                        </li>
                                        {/*<li className="has-children">
                                            <Link href="#"><a>Blog</a></Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/blog-1"><a className="closer"><i className="fi fi-rr-edit" />Blog</a></Link>
                                                </li>
                                                <li className="hr"><span /></li>
                                                <li>
                                                    <Link href="/blog-single"><a><i className="fi fi-rr-document-signed" />Blog Post</a></Link>
                                                </li>
                                            </ul>
                                        </li>*/}
                                        <li>
                                            <Link href="/page-contact"><a><i className="fi fi-rr-paper-plane" />{t("common:contact")}</a></Link>
                                        </li>
                                        {(logged) ? (
                                        <li className="has-children">
                                            <div className="mobile-header-top float-start px-3 py-3 logged-in-user">
                                                <div className="user-account">
                                                    <Image width="50px" height="50px" src="/assets/imgs/template/ava_1.png" alt="Madarshamel" />
                                                    <div className="content">
                                                        <h6 className="user-name">
                                                            <span className="text-brand">{(sessionStorage.getItem('loginData')) ? JSON.parse(sessionStorage.getItem('loginData')).data.name : ''}</span>
                                                            <span className="fi-rr-caret-down"></span>
                                                        </h6>
                                                        {/*<p className="font-xs text-muted">5 Notfications</p>*/}
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/dashboard"><a className="closer"><i className="fi fi-rr-user" />{t("common:dashboard")}</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/dashboard/settings"><a><i className="fi fi-rr-settings" />{t("common:settings")}</a></Link>
                                                </li>
                                                <li className="hr"><span /></li>
                                                <li>
                                                    <a onClick={handleLogout}><i className="fi fi-rr-sign-out" />{t("common:logOut")}</a>
                                                </li>
                                            </ul>
                                        </li>
                                        ) : (
                                            <>
                                            <li>
                                                <Link href="/page-signup"><a><i className="fi fi-rr-user-add" />{t("common:signUp")}</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/page-login"><a><i className="fi fi-rr-fingerprint" />{t("common:logIn")}</a></Link>
                                            </li>
                                            </>
                                        )}
                                    </ul>
                                </nav>
                                <div className="burger-icon burger-icon-white" onClick={() => {
                                    document.body.classList.add("mobile-menu-active");
                                    setOpenClass("sidebar-visible")
                                }}>
                                    <span className="burger-icon-top" /><span className="burger-icon-mid" /><span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">
                                <Link href="/page-signup"><a className="btn btn-default hover-up icon-arrow-right">{t("common:getStarted")}</a></Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </header>
            <Sidebar logged={logged} openClass={openClass} />
            {(logged) ? <ChatBox /> : '' }
            {(neededChatBox == 'adminChat') ? <AdminChat usersList={chatUsers} /> : (neededChatBox == 'userChat') ? <UserChat /> : (neededChatBox == 'chatRoom') ? <ChatRoom activeRoomData={activeRoom} usersList={chatUsers} /> : ''  }
        </>
    );
};

export default Header;