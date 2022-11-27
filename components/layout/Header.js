/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
//Table Socket Requirments
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Header = ({ handleOpen, headerStyle }) => {
    const router = useRouter();
    const [scroll, setScroll] = useState(0)
    const [logged , setLogged] = useState(false);
    // Messages States
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [chatUsers , setChatUsers] = useState([]);
    const [neededChatBox , setNeededChatBox] = useState('');
    const [activeRoom , setActiveRoom] = useState('');
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
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 chatBox">
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
                <div className={(messageReceivedData.u_id == cuurentUid) ? "fromMe" : "fromOther" }>
                    <span>{messageReceivedData.message}</span>
                    {messageReceivedData.created_at+' By '+messageReceivedData.name}
                </div>
            )
        })
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start chatMsgs" id="chatMsgs">
                {allChat}
            </div>
        )
    }

    const ChatRoom = ({activeRoomData, usersList}) => {
        let userI = usersList.findIndex((element) => element._id == activeRoomData);
        return(
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 chatBox">
                <div className="chatTitle">
                    <span><i className="fi fi-rr-comment"></i> </span>
                    {usersList[userI].name}
                    <span className="close" onClick={() => {setNeededChatBox('')}}>X</span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 usersBox">

                <ReloadChat messagesReceivedData={messagesReceived} />

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sendMsg">
                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 float-start">
                                <textarea id="msg" placeholder="Type your message here"></textarea>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 float-start send" onClick={sendMessage}>
                                <img src="/assets/imgs/template/send.svg" />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
    const UserChat = () => {
        let cuurentUid = JSON.parse(sessionStorage.getItem('loginData')).data.id;
        return(
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 chatBox">
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
                                <img src="/assets/imgs/template/send.svg" />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
    const ChatBox = () => {
        return(
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 chatBox" onClick={handleCheckUserAndGetChatView}>
                <div className="chatTitle">
                    <span><i className="fi fi-rr-comment"></i> </span>
                    Chat (Free)
                </div>
            </div>
        )
    }
    return (
        <>
            <header className={scroll ? `${headerStyle} header sticky-bar stick ` : `${headerStyle} header sticky-bar`}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/">
                                    <a className="d-flex">
                                        {headerStyle ? <Image width="200px" height="136px" alt="Madarshamel" src="/assets/imgs/template/logo-white.png" /> : <Image width="200px" height="136px" alt="Agon" src="/assets/imgs/template/logo.png" />}

                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu">
                                        <li>
                                            <Link href="/"><a className="active">Home</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-about-2"><a>About</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/price-request"><a>Pricing</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-faqs-1"><a>FAQs</a></Link>
                                        </li>
                                        <li className="has-children">
                                            <Link href="#"><a>Pages</a></Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/page-contact"><a><i className="fi fi-rr-paper-plane" />Contact</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-signup"><a><i className="fi fi-rr-user-add" />Sign Up</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-login"><a><i className="fi fi-rr-fingerprint" />Log In</a></Link>
                                                </li>
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
                                        </li>
                                        <li className="has-children">
                                            <Link href="#"><a>Services</a></Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/service-single"><a><i className="fi fi-rr-stats" />Customs Clearance</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/service-single"><a><i className="fi fi-rr-data-transfer" />Transportation</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/service-single"><a><i className="fi fi-rr-paper-plane" />International Shipping</a></Link>
                                                </li>
                                            </ul>
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

                                        {(logged) ? (
                                        <li className="has-children">
                                            <div className="mobile-header-top float-start px-3 py-3 logged-in-user">
                                                <div className="user-account">
                                                    <img src="/assets/imgs/template/ava_1.png" alt="Madarshamel" />
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
                                                    <Link href="/dashboard"><a className="closer"><i className="fi fi-rr-user" />Dashboard</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/dashboard/settings"><a><i className="fi fi-rr-settings" />Settings</a></Link>
                                                </li>
                                                <li className="hr"><span /></li>
                                                <li>
                                                    <a onClick={handleLogout}><i className="fi fi-rr-sign-out" />Logout</a>
                                                </li>
                                            </ul>
                                        </li>
                                        ) : ''}

                                    </ul>
                                </nav>
                                <div className="burger-icon burger-icon-white" onClick={handleOpen}>
                                    <span className="burger-icon-top" /><span className="burger-icon-mid" /><span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">
                                <Link href="/page-service-1"><a className="btn btn-default hover-up icon-arrow-right">Get Started</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {(logged) ? <ChatBox /> : '' }
            {(neededChatBox == 'adminChat') ? <AdminChat usersList={chatUsers} /> : (neededChatBox == 'userChat') ? <UserChat /> : (neededChatBox == 'chatRoom') ? <ChatRoom activeRoomData={activeRoom} usersList={chatUsers} /> : ''  }
        </>
    );
};

export default Header;