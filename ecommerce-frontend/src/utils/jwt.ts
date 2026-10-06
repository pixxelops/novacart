export interface JwtPayload{
      sub: string;
  roles?: string[];
  exp?: number;
  iat?: number;
}


export const decodeJwt = (token:string): JwtPayload | null => {
    try{
        const payload = token.split(".")[1];

        if(!payload){
            return null;
        }


        const decoded = atob(
            payload.replace(/-/g,"+").replace(/_/g,"/")
        );
        


        return JSON.parse(decoded) as JwtPayload;

    }catch(error){
        console.error("Failed to decode JWT:",error);
        return null;
    }
}