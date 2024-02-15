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

export const checkAccount = async (username, password) => {
/*   const token = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');*/
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${BELVO_CLIENT_ID}:${BELVO_SECRET_KEY}`)
    }),
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  };

  try {
    const response = await fetch(BELVO_BASE_URL+'/accounts/', options);

    if (response.ok) {
      const data = await response.json();
      // Verifica si la cuenta existe con los datos proporcionados
      // y si pertenece a un entorno de sandbox
      if (data.exists && data.data.length > 0) {
        const account = data.data[0];
        if (account.sandbox) {
          return true; // La cuenta pertenece al entorno de sandbox
        }
      }
      return false; // La cuenta no existe o no es de sandbox
    } else {
      throw new Error('Error al verificar la cuenta');
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const registerLink = async (username, password) => {
 /*    const username2 = "bnk100";
    const password2 = "full"; */
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${BELVO_CLIENT_ID}:${BELVO_SECRET_KEY}`)
      }),
      body: JSON.stringify({
        "institution": "erebor_mx_retail",
        "username": username,
        "password": password,
        "external_id": "security-testing",
        "access_mode": "single",
        "credentials_storage": "5d",
        "stale_in": "30d",
        "fetch_resources": ["ACCOUNTS", "OWNERS", "TRANSACTIONS"]
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

export const getTransactions = async (rowsPerPage, page, linkId, startDate, endDate) => {
      const options = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${BELVO_CLIENT_ID}:${BELVO_SECRET_KEY}`)
        })
      };
 
     try {      
        const response = await fetch(BELVO_BASE_URL+'/transactions/?page_size='+rowsPerPage+'&page='+page+'&link='+linkId+'&value_date__range=' + startDate + ',' + endDate, options);
        if (!response.ok) {
          throw new Error('Error al obtener transacciones');
        }
        return await response.json();
     } catch (error) {
        console.error(error, "Error al obtener transacciones");
        throw error;
        return [];
     }
};


export const checkOwner = async (linkId) => {
      /*   const token = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');*/
      const options = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${BELVO_CLIENT_ID}:${BELVO_SECRET_KEY}`)
        }),
        body: JSON.stringify({
          "link": linkId,
          "token": '123ab',
          "save_data": false
        })
      };
  
      try {
        const response = await fetch(BELVO_BASE_URL+'/owners/', options);
        if (!response.ok) {
            throw new Error('Failed to get owner');
        }
        
        return await response.json();
      } catch (error) {
          console.error('Error to get owner:', error);
          return [];
      }
}