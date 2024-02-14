const BELVO_CLIENT_ID = "eb4a5869-4d97-441b-8da0-81ec71549052";
const BELVO_SECRET_KEY = "WP#gIcn_7gVDZpTiRYhnzjgL9fAF2TevwIGv9XH5QIj*ZVJR*a@hcLBI-XnExy#9";
const BELVO_BASE_URL = "https://sandbox.belvo.com/api";

export const getInstitutions = async () => {
    console.log("aaaaaa_SS: "+`${process.env.BELVO_BASE_URL}`);
    console.log('JSJSJSJJssS');
    try {
        const response = await fetch(BELVO_BASE_URL+"/institutions/", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${BELVO_CLIENT_ID}:${BELVO_SECRET_KEY}`)
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch institutions');
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching institutions:', error);
        return [];
    }
};

export const registerLink = async (username, password) => {
    const username = "bnk100";
    const password = "full";
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${BELVO_CLIENT_ID}:${BELVO_SECRET_KEY}`)
      }),
      body: JSON.stringify({
        institution: 'erebor_mx_retail',
        username: 'username',
        password: 'password',
        external_id: '56ab5706-6e00-48a4-91c9-ca55968678d9',
        username2: 'secondusername',
        username3: 'thirdusername',
        password2: 'pin',
        token: '1234ab',
        access_mode: 'recurrent',
        fetch_resources: ['ACCOUNTS', 'TRANSACTIONS'],
        credentials_storage: '27d',
        stale_in: '42d',
        username_type: '001'
      })
    };

    try {
      const response = await fetch(BELVO_BASE_URL+'/links/', options);
      if (!response.ok) {
        throw new Error('Error al crear link');
      }
      return await response.json();
    } catch (error) {
      console.error(error, "Error al registrar link");
      throw error;
      return [];
    }
};