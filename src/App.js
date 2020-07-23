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
    <Layout style={{height: '100vh'}}>
      <Header><MenuTop/></Header>
      <Content>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route  path='/personalpage' component={PersonalPage} />
          <Route  path='/login' component={Login} />
          <Route  path='/signup' component={SignUp} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center', marginTop: '20px'}}>App Chat created by The Linh @2020</Footer>
    </Layout>
  );
}

export default App;
