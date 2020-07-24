import React, { useEffect} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'
import { Route, Switch } from "react-router-dom";
import MenuTop from './components/MenuTop'
import PrivateRoute from './components/PrivateRoute';
import { isLoggedInUser } from './actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import PersonalPage from './components/PersonalPage';


const { Header, Footer, Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const auth = useSelector( state => state.auth );

  useEffect(()=>{
    if(!auth.authenticated){
      dispatch( isLoggedInUser() )
    }
  },[]);

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} ><MenuTop/></Header>
      <Content className="site-layout" style={{ marginTop: 64 }} >
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route  path='/personalpage' component={PersonalPage} />
          <Route  path='/login' component={Login} />
          <Route  path='/signup' component={SignUp} />
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
