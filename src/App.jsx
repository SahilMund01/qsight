import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Descope, useDescope } from '@descope/react-sdk';
import logo from './assets/QSight.png'
import Header from './Header';
import { fetchAndProcessUserData } from './api';
import User from './User';

const getInitialTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

function App() {
  // const [count, setCount] = useState(0);
  const [isActive, setActive] = useState(true);
  const descopeSdk = useDescope();
  const sessionToken = descopeSdk.getSessionToken();
  const [loginResp, setLoginResp] = useState([]);
  const [data, setData] = useState({
    user: null,
    admin: null
  });
  const [user, setUser] = useState({
    email: "",
    role : ""
  });


  useEffect(() => {
    console.log('resss', loginResp);

    if (sessionToken) {
      if (descopeSdk?.isJwtExpired(sessionToken)) {
        setActive(false);
      } else {
        setActive(true);
      }
    } else {
      setActive(false);
    }
  }, [sessionToken]);

  useEffect(() => {

    const userData = JSON.parse(localStorage.getItem('user-data'));
    setUser((prev) => {
      return {
        ...prev,
        role: userData?.role,
        email : userData?.email
      }
     })
    fetchData();


  }, [])


  const fetchData = async () => {
    const userData = await fetchAndProcessUserData();
    console.log('admin',userData)
    setData((prev) => {
      return {
        ...prev,
        user: userData
      }
    });
  }


  const onLogout = async () => {
    try {
      const resp = await descopeSdk.logout();
      console.log('Token', resp);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = (val) => {
    if(val==='logout'){
      onLogout()
    }
    setAnchorEl(null);
  };

  return (
    <div>
 
      {!isActive ? (
       <div className="grid justify-center items-center grid-cols-2">
       <div className="flex justify-center bg-[#3852] h-screen items-center">
         <img src={logo} alt="App Logo" className="w-1/2" />
       </div>
       <Descope
         flowId="sign-in"
         theme={getInitialTheme()}
         onSuccess={(e) => {
           setLoginResp(e?.detail.user?.userTenants);
           console.log(e?.detail);
           console.log(e?.detail?.user?.email);
           localStorage.setItem('user-data', JSON.stringify({
            role: "user",
            email : e?.detail?.user?.name
           }))
           setUser((prev) => {
            return {
              ...prev,
              role: "user",
              email : e?.detail?.user?.name
            }
           })
           fetchData();
         }}
         onError={(err) => {
           console.log('Error!', err);
         }}
       />
     </div>
     
      ) : (
        <>
          {/* <div
            
            style={{
              padding:'20px',
              display: 'grid',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              gridTemplateColumns:'auto auto'

            }}
          >
              <div
            style={{
              fontSize: '20px',
              
            }}
          >
            
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '1rem',
                marginBottom:'20px'
              }}
            >
              <div style={{ fontWeight: '500', width:'220px' }}>Hospital Name -</div>
               <div>{loginResp[0]?.tenantName}</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '55px',
              }}
            >
              <div style={{ fontWeight: '500',minWidth:'50px' }}>Hospital Tenant Id -</div>
               <div>{loginResp[0]?.tenantId}</div>
            </div>
          </div>
            
          </div> */}
          {/* <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 20px',
      backgroundColor: '#3852',
      borderBottom: '1px solid #ddd'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <img
          src={logo}
          alt="App Logo"
          style={{ height: '50px' }}
        />
      </div>
      
      <IconButton
      onClick={onLogout}
      edge="end"
      color="inherit"
      aria-label="edit"
    >
      <ExitToAppIcon fontSize='large'  />
    </IconButton>
    </header> */}
        <Header handleClose={handleClose} handleMenu={handleMenu} anchorEl={anchorEl} userRole={user.role}/>

        {
          user?.role === 'user' &&  data?.user && <User data={data?.user} email={user.email}/>
        }
       
        </>
      )}
    </div>
  );
}

export default App;
