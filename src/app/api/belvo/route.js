import { NextResponse } from "next/server";

export const GET = async () => {
    // console.log("aaaaaa_SS: "+`${process.env.BELVO_BASE_URL}`);
      try {
        const response = await fetch(process.env.BELVO_BASE_URL+"/institutions/", {
          method: 'GET',
          headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.BELVO_CLIENT_ID}:${process.env.BELVO_SECRET_KEY}`)
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch institutions');
        }
    
        const result = await response.json();
        return NextResponse.json({data: result.results});
      } catch (error) {
        console.error('Error fetching institutions:', error);
        return [];
      }
    };
  