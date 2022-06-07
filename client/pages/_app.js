import 'bootstrap/dist/css/bootstrap.css';
import { userState } from 'react';
import buildClient from '../api/build-client';
import Header from '../component/header'

const AppComponent = ({Component, pageProps, currentUser}) => {
    console.log('mode: ',process.env.NODE_ENV);
    return (
    <div>
        <Header currentUser={currentUser}/>
        <div className='container'>
        <Component  currentUser={currentUser} {...pageProps} />
        </div>
    </div>
    );
};

AppComponent.getInitialProps = async (context) =>{
    const client = buildClient(context.ctx);
    const {data} = await client.get('/api/users/currentuser');

    let pageProps = {};
    if(context.Component.getInitialProps){
        pageProps =  await context.Component.getInitialProps(context.ctx, client, data.currentUser);

    }

    return {
        pageProps,
        ...data
    };
}

export default AppComponent;