import axios from 'axios';

class Http {
  static instance = new Http();

  get = async url => {
    try {
      let req = await axios.get(url);
      return req;
    } catch (err) {
      console.log('http get method err', err);
      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = await axios(url, {
        method: 'POST',
        body,
      });
      return req;
    } catch (err) {
      console.log('http method post err', err);
      throw Error(err);
    }
  };
}

export default Http;
