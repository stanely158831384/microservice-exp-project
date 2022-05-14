import request from 'supertest'
import {app} from '../../app'
import mongoose from 'mongoose'

it('returns a 404 if thed provided id doesn\'t exixt', async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asfasdf',
            price: 20
        })
        .expect(404);
})

it('returns a 401 if thed user is not authenticated', async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'asfasdf',
            price: 20
        })
        .expect(401);
})

it('returns a 401 if thed user doesn;t own the ticket', async ()=>{
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asfasdf',
            price: 20
        });
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asdfasdfsadf',
            price: 1000
        })
        .expect(401);
})

it('returns a 404 if the user provides an invalid title or price', async ()=>{
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',cookie)
        .send({
            title: 'asdfasdf',
            price: 20,
        })
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asdfasd',
            price: -20
        })
        .expect(400);
})

it('updates the ticket provided valid inputs',async ()=>{
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',cookie)
        .send({
            title: 'asdfasd',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();
    
    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);

})