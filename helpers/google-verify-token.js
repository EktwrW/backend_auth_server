

const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '416930079910-vc9qscdhp66ojoakiqbg314ivcebkqrj.apps.googleusercontent.com';
const CLIENT_ID_ANDROID = '416930079910-bm5hunv553527es56f80g8p0ui26okad.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

const validarGoogleIdToken = async ( token ) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [CLIENT_ID,
          CLIENT_ID_ANDROID],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      
            // TODO: CLIENT_ID para IOS
        });
        const payload = ticket.getPayload();
        //const userid = payload['sub'];
        //console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        return {
            name: payload['name'],
            picture: payload['picture'],
            email: payload['email'],
        }
    } catch (error) {
        return null;
    }
}

module.exports = {
    validarGoogleIdToken
}
