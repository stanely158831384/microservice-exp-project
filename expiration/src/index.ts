
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
const start = async () =>{

  console.log('Starting....');
  console.log('mode: ',process.env.NODE_ENV);
  if(!process.env.NATS_CLIENT_ID){
    throw new Error('MONGO_URI must be defined');
  }

  if(!process.env.NATS_URL){
    throw new Error('MONGO_URI must be defined');
  }

  if(!process.env.NATS_CLUSTER_ID){
    throw new Error('MONGO_URI must be defined');
  }

  try{
       //first parameter will be the last parameter in the nats-depl.yaml
  await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL)
  natsWrapper.client.on('close',()=>{
      console.log('NATS connection closed!');
      process.exit();
  })
  process.on('SIGINT',()=>natsWrapper.client.close());
  process.on('SIGTERM', ()=> natsWrapper.client.close());
  new OrderCreatedListener(natsWrapper.client).listen();
  }catch(err){
    console.error(err);
  }
}

start();

