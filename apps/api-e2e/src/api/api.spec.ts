import axios from 'axios';

describe('GET /api/user', () => {

  it('should create and get an user, then delete it', async () => {
    const responseCreated = await axios.post(`/api/user`, {name:"Prueba", surname:"Pruebita", password:"1234", email:"pruebita@gmail.com", role:"USER_ROLE"});
    await new Promise(resolve => setTimeout(resolve, 4000));

    const responseGet = await axios.get(`/api/users`)

    const expectedUser = responseGet.data.find((user: any) => user.name === "Prueba");

    const responseDelete = await axios.delete(`/api/user/${expectedUser._id}`);
    
    expect(responseCreated.status).toBe(200);
    expect(responseGet.status).toBe(200);
    expect(expectedUser.email).toBe("pruebita@gmail.com");
    expect(responseDelete.status).toBe(200);
  });
});
