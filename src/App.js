import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { UserLogin } from './components/user-login';
import { UserRegister } from './components/user-register';
import { UserDashBoard } from './components/user-dashboard';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookies, removeCookies] = useCookies('')
  return (
    <div className="container-fluid p-0">
      <div className='bg-shade'>
        <BrowserRouter>
          <main className='row  m-0'>
            <div className='col-5 '>
            </div>
            <div className='col-7 '>
              {
                (cookies['userId'] === undefined) ? <div className='text-center'>
                  <header className='text-center'><h1 className='fw-bolder'>To-Do</h1><p>Your Appointments Organizer</p></header>
                  <Link className='btn btn-warning' to='/login'>Sign In</Link>
                  <Link className='btn btn-light ms-3' to='/register'>Register</Link>
                </div> : <div></div>
              }
              <section className='text-center'>
                <Routes>
                  <Route path='/login' element={<UserLogin />} />
                  <Route path='/register' element={<UserRegister />} />
                  <Route path='/dashboard' element={<UserDashBoard />} />
                </Routes>
              </section>
            </div>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
