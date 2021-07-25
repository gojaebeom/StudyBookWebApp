import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

function KakaoLogin({ location }){

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const code = location.search.split("code=")[1];

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.REACT_APP_KAKAO_CLIENT_ID);
    params.append('redirect_uri', process.env.REACT_APP_KAKAO_REDIRECT_URL);
    params.append('code', code);

    await axios({
      method:"post",
      url:"https://kauth.kakao.com/oauth/token",
      headers:{
        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
      },
      data:params, 
    })
    .then(data => data.data)
    .catch(err => console.log(err));

    dispatch({type: "IS_LOGGED_IN"});
  });

  return <Redirect to="/"/>;
}

export default withRouter(KakaoLogin);