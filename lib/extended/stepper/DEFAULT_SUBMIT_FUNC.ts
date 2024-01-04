import { IUserData } from "./types";

export const DEFAULT_SUBMIT_FUNC: (userData: any) =>  Promise<any> = async function(userData: IUserData) {
  const payload = typeof userData === 'string' ? userData : JSON.stringify(userData);
  fetch("https://httpbin.org/post", {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: payload,
    method: 'POST'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json()
  })
  .then(resp => console.info('submit to https://httpbin.org/post succesful'))
  .catch(error => { 
    console.error(error);
  })
}